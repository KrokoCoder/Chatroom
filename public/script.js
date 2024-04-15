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

window.onload = function() {
    const messageButton = document.getElementById('send');
    if (messageButton) {
        messageButton.addEventListener('click', createMessageInput);
    } else {
        console.error('Element with id "send" not found');
    }
}