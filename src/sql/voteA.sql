-- INSERT INTO
--     Votes(vote_date, qid, amountA, amountB)
-- VALUES
--     ($1, $2, 0, 0)
-- ON CONFLICT
--     (vote_date)
-- DO UPDATE
--     SET amountA = excluded.amountA + 1,
--     amountB = excluded.amountB
-- ; 

UPDATE Votes
SET amountA = amountA + 1
WHERE vote_date = $1;