function Message(){
    const message = document.getElementById("input").value;
    document.getElementById("output").innerHTML = message;
}

window.onload = function(){
    const sendMessage = document.getElementById("send");
    sendMessage.addEventListener("click", Message);
}