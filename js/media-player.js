var video = document.getElementById('video-player'); //apparently you can't select the video element as a jQuery object

var $playPauseButton = $('#play-pause-button');
var $muteButton = $('#mute-button');
var $fullscreenButton = $('#fullscreen-button');
var $playProgress = $('.play-progress');
var $loadProgress = $('.load-progress');
var $mediaPlayer = $('.media-player');
var $scrubber = $('.media-scrubber');
var $mediaDuration = $('#media-duration');
var $curTime = $('#current-time');
var $transcript = $('#transcript p');
var $captions = $('#closed-captions');
var $volumeBar = $('#volume-bar');
var $currentVol = $('#current-volume');
var $speedButton = $('.speed-button');
var $speedControls = $('.speed-controls');
var $speedIncrease = $('.speed-increase');
var $speedDecrease = $('.speed-decrease');

// Play button plays the video or pauses it if it's already playing
$playPauseButton.click(function () {
	if (video.paused) {
		video.play();
		$playPauseButton.css('background', 'url(icons/pause-icon.png) center center no-repeat');
	} else {
		video.pause();
		$playPauseButton.css('background', 'url(icons/play-icon.png) center center no-repeat');
	}
});

// Mute button changes volume to zero and adjusts volume bar to 0 width
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

// Full Screen Button - subject to browser idiosyncrasies 
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

// Fundtion that renders the current and total video time in the controls box
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

//Show and hide the media controls based on cursor being inside the media player
$mediaPlayer.mouseenter(function () {
  	$('.media-buttons').slideDown("fast");
  	$('.media-scrubber').addClass("buttons-showing");
});

$mediaPlayer.mouseleave(function () {
  	$('.media-buttons').slideUp("fast");
  	$('.media-scrubber').removeClass("buttons-showing");
  	$speedControls.hide();
});

// Change position in video based on where user clicks in progress bar
$scrubber.mousedown(function (event) {
	//get X position of mouse over loading bar (event.pageX)
	var x = event.pageX - $(this).offset().left;

	//convert the X position to a percentage of the video
	var percent = x / $(this).width();

	//set video's current time to percent of total duration
	video.currentTime = percent * video.duration;
});

// Change volume based on where user clicks in volume bar
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

// Function to convert data in transcript paragraphs to seconds
function timeToString(time) {
    var result;
    var hours = parseInt(time.substr(0, 2));
    var minutes = parseInt(time.substr(3, 2));
    var seconds = parseInt(time.substr(6, 2));
    var milliseconds = parseInt(time.substr(9, 3));
    result = (hours * 3600) + (minutes * 60) + seconds + (milliseconds * 0.001);
    return result;
}

// Function to highlight the paragraph that aligns with the current spot in the video
function updateTranscript () {
	var curTime = video.currentTime;
	
	$transcript.each(function (index) {
		var startTime = timeToString($(this).attr("data-time-start")); //convert start time to seconds
		var endTime = timeToString($(this).attr("data-time-end")); //convert end time to seconds
		if (curTime >= startTime && curTime < endTime) { //if the current time is between the start and end time
			$(this).addClass("highlight");	 // highlight it
		} else {
			$(this).removeClass("highlight"); // otherwise remove the highlight
		}
	});
}

//User clicks on any of the paragraphs, the paragraph highlights and the video goes to that timecode
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

$speedButton.click(function () {
	$speedControls.show();
});

$speedIncrease.click(function () {
	video.playbackRate += 0.25;
	console.log(video.playbackRate);
});

$speedDecrease.click(function () {
	video.playbackRate -= 0.25;
	console.log(video.playbackRate);
});

video.addEventListener("timeupdate", updateScrubber); //as the time updates, move the progress bar
video.addEventListener("timeupdate", updateTime); //as the time updates, change the time displayed in the controls
video.addEventListener("canplay", updateTime); //if the video can be played, update the control bar time (used once to get the video duration)
video.addEventListener("timeupdate", updateTranscript); //as the time updates, highlight the appropriate transcript paragraph