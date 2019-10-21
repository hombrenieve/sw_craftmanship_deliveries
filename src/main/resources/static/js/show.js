$(function() {
    var id = getIdentifierFromURL();
    $.getJSON('deliveries/'+id, function (data) {
        showDelivery(data);
    });
});

function getIdentifierFromURL() {
    return window.location.search.slice(4);
}

function showDelivery(data) {
    $('#deliveryName p').append(data['name']);
    data['products'].forEach(function(item) {
        $('#deliveryProducts').append('<li>'+item['name']+'</li>');
    });
}