"use client";

import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [twitterInfo, setTwitterInfo] = useState(null);
  const [instaInfo, setInstaInfo] = useState(null);

  const handleNameCheck = async () => {
    const { data } = await axios.post(`http://localhost:3000/api/search`, {
    // const { data } = await axios.post(`https://check-name.vercel.app/api/search`, {
      username,
    });
    console.log(data)
    setTwitterInfo(data[0]);
    setInstaInfo(data[1]);
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
      {twitterInfo &&  <div>{twitterInfo}</div>}
      {instaInfo &&  <div>{instaInfo}</div>}
    </main>
  );
}
