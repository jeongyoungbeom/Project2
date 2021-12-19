const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "http://localhost:3001", // 백엔드 주소
            changeOrigin: true, // 이건 기억이 안나 뭐엿더라..
        })
    );
};