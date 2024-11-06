const express = require("express");
const router = express.Router();
const mainLayout = "../views/layouts/main.ejs";
const Post = require("../models/Post");
const asynchandler = require("express-async-handler");

router.get(["/", "/home"], 
    asynchandler(async (req, res) => { // db와 통신할 때는 비동기 처리 
    //index.ejs를 렌더링하는데 mainLayout 레이아웃으로 감싸기 
    const locals = {
        title: "Home",
    };
    const data = await Post.find({}); // 데이터베이스에 있는 모든 데이터 가져오기 
    res.render("index", { locals, data, layout: mainLayout });
    })  
);

/* 임시데이터 생성
Post.insertMany([
    {
        title: "제목 1",
        body: "내용 1 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
        title: "제목 2",
        body: "내용 2 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
        title: "제목 3",
        body: "내용 3 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
        title: "제목 4",
        body: "내용 4 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    {
        title: "제목 5",
        body: "내용 5 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
]);*/

/**
 * GET post:/id
 * 게시물 상세 보기
 * 
 */
router.get(
    "/post/:id",
    asynchandler(async (req, res) => {
        const data = await Post.findOne({ _id: req.params.id }); // db 에서 가져온 데이터(1)는 data 변수에 할당
        res.render("post", {data, layout: mainLayout }); // post.ejs에서 렌더링하며 mainLayout을 레이아웃으로 사용  
    })
)

router.get("/about", (req, res) => {
    res.render("about", { layout: mainLayout });
});

module.exports = router;