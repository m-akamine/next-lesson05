"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    if(queue.length > 0) {
      const targetFloor = queue[0];

      if(currentFloor !== targetFloor){
        const timer = setTimeout(()=> {
          setCurrentFloor(prev => (prev < targetFloor ? prev + 1 : prev - 1));
        }, 1000);
        return () => clearTimeout(timer);

      }else {
        setQueue(prevQueue => prevQueue.slice(1));
      }

    }
  }, [currentFloor, queue]);
  const addToQueue = (floor) => {
    if (!queue.includes(floor)) {
      setQueue(prevQueue => [...prevQueue, floor]);
    }
  }; 
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.elevator}>
            <p>現在のフロア {currentFloor}</p>
            <div className={styles.buttons}>
              {[1, 2, 3, 4, 5, 6].map(floor => (
                <button key={floor} onClick={() => addToQueue(floor)}>
                  {floor}
                </button>
              ))}
            </div>
            <p>キュー {queue.join(', ')}</p>
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
