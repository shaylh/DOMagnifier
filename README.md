DOMagnifier
=========

# Setup
To enable DOMagnifier in a page, add the following to the header section:

```
<script src="DOMagnifier.js"></script>
```
```
<script src="html2canvas.min.js"></script>
```
```
<link href="css/magnifier.css" rel="stylesheet"/>
```
# Usage

## Starting
To add the actual magnifier, create a new magnifier object, and call start().

```javascript
new Magnifier('someElementId').start();
```

Where `someElementId` is the id of the DOM element you want to enable magnifier for.
Once this is done, you'll see a nice looking magnifier over your DOM element.

## Stopping
To remove the magnifier, simply double click the mouse, or call stop() on the magnifier object.
```javascript
var magnifier = new Magnifier('someElementId').start();
magnifier.stop();
```

## Additional parameters
### Zoom level
by default, the zoom level is x2; However, you can pass the magnifier's constructor a second parameter, indicating the zoom level:
```javascript
new Magnifier('someElementId', 3);
```