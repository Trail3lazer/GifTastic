var topics = [
    { "name": "Snowboarding" },
    { 'name': "Star Wars" },
    { 'name': "Coding" },
    { 'name': "Mountaineering" },
    { 'name': "Baby Animals" },
    { 'name': "Street Racing" },
    { 'name': "Financial Independance" }]
var lastIdx = function () { return (topics.length - 1); };

gifElementMaker = function (obj) {
    let div = $("<div>")
    $(div).attr("class", "float-left");

    let gif = $("<img>")
    $(gif).attr("src", obj["data-still"]);
    $(gif).attr("data-state", 'still');
    $(gif).attr("data-still", obj["data-still"]);
    $(gif).attr("data-gif", obj["data-gif"]);
    $(gif).attr("class", "gif");

    let ratingHolder = $('<div>');

    $(ratingHolder).text("rating: "+obj["data-rating"]);

    div.append(gif);
    div.append(ratingHolder);
    

    $("#gifHolder").append(div);

};

var buttonAppend = function (index) {
    let offset = 5;
    let topic = topics[index];
    var btn = $("<button>");
    btn.addClass("btn-success m-2 rounded");
    $(btn).attr("id", topic.name);
    $(btn).html(topic.name);
    $("#buttonHolder").append(btn);
    $(btn).click(function () {
        $("#gifHolder").empty();
        for (let gifI = 0; gifI < 10; gifI++) {
            gifElementMaker(topic["gif-" + gifI]);
        }


        let more = $('<button type="button" id="more" class="btn btn-warning btn-lg">Click for more!</button>');
        $(more).click(function () {
            let howMany = 5;
            offset = offset + 5;
            $.ajax({
                url: "https://api.giphy.com/v1/gifs/search?api_key=LK8gIICujEEO0FeSDdtIK1lyPySGR32D&q=" + topic.name + "&limit=" + howMany + "&offset=" + offset + "&rating=G&lang=en",
                data: "data",
                method: "GET",
                success: function (response) {

                    for (let j = 0; j < response.data.length; j++) {
                        topics[index]["gif-" + j] = {};
                        let gifObj = topics[index]["gif-" + j];
                        let active = response.data[j].images.fixed_width.url;
                        gifObj["data-gif"] = active;
                        let still = response.data[j].images.fixed_width_still.url;
                        gifObj["data-still"] = still;
                        let rating = response.data[j].rating;
                        gifObj["data-rating"] = rating;

                        gifElementMaker(gifObj);
                    }
                }
            });

        });
        $("#moreButtonHolder").html(more);
    });
};

var gifFinder = function (index) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=LK8gIICujEEO0FeSDdtIK1lyPySGR32D&q=" + topics[index].name + "&limit=10&offset=0&rating=G&lang=en",
        data: "data",
        method: "GET",
        success: function (response) {

            for (let j = 0; j < response.data.length; j++) {
                topics[index]["gif-" + j] = {};
                let gifObj = topics[index]["gif-" + j];
                let active = response.data[j].images.fixed_width.url;
                gifObj["data-gif"] = active;
                let still = response.data[j].images.fixed_width_still.url;
                gifObj["data-still"] = still;
                let rating = response.data[j].rating;
                gifObj["data-rating"] = rating;
                console.log(gifObj)
            }
            buttonAppend(index);
        }
    });

};

for (var topicsIndex = 0; topicsIndex < topics.length; topicsIndex++) {
    gifFinder(topicsIndex);
}

var newTopic = function () {
    let newTopic = { 'name': $('#searchBar').val() };
    topics.push(newTopic);
    gifFinder(lastIdx());
};

$('#gifHolder').on("click",".gif",function() {
    console.log(this)
    if ($(this).attr('data-state')==="active"){
        $(this).attr('src',$(this).attr('data-still'));
        $(this).attr('data-state',"still");
    } else {
        $(this).attr('src', $(this).attr('data-gif'));
        $(this).attr('data-state',"active");
    }
});

$("#searchButton").click(function () {
    newTopic(lastIdx());
});


