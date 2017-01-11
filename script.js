var scene, camera, renderer, controls;
var stats;
var wireMeshS = new Array();
var objectS = new Array();;

var parameters;

init();
animate();


//-----------------------------------------------------------------------------
function init() {

    if (!Detector.webgl) Detector.addGetWebGLMessage();

    parameters = {
        StripWidth: 1.0,
        Speed: 0.5,
        RotationY: 45,
        RotationZ: 25
    }

    var clock = new THREE.Clock();
    clock.start();

    scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xFFEAB0 );
    // scene.fog = new THREE.FogExp2( 0xcccccc, 0.01 ); 

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.domElement.style.position = "relative";
    // renderer.gammaInput = true;
    // renderer.gammaOutput = true;
    renderer.setClearColor(0x000000, 0.0);

    stats = new Stats();

    var _container = document.getElementById('container');
    document.body.appendChild(renderer.domElement);
    _container.appendChild(stats.dom);

    lightSetting(scene);
    controlsSetting(renderer);

    geoMeshSetting();

    guiSetting();


}



//-----------------------------------------------------------------------------
function geoMeshSetting() {
    this._gNum = 40;
    var _wireMatE = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        opacity: 0.3,
        wireframe: true,
        transparent: true,
        overdraw: true
    });

    var _norMatS = new Array();
    for (var i = 0; i < _gNum; i += 1) {
        _norMatS[i] = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            opacity: 0.85,
            transparent: true,
            shading: THREE.SmoothShading,
            side: THREE.DoubleSide
        });
    }

    var _geomS = new Array();
    for (var i = 0; i < _gNum; i += 1) {
        scene.remove(objectS[i]);
        _geomS[i] = geom(36, 6 + 0.12 * i);
        objectS[i] = new THREE.Mesh(_geomS[i], _norMatS[i]);
        wireMeshS[i] = new THREE.Mesh(_geomS[i], _wireMatE);
        scene.add(objectS[i]);
        // scene.add(wireMeshS[i]);
    }

}


//-----------------------------------------------------------------------------
function geoMeshUpdate() {
    var _delta = Math.PI * counter() * 0.05 / 180.0;
    var _followIndex = 20;
    for (var i = 0; i < objectS.length; i += 1) {
        objectS[i].rotation.y = Math.PI;
        objectS[i].rotation.z = Math.PI * 0.25;
        objectS[i].rotation.x = _delta * (i + _followIndex);
        wireMeshS[i].rotation.y = Math.PI;
        wireMeshS[i].rotation.z = Math.PI * 0.25;
        wireMeshS[i].rotation.x = _delta * (i + _followIndex);
    }
}


//-----------------------------------------------------------------------------
function geom(_step, _size) {
    this._geom = new THREE.Geometry();
    this._step = _step;
    this._size = _size;
    this._ySize = parameters.StripWidth;
    for (var i = 0; i <= _step; i += 1) {
        var _x1 = Math.cos(THREE.Math.degToRad(i * 360 / _step)) * _size;
        var _x2 = Math.cos(THREE.Math.degToRad((i + 1) * 360 / _step)) * _size;
        var _z1 = Math.sin(THREE.Math.degToRad((i) * 360 / _step)) * _size;
        var _z2 = Math.sin(THREE.Math.degToRad((i + 1) * 360 / _step)) * _size;
        var v1 = new THREE.Vector3(_x1, -_ySize * 0.5, _z1);
        var v2 = new THREE.Vector3(_x2, _ySize * 0.5, _z2);
        var v3 = new THREE.Vector3(_x1, _ySize * 0.5, _z1);
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


//-----------------------------------------------------------------------------
function animate() {
    requestAnimationFrame(animate);
    render();
    controls.update();
    stats.update();
}



//-----------------------------------------------------------------------------
function render() {
    geoMeshUpdate();
    renderer.render(scene, camera);
}


//-----------------------------------------------------------------------------
function counter() {
    counter.count = counter.count + (1.0 * parameters.Speed) || 1;
    return counter.count;
}


//-----------------------------------------------------------------------------
function lightSetting(_scene) {
    this._scene = _scene;
    var light = new THREE.PointLight(0xffffff, 1, 50);
    light.position.x = 0;
    light.position.y = 2;
    light.position.z = 15;
    light.intensity = 1;

    var lightIn = new THREE.PointLight(0xFEF8D1, 1, 10);
    lightIn.position.x = 0;
    lightIn.position.y = 0;
    lightIn.position.z = 0;
    lightIn.intensity = 1;

    _scene.add(light);
    _scene.add(lightIn);
    _scene.add(new THREE.AmbientLight(0x333355));
}


//-----------------------------------------------------------------------------
function controlsSetting(_renderer) {
    this._renderer = _renderer;
    controls = new THREE.TrackballControls(camera, _renderer.domElement);
    controls.rotateSpeed = 3.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
}


//-----------------------------------------------------------------------------
function guiSetting() {
    var gui = new dat.GUI();

    gui.add(parameters, 'Speed').min(0.0).max(1.0).step(0.1).listen();

    var _stripWidth = gui.add(parameters, 'StripWidth').min(0.2).max(3.0).step(0.1).listen();
    _stripWidth.onChange(function() {
        geoMeshSetting();
    });
}
