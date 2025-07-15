"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [queue, setQueue] = useState([]);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    if(queue.length > 0) {
      const targetFloor = queue[0];

      if(currentFloor !== targetFloor){
        setDirection(currentFloor < targetFloor ? 'up' : 'down');
        const timer = setTimeout(()=> {
          setCurrentFloor(prev => (prev < targetFloor ? prev + 1 : prev - 1));
        }, 1000);
        return () => clearTimeout(timer);

      }else {
        setQueue(prevQueue => prevQueue.slice(1));
      }

    } else {
      setDirection(null);
    }
  }, [currentFloor, queue]);
  const addToQueue = (floor) => {

    if (!queue.includes(floor)) {
      setQueue(prev => {
        const newQueue = [...prev, floor];
        return direction === 'up'
          ? newQueue.sort((a, b) => a - b)
          : newQueue.sort((a, b) => b - a);
      });
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
            <p>方向 {direction}</p>
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
