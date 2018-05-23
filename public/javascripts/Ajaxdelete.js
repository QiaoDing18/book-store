
jQuery.qdAlert = function (content,title) {
    var default_val = {
        content:'default content',
        title:'提示'
    };
    var alert = $('#qdAlert');
    if(alert.length==0) {
        var modal = '<div id="qdAlert" class="modal fade in" tabindex="-1" role="dialog">' +
            '<div class="modal-dialog modal-sm "> ' +
            '<div class="modal-content vertical-grabber">' +
            '<div class="modal-header">' +
            '<button type="button" ' +
            'class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h5 class="modal-title text-center">' + (title ? title : default_val.title) + '</h5>' +
            '</div>' +
            '<div class="modal-body"><p class="text-center text-info">' +
            (content ? content : default_val.content) +
            '</p></div>' +
            '<div class="modal-footer">' +
            '<button data-dismiss="modal" aria-label="Close" type="button" class="btn btn-primary btn-sm">' +
            '确认</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('body').append(modal);
        $('#qdAlert').modal({backdrop: 'static'});
    }else {
        alert.find('.modal-title').html((title ? title : default_val.title))
        alert.find('p').html((content ? content : default_val.content));
        alert.modal({backdrop: 'static'});
    }
    $(window).resize();
};

jQuery.qdConfirm = function (content,onok,oncancel,title) {
    var default_val = {
        content:'default content',
        title:'提示'
    };
    var confirm = $('#qdConfirm');
    if(confirm.length==0) {
        var modal = '<div id="qdConfirm" class="modal fade in" tabindex="-1" role="dialog">' +
            '<div class="modal-dialog modal-sm "> ' +
            '<div class="modal-content vertical-grabber">' +
            '<div class="modal-header">' +
            '<button type="button"' +
            'role="qd-cancel" ' +
            'class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '<h5 class="modal-title text-center">' + (title ? title : default_val.title) + '</h5>' +
            '</div>' +
            '<div class="modal-body"><p class="text-center text-info">' +
            (content ? content : default_val.content) +
            '</p></div>' +
            '<div class="modal-footer">' +
            '<button role="qd-ok" data-dismiss="modal" aria-label="Close" type="button" class="btn btn-success btn-sm">' +
            '确认</button>' +
            '<button role="qd-cancel" data-dismiss="modal" aria-label="Close" type="button" class="btn btn-danger btn-sm">' +
            '取消</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('body').append(modal);
        $('#qdConfirm').modal({backdrop:'static'})
    }else{
        confirm.find('.modal-title').html((title ? title : default_val.title))
        confirm.find('p').html((content ? content : default_val.content));
        confirm.modal({backdrop: 'static'});
    }
    $('[role=qd-cancel]').click(function(){
        $(this).off('click');
        if(oncancel)
            oncancel();
    });
    $('[role=qd-ok]').click(function(){
        $(this).off('click');
        if(onok)
            onok();
    });
    $(window).resize();
};


(function ($) {
    $('[data-delete]').click(function (e) {
        var info = JSON.parse(this.dataset.delete),
            what = this.dataset.deletewhat,
            after = this.dataset.deleteafter,
            self = this;
        $.qdConfirm('是否确认删除？',()=>{
            $.post('/api/delete/'+what, info,function (d) {
                if(d.code==200){
                    new Function('jq',"jq."+after)($(self));
                    $.qdAlert('成功删除');
                }else{
                    $.qdAlert(d.message);
                }
            },'json')
        })
    });

})(jQuery);