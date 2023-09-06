import { NextResponse } from "next/server";

const axios = require("axios");

export async function POST(req, res) {
  const body = await req.json();
  const screenName = body.username;
  console.log(`Username ${screenName} is check`);
  try {
    const response = await axios.get(`https://www.tiktok.com/@${screenName}`);

    const status = response.status;
    console.log("status tiktok", status);

    if (status === 200 || status === 204) {
      console.log(`Username tiktok ${screenName} is taken`);
      return NextResponse.json({
        message: `User ${screenName} exist in Tiktok`,
      });
    }
  } catch (error) {
    console.error(`Error tiktok: ${error.message}`);
    return NextResponse.json({
      message: `User ${screenName} not exist in Tiktok`,
    });
  }
}
