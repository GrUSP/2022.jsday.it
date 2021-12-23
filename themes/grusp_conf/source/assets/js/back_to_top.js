window.addEventListener("scroll", function () {
    "use strict";
  var backToTop = document.getElementById('back_to_top');
		if (document.body.scrollTop >= document.body.clientHeight || document.documentElement.scrollTop >= document.documentElement.clientHeight) {
			backToTop.classList.remove("is-hidden");
		}
		else {
			backToTop.classList.add("is-hidden");
		}
});