function addElement() {
    var text = document.getElementById('element');
    if(text.value) {
        document.getElementById('elementList').innerHTML += '<li>'+text.value+'</li>';
        text.value = '';
    }
}