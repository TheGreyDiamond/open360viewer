# open360viewer
open360viewer is an opensource 360° media viewer. It is based on electron and marzipano. It currently supports opening equirectangular 360° images and videos.

## Getting started
Currently the viewer can only be used if you have nodeJs installed. Complete packaging is planned.
1. Download the repository
2. Install dependencies using `npm install`
3. Build and minify all assets using `npm run buildCss` and `npm run minify`
4. Just run it using `npm start`

If you are developing you might want to use `npm run startDev` as it also builds all assets at each launch.
## Features
- viewing equirectangular 360° images
- viewing equirectangular 360° videos
- adds possibilty to support Windows's Open with feature (open via Argument)
### WiP
### Planned features
- being able to flip through all images in a folder
- show meta data

## Screenshots

![App when no file is loaded](https://github.com/TheGreyDiamond/open360viewer/blob/central/screenshots/noImageLoaded.png?raw=true)
![App when file is loaded](https://github.com/TheGreyDiamond/open360viewer/blob/central/screenshots/imageLoaded.png?raw=true)
