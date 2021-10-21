import "dotenv/config";
import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { router } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket => {
  console.log(`Usuario conectado no socket ${socket.id}`);
})



const clientId = process.env.GITHUB_CLIENT_ID;
app.get("/github", (req: Request, res: Response) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
});

app.get("/signin/callback", (req: Request, res: Response) => {
  const { code } = req.query;

  return res.json(code);
});

export { serverHttp, io };
