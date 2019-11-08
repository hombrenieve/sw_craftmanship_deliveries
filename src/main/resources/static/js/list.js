$(function () {
    $.getJSON('shoppinglist', function (data) {
        $.each(data, function (key, value) {
            var sideBarItem = getTemplate('#sidebarShoppingList');
            sideBarItem.querySelector('a').setAttribute('onclick', 'showShoppingList('+value.id+')');
            sideBarItem.querySelector('span').innerHTML = value.name;
            $("#shoppingLists").append(sideBarItem);
        });
    });
});
