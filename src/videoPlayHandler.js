
// Create viewer.
var viewer = new Marzipano.Viewer(document.querySelector('#pano'));

// Create layer.
var asset = new VideoAsset();
var source = new Marzipano.SingleAssetSource(asset);
var geometry = new Marzipano.EquirectGeometry([ { width: 1 } ]);

var limiter = Marzipano.RectilinearView.limit.traditional(2560, 100*Math.PI/180);
var view = new Marzipano.RectilinearView(null, limiter);

var scene = viewer.createScene({ source: source, geometry: geometry, view: view, pinFirstLevel: false });

scene.switchTo({ transitionDuration: 0 });

var emitter = new EventEmitter();
var videoEmitter = new EventEmitterProxy();



function setResolutionIndex(index, vidScr, cb) {
  cb = cb || function() {};

  var videoSrc = vidScr;

  var previousVideo = asset.video() && asset.video().videoElement();

  loadVideoInSync(videoSrc, previousVideo, function(err, element) {
    if (err) {
      cb(err);
      return;
    }

    if (previousVideo) {
      previousVideo.pause();
      previousVideo.volume = 0;
      previousVideo.removeAttribute('src');
    }

    var VideoElementWrapper = NullVideoElementWrapper;
    var wrappedVideo = new VideoElementWrapper(element);
    asset.setVideo(wrappedVideo);

    videoEmitter.setObject(element);

    emitter.emit('change');
    emitter.emit('resolutionChange');

    cb();
  });
}

var multiResVideo = {
  layer: function() {
    return scene.layer();
  },
  element: function() {
    return asset.video() && asset.video().videoElement();
  },
  resolutions: function() {
    return resolutions;
  },
  resolutionIndex: function() {
    return currentState.resolutionIndex;
  },
  resolution: function() {
    return currentState.resolutionIndex != null ?
              resolutions[currentState.resolutionIndex] :
              null;
  },
  setResolutionIndex: setResolutionIndex,
  resolutionChanging: function() {
    return currentState.resolutionChanging;
  },
  addEventListener: emitter.addEventListener.bind(emitter),

  // events from proxy to videoElement
  addEventListenerVideo: videoEmitter.addEventListener.bind(videoEmitter)
};
