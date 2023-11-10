import { useEffect, useRef, useState } from "react";

function App(): JSX.Element {

  const [currentValue, setCurrentValue] = useState<string>("");
  const [operator, setOperator] = useState<string>("");
  const [displayVal, setDisplayVal] = useState<string>("");
  const prevValueRef = useRef("");
  const prevOperatorRef = useRef("");

  function handleCompute(sign?:string):void {
    if (!operator) {
      setOperator(sign as string);
    } else {
      prevOperatorRef.current = operator;
      setOperator(sign as string);
    }

    if (prevOperatorRef.current) {
      const prev:number = parseFloat(prevValueRef.current);
      const current:number = parseFloat(currentValue);
      if (!isNaN(prev) && !isNaN(current)) {
        switch (prevOperatorRef.current) {
          case "+":
            prevValueRef.current = (prev + current).toString();
            break;
          case "-":
            prevValueRef.current = (prev - current).toString();
            break;
          case "*":
            prevValueRef.current = (prev * current).toString();
            break;
          case "/":
            prevValueRef.current = (prev / current).toString();
            break;
          default:
            break;
        }
      }
      setCurrentValue("");
    } else {
      prevValueRef.current = currentValue;
      setCurrentValue("");
    }
  }

  function handleNumberInput(num:string | number):void {
    setCurrentValue(currentValue + num); //String
  }

  function handlePercentage():void {
    if(!prevValueRef.current) {
      const percentage:number = parseFloat(currentValue) / 100;
      setCurrentValue(percentage.toString());
    } else {
      const percentage:number = parseFloat(prevValueRef.current) / 100;
      setCurrentValue(percentage.toString());
    }
  }

  function clearAll():void {
    setCurrentValue("");
    prevValueRef.current = "";
    prevOperatorRef.current = "";
    setOperator("");
    setDisplayVal("");
  }

  useEffect(() => {
    if(!prevValueRef.current) {
      setDisplayVal(currentValue);
    } else {
      setDisplayVal(prevValueRef.current);
    }
  },[currentValue])

  return (
    <div className="w-screen h-screen flex justify-center items-center">
    <main className="w-[375px] h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 sm:w-[375px] sm:h-auto lg:w-[650px]">
      <div className="w-[100%] text-7xl py-2 h-[76px] text-right text-white">
        {displayVal ? displayVal : 0}
      </div>
      <div className="w-[100%] text-4xl py-2 h-[76px] text-right text-gray-200">
        {currentValue ? currentValue : ""}
      </div>
      <div className="flex flex-wrap mt-10">
        <button className="w-[50%] h-24 border border-black rounded active:bg-red-700" onClick={() => clearAll()}>AC</button>
        <button className="w-[25%] h-24 border border-black rounded focus:bg-green-900" name="%"
          onClick={() => handlePercentage()}>
          %
        </button>
        <button className="w-[25%] h-24 border border-black rounded focus:bg-green-900" name="/"
          onClick={() => handleCompute("/")}>
          /
        </button>
        <button className="w-[25%] h-24 border border-black rounded"
          onClick={() => handleNumberInput(7)}>
          7
        </button>
        <button className="w-[25%] h-24 border border-black rounded"
          onClick={() => handleNumberInput(8)}>
          8
        </button>
        <button className="w-[25%] h-24 border border-black rounded"
          onClick={() => handleNumberInput(9)}>
          9
        </button>
        <button className="w-[25%] h-24 border border-black rounded focus:bg-green-900" name="*"
          onClick={() => handleCompute("*")}>
          *
        </button>
        <button className="w-[25%] h-24 border border-black rounded"
          onClick={() => handleNumberInput(4)}>
          4
        </button>
        <button className="w-[25%] h-24 border border-black rounded"
          onClick={() => handleNumberInput(5)}>
          5
        </button>
        <button className="w-[25%] h-24 border border-black rounded"
          onClick={() => handleNumberInput(6)}>
          6
        </button>
        <button className="w-[25%] h-24 border border-black rounded focus:bg-green-900" name="-"
          onClick={() => handleCompute("-")}>
          -
        </button>
        <button className="w-[25%] h-24 border border-black rounded"
          onClick={() => handleNumberInput(1)}>
          1
        </button>
        <button className="w-[25%] h-24 border border-black rounded"
          onClick={() => handleNumberInput(2)}>
          2
        </button>
        <button className="w-[25%] h-24 border border-black rounded"
          onClick={() => handleNumberInput(3)}>
          3
        </button>
        <button className="w-[25%] h-24 border border-black rounded focus:bg-green-900" name="+"
          onClick={() => handleCompute("+")}>
          +
        </button>
        <button className="w-[50%] h-24 border border-black rounded"
          onClick={() => handleNumberInput(0)}>
          0
        </button>
        <button className="w-[25%] h-24 border border-black rounded"
          onClick={() => handleNumberInput(".")}>
          .
        </button>
        <button className="w-[25%] h-24 border border-black rounded focus:bg-green-900" name="="
          onClick={() => handleCompute()}>
          =
        </button>
      </div>
      <footer className="flex justify-center items-center text-white">FM</footer>
    </main>
    </div>
  );
}

export default App;
