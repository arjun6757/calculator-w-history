import React, { useEffect, useRef, useState } from "react";
import { evaluate } from "mathjs";

export default function App() {
  const [InputValue, setInputValue] = useState("0");
  const [history, setHistory] = useState([{}]);
  const [answer, setAnswer] = useState("");
  const [displayAnswer, setDisplayAnswer] = useState(true);
  const scrollRef = useRef();

  useEffect(() => {
    const equationStr = InputValue;
    const isValid = /^[0-9+\-*%/().^\s]+$/.test(equationStr);
    setDisplayAnswer(InputValue === answer ? false : true);
    try {
      if (isValid) {
        const result = evaluate(equationStr);
        setAnswer(result.toString());
      }
    } catch (error) {
      setAnswer("NaN");
    }
  }, [InputValue]);

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
  }, [history, displayAnswer]); //so whenever history changes it will run

  // code for history
  const handleEqual = () => {
    const equationStr = InputValue;
    const equals = answer;
    setInputValue(answer);

    const previousCalculations = `${equationStr} = ${equals}`;
    setHistory((p) => {
      return [...p, { calc: previousCalculations }];
    });
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
      <div className="bg-black w-full h-full sm:w-[400px] sm:h-[600px] flex flex-col p-4 sm:rounded-xl place-content-between">
        <div
          ref={scrollRef}
          style={{ scrollbarWidth: "none" }}
          className="text-white text-lg gap-4 sm:gap-2 text-right h-1/4 overflow-scroll flex flex-col"
        >
          {history.map((h, i) => {
            return (
              <p key={i} className="text-[#888] text-lg text-right">
                {h.calc}
              </p>
            );
          })}
        </div>

        <div className="flex flex-col place-content-end gap-4">
          <div className="gap-2 border-b border-[#333] p-2">
            <input
              onChange={handleInputChange}
              value={InputValue}
              type="text"
              className="text-white text-right bg-transparent text-2xl outline-none w-full py-2"
            />

            {InputValue !== "0" && displayAnswer === true ? (
              <p className="text-[#888] text-right text-xl py-2">= {answer}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-4 gap-4 ">
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
            <button
              onClick={handleChange}
              className="bg-transparent text-orange-500 p-2 text-xl rounded place-self-center"
              value={"^"}
            >
              ^
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
              onClick={handleEqual}
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
