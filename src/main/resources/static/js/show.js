

function showShoppingList(id) {
    console.log("Will show list with id: "+id);
    //take data
    $.getJSON('deliveries/'+id, function (data) {
        //Remove welcome screen
        $('#welcome').empty();
        //Remove elements in section
        $('#listArea').empty();
        showList(data);
    });
}

function showList(data) {
    console.log("Ready to write data " + JSON.stringify(data));
    var myTemp = document.querySelector("#listShowFormTemplate");
    console.log("With template" + myTemp.outerHTML);
}