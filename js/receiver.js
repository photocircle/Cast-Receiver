const context = cast.framework.CastReceiverContext.getInstance();


let playerElement = document.getElementsByTagName("cast-media-player")[0];
let playerRoot = playerElement.shadowRoot;

let playPause = playerRoot.querySelectorAll('.controlsPlayPause')[0];
playPause.style.setProperty('display', 'none');

let gradient = playerRoot.querySelectorAll('.gradient')[0];
gradient.style.setProperty('display', 'none');

let metadata = playerRoot.querySelectorAll('.metadata')[0];
metadata.style.setProperty('display', 'none');

let timeline = playerRoot.querySelectorAll('.controlsTimeline')[0];
timeline.style.setProperty('display', 'none');


let debug = document.createElement('div');
debug.style.cssText = 'position:absolute;left:0;right:0;top:2%;bottom:0;text-align:center;font-size:40px;color:red;';
document.body.appendChild(debug);

let foreground = playerRoot.querySelectorAll('.foreground')[0];

let preview = document.createElement('img');
preview.style.cssText = 'position: absolute; height: 100%; width: 100%; object-fit: contain;';
foreground.parentElement.insertBefore(preview, foreground);

let video = playerRoot.querySelectorAll('.mediaElement')[0];
// Disallow Chromecast to stop casting on the end
video.addEventListener('ended', event => {
  event.stopImmediatePropagation();
}, true);

let c = 0;
context.getPlayerManager().setMessageInterceptor(
  cast.framework.messages.MessageType.LOAD, loadRequestData => {
    preview.src = loadRequestData.media.contentId.replace("/photo/", "/thumb/");
    video.poster = loadRequestData.media.contentId.replace("/video/", "/thumb/");
    if (c++ % 2 == 0) {
      return loadRequestData;
    } else {
      return null;
    }
  }
);


const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.autoPauseDuration = 0.5;
playbackConfig.autoResumeDuration = 1.0;

context.start({playbackConfig: playbackConfig});
