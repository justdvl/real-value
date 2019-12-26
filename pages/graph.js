import { Chart } from "react-charts";

function Graph({ graphData }) {
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: graphData
      }
    ],
    []
  );

  console.log("data", data);
  console.log("graphData", graphData);

  const axes = React.useMemo(
    () => [
      { primary: true, type: "time", position: "bottom" },
      { type: "linear", position: "left" }
    ],
    []
  );

  return (
    <div
      style={{
        width: "500px",
        height: "500px",
        border: "1px solid blue",
        position: "relative"
      }}
    >
      <Chart data={data} axes={axes} />
      <div
        style={{
          width: "15px",
          height: "15px",
          background: "red",
          position: "absolute",
          right: "0px",
          bottom: "0px",
          cursor: "se-resize"
        }}
      ></div>
    </div>
  );
}

export default Graph;
