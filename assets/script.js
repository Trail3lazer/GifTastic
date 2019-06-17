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
        var btn = $("<button>");
        btn.addClass("btn-info m-2 rounded");
        $(btn).attr("id", index);
        let prop;
        let obj = topics[index]
        for (prop in obj) {
            $(btn).attr(prop, $(obj).prop(prop));
        }
        $(btn).html(obj.name);
        $("#buttonHolder").append(btn);
        $(btn).click(function () {
            console.log($(this).attr("data"));
        });
};

var gifFinder = function (index) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=LK8gIICujEEO0FeSDdtIK1lyPySGR32D&q=" + topics[index].name + "&limit=5&offset=0&rating=G&lang=en",
        data: "data",
        method: "GET",
        success: function (response) {
            for (let j = 0; j < response.data.length; j++) {
                let gifObj = response.data[j].images.downsized_large.url;
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


