function predicatBy(prop){
    return function(a,b){
        if( a[prop] > b[prop]){
            return 1;
        }else if( a[prop] < b[prop] ){
            return -1;
        }
        return 0;
    }
}

function initJquery() {
    console.log('init jquery!');
    $('button').removeClass('waves-effect');
    $('button').removeClass('waves-light');
    $('div').removeClass('waves-effect');
    $('div').removeClass('waves-light');
}

$(function() {
    initJquery();
});
