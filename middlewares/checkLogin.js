const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

const checkLogin = async (req, res, next) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    const token  = req.cookies.token;

    if(!token) {
        return res.redirect("/admin");
    }

    try{
        const decoded = jwt.verify(token, jwtSecret); // 토큰 해석하기
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.redirect("/admin");
    }
};

module.exports = checkLogin;