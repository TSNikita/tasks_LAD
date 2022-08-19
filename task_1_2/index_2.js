//Задача 2
// https://jsbin.com/deyoteb/edit?html,css,js,output - исправить код таким образом,
// чтобы при фокусе у инпутов добавлялась красная рамка.
// Обработка событий должна происходить на formElement.


var formElement = document.getElementById('formElement');

formElement.addEventListener("focus", function(event) {
    event.target.classList.add('focused');
}, true);


formElement.addEventListener("blur", function(event) {
    event.target.classList.remove('focused');
}, true);

