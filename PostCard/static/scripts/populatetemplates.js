/**
 * Created by HellAlien on 01.01.2016.
 */
/**
 * Created by HellAlien on 24.12.2015.
 */
var canvasWrapper, handleDragEnd, handleDragEnter, handleDragLeave, handleDragOver, handleDragStart, handleDrop, images, loadOneImage, noStandartDrop, upObject;

var selectedObject,canlen;
var c = document.getElementById('first');
var canvas = new fabric.Canvas('first');

loadOneImage = function(img, newImage) {
  img = document.querySelector('#images img.img_dragging');
  newImage = new fabric.Image(img, {
    width: img.width,
    height: img.height,
    left: 0,
    top: 0
  });
     setScale(newImage);
};

noStandartDrop = function(e) {
  e.stopPropagation();
  e.preventDefault();
};

handleDragStart = function(e) {
  [].forEach.call(images, function(img) {
    return img.classList.remove('img_dragging');
  });
  return this.classList.add('img_dragging');
};


handleDragOver = function(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'copy';
  return false;
};

handleDragEnter = function(e) {
  return this.classList.add('over');
};

handleDragLeave = function(e) {
  return this.classList.remove('over');
};

canvasWrapper = document.getElementById('mainblock');

setScale = function(e){
     var x = e.width;
            var y = e.height;
            var scale1,scale2;
            if(x>800){
                scale1 = 800/x;
                x = 800;
                y = y*scale1;
            }
            if(y>600) {
                scale2 = 600 / y;
                y = 600;
                x = x * scale2;
            }
            if(x!=0 && y!=0){
                canvas.setHeight(y);
                canvas.setWidth(x);
            }

            e.scaleX=canvas.width / e.width;
            e.scaleY= canvas.height / e.height;
            e.selectable = false;
            e.evented = false;
}

handleDrop = function(e) {
  var f, files, i, img, newImage, reader;

  noStandartDrop(e);
  if (e.dataTransfer.files.length > 0) {
    files = e.dataTransfer.files;
    i = 0;
    while (f = files[i]) {
      if (f.type.match('image.*')) {
        reader = new FileReader;
        reader.onload = function(evt) {
          var newImage;
          var img;
		  img = document.createElement('img');
          img.src = evt.target.result;
          img.onload =function(){
              newImage = new fabric.Image(img, {
              width: img.width,
              height: img.height,
              left: 0,
              top: 0
              });
              setScale(newImage);
              canvas.add(newImage);
          }
        };
          canvas.renderAll(canvas);
        reader.readAsDataURL(f);
      }
      i++;
    }
  } else {
    loadOneImage(img, newImage);
    canvas.add(newImage);
  }
  return false;
};

handleDragEnd = function(e) {
  return [].forEach.call(images, function(img) {
    return img.classList.remove('img_dragging');
  });
};

images = document.querySelectorAll('#images img');

[].forEach.call(images, function(img) {
  var image;
  img.setAttribute('crossOrigin', 'anonymous');
  image = new Image;
  image.src = img.src;
  img.src = image.src;
  img.addEventListener('dragstart', handleDragStart, false);
  return img.addEventListener('dragend', handleDragEnd, false);
});

canvasWrapper.addEventListener('dragenter', handleDragEnter, false);

canvasWrapper.addEventListener('dragleave', handleDragLeave, false);

canvasWrapper.addEventListener('dragover', handleDragOver, false);

canvasWrapper.addEventListener('drop', handleDrop, false);

$('#savetest').click(function(){
    var button = document.getElementById("savetest");
    button.disabled = true;
    savePicture(canvas,function(pictureurl) {
        saveCanvas(canvas,function(canvasurl){
            var postCardName = document.getElementById('postCardName').value;
            if (postCardName != '') {
                $.post('/save', {purl: pictureurl,curl: canvasurl, name: postCardName})
                    .done(function (data) {
                        button.disabled = false;
                        alert('its ok');
                    });
            }
            else{
                button.disabled = false;
                alert('Enter Postcard Name!')
            }
        })
    });
    button.disabled = false;
});