require("dotenv").config(); //.env에 있는 변수 가져오기 
const express = require("express"); // 서버생성 패키지 
const expressLayouts = require("express-ejs-layouts"); // 익스프레스 레이아웃과 ejs 뷰엔진 사용 선언
const connectDb = require("./config/db");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const app = express(); // 서버 생성
const port = process.env.PORT || 3000; // .env에 PORT가 없으면 3000번 포트 사용

connectDb();

// 레이아웃 뷰엔진 설정
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./views");

// 정적 파일 연결 
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 폼에서 POST 이외의 METHOD 사용하기 위해 
app.use(methodOverride("_method"));

//쿠키파서
app.use(cookieParser());


/* 라우터 미들웨어로 이동
app.get('/', (req, res) => {
    res.send("Hello World!");
});
*/
// 미들웨어 등록 
app.use("/", require("./routes/main"));
app.use("/", require("./routes/admin"));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});