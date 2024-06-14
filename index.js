import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", router);

//Server start
app.listen(3000, () => {
   console.log("Server is running on http://localhost:3000");
});
