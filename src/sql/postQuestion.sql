INSERT INTO 
    Questions (question, optionA, optionB)
VALUES
    ($1, $2, $3)
;

-- INSERT INTO 
--     Votes (vote_date, qid, amountA, amountB)
-- VALUES ($4, (SELECT qid FROM Questions WHERE question = $1), 0, 0);