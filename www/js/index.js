var app = {
   
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    
    receivedEvent: function(id) {
        document.getElementById("TomarFoto").onclick=TomarFoto;
        console.log('Received Event: ' + id);
        document.getElementById("TomarVideo").addEventListener("click", TomarVideo);
        console.log('Received Event: ' + id);
    }
};

function TomarFoto(){
    navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE,
        encodingType: Camera.EncodingType.JPEG,
        cameraDirection: Camera.Direction.FRONT,
        saveToPhotoAlbum: true
        }
    );

    function onSuccess(url_img) {
        document.getElementById("fotos").innerHTML+=
        `
        <div class="foto">
            <img src="${url_img}" controls>
            </img>
        </div>
    `
    }

    function onFail(message) {
        alert('Error : ' + message);
    }

}

function TomarVideo() {
    var options = {
       limit: 1,
       duration: 20,
       destinationType: Camera.DestinationType.FILE_URI,
    sourceType: Camera.PictureSourceType.CAMERA,
    };
    navigator.device.capture.captureVideo(onSuccess, onError, options);

  
    function onSuccess(mediaFiles){
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
           path = mediaFiles[i].fullPath;
           console.log(mediaFiles);
        }
        document.getElementById("videos").innerHTML+=

        `
            <div class="video-container">
                <video src="${path}"  class="video-item" controls />
            </div>
        `
        
    }
 
    function onError(error) {
       navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    }
 }

app.initialize();