$(".logOut").on("click", function (){
    var alertMessage = localStorage.getItem('alert');
    localStorage.removeItem('alert');
    document.location = 'index.html';
})