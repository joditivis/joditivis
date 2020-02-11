// mobile navbar menu 
$(document).ready(function () {
    $('.sidenav').sidenav();

    // aos slide in affect initialization
    AOS.init();

    // Slick Carousel
    $('.gallery-responsive').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

// Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAYXmH7aoGl6CdScyeVI_kFYqDCAPq9K38",
    authDomain: "personal-website-77c91.firebaseapp.com",
    databaseURL: "https://personal-website-77c91.firebaseio.com",
    projectId: "personal-website-77c91",
    storageBucket: "personal-website-77c91.appspot.com",
    messagingSenderId: "10657248055",
    appId: "1:10657248055:web:778873faf83bd0054b20b2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// variable to reference the database
var database = firebase.database();

// initial values
var name = "";
var email = "";
var message = "";

// captures button click for submit button
$("#submit-contact").on("click", function (event) {
    event.preventDefault();

    // grabs user input
    name = $("#full-name").val().trim();
    email = $("#email").val().trim();
    message = $("#contactMessage").val();

    // pushing information to database
    database.ref().push({
        name: name,
        email: email,
        message: message,
    });

    // if user doesn't fill in all fields display message
  if (!name) {
    $("#first-error-message").text("Name is required");
    return;
  } else if (!email) {
    $("#first-error-message").text("Email is required");
    return;
  } else if (!message) {
    $("#first-error-message").text("Please fill in the message box with what you would like to be contacted about");
    return;
  } else {
    $("#first-error-message").text("");
  }

    // empties form after user clicks submit
    $("#full-name").val("");
    $("#email").val("");
    $("#contactMessage").val("");

    var thankYouMsg = $("#thank-you-msg");

    thankYouMsg.append("Thanks! I'll be in touch!");
});

database.ref().on("child_added", function (snapshot) {

    console.log(snapshot.val());

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});