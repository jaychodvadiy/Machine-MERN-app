const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./config/db");

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// Call dbConnect to connect to MongoDB
dbConnect();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/agents", require("./routes/agentRoutes"));
app.use("/api/lists", require("./routes/listRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
