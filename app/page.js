"use client";

import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [twitterInfo, setTwitterInfo] = useState(null);
  const [instaInfo, setInstaInfo] = useState(null);
  const [tiktokInfo, setTiktokInfo] = useState(null);
  const [dotInfo, setDotInfo] = useState(null);

  // const URL = 'http://89.40.2.236:3000/'
  const URL = 'https://check-name.vercel.app/'
  // const URL = "http://localhost:3000/";

  const checkTweet = async () => {
    const { data } = await axios.post(`${URL}api/tweet`, {
      username,
    });
    console.log("data", data);
    if (data) {
      setTwitterInfo(data.message);
    }
  };

  const checkInsta = async () => {
    const { data } = await axios.post(`${URL}api/insta`, {
      username,
    });
    console.log("dataError", data.error);
    console.log("Response", data.response);

    setInstaInfo(data.message);
  };

  const checkTiktok = async () => {
    const { data } = await axios.post(`${URL}api/tiktok`, {
      username,
    });

    setTiktokInfo(data.message);
  };

  const checkDomain = async () => {
    const { data } = await axios.post(`${URL}api/dot`, {
      username,
    });

    setDotInfo(data.results);
  };

  const handleNameCheck = async () => {
    // checkTweet();
    checkInsta();
    // checkTiktok();
    // checkDomain();
  };

  const value = 1;
  const width = 400;
  const height = 40;
  const color = "red";
  const borderColor = "gray";

  return (
    <main className={styles.main}>
update 12:54
      <input
        type="text"
        placeholder="enter name for check"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleNameCheck}>Check name in SM</button>
      Info
      {twitterInfo && <div>{twitterInfo}</div>}
      {instaInfo && <div>{instaInfo}</div>}
      {tiktokInfo && <div>{tiktokInfo}</div>}
      {dotInfo && dotInfo.map(dot => (
        <div key={dot.domain}>Dot {dot.domain} is {dot.available ? 'not exist' : 'exist'}</div>
      ))}
    </main>
  );
}
