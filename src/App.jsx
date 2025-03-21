import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cash, setCash] = useState({});

  const fetchData = async () => {
    if (cash[input]) {
      setResults(cash[input]);
      console.log("returned cash: ", input);
      return;
    }

    const data = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const json = await data.json();
    console.log("api call made for...", input);
    setResults(json?.recipes);

    setCash((prev) => ({ ...prev, [input]: json?.recipes }));

    console.log("results updated..");
  };

  useEffect(() => {
    const timer = setTimeout(input != "" && fetchData, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="App">
      <h2>Autocomplete Search Box</h2>
      <div>
        <input
          type="text"
          className="search-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            console.log(e.target.value);
          }}
          onFocus={() => {
            setShowResults(true);
          }}
          onBlur={() => {
            setShowResults(false);
          }}
        />
        {showResults && (
          <div className="results-container">
            {results.map((r) => (
              <span className="results" key={r.id}>
                {r.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
