//empieza juego
window.onload = function() {
    abirirTrivial();
}

//llamada ajax
function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}
//quitas display de los resultados, seteas numero de preguntas, preguntas correctas y creas array 
function abirirTrivial() {
    document.getElementById("resultado").style.display = 'none';
    numQuestion = 0;
    correctAnswers = 0;
    results = {};


    var ajax = objetoAjax();

    ajax.open("GET", "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            results = respuesta.results;
            console.log(results);
            question(results);
        }
    }
    ajax.send();
}

function question(preguntas) {
    let divPreguntas = document.getElementById('preguntas');
    document.getElementById("preguntas").style.display = 'block';
    for (let i = 0; i < preguntas.length; i++) {
        if (numQuestion == i) {
            if (preguntas[i].type == "boolean") {
                divPreguntas.innerHTML = `<b>` + preguntas[i].question + `</b>
                <br><br>
                <button class="btn btn-primary btn-lg btn-block" id="opcioncorrecta" onclick="vercorrecto(true); return false;" value="` + preguntas[i].correct_answer + `">` + preguntas[i].correct_answer + `</button>
                <button class="btn btn-primary btn-lg btn-block" id="opcionincorrecta" onclick="vercorrecto(false); return false;" value="` + preguntas[i].incorrect_answers[0] + `">` + preguntas[i].incorrect_answers[0] + `</button>
                <button class="btn btn-dark btn-lg btn-block" id='nextQuestion'>Next question</button>`
            } else {
                divPreguntas.innerHTML = `<b>` + preguntas[i].question + `</b>
                <br><br>
                <button class="btn btn-primary btn-lg btn-block" id="opcioncorrecta" onclick="vercorrecto(true)"; return false;value="` + preguntas[i].correct_answer + `">` + preguntas[i].correct_answer + `</button>
                <button class="btn btn-primary btn-lg btn-block" id="opcionincorrecta1" onclick="vercorrecto(false)"; return false;" value="` + preguntas[i].incorrect_answers[0] + `">` + preguntas[i].incorrect_answers[0] + `</button>
                <button class="btn btn-primary btn-lg btn-block" id="opcionincorrecta2" onclick="vercorrecto(false); return false;" value="` + preguntas[i].incorrect_answers[1] + `">` + preguntas[i].incorrect_answers[1] + `</button>
                <button class="btn btn-primary btn-lg btn-block" id="opcionincorrecta3" onclick="vercorrecto(false); return false;" value="` + preguntas[i].incorrect_answers[2] + `">` + preguntas[i].incorrect_answers[2] + `</button>
                <button class="btn btn-dark btn-lg btn-block" id='nextQuestion'>Next question</button>`
            }
        }
        let nextquestion = document.getElementById('nextQuestion');
        nextquestion.onclick = function() {
            if (numQuestion == 10) {
                document.getElementById("resultado").style.display = 'block';
                divPreguntas.style.display = 'none';
                document.getElementById('respuestasCorrectas').innerText = "Preguntas acertadas correctamente: " + correctAnswers + " . Felicidades!!!";
                document.getElementById('jugarDeNuevo').onclick = function() {
                    abirirTrivial();
                }
            } else {
                question(preguntas);
            }
        }
    }

}

function vercorrecto(iscorrect) {
    if (iscorrect == true) {
        correctAnswers++
        document.getElementById("opcioncorrecta").className = "btn btn-success btn-lg btn-block";
        document.getElementById("opcioncorrecta").disabled = "disabled";
        if (document.getElementById("opcionincorrecta") != null) {
            document.getElementById("opcionincorrecta").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("opcionincorrecta").disabled = "disabled";
        } else {
            document.getElementById("opcionincorrecta1").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("opcionincorrecta2").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("opcionincorrecta3").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("opcionincorrecta1").disabled = "disabled";
            document.getElementById("opcionincorrecta2").disabled = "disabled";
            document.getElementById("opcionincorrecta3").disabled = "disabled";
        }
    } else {
        if (document.getElementById("opcionincorrecta") != null) {
            document.getElementById("opcionincorrecta").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("opcioncorrecta").className = "btn btn-success btn-lg btn-block disabled";
            document.getElementById("opcioncorrecta").disabled = "disabled";
            document.getElementById("opcionincorrecta").disabled = "disabled";
        } else {
            document.getElementById("opcionincorrecta1").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("opcionincorrecta2").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("opcionincorrecta3").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("opcionincorrecta1").disabled = "disabled";
            document.getElementById("opcionincorrecta2").disabled = "disabled";
            document.getElementById("opcionincorrecta3").disabled = "disabled";
            document.getElementById("opcioncorrecta").className = "btn btn-success btn-lg btn-block disabled";
            document.getElementById("opcioncorrecta").disabled = "disabled";
        }
    }
    numQuestion++;
}