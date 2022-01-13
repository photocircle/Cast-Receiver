const context = cast.framework.CastReceiverContext.getInstance();


let playerElement = document.getElementsByTagName("cast-media-player")[0];
let playerRoot = playerElement.shadowRoot;

let playPause = playerRoot.querySelectorAll('.controlsPlayPause')[0];
playPause.style.setProperty('position', 'relative');
playPause.style.setProperty('left', '50%');
playPause.style.setProperty('top', '100%');
playPause.style.setProperty('margin-left', '-23px');
playPause.style.setProperty('margin-top', '-46px');

let gradient = playerRoot.querySelectorAll('.gradient')[0];
gradient.style.setProperty('display', 'none');

let metadata = playerRoot.querySelectorAll('.metadata')[0];
metadata.style.setProperty('display', 'none');

let timeline = playerRoot.querySelectorAll('.controlsTimeline')[0];
timeline.style.setProperty('display', 'none');

let video = playerRoot.querySelectorAll('.mediaElement')[0];
video.addEventListener('timeupdate', () => {
  if (video.currentTime == video.duration) video.pause();
});


const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.autoPauseDuration = 0.5;
playbackConfig.autoResumeDuration = 1.0;

context.start({playbackConfig: playbackConfig});
