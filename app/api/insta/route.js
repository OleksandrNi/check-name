import { NextResponse } from "next/server";
const https = require('https');

const axios = require("axios");

export async function POST(req, res) {
  const body = await req.json();
  const screenName = body.username;

  try {
    const response = await axios.get(
      `https://www.instagram.com/${screenName}/?__a=1`, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );
    // console.log(response)
    const responseText = response.data;
    // console.log('responseText', responseText)
    const jsonStartIndex = responseText.indexOf("{");
    const cleanedResponseText = responseText.substring(jsonStartIndex);
    const jsonData = JSON.parse(cleanedResponseText);

    console.log("here we check exist insta", jsonData.error);
    return NextResponse.json({
      message: `User ${screenName} not exist in Insta`,
      response: responseText,
    });
  } catch (error) {
    console.error("Ошибка при парсинге JSON:", error.message);
    return NextResponse.json({
      message: `User ${screenName} exist in Insta`,
      error: error,
    });
  }
  

}
