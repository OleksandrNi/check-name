import { NextResponse } from "next/server";

const axios = require("axios");

const bearerToken =
  "AAAAAAAAAAAAAAAAAAAAADAhpwEAAAAAaLmoLOZcw4tulISk3orJaBaI5qA%3Dz0iaDGrsSh0QgqG8xEqk1LRovpQe94Yx5l58JBS3ShvN78LfMi";

export async function POST(req, res) {
  const body = await req.json();
  const screenName = body.username;

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
      return NextResponse.json({
        message: `in Twitter user ${screenName} is account ${response.data.name} with id${response.data.id}`,
      });
    } else {
      console.log(`Error: Unexpected status code ${response}`);
    }
  } catch (error) {
    return NextResponse.json({
      message: `User ${screenName} not exist in Twitter`,
    });
  }
}
