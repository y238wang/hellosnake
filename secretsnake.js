let keyHistory = [];
document.addEventListener('keydown', (event) => {
  keyHistory.push(event.keyCode);
  if (keyHistory.slice(Math.max(keyHistory.length - 5, 0)).toString() == [83,78,65,75,69].toString()) {
    window.location.href = 'secretsnake.html';
  }
});
