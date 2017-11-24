$(function() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        $.getJSON( "Database.JSON", function( data ) {
            console.log(data);
            for(var key in data["languages"]) {

                if(!data["languages"].hasOwnProperty(key)) continue;

                /*
                    READ FROM THE DATABASE TO CREATE LANGUAGE SECTIONS
                 */

                var language = document.createElement("div");
                var lang = document.createElement("div");
                var bound = document.createElement("div");
                var verb = document.createElement("div");
                var verbTitle = document.createElement("div");
                var pronoun = document.createElement("div");
                var pronounTitle = document.createElement("div");

                language.className = "language";
                lang.className = "lang text-center";
                bound.className = "bound";
                verb.className = "verb";
                verbTitle.className = "verbTitle text-center";
                pronoun.className = "pronoun";
                pronounTitle.className = "pronounTitle text-center";

                lang.innerText = key;
                verbTitle.innerText = "Verb";
                pronounTitle.innerText = "Pronoun";

                verb.appendChild(verbTitle);
                pronoun.appendChild(pronounTitle);
                bound.appendChild(verb);
                bound.appendChild(pronoun);
                language.appendChild(lang);
                language.appendChild(bound);

                document.getElementsByClassName("leftBar")[0].appendChild(language);

                /*
                    END OF DATABASE READ FOR LANGUAGE SECTIONS
                 */

            }
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
            computeScore();
            time = 0;
        });

        /*
            END OF TIMER JAVASCRIPT
         */

        function computeScore() {
            console.log("nothing yay");
        }

    } else {
        alert('The File APIs are not fully supported in this browser.');
    }
});