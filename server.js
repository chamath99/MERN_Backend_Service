const http = require('http');
const app =require('./app.js');

const port = process.env.port || 3000;

app.set('port',port);

const server = http.createServer(app);

// const server = http.createServer((req,res)=>{
//     console.log("server running.....");
//     res.end("this is response");
// });

server.listen(3000);