'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

const chat = document.querySelector('.chat');
const chatStatus = chat.querySelector('.chat-status');
const loading = chat.querySelector('.loading');
const message = loading.nextElementSibling;
const messagePersonal = chat.querySelector('.message-personal');
const messageStatus = chat.querySelector('.message-status');
const messForm = chat.querySelector('.message-box');
const messageInput = messForm.querySelector('.message-input');
const messagesContent = chat.querySelector('.messages-content');
const sendButton = messForm.querySelector('.message-submit');

messForm.addEventListener('submit', sendMessage);

function getTime() {
  const time = new Date();
  const currentTime = ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2);
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