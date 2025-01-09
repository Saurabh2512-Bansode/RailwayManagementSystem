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

// ADD a new train
app.post("/", (req, res) => {
    const connection = mysql.createConnection(connectionDetails);
    connection.connect();

    const queryText = `INSERT INTO Train (TrainName, TrainNumber, Capacity) VALUES (?, ?, ?)`;
    connection.query(
        queryText,
        [req.body.TrainName, req.body.TrainNumber, req.body.Capacity],
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

// GET all trains
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
            res.status(500).json(error);
        }
        connection.end();
    });
});

module.exports = app;
