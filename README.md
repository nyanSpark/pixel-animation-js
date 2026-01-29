# Pixel Animation (HTML5 / Javascript)

A lightweight HTML5 + JavaScript pixel animation demo and helper library for animating block-style pixel art directly in the browser.

## Overview

This project demonstrates a minimal approach to rendering and animating pixel art using plain JavaScript and HTML. Instead of relying on external frameworks or game engines, pixel art is defined using coordinate arrays and rendered dynamically at runtime.

The repository includes:
- `pixelanimation.js`: A small JavaScript engine for drawing and animating pixel blocks.
- `pixelanimation.html`: An example HTML file demonstrating how to use the animation logic.

This project is intended as a learning tool, demo, or starting point for lightweight browser-based animations.

## Demo
- Flash Demo: http://intechnicolor.net
- HTML5 / Javascript Demo: http://intechnicolor.net/html5/

## How It Works

1. Create pixel art using any pixel or sprite editor (http://www.aseprite.org/).
2. Determine the relative `(x, y)` positions of each pixel using the top-left corner as a reference.
3. Populate the coordinate arrays (`locXArray`, `locYArray`) with those values.
4. Load the HTML file in a modern browser to see the animation render.

Each pixel is drawn as a block, allowing simple animations by updating positions or frame data over time.

## Requirements

- Any modern browser with HTML5 and JavaScript support
- No external libraries or dependencies
