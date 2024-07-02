"use client";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";

export default function Page() {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const parsedUrl = new URL(document.URL);
    const authCode = parsedUrl.searchParams.get("code");
    const state = parsedUrl.searchParams.get("state");

    console.log("ini ya: ", authCode);
    console.log("ini ya: ", state);

    var details: { [string: string]: string } = {
      grant_type: "authorization_code",
      code: authCode || "",
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_SECRET_KEY!,
      redirect_uri: "http://localhost:3000/auth/linkedin/callback",
    };
    var formBody = [];
    for (var prop in details) {
      var encodedKey = encodeURIComponent(prop);
      var encodedValue = encodeURIComponent(details[prop]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    var finalBody = formBody.join("&");
    console.log(finalBody);
    const postAccessToken = async () => {
      const url = "https://www.linkedin.com/oauth/v2/accessToken/";
      console.log("inin bang");
      console.log(url);
      await fetch(url, {
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: authCode || "",
          client_id: process.env.LINKEDIN_CLIENT_ID!,
          client_secret: process.env.LINKEDIN_SECRET_KEY!,
          redirect_uri: "http://localhost:3000/auth/linkedin/callback",
        }),
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      })
        .then((res) => {
          console.log("hai??????: ");
          return res.json();
        })
        // .then((res) => res.json())
        .then((response) => {
          console.log("hai?", response);
          setUserData(response);
          setLoading(false);
        });
      // console.log(response)
    };
    postAccessToken();
  }, []);

  if (loading) return <div>loading</div>;
  if (!userData) return <div>data is not exist</div>;
  return (
    <>
      <div className="flex flex-col ">{userData}</div>
    </>
  );
}
