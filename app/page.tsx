// "use client"
import { cookies } from "next/headers";
import Image from "next/image";

export default function Home() {
  const url =
    "https://www.linkedin.com/oauth/v2/authorization?" +
    new URLSearchParams({
      response_type: "code",
      client_id: "866cfaibmmjbru",
      redirect_uri: "http://localhost:3000/api/callback",
      state: "yhy9g75g97hh69g77gitgyu",
      scope: "openid,profile,w_member_social,email",
    });

  const cookie = cookies().get("user");
  let userData;
  if (cookie != undefined) {
    userData = JSON.parse(cookie.value);
  }
  console.log("hai");
  // console.log(userData["given_name"]);

  return (
    <main className="flex min-h-screen flex-col items-start  p-24">
      <div className="flex w-full h-full ">Testing coba output disini</div>
      <a
        href={url}
        className="flex justify-center w-1/6 h-full p-2 hover:bg-blue-400 hover:cursor-pointer bg-red-500 text-white rounded-xl"
      >
        Linkedin Auth
      </a>
      <div>bawah nih</div>
      <div>{JSON.stringify(userData)}</div>
      {/* {for (var i in userData)} */}
    </main>
  );
}
