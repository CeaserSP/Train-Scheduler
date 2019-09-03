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
$("#add-train-btn").on("click", function(event) {
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
    // Clear

});