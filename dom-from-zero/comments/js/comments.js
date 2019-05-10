'use strict';

function showComments(list) {
  const fragment = document.createDocumentFragment(),
        commentsContainer = document.querySelector('.comments');
  list.forEach(element => {
    fragment.appendChild(createCommentV2(element));
  });
  commentsContainer.appendChild(fragment);
}
function createCommentV2(comment) {
  const commentWrap = document.createElement('div'),
        photo = document.createElement('div'),
        avatar = document.createElement('div'),
        commentBlock = document.createElement('div'),
        commentText = document.createElement('p'),
        bottomComment = document.createElement('div'),
        commentDate = document.createElement('div'),
        commentActions = document.createElement('ul'),
        complain = document.createElement('li'),
        reply = document.createElement('li');

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

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
