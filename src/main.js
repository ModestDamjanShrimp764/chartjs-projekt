const canvas = document.getElementById('chart');
const toggleBtn = document.getElementById('toggleBtn');

const labels = [
  'Donald Trump',
  'Joe Biden',
  'Bill Clinton',
  'Grover Cleveland',
  'Barack Obama',
  'Kamala Harris'
];

const values = [12200, 19800, 30000, 50000, 20000, 3000];

// Balken: jede Säule eigene Farbe
const barColorsBg = [
  'rgba(255, 99, 132, 0.5)',  // Rot
  'rgba(54, 162, 235, 0.5)',  // Blau
  'rgba(255, 206, 86, 0.5)',  // Gelb
  'rgba(75, 192, 192, 0.5)',  // Grün
  'rgba(153, 102, 255, 0.5)', // Lila
  'rgba(255, 159, 64, 0.5)'   // Orange
];

const barColorsBorder = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
];

// Linie: Farben pro Segment (zwischen 2 Punkten)
const segmentColors = ['red', 'yellow', 'blue', 'green', 'orange'];

let mode = 'line';
let chart = null;

// Gemeinsame Options (Titel, Achsen, Tooltip)
function buildCommonOptions() {
  return {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Stimmen von US-Präsidenten (in Tausend)'
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            // bei Line ist y, bei Bar ist y ebenfalls der Wert
            return context.parsed.y + ' Tausend Stimmen';
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'US-Präsidenten'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Stimmen (in Tausend)'
        }
      }
    }
  };
}

function buildConfigLine() {
  return {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Votes of USA President',
        data: values,

        fill: false,
        borderWidth: 3,

        // Optik verbessern
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'black',

        // Linie pro Abschnitt einfärben
        segment: {
          borderColor: (ctx) => {
            const i = ctx.p0DataIndex;
            return segmentColors[i] || 'black';
          }
        }
      }]
    },
    options: buildCommonOptions()
  };
}

function buildConfigBar() {
  return {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Votes of USA President',
        data: values,

        backgroundColor: barColorsBg,
        borderColor: barColorsBorder,
        borderWidth: 2
      }]
    },
    options: buildCommonOptions()
  };
}

function render() {
  if (chart) chart.destroy();

  chart = new Chart(canvas, mode === 'line' ? buildConfigLine() : buildConfigBar());

  // Button-Text (verständlicher)
  toggleBtn.textContent =
    mode === 'line' ? 'Wechsel zu Balkendiagramm' : 'Wechsel zu Liniendiagramm';
}

toggleBtn.addEventListener('click', () => {
  mode = (mode === 'line') ? 'bar' : 'line';
  render();
});

render();




