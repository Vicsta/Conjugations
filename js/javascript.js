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
                var personType = document.createElement("div");

                language.className = "language";
                lang.className = "lang text-center";
                bound.className = "bound";
                verb.className = "verb";
                verbTitle.className = "verbTitle text-center";
                verbType.className = "verbType";

                pronoun.className = "pronoun";
                pronounTitle.className = "pronounTitle text-center";
                personType.className = "personType";

                lang.innerText = key;
                verbTitle.innerText = "Verb";
                pronounTitle.innerText = "Pronoun";

                for(var tenseN in data["languages"][key]["Tenses"]) {
                    var tense = document.createElement("div");
                    var tenseName = document.createElement("div");
                    var tenseBox = document.createElement("input");

                    tenseBox.className = "checkboxBox";
                    tenseBox.type = "checkbox";

                    tense.className = "tense";
                    tenseName.className = "tenseName";
                    tenseName.innerText = tenseN;
                    tense.appendChild(tenseBox);
                    tense.appendChild(tenseName);

                    for(var tenseTypeN in data["languages"][key]["Tenses"][tenseN]) {
                        var tenseType = document.createElement("div");
                        var tenseTypeName = document.createElement("div");
                        var tenseTypeBox = document.createElement("input");

                        tenseTypeBox.className = "checkboxBox";
                        tenseTypeBox.type = "checkbox";

                        tenseType.className = "tenseType";
                        tenseTypeName.className = "tenseTypeName";
                        tenseTypeName.innerText = tenseTypeN;
                        tenseType.appendChild(tenseTypeBox);
                        tenseType.appendChild(tenseTypeName);

                        setAllCheck(tenseTypeBox);

                        for(var i = 0; i < data["languages"][key]["Tenses"][tenseN][tenseTypeN].length; i++) {
                            var tenseTypeOptions = document.createElement("div");
                            var tenseTypeOptionsName = document.createElement("div");
                            var tenseTypeOptionsBox = document.createElement("input");

                            tenseTypeOptionsBox.className = "checkboxBox";
                            tenseTypeOptionsBox.type = "checkbox";

                            tenseTypeOptions.className = "tenseTypeOptions";
                            tenseTypeOptionsName.className = "tenseTypeOptionsName";
                            tenseTypeOptionsName.innerText =  data["languages"][key]["Tenses"][tenseN][tenseTypeN][i];
                            tenseTypeOptions.appendChild(tenseTypeOptionsBox);
                            tenseTypeOptions.appendChild(tenseTypeOptionsName);

                            tenseType.appendChild(tenseTypeOptions);
                        }

                        tense.appendChild(tenseType);
                        setHide(tenseName, tenseType);
                        setAllCheck(tenseBox);
                    }

                    verbType.appendChild(tense);
                }

                verb.appendChild(verbTitle);
                verb.appendChild(verbType);

                for(i = 0; i < data["languages"][key]["Pronouns"].length; i++) {
                    var checkboxRow = document.createElement("div");
                    var checkbox = document.createElement("input");
                    var checkboxText = document.createElement("div");

                    checkboxRow.className = "checkboxRow";
                    checkboxText.className = "checkboxText";

                    checkboxText.innerText = data["languages"][key]["Pronouns"][i];
                    checkbox.type = "checkbox";
                    checkbox.className = "checkboxBox";

                    checkboxRow.appendChild(checkbox);
                    checkboxRow.appendChild(checkboxText);

                    personType.appendChild(checkboxRow);
                }

                pronoun.appendChild(pronounTitle);
                pronoun.appendChild(personType);

                setHide(lang, bound);

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

        function setHide(button, content) {
            button.addEventListener('click', function() {
                console.log("clicked " + button.innerText);
               $(content).toggle(1000);
            });
        }

        function setAllCheck(checkbox) {
            checkbox.addEventListener('click', function() {
                console.log(checkbox);
                if(this.checked) {
                    change(this, true);
                } else {
                    change(this, false);
                }
            });
        }

        function change(box, to) {
            var cur = box.nextSibling.nextSibling;
            while(cur) {
                cur.childNodes[0].checked = to;
                change(cur.childNodes[0], to);
                cur = cur.nextSibling;
            }
        }

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