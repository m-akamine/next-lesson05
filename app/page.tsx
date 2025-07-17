"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false; // FontAwesomeのCSSを自動で追加しない

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [queue, setQueue] = useState<number[]>([]);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    if (queue.length > 0) {
      const targetFloor = queue[0];

      if (currentFloor !== targetFloor) {
        setDirection(currentFloor < targetFloor ? "up" : "down");
        const timer = setTimeout(() => {
          setCurrentFloor((prev) => (prev < targetFloor ? prev + 1 : prev - 1));
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setQueue((prevQueue) => prevQueue.slice(1));
      }
    } else {
      setDirection(null);
    }
  }, [currentFloor, queue]);

  const addToQueue = (floor: number) => {
    if (!queue.includes(floor) && floor !== currentFloor) {
      setQueue((prev) => [...prev, floor]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className={"text-base"}>WebTools</h1>
        <h2 className={"text-xs"}>エレベーターシュミレーター</h2>
      </header>
      <main>
        <div>
          <div className="grid grid-cols-3 gap-4 rounded-lg bg-gray-200 p-4">
            <div className="">
              <div className="border p-4 m-2 bg-gray-100 rounded text-center items-center">
                <p className="text-xs font-bold">現在のフロア</p>
                <p className="text-9xl font-bold text-blue-500">
                  {currentFloor}
                </p>
              </div>
              <div className="mt-6 mb-2 text-center">
                <p className="text-9xl font-bold text-gray-700 pt-8 pb-2 mt-4 mb-2 animate-bounce h-40">
                  {direction === "up" ? "▲" : direction === "down" ? "▼" : ""}
                </p>
                <p className="text-xs text-gray-700 p-2 mb-3">
                  キュー {queue.join(", ")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {[1, 2, 3, 4, 5, 6].map((floor) => (
                <button
                  key={floor}
                  onClick={() => addToQueue(floor)}
                  className="w-16 h-16 px-3 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {floor}
                </button>
              ))}
            </div>

            {/* エレベーターシャフト */}
            <div className="relative bg-gray-300 rounded-lg p-2 h-94">
              <div className="text-xs text-center mb-2 text-gray-600 h-4">
                エレベーター
              </div>
              {/* 各階の表示 */}
              {[6, 5, 4, 3, 2, 1].map((floor) => (
                <div
                  key={floor}
                  className="relative border-b border-gray-400 h-14 flex items-center justify-end pr-2"
                >
                  <span className="text-xs text-gray-600">{floor}F</span>
                </div>
              ))}

              {/* エレベーターボックス */}
              <div
                className="absolute left-2 w-16 h-14 bg-red-500 rounded shadow-lg transition-all duration-1000 ease-in-out flex items-center justify-center"
                style={{
                  bottom: `${(currentFloor - 1) * 56 + 8}px`, // 各階56px間隔で移動
                }}
              >
                <span>
                  <FontAwesomeIcon
                    icon={faPerson}
                    className="text-white font-bold text-base"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
