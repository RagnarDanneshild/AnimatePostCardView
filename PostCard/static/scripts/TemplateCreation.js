/**
 * Created by HellAlien on 24.12.2015.
 */



var canvas = this.__canvas = new fabric.Canvas('first');
var img = new Image();
img.src= 'http://content.foto.mail.ru/mail/979ru/35/s-47.png';
img.onload = function(){
   canvas.setOverlayImage(img.src, canvas.renderAll.bind(canvas), {
       scaleX: canvas.width / img.width,
       scaleY: canvas.height / img.height
        });
};

var textfield1 = new fabric.IText('Text1', {
  fontFamily: 'arial black',
  left: 100,
  top: 100 ,
});
var textfield2 = new fabric.IText('Text2', {
  fontFamily: 'arial black',
  left: 100,
  top: 200 ,
});
canvas.add(textfield1);
canvas.add(textfield2);

//textfield.set({left:300,top:100});
