var video = document.getElementById('video-player');

$playPauseButton = $('#play-pause-button');
$muteButton = $('#mute-button');

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