const scene = new THREE.Scene();
const far = 20000;
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, far );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function getRandomInt(min, max) {
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

const w = window.innerWidth * 2.5;
const h = window.innerHeight * 2.5;

for (let i = 0; i < 5000; i++) {
  const geometry = new THREE.PlaneBufferGeometry( 50, 50 );
  const color = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
  const material = new THREE.MeshBasicMaterial( { color: color, side: THREE.DoubleSide, transparent: true, opacity: getRandom( 0.1, 0.9 ) } );
  const plane = new THREE.Mesh( geometry, material );
  plane.position.x = getRandomInt(-w, w);
  plane.position.y = getRandomInt(-h, h);
  plane.position.z = getRandomInt(0, far);
  if (plane.position.z % 5 == 0) {
    plane.rotation.y = getRandom( - Math.PI / 2.0, Math.PI / 2.0 );
  }
  if (plane.position.z % 7 == 0) {
    plane.rotation.x = getRandom( - Math.PI / 2.0, Math.PI / 2.0 );
  }
  scene.add( plane );
}

camera.position.z = far * 3 / 4;

let isMouseDown = false;
let zSpeed = 5;

document.addEventListener( 'mousedown', function(event) {
  isMouseDown = true;
} );

document.addEventListener( 'mouseup', function(event) {
  isMouseDown = false;
} );

console.log(camera.rotation.order);

document.addEventListener( 'mousemove', function(event) {
  const x = window.innerWidth / 2 - event.clientX;
  const y = window.innerHeight / 2 - event.clientY;
  if (isMouseDown) {
    zSpeed = 50;
  } else {
    zSpeed = 5;
  }
  camera.rotation.x = y / 500;
  camera.rotation.y = x / 500;
} );

const fadeColor = [ 0xffffff, 0xdddddd, 0xbbbbbb, 0x555555, 0x333333, 0x111111 ];

const render = function () {
  requestAnimationFrame( render );
  camera.position.z -= zSpeed;
  if (camera.position.z == 14600) { renderer.setClearColor(fadeColor[0], 1.0); }
  if (camera.position.z == 14610) { renderer.setClearColor(fadeColor[1], 1.0); }
  if (camera.position.z == 14620) { renderer.setClearColor(fadeColor[2], 1.0); }
  if (camera.position.z == 14630) { renderer.setClearColor(fadeColor[3], 1.0); }
  if (camera.position.z == 14640) { renderer.setClearColor(fadeColor[4], 1.0); }
  if (camera.position.z == 14650) { renderer.setClearColor(fadeColor[5], 1.0); }
  renderer.render(scene, camera);
};

render();
