$(function() {
    $("#deliveryName").on("change paste keyup select", function () {
        console.log('Key pressed');
        if($(this).val().length > 0) {
            $('#send').attr('disabled', false);
        } else {
            $('#send').attr('disabled', true);
        }
    });
});

function addItem() {
    $('#itemList').append('<li><input class="list-item"/></li>');
}

function send() {
    var products = [];
    $('.list-item').each(function() {
        if($(this).val()) {
            products.push($(this).val());
        }
    });
    var delivery = { 'name': $('#deliveryName').val(),
        "products": products
    };
    console.log("To send: "+JSON.stringify(delivery));

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/deliveries",
        data: JSON.stringify(delivery),
        dataType: 'json',
        timeout: 600000,
        success: function () {
            console.log("DONE");
            location.href = 'list.html';
        },
        error: function (e) {
            console.log("ERROR: ", e);
            display(e);
        }
    });
}