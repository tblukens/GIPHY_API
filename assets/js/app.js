$(document).ready(function () {
    var movies = ["Hot Fuzz", "Shaun of the Dead", "The World's End", "28 Days Later...", "Step Brothers", "Walk Hard", "Monty Python and the Holy Grail", "Snatch"]
    var movieSelected = "";
    var offSet = 0;
    function displayMovie() {
        var api_key = "G6WAVyx4Fi4NDrggoHKgoOPCXZOsMDo9";
        if ($(this).data("name") === movieSelected) {
            offSet += 10;
        } else {
            offSet = 0;
        }
        movieSelected = $(this).data("name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key + "&q=" + movieSelected + " Movie" + "&limit=10&rating=PG&offset=" + offSet;

        console.log(offSet)

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var responseMovie = response.data;
            // console.log(responseMovie)
            responseMovie.forEach(element => {
                console.log(element)
                // var movieDiv = $("<div class='movie col'>");
                var imgURL = element.images.original_still.url;
                // var image = $("<img>").attr({
                //     "src": imgURL,
                //     "data-state": "still",
                //     "data-still": imgURL,
                //     "data-animate": element.images.original.url,
                // });
                // image.addClass("movieGif")
                // movieDiv.append(image);
                var rating = element.rating.toUpperCase();
                // var pOne = $("<p>").text("Rating: " + rating);
                // movieDiv.append(pOne);
                // $("#displayGif").prepend(movieDiv);

                var movieDiv = $('<div class="card mr-2 mt-2" style="width: 18rem;">');
                var image = $("<img>").attr({
                    "src": imgURL,
                    "data-state": "still",
                    "data-still": imgURL,
                    "data-animate": element.images.original.url,
                    "alt": "Card image cap",
                });
                image.addClass("card-img-top movieGif")
                // '<img class="card-img-top" src="'+imgURL+'" alt="Card image cap">'
                $(movieDiv).append(image);
                var cardBody = $('<div class="card-body">')
                $(movieDiv).append(cardBody);
                //             '<h5 class="card-title">Card title</h5>'
                var title = element.title.toUpperCase();
                var h5 = $('<h5 class="card-title">' + title + '</h5>');
                $(cardBody).append(h5)
                //             '<p class="card-text"></p>'
                var pOne = $('<p>').html("Rating: " + rating+"<p>Source: "+'<a href="' + element.source_post_url + '" target="_blank">'+element.source_post_url+'</a>')
                $(cardBody).append(pOne);
                // '<a href="#" class="btn btn-primary">Download</a>'
                var downloadButton = $('<a href="' + element.source_post_url + '" target="_blank" class="btn btn-primary"><i class="fas fa-arrow-right"></i> View Source <i class="fas fa-arrow-left"></i></a>');
                $(cardBody).append(downloadButton);
                //         '</div>'
                // '</div>'
                $("#displayGif").prepend(movieDiv);
            });

        })
    };
    function displayMovieInfo() {
        var api_key = "f12433da";
        // movieSelected = $(this).data("name");
        var queryURL = "http://www.omdbapi.com/?apikey=" + api_key + "&t=" + movieSelected;

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var responseMovie = response;
            console.log(response)

            $("#movieInfo").html("<h1>" + response.Title + " (" + response.Year + ")" + "<h3>Rated: " + response.Rated + "<h5>" + response.Plot)


        })
    }

    function renderButtons() {
        $("#displayButtons").empty();

        for (var i = 0; i < movies.length; i++) {

            var a = $("<button>");
            a.addClass("moviesButton btn btn-primary");
            a.attr("data-name", movies[i]);
            a.text(movies[i]);
            $("#displayButtons").append(a);
            console.log(movies[i])
        };
    };

    $("#addAMovieClick").on("click", function (event) {
        event.preventDefault();
        var addMovie = $("#movie-input").val().trim();
        console.log(addMovie)
        movies.push(addMovie);
        $("#movie-input").val("");
        renderButtons();
    });

    $(document).on("click", ".moviesButton", displayMovie);
    $(document).on("click", ".moviesButton", displayMovieInfo);
    $(document).on("click", ".movieGif", function () {

        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    renderButtons();
});