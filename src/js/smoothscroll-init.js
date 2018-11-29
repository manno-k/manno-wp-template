// smooth scroll polyfill
$(function ($) {
	window.addEventListener('load', function () {
		// ID指定
		smooth_array = ['#top', '#contact'];
		smooth_array.forEach(function (value) {
			// a tagを指定
			document.querySelector('a[href^="' + value + '"]').addEventListener('click', function (e) {
				e.preventDefault();
				// 移動先を指定
				document.querySelector(value).scrollIntoView({behavior: 'smooth'});
			});
		})
	});
});
