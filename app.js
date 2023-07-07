const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
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
        res.render("index", { personas: result , order: "" });
    });
});

// 更新フォーム選択時
app.get("/edit/:id", (req, res) => {
    const sql = "SELECT * FROM personas WHERE id = ?";
    con.query(sql, req.params.id, function (err, result, fields) {
        if (err) throw err;
        res.render("editForm", { person: result });
    });
});

app.get("/post", (req, res) => {
    res.render("postForm");
});

// 新規レビュー追加フォーム送信
app.post("/post", (req, res) => {
    const sql = "INSERT INTO personas SET ?";
    con.query(sql, req.body, function (err, result, fields) {
        if (err) throw err;
        res.redirect("/");
    });
});

// 新規レビュー追加フォーム送信
app.post("/update/:id", (req, res) => {
    req.body.reason = convert(req.body.reason);
    console.log(req.body);
    function convert(jsonString) {
        return jsonString
            .replace(/(\r\n)/g, "\n")
            .replace(/(\r)/g, "\n")
            .replace(/(\n)/g, "\\n");
    }
    const sql = "UPDATE personas SET ? WHERE id = " + req.params.id;
    con.query(sql, req.body, function (err, result, fields) {
        if (err) throw err;
        res.redirect("/");
    });
});

// ソートを選択された場合の処理
app.get("/:order", (req, res) => {
    console.log(req.params.order)
    let sql = "";
    // 標準の場合は全てのユーザー情報を返す
    if (req.params.order === "base") sql = "SELECT * FROM personas";
    // 順番が選択されている場合は昇順か降順か指定する
    else sql = "SELECT * FROM personas ORDER BY rating "+ req.params.order;
    con.query(sql, function (err, result, fields) {
        if (err) throw err;
        // ソートされたユーザー情報と順番の情報を返す
        res.render("index", { personas: result , order: req.params.order});
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
