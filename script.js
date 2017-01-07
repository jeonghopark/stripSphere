var scene, camera, renderer;
var clock;
var container;
var stats;
var wireMesh;
var object;


init();
animate();


function init() {
    
    clock = new THREE.Clock();

    container = document.getElementById('container');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 0;
    camera.position.z = 20;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "relative";
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;

    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    var _norMat = new THREE.MeshBasicMaterial({color: "rgb(255, 255, 255)"});

    var _geom = geom();

    object = new THREE.Mesh(_geom, _norMat);

    var _wireMat = new THREE.MeshBasicMaterial({
        color: "rgb(0,255,0)",
        wireframe: true,
        transparent: true,
        overdraw: true
    });

    wireMesh = new THREE.Mesh(_geom, _wireMat);

    scene.add(wireMesh);
    scene.add(object);
}


function geom(){
    var _geom = new THREE.Geometry();
    var _step = 20;
    for (var i = 0; i < _step; i++) {
        var _size = 10;
        var _x1 = Math.cos(THREE.Math.degToRad(i * 360 / _step)) * _size;
        var _x2 = Math.cos(THREE.Math.degToRad((i + 1) * 360 / _step)) * _size;
        var _z1 = Math.sin(THREE.Math.degToRad((i) * 360 / _step)) * _size;
        var _z2 = Math.sin(THREE.Math.degToRad((i + 1) * 360 / _step)) * _size;
        var v1 = new THREE.Vector3(_x1, 0, _z1);
        var v2 = new THREE.Vector3(_x2, 1, _z2);
        var v3 = new THREE.Vector3(_x1, 1, _z1);
        _geom.vertices.push(v1);
        _geom.vertices.push(v2);
        _geom.vertices.push(v3);
    }
    for (var i = 0; i < _geom.vertices.length - 3; i += 3) {
        _geom.faces.push(new THREE.Face3(i + 1, i, i + 2));
        _geom.faces.push(new THREE.Face3(i + 3, i, i + 1));
        _geom.computeFaceNormals();
    }
    return _geom
}


function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}


function render() {
    var _delta = clock.getElapsedTime() * 0.5;
    object.rotation.x = _delta;
    wireMesh.rotation.x = _delta;
    renderer.render(scene, camera);
}
