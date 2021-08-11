import { useState } from "react";

// This react hook makes sure the right components display at the right time
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transitions to newMode and adds it to the history stack
  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory([...newHistory, newMode]);
      return;
    }
    setHistory([...history, newMode]);
  };

  // returns back one level
  const back = () => {
    if (mode === initial) {
      return;
    }
    let historyClassic = [...history];
    historyClassic.pop();
    setHistory([...historyClassic]);
    setMode(historyClassic[historyClassic.length - 1]);
  };

  // sets it back to empty and erases the history
  const reset = (newMode = "EMPTY") => {
    setMode(newMode);
    setHistory([newMode]);
  };

  return { mode, transition, back, reset };
}
