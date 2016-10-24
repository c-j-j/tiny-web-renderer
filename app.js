function setPoint(image, x, y, value) {
  const redPosition = ((image.width * y) + x) * 4
  const bluePosition = ((image.width * y) + x) * 4 + 1
  const greenPosition = ((image.width * y) + x) * 4 + 2
  const alphaPosition = ((image.width * y) + x) * 4 + 3
  image.data[redPosition] = value
  image.data[bluePosition] = value
  image.data[greenPosition] = value
  image.data[alphaPosition] = 255
}

function line(image, x0, y0, x1, y1) {
  var deltaX = Math.abs(x1-x0)
  var deltaY = Math.abs(y1-y0)
  var changeInX = (x0 < x1) ? 1 : -1
  var changeInY = (y0 < y1) ? 1 : -1
  var deltaError = deltaX-deltaY

  var x = x0
  var y = y0

  while((x!==x1) || (y!==y1)){
    setPoint(image,x,y)

    var pixelError = 2*deltaError
    if (pixelError >-deltaY){
      deltaError -= deltaY
      x += changeInX
    }

    if (pixelError < deltaX){
      deltaError += deltaX
      y += changeInY
    }
  }
}

var buffer;
function loadObjData() {
  var client = new XMLHttpRequest();
  client.open('GET', '/foo.obj');
  client.onreadystatechange = function() {
    buffer = client.responseText
    alert('foo');
  }
  client.send();
}

function createImage() {
  var canvas=document.getElementById("canvas")
  var context=canvas.getContext("2d")
  var imgData=context.createImageData(canvas.clientHeight, canvas.clientWidth)

  loadObjData()
  line(imgData, 800.0, 800.0, 100.0, 100.0)
  line(imgData, 100.0, 800.0, 800.0, 100.0)
  line(imgData, 100.0, 100.0, 800.0, 100.0)
  line(imgData, 100.0, 100.0, 100.0, 800.0)
  context.putImageData(imgData,0,0)

}

function main() {
  createImage()
}

document.addEventListener('DOMContentLoaded', main)
