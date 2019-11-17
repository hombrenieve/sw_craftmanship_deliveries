function emptyWindow() {
    //Remove welcome screen
    $('#welcome').empty();
    //Remove elements in section
    $('#listArea').empty();
}

function getTemplate(selector) {
    let myTemp = document.querySelector(selector);
    return myTemp.content.cloneNode(true);
}