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
      if (currentImg) currentImg.remove();
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
      if (currentImg) currentImg.remove();
      currentImg = img;
      document.body.appendChild(img);
    }
  }
  img.src = src;
}

export function showImage(src) {
  showThumbImage(src.replace("/photo/", "/thumb/"));
  showFullImage(src);
}
