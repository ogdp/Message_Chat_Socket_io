import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

import http from "http";
import { Server } from "socket.io";

import connectDB from "./configs/database.js";
import Router from "./routes/index.js";

const app = express();
dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "https://vercel-server-gmjo.vercel.app",
    origin: "https://message-chat-socket-io.vercel.app",
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const { PORT, MONGO_URI } = process.env;
// Khởi tạo kết nối với cơ sở dữ liệu
connectDB(MONGO_URI);

app.use(express.json());
// Bỏ block fetch api CORS
app.use(cors());
app.use(morgan("tiny"));

// Theme home
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get("/", (req, res) => {
  // docs https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
  return res.sendFile(path.join(__dirname, "./public/index.html"));
});
// Navigate Router
app.use("/api", Router);

// Notfound api
app.use((req, res, next) => {
  return res.status(404).json({
    message: "API không tồn tại, bỏ cái thói rình mò API người khác đi",
  });
});

// SOCKET
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("joinRoom", (roomId) => {
    console.log("Client joined room: " + roomId + "   " + Date.now());

    // Gửi dữ liệu từ database đến client (giả sử data là dữ liệu từ database)
    socket.join(roomId);
  });

  socket.on("send_message", (data) => {
    // console.log(data);
    const { chatID } = data;
    socket.join(chatID);
    // console.log(socket.to(chatID));
    socket.to(chatID).emit("receive_message", data);
  });
});

io.on("disconnect", (socket) => {
  console.log("User disconnect", socket.id);
});
// Required listening Express server
server.listen(PORT, (req, res) =>
  console.log("Listen server running port " + PORT)
);

export const viteNodeApp = server;
