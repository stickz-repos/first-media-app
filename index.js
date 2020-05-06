const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const Express = require("express");
const app = new Express();

//imports
const db = require("./config/keys");
const categoryRouter = require("./routes/categoryRouter");

//variables
const port = process.env.PORT || 3000;

//middleware
app.use(bodyParser.json());
app.use("/api/category", categoryRouter);

//mongoDB
mongoose
  .connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

//check and serve production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//start server
app.listen(port, () => console.log(`Server started on port: ${port}`));
