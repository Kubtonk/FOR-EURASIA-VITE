import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import calcRoutes from "./routes/calcRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", calcRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
