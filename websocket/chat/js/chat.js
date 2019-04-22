'use strict';

const chat = document.querySelector('.chat');
const chatStatus = chat.querySelector('.chat-status');
const loading = chat.querySelector('.loading');
const message = loading.nextElementSibling;
const messageStatus = chat.querySelector('.message-status');
const messForm = chat.querySelector('.message-box');
const messageInput = messForm.querySelector('.message-input');
const sendButton = messForm.querySelector('.message-submit');

const messagesContent = chat.querySelector('.messages-content');

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');

connection.addEventListener('open', () => {
  chatStatus.textContent = chatStatus.dataset.online;
  sendButton.disabled = false;
  changeMessStatus('Пользователь появился в сети');
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
    messagesContent.appendChild(message.cloneNode(true));
    if (messagesContent.querySelector('.loading')) {
      messagesContent.querySelector('.loading').parentNode.removeChild(messagesContent.querySelector('.loading'));
    }
  }
});

