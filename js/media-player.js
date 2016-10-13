var video = document.getElementById('video-player');

var $playPauseButton = $('#play-pause-button');
var $muteButton = $('#mute-button');
var $fullscreenButton = $('#fullscreen-button');
var $playProgress = $('.play-progress');
var $loadProgress = $('.load-progress');
//var $mediaButtons = $('.media-buttons');
var $mediaPlayer = $('.wrapper');

var mediaDuration = document.getElementById('media-duration');
var curTime = document.getElementById('current-time');

$playPauseButton.click(function () {
	if (video.paused) {
		video.play();
		$playPauseButton.css('background', 'url(icons/pause-icon.png) center center no-repeat');
	} else {
		video.pause();
		$playPauseButton.css('background', 'url(icons/play-icon.png) center center no-repeat');
	}
});

$muteButton.click(function () {
	if (video.volume === 1) {
		video.volume = 0;
		$muteButton.css('background', 'url(icons/volume-off-icon.png) center center no-repeat')
	} else {
		video.volume = 1;
		$muteButton.css('background', 'url(icons/volume-on-icon.png) center center no-repeat')
	}
});

$fullscreenButton.click(function() {
	if (video.requestFullscreen) {
	video.requestFullscreen();
	} else if (video.webkitRequestFullscreen) {
	video.webkitRequestFullscreen();
	} else if (video.mozRequestFullScreen) {
	video.mozRequestFullScreen();
	}
});


video.addEventListener("loadedmetadata", function () {
	vLength = video.duration.toFixed(0);
	mediaDuration.innerHTML = vLength;
}, false);

video.addEventListener("timeupdate", function () {
	var vTime = video.currentTime;
	curTime.innerHTML = vTime.toFixed(0);

	var percentPlayed = (video.currentTime / video.duration) * 100;
	$playProgress.css("width", percentPlayed + "%")

	var percentLoaded = ((video.buffered.end(0) - video.buffered.start(0)) / video.duration) * 100;

	if (video.buffered.end(0).toFixed(0) < video.duration.toFixed(0)) {
		$loadProgress.css("width", percentLoaded + "%");
	} else {
		$loadProgress.css("width", "100%");
	};
	//console.log("Video buffered from " + video.buffered.start(0) + " to " + video.buffered.end(0).toFixed(0));

}, false);

$mediaPlayer.mouseenter(function () {
  	console.log("User moused over media player.")
  	$('.media-buttons').slideDown("fast");
  	$('.media-scrubber').addClass("buttons-showing")
});

$mediaPlayer.mouseleave(function () {
	console.log("User's mouse left media player.")
  	$('.media-buttons').slideUp("fast");
  	$('.media-scrubber').removeClass("buttons-showing")
});