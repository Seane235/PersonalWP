

SE.init = function(){
	var $body = $('body');
	SE.ele.heroCells = document.querySelectorAll('.sub-table .cell-inner');
	SE.ele.logo = document.querySelectorAll('.logo-inner');
	SE.ele.hero = document.querySelectorAll('#hero');
	SE.ele.heroBackground = document.querySelectorAll('.hero-bg');
	SE.ele.bannerTop = document.querySelectorAll('#banner-top');
	SE.ele.bannerBottom = document.querySelectorAll('#banner-bottom');
	SE.ele.bullets = document.querySelectorAll('.list li');
	SE.ele.navItems = document.querySelectorAll('.main-nav .menu-item a');
	SE.ele.portfolio = document.querySelectorAll('.portfolio-wrapper');
	SE.ele.metaBall = document.getElementById('metaball');
	SE.ele.navbar = document.getElementById('navbar');
	SE.ele.locationBox = document.getElementById('location-box');
	SE.ele.locationText = document.getElementById('location-text');
	SE.ele.$cards = $('.experience-card');
	SE.ele.$treehouse = $('#treehouse');
	SE.util.setUpNav();
	SE.util.setUpMap();
	SE.anim.hero();
	SE.setListeners();
	SE.util.ajaxTreehouse();
	SE.util.mapShown = false;
	SE.util.scrollHandler();
};

SE.util.getRandom = function(min,max){
	return Math.random() * (max - min) + min;
}

SE.anim.showHero = function(){
	var hero = SE.ele.hero;
	Velocity({
		e: hero,
		p: {
			height: 600 + "px"
		},
		o: {
			duration: 500,
			complete: SE.anim.hero
		}
	});
}

SE.anim.hero = function(){
	var cells = SE.ele.heroCells;
	var logo = SE.ele.logo;
	var heroBackground = SE.ele.heroBackground;
	var hero = SE.ele.hero;

	Velocity({
		e: logo,
		p: {opacity: "1"},
		o: {duration: 1200, delay: 600}
	});

	function scrollBackground(){
		Velocity({
			e: heroBackground,
			p: {
				"backgroundPositionY": "-=50px"
			},
			o: {easing: "linear", duration: 2000, complete: scrollBackground}
		});
	};
	scrollBackground()

	Velocity({
		e: cells,
		p: "transition.slideUpIn",
		o: {
			stagger: 100,
			delay: 1400,
			duration: 2000
		}
	});
}

SE.anim.bullets = function(){
	var bullets = SE.ele.bullets;
	if(bullets.length){
		Velocity({
			e: bullets,
			p: "transition.slideLeftIn",
			o: {stagger: 100}
		});
	}
}

SE.anim.navbar = function(bool) {
	var $navbar = $(SE.ele.navbar);
	if(bool){
		$navbar.addClass('sticky');
	} else {
		$navbar.removeClass('sticky');
	}
}

SE.anim.usa = function() {
	var sequence = [
		{
			e: SE.ele.states,
			p: "transition.slideLeftIn",
			o: { stagger: 12, duration: 1200, easing: "easeOutCirc" }
		},
		{
			e: SE.ele.youAreHere,
			p: {
				r: 8
			},
			o: {
				duration: 800,
				easing: "spring"
			}
		},
		{
			e: SE.ele.pointer,
			p: {
				'stroke-dashoffset': 0
			},
			o: { duration: 300, easing: "easeInOut" }
		},
		{
			e: SE.ele.locationBox,
			p: { opacity: 1 },
			o: { duration: 50 }
		},
		{
			e: SE.ele.locationBox,
			p: {
				height: 20
			},
			o: {
				easing: "spring",
				duration: 1000,
				sequenceQueue: false
			}
		},
		{
			e: SE.ele.locationText,
			p: {
				opacity: [1,0]
			},
			o: {
				easing: "linear",
				duration: 200,
				sequenceQueue: false,
				complete: radarPing
			}
		}
	];
	Velocity.RunSequence(sequence);
	function radarPing(){
		Velocity({
			e: SE.ele.radars,
			p: "transition.radar",
			o: { stagger: 350, sequenceQueue: false, delay: 1000, complete: radarPing}
		});
	}
}

