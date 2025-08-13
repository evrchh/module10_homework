const btn = document.querySelector('.btn');
const arrowFirst = document.querySelector('.arrow');
const arrowSecond = document.querySelector('.arrow__second');

btn.addEventListener('click', () => {
  arrowFirst.classList.toggle('active');
  arrowSecond.classList.toggle('active')
});