import './style.css';
import './intro.css';
import './projects.css';

import * as Three from 'three';

import PlanetWithClouds from './Planet with clouds';
import { Float32BufferAttribute } from 'three';
import Planet from './Planet';

const getXandYfromDeg = (radius: number, angle: number, xExtra: number) => {
  const theta = angle * Math.PI / 180;
  const x = ((radius + xExtra) * Math.cos(theta));
  const y = radius * Math.sin(theta);
  return `translateX(${x}px) translateY(${y}px)`;
}

const projectBubbles = document.getElementsByClassName("projectPreview");

const angleMove = 360 / projectBubbles.length;
for (let i = 0; i < projectBubbles.length; i++) {
  (projectBubbles[i] as HTMLDivElement).style.transform = getXandYfromDeg((window.innerHeight / 2) - 100, i * angleMove, window.innerWidth > 1100 ? (window.innerWidth / 2) - 600 : 0);
  (projectBubbles[i] as HTMLDivElement).innerText = `${i * angleMove}deg`;
}


const scene = new Three.Scene();

const camera = new Three.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
// const viewSize = 65;
// const aspectRatio = window.innerWidth / window.innerHeight;

// const camera = new Three.OrthographicCamera(-aspectRatio * 15 * 2, aspectRatio * viewSize / 2, viewSize / 2, -viewSize / 2, -1000, 1000);

// camera.position.x = 0;
camera.position.z = 40;

const renderer = new Three.WebGLRenderer({
  canvas: document.querySelector("#bgCanvas") as any,
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// Actual stuff before was creation of scene

// Earth

const earthTexture = new Three.TextureLoader().load("images/earth.jpg");

earthTexture.minFilter = Three.LinearFilter;

const earth = new PlanetWithClouds(scene, {
  radius: 5,
  widthSegments: 50,
  heightSegments: 50,
  atmosphereIntensity: .3,
  atmosphereScale: 1.1,
  texture: earthTexture,
  cloudsTexture: new Three.TextureLoader().load("images/clouds.png")
});

// earth.atmosphere.position.x = .4;
earth.group.position.x = 8;
earth.planet.rotation.y = 2;
// earth.group.rotation.z = 0.02;
earth.planet.rotation.x = 0.2;

const ambientLight = new Three.AmbientLight(0xFFFFFF, .5);

scene.add(ambientLight);

// const gridHelper = new Three.GridHelper(200, 50);
// scene.add(gridHelper);

// Stars

const starGeometry = new Three.BufferGeometry();
const starMaterial = new Three.PointsMaterial({
  color: 0xFFFFFF
});

const starVertices: number[] = [];

for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starVertices.push(x, y, z);
}

starGeometry.setAttribute("position", new Float32BufferAttribute(starVertices, 3));

const stars = new Three.Points(starGeometry, starMaterial);

scene.add(stars);


const loader = new Three.TextureLoader();
loader.load("images/smoke.png", texture => {
  const cloudGeo = new Three.PlaneBufferGeometry(500, 500);
  const cloudMaterial = new Three.MeshLambertMaterial({
    map: texture,
    transparent: true,
    color: 0x331182
  });

  for (let i = 0; i < 50; i++) {
    const cloud = new Three.Mesh(cloudGeo, cloudMaterial);
    cloud.position.set(Math.random() * 800 - 400,
      500,
      Math.random() * 500 - 500);
    cloud.rotation.x = 1.16;
    cloud.rotation.y = -0.12;
    cloud.rotation.z = Math.random() * 2 * Math.PI;
    cloud.material.opacity = 1;
    scene.add(cloud);
  }
});

const moonTexture = new Three.TextureLoader().load("images/moon.jpg");

// earthTexture.minFilter = Three.LinearFilter;

const moon = new Planet(scene, {
  radius: 2,
  widthSegments: 50,
  heightSegments: 50,
  atmosphereIntensity: 0.5,
  atmosphereScale: 1.1,
  atmosphereColor: { r: 1, g: 1, b: 1, o: 1 },
  texture: moonTexture
});

moon.group.position.x = 8;
moon.group.position.y = -20;
moon.group.position.z = -6;

const curve = new Three.CubicBezierCurve3(
  new Three.Vector3(0, 0, 5),
  new Three.Vector3(0, 0, -5),
  new Three.Vector3(4, 0, -6),
  new Three.Vector3(6, 0, -6),
);

const curve2 = new Three.CubicBezierCurve3(
  new Three.Vector3(6, 0, -6),
  new Three.Vector3(8, 0, -6),
  new Three.Vector3(8, -5, -6),
  new Three.Vector3(8, -10, -6),
);

const points = curve.getPoints(400).concat(curve2.getPoints(400));

[curve.v0, curve.v1, curve.v2, curve.v3].forEach(point => {
  const geo = new Three.SphereGeometry(.2, 10, 10);

  const mesh = new Three.Mesh(
    geo,
    new Three.MeshStandardMaterial({
      color: "0x255"
    })
  )

  mesh.position.x = point.x;
  mesh.position.y = point.y;
  mesh.position.z = point.z;

  scene.add(mesh)

});


[curve2.v0, curve2.v1, curve2.v2, curve2.v3].forEach(point => {
  const geo = new Three.SphereGeometry(.2, 10, 10);

  const mesh = new Three.Mesh(
    geo,
    new Three.MeshStandardMaterial({
      color: "0x255"
    })
  )

  mesh.position.x = point.x;
  mesh.position.y = point.y;
  mesh.position.z = point.z;

  scene.add(mesh)

});

// const points = cameraPath.getPoints(250);

console.log(points);

// console.log(cameraPath.getPointAt(3));



const geometry = new Three.BufferGeometry().setFromPoints(points);

const material = new Three.LineBasicMaterial({ color: 0xff0000 });

const curveObject = new Three.Line(geometry, material);
scene.add(curveObject);

// const rotationAxis = new Three.Vector3(.1, .1, 0);

// let lastLocation = 0;

window.addEventListener("scroll", () => {

  const scrolledPerc = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);

  const arrayIndex = Math.round(scrolledPerc * (points.length - 1));

  camera.position.x = points[arrayIndex].x;
  camera.position.y = points[arrayIndex].y;
  camera.position.z = points[arrayIndex].z;

  if (arrayIndex < points.length - 2)
    camera.lookAt(points[arrayIndex + 1])

  // if (lastLocation < window.pageYOffset) {
  //   if (arrayIndex < points.length - 1)
  //     camera.lookAt(points[arrayIndex + 1]);
  // }
  // else if (arrayIndex > 0) camera.lookAt(points[arrayIndex - 1])

  console.log(`scrollY: ${scrolledPerc * 100}%. index: ${arrayIndex}`);

  // lastLocation = window.pageYOffset;
});


function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  earth.planet.rotation.y += 0.0004;
  earth.clouds.rotation.y += 0.0005;
  // earth.group.rotateOnAxis(rotationAxis, 0.01);

  // earth.group.position.y += 0.4;

  // earth.group.position.y += 0.1;
  // earth.group.position.z -= 0.1;

  starGeometry.rotateX(0.0001);
  starGeometry.rotateX(0.00008);

  // camera.position.y += 0.01;
  // camera.rotation.x += 0.001;
}

animate();