SE.setListeners = function(){
	$(SE.ele.navItems).hover(SE.util.navHoverIn, SE.util.navHoverIn);
	$(SE.ele.portfolio).hover(SE.util.postHoverIn, SE.util.postHoverIn);
}

SE.util.navHoverIn = function(e){
	var $navItem = $(e.currentTarget);
	var swipeDiv = $(e.currentTarget).siblings('.nav-swipe');
	if(e.type === "mouseenter"){
		Velocity({e: $navItem, p: "stop"})
		Velocity({e: swipeDiv, p: "stop"})
		if(!$navItem.hasClass('velocity-animating')){
			Velocity({
				e: $navItem,
				p: { 'padding-left': '38px', 'padding-right': '38px', 'color': ['#313131', 'linear'] },
				o: { easing: 'spring', duration: 600}
			});
			Velocity({
				e: swipeDiv,
				p: { 'left': '-40%' },
				o: { duration: 300}
			});
		}

	} else {
		Velocity({e: $navItem, p: "stop"})
		Velocity({e: swipeDiv, p: "stop"})
		if(!$navItem.hasClass('velocity-animating')){
			Velocity({
				e: $navItem,
				p: { 'padding-left': '28px', 'padding-right': '28px', 'color': ['#FFFFFF', 'linear'] },
				o: { easing: 'easeOutQuad', duration: 400}
			});
			Velocity({
				e: swipeDiv,
				p: { 'left': '-200%' },
				o: { duration: 300}
			});
		}
	}
}

SE.util.postHoverIn = function(e){
	var $postWrapper = $(e.currentTarget);
	var $svg = $postWrapper.find('.portfolio-hover')
	var $title = $postWrapper.find('.post-title')
	if(e.type === "mouseenter" ){
		Velocity({e: $title, p: "stop"})
		if(!$title.hasClass('velocity-animating') ){
			Velocity({
				e: $title,
				p: {
					height: "40px"
				},
				o: {
					easing: "easeInOutCirc",
					duration: 200
				}
			});
		}
	} else {
		Velocity({e: $title, p: "stop"})
		if(!$title.hasClass('velocity-animating') ){
			Velocity({
				e: $title,
				p: {
					height: "0px"
				},
				o: {
					easing: "easeInOutCirc"
				}
			});
		}
	}
}

SE.util.setUpMap = function(){
	SE.ele.states = document.querySelectorAll('.svg-state');
	SE.ele.youAreHere = document.getElementById('youarehere');
	SE.ele.map = document.getElementById('usa-map');
	SE.ele.radars = document.querySelectorAll('.radar');
	SE.ele.pointer = document.getElementById('pointer');
	SE.ele.length = SE.ele.pointer.getTotalLength();
	SE.ele.pointer.style.strokeDasharray = SE.ele.length + ' ' + SE.ele.length;
	SE.ele.pointer.style.strokeDashoffset = SE.ele.length;
	SE.ele.pointer.style.opacity = 1;

	Velocity.RegisterEffect("transition.radar", {
    defaultDuration: 2500,
    calls: [ 
        [ { r: [50, 0], strokeWidth: [0, 8], opacity: [0.8, 1] }, 1, {easing: "easeOutSine"}]
    ]
	});
}

SE.util.setUpNav = function(){
	var height = $(SE.ele.navbar).css('height');
	$('.nav-placeholder').css('height', height);
}

SE.util.scrollHandler = function(){
	($(window).scrollTop() >= 600) ? SE.anim.navbar(true) : SE.anim.navbar(false);
	if ($(window).scrollTop() >= 500 && !SE.util.mapShown) {
		SE.anim.usa();
		SE.util.mapShown = true;
	}
}

window.onload = SE.init;