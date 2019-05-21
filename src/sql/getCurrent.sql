SELECT 
    q.qid, q.question, q.optionA, q.optionB, v.amountA, v.amountB 
FROM 
    Votes v, Questions q
WHERE
    vote_date = $1
    AND
    q.qid = v.qid
;