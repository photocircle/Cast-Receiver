// Custom image loader that will attempt to show thumbnail before the full image

let srcMap = new Map();
let currentImg = null;

function show(type, src) {
  srcMap.set(type, src);
  let img = new Image();
  img.classList.add("img-" + type, "fullscreen");
  img.onload = () => {
    if (src != srcMap.get(type)) return;
    srcMap.delete("thumb")  // Avoid showing thumb image, if full is already loaded
    if (currentImg) currentImg.remove();
    currentImg = img;
    document.body.appendChild(img);
  }
  img.onerror = () => {
    if (src != srcMap.get(type)) return
    if (currentImg) currentImg.remove();
  }
  img.src = src;
}

export function showImage(src) {
  if (src.includes("/photo/")) show("thumb", src.replace("/photo/", "/thumb/"));
  show("full", src);
}
