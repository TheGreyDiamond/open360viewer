# open360viewer
open360viewer is an opensource 360° image viewer. It is based on electron and marzipano. It currently supports opening equirectangular 360° images.

## Getting started
Currently the viewer can only be used if you have nodeJs installed. Complete packaging is planned.
1. Install dependencies using `npm install`
2. Build and minify all assets using `npm run buildCss` and `npm run minify`
3. Just run it using `npm start`

If you are developing you might want to use `npm run startDev` as it also builds all assets at each launch.
## Features
- viewing equirectangular 360° images
### WiP
- viewing equirectangular 360° videos
### Planned features
- being able to flip through all images in a folder
- show meta data
## Screenshots

![App when no game is loaded](https://github.com/TheGreyDiamond/open360viewer/blob/central/screenshots/noImageLoaded.png?raw=true)
![App when no game is loaded](https://github.com/TheGreyDiamond/open360viewer/blob/central/screenshots/imageLoaded.png?raw=true)
