// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:3001');

/*// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});*/

let container = new ELEM(document.querySelector("#container"));

let feed = container.add("div");
let input = container.add("textarea");

input.on("keydown",function(e){
    if(e.key === "Enter"){
        e.preventDefault();
        let val = this.value.trim()
        this.value = "";
        socket.send(val);
        feed.add("div",false,val);
    }
});

// Listen for messages
socket.addEventListener("message", function (e) {
    let val = e.data;
    feed.add("div",false,val);
});
