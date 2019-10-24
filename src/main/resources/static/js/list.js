$(function () {
    $.getJSON('deliveries', function (data) {
        $.each(data, function (key, value) {
            $("#shoppingLists").append('<li class="sidebar-list-item"><a href="#" class="sidebar-link text-muted" '
                +'onclick="showShoppingList('+ value['id'] + ')"'
                +'><i class="o-survey-1 mr-3 text-gray"></i><span>'
                + value['name']
                +'</span></a></li>');
        });
    });
});
