import { NextResponse } from "next/server";
const axios = require("axios")
const https = require("https"); // Import the 'https' module


export async function POST(req, res) {
  const body = await req.json();
  const screenName = body.username;

  // Define your proxy URL
  const proxyUrl = 'https://check-name.vercel.app/'; // Replace with your actual proxy URL

  // Create an Axios instance with the proxy
  const axiosInstance = axios.create({
    proxy: true, // Disable the default proxy setting
    httpsAgent: new https.Agent({
      // Use the proxy for HTTPS requests
      proxy: proxyUrl,
    }),
  });

  try {
    const response = await axiosInstance.get(
      `https://www.instagram.com/${screenName}/?__a=1`
    );

    const responseText = response.data;
    const jsonStartIndex = responseText.indexOf("{");
    const cleanedResponseText = responseText.substring(jsonStartIndex);
    const jsonData = JSON.parse(cleanedResponseText);

    console.log("here we check exist insta", jsonData.error);
    return NextResponse.json({
      message: `User ${screenName} not exist on Instagram`,
      response: responseText,
    });
  } catch (error) {
    console.error("Error parsing JSON:", error.message);
    return NextResponse.json({
      message: `User ${screenName} exists on Instagram`,
      error: error,
    });
  }
}
