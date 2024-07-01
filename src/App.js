import './App.css';
import { useState, useEffect, useRef } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [finalTime, setFinalTime] = useState(null);
  const timerRef = useRef(null);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  const startPause = () => {
    if (running) {
      clearInterval(timerRef.current);
    } else {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setRunning(!running);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    setRunning(false);
    setFinalTime(time);
    setTimeout(() => {
      setTime(0);
    }, 2000); // Reset the timer in 2 secs
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setRunning(false);
    setFinalTime(null);
  };

  return (
    <div className="stopwatch">
      <div id="display">{formatTime(time)}</div>
      {finalTime !== null && (
        <div id="final-time">
          Final Time: {formatTime(finalTime)}
        </div>
      )}
      <br />
      <div className="buttons">
        <button onClick={startPause}>{running ? 'Pause' : 'Start'}</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;


