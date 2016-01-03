function predicatBy(prop){
    return function(a,b){
        if( a[prop] > b[prop]){
            return 1;
        }else if( a[prop] < b[prop] ){
            return -1;
        }
        return 0;
    };
}

function initJquery() {
    $('.modal-trigger').leanModal();
}

$(function() {
    initJquery();
});
