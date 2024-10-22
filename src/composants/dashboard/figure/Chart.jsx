import React, { useEffect, useState } from 'react'
import './chart.scss'
import { Doughnut, Line } from 'react-chartjs-2'
import datas from './datas.json'
import {
    Chart as ChartJS,
    CategoryScale, // Echelle pour les catégories
    LinearScale, // Echelle pour les valeurs
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from 'chart.js';

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

function Charts() {
    

    const lineaire =
          {labels: datas.map((data) => data.label),
          datasets: [
            {
              label: "Nombre d'utilisation des matériels chaque jour",
              data: datas.map((data) => data.revenue),
              backgroundColor: "#064FF0",
              borderColor: "#064FF0",
            },
          ]
    }

    const doubleChart = {
        labels : ["A", "B", "C"],
        datasets: [{
            label : "Revenue",
            data : [200, 300, 400],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        }]
    }

    return (
        <div className='chart'>
            <div className="haut">
                <div className="chart1">
                    <Doughnut data={ doubleChart}/>
                </div>
                <div className="chart2">
                    <Line data={lineaire}/>
                    
                </div>
            </div>
            <div className="bas">
                <div className="chart1">
                    <Doughnut data={ doubleChart}/>
                </div>
                <div className="chart2">
                    <Line data={lineaire}/>
                </div>
            </div>
        </div>
    )
}

export default Charts
