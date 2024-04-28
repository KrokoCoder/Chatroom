function createMessageInput() {
    var input = document.createElement('input');
    input.type = "text";
    input.id = "input";
    input.value = document.getElementById('message').value;
    input.style = "width: 25%; height: 50px; font-size: 20px; text-align: center; margin-left: 750px;";
    input.readOnly = true;
    input.className = "css-class-name";
    const div = document.getElementById('Chatbox');
    div.appendChild(input);
    console.log(document.getElementById('message').value);

    // req
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // query
            query: document.getElementById('message').value,
        }),
    }).then((response) => response.json())
    .then((data) => {
        const message = data.answer;
        var newInput = constructMessage(message);
        div.appendChild(newInput);
    });
}

function constructMessage(message) {
    var input = document.createElement('input');
    input.type = "text";
    input.id = "input";
    input.value = message;
    input.style = "width: 25%; height: 50px; font-size: 20px; text-align: center; margin-left: 750px;";
    input.readOnly = true;
    input.className = "css-class-answer";
    return input;
}




window.onload = function() {
    const messageButton = document.getElementById('send');
    if (messageButton) {
        messageButton.addEventListener('click', createMessageInput);
    } else {
        console.error('Element with id "send" not found');
    }
}