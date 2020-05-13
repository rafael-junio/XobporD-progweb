document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.sidenav');
  // eslint-disable-next-line
  const instances = M.Sidenav.init(elems);
});

$(document).ready(() => {
  $('.sidenav').sidenav();
});
