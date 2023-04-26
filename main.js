import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(0);

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry(22, 3, 16, 100)
//( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

const danikTexture = new THREE.TextureLoader().load('horseshoebay.jpeg');

const danik = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: danikTexture })
);

scene.add(danik);

const dwTexture = new THREE.TextureLoader().load('dw_logo.png');
const mwTexture = new THREE.TextureLoader().load('mw.jpeg');
const activisionTexture = new THREE.TextureLoader().load('activision.png');
const tntTexture = new THREE.TextureLoader().load('tnt.jpg');
const grassTopTexture = new THREE.TextureLoader().load('grass-top.jpg');
const grassBottomTexture = new THREE.TextureLoader().load('grass-bottom.jpg');
const grassSidesTexture = new THREE.TextureLoader().load('grass-sides.jpg');
const grassSidesEvenTexture = new THREE.TextureLoader().load('grass-sides-even.jpg');


const logoMaterials = [
  new THREE.MeshBasicMaterial({ map: grassSidesTexture }),  
  new THREE.MeshBasicMaterial({ map: grassSidesTexture}),
  new THREE.MeshBasicMaterial({ map: grassTopTexture }),
  new THREE.MeshBasicMaterial({ map: grassBottomTexture }),
  new THREE.MeshBasicMaterial({ map: grassSidesTexture }),
  new THREE.MeshBasicMaterial({ map: grassSidesTexture}),
]

const dw = new THREE.Mesh(
  new THREE.BoxGeometry(2,2,2),
  logoMaterials
);

scene.add(dw);

const marsTexture = new THREE.TextureLoader().load('2k_mars.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(2, 15, 15),
  new THREE.MeshStandardMaterial( { 
    map: marsTexture,
    normalMap: normalTexture })
);

scene.add(mars);

const jupiterTexture = new THREE.TextureLoader().load('2k_jupiter.jpg');


const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( {
    map: jupiterTexture,
    //normalMap: normalTexture
  })
)

scene.add(jupiter);

jupiter.position.z = 30;
jupiter.position.setX(-7);

mars.position.z = 10;
mars.position.setX(5);

danik.position.z = -5;
danik.position.x = 2;
danik.position.y = 0.5;

dw.position.z = 5;
dw.position.x = 4;

function moveCamera() {

  const t = document.body.getBoundingClientRect().top;
  // jupiter.rotation.x += 0.05;
  jupiter.rotation.y += 0.075;
  // jupiter.rotation.z += 0.05;

  // mars.rotation.x += -0.005;
  mars.rotation.y += -0.025;
  // mars.rotation.z += -0.005;

  danik.rotation.y += 0.01;
  danik.rotation.z += 0.01;

  dw.rotation.y += 0.01;
  dw.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  jupiter.rotation.y += -0.002;
  mars.rotation.y += 0.005;

  dw.rotation.x += 0.01;
  dw.rotation.y += 0.02;

  //controls.update();

  renderer.render( scene, camera );
}

animate();
