# Tutorial: Chart.js Diagramm mit Button

## Ziel
In diesem Tutorial lernst du, wie du mit Chart.js ein Diagramm erstellst und mit
einem Button zwischen einem Linien- und einem Balkendiagramm wechseln kannst.
Zusätzlich lernst du, wie du Titel, Achsenbeschriftungen und Tooltips (mit Einheit)
einbaust und wie du die Optik anpasst (Farben, Punkte, Liniensegmente).

---

## Voraussetzungen

Du solltest können:

- Grundlagen in HTML (Tags, Script einbinden)
- Grundlagen in JavaScript (Variablen, Funktionen)
- Visual Studio Code benutzen
- Git/GitHub verwenden (commit/push)

---

## Projektstruktur

So ist das Projekt aufgebaut:

```
/index.html
/main.js
/docs/tutorial.md
/docs/demo.gif
```

---

## Schritt 1: Chart.js einbinden (HTML)

In `index.html` wird Chart.js über ein CDN geladen:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

Damit Chart.js zeichnen kann, brauchen wir ein Canvas:

```html
<canvas id="chart" width="900" height="450"></canvas>
```

Der Button wird später benutzt, um zwischen Diagrammtypen zu wechseln:

```html
<button id="toggleBtn">Wechsel zu Balkendiagramm</button>
```

Am Schluss wird unser JavaScript geladen:

```html
<script src="main.js"></script>
```

---

## Schritt 2: Daten vorbereiten (JavaScript)

In `main.js` definieren wir die Namen (labels) und Werte (values):

```js
const labels = [
  'Donald Trump',
  'Joe Biden',
  'Bill Clinton',
  'Grover Cleveland',
  'Barack Obama',
  'Kamala Harris'
];

const values = [12200, 19800, 30000, 50000, 20000, 3000];
```

- `labels` = Text auf der X-Achse  
- `values` = Zahlenwerte zu jedem Label (Anzahl muss gleich sein)

---

## Schritt 3: Gemeinsame Einstellungen (Titel, Achsen, Tooltip)

Damit beide Diagrammtypen gleich aussehen, gibt es gemeinsame Optionen:

```js
plugins: {
  title: {
    display: true,
    text: 'Stimmen von US-Präsidenten (in Tausend)'
  },
  tooltip: {
    callbacks: {
      label: (context) => context.parsed.y + ' Tausend Stimmen'
    }
  }
}
```

---

## Schritt 4: Liniendiagramm (mit farbigen Segmenten)

Für das Liniendiagramm wird `type: 'line'` verwendet.

```js
segment: {
  borderColor: (ctx) => {
    const i = ctx.p0DataIndex;
    return segmentColors[i] || 'black';
  }
}
```

Zusätzlich wurde die Optik verbessert:

```js
tension: 0.3,
pointRadius: 5,
pointHoverRadius: 7
```

---

## Schritt 5: Balkendiagramm (jede Säule eigene Farbe)

Für das Balkendiagramm wird `type: 'bar'` verwendet.

```js
backgroundColor: barColorsBg,
borderColor: barColorsBorder
```

---

## Schritt 6: Umschalten per Button (Line ↔ Bar)

Die Variable `mode` speichert den aktuellen Diagrammtyp:

```js
let mode = 'line';
```

Beim Klick auf den Button wird der Typ gewechselt:

```js
toggleBtn.addEventListener('click', () => {
  mode = (mode === 'line') ? 'bar' : 'line';
  render();
});
```

Wichtig: Beim Wechsel wird das alte Diagramm zerstört:

```js
if (chart) chart.destroy();
```

---

## Erwartetes Resultat

Das fertige Projekt enthält:

- Ein Diagramm mit Titel und Achsenbeschriftung
- Einen Tooltip mit Einheit „Tausend Stimmen“
- Ein Liniendiagramm mit farbigen Segmenten
- Ein Balkendiagramm mit individuellen Farben
- Einen Button zum Umschalten

![Diagramm-Demo](demo.gif)

---

## Was kann schiefgehen?

1. Canvas-ID passt nicht  
Wenn im HTML `id="chart"` steht, muss im JS auch `getElementById('chart')` stehen.

2. Chart.js wird nicht geladen  
Wenn das CDN-Script fehlt oder falsch eingebunden ist, funktioniert `new Chart(...)` nicht.

3. Labels und Werte stimmen nicht überein  
Wenn du 6 Labels hast, brauchst du auch 6 Werte im Array `values`.

---

## Fazit

In diesem Tutorial wurde gezeigt, wie man mit Chart.js ein interaktives
Diagramm erstellt und zwischen zwei Diagrammtypen wechseln kann.
Durch zusätzliche Einstellungen wie Titel, Achsenbeschriftungen und Tooltip
wird das Diagramm verständlicher und übersichtlicher.
