import express from "express";
const app = express();

app.use(express.json());

import phoneRoutes from "./routes/phoneRoutes";
import uploadRoutes from "./routes/uploadRoutes"; 
import authRoutes from "./routes/authRoutes";

app.use("/api/auth", authRoutes);
app.use("/api", phoneRoutes);
app.use("/api", uploadRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
