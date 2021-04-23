window.onscroll = function () {
    myFunction()
};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    navbar.classList.add("sticky")
}

function nextFunction() {

    var x = document.getElementById("headingBefore");
    x.textContent = "Remember:";
    x.classList.toggle("newStyle")
    var y = document.getElementById("textBefore");
    y.textContent = "The car is you, you are the car. Okay? Let's ride!";
    y.classList.toggle("newStyleText")
    var b = document.getElementById("nextButtonDiv");
    b.style.display = "none";
    var s = document.getElementById("startEngine");
    s.classList.toggle("after") = "block";
    window.location.href = "game.html"
}