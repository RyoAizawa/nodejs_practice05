const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

const mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "review_db",
});

// 外部静的ファイルの取得
app.use(express.static("assets"));

app.get("/", (req, res) => {
    const sql = "SELECT * FROM personas";
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result)
        res.render("index", {personas: result})
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
