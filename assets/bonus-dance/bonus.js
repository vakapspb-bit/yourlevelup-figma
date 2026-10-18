"use strict";
const checks = [...document.querySelectorAll('#final-checks input')];
const progress = document.getElementById('progress');
function updateProgress() {
  const count = checks.filter(input => input.checked).length;
  progress.textContent = count === checks.length
    ? 'Всё проверено. Можно показывать танец для съёмки!'
    : 'Проверено: ' + count + ' из ' + checks.length;
}
checks.forEach(input => input.addEventListener('change', updateProgress));
updateProgress();
document.querySelectorAll('.course-menu').forEach(menu => {
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target)) menu.open = false;
  });
});
