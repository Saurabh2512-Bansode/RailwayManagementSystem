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

// ADD a new route
app.post("/", (req, res) => {
    const connection = mysql.createConnection(connectionDetails);
    connection.connect();

    const queryText = `INSERT INTO Route (Source, Destination, TrainId) VALUES (?, ?, ?)`;
    connection.query(
        queryText,
        [req.body.Source, req.body.Destination, req.body.TrainId],
        (error, result) => {
            res.setHeader("content-type", "application/json");
            if (!error) {
                res.json(result);
            } else {
                console.error(error);
                res.status(500).json(error);
            }
            connection.end();
        }
    );
});

// GET all routes
app.get("/", (req, res) => {
    const connection = mysql.createConnection(connectionDetails);
    connection.connect();

    const queryText = `SELECT * FROM Route`;
    connection.query(queryText, (error, result) => {
        res.setHeader("content-type", "application/json");
        if (!error) {
            res.json(result);
        } else {
            console.error(error);
            res.status(500).json(error);
        }
        connection.end();
    });
});

module.exports = app;
