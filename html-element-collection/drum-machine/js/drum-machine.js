const allButton = document.getElementsByTagName('li');
for (const button of allButton) {
  button.onclick = function () {
    const player = this.getElementsByTagName('audio')[0];
    player.pause();
    player.currentTime = 0;
    player.play();
  };
};
