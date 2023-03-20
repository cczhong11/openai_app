import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [english, setEnglish] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ english }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/teacher.jpg" />
      </Head>

      <main className={styles.main}>
        <img src="/teacher.jpg" className={styles.icon} />
        <h3>Improve english</h3>
        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            name="english"
            placeholder="Enter an English paragraph"
            value={english}
            rows={10}
            cols={40}
            onChange={(e) => setEnglish(e.target.value)}
          />
          <input type="submit" value="Generate improvement" />
        </form>

        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
