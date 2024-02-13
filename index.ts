import express from "express";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", (req, res) => {
  res.send("got it!");
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
