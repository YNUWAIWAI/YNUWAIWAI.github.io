/* eslint-env browser */
const drawer = document.getElementById('drawer');
const toggle = document.getElementById('toggle');
const obfucator = document.getElementById('obfucator');

const handleDrawer = function drawerToggle() {
  drawer.classList.toggle('drawer__visible');
  obfucator.classList.toggle('obfucator__visible');
};

toggle.addEventListener('click', handleDrawer);
obfucator.addEventListener('click', handleDrawer);
