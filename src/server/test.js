const db = require('./db');

//db.createTable();
//db.postQuestion("IS WATER WET5?", "YES", "NO");

//db.test("INSERT INTO Questions (question, optionA, optionB) VALUES (\"Is Water Wet1?\", \"YES\", \"NO\");")
//db.test("SELECT * FROM Questions;");
let sql = `INSERT INTO 
             Votes (vote_date, qid, amountA, amountB)
            VALUES ('2019-06-13', 1, 0, 0);`;

// let sql = `UPDATE Votes 
//            SET amountA = 10, amountB = 20 
//            WHERE vote_date = '2019-06-03';`;
//let sql = "SELECT * FROM Votes;";
db.test(sql);