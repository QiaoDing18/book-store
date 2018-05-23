
(function () {
    $('.nav-tabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    }).on('shown.bs.tab',function (e) {
        this.previousSibling.checked = true;
    });
})();