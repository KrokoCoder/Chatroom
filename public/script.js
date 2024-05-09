function createMessageInput() {
    var input = document.createElement('input');
    input.type = "text";
    input.id = "input";
    input.value = document.getElementById('message').value;
    input.readOnly = true;
    input.className = "css-class-name";
    const div = document.getElementById('Chatbox');
    div.appendChild(input);
    console.log(document.getElementById('message').value);

    // Listen for keydown event
    input.addEventListener('keydown', handleEnter);

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


function handleEnter(evt) {
    if (evt.keyCode === 13 && evt.shiftKey) {
        // Shift + Enter: Add a new line
        pasteIntoInput(this, "\n");
        evt.preventDefault();
    }
}

function pasteIntoInput(el, text) {
    el.focus();
    if (typeof el.selectionStart === "number" && typeof el.selectionEnd === "number") {
        var val = el.value;
        var selStart = el.selectionStart;
        el.value = val.slice(0, selStart) + text + val.slice(el.selectionEnd);
        el.selectionEnd = el.selectionStart = selStart + text.length;
    } else if (typeof document.selection !== "undefined") {
        var textRange = document.selection.createRange();
        textRange.text = text;
        textRange.collapse(false);
        textRange.select();
    }
}

function constructMessage(message) {
    var input = document.createElement('textarea');
    input.id = "input";
    input.value = message;
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