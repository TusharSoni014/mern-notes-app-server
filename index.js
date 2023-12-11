const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter.js");
const cookieParser = require("cookie-parser");
const dbconnect = require("./dbconnect");
const notesRouter = require("./routes/notesRouter.js");
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//debug middlewares
// app.use((req, res, next) => {
//     console.log("type:",req.method, ",endpoint:",req.url)
//     next()
// })

//routes
app.use("/user", userRouter);
app.use("/note", notesRouter);

//mongodb connect
dbconnect();

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
