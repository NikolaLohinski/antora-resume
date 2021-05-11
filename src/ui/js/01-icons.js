document.addEventListener('DOMContentLoaded', function() {
    // var icons = document.querySelectorAll('*')
    var results = document.evaluate(
        "//*[contains(text(), '<icon-')]",
        document,
        null,
        XPathResult.ANY_TYPE,
        null
    );
    var changes = [];
    var load = {};
    while (true) {
        var element = results.iterateNext();
        if (!element) {
            break
        }
        if (element.innerText.match('<icon-fa')) {
            changes.push([element, element.innerHTML.replace(
                /&lt;icon-fa (.*)&gt;/g,
                '<i class="icon fa fa-$1"></i>'
            )])
        }
        if (element.innerText.match('<icon-ft')) {
            load.ft = true;
            changes.push([element, element.innerHTML.replace(
                /&lt;icon-ft (.*)&gt;/g,
                '<i class="icon" data-feather="$1"></i>'
            )])
        }
        if (element.innerText.match('<icon-flag')) {
            load.flag = true;
            changes.push([element, element.innerHTML.replace(
                /&lt;icon-flag (.*)&gt;/g,
                '<span class="icon flag-icon flag-icon-$1"></span>'
            )])
        }
    }
    if (load.ft) {
        var ft = document.createElement('script');
        document.head.appendChild(ft);
        ft.addEventListener('load', function() {
            feather.replace();
        });
        ft.setAttribute(
            "src",
            "https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"
        );
    }
    if (load.flag) {
        var flags = document.createElement('link');
        flags.setAttribute("rel", "stylesheet");
        flags.setAttribute(
            "href",
            "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"
        );
        document.head.appendChild(flags);
    }
    changes.forEach(function(change) {
        change[0].innerHTML = change[1];
    })
})