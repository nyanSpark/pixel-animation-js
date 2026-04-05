/*
Pixel Animation by Benjamin Chu
Project: Pixel Animation in HTML5 & Javascript
Version: 2.0
(c) 2026 - intechnicolor.net
*/

(() => {
  "use strict";

  const canvas = document.getElementById("myCanvas");
  if (!canvas) {
    throw new Error('Canvas element with id "myCanvas" was not found.');
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("2D canvas context could not be created.");
  }

  const requestFrame =
    window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  if (!requestFrame) {
    throw new Error("requestAnimationFrame is not supported in this browser.");
  }

  const CANVAS_WIDTH = canvas.width;
  const CANVAS_HEIGHT = canvas.height;

  const PIXEL_SIZE = 7;
  const EASING_SPEED = 7;

  const REFERENCE_X = Math.round(CANVAS_WIDTH * 0.23828);
  const REFERENCE_Y = Math.round(CANVAS_HEIGHT * 0.46527);

  const locXArray = [
    0, 0, 0, 0,
    20, 20, 20, 20, 30, 40, 50, 50, 50,
    70, 80, 80, 80, 80, 90, 90,
    110, 110, 120, 120, 120, 130, 130, 130, 140,
    160, 160, 170, 180, 170, 180,
    200, 200, 200, 200, 200, 210, 220, 230, 230, 230,
    250, 250, 250, 250, 260, 270, 280, 280, 280,
    300, 300, 300, 300,
    320, 320, 330, 340, 330, 340,
    360, 360, 370, 370, 380, 380, 390, 390,
    410, 410, 410, 410, 410,
    430, 430, 440, 440, 450, 450, 460, 460,
    480, 480, 480, 480, 490, 500,
    520,
    540, 540, 540, 540, 550, 560, 570, 570, 570,
    590, 590, 600, 600, 600, 610, 610, 610, 620,
    640, 650, 650, 650, 650, 660, 660
  ];

  const locYArray = [
    0, 20, 30, 40,
    10, 20, 30, 40, 10, 10, 20, 30, 40,
    10, 0, 10, 20, 30, 10, 40,
    20, 30, 10, 30, 40, 10, 20, 40, 20,
    20, 30, 10, 10, 40, 40,
    0, 10, 20, 30, 40, 10, 10, 20, 30, 40,
    10, 20, 30, 40, 10, 10, 20, 30, 40,
    0, 20, 30, 40,
    20, 30, 10, 10, 40, 40,
    20, 30, 10, 40, 10, 40, 20, 30,
    0, 10, 20, 30, 40,
    20, 30, 10, 40, 10, 40, 20, 30,
    10, 20, 30, 40, 20, 10,
    40,
    10, 20, 30, 40, 10, 10, 20, 30, 40,
    20, 30, 10, 30, 40, 10, 20, 40, 20,
    10, 0, 10, 20, 30, 10, 40
  ];

  const redArray = [
    255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255,
    231, 231, 231, 231, 231, 231, 231,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    130, 130, 130, 130, 130, 130, 130, 130, 130, 130,
    126, 126, 126,
    255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255,
    231, 231, 231, 231, 231,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    255,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0
  ];

  const greenArray = [
    0, 0, 0, 0,
    128, 128, 128, 128, 128, 128, 128, 128, 128,
    231, 231, 231, 231, 231, 231, 231,
    247, 247, 247, 247, 247, 247, 247, 247, 247, 247,
    255, 255, 255, 255, 255, 255,
    191, 191, 191, 191, 191, 191, 191, 191, 191,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0,
    0, 0, 0, 0, 0, 0,
    128, 128, 128, 128, 128, 128, 128, 128,
    231, 231, 231, 231, 231,
    247, 247, 247, 247, 247, 247, 247,
    255, 255, 255, 255, 255, 255, 255,
    255,
    191, 191, 191, 191, 191, 191, 191, 191, 191,
    191, 191, 191, 191, 191, 191, 191, 191, 191,
    191, 191, 191, 191, 191, 191, 191
  ];

  const blueArray = [
    0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    62, 62, 62, 62, 62, 62, 62, 62, 62, 62,
    191, 191, 191, 191, 191, 191,
    255, 255, 255, 255, 255, 255, 255, 255, 255,
    175, 175, 175, 175, 175, 175, 175, 175, 175, 175,
    0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    62, 62, 62, 62, 62, 62, 62,
    191, 191, 191, 191, 191, 191, 191,
    255,
    255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255, 255, 255,
    255, 255, 255, 255, 255, 255, 255
  ];

  const pixelCount = locXArray.length;

  if (
    locYArray.length !== pixelCount ||
    redArray.length !== pixelCount ||
    greenArray.length !== pixelCount ||
    blueArray.length !== pixelCount
  ) {
    throw new Error("Pixel data arrays must all have the same length.");
  }

  function drawPixel(x, y, red, green, blue, alpha) {
    ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
  }

  class Pixel {
    constructor(initialX, initialY) {
      this.initialX = initialX;
      this.initialY = initialY;

      this.currentX = initialX;
      this.currentY = initialY;

      this.isInitialized = false;
      this.alpha = 1;
      this.alphaRate = Math.random() * 0.007;

      this.randomRed = Math.floor(Math.random() * 255);
      this.randomGreen = Math.floor(Math.random() * 255);
      this.randomBlue = Math.floor(Math.random() * 255);

      this.stepPhase = 0;
    }

    update(targetX, targetY, finalRed, finalGreen, finalBlue) {
      if (!this.isInitialized) {
        drawPixel(
          this.currentX,
          this.currentY,
          this.randomRed,
          this.randomGreen,
          this.randomBlue,
          this.alpha
        );
        this.isInitialized = true;
        return;
      }

      const hasReachedX = Math.round(this.currentX) === targetX;

      if (hasReachedX) {
        this.currentX = targetX;
        this.currentY += (targetY - this.currentY) / EASING_SPEED;

        if (Math.round(this.currentY) === targetY) {
          this.currentY = targetY;

          if (this.stepPhase <= 3) {
            this.stepPhase += 1;
          }

          if (this.stepPhase === 4) {
            this.alpha -= this.alphaRate;
            if (this.alpha < 0.6) {
              this.alpha = 1;
            }
          }
        }

        drawPixel(
          this.currentX,
          this.currentY,
          finalRed,
          finalGreen,
          finalBlue,
          this.alpha
        );
      } else {
        this.currentX += (targetX - this.currentX) / EASING_SPEED;

        drawPixel(
          this.currentX,
          this.currentY,
          this.randomRed,
          this.randomGreen,
          this.randomBlue,
          this.alpha
        );
      }
    }

    updateStep(targetX, targetY, finalRed, finalGreen, finalBlue) {
      const halfX = Math.round((this.initialX + targetX) / 2);
      const halfY = Math.round((this.initialY + targetY) / 2);

      const firstQuarterX = Math.round((this.initialX + halfX) / 2);
      const firstQuarterY = Math.round((this.initialY + halfY) / 2);

      const secondQuarterX = Math.round((halfX + targetX) / 2);
      const secondQuarterY = Math.round((halfY + targetY) / 2);

      if (this.stepPhase === 0) {
        this.update(firstQuarterX, firstQuarterY, finalRed, finalGreen, finalBlue);
      } else if (this.stepPhase === 1) {
        this.update(halfX, halfY, finalRed, finalGreen, finalBlue);
      } else if (this.stepPhase === 2) {
        this.update(secondQuarterX, secondQuarterY, finalRed, finalGreen, finalBlue);
      } else {
        this.update(targetX, targetY, finalRed, finalGreen, finalBlue);
      }
    }
  }

  const pixels = [];

  function createPixels() {
    for (let i = 0; i < pixelCount; i += 1) {
      const initialX = Math.floor(Math.random() * CANVAS_WIDTH);
      const initialY = Math.floor(Math.random() * CANVAS_HEIGHT);
      pixels.push(new Pixel(initialX, initialY));
    }
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  function draw() {
    clearCanvas();

    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].updateStep(
        REFERENCE_X + locXArray[i],
        REFERENCE_Y + locYArray[i],
        redArray[i],
        greenArray[i],
        blueArray[i]
      );
    }

    requestFrame(draw);
  }

  createPixels();
  requestFrame(draw);
})();
	// Recursively draw again
	requestAnimationFrame(draw);
}
// end
