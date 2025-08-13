const chat = document.querySelector('.messanges__container');
const input = document.querySelector('.input');
const sendBtn = document.querySelector('.btn__send');
const locBtn = document.querySelector('.btn__loc');

const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');

socket.addEventListener('open', () => {
    addMessage('Соединение установлено.', 'server');
  });

socket.addEventListener('message', (event) => {
    addMessage(`Сервер: ${event.data}`, 'server');
  });

sendBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) {
      addMessage(`Вы: ${text}`, 'you');
      socket.send(text);
      input.value = '';
    }
  });

locBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const locationMessage = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        addMessage(`Вы: ${locationMessage}`, 'you');
        socket.send(locationMessage);
      }, () => {
        addMessage('Ошибка получения геолокации.', 'server');
      });
    } else {
      addMessage('Геолокация не поддерживается вашим браузером.', 'server');
    }
  });

socket.addEventListener('error', (error) => {
    addMessage(`Ошибка: ${error.message}`, 'server');
});

socket.addEventListener('close', () => {
    addMessage('Соединение закрыто.', 'server');
  });

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendBtn.click();
    }
  });

function addMessage(text, type) {
    const div = document.createElement('div');
    div.textContent = text;
    div.classList.add('message', type);
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }