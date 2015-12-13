var MyDatas;
var Ni;

$(function() {
    MyDatas = new MyDatas();
    MyDatas.loadMyUEs(function() {
        console.log('Ses UEs chargées.');
        Ni = new NetworkInterface();
        Ni.Init('http://192.168.1.92:2000/');
    });
});
