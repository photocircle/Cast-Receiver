import { showImage } from './imageviewer.js';

const context = cast.framework.CastReceiverContext.getInstance();

context.getPlayerManager().setMessageInterceptor(cast.framework.messages.MessageType.LOAD, loadRequestData => {
  showImage(loadRequestData.media.contentId);
  return null;
});

context.start();
