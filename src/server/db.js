
require('dotenv').config();
const fs = require('fs');
var path = require("path");
const { Client } = require('pg');

const createTable = fs.readFileSync((path.resolve(__dirname, '../sql/createTable.sql'))).toString();
const getCurrent = fs.readFileSync((path.resolve(__dirname, '../sql/getCurrent.sql'))).toString();
const postQuestion = fs.readFileSync((path.resolve(__dirname, '../sql/postQuestion.sql'))).toString();
const voteA = fs.readFileSync((path.resolve(__dirname, '../sql/voteA.sql'))).toString();
const voteB = fs.readFileSync((path.resolve(__dirname, '../sql/voteB.sql'))).toString();

console.log("host: ", process.env.DB_HOST);
const client = new Client({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME, 
    user: process.env.DB_USER,
    port: process.env.DB_PORT,  
    password: process.env.DB_PASS,
    ssl: true
});

client.connect();


// create the following table
// p2c(pid, cid)
exports.createTable = async() => {
    try {
        //await client.connect();
        await client.query(createTable);
        console.log("created!");
        //await client.end();
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
};

// get current question, options, and voting amounts by date
exports.getCurrent = async (vote_date) => {
    try {
        //await client.connect();
        const res = await client.query(getCurrent, [vote_date]);
        const data = res.rows[0];
        console.log("data: ", data);
        //await client.end();
        return data;
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
};


exports.postQuestion = async (question, optionA, optionB) => {
    try {
        //await client.connect();
        const res = await client.query(postQuestion, [question, optionA, optionB]);
        const data = res.rows[0];
        console.log("data: ", data);
        //await client.end();
        return data;

    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
}

exports.vote = async(vote_date, side) => {
    try{
        const res = await client.query(side == "A" ? voteA : voteB, [vote_date]);
        const data = res.rows[0];
        console.log("data: ", data);
        //await client.end();
        return data;
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
}

exports.test = async(query) => {
    try{
        const res = await client.query(query);
        const data = res.rows;
        console.log("data: ", data);
        //await client.end();
        return data;
    } catch(err) {
        console.log(err.stack);
        await client.end();
    }
}

// // get pull request id uniqly identified by channel id
// exports.getPidByCid = async (cid) => {
//     try {
//         //await client.connect();
//         const res = await client.query(getPidByCid, [cid]);
//         const pid = res.rows[0];
//         console.log("pid: ", pid);
//         //await client.end();
//         return pid;
//     } catch(err) {
//         console.log(err.stack);
//         await client.end();
//     }
// };

// exports.getGitHubNameByUid = async (uid) => {
//     try {
//         //await client.connect();
//         const res = await client.query(getGitHubNameByUid, [uid]);
//         const githubName = res.rows[0];
//         console.log("github_name: ", githubName);
//         //await client.end();
//         return githubName;
//     } catch(err) {
//         console.log(err.stack);
//         await client.end();
//     }
// }

// exports.getUidByGitHubName = async (githubName) => {
//     try {
//         //await client.connect();
//         const res = await client.query(getUidByGitHubName, [githubName.toLowerCase()]);
//         const uid = res.rows[0];
//         console.log("slack_uid: ", uid);
//         //await client.end();
//         return uid;
//     } catch(err) {
//         console.log(err.stack);
//         await client.end();
//     }
// }

// // insert new record of pull request id and channel id, need to be unique.
// exports.insertNewRecord = async(pid, cid) => {
//     try {
//         //await client.connect();
//         const res = await client.query(insertNewRecord, [pid, cid]);
//         console.log("res:", res);
//         //await client.end();
//     } catch(err) {
//         console.log(err.stack);
//         await client.end();
//     }
// };

// // insert new record of pull request id and channel id, need to be unique.
// exports.insertNewUser = async(uid, githubName) => {
//     try {
//         //await client.connect();
//         const res = await client.query(insertNewUser, [uid, githubName.toLowerCase()]);
//         console.log("res:", res);
//         //await client.end();
//         //return res;
//     } catch(err) {
//         console.log(err.stack);
//         await client.end();
//     }
// };