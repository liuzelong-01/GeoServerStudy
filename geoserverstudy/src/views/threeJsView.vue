<template>
    <div>
        <canvas id="three"></canvas>
    </div>
</template>
<script>
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export default {
    mounted() {
        this.initThreeJs()
        console.log('test')
    },
    methods: {
        initThreeJs() {
            const canvas = document.querySelector('#three')
            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
            renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
            const controls = new OrbitControls(camera, renderer.domElement)
            controls.update();
            // 方向光
            const light = new THREE.AmbientLight(0x404040); // soft white light
            scene.add(light);


            var loader = new OBJLoader();
            var mtlLoader = new MTLLoader();
            mtlLoader.load('./iphonex/Iphone_seceond_version_finished.mtl', function (material) {
                loader.setMaterials(material)
                loader.load('./iphonex/Iphone_seceond_version_finished.obj', function (root) {
                    scene.add(root);
                    const boundingBox = new THREE.Box3().setFromObject(root);
                    const size = new THREE.Vector3();
                    boundingBox.getSize(size);
                    const cameraDistance = size.length() * 2; // 将相机放置在距离模型2倍尺寸的地方
                    const center = new THREE.Vector3();
                    boundingBox.getCenter(center);

                    camera.position.set(center.x, center.y, center.z - cameraDistance);
                    camera.near = 0.1;
                    camera.far = cameraDistance * 10;
                }, undefined, function (error) {
                    console.error(error);
                });
            })


            function animate() {
                requestAnimationFrame(animate);
                controls.update()

                renderer.render(scene, camera);
            }
            animate()


        },
    }
}
</script>
<style scoped></style>