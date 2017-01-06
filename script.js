var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geom = new THREE.Geometry();

for (var i = 0; i < 20; i++) {
    var v1 = new THREE.Vector3(i, 0, 0);
    var v2 = new THREE.Vector3(i + 1, 1, 0);
    var v3 = new THREE.Vector3(i, 1, 0);
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
scene.add(object);

var wireMesh = new THREE.Mesh(geom, wireMat);
scene.add(wireMesh);

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
