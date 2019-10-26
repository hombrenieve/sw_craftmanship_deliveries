function getTemplate(selector) {
    var myTemp = document.querySelector(selector);
    return myTemp.content.cloneNode(true);
}