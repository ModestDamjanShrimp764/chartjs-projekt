const express = require("express");
const cors = require("cors");
const app = express();
const presidentsRoute = require("./routes/presidents");

app.use(cors());
app.use(express.json());

app.use("/api/presidents", presidentsRoute);

app.get("/", (req, res) => {
  res.send("Backend läuft 🚀");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
