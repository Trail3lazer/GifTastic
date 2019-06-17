var topics = [
    { "name": "Snowboarding" },
    { 'name': "Star Wars" },
    { 'name': "Coding" },
    { 'name': "Mountaineering" },
    { 'name': "Baby Animals" },
    { 'name': "Street Racing" },
    { 'name': "Financial Independance" }]
var lastIdx = function () { return (topics.length - 1); };


var buttonAppend = function (index) {
    let offset = 5
    var btn = $("<button>");
    btn.addClass("btn-success m-2 rounded");
    $(btn).attr("id", "topic");
    let prop;
    let obj = topics[index]
    for (prop in obj) {
        $(btn).attr(prop, $(obj).prop(prop));
    }
    $(btn).html(obj.name);
    $("#buttonHolder").append(btn);
    $(btn).click(function () {
        $("#gifHolder").empty()
        for (let i = 0; i < 5; i++) {
            let gif = $("<img>")
            $(gif).attr("src", $(this).attr("data-gifUrl-" + i));
            $("#gifHolder").append(gif);
        }
        let more = $('<button type="button" id="more" class="btn btn-warning btn-lg">Click for more!</button>');
        $(more).click(function () {
            let howMany = 5;
            offset = offset + 5;
            $.ajax({
                url: "https://api.giphy.com/v1/gifs/search?api_key=LK8gIICujEEO0FeSDdtIK1lyPySGR32D&q=" + obj.name + "&limit=" + howMany + "&offset=" + offset + "&rating=G&lang=en",
                data: "data",
                method: "GET",
                success: function (response) {
                    for (let j = 0; j < response.data.length; j++) {
                        let gif = $("<img>");
                        $(gif).attr("src", response.data[j].images.fixed_width.url);
                        $("#gifHolder").append(gif);
                    }
                }
            });

        });
        $("#moreButtonHolder").html(more);
    });
};

var gifFinder = function (index) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=LK8gIICujEEO0FeSDdtIK1lyPySGR32D&q=" + topics[index].name + "&limit=5&offset=0&rating=G&lang=en",
        data: "data",
        method: "GET",
        success: function (response) {
            for (let j = 0; j < response.data.length; j++) {
                let gifObj = response.data[j].images.fixed_width.url;
                topics[index]["data-gifUrl-" + j] = gifObj;
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

$("#searchButton").click(function () {
    newTopic(lastIdx());
});


