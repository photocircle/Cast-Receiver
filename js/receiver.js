const context = cast.framework.CastReceiverContext.getInstance();


let playerElement = document.getElementsByTagName("cast-media-player")[0];
let playerRoot = playerElement.shadowRoot;

let playPause = playerRoot.querySelectorAll('.controlsPlayPause')[0];
playPause.style.setProperty('width', '36px');
playPause.style.setProperty('height', '36px');
playPause.style.setProperty('position', 'relative');
playPause.style.setProperty('left', '50%');
playPause.style.setProperty('top', '100%');
playPause.style.setProperty('margin-left', '-18px');
playPause.style.setProperty('margin-top', '-36px');

let gradient = playerRoot.querySelectorAll('.gradient')[0];
gradient.style.setProperty('display', 'none');

let metadata = playerRoot.querySelectorAll('.metadata')[0];
metadata.style.setProperty('display', 'none');

let timeline = playerRoot.querySelectorAll('.controlsTimeline')[0];
timeline.style.setProperty('display', 'none');


let test = document.createElement('div');
test.style.cssText = 'position:absolute;left:0;right:0;top:2%;bottom:0;text-align:center;font-size:40px;color:red;';
document.body.appendChild(test);
test.innerHTML = "Ready"

let video = playerRoot.querySelectorAll('.mediaElement')[0];
video.addEventListener('loadedmetadata', () => {
  video.poster = video.src.replace("/video/", "/photo/"); // TODO
  playPause.style.setProperty('display', 'block'); // TODO
});
video.addEventListener('timeupdate', () => {
  test.innerHTML = video.currentTime.toFixed(1) + " / " + video.duration.toFixed(1);
});
// Disallow Chromecast to stop casting on end
video.addEventListener('ended', event => {
  test.innerHTML = "Ended";
  playPause.style.setProperty('display', 'none'); // TODO
  event.stopImmediatePropagation();
}, true);


const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.autoPauseDuration = 0.5;
playbackConfig.autoResumeDuration = 1.0;

context.start({playbackConfig: playbackConfig});
