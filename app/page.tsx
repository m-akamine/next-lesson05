"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [currentFloor, setCurrentFloor] = useState(1);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.elevator}>
            <p>現在のフロア {currentFloor}</p>
            <div className={styles.buttons}>
              {[1, 2, 3, 4, 5, 6].map((floor) => (
                <button key={floor} onClick={() => setCurrentFloor(floor)}>
                  {floor}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
