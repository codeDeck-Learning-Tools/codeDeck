/*
    Functions for clearing localStorage when logging out
    ----------------------------------------------------------
*/

$(".logOff").on("click", function () {
    localStorage.clear();
    document.location = 'index.html';
});