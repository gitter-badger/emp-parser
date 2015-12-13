var MyDatas;
var Ni;

Ni = new NetworkInterface();
Ni.Init('http://192.168.1.92:2000/');

MyDatas = new MyDatas();
MyDatas.loadMyUEs(function() {
    console.log('Mes UEs chargées.');
    $scope.$emit('endInit');
});
