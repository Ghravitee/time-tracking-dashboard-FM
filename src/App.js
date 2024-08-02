import { useState, useEffect } from "react";
import jeremy from "./images/image-jeremy.png";
import ellipse from "./images/icon-ellipsis.svg";

function App() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((myJson) => setData(myJson));
  };

  useEffect(() => {
    getData();
  }, []);

  const [timeframe, setTimeframe] = useState("weekly");

  return (
    <main className="bg-[hsl(226_43%_10%)] lg:min-h-screen lg:flex lg:justify-center lg:items-center py-10 px-4 ">
      <div className="grid lg:grid-cols-4 lg:grid-rows-2 grid-cols-1 gap-6 sm:max-w-[30rem] mx-auto lg:max-w-none">
        <div className="lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3 bg-[hsl(235_46%_20%)] rounded-2xl ">
          <div className="bg-[hsl(246_80%_60%)] px-4 py-6 lg:pb-10 rounded-2xl flex gap-4 items-center lg:flex-col lg:items-start lg:gap-8">
            <img
              src={jeremy}
              alt="jeremy"
              className="border-2 border-white rounded-full w-[20%] lg:w-[30%]"
            />
            <div>
              <p className="text-[hsl(236_100%_87%)] max-w-24">Report for</p>
              <div className="flex justify-center items-center gap-2 lg:flex-col">
                <p className="rubik-code-300 text-[1.6rem] lg:text-4xl text-white max-w-36">Jeremy</p>
                <p className="rubik-code-300 text-[1.6rem] lg:text-4xl text-white max-w-36">Robson</p>
              </div>
            </div>
          </div>
          <div className="p-6 flex lg:flex-col lg:gap-2 items-start justify-between">
            <button
              className="text-[hsl(235_45%_61%)] text-lg hover:text-white focus:text-white rubik-code-300"
              onClick={() => setTimeframe("daily")}
            >
              Daily
            </button>
            <button
              className="text-[hsl(235_45%_61%)] text-lg hover:text-white focus:text-white rubik-code-300"
              onClick={() => setTimeframe("weekly")}
            >
              Weekly
            </button>
            <button
              className="text-[hsl(235_45%_61%)] text-lg hover:text-white focus:text-white rubik-code-300"
              onClick={() => setTimeframe("monthly")}
            >
              Monthly
            </button>
          </div>
        </div>

        {data.map((item, index) => (
          <div
            key={index}
            className={`flex pt-8 flex-col rounded-2xl ${index <=2 ? `lg:col-start-${(index % 4) + 2} lg:col-end-${(index % 4) + 3}` : `lg:col-start-${(index % 3) + 2} lg:col-end-${(index % 3) + 3}`} ${
              index >= 3 ? "lg:row-start-2" : ""
            } bg-no-repeat bg-right-top `}
            style={{
              backgroundColor:
                index === 0
                  ? "hsl(15, 100%, 70%)"
                  : index === 1
                  ? "hsl(195, 74%, 62%)"
                  : index === 2
                  ? "hsl(348, 100%, 68%)"
                  : index === 3
                  ? "hsl(145, 58%, 55%)"
                  : index === 4
                  ? "hsl(264, 64%, 52%)"
                  : "hsl(43, 84%, 65%)",
                  backgroundImage: `url(${require(`./images/icon-${item.title.toLowerCase().replace(/ /g, "-")}.svg`)})`,
            }}
          >
            <div className="bg-[hsl(235_46%_20%)] rounded-2xl py-4 px-6 mt-auto flex flex-col gap-6 hover:bg-[hsl(235_46%_35%)]">
              <div className="flex justify-between items-center">
                <p className="text-white rubik-code-500">{item.title}</p>
                <img src={ellipse} alt="ellipse"className="hover:cursor-pointer"/>
              </div>
              <p className="text-5xl text-white rubik-code-400">
                {item.timeframes[timeframe].current}hrs
              </p>
              <p className="text-[hsl(236_100%_87%)] text-sm rubik-code-300">
                Last {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} -{" "}
                {item.timeframes[timeframe].previous}hrs
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;

