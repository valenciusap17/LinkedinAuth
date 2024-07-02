import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("hai", req.url);
  const parsedUrl = new URL(
    `http://${process.env.HOST ?? "localhost"}${req.url}`
  );
  console.log(parsedUrl);
  const authCode = parsedUrl.searchParams.get("code");
  const state = parsedUrl.searchParams.get("state");
  const accessTokenUrl = "https://www.linkedin.com/oauth/v2/accessToken/";
  const userProfileUrl = "https://api.linkedin.com/v2/userinfo/";

  const accessTokenResponse = await fetch(accessTokenUrl, {
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: authCode || "",
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_SECRET_KEY!,
      redirect_uri: "http://localhost:3000/api/callback",
    }),
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
  });
  const userData = async (access_token: string) => {
    return await fetch(userProfileUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method: "GET",
    });
  };
  const accessTokenJson = await accessTokenResponse.json();
  console.log("bawah ini:");
  console.log(accessTokenJson);
  console.log(accessTokenJson["access_token"]);
  console.log("atas ini:");
  const userDataResponse = await userData(accessTokenJson["access_token"]);
  const userDataJson = await userDataResponse.json();
  console.log("berikut ini adalah user datanya: ");
  console.log(userDataJson);
  cookies().set("user", JSON.stringify(userDataJson));
  redirect("http://localhost:3000");
}
