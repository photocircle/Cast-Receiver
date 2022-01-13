const context = cast.framework.CastReceiverContext.getInstance();

// let playerElement = document.getElementsByTagName("cast-media-player")[0];
// let playerRoot = playerElement.shadowRoot;
// let playPause = playerRoot.querySelectorAll('.controlsPlayPause')[0];
// playPause.style.setProperty('display', 'none');
// let gradient = playerRoot.querySelectorAll('.gradient')[0];
// gradient.style.setProperty('display', 'none');
// let metadata = playerRoot.querySelectorAll('.metadata')[0];
// metadata.style.setProperty('display', 'none');
// let timeline = playerRoot.querySelectorAll('.controlsTimeline')[0];
// timeline.style.setProperty('display', 'none');

// let video = playerRoot.querySelectorAll('.mediaElement')[0];
// video.style.setProperty('display', 'none');
// // Disallow Chromecast to stop casting on the end
// video.addEventListener('ended', event => {
//   event.stopImmediatePropagation();
// }, true);

// let debug = document.createElement('div');
// debug.style.cssText = 'position:absolute;left:0;right:0;top:2%;bottom:0;text-align:center;font-size:40px;color:red;';
// document.body.appendChild(debug);

let thumb = document.createElement('img');
thumb.src = 'res/transparent.gif';
thumb.style.cssText = 'position: absolute; height: 100%; width: 100%; object-fit: contain; filter: blur(2px);';
document.body.appendChild(thumb);

let full = document.createElement('img');
full.src = 'res/transparent.gif';
full.style.cssText = 'position: absolute; height: 100%; width: 100%; object-fit: contain;';
document.body.appendChild(full);

context.getPlayerManager().setMessageInterceptor(cast.framework.messages.MessageType.LOAD, loadRequestData => {
    thumb.src = loadRequestData.media.contentId.replace("/photo/", "/thumb/");
    full.src = 'res/transparent.gif';
    full.src = loadRequestData.media.contentId;
    // video.poster = loadRequestData.media.contentId.replace("/video/", "/thumb/");
    return null;
  }
);

context.addEventListener(cast.framework.system.EventType.SENDER_DISCONNECTED, () => {
  thumb.src = 'res/transparent.gif';
  full.src = 'res/transparent.gif';
});


const playbackConfig = new cast.framework.PlaybackConfig();
// playbackConfig.autoPauseDuration = 0.5;
// playbackConfig.autoResumeDuration = 1.0;

context.start({playbackConfig: playbackConfig});
