// ThreeScene.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class ThreeScene {
  constructor(canvas) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.set(0, 10, 15);

    this.armGroup = new THREE.Group();

    const segment1 = this.createSegment(1, 5, 0x00ff00);
    const segment2 = this.createSegment(0.8, 4, 0xff0000);
    const segment3 = this.createSegment(0.6, 3, 0x0000ff);

    segment1.position.y = 0;
    segment2.position.y = 4.5;
    segment3.position.y = 4;

    this.armGroup.add(segment1);
    segment1.add(segment2);
    segment2.add(segment3);

    this.scene.add(this.armGroup);

    this.rotationXSegment1 = 0;
    this.rotationYSegment1 = 0;
    this.rotationZSegment1 = 0;

    this.rotationXSegment2 = 0;
    this.rotationYSegment2 = 0;
    this.rotationZSegment2 = 0;

    this.rotationXSegment3 = 0;
    this.rotationYSegment3 = 0;
    this.rotationZSegment3 = 0;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    this.scene.add(directionalLight);

    this.renderer.render(this.scene, this.camera);

    window.addEventListener('resize', this.handleResize.bind(this));
  }

  createSegment(radius, height, color) {
    const material = new THREE.MeshPhongMaterial({ color });
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);

    // Shift the geometry up by half of its height so that it sits on top of the previous cylinder
    geometry.translate(0, height / 2, 0);

    return new THREE.Mesh(geometry, material);
}

  handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  setArmAngles(segment1Angle, segment2Angle, segment3Angle) {
    this.rotationZSegment1 = THREE.MathUtils.degToRad(segment1Angle);
    this.rotationZSegment2 = THREE.MathUtils.degToRad(segment2Angle);
    this.rotationZSegment3 = THREE.MathUtils.degToRad(segment3Angle);
  }

  animate() {
    this.armGroup.children[0].rotation.x = this.rotationXSegment1;
    this.armGroup.children[0].rotation.y = this.rotationYSegment1;
    this.armGroup.children[0].rotation.z = this.rotationZSegment1;

    this.armGroup.children[0].children[0].rotation.x = this.rotationXSegment2;
    this.armGroup.children[0].children[0].rotation.y = this.rotationYSegment2;
    this.armGroup.children[0].children[0].rotation.z = this.rotationZSegment2;

    this.armGroup.children[0].children[0].children[0].rotation.x = this.rotationXSegment3;
    this.armGroup.children[0].children[0].children[0].rotation.y = this.rotationYSegment3;
    this.armGroup.children[0].children[0].children[0].rotation.z = this.rotationZSegment3;

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  cleanup() {
    this.scene.remove(this.armGroup);
    this.renderer.dispose();

    window.removeEventListener('resize', this.handleResize);
  }
}

export default ThreeScene;
