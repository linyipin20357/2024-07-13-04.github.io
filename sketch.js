let bg;
let text0, text1;
let maxAlpha = 150; // 最大透明度
let fadeSpeed = 2; // 淡入淡出速度
let frameInterval = 400; // 每個循環的幀數間隔
let currentFrame = 0; // 目前的幀數
let fadeIn = true; // 是否淡入中
let dots = []; // 存放閃爍的小亮點

function preload() {
  bg = loadImage("Bg-04.jpg");
  text0 = loadImage("text0.png");
  text1 = loadImage("text1.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  // 初始化閃爍的小亮點
  for (let i = 0; i < 50; i++) {
    dots.push(createVector(random(width), random(height)));
  }
}

function draw() {
  // 設置淡黃色背景色
  background(223, 199, 189);

  let bgWidth = (bg.width / bg.height) * height;
  image(bg, width / 2, height / 2, bgWidth, height);

  // 繪製閃爍的小亮點
  for (let dot of dots) {
    fill(255, 255, 200);
    noStroke();
    ellipse(dot.x, dot.y, 3);
  }

  // 計算小圖的新尺寸，使高度與背景圖一致
  let newImgHeight = height;
  let newImgWidth0 = (text0.width / text0.height) * newImgHeight;
  let newImgWidth1 = (text1.width / text1.height) * newImgHeight;

  // 控制漸變循環播放
  if (frameCount % frameInterval == 0) {
    currentFrame++;
    if (currentFrame % 2 == 0) {
      fadeIn = true;
    } else {
      fadeIn = false;
    }
  }

  // 淡入淡出效果 (右上)
  if (fadeIn) {
    let alpha0 = map(frameCount % frameInterval, 0, frameInterval, 0, maxAlpha);
    tint(255, alpha0);
    image(text0, width - newImgWidth0 / 2 - 20, newImgHeight / 2 + 20, newImgWidth0, newImgHeight);
    noTint();
  } else {
    let alpha1 = map(frameCount % frameInterval, 0, frameInterval, 0, maxAlpha);
    tint(255, alpha1);
    image(text1, newImgWidth1 / 2 + 20, newImgHeight / 2 + 20, newImgWidth1, newImgHeight);
    noTint();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // 重新調整閃爍的小亮點的位置
  for (let i = 0; i < dots.length; i++) {
    dots[i].x = random(width);
    dots[i].y = random(height);
  }
}
