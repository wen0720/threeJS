function init() {
  console.log('primitives');
  const renderer = new THREE.WebGLRenderer();
  // camera
  const fov = 75;
  const aspect = 2; // canvas default
  const near = 0.1;
  const far = 500;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.z = 20;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xAAAAAA);

  function createMaterial() {
    const material = new THREE.MeshPhongMaterial(
      { side: THREE.DoubleSide, } // 設這個 CircleGeometry 才不會在某些角度消失
    );
    const hue = Math.random();
    const stauration = 1; // 飽和度
    const luminance = .5; // 明度
    material.color.setHSL(hue, stauration, luminance);
    return material;
  }
  function createSolidMesh(geometry, positionX) {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    mesh.position.x = positionX;
    scene.add(mesh);
    objs.push(mesh);
  }
  function createLine(geometry, positionX) {
    const material = new THREE.LineBasicMaterial({ color: 0x000000 });
    const line = new THREE.LineSegments(geometry, material);
    line.position.x = positionX;
    scene.add(line);
    objs.push(line);
  }

  const objs = [];

  // box
  {
    const width = 5;
    const height = 5;
    const depth = 5;
    const positionX = 2;
    createSolidMesh(new THREE.BoxGeometry(width, height, depth), positionX);
  }
  // box
  {
    const width = 5;
    const height = 5;
    const depth = 5;
    const widthSegments = 5;
    const heightSegments = 4;
    const depthSegments = 4;
    const positionX = 9;
    const geometry = new THREE.BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments);
    createSolidMesh(geometry, positionX);
    createLine(geometry, positionX);
  }
  // 一片的圓
  {
    const radius = 2;
    const segments = 24;
    const positionX = 16;
    const geometry = new THREE.CircleGeometry(radius, segments);
    createSolidMesh(geometry, positionX);
    createLine(geometry, positionX);
  }
  // 一片的圓（帶入角度）
  {
    const radius = 2;
    const segments = 24;
    const positionX = 22;
    const thetaStart = Math.PI * 0.25;
    const thetaEnd = Math.PI * 1.5;
    const geometry = new THREE.CircleGeometry(radius, segments, thetaStart, thetaEnd);
    createSolidMesh(geometry, positionX);
  }

  // 光
  const lightColor = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(lightColor, intensity);
  light.position.set(-1, 2, 4); // x, y, z 的位置
  scene.add(light);

  document.getElementById('webgl-output').appendChild(renderer.domElement);

  function resizeRenderToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const deviceRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * deviceRatio;
    const height = canvas.clientHeight * deviceRatio;
    const needResize = width !== canvas.width || height !== canvas.height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    if (resizeRenderToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    time *= 0.001;
    objs.forEach((cube) => {
      cube.rotation.x = time;
      cube.rotation.y = time;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

