import { useEffect, useState } from "react";
import "./App.css";

// `https://api.frankfurter.app/latest?amount=${}&from=${}&to=${}`

function App() {
  const [amount, setAmount] = useState(1);
  const [currFrom, setCurrFrom] = useState("USD");
  const [currTo, setCurrTo] = useState("INR");
  const [output, setOutput] = useState("");

  function handleCurrFrom(e) {
    setCurrFrom(e.target.value);
    console.log(e.target.value);
  }
  function handleCurrTo(e) {
    setCurrTo(e.target.value);
    console.log(e.target.value);
  }
  function handleAmount(e) {
    setAmount(e.target.value);
  }
  useEffect(() => {
    async function handlingAPI() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currFrom}&to=${currTo}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setOutput(data.rates[currTo]);
    }
    handlingAPI();
  }, [amount, currFrom, currTo]);
  return (
    <>
      <input
        type="NUMBER"
        placeholder="Enter amount here..."
        onChange={handleAmount}
      />
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
        <option value="INR" selected>
          INR
        </option>
      </select>
      <p>
        {amount} {currFrom} is {output} {currTo}
      </p>
    </>
  );
}

export default App;
