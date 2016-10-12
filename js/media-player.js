var video = document.getElementById('video-player');

var $playPauseButton = $('#play-pause-button');
var $muteButton = $('#mute-button');
var $fullscreenButton = $('#fullscreen-button');

var videoLengthTime = document.getElementById('total-length');
var videoPositionTime = document.getElementById('current-position');

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

//  display video duration when available
video.addEventListener("loadedmetadata", function () {
  vLength = video.duration.toFixed(1);
  console.log(vLength);
  videoPositionTime.innerHTML = "0:00";
  videoLengthTime.innerHTML = vLength;
}, false);

//  display the current and remaining times
video.addEventListener("timeupdate", function () {
  //  Current time  
  var vTime = video.currentTime;
  videoPositionTime.innerHTML = vTime.toFixed(1);
  console.log(vTime);
}, false);
