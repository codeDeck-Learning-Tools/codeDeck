/**
 * Contact page that will save to firebase
 * */
$('#submit').on('click', function submitCB() {
    var database = firebase.database();
    database.refContacts = database.ref('contacts');

    /**
     * Prevent the page refresh
     * */
    event.preventDefault();

    var contactName = $('#first_name').val().trim();
    var contactEmail = $('#emailForm').val().trim();
    var contactMessage = $('#comments').val().trim();

    database.ref('contacts').push({
        'contactName': contactName,
        'contactEmail': contactEmail,
        'contactMessage': contactMessage,
        'dateAdded': firebase.database.ServerValue.TIMESTAMP
    });
    /**
     * Modal that will notify user with pnotify
     * */

    if (!contactName || !contactEmail || !contactMessage) {
        PNotify.prototype.options.styling = "bootstrap3";
        new PNotify({
            title: "Contact Page Error",
            text: "Please complete all required fields",
            type: "error"
        });
    } else {
        $('#first_name').val('');
        $('#emailForm').val('');
        $('#comments').val('');
        $('#contactModal').modal('toggle');
        PNotify.prototype.options.styling = "bootstrap3";
        new PNotify({
            title: 'Success!',
            text: 'Thank you for contacting us!',
            type: 'success'
        });
    }
});