var video = document.getElementById('video-player');

var $playPauseButton = $('#play-pause-button');
var $muteButton = $('#mute-button');
var $fullscreenButton = $('#fullscreen-button');
var $playProgress = $('.play-progress');

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

}, false);

// video.addEventListener('timeupdate', function () {
// 	var percent = Math.floor((100 / video.duration) * video.currentTime);
// 	progressBar.value = percent;
// });

function videoSeek () {
	var seekTo = video.duration * (progressBar.value / 100);
	video.currentTime = seekTo;
}

//progressBar.addEventListener('click', videoSeek);


