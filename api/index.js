import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./Routers/auth.router.js";
import userRouter from "./Routers/user.router.js";
import addressRouter from "./Routers/address.router.js";
import productRouter from "./Routers/product.router.js";

const app = express();
dotenv.config();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("connected to DB");
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/address", addressRouter);
app.use("/api/product", productRouter);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
