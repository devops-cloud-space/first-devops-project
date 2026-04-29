import React, { useState } from "react";
import API from "./API/api";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const sendData = async () => {
    const res = await API.post("/process", {
      text: text,
    });                    
    setResult(res.data.processed);
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>🚀 Mini DevOps App 🚀</h1>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text"
      />

      <button onClick={sendData}>Send</button>

      <h2>Result: {result}</h2>
    </div>
  );
}

export default App;
