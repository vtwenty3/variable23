var callOnce = true;
var buttonone = document.getElementById("btn1");
var buttontwo = document.getElementById("btn2");
var buttononeclick = 0;
var buttontwoclick = 0;
var caseswtich = 0;
var points = 0;
var over = 0;
var show;

function monitorVideo() {
    if (vid.duration - vid.currentTime < 7)
        if (callOnce) {
            callOnce = false;
            main();
        }
}

function buttonshow() {
    var btnshow1 = document.getElementById("btn1");
    var btnshow2 = document.getElementById("btn2");
    var timeshow = document.getElementById("time");
    var counter = document.getElementById("countimer");
    btnshow1.style.display = "inline";
    btnshow2.style.display = "inline";
    timeshow.style.display = "inline";
    counter.style.display = "inline";

    buttonone.addEventListener("click", () => {
        buttononeclick = 1;
        btnshow1.style.display = "none";
        btnshow2.style.display = "none";
        timeshow.style.display = "none";
        counter.style.display = "none";
    });

    buttontwo.addEventListener("click", () => {
        buttontwoclick = 1;
        btnshow1.style.display = "none";
        btnshow2.style.display = "none";
        timeshow.style.display = "none";
        counter.style.display = "none";
    });
}

function countto(vid1, vid2) {
    var timeleft = 5;
    var downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);






            if (buttononeclick == 1) {
                if (caseswtich == 1) {
                    show = false;
                    buttononeclick = 0;
                } else {
                    document.getElementById('vid').src = vid1;
                    buttononeclick = 0;
                    show = true;
                }

            } else if (buttontwoclick == 1) {
                if (caseswtich == 2) {
                    show = false;
                    buttontwoclick = 0;
                }
                document.getElementById('vid').src = vid2;
                buttontwoclick = 0;
            } else {
                gameover();
            }

            callOnce = true;
            caseswtich++;


            document.getElementById("countimer").innerHTML = 6;
        } else {
            document.getElementById("countimer").innerHTML = timeleft;
        }
        timeleft -= 1;
    }, 1000);
}

function gameover() {
    document.getElementById("gameover").style.display = "flex";
    caseswtich = 0;
    over = 1;
    var button4 = document.getElementById("btn4");
    button4.style.display = "flex";
    var video = document.getElementById("vid");
    video.remove();
    document.getElementById("btn1").style.display = "none";
    document.getElementById("btn2").style.display = "none";
    document.getElementById("btn3").style.display = "none";
    document.getElementById("heading1").style.display = "none";
    document.getElementById("timercount").style.display = "none";
    callOnce = false;
    button4.addEventListener("click", () => {
        location.reload();
    });
}

if (over == 0) {
    setInterval(monitorVideo, 100);
}


function main() {
    if (caseswtich == 0) {
        buttonshow();
        countto('game/fullgas.mp4', 'game/cruise.mp4');

    } else if (caseswtich == 1) {
        buttonone.innerHTML = "Slowdown";
        buttontwo.innerHTML = "Faster";
        buttonshow();
        countto('game/slowdown.mp4', 'game/faster.mp4');

    } else if (caseswtich == 2) {
        buttonone.innerHTML = "Wait";
        buttontwo.innerHTML = "Overtake";
        if (show) {
            buttonshow();
            countto('game/wait-overtake-brakepoint.mp4', 'game/overtakecrash.mp4');
        } else {
            buttononeclick = 0;
            countto('game/wait-overtake-brakepoint.mp4', 'game/overtakecrash.mp4');
        }



    } else if (caseswtich == 3) {
        //7 sec remaining

        if (show) {


            var btnshow3 = document.getElementById("btn3");
            btnshow3.style.display = "inline";

            var timeleft = 5;
            var score = 0;
            var downloadTimer = setInterval(function () {

                btnshow3.addEventListener("click", () => {
                    if (timeleft >= 3) {
                        score = 1; //early
                        btnshow3.style.display = "none";

                    } else if (timeleft == 2 || timeleft == 1) {
                        score = 2; // perfect
                        btnshow3.style.display = "none";

                    }

                });
                if (timeleft <= 0) {
                    if (score == 1) {
                        document.getElementById('vid').src = 'game/brakepointEarly.mp4';
                        document.getElementById('vid').addEventListener('ended', myHandler, false);

                        function myHandler(e) {
                            gameover();
                        }
                    } else if (score == 2) {
                        document.getElementById('vid').src = 'game/brakepointPerfect.mp4';
                        document.getElementById('vid').addEventListener('ended', myHandler, false);

                        function myHandler(e) {
                            gameover();
                        }
                    } else {
                        var crash = document.getElementById('vid').src = 'game/brakepointcrash.mp4';
                        document.getElementById('vid').addEventListener('ended', myHandler, false);

                        function myHandler(e) {
                            gameover();
                        }
                    }

                    clearInterval(downloadTimer);

                    document.getElementById("countimer").innerHTML = 6;
                } else {
                    document.getElementById("countimer").innerHTML = timeleft;
                }
                timeleft -= 1;
            }, 1000);
        } else {
            buttononeclick = 0;
            buttontwoclick = 0;
            countto('game/wait-overtake-brakepoint.mp4', 'game/overtakecrash.mp4');
        }
    }
}