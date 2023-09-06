"use client";

import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [twitterInfo, setTwitterInfo] = useState(null);
  const [instaInfo, setInstaInfo] = useState(null);
  const [tiktokInfo, setTiktokInfo] = useState(null);

  const checkTweet = async () => {
    // const { data } = await axios.post(`http://localhost:3000/api/tweet`, {
      const { data } = await axios.post(`https://check-name.vercel.app/api/tweet`, {
      username,
    });
    console.log("data", data);
    if (data) {
      setTwitterInfo(data.message);
    }
  };

  const checkInsta = async () => {
    // const { data } = await axios.post(`http://localhost:3000/api/insta`, {
      const { data } = await axios.post(`https://check-name.vercel.app/api/insta`, {
      username,
    });
    console.log("dataError", data.error);

    setInstaInfo(data.message);
  };

  const checkTiktok = async () => {
    // const { data } = await axios.post(`http://localhost:3000/api/tiktok`, {
      const { data } = await axios.post(`https://check-name.vercel.app/api/tiktok`, {
      username,
    });

    setTiktokInfo(data.message);
  };

  const handleNameCheck = async () => {
    checkTweet();
    checkInsta();
    checkTiktok()
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
