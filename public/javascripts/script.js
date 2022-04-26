const menuOpenBtn = document.querySelector('.logo-header__menu-open-icon');
const menuCloseBtn = document.querySelector('.sidebar__menu-close-icon');
const sideBar = document.querySelector('.sidebar');
const body = document.querySelector('body'); 

menuOpenBtn.addEventListener('click', (evt) => {
  console.log('Burger Clicked');
  sideBar.style.width = '80%';
  sideBar.style.transition = 'width 250ms ease-in-out 100ms';
  body.style.backgroundColor = 'rgba(0, 0, 0, 0.82)';
  body.style.transition = 'background-color 100ms ease-in-out';
});

menuCloseBtn.addEventListener('click', (evt) => {
  console.log('X Clicked');
  sideBar.style.width = "0";
  sideBar.style.transition = 'width 250ms ease-in-out';
  body.style.backgroundColor = 'var(--color-main-dark)';
  body.style.transition = 'background-color 150ms ease-in-out 150ms';
});