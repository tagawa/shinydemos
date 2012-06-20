(function digitalclock(){   
  var date = new Date(),
      clock = document.getElementById('clock'),
      time = document.createTextNode(date.toTimeString().substring(0, 8));

  clock.replaceChild(time, clock.firstChild);
  setTimeout(digitalclock, 1000);
})();

var video = document.getElementsByTagName('video')[0], 
    para = document.getElementsByTagName('p')[0];
    
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

function successCallback( stream ) {
  video.src = window.URL.createObjectURL( stream ) || stream;
}

function errorCallback( error ) {
  para.textContent = 
  "An error occurred: [CODE " + error.code + "]";
}

if (navigator.getUserMedia) {
  navigator.getUserMedia({video: true}, successCallback, errorCallback);
}