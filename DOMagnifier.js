var Magnifier = function (targetId) {

    this.paintCroppedImageBound = this.paintCroppedImage.bind(this);

    this.box = document.getElementById(targetId);
    this.result = document.createElement('div');
    this.result.className = 'magnifier';
    this.croppedCanvas = document.createElement('canvas');
    this.result.appendChild(this.croppedCanvas);
    document.body.appendChild(this.result);

    var br = this.box.getBoundingClientRect();
    this.offsetSize = {
        top: br.top + window.scrollY,
        left: br.left + window.scrollX
    };
};

Magnifier.prototype = {
    start: function () {
        html2canvas(this.box, {onrendered: this.onGotCanvas.bind(this)});
    },
    stop: function(){
        this.box.removeEventListener('mousemove', this.paintCroppedImageBound);
        this.result.removeEventListener('mousemove', this.paintCroppedImageBound);
        this.result.parentElement.removeChild(this.result);
    },
    onGotCanvas: function(canvas){
        this.cachedCanvas = canvas;
        this.box.addEventListener('mousemove', this.paintCroppedImageBound);
        this.result.addEventListener('mousemove', this.paintCroppedImageBound);
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
        this.croppedCanvas.getContext("2d").scale(2, 2);
        this.croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, width, height, 0, 0, width, height);
    }
};
