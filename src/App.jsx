import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [InputValue, setInputValue] = useState("0");
  const [history, setHistory] = useState([{}]);

  const scrollRef = useRef();

  /* this useEffect and useRef is used to scroll to the bottom each time history updates meaning
  even if a overflow happens it will automatically scroll to the bottom and show the latest history
  possible.
  */

  useEffect(() => {
    if (scrollRef.current) {
      //if it is a valid dom reference
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      //so it scrolls to the very bottom meaning scrolltop specifies the y axis and scrollheight here is the size of the full container
    }
  }, [history]); //so whenever history changes it will run

  const performEquation = (e) => {
    const equationStr = InputValue;
    const isValid = /^[0-9+\-*%/().\s]+$/.test(equationStr);
    if (isValid) {
      const result = new Function(`return ${equationStr}`)();
      setInputValue(result.toString());
      const previousCalculations = `${equationStr} = ${result}`;
      // if(history.length === 5) {}
      setHistory((p) => {
        return [...p, { calc: previousCalculations }];
      });
    } else {
      setInputValue("Invalid :(");
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue((prev) => {
      if (prev === "0") {
        return value;
      } else {
        return prev + value;
      }
    });
  };

  const handleSpecial = (e) => {
    const { value } = e.target;
    if (value === "AC") {
      setInputValue("0");
    } else if (value === "C") {
      // just have to minus last one from the input
      setInputValue((p) => {
        if (InputValue.length === 1) {
          return "0";
        } else {
          return p.slice(0, -1);
        }
        //it will exclude the last one
        //will start from 0
      });
    } else {
      setInputValue((p) => p + value);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-customBlack w-[400px] h-[600px] flex flex-col p-4 sm:rounded place-content-between">
        <div
          ref={scrollRef}
          style={{ scrollbarWidth: "none" }}
          className="text-white text-lg gap-4 sm:gap-2 text-right h-1/4 overflow-scroll flex flex-col"
        >
          {history.map((h, i) => {
            return (
              <p key={i} className="text-white text-lg text-right">
                {h.calc}
              </p>
            );
          })}
        </div>

        <div className="flex flex-col place-content-end p-4 gap-4">
          <input
            onChange={handleInputChange}
            value={InputValue}
            type="text"
            className="text-white text-right bg-transparent border-b border-[#333] text-xl outline-none w-full p-2"
          />

          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={handleSpecial}
              className="bg-transparent text-orange-500 p-2 text-xl rounded"
              value={"AC"}
            >
              AC
            </button>
            <button
              onClick={handleSpecial}
              className="bg-transparent text-orange-500 p-2 text-xl rounded"
              value={"C"}
            >
              C
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-orange-500 p-2 text-xl rounded"
              value={"%"}
            >
              %
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-orange-500 p-2 text-xl rounded"
              value={"/"}
            >
              /
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-white p-2 text-xl rounded"
              value={"7"}
            >
              7
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-white p-2 text-xl rounded"
              value={"8"}
            >
              8
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-white p-2 text-xl rounded"
              value={"9"}
            >
              9
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-orange-500 p-2 text-xl rounded"
              value={"*"}
            >
              *
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-white p-2 text-xl rounded"
              value={"4"}
            >
              4
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-white p-2 text-xl rounded"
              value={"5"}
            >
              5
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-white p-2 text-xl rounded"
              value={"6"}
            >
              6
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-orange-500 p-2 text-xl rounded"
              value={"-"}
            >
              -
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-white p-2 text-xl rounded"
              value={"1"}
            >
              1
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-white p-2 text-xl rounded"
              value={"2"}
            >
              2
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-white p-2 text-xl rounded"
              value={"3"}
            >
              3
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-orange-500 p-2 text-xl rounded"
              value={"+"}
            >
              +
            </button>
            <button className="bg-transparent text-orange-500 p-2 text-xl rounded place-self-center">
              <a href="https://github.com/arjun6757/calculator-w-history">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-white p-2 text-xl rounded"
              value={"0"}
            >
              0
            </button>
            <button
              onClick={handleChange}
              className="bg-transparent text-white p-2 text-xl rounded"
              value={"."}
            >
              .
            </button>
            <button
              onClick={performEquation}
              className="bg-transparent text-orange-500 p-2 text-xl rounded"
              value={"="}
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
