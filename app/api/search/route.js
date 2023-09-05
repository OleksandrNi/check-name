import { NextResponse } from "next/server";

const axios = require('axios');

const bearerToken = "AAAAAAAAAAAAAAAAAAAAADAhpwEAAAAAaLmoLOZcw4tulISk3orJaBaI5qA%3Dz0iaDGrsSh0QgqG8xEqk1LRovpQe94Yx5l58JBS3ShvN78LfMi";

export async function POST(req, res) {
  const body = await req.json();
  const screenName = body.twitterUsername;
  console.log('screenName', screenName)
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
      return NextResponse.json({ message: `this account ${response.data.name} with id${response.data.id}` });
    } else {
      console.log(`Error: Unexpected status code ${response}`);
    }
  } catch (error) {
    console.error(`User not exist`);
    return NextResponse.json({ message: `User not exist` });
  }
}
