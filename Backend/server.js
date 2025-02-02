const http = require('http');
const app = require('./app');
const ports = process.env.PORT || 3030;
const server  = http.createServer(app);
server.listen(ports, ()=>{
    console.log(`server is running on port ${ports}`)
});