/**
 * Created by HellAlien on 10.01.2016.
 */

$(document).ready(function() {
    var can = new fabric.Canvas('viewCanvas');
    appendLoadingImg();
    loadAllToCanvas(can,false);
})