// Import stylesheets
import Highcharts = require('highcharts');
import { toBlob } from 'html-to-image';
import './style.css';

const exportBtn: HTMLElement = document.getElementById('exportBtn');
const chart: HTMLElement = document.getElementById('chart');

// starting from 1000px all dots are absent on resulting png
chart.style.setProperty('min-width', '1500px');

const chartOptions: Highcharts.Options = {
  title: {
    text: 'Test test test',
  },

  xAxis: [
    {
      title: {
        text: 'Data',
      },
      alignTicks: false,
    },
  ],

  yAxis: [
    {
      title: { text: 'Data' },
    },
    {
      title: { text: 'Test test test' },
      opposite: true,
    },
  ],

  series: [
    {
      name: 'Data',
      type: 'scatter',
      data: [
        1.0802526784883426, 9.483373544127076, 5.8305972634597625,
        1.9632355392817447, 8.67649492398763, 7.468786628142174,
        3.043499201392499, 2.0989331946742618, 6.426561907125025,
        0.5179495945898593,
      ],
      accessibility: {
        exposeAsGroupOnly: true,
      },
      marker: {
        // radius: 13,
        // symbol: 'triangle',
        symbol: 'circle',
      },
    },
  ],
};
exportBtn.addEventListener('click', () => {
  toBlob(chart).then(function (blob) {
    if (!blob) return;
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.setProperty('display', 'none');
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = 'test.png';
    a.click();
    window.URL.revokeObjectURL(url);
  });
});
Highcharts.chart('chart', chartOptions);
