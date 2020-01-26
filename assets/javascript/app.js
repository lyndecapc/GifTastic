var sports = ["softball", "baseball", "basketball", "football", "hockey"];
var theme = new Audio("assets/SmashMouth-AllStar_64kb.mp3");
var musicPlaying = false;


$("#title-button").on("click", function () {
    if (musicPlaying == false) {
        theme.play();
        musicPlaying = true;
    } else {
        theme.pause();
        musicPlaying = false;
    }
});

function displayGifs() {
    $("#sports-view").empty();
    var sport = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CE9p6GaJt2Z1ezasQYs2DwZiO5vTOpu4&q=" +
        sport +
        "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var sportsDiv = $('<div class="col-lg-5"></div>');

            var p = $("<p>");
            p.text(results[i].rating);
            var p = $("<p>").text("Rating: " + results[i].rating);

            var img = $("<img>");
            img.attr("src", results[i].images.fixed_height_still.url);
            img.attr("data-still", results[i].images.fixed_height_still.url);
            img.attr("data-animate", results[i].images.fixed_height.url)
            img.attr("data-state", "still")
            img.addClass("gif");

            sportsDiv.prepend(p);
            sportsDiv.prepend(img);

            $("#sports-view").append(sportsDiv);
        }
    })
};

$("#sports-view").on("click", ".gif", function (event) {
    event.preventDefault();

    // gets the current state of the clicked gif 
    var state = $(this).attr("data-state");

    // according to the current state gifs toggle between animate and still 
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});


function renderButtons() {

    // Delete the content inside the buttons-view div prior to adding new sports
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty()
    // Loop through the array of sports, then generate buttons for each sport in the array
    for (var i = 0; i < sports.length; i++) {
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("sport-btn");
        // Added a data-attribute
        a.attr("data-name", sports[i]);
        // Provided the initial button text
        a.text(sports[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a)
    }
}


// This function handles events where the add sport button is clicked
$("#add-sport").on("click", function (event) {
    // Using a submit button instead of a regular button allows the user to hit "Enter" instead of clicking the button if desired
    event.preventDefault();

    //Code to grab the text the user types into the input field
    var sportAdd = $("#sport-input").val().trim();

    //Code to add the new sport into the sports array
    sports.push(sportAdd);
    console.log(sportAdd);

    // The renderButtons function is called, rendering the list of buttons
    renderButtons();
});

$(document).on("click", ".sport-btn", displayGifs);

renderButtons();