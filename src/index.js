import { getRate } from "./controllers";
import makeCallBack from "./express-callback";
import express from "express";
import bodyParser from "body-parser";
import figlet from "figlet";
import http from "http";
import dotenv from "dotenv";

const accessControlAllow = function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", 86400);
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(accessControlAllow);
app.get(`/api/v1/rates`, makeCallBack(getRate));


const httpServer = http.createServer(app);
httpServer.listen(3000);

figlet("RATES", function(err, data) {
  if (err) {
    return;
  }
  console.log(data);
});

export default app;
