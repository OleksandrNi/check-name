import { NextResponse } from "next/server";

const axios = require("axios");

export async function POST(req, res) {
  const body = await req.json();
  const screenName = body.username;

  try {
    const responseInsta = await axios.get(
      `https://www.instagram.com/${screenName}/?__a=1`
    );
    const responseText = await responseInsta.data;
    const jsonStartIndex = await responseText.indexOf("{");
    const cleanedResponseText = await responseText.substring(jsonStartIndex);
    const jsonData = await JSON.parse(cleanedResponseText);

    console.log("here we check exist insta", jsonData.error);
    return NextResponse.json({ message: `User ${screenName} not exist in Insta` });
  } catch (error) {
    console.error("Ошибка при парсинге JSON:", error.message);
    return NextResponse.json({ message: `User ${screenName} exist in Insta` });
  }
}
