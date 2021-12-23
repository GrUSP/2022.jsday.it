document.addEventListener("DOMContentLoaded", () => {
  var myNav = document.getElementById('header');
  window.onscroll = function () {
    "use strict";
    if (document.body.scrollTop >= 30 || document.documentElement.scrollTop >= 30) {
      myNav.classList.remove("is-transparent");
    }
    else {
      myNav.classList.add("is-transparent");
    }
  }
});