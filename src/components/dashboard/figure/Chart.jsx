import React, { useEffect, useState } from "react";
import "./chart.scss";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import datas from "./datas.json";
import {
  Chart as ChartJS,
  CategoryScale, // Echelle pour les catégories
  LinearScale, // Echelle pour les valeurs
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import AxiosInstance from "../../Axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const defaultChartData = {
  labels: [],
  datasets: [],
};

function Charts() {
  const [chartData, setChartData] = useState(defaultChartData);
  const [chartData1, setChartData1] = useState(defaultChartData);
  const [chartData3, setChartData3] = useState(defaultChartData);
  const [loading, setLoading] = useState(true);

  const GetData1 = () => {
    AxiosInstance.get("/utilisation/utilisation-30-jours/").then((res) => {
      const formattedData = {
        ...res.data,
        labels: res.data.labels.map((date) => {
          return new Date(date).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
          });
        }),
      };

      setChartData1(formattedData);
      setLoading(false);
    });
  };

  const GetData2 = () => {
    AxiosInstance.get("/utilisation/statistiques-materiels/").then((res) => {
      setChartData(res.data);
      setLoading(false);
    });
  };
  const GetData3 = () => {
    AxiosInstance.get(`/utilisation/utilisations-quotidiennes/`).then((res) => {
      setChartData3(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Utilisation des matériels",
      },
    },
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!chartData) {
    return <div>Aucune donnée disponible</div>;
  }

  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Utilisation des matériels sur les 30 derniers jours",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
      line: {
        tension: 0.3, // Rend la ligne plus lisse
      },
    },
  };

  if (loading) {
    return (
      <div className="chart-loading">
        <span>Chargement du graphique...</span>
      </div>
    );
  }

  const options3 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Utilisations quotidiennes par utilisateur",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Chargement des données...</p>
      </div>
    );
  }

  if (!chartData || !chartData.datasets.length) {
    return (
      <div className="no-data-container">
        <p>Aucune donnée disponible pour la période</p>
      </div>
    );
  }

  return (
    <div className="chart">
      <div className="haut">
        <div className="chart1">
          <Doughnut options={options} data={chartData} />
        </div>
        <div className="chart2">
          {chartData1 && <Line options={options1} data={chartData1} />}
        </div>
      </div>
      <div className="bas">
        <Line options={options3} data={chartData3} />
      </div>
    </div>
  );
}

export default Charts;
