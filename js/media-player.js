var video = document.getElementById('video-player');

var $playPauseButton = $('#play-pause-button');
var $muteButton = $('#mute-button');
var $fullscreenButton = $('#fullscreen-button');
var $playProgress = $('.play-progress');
var $loadProgress = $('.load-progress');
var $mediaPlayer = $('.media-player');
var $scrubber = $('.media-scrubber');
var $mediaDuration = $('#media-duration');
var $curTime = $('#current-time');
var $transcript = $('#transcript span');
var $captions = $('#closed-captions');
var $volumeBar = $('#volume-bar');
var $currentVol = $('#current-volume')

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
	if (video.volume > 0) {
		video.volume = 0;
		$muteButton.css('background', 'url(icons/volume-off-icon.png) center center no-repeat');
		$currentVol.width(0);
	} else {
		video.volume = 1;
		$muteButton.css('background', 'url(icons/volume-on-icon.png) center center no-repeat');
		$currentVol.width("100%");
	}
});

// Full Screen Button
$fullscreenButton.click(function() {
	if (video.requestFullscreen) {
	video.requestFullscreen();
	} else if (video.webkitRequestFullscreen) {
	video.webkitRequestFullscreen();
	} else if (video.mozRequestFullScreen) {
	video.mozRequestFullScreen();
	}
});

// Render Progress and Loading Bars
video.addEventListener("timeupdate", updateScrubber);
video.addEventListener("timeupdate", updateTime);
video.addEventListener("canplay", updateTime);
video.addEventListener("timeupdate", updateTranscript);

function updateScrubber () {
	var percentPlayed = (video.currentTime / video.duration) * 100;
	$playProgress.css("width", percentPlayed + "%");

	var percentLoaded = ((video.buffered.end(0) - video.buffered.start(0)) / video.duration) * 100;

	if (video.buffered.end(0).toFixed(0) < video.duration.toFixed(0)) {
		$loadProgress.css("width", percentLoaded + "%");
	} else {
		$loadProgress.css("width", "100%");
	}
}

function updateTime () {

	var currentMin = Math.floor(video.currentTime / 60);
	var currentSec = Math.floor(video.currentTime - currentMin * 60);
	var totalMin = Math.floor(video.duration / 60);
	var totalSec = Math.floor(video.duration - totalMin * 60);

	if (currentSec < 10) {
    	currentSec = "0" + currentSec;
	}
	
	if (totalSec < 10) {
		totalSec = "0" + totalSec;
	}

	$curTime.text(currentMin + ":" + currentSec);
	$mediaDuration.text(totalMin + ":" + totalSec);
}

$mediaPlayer.mouseenter(function () {
  	$('.media-buttons').slideDown("fast");
  	$('.media-scrubber').addClass("buttons-showing");
});

$mediaPlayer.mouseleave(function () {
  	$('.media-buttons').slideUp("fast");
  	$('.media-scrubber').removeClass("buttons-showing");
});

$scrubber.mousedown(function (event) {
	//get X position of mouse over loading bar (event.pageX)
	var x = event.pageX - $(this).offset().left;

	//convert the X position to a percentage of the video
	var percent = x / $(this).width();

	//set video's current time to percent of total duration
	video.currentTime = percent * video.duration;
});

$volumeBar.mousedown(function (event) {
	//get X position of mouse over volume bar (event.pageX)
	var x = event.pageX - $(this).offset().left;

	//convert the X position to a percentage of the volume
	var percent = x / $(this).width();

	//set video's volume time to percent of total duration
	video.volume = percent;

	//set volume bar to appropriate width
	var newWidth = $volumeBar.width() * percent;
	$currentVol.width(newWidth + "px");
});

function timeToString(time) {
    var result;
    var hours = parseInt(time.substr(0, 2));
    var minutes = parseInt(time.substr(3, 2));
    var seconds = parseInt(time.substr(6, 2));
    var milliseconds = parseInt(time.substr(9, 3));
    result = (hours * 3600) + (minutes * 60) + seconds + (milliseconds * 0.001);
    return result;
}

function updateTranscript () {
	var curTime = video.currentTime;
	
	$transcript.each(function (index) {
		var startTime = timeToString($(this).attr("data-time-start"));
		var endTime = timeToString($(this).attr("data-time-end"));
		if (curTime >= startTime && curTime < endTime) {
			$(this).addClass("highlight");	
		} else {
			$(this).removeClass("highlight");
		}
	});
}

//User clicks on any of the spans, the span highlights and the video goes to that timecode
$transcript.click(function () {
	video.currentTime = timeToString($(this).attr("data-time-start"));
});

//turn on and off captions
$captions.click(function () {
	var textTrack = video.textTracks[0];
	if (textTrack.mode === "showing") {
		textTrack.mode = "hidden";
	} else {
		textTrack.mode = "showing";
	}
});