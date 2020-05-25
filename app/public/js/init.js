document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.sidenav');
  // eslint-disable-next-line
  const instances = M.Sidenav.init(elems);
});

$(document).ready(() => {
  $('.sidenav').sidenav();
});

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.modal');
  const instances = M.Modal.init(elems, options);
});

$(document).ready(() => {
  $('.modal').modal();
});
