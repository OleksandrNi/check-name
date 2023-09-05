import { NextResponse } from "next/server";

const axios = require("axios");

const bearerToken =
  "AAAAAAAAAAAAAAAAAAAAADAhpwEAAAAAaLmoLOZcw4tulISk3orJaBaI5qA%3Dz0iaDGrsSh0QgqG8xEqk1LRovpQe94Yx5l58JBS3ShvN78LfMi";

export async function POST(req, res) {
  const body = await req.json();
  const screenName = body.username;
  console.log("screenName", screenName);

  let checkResponse = [];

  try {
    const response = await axios.get(
      `https://api.twitter.com/1.1/users/show.json?screen_name=${screenName}`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      checkResponse.push(
        `in Twitter this account ${response.data.name} with id${response.data.id}`
      );
    } else {
      console.log(`Error: Unexpected status code ${response}`);
    }
  } catch (error) {
    console.error(`User not exist`);
    checkResponse.push(`User not exist in Twitter`);
  }

  const response = await axios.get(
    `https://www.instagram.com/${screenName}/?__a=1`
  );
  const responseText = await response.data;
  const jsonStartIndex = responseText.indexOf("{");
  const cleanedResponseText = responseText.substring(jsonStartIndex);

  try {
    const jsonData = JSON.parse(cleanedResponseText);
    checkResponse.push(`User not exist in Insta`);
    console.log(jsonData.error);
  } catch (error) {
    checkResponse.push(`User exist in Insta`);
    console.error("Ошибка при парсинге JSON:", error.message);
  }

  return NextResponse.json(checkResponse);
}
