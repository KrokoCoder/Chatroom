function createMessageInput() {
    var input = document.createElement('input');
    input.type = "text";
    input.id = "input";
    input.value = document.getElementById('message').value;
    input.style = "width: 25%; height: 50px; font-size: 20px; text-align: center; margin-left: 37%;";
    input.readOnly = true;
    input.className = "css-class-name";
    const div = document.getElementById('Chatbox');
    div.appendChild(input);
}

function getAnswer(question, chatHistory) { // Remove the unnecessary async keyword
 async function getAnswer(question, chatHistory) {
    const chatStream = await client.chatStream({
            chatHistory: chatHistory,
            message: question,
            // perform web search before answering the question. You can also use your own custom connector.
    });

    var text = "";

    for await (const message of chatStream) {
            if (message.eventType === "text-generation") {
                     text += message.text;
                     console.log(text);
            }
    }
 }
}



window.onload = function() {
    const messageButton = document.getElementById('send');
    if (messageButton) {
        messageButton.addEventListener('click', createMessageInput);
    } else {
        console.error('Element with id "send" not found');
    }
}