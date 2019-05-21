const db = require('./db');

//db.createTable();
//db.postQuestion("IS WATER WET?", "YES", "NO");

//db.test("SELECT * FROM Questions;");
db.test(`INSERT INTO 
            Votes (vote_date, qid, amountA, amountB)
         VALUES ('2019-05-20', 1, 0, 0);`);