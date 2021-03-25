function ready () {
    const wsUri = "wss://echo.websocket.org/";

const send = document.querySelector("#send");
const text = document.querySelector(".text");
const chart = document.querySelector('#chart')
const message = text.value;

let websocket;

send.addEventListener('click', () => {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
        console.log('response: connect')
    };
    websocket.onclose = function(evt) {
        console.log('response: disconnect')
    };
    setTimeout(sendMessege, 1000);

    websocket.onmessage = function(evt) {
        chart.innerHTML += `<div class ="response-message"> response: ${evt.data}</div>`;
    };
    function sendMessege () {
        const message = text.value;
        chart.innerHTML += '<div class ="send-message"> sent: ' + message + '</div>';
        websocket.send(message);
    };
});
const location = document.querySelector('#location')
    const error = () => {
        chart.innerHTML += '<div class ="response-message"> Информация о местоположении недоступна </div>';
    }

    const success = (position) => {
        console.log('position', position);
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        const mapLinkHref = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        chart.innerHTML += '<div class ="response-message"> <a href="'+ mapLinkHref + '" target="_blank">Мое местоположение</a> </div>';

    }

    location.addEventListener('click', () => {
        if (!navigator.geolocation) {
            chart.innerHTML += '<div class ="response-message"> Информация о местоположении недоступна </div>';
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    });};
document.addEventListener("DOMContentLoaded", ready);

