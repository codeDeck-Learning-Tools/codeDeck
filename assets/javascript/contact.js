/**
     * Contact page that will save to firebase
     * */

var database = firebase.database();
database.refContacts = database.ref( 'contacts' );

var contactName = '';
var contactEmail = '';
var contactMessage = '';

$( '#submit' ).on( 'click', function submitCB () {
    /**
     * Prevent the page to refresh
     * */
    event.preventDefault();

    contactName = $( '#first_name' ).val().trim();
    contactEmail = $( '#emailForm' ).val().trim();
    contactMessage = $( '#comments' ).val().trim();

    database.ref().push( {
        'contactName': contactName,
        'contactEmail': contactEmail,
        'contactMessage': contactMessage,
        'dateAdded': firebase.database.ServerValue.TIMESTAMP
    } );

    $( '#first_name' ).val( '' );
    $( '#emailForm' ).val( '' );
    $( '#comments' ).val( '' );
    $(function () {
        $('#modal').modal('toggle');
    
    PNotify.prototype.options.styling = "bootstrap3";
    new PNotify({
        title: 'Success!',
        text: 'Thank you for contacting us!',
        type: 'success'
    })
});
} );


/**
     * Sign-in page that will save to firebase
     * */

    // var database = firebase.database();
    // database.reflog = database.ref( 'signOn' );
    
    // var firstName = '';
    // var lastName = '';
    // var email = '';
    
    // $( '#submit-info' ).on( 'click', function submitCBInfo () {
    //     /**
    //      * Prevent the page to refresh
    //      * */
    //     event.preventDefault();
    
    //     firstName = $( '#first-name' ).val().trim();
    //     lastName = $( '#last-name' ).val().trim();
    //     email = $( '#email' ).val().trim();
    
    //     database.ref().push( {
    //         'firstName': firstName,
    //         'lastName': lastName,
    //         'email': email,
    //         'dateAdded': firebase.database.ServerValue.TIMESTAMP
    //     } );
    //     console.log(firstName);
    //     console.log(lastName);
    //     console.log(email);
    
    //     $( '#first-name' ).val( '' );
    //     $( '#last-name' ).val( '' );
    //     $( '#email' ).val( '' );
    // });
   