"use client";

import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [twitterInfo, setTwitterInfo] = useState(null);
  const [instaInfo, setInstaInfo] = useState(null);
  const [tiktokInfo, setTiktokInfo] = useState(null);

  const URL = 'https://check-name.vercel.app/'
  // const URL = "http://localhost:3000/";

  const checkTweet = async () => {
    // console.log("responseresponse", response);
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

  const handleNameCheck = async () => {
    checkTweet();
    checkInsta();
    checkTiktok();
  };

  return (
    <main className={styles.main}>
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
    </main>
  );
}
