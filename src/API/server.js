const express = require("express");
const cors = require("cors"); // Import the cors middleware
const sqlite3 = require("sqlite3");
const path = require("path");


const app = express();
const port = 5000;
// Enable CORS for all routes, this function is to allow all the URLs
// to sent an POST,GET request otherwise it will give stats error Cors
app.use(cors());


const apiKey = "4111ad3f15115c1a4c60c3c0e73abdbbbffb435b";

// Middleware for API key validation
const apiKeyMiddleware = (req, res, next) => {
    const providedApiKey = req.headers["x-api-key"];

    // console.log("Provided API Key:", providedApiKey);
    // console.log("Expected API Key:", apiKey);

    if (!providedApiKey || providedApiKey !== apiKey) {
        return res.status(401).json({ error: "Unauthorized: Invalid API key" });
    }

    next();
};

app.use("/v0/api/Quizzki/PostUserData", apiKeyMiddleware);

const db = new sqlite3.Database(path.join(__dirname, "../db", "db_userData.db"));

// Create a users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    displayName TEXT,
    time TEXT,
    score INTEGER
  )
`);

app.use(express.json()); // Enable JSON parsing for request bodies

// API end point , that is to make and POST request to the APIs
app.post("/v0/api/Quizzki/PostUserData", async (req, res) => {
    const { displayName, time, score, email } = req.body;

    // Check if user ID exists in the database
    db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: "Error checking user data" });
            }

            if (row) {
                // User exists in the database
                if (score > row.score) {
                    // Update the score if the new score is higher
                    db.run(
                        "UPDATE users SET time = ?, score = ?, displayName = ? WHERE email = ?",
                        [time, score, displayName, email],
                        (updateErr) => {
                            if (updateErr) {
                                return res
                                    .status(500)
                                    .json({ error: "Error updating user data" });
                            }

                            res.json({
                                success: true,
                                message: "Score updated successfully",
                            });
                        }
                    );
                } else {
                    // Do nothing if the new score is not higher
                    res.json({ success: true, message: "Score not updated" });
                }
            } else {
                // User does not exist, insert new data
                db.run(
                    "INSERT INTO users (displayName, time, score, email) VALUES (?, ?, ?, ?)",
                    [displayName, time, score, email],
                    (insertErr) => {
                        if (insertErr) {
                            return res
                                .status(500)
                                .json({ error: "Error inserting user data" });
                        }

                        res.json({
                            success: true,
                            message: "User data inserted successfully",
                        });
                    }
                );
            }
        }
    );
});

app.get("/v0/api/Quizzki/getAllUserData", (req, res) => {
    // Retrieve all user data from the database
    db.all("SELECT displayName,time,score FROM users", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving user data" });
        }

        res.json({ success: true, data: rows });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
