import { useState } from "react";
import "./App.css";

// `https://api.frankfurter.app/latest?amount=${}&from=${}&to=${}`

function App() {
  const [amount, setAmount] = useState("");
  const [currFrom, setCurrFrom] = useState("");
  const [currTo, setCurrTo] = useState("");
  const tempCurrFrom = "USD";
  const tempCurrTo = "INR";
  const tempCurrAmount = 100;

  function handleCurrFrom(e) {
    setCurrFrom(e.target.value);
    console.log(e.target.value);
  }
  function handleCurrTo(e) {
    setCurrTo(e.target.value);
    console.log(e.target.value);
  }

  async function handlingAPI() {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${tempCurrAmount}&from=${tempCurrFrom}&to=${tempCurrTo}`
    );
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    setCurrTo(data.rates);
  }
  return (
    <>
      <input type="NUMBER" placeholder="Enter amount here..." />
      <select onChange={handleCurrFrom}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={handleCurrTo}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <button onClick={handlingAPI}>Calculate</button>
      <p>output: {currTo.INR}</p>
    </>
  );
}

export default App;
