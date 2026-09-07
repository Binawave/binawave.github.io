document.querySelectorAll('.research-menu').forEach(menu => {
  let closeTimer;
  menu.addEventListener('pointerenter', event => {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(closeTimer);
    menu.open = true;
  });
  menu.addEventListener('pointerleave', event => {
    if (event.pointerType !== 'mouse') return;
    closeTimer = setTimeout(() => { menu.open = false; }, 160);
  });
  document.addEventListener('click', event => {
    if (!menu.contains(event.target)) menu.open = false;
  });
  menu.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      menu.open = false;
      menu.querySelector('summary').focus();
    }
  });
});
