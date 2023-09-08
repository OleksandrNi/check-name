import { NextResponse } from "next/server";
const axios = require("axios");

export async function POST(req, res) {
  const body = await req.json();
  const screenName = body.username;

  const API_KEY = "3mM44UdBCci5tT_Wr1WfSSAQFNuCwGgiLQiHN";
  const API_SECRET = "4aRUDPnEG5YhfxjtrpCiPD";
  const domains = [".com", ".co", ".io"];

  const config = {
    headers: {
      accept: `application/json`,
      Authorization: `sso-key ${API_KEY}:${API_SECRET}`,
    },
  };

  const domainAvailabilityPromises = domains.map((domain) => {
    return axios
      .get(
        `https://api.ote-godaddy.com/v1/domains/available?domain=${screenName}${domain}`,
        config
      )
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Ошибка:", error);
        return null;
      });
  });

  const results = await Promise.all(domainAvailabilityPromises);

  return NextResponse.json({
    results: results,
  });
}
