

(function ($) {

	"use strict";

	enableSwiper();

	$('[data-nav-menu]').on('click', function (event) {

		var $this = $(this),
			visibleHeadArea = $this.data('nav-menu');

		$(visibleHeadArea).toggleClass('visible');

	});


})(jQuery);


function enableSwiper() {

	if (isExists('.swiper-container')) {

		$('.swiper-container').each(function (index) {

			var swiperDirection = $(this).data('swiper-direction'),
				swiperSlidePerView = $(this).data('swiper-slides-per-view'),
				swiperBreakpoints = $(this).data('swiper-breakpoints'),
				swiperSpeed = $(this).data('swiper-speed'),
				swiperCrossFade = $(this).data('swiper-crossfade'),
				swiperLoop = $(this).data('swiper-loop'),
				swiperAutoplay = $(this).data('swiper-autoplay'),
				swiperMousewheelControl = $(this).data('swiper-wheel-control'),
				swipeSlidesPerview = $(this).data('slides-perview'),
				swiperMargin = parseInt($(this).data('swiper-margin')),
				swiperSlideEffect = $(this).data('slide-effect'),
				swiperAutoHeight = $(this).data('autoheight'),
				swiperScrollbar = ($(this).data('scrollbar') ? $(this).find('.swiper-scrollbar') : null);
			swiperScrollbar = (isExists(swiperScrollbar) ? swiperScrollbar : null);


			var swiper = new Swiper($(this)[0], {
				pagination: $(this).find('.swiper-pagination'),


				slidesPerView: (swiperSlidePerView ? swiperSlidePerView : 1),
				direction: (swiperDirection ? swiperDirection : 'horizontal'),
				loop: (swiperLoop ? swiperLoop : false),
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				autoplay: (swiperAutoplay ? swiperAutoplay : false),
				paginationClickable: true,
				spaceBetween: (swiperMargin ? swiperMargin : 0),
				mousewheelControl: ((swiperMousewheelControl) ? swiperMousewheelControl : false),
				scrollbar: (swiperScrollbar ? swiperScrollbar : null),
				scrollbarHide: false,
				speed: (swiperSpeed ? swiperSpeed : 1000),
				autoHeight: ((swiperAutoHeight == false) ? swiperAutoHeight : true),
				effect: (swiperSlideEffect ? swiperSlideEffect : 'coverflow'),
				fade: { crossFade: swiperCrossFade ? swiperCrossFade : false },
				breakpoints: {
					1200: { slidesPerView: swiperBreakpoints ? 3 : 1, },
					992: { slidesPerView: swiperBreakpoints ? 2 : 1, },
					580: { slidesPerView: 1, }

				},
			});

		});

	}
}

function isExists(elem) {
	if ($(elem).length > 0) {
		return true;
	}
	return false;
}


function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false);
	xmlHttp.send(null);
	return JSON.parse(xmlHttp.responseText);
}

function GeneratePostCard(postData) {
	return `<div class="col-lg-4 col-md-6">
		<div class="card h-100">
	  <div class="single-post post-style-1">
		<div class="blog-image">
		  <img
			src="${postData.thumbnail}"
			alt="Blog Image"
		  />
		</div>

		<a class="avatar" href="${postData.link} target="_blank""
		  ><img
			src="https://www.cristianoprogramador.com/img/profile.jpg"
			alt="Profile Image"
		/></a>

		<div class="blog-info">
		  <h4 class="title">
			<a href="${postData.link}" target="_blank"><b>${postData.title}</b></a>
		  </h4>

		  <ul class="post-footer">
			<li>
			  <a href="#"><i class="ion-calendar"></i><strong>${new Date(postData.pubDate).toLocaleDateString("pt-BR")}</strong></a>
			</li>
		  </ul>
		</div>
	  </div>
	</div>
  </div>`
}

window.onload = function () {
	const response = httpGet("https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2Fcristiano-cunha");
	const blogPosts = response.items;

	var posts = blogPosts.reduce((accumulator, currentValue) => `${accumulator}${GeneratePostCard(currentValue)}`, "");
	var container = document.getElementById("posts-container");

	container.innerHTML = posts;
}