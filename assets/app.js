// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB5O2scqj31yjfi1J0MArgjEg4nD9PP1Sc",
    authDomain: "any-name-170a7.firebaseapp.com",
    databaseURL: "https://any-name-170a7.firebaseio.com",
    projectId: "any-name-170a7",
    storageBucket: "",
    messagingSenderId: "930142724357",
    appId: "1:930142724357:web:95a4c163ed2dc252"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Click event
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    // Input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = moment($("#train-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFrequency = $("#frequency-input").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
    }

    // push to the database
    database.ref().push(newTrain);
    console.log(newTrain);

    // Clear values
    $("train-name-input").val("");
    $("destination-input").val("");
    $("train-input").val("");
    $("frequency-input").val("");
});

// event listener that adds train to database and html
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store childSnapshots into variables
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    // train time converstion
    var timeConverted = moment(trainTime, "HH:mm");
    console.log(timeConverted);

    // Current time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between times
    var difTime = moment().diff(moment(timeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + difTime);

    // Time apart (remainder)
    var timeApart = difTime % trainFrequency;
    console.log(timeApart);

    // Minute Until Train
    var tMinusTrain = trainFrequency - timeApart;
    console.log("MINUTES TILL TRAIN: " + tMinusTrain);

    // Next Train
    var nextTrain = moment().add(tMinusTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Append to table
    $("#train-table>tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + nextTrain + "</td><td>" + trainFrequency + "</td><td>" + tMinusTrain + "</td><td>");
});