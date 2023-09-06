import { NextResponse } from "next/server";

const axios = require("axios");

export async function POST(req, res) {
  const body = await req.json();
  const screenName = body.username;
  console.log(`Username ${screenName} is check`);
  try {
    const response = await axios.get(`https://www.tiktok.com/@${screenName}`, {
      // headers: {
      //   Connection: 'keep-alive',
      //   'User-Agent': 'TikTok 17.4.0 rv:174014 (iPhone; iOS 13.6.1; sv_SE) Cronet',
      // },
      // timeout: 60000,
    });

    const status = response.status;
    console.log('status tiktok', status)

    if (status === 200 || status === 204) {
        console.log(`Username tiktok ${screenName} is taken`);
        return NextResponse.json({ message: `User ${screenName} exist in Tiktok` });
      }

    // if (status === 404) {
    //   console.log(`Username tiktok ${screenName} is available`);
    //   return NextResponse.json({ message: `User ${screenName} exist in Tiktok` });
    // } else if (status === 200 || status === 204) {
    //   console.log(`Username tiktok ${screenName} is taken`);
    //   return NextResponse.json({ message: `User ${screenName} not exist in Tiktok` });
    // } else if (status === 429) {
    //   console.log("You are being ratelimited. Please try again later.");
    //   return NextResponse.json({ message: `Overlimit request` });
    // } else {
    //   console.log(`Unknown Error - ${status}`);
    //   return NextResponse.json({ message: `Unknown Error - ${status}` });
    // }
  } catch (error) {
    console.error(`Error tiktok: ${error.message}`);
    return NextResponse.json({ message: `User ${screenName} not exist in Tiktok` });
  }

}
