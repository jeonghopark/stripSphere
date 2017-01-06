var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.rotation.x = 0.4;
camera.position.y = 0;
camera.position.z = 20;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geom = new THREE.Geometry();

for (var i = 0; i < 20; i++) {
    var _size = 10;
    var _x1 = Math.cos(THREE.Math.degToRad(i*360/20)) * _size;
    var _x2 = Math.cos(THREE.Math.degToRad((i+1)*360/20)) * _size;
    var _z1 = Math.sin(THREE.Math.degToRad((i)*360/20)) * _size;
    var _z2 = Math.sin(THREE.Math.degToRad((i+1)*360/20)) * _size;
    var v1 = new THREE.Vector3(_x1, 0, _z1);
    var v2 = new THREE.Vector3(_x2, 1, _z2);
    var v3 = new THREE.Vector3(_x1, 1, _z1);
    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);
}

for (var i = 0; i < geom.vertices.length - 3; i += 3) {
    geom.faces.push(new THREE.Face3(i, i + 1, i + 2));
    geom.faces.push(new THREE.Face3(i, i + 3, i + 1));
    geom.computeFaceNormals();
}


var object = new THREE.Mesh(geom, new THREE.MeshNormalMaterial());
var wireMat = new THREE.MeshBasicMaterial({
    color: "rgb(0,255,0)",
    wireframe: true,
    transparent: true,
    overdraw: true
});

var wireMesh = new THREE.Mesh(geom, wireMat);

object.rotation.x = 0.5;
wireMesh.rotation.x = 0.5;

scene.add(wireMesh);
scene.add(object);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
