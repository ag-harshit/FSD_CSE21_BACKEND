//create your own server using HTTP

// const http=require("http");
import http from "http";
const server=http.createServer((req,res)=>{
    res.writeHead(200,{"Content-Type":"text/html"});

    res.write("<h1>Welcome to my server</h1>");
    res.end();
});
server.listen(8000,()=>{
    console.log("Server is running on port 8000");
});