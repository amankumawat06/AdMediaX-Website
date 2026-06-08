require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(
//   cors({
//     origin: [
//       // "http://127.0.0.1:5501",
//       // "http://localhost:5501",
//       "https://admediaix.in",
//       "https://www.admediaix.in"
//     ],
//     methods: ["GET", "POST", "OPTIONS"],
//   })
// );

app.use(cors())

const aiRoutes = require("./routes/aiRoute");

app.use("/api/ai", aiRoutes);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
