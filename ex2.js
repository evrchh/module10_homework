const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  const width = window.screen.width;
  const height = window.screen.height;
  
  alert(`Ширина экрана: ${width}px, Высота экрана: ${height}px`)
})