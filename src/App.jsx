import { useState } from "react";
import "./App.css";

// `https://api.frankfurter.app/latest?amount=${}&from=${}&to=${}`

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const currFrom = "USD";
  const currTo = "INR";
  const currAmount = 100;

  async function handlingAPI() {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${currAmount}&from=${currFrom}&to=${currTo}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    setTo(data.rates);
  }
  return (
    <>
      <input type="NUMBER" placeholder="Enter amount here..." />
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <button onClick={() => handlingAPI}>Calculate</button>
      <p>OUTPUT:{to.INR}</p>
    </>
  );
}

export default App;
