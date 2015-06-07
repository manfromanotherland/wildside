function parallaxMountain() {

	// Variables
	var scrollVal = Math.max(window.pageYOffset,0),
		layer = document.querySelectorAll('.bg-layer'),
		openingLine = document.querySelector('.opening-line'),
		nav = document.querySelector('.nav');

	// Multiply the page offset with different values
	// for different scrolling speeds between layers
	var offset = [
		-(scrollVal * 0.4),
		-(scrollVal * 0.55),
		-(scrollVal * 0.6),
		-(scrollVal * 0.75)
	];

	// Parallax the shit out of those mountains!
	for (var i = 0; i < layer.length; i++) {
		layer[i].style.webkitTransform = 'translate3d(0, ' + offset[i] + 'px, 0)';
		layer[i].style.MozTransform = 'translate3d(0, ' + offset[i] + 'px, 0)';
		layer[i].style.msTransform = 'translateY(' + offset[i] + 'px)';
		layer[i].style.OTransform = 'translate3d(0, ' + offset[i] + 'px, 0)';
		layer[i].style.transform = 'translate3d(0, ' + offset[i] + 'px, 0)';
	}

	// Fade out the opening line
	openingLine.style.opacity = 1-(scrollVal/90);

	// Fade out / scroll down navigation
	// nav.style.webkitTransform = 'translate3d(0, ' + (scrollVal/1.5) + 'px, 0)';
	// nav.style.MozTransform = 'translate3d(0, ' + (scrollVal/1.5) + 'px, 0)';
	// nav.style.msTransform = 'translateY(' + (scrollVal/1.5) + 'px)';
	// nav.style.OTransform = 'translate3d(0, ' + (scrollVal/1.5) + 'px, 0)';
	// nav.style.transform = 'translate3d(0, ' + (scrollVal/1.5) + 'px, 0)';
	// nav.style.opacity = 1-(scrollVal/200);

}

//

document.addEventListener('scroll', parallaxMountain, false);

smoothScroll.init({
	speed: 1000,
	easing: 'easeInQuart',
	updateURL: true
});