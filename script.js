var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geom = new THREE.Geometry();

for (var i = 0; i < 20; i++) {
        var v1 = new THREE.Vector3(i, i, 0);
        var v2 = new THREE.Vector3(i + 1, i + 1, 0);
        var v3 = new THREE.Vector3(i, i + 1, 0);
        geom.vertices.push(v1);
        geom.vertices.push(v2);
        geom.vertices.push(v3);
}

// var v1 = new THREE.Vector3(0, 0, 0);
// var v2 = new THREE.Vector3(1, 1, 0);
// var v3 = new THREE.Vector3(0, 1, 0);

for (var i = 0; i < geom.vertices.length-2; i++) {    
    geom.faces.push(new THREE.Face3(i, i + 1, i + 2));
    geom.computeFaceNormals();
}

// geom.faces.push(new THREE.Face3(0, 1, 2));

var object = new THREE.Mesh(geom, new THREE.MeshNormalMaterial());

scene.add(object);

camera.position.z = 30;

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
