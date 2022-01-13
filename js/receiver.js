const context = cast.framework.CastReceiverContext.getInstance();


const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
castDebugLogger.setEnabled(true);
castDebugLogger.showDebugLogs(true);
castDebugLogger.loggerLevelByEvents = {
  'cast.framework.events.category.CORE': cast.framework.LoggerLevel.INFO,
  'cast.framework.events.EventType.MEDIA_STATUS': cast.framework.LoggerLevel.DEBUG
};
if (!castDebugLogger.loggerLevelByTags) {
  castDebugLogger.loggerLevelByTags = {};
}
castDebugLogger.loggerLevelByTags['Receiver'] = cast.framework.LoggerLevel.DEBUG;


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


let test = document.createElement('div');
test.style.cssText = 'position:absolute;left:0;right:0;top:50%;bottom:0;text-align:center;font-size:40px;color:#00FF00;';
document.body.appendChild(test);
test.innerHTML = "Ready"

let video = playerRoot.querySelectorAll('.mediaElement')[0];
video.addEventListener('timeupdate', () => {
  test.innerHTML = video.currentTime + " / " + video.duration;
  if (video.currentTime == video.duration) {
  	video.pause();
  }
});
video.addEventListener('ended', () => {
  test.innerHTML = "Ended";
  video.pause();
  video.currentTime = video.duration;
});


const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.autoPauseDuration = 0.5;
playbackConfig.autoResumeDuration = 1.0;

context.start({playbackConfig: playbackConfig});
