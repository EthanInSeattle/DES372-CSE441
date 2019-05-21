-- INSERT INTO
--     Votes(vote_date, qid, amountA, amountB)
-- VALUES
--     ($1, $2, 0, 0)
-- ON CONFLICT
--     (vote_date)
-- DO UPDATE
--     SET amountB = excluded.amountB + 1,
--     amountA = excluded.amountA
-- ; 

UPDATE Votes
SET amountB = amountB + 1
WHERE vote_date = $1;