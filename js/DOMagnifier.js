var Magnifier = function (targetId, zoomLevel, ignoreDoubleClick) {
    this.setZoomLevel(zoomLevel);
    this.stopOnDoubleClick(!ignoreDoubleClick);
    this._setupDOM(targetId);
    this._bindFunctions();
};

Magnifier.prototype = {
    start: function () {
        html2canvas(this._target, {onrendered: this._onGotCanvas.bind(this)});
        this._resetOffsetValues();
        return this;
    },
    stop: function () {
        this.un_registerEvents();
        this._cachedCanvas = null;
        this._result.parentElement.removeChild(this._result);
    },
    setZoomLevel: function (zoomLevel) {
        if (typeof zoomLevel === "number" && isFinite(zoomLevel) && zoomLevel % 1 === 0 && zoomLevel > 0 && zoomLevel <= 5) {
            this.zoomLevel = zoomLevel || 2;
        }
    },
    stopOnDoubleClick: function (stopOnDoubleClick) {
        this._stopOnDoubleClick = stopOnDoubleClick;
    },
    _bindFunctions: function () {
        this._paint_croppedImageBound = this._paint_croppedImage.bind(this);
        this.startBound = this.start.bind(this);
        this.stopBound = this.stop.bind(this);
    },
    _setupDOM: function (targetId) {
        this._target = document.getElementById(targetId);
        this._result = document.createElement('div');
        this._result.className = 'magnifier';
        this._croppedCanvas = document.createElement('canvas');
        this._result.appendChild(this._croppedCanvas);
        document.body.appendChild(this._result);
    },

    _resetOffsetValues: function () {
        var br = this._target.getBoundingClientRect();
        this.offsetSize = {
            top: br.top + window.scrollY,
            left: br.left + window.scrollX
        };
    },
    _onGotCanvas: function (canvas) {
        this._cachedCanvas = canvas;
        this.un_registerEvents();
        this._registerEvents();
    },
    _registerEvents: function () {
        this._target.addEventListener('mousemove', this._paint_croppedImageBound);
        this._result.addEventListener('mousemove', this._paint_croppedImageBound);
        if (this._stopOnDoubleClick) {
            this._result.addEventListener('dblclick', this.stopBound);
        }
        window.addEventListener('resize', this.startBound);
    },
    un_registerEvents: function () {
        this._target.removeEventListener('mousemove', this._paint_croppedImageBound);
        this._result.removeEventListener('mousemove', this._paint_croppedImageBound);
        if (this._stopOnDoubleClick) {
            this._result.removeEventListener('dblclick', this.stopBound);
        }
        window.removeEventListener('resize', this.startBound);
    },
    _paint_croppedImage: function (event) {
        var top = event.pageY - 50;
        var left = event.pageX - 50;

        this._crop(this._cachedCanvas, {
            width: 100,
            height: 100,
            top: top - this.offsetSize.top + 25,
            left: left - this.offsetSize.left + 25
        });
        this._result.style.top = top + "px";
        this._result.style.left = left + "px";
    },
    _crop: function (canvas, bounds) {
        var x1 = Math.min(canvas.width - 1, Math.max(0, bounds.left));
        var x2 = Math.min(canvas.width, Math.max(1, bounds.left + bounds.width));
        var y1 = Math.min(canvas.height - 1, Math.max(0, bounds.top));
        var y2 = Math.min(canvas.height, Math.max(1, bounds.top + bounds.height));
        var width = this._croppedCanvas.width = x2 - x1;
        var height = this._croppedCanvas.height = y2 - y1;
        this._croppedCanvas.getContext("2d").scale(this.zoomLevel, this.zoomLevel);
        this._croppedCanvas.getContext("2d").drawImage(canvas, x1, y1, width, height, 0, 0, width, height);
    }
};
