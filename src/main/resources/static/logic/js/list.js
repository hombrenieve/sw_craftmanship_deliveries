$(function () {
    $.getJSON('deliveries', function (data) {
        $.each(data, function (key, value) {
            $("#deliveries-list").append('<li><a href="/show.html?id='+value['id']+'">'+value['name']+'</a></li>');
        });
    });
});