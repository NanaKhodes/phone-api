const express = require("express");
const app = express();


const phoneRoutes = require("./routes/phoneRoutes");
const uploadRoutes = require("./routes/uploadRoutes"); 

app.use(express.json());
app.use("/api", phoneRoutes);
app.use("/api", uploadRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
