"use client";

import { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [twitterUsername, setTwitterUsername] = useState("");
  const [twitterInfo, setTwitterInfo] = useState(null);

  const handleTwitterCheck = async () => {
    // const { data } = await axios.post(`http://localhost:3000/api/search`, {
    const { data } = await axios.post(`https://check-name.vercel.app//api/search`, {
      twitterUsername,
    });
    setTwitterInfo(data.message);
  };

  return (
    <main className={styles.main}>
      <input
        type="text"
        placeholder="enter name Twitter"
        value={twitterUsername}
        onChange={(e) => setTwitterUsername(e.target.value)}
      />
      <button onClick={handleTwitterCheck}>Check name in Twitter</button>
      Info
      {twitterInfo && <div>{twitterInfo}</div>}
    </main>
  );
}
