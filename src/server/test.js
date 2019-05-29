const db = require('./db');

//db.createTable();
//db.postQuestion("IS WATER WET5?", "YES", "NO");

//db.test("INSERT INTO Questions (question, optionA, optionB) VALUES (\"Is Water Wet1?\", \"YES\", \"NO\");")
//db.test("SELECT * FROM Questions;");
db.test(`INSERT INTO 
            Votes (vote_date, qid, amountA, amountB)
         VALUES ('2019-06-01', 1, 0, 0);`);
