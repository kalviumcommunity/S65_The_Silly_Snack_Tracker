const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Ping route
app.get("/ping", (req, res) => {
    res.send("pong");
});

// Login endpoint
app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
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
