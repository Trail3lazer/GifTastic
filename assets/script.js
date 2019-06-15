var topics = [
    { name: "Snowboarding" },
    {
        name: "Star Wars",
    }, { name: "Coding" }, { name: "Mountaineering" }, { name: "Baby Animals" }, { name: "Street Racing" }, { name: "Financial Independance" }]


for (var i = 0; i < topics.length; i++) {
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?api_key=LK8gIICujEEO0FeSDdtIK1lyPySGR32D&q=" + topics[i].name + "&limit=5&offset=0&rating=G&lang=en",
        data: "data",
        method: "GET",
        success: function (response) {
            console.log(response);
            for (let j = 0; j < response.data.length; j++) {
                const gifObj = response.data[j].images.downsized_large.url;
                // topics[i] === undefined?????? WHYYYYY
                topics[i]["data-gifUrl" + j] = gifObj;

            }
        }
    });


}

var buttonAppend = function (i) {
    var btn = $("<button>");
    btn.addClass("btn-info m-2 rounded");
    btn.attr("id", i.name);
    for (var prop in this) {
        if (prop.includes("https")) {
            btn.attr("data-gifUrl", "PLACEHOLDER");
        }
    }
    btn.text(i.name);
    $("#buttonHolder").append(btn);
    $("#" + topics[i].name).click(function () {
        console.log(this.attr("id"));
    });
}

$("#searchButton").click(function () {
    buttonAppend(topics[-1]);
});




