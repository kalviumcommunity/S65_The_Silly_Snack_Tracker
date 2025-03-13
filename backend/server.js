const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB Atlas
mongoose.connect('your_mongodb_atlas_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
});

// Ping route
app.get("/ping", (req, res) => {
    res.send("pong");
});

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username, password });
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.cookie("username", username, { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour
    res.json({ message: "Login successful", username });
});

// Logout endpoint
app.post("/api/auth/logout", (req, res) => {
    res.clearCookie("username");
    res.json({ message: "Logout successful" });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
