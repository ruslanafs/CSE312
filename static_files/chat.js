
let socket = undefined;
let username = generateRandomId();

function setupSocket() {
    // socket = new WebSocket('wss://' + window.location.host + '/socket');
    // socket.addEventListener('message', renderMessages);
    socket = io.connect({transports: ['websocket']});
    socket.on('message', renderMessages);

    document.addEventListener("keypress", function(event){
        if(event.keyCode === 13){
            sendMessage();
        }
    })
}

function sendMessage() {
    const chatBox = document.getElementById("chatInput");
    const message = chatBox.value;
    chatBox.value = "";
    if(message !== "") {
        socket.emit("message", JSON.stringify({'username': username, 'message': message}))
    }
    chatBox.focus();
}


function renderMessages(rawMessage) {
    let chat = document.getElementById('chat');
    chat.innerHTML = "";
    const history = JSON.parse(rawMessage);
    history.reverse();
    for (const message of history) {
        chat.innerHTML += "<b>" + message['username'] + "</b>: " + message["message"] + "<br/>";
    }
}

function generateRandomId() {
    return "anon_" + Math.round(Math.random()*1000).toString()
}
