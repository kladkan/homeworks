'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat'),
      chat = document.querySelector('.chat'),
      chatStatus = chat.querySelector('.chat-status'),
      loading = chat.querySelector('.loading'),
      message = loading.nextElementSibling,
      messagePersonal = chat.querySelector('.message-personal'),
      messageStatus = chat.querySelector('.message-status'),
      messForm = chat.querySelector('.message-box'),
      messageInput = messForm.querySelector('.message-input'),
      messagesContent = chat.querySelector('.messages-content'),
      sendButton = messForm.querySelector('.message-submit');

messForm.addEventListener('submit', sendMessage);

function getTime() {
  const time = new Date();
  const currentTime = ("0" + time.getHours())
    .slice(-2) + ":" + ("0" + time.getMinutes())
    .slice(-2);
  return currentTime;
}

function sendMessage(event) {
  event.preventDefault();
  connection.send(messageInput.value);
  messagePersonal.querySelector('.message-text').textContent = messageInput.value;
  messagePersonal.querySelector('.timestamp').textContent = getTime();
  messagesContent.appendChild(messagePersonal.cloneNode(true));
}

connection.addEventListener('open', () => {
  chatStatus.textContent = chatStatus.dataset.online;
  sendButton.disabled = false;
  changeMessStatus('Пользователь появился в сети');
});

connection.addEventListener('close', () => {
  chatStatus.textContent = chatStatus.dataset.offline;
  sendButton.disabled = true;
  changeMessStatus('Пользователь не в сети');
  });
  

function changeMessStatus(message) {
  messageStatus.firstElementChild.textContent = message;
  messagesContent.appendChild(messageStatus.cloneNode(true));
};

connection.addEventListener('message', event => {
  if (event.data === '...') {
    messagesContent.appendChild(loading.cloneNode(true));
  } else {
    message.querySelector('.message-text').textContent = event.data;
    message.querySelector('.timestamp').textContent = getTime();
    messagesContent.appendChild(message.cloneNode(true));
    if (messagesContent.querySelector('.loading')) {
      messagesContent.querySelector('.loading').parentNode.removeChild(messagesContent.querySelector('.loading'));
    }
  }
});