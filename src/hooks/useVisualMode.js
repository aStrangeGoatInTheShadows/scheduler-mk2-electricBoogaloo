import { useState } from "react";

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

  const back = () => {
    if (mode === initial) {
      return;
    }
    let historyClassic = [...history];
    historyClassic.pop();
    setHistory([...historyClassic]);
    setMode(historyClassic[historyClassic.length - 1]);
  };

  const reset = (newMode = "EMPTY") => {
    setMode(newMode);
    setHistory([newMode]);
  };

  const showHistory = () => {
    return history;
  };

  return { mode, transition, back, reset, showHistory };
}
