const context = cast.framework.CastReceiverContext.getInstance();


let playerElement = document.getElementsByTagName("cast-media-player")[0];

const playbackConfig = new cast.framework.PlaybackConfig();
playbackConfig.autoPauseDuration = 0.5;
playbackConfig.autoResumeDuration = 1.0;

const controls = cast.framework.ui.Controls.getInstance();
controls.clearDefaultSlotAssignments();

context.start({playbackConfig: playbackConfig});
