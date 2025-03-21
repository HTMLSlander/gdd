// Initialize Three.js scene
let scene, camera, renderer;
let torusDots = [];

function init() {
  // Create scene
  scene = new THREE.Scene();

  // Create camera
  camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.z = 15;

  // Create renderer
  const canvas = document.getElementById("torus-canvas");
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  // Create torus dots
  createTorusDots();

  // Start animation
  animate();

  // Handle window resize
  window.addEventListener("resize", onWindowResize);
}

function createTorusDots() {
  // Create a group for the torus
  const torusGroup = new THREE.Group();
  scene.add(torusGroup);

  // Torus parameters
  const radius = 3;
  const tubeRadius = 2;
  const radialSegments = 20;
  const tubularSegments = 24;

  // Create dots on the torus surface
  for (let i = 0; i < radialSegments; i++) {
    for (let j = 0; j < tubularSegments; j++) {
      const u = (i / radialSegments) * Math.PI * 2;
      const v = (j / tubularSegments) * Math.PI * 2;

      const x = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
      const y = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);
      const z = tubeRadius * Math.sin(v);

      const dotGeometry = new THREE.SphereGeometry(0.05, 8, 8);
      const dotMaterial = new THREE.MeshBasicMaterial({
        color: j % 2 === 0 ? 0x00a4cc : 0x76c7c0,
      });

      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.set(x, y, z);
      torusGroup.add(dot);
      torusDots.push(dot);
    }
  }

  // Rotate the torus 90 degrees
  torusGroup.rotation.x = Math.PI / 2;
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate the torus
  scene.rotation.y += 0.003;

  renderer.render(scene, camera);
}

function onWindowResize() {
  const canvas = renderer.domElement;
  const container = canvas.parentElement;

  // Update renderer size
  renderer.setSize(container.clientWidth, container.clientHeight);

  // Update camera aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
}

// Handle mouse movement for shapes
let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (e) => {
  // Normalize mouse position
  mouseX = (e.clientX / window.innerWidth) * 2 - 1;
  mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

  // Update circle positions
  const circle1 = document.querySelector(".circle-1");
  const circle2 = document.querySelector(".circle-2");
  const circle3 = document.querySelector(".circle-3");
  const circle4 = document.querySelector(".circle-4");

  circle1.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
  circle2.style.transform = `translate(${mouseX * -15}px, ${mouseY * -15}px)`;
  circle3.style.transform = `translate(${mouseX * -40}px, ${mouseY * -80}px)`;
  circle4.style.transform = `translate(${mouseX * -20}px, ${mouseY * -35}px) `;

  // Update rectangle positions and rotation
  const rect1 = document.querySelector(".rectangle-1");
  const rect2 = document.querySelector(".rectangle-2");

  rect1.style.transform = `rotate(${mouseX * 10}deg) translate(${
    mouseY * 10
  }px, ${mouseX * 10}px)`;
  rect2.style.transform = `rotate(${mouseY * 15}deg)`;
});

// Initialize the scene when the page loads
window.addEventListener("load", init);
