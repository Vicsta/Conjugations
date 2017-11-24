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
                var verbType = document.createElement("div");
                var pronoun = document.createElement("div");
                var pronounTitle = document.createElement("div");

                language.className = "language";
                lang.className = "lang text-center";
                bound.className = "bound";
                verb.className = "verb";
                verbTitle.className = "verbTitle text-center";
                verbType.className = "verbType";
                pronoun.className = "pronoun";
                pronounTitle.className = "pronounTitle text-center";

                lang.innerText = key;
                verbTitle.innerText = "Verb";
                pronounTitle.innerText = "Pronoun";

                for(var i = 0; i < data["languages"][key]["Tenses"].length; i++) {
                    var verbRow = document.createElement("div");
                    var verbRowName = document.createElement("div");

                    var checkboxRow = document.createElement("div");
                    var checkboxBox = document.createElement("div");
                    var checkbox = document.createElement("input");
                    var checkboxText = document.createElement("div");

                    verbRowName.innerText = data["languages"][key]["Tenses"][i];

                    verbRow.className = "verbRow";
                    verbRowName.className = "verbRowName";
                    checkboxRow.className = "checkboxRow";
                    checkboxBox.className = "checkboxBox";
                    checkboxText.className = "checkboxText";

                    checkboxText.innerText = "Regular Verbs";
                    checkbox.type = "checkbox";

                    checkboxBox.appendChild(checkbox);

                    checkboxRow.appendChild(checkboxBox);
                    checkboxBox.appendChild(checkboxText);

                    verbRow.appendChild(verbRowName);

                    verbRow.appendChild(checkboxRow);

                    checkboxRow = document.createElement("div");
                    checkboxBox = document.createElement("div");
                    checkbox = document.createElement("input");
                    checkboxText = document.createElement("div");

                    verbRow.className = "verbRow";
                    verbRowName.className = "verbRowName";
                    checkboxRow.className = "checkboxRow";
                    checkboxBox.className = "checkboxBox";
                    checkboxText.className = "checkboxText";

                    checkboxText.innerText = "Irregular Verbs";
                    checkbox.type = "checkbox";

                    checkboxBox.appendChild(checkbox);

                    checkboxRow.appendChild(checkboxBox);
                    checkboxBox.appendChild(checkboxText);

                    verbRow.appendChild(checkboxRow);

                    verbType.appendChild(verbRow);
                }

                verb.appendChild(verbTitle);
                verb.appendChild(verbType);

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