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
var train;
var destination;
var enterFrequency;
var firstArrival;
var nextArrival = '';
var minsAway = '';

// capture train enter info
$('#add-train-info').on('click', function(event){
    event.preventDefault();

    // grabs input
    train = $('#enter-train').val().trim();
    destination = $('#enter-destination').val().trim();
    firstArrival = $('#enter-train-time').val().trim();
    enterFrequency = $('#enter-frequency').val().trim();

    // code that handles push
    database.ref().push({
        train: train,
        destination: destination,
        firstArrival: firstArrival,
        frequency: enterFrequency,
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


    untilNextTrain();

    var tRow = $('<tr class="table-row">');
    var tName = $('<p>').append(sv.train);
    var tDest = $('<td>').append(sv.destination);
   

    tRow.append(tName, tDest, nextArrival, minsAway);
      // Append the table row to the table body
      $('tBody').append(tRow);
      function untilNextTrain() {
        var trainFrequency = sv.frequency;

        // first train
        var initialTrainTime =  moment(sv.firstArrival, 'HH:mm').subtract(1, "years");
        console.log('first train: ' + initialTrainTime);

        // difference between times
        var diffTime = moment().diff(moment(initialTrainTime), "minutes");
        console.log('diff in time: ' + diffTime);

        var remainder = diffTime % trainFrequency;
        console.log(remainder);

        // next arrival
        var timeUntilNextArrival = trainFrequency - remainder;
        minsAway = timeUntilNextArrival;
        console.log('mins away: ' + minsAway);
        // -------------------------------------------

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // next train
        var nextTrain = moment().add(timeUntilNextArrival, "minutes");
        nextArrival = moment(nextTrain).format("hh:mm");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        nextArrival = $('<td>').append(sv.frequency);
        nextTrain = $('<td>').append(sv.firstArrival);
        
        minsAway = $('<td>').append(minsAway);
      };
// Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});