---
title: US President Votes Dashboard Tutorial
---

# Goal

In this tutorial, you will learn how to build an interactive dashboard to manage and visualize votes of US presidents. You will be able to add, update, delete and display data in a modern chart.

---

# Previous Knowledge

We'll assume you already know:

- Basics of HTML (tags, canvas)
- Basics of JavaScript (variables, functions)
- How to use Visual Studio Code
- Basic understanding of Node.js

---

# What you'll learn

In this tutorial you will learn:

- How to create a dashboard with Chart.js
- How to connect frontend with backend (API)
- How to implement CRUD operations (Create, Read, Update, Delete)
- How to visualize data in charts
- How to add features like sorting, filtering and export

---

# Tutorial

## Step 1: Start the project

Start the backend:


node server.js


Open the frontend (Live Server or browser):

http://127.0.0.1:5500/index.html

---

## Step 2: Load data from backend

```js
const response = await fetch("http://localhost:3000/api/presidents");
const data = await response.json();
Step 3: Create chart
new Chart(canvas, {
  type: "bar",
  data: {
    labels,
    datasets: [{
      data: values
    }]
  }
});
Step 4: Add CRUD functions
Add:
POST /api/presidents
Update:
PUT /api/presidents/:id
Delete:
DELETE /api/presidents/:id
Step 5: Add features
Search by name
Sort by votes
Show statistics (total, avg, max, min)
Dark mode
CSV export
Ranking with Top 3
Step 6: Improve UI
Modern design (glass effect)
Background image
Clean layout
Interactive chart
Result

The final result is a complete dashboard where users can:

Manage presidents (CRUD)
View data in a chart
Analyze statistics
Filter and sort data
Export data as CSV
What could go wrong?
Backend not running → no data
Wrong API URL → fetch fails
Chart.js not loaded → no chart
Data mismatch → chart errors
