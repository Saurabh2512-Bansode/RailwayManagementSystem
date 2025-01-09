const express = require('express');
const mysql = require('mysql2');
const config = require('config');

const app = express.Router();
app.use(express.json());

const connectionDetails = {
    host: config.get("host"),
    user: config.get("user"),
    password: config.get("password"),
    database: config.get("dbname"),
    port: config.get("port"),
};

// GET all train details
app.get("/", (req, res) => {
    const connection = mysql.createConnection(connectionDetails);
    connection.connect();

    const queryText = `SELECT * FROM Train`;
    connection.query(queryText, (error, result) => {
        res.setHeader("content-type", "application/json");
        if (!error) {
            res.json(result);
        } else {
            console.error(error);
            res.status(500).json({ error: "Database error" });
        }
        connection.end();
    });
});

// GET train details by TrainNo
app.get("/:TrainNo", (req, res) => {
    const connection = mysql.createConnection(connectionDetails);
    connection.connect();

    const TrainNo = req.params.TrainNo;
    console.log("Fetching train with TrainNo:", TrainNo); // Debug log

    const queryText = `SELECT * FROM Train WHERE TrainNo = ?`;
    connection.query(queryText, [TrainNo], (error, result) => {
        res.setHeader("content-type", "application/json");
        if (error) {
            console.error("Database error:", error); // Debug error log
            return res.status(500).json({ error: "Database error" });
        }

        console.log("Query result:", result); // Debug query result
        if (result.length > 0) {
            res.json(result[0]); // Return the first matching record
        } else {
            res.status(404).json({ error: "Train not found" });
        }
        connection.end();
    });
});


// ADD a new train
app.post("/", (req, res) => {
    const { TrainNo, ArrivalTime, DepartureTime, Destination, Source, Date } = req.body;

    if (!TrainNo || !ArrivalTime || !DepartureTime || !Destination || !Source || !Date) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const connection = mysql.createConnection(connectionDetails);
    connection.connect();

    const queryText = `
        INSERT INTO Train (TrainNo, ArrivalTime, DepartureTime, Destination, Source, Date)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    connection.query(
        queryText,
        [TrainNo, ArrivalTime, DepartureTime, Destination, Source, Date],
        (error, result) => {
            res.setHeader("content-type", "application/json");
            if (!error) {
                res.json({ success: true, data: result });
            } else {
                console.error(error);
                res.status(500).json({ error: "Database error" });
            }
            connection.end();
        }
    );
});

module.exports = app;
