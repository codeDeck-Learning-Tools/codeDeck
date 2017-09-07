/*
    Functions for clearing localStorage when logging out
    ----------------------------------------------------------
*/
// clears out login data in local storage
$(".logOff").on("click", function () {
    localStorage.clear();
    document.location = 'index.html';
});