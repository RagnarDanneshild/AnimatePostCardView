/**
 * Created by HellAlien on 01.01.2016.
 */
/**
 * Created by HellAlien on 24.12.2015.
 */
var canvasWrapper, handleDragEnd, handleDragEnter, handleDragLeave, handleDragOver, handleDragStart, handleDrop, images, loadOneImage, noStandartDrop, upObject;

var selectedObject,canlen;
var c = document.getElementById('first');
var imgurl = new Image();
imgurl.src= $('#3Image').attr("src");
if(imgurl.width>800){
    var n = 800/imgurl.width;
    c.width = 800;
    c.height = imgurl.height*n;
}
else{
    c.width = imgurl.width;
}
if(imgurl.height>600){
    var nn = 600/imgurl.height;
    c.height = 600;
    c.width = imgurl.width*nn;
}else{
    c.height = imgurl.height;
}
var canvas = new fabric.Canvas('first');
fabric.Image.fromURL(imgurl.src,function(oimg){
    oimg.scaleX=canvas.width / imgurl.width;
    oimg.scaleY= canvas.height / imgurl.height;
    oimg.selectable = false;
    oimg.evented = false;
    canvas.add(oimg);
})


//textfield.set({left:300,top:100});

upObject = function() {
    selectedObject = canvas.getActiveObject();
  selectedObject.bringForward();
};

downObject = function() {
    selectedObject = canvas.getActiveObject();
  selectedObject.sendBackwards();
};

createTextField = function(){
    var textfield = new fabric.IText('New Text Field', {
    fontFamily: 'arial black',
    fontSize:30,
    left: 400,
    top: 300 ,
    });
    textfield.on('mouseup', function(options) {
    if(options.e.pageY<=canvas.wrapperEl.offsetTop||options.e.pageY>=(canvas.height+canvas.wrapperEl.offsetTop)||options.e.pageX<=canvas.wrapperEl.offsetLeft||options.e.pageX>=(canvas.width+canvas.wrapperEl.offsetLeft)) {
        canvas.remove(this);
    }
    });
    canvas.add(textfield);
};

function setStyle(object, styleName, value) {
    if (object.setSelectionStyles && object.isEditing) {
        var style = {};
        style[styleName] = value;
        object.setSelectionStyles(style);
    }
    else {
        object[styleName] = value;
    }
}

changeColor = function(val){
    var obj = canvas.getActiveObject();
    setStyle(obj,'fill',val);
    canvas.renderAll();
};
$('#setfontfamily').change(function() {
    var val = $("#setfontfamily option:selected").text();
    var obj = canvas.getActiveObject();
    setStyle(obj,'fontFamily',val);
    canvas.renderAll();
});
loadOneImage = function(img, newImage) {
  img = document.querySelector('#images img.img_dragging');
  newImage = new fabric.Image(img, {
    width: img.width,
    height: img.height,
    left: e.layerX,
    top: e.layerY
  });
    newImage.on('mouseup', function() {
    this.off('mousedown');
     if(options.e.pageY<=canvas.wrapperEl.offsetTop||options.e.pageY>=(canvas.height+canvas.wrapperEl.offsetTop)||options.e.pageX<=canvas.wrapperEl.offsetLeft||options.e.pageX>=(canvas.width+canvas.wrapperEl.offsetLeft)) {
        canvas.remove(this);
    }
    });
     if(newImage.width>=canvas.width-100 || newImage.height>=canvas.height-100)
            {
                var val = (canvas.width/2) / newImage.width;
                newImage.scale(val);
            };
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
          newImage = new fabric.Image(img, {
            width: img.width,
            height: img.height,
            left: e.layerX,
            top: e.layerY
          });
            newImage.on('mouseup', function() {
            this.off('mousedown');
             if(options.e.pageY<=canvas.wrapperEl.offsetTop||options.e.pageY>=(canvas.height+canvas.wrapperEl.offsetTop)||options.e.pageX<=canvas.wrapperEl.offsetLeft||options.e.pageX>=(canvas.width+canvas.wrapperEl.offsetLeft)) {
                 canvas.remove(this);
             }
            });
            if(newImage.width>=canvas.width-100 || newImage.height>=canvas.height-100)
            {
                var val = (canvas.width/2) / newImage.width;
                newImage.scale(val);
            };
          return canvas.add(newImage);
        };
        reader.readAsDataURL(f);
      }
      i++;
    }
  } else {
    loadOneImage(img, newImage);
    canvas.add(newImage);
  }
  updateLayers(canvas.getObjects());
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
