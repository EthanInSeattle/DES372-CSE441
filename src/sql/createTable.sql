DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Votes;

CREATE TABLE Questions (
    qid SERIAL PRIMARY KEY,
    question TEXT UNIQUE,
    optionA TEXT,
    optionB TEXT
);

CREATE TABLE Votes (
    vote_date DATE PRIMARY KEY,
    qid INTEGER,
    amountA INTEGER,
    amountB INTEGER
);
