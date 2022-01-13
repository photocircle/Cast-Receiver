const context = cast.framework.CastReceiverContext.getInstance();


let playerElement = document.getElementsByTagName("cast-media-player")[0];
let playerRoot = playerElement.shadowRoot;

let playPause = playerRoot.querySelectorAll('.controlsPlayPause')[0];
playPause.style.setProperty('position', 'relative');
playPause.style.setProperty('left', '50%');

let timeline = playerRoot.querySelectorAll('.controlsTimeline')[0];
timeline.style.setProperty('display', 'none');


const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.autoPauseDuration = 0.5;
playbackConfig.autoResumeDuration = 1.0;

context.start({playbackConfig: playbackConfig});
