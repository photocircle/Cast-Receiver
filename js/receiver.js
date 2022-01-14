import { showImage } from './imageviewer.js';

const context = cast.framework.CastReceiverContext.getInstance();

var prevTimeoutId = null;

context.getPlayerManager().setMessageInterceptor(cast.framework.messages.MessageType.LOAD, loadRequestData => {
  showImage(loadRequestData.media.contentId);

  // Custom idle timeout
  if (prevTimeoutId) clearTimeout(prevTimeoutId);
  prevTimeoutId = setTimeout(() => {
    context.stop();
  }, 5 * 60 * 1000);

  return null;
});

const options = new cast.framework.CastReceiverOptions();
options.disableIdleTimeout = true;
context.start();
