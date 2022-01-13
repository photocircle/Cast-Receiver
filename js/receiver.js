const context = cast.framework.CastReceiverContext.getInstance();


let playPause = document.getElementsByClassName('controlsPlayPause')[0];
playPause.style.setProperty('position', 'relative');
playPause.style.setProperty('left', '50%');

let timeline = document.getElementsByClassName('controlsTimeline')[0];
timeline.style.setProperty('display', 'none');


const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.autoPauseDuration = 0.5;
playbackConfig.autoResumeDuration = 1.0;

context.start({playbackConfig: playbackConfig});
