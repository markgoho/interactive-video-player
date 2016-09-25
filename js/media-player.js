var video = document.getElementById('video-player');

$playPauseButton = $('#play-pause-button');

$playPauseButton.click(function () {
  if (video.paused) {
    video.play();
    $playPauseButton.css('background', 'url(icons/pause-icon.png) center center no-repeat');
  } else {
    video.pause();
    $playPauseButton.css('background', 'url(icons/play-icon.png) center center no-repeat');
  }
});