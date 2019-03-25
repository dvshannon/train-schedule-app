// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxk7QNe3rQxINRv4ySsLVC3dNIupCkwv8",
    authDomain: "train-schedule-app-48c30.firebaseapp.com",
    databaseURL: "https://train-schedule-app-48c30.firebaseio.com",
    projectId: "train-schedule-app-48c30",
    storageBucket: "",
    messagingSenderId: "243409879060"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// initial values
var train = '';
var destination = '';
var frequency = 0;
var firstArrival = 0;
var nextArrival = 0;
var minsAway = 0;

// capture train enter info
$('#add-train-info').on('click', function(event){
    event.preventDefault();

    // grabs input
    train = $('#enter-train').val().trim();
    destination = $('#enter-destination').val().trim();
    firstArrival = $('#enter-train-time').val().trim();
    frequency = $('#enter-frequency').val().trim();

    // code that handles push
    database.ref().push({
        train: train,
        destination: destination,
        firstArrival: firstArrival,
        frequency: frequency
    });
});

// Firebase watcher .on("child_added")
database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // console.log users last input
    console.log(sv.train);
    console.log(sv.destination);
    console.log(sv.firstArrival);
    console.log(sv.frequency);


    // Change the HTML to reflect
    $("#train-name").append(sv.train);
    $("#destination-name").append(sv.destination);
    $("#next-arrival").append(sv.firstArrival);
    $("#frequency").append(sv.frequency);
// Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});