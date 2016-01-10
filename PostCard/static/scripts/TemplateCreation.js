/**
 * Created by HellAlien on 24.12.2015.
 */
var canvasWrapper, handleDragEnd, handleDragEnter, handleDragLeave, handleDragOver, handleDragStart, handleDrop, images, loadOneImage, noStandartDrop, upObject;
var selectedObject;
var animationtype,isAnimation = false;
var canvas = new fabric.Canvas('first');

$(document).ready(function(){
    appendLoadingImg();
    loadAllToCanvas(canvas,true);
    canvas.controlsAboveOverlay = true;
    canvas.selection = false;
    canvasWrapper = document.getElementById('mainblock');
    canvasWrapper.addEventListener('dragenter', handleDragEnter, false);
    canvasWrapper.addEventListener('dragleave', handleDragLeave, false);
    canvasWrapper.addEventListener('dragover', handleDragOver, false);
    canvasWrapper.addEventListener('drop', handleDrop, false);

});
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
    left: canvas.width/2,
    top: canvas.height/2 ,
    animationtype: 'none'
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



stopAnimation = function(){
    isAnimation = false;
}


$('#setanimationtype').change(function() {
    animationtype = $("#setanimationtype option:selected").val();
    var obj = canvas.getActiveObject();
    startAnimation(canvas,obj,animationtype);
});

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
    top: e.layerY,
      animationtype: 'none'
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
          img.onload =function(){
            newImage = new fabric.Image(img, {
            width: img.width,
            height: img.height,
            left: e.layerX,
            top: e.layerY,
                animationtype: 'none'
              });
              newImage.on('mouseup', function(options) {
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
              canvas.add(newImage);
          }
        };
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



$('#savetest').click(function(){
    var button = document.getElementById("savetest");
    button.disabled = true;
    canvas.deactivateAll().renderAll();
    canvas.setBackgroundColor('white', canvas.renderAll.bind(canvas))
    savePicture(canvas,function(pictureurl) {
        saveCanvas(canvas,function(canvasurl) {
            var postCardName = document.getElementById('postCardName').value;
            if (postCardName != '') {
                 $.post('/save', {
                        purl: pictureurl,
                        curl: canvasurl,
                        name: postCardName,
                        tags: JSON.stringify($('#myTags').tagit('assignedTags'))
                    })
                    .done(function (data) {
                        button.disabled = false;
                        alert('its ok');
                    });
            }
            else {
                button.disabled = false;
                alert('Enter Postcard Name!')
            }
        });
    });
    button.disabled = false;
});
