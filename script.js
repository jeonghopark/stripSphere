var scene, camera, renderer, light;
var controls;
var clock;
var container;
var stats;
var wireMesh;
var wireMeshS = new Array();
var object;
var objectS = new Array();;

var gNum = 40;

init();
animate();


function init() {
    
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    clock = new THREE.Clock();

    container = document.getElementById('container');

    scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xFFEAB0 );
    // scene.fog = new THREE.FogExp2( 0xcccccc, 0.01 ); //https://threejs.org/examples/#misc_controls_trackball

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "relative";
    // renderer.gammaInput = true;
    // renderer.gammaOutput = true;
    // renderer.setClearColor( 0x00ff00, 0);

    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    light = new THREE.PointLight(0xffffff, 1, 50 );
    light.position.x = 0;
    light.position.y = 2;
    light.position.z = 15;
    light.intensity = 1;

    lightIn = new THREE.PointLight(0xFEF8D1, 1, 10 );
    lightIn.position.x = 0;
    lightIn.position.y = 0;
    lightIn.position.z = 0;
    lightIn.intensity = 1;


    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 3.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    // controls.keys = [ 65, 83, 68 ];
    controls.addEventListener( 'change', render );
    
        
    var _norMat = new THREE.MeshLambertMaterial({
        color: 0xffffff, 
        shading: THREE.SmoothShading,
        side: THREE.FrontSide
    });


    var _norMatS = new Array();
    for (var i = 0; i < gNum; i++) {
        _norMatS[i] = new THREE.MeshLambertMaterial({
            color: 0xffffff, 
            opacity: 0.75,
            transparent: true,
            shading: THREE.SmoothShading,
            side: THREE.DoubleSide
        });
    }

    var _geomS = new Array();
    for (var i = 0; i < gNum; i++) {
        _geomS[i] = geom(36, 6 + 0.12 * i);
        objectS[i] = new THREE.Mesh(_geomS[i], _norMatS[i]);
    }

    var _wireMat = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        opacity: 0.3,
        wireframe: true,
        transparent: true,
        overdraw: true
    });

    for (var i = 0; i < gNum; i++) {
        wireMeshS[i] = new THREE.Mesh(_geomS[i], _wireMat);
    }

    scene.add(new THREE.AmbientLight(0x330505));
    for (var i = 0; i < gNum; i++) {
        scene.add(objectS[i]);
        // scene.add(wireMeshS[i]);
    }

    scene.add(light);
    scene.add(lightIn);

}


function geom(_step, _size){
    this._geom = new THREE.Geometry();
    this._step = _step;
    this._size = _size;
    this._ySize = 1.0;
    for (var i=0; i<=_step; i+=1) {
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
    for (var i=0; i<_geom.vertices.length - 3; i+=3) {
        _geom.faces.push(new THREE.Face3(i + 1, i, i + 2));
        _geom.faces.push(new THREE.Face3(i + 3, i, i + 1));
        _geom.computeFaceNormals();
    }
    return _geom
}


function animate() {
    requestAnimationFrame(animate);
    render();
    controls.update();
    stats.update();
}


function render() {
    var _delta = clock.getElapsedTime() * 0.8;
    for (var i = 0; i < gNum; i++) {
        objectS[i].rotation.y = Math.PI;
        objectS[i].rotation.z = Math.PI * 0.25;
        objectS[i].rotation.x = _delta * (i + 5) * 0.1;
        wireMeshS[i].rotation.x = _delta * (i + 5) * 0.1;
    }
    renderer.render(scene, camera);
}
