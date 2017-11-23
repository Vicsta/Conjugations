$(function() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        $.getJSON( "Database.JSON", function( data ) {
            console.log(data);
        });

        /*
            JAVASCRIPT TO HANDLE TIMER, MEASURED IN CENTISECONDS
         */

        var timer = null;
        var time = 0;

        function setTime () {
            var min = (parseInt(time/ 10000) % 60);
            var sec = (parseInt(time/ 100) % 60);
            var mil = (time % 100);
            if(min < 10) {
                min = "0" + min;
            }
            if(sec < 10) {
                sec = "0" + sec;
            }
            if(mil < 10) {
                mil = "0" + mil;
            }
            document.getElementsByClassName("timeVal")[0].innerText = min + ":" + sec + ":" + mil;
            time++;
        }

        document.getElementsByClassName("start")[0].addEventListener('click', function() {
            timer = setInterval(function() { setTime(); }, 10);
        });

        document.getElementsByClassName("stop")[0].addEventListener('click', function() {
            clearInterval(timer);
        });

        /*
            END OF TIMER JAVASCRIPT
         */

    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
});