let express = require("express");
let app = express();

let ws = require("ws");
let WebSocket = ws.WebSocket;
let WebSocketServer = ws.WebSocketServer;


const wss = new WebSocketServer({ port: 3001 });

let ID = (function(){
    let idd = 0;
    return function(){
        return idd++;
    };
}());

let collections = {};

wss.on("connection", function connection(ws) {
    //basically write everything here
    let id = ID();
    console.log(id,1);
    collections[id] = ws;
    ws.on("message", (message)=>{
    console.log(message);
    console.log(message.toString());
        Object.values(collections).map((ws1)=>{
            if(ws1 === ws)return;
            ws1.send(message.toString())
        });
    });
    ws.on("close", ()=>{
        delete collections[id];
    });
});


//express
app.use(express.static("static"));
app.listen(3000, () => {
  console.log('listening on port: 3000');
});


