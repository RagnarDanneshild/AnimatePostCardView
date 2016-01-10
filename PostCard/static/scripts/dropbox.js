var client = new Dropbox.Client({ token: "DhnzHH1PXSAAAAAAAAAACY1W_4u2IOlooHXm4T4YJYStiE2m0fVSdA9BRCp0hf4y" });
function _base64ToArrayBuffer(base64) {
    base64 = base64.split('data:image/png;base64,').join('');
    var binary_string =  window.atob(base64)

    var len = binary_string.length,
        bytes = new Uint8Array( len ),
        i;

    for (i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
};

function savePicture (canvas,callback) {
    //Get data from canvas
    var imageSringData = canvas.toDataURL('image/png', 0.5);
    //Convert it to an arraybuffer
    var imageData = _base64ToArrayBuffer(imageSringData);

    client.writeFile('/Public/'+(new Date).getTime()+'.png', imageData, function(error, stat) {
    if (error) {
        console.log('Error: ' + error);
    } else {
       callback(stat.path)
    }
})};
function _base64ToArrayBuffer1(base64) {
    var binary_string =  base64,
        len = binary_string.length,
        bytes = new Uint8Array( len ),
        i;

    for (i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
};
function saveCanvas (canvas,callback) {
    //Get data from canvas
    var jsn = canvas.toJSON(['selectable', 'evented','animationtype']);
    var canvasData = JSON.stringify(jsn);
    var jsondata = _base64ToArrayBuffer1(canvasData);
    client.writeFile('/Public/'+(new Date).getTime()+'.txt', jsondata, function(error, stat) {
        if (error) {
            console.log('Error: ' + error);
        } else {
            callback(stat.path)
        }
    });
};
function getImage(containerid,item,viewtype,callback) {
    $(containerid).append(getView(item.pk,item.fields.name,item.fields.user,item.fields.rating,viewtype));
    client.readFile(item.fields.picture_url, {blob: true}, function (error, data) {
        if (error) {
            alert(error);  // Something went wrong.
        }
        callback(window.URL.createObjectURL(data));
    });
}

function getImage1(path,callback){
    client.readFile(path, { binary : true }, function(error, data) {
        callback(data);
    });

}