import { useEffect, useState } from "react";
import "./App.css";

// `https://api.frankfurter.app/latest?amount=${}&from=${}&to=${}`

function App() {
  const [amount, setAmount] = useState(100);
  const [currFrom, setCurrFrom] = useState("USD");
  const [currTo, setCurrTo] = useState("USD");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleCurrFrom(e) {
    setCurrFrom(e.target.value);
  }
  function handleCurrTo(e) {
    setCurrTo(e.target.value);
  }
  function handleAmount(e) {
    setAmount(e.target.value);
  }
  useEffect(() => {
    async function handlingAPI() {
      if (currFrom === currTo) return;
      setIsLoading(true);
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currFrom}&to=${currTo}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setOutput(data.rates[currTo]);
      setIsLoading(false);
    }
    handlingAPI();
  }, [amount, currFrom, currTo]);
  return (
    <>
      <input
        type="NUMBER"
        placeholder="100"
        onChange={handleAmount}
        disabled={isLoading}
      />
      <select onChange={handleCurrFrom} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={handleCurrTo} disabled={isLoading}>
        <option value="USD" selected>
          USD
        </option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {currFrom !== currTo ? (
          <>
            {!isLoading ? (
              <>
                {amount} {currFrom} is {output} {currTo}
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          `${amount} ${currFrom}`
        )}
      </p>
    </>
  );
}

export default App;
