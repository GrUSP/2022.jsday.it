document.addEventListener('DOMContentLoaded', () => {
  // Get secondary menu button
  var secondaryMenuButton = document.getElementById('secondary_menu_button');
  // On click, the seconday menu will be toggled
  secondaryMenuButton.addEventListener('click', () => {
    var theMenu = document.getElementById('secondary_menu');
    if (secondaryMenuButton.classList.contains("is-active")) {
      theMenu.setAttribute("style", "right: 0");
    }
    else {
      theMenu.setAttribute("style", "right: -14em");
    }
    secondaryMenuButton.classList.toggle('is-active');
  });

  // Get all "secondary-menu-list-item" elements
  const $secondaryMenuItems = Array.prototype.slice.call(document.querySelectorAll('.secondary-menu-list-item'), 0);
  if ($secondaryMenuItems.length > 0) {
    // Add a click event on each of them: on click, the seconday menu will be hidden
    $secondaryMenuItems.forEach(el => {
      el.addEventListener('click', () => {
        var theMenu = document.getElementById('secondary_menu');
        theMenu.setAttribute("style", "right: -14em");
        secondaryMenuButton.classList.toggle('is-active');
      });
    });
  }
});