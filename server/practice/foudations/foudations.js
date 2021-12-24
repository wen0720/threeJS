function init() {
	console.log('foudations');
	const renderer = new THREE.WebGLRenderer();
	// camera
	const fov = 75;
	const aspect = 2; // canvas default
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	camera.position.z = 2;
	const scene = new THREE.Scene();

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	function makeInstance(geometry, color, x) {
		const material = new THREE.MeshPhongMaterial({ color });
		const cube = new THREE.Mesh(geometry, material);
		scene.add(cube);
		cube.position.x = x;
		return cube;
	}

	const cubes = [
		makeInstance(geometry, 0x44aa88, 0),
		makeInstance(geometry, 0x8844aa, 2),
		makeInstance(geometry, 0xaa8844, -2),
	];

	const color = 0xFFFFFF;
	const intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(-1, 2, 4); // x, y, z 的位置
	scene.add(light);

	renderer.render(scene, camera);

	document.getElementById('webgl-output').appendChild(renderer.domElement);

	function resizeRendererToDisplaySize(renderer) {
		const canvas = renderer.domElement;
		const deviceRatio = window.devicePixelRatio;
		const width = canvas.clientWidth * deviceRatio; // 此刻 canvas 顯示寬度
		const height = canvas.clientHeight * deviceRatio; // 此刻 canvas 顯示高度

		// 當顯示 寬/高 不等於 canvas內部pixel 寬/高
		const needResize = width !== canvas.width || height !== canvas.height;
		if (needResize) {
			renderer.setSize(width, height, false);
		}
		return needResize;
	}

	function render(time) {
		time *= 0.001;

		// 符合畫面比例
		if (resizeRendererToDisplaySize(renderer)) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		cubes.forEach((cube, ndx) => {
			const speed = 1 + ndx * .1;
			const rot = time * speed;
			cube.rotation.x = rot;
			cube.rotation.y = rot;
		});
		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}
