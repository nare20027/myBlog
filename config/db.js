const mongoose = require("mongoose");
const asynchandler = require("express-async-handler"); // db 사용 시 try ~ catch ~ 문의 반복 사용을 막기 위해
require("dotenv").config(); // .env 파일 사용

const connectDb = asynchandler(async () => {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`DB connected : ${connect.connection.host}`);
});

module.exports = connectDb;
