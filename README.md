DOMagnifier
=========

DOMagnifier is a small Javascript library that lets the user magnify stuff on the page.  
A fully functional demo can be found [here](DOMagnifier.html).

# Setup
To enable DOMagnifier in a page, add the following to the header section:

```
<script src="js/DOMagnifier.js"></script>
<script src="js/html2canvas.min.js"></script>
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
by default, the zoom level is x2; However, you can pass the magnifier constructor a second parameter, indicating the zoom level (1 to 5):
```javascript
new Magnifier('someElementId', 3);
```
You can also change this later by calling `setZoomLevel(integer)` on the magnifier object.


### Ignore double click
By default, when the user double clicks the mouse, the magnifier stops. You can override this functionality by passing `true` as the third parameter:
```javascript
new Magnifier('someElementId', null, true);
```
You can also change this later by calling `stopOnDoubleClick(boolean)` on the magnifier object.

# Thanks

DOMagnifier uses [html2canvas](https://github.com/niklasvh/html2canvas), which is responsible for most of the magic behind the scenes, to be honest :)

# Enjoy!

