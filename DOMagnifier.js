var Magnifier = function (targetId, zoomLevel) {
    this.zoomLevel = zoomLevel || 2;
    this.setupDOM(targetId);
    this.bindFunctions();
};

Magnifier.prototype = {
    bindFunctions: function(){
        this.paintCroppedImageBound = this.paintCroppedImage.bind(this);
        this.startBound = this.start.bind(this);
    },
    setupDOM: function(targetId){
        this.box = document.getElementById(targetId);
        this.result = document.createElement('div');
        this.result.className = 'magnifier';
        this.croppedCanvas = document.createElement('canvas');
        this.result.appendChild(this.croppedCanvas);
        document.body.appendChild(this.result);
    },
    start: function () {
        html2canvas(this.box, {onrendered: this.onGotCanvas.bind(this)});
        this.resetOffsetValues();
        return this;
    },
    stop: function(){
        this.unregisterEvents();
        this.cachedCanvas = null;
        this.result.parentElement.removeChild(this.result);
    },
    resetOffsetValues: function(){
        var br = this.box.getBoundingClientRect();
        this.offsetSize = {
            top: br.top + window.scrollY,
            left: br.left + window.scrollX
        };
    },
    onGotCanvas: function(canvas){
        this.cachedCanvas = canvas;
        this.unregisterEvents();
        this.registerEvents();
    },
    registerEvents: function(){
        this.box.addEventListener('mousemove', this.paintCroppedImageBound);
        this.result.addEventListener('mousemove', this.paintCroppedImageBound);
        this.result.addEventListener('dblclick', this.stop.bind(this));
        window.addEventListener('resize', this.startBound);
    },
    unregisterEvents: function(){
        this.box.removeEventListener('mousemove', this.paintCroppedImageBound);
        this.result.removeEventListener('mousemove', this.paintCroppedImageBound);
        window.removeEventListener('resize', this.startBound);
    },
    paintCroppedImage: function (event) {
        var top = event.pageY  - 50;
        var left = event.pageX - 50;

        this.crop(this.cachedCanvas, {
            width: 100,
            height: 100,
            top: top - this.offsetSize.top + 25,
            left: left - this.offsetSize.left + 25
        });
        this.result.style.top = top + "px";
        this.result.style.left = left + "px";
    },
    crop: function (canvas, bounds) {
        var x1 = Math.min(canvas.width - 1, Math.max(0, bounds.left));
        var x2 = Math.min(canvas.width, Math.max(1, bounds.left + bounds.width));
        var y1 = Math.min(canvas.height - 1, Math.max(0, bounds.top));
        var y2 = Math.min(canvas.height, Math.max(1, bounds.top + bounds.height));
        var width = this.croppedCanvas.width = x2 - x1;
        var height = this.croppedCanvas.height = y2 - y1;
        this.croppedCanvas.getContext("2d").scale(this.zoomLevel, this.zoomLevel);
        this.croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, width, height, 0, 0, width, height);
    }
};
