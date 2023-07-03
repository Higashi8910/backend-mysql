import React from "react";
import Chart from "react-apexcharts";

const TodoGraph = ({ completeTodos, incompleteTodos }) => {
  const priorityCounts = {
    high: { complete: 0, incomplete: 0 },
    medium: { complete: 0, incomplete: 0 },
    low: { complete: 0, incomplete: 0 },
    other: { complete: 0, incomplete: 0 },
  };

  completeTodos.forEach((todo) => {
    if (todo.priority === "大") {
      priorityCounts.high.complete++;
    } else if (todo.priority === "中") {
      priorityCounts.medium.complete++;
    } else if (todo.priority === "小") {
      priorityCounts.low.complete++;
    } else {
      priorityCounts.other.complete++;
    }
  });

  incompleteTodos.forEach((todo) => {
    if (todo.priority === "大") {
      priorityCounts.high.incomplete++;
    } else if (todo.priority === "中") {
      priorityCounts.medium.incomplete++;
    } else if (todo.priority === "小") {
      priorityCounts.low.incomplete++;
    } else {
      priorityCounts.other.incomplete++;
    }
  });

  const chartData = {
    series: [
      {
        name: "完了",
        data: [
          priorityCounts.high.complete,
          priorityCounts.medium.complete,
          priorityCounts.low.complete,
          priorityCounts.other.complete,
        ],
      },
      {
        name: "未完了",
        data: [
          priorityCounts.high.incomplete,
          priorityCounts.medium.incomplete,
          priorityCounts.low.incomplete,
          priorityCounts.other.incomplete,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["大", "中", "小", "その他"],
      },
      yaxis: {
        title: {
          text: "件数",
          // style: {
          //   fontSize: "14px",
          // },
          rotate: 0, // タイトルを縦書きにするために回転させる
          offsetX: 0, // タイトルの位置を調整
          offsetY: 0, // タイトルの位置を調整
        },
      },
      colors: ["#008FFB", "#FF4560"],
      legend: {
        show: true,
        position: "bottom",
      },
    },
  };

  const chartOptions = {
    labels: ["大", "中", "小", "その他"],
    colors: ["#008FFB", "#FF4560"],
    legend: {
      show: true,
      position: "bottom",
    },
  };

  return (
    <div>
      <h1>TODO進捗度</h1>
      <p> TODOリストの進捗度</p>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default TodoGraph;
