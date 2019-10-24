function getSnippet(name, action) {
    var xhr= new XMLHttpRequest();
    xhr.open('GET', 'snippets'+name+'.html', true);
    xhr.onreadystatechange= function() {
        if (this.readyState!==4) return;
        if (this.status!==200) return;
        var doc = new DOMParser().parseFromString(this.responseText, "text/xml");
        action(doc);
    };
    xhr.send();
}