'use strict';
/*
function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comments = list.map(createComment).join('');
  commentsContainer.innerHTML += comments;
}
*/

function showComments(list) {
  const fragment = document.createDocumentFragment();
  const commentsContainer = document.querySelector('.comments');
  list.forEach(element => {
    fragment.appendChild(createCommentV2(element));
  });
  commentsContainer.appendChild(fragment);
}
function createCommentV2(comment) {
  const commentWrap = document.createElement('div');
  const photo = document.createElement('div');
  const avatar = document.createElement('div');
  const commentBlock = document.createElement('div');
  const commentText = document.createElement('p');
  const bottomComment = document.createElement('div');
  const commentDate = document.createElement('div');
  const commentActions = document.createElement('ul');
  const complain = document.createElement('li');
  const reply = document.createElement('li');
  commentWrap.classList.add('comment-wrap');
  photo.classList.add('photo');
  photo.title = comment.author.name;
  avatar.classList.add('avatar');
  avatar.style.backgroundImage = `url('${comment.author.pic}')`;
  commentBlock.classList.add('comment-block');
  commentText.classList.add('comment-text');
  commentText.innerText = comment.text;
  bottomComment.classList.add('bottom-comment');
  commentDate.classList.add('comment-date');
  commentDate.innerText = new Date(comment.date).toLocaleString('ru-Ru');
  commentActions.classList.add('comment-actions');
  complain.classList.add('complain');
  complain.textContent = 'Пожаловаться';
  reply.classList.add('reply');
  reply.textContent = 'Ответить';

  commentWrap.appendChild(photo);
  photo.appendChild(avatar);
  commentWrap.appendChild(commentBlock);
  commentBlock.appendChild(commentText);
  commentBlock.appendChild(bottomComment);
  bottomComment.appendChild(commentDate);
  bottomComment.appendChild(commentActions);
  commentActions.appendChild(complain);
  commentActions.appendChild(reply);

  return commentWrap;
}
/*
function createComment(comment) {
  
  return `<div class="comment-wrap">
    <div class="photo" title="${comment.author.name}">
      <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
    </div>
    <div class="comment-block">
      <p class="comment-text">
        ${comment.text.split('\n').join('<br>')}
      </p>
      <div class="bottom-comment">
        <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
        <ul class="comment-actions">
          <li class="complain">Пожаловаться</li>
          <li class="reply">Ответить</li>
        </ul>
      </div>
    </div>
  </div>`
}
*/
fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);

