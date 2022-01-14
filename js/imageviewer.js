// Custom image loader that will attempt to show thumbnail before the full image

let thumbSrc = null;
let fullSrc = null;
let currentImg = null;

function showThumbImage(src) {
  thumbSrc = src;
  let img = new Image();
  img.style.cssText = 'position: absolute; height: 100%; width: 100%; object-fit: contain; filter: blur(2px);';
  img.onload = () => {
    if (src == thumbSrc) {
      if (currentImg) crossfade(currentImg, img);
      currentImg = img;
      document.body.appendChild(img);
    }
  }
  img.src = src;
}

function showFullImage(src) {
  fullSrc = src;
  let img = new Image();
  img.style.cssText = 'position: absolute; height: 100%; width: 100%; object-fit: contain;';
  img.onload = () => {
    if (src == fullSrc) {
      thumbSrc = null; // Avoid adding thumb image
      if (currentImg) crossfade(currentImg, img);
      currentImg = img;
      document.body.appendChild(img);
    }
  }
  img.src = src;
}

function crossfade(from, to) {
    let step = 1000 / 60; // 60 fps
    let duration = 300;
    let opacity = 0;
    to.style.opacity = 0;
    let instance = window.setInterval(() => {
      opacity += step / duration;
      to.style.opacity = opacity;
      if (opacity > 1) {
        window.clearInterval(instance);
        from.remove();
      }
    }, step);
}

export function showImage(src) {
  showThumbImage(src.replace("/photo/", "/thumb/"));
  showFullImage(src);
}
