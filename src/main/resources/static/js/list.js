$(function () {
    $.getJSON('deliveries', function (data) {
        $.each(data, function (key, value) {
            $("#deliveries-list").append('<li><a href="/deliveries/'+value['id']+'">'+value['name']+'</a></li>');
        });
    });
});