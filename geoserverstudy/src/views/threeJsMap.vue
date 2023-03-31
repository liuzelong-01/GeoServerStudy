<template>
    <div id="threeMap"></div>
</template>
<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export default {
    data() {
        return {
            camera: null,
            scene: null,
            renderer: null,
            labelRenderer: null,
            controls: null,
            centerLngLat: { lng: 103.817997, lat: 38.255998 },
            groupArea: null,
            groupProvince: null,
            areaData: [
                {
                    name: "北部",
                    mol: "beibu",
                    pos: "104.708812,40.516817",
                    num: "5246.23",
                    rate: "40%",
                    province: "山东,山西,蒙西",
                }, {
                    name: "中部",
                    mol: "zhongbu",
                    pos: "113.016537,28.789966",
                    num: "8258.23",
                    rate: "56%",
                    province: "湖北,湖南,河南,江西",
                }, {
                    name: "东北",
                    mol: "dongbei",
                    pos: "126.605993,43.699451",
                    num: "1658.23",
                    rate: "26%",
                    province: "辽宁,吉林,黑龙江,蒙东",
                }, {
                    name: "西南",
                    mol: "xinan",
                    pos: "105.148957,24.763509",
                    num: "2558.23",
                    rate: "36%",
                    province: "广西,云南,贵州",
                }, {
                    name: "西北",
                    mol: "xibei",
                    pos: "93.430114,35.312145",
                    num: "3658.23",
                    rate: "33%",
                    province: "陕西,甘肃,青海,宁夏,新疆",
                }, {
                    name: "川渝",
                    mol: "chuanyu",
                    pos: "99.867225,29.845309",
                    num: "2658.23",
                    rate: "23%",
                    province: "四川,重庆,西藏",
                }, {
                    name: "苏皖",
                    mol: "suwwan",
                    pos: "118.573359,31.92266",
                    num: "8658.23",
                    rate: "73%",
                    province: "江苏,安徽",
                }, {
                    name: "大湾区",
                    mol: "dawanqu",
                    pos: "113.566717,22.546305",
                    num: "9658.23",
                    rate: "83%",
                    province: "广东,海南",
                }, {
                    name: "长三角",
                    mol: "changsanjiao",
                    pos: "119.453647,27.431229",
                    num: "8654.23",
                    rate: "89%",
                    province: "上海,浙江,福建",
                }, {
                    name: "京津冀",
                    mol: "jingjinji",
                    pos: "115.822457,39.886502",
                    num: "7654.23",
                    rate: "79%",
                    province: "北京,天津,河北",
                }],
            provinceData: [
                {
                    name: "北京",
                    pos: "116.417316,39.906259",
                    num: "654.23",
                    rate: "89%",
                }, {
                    name: "天津",
                    pos: "117.233121,39.091622",
                    num: "234.23",
                    rate: "29%",
                }, {
                    name: "上海",
                    pos: "121.4642,31.212413",
                    num: "934.23",
                    rate: "89%",
                }, {
                    name: "重庆",
                    pos: "107.712033,29.764136",
                    num: "934.23",
                    rate: "89%",
                }, {
                    name: "河北",
                    pos: "115.298563,38.360409",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "河南",
                    pos: "113.590146,33.727226",
                    num: "384.23",
                    rate: "35%",
                }, {
                    name: "云南",
                    pos: "101.9787,24.431078",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "辽宁",
                    pos: "122.943006,41.338504",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "黑龙江",
                    pos: "128.531557,46.922863",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "湖南",
                    pos: "111.997554,27.3225",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "安徽",
                    pos: "117.23863,31.779203",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "山东",
                    pos: "118.252098,36.013921",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "新疆",
                    pos: "86.892508,40.820464",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "江苏",
                    pos: "119.873647,32.634725",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "浙江",
                    pos: "120.30799,29.005172",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "江西",
                    pos: "115.559169,27.371854",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "湖北",
                    pos: "112.924153,31.035798",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "广西",
                    pos: "108.986106,23.688606",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "甘肃",
                    pos: "103.773986,36.658936",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "山西",
                    pos: "112.460853,37.237461",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "蒙东",
                    pos: "120.262398,45.468467",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "蒙西",
                    pos: "106.617682,41.264442",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "陕西",
                    pos: "109.015063,34.968407",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "吉林",
                    pos: "126.21506,43.453489",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "福建",
                    pos: "117.991492,26.000699",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "贵州",
                    pos: "106.698565,26.545957",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "广东",
                    pos: "113.213715,23.210442",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "青海",
                    pos: "96.679711,35.583024",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "西藏",
                    pos: "91.235941,29.636335",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "四川",
                    pos: "102.413044,30.438479",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "宁夏",
                    pos: "106.264221,37.605406",
                    num: "334.23",
                    rate: "39%",
                }, {
                    name: "海南",
                    pos: "109.939563,19.251411",
                    num: "334.23",
                    rate: "39%",
                }],
        }
    },
    mounted() {
        this.initThreeMap()
        this.animate()
    },
    methods: {
        initThreeMap() {
            //设置相机
            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
            this.camera.position.set(0, 21.4, 29);
            this.camera.lookAt(0, 0, 0);
            //创建场景
            this.scene = new THREE.Scene();
            //添加环境光
            let ambLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
            this.scene.add(ambLight);
            //添加平行光
            let dirLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
            dirLight.position.set(400, 600, 400);
            this.scene.add(dirLight);
            //添加渲染器
            this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            this.renderer.outputEncoding = THREE.sRGBEncoding;
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
            this.renderer.setClearAlpha(0.1); // 显示背景图
            document.querySelector('#threeMap').appendChild(this.renderer.domElement);

            this.labelRenderer = new CSS2DRenderer();
            this.labelRenderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
            this.labelRenderer.domElement.style.position = 'absolute';
            this.labelRenderer.domElement.style.top = '78px';
            this.labelRenderer.domElement.style.zIndex = '1';
            document.querySelector('#threeMap').appendChild(this.labelRenderer.domElement);

            //添加相机控制
            this.controls = new OrbitControls(this.camera, this.labelRenderer.domElement);
            this.controls.mouseButtons = { LEFT: THREE.MOUSE.PAN, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE };
            this.controls.minDistance = 5;
            this.controls.maxDistance = 45;
            // this.controls.target.set(0, -0.5, 0.5);
            this.controls.update();
            this.controls.maxPolarAngle = 1.5;
            // //上下翻转的最小角度
            // this.controls.minPolarAngle = 0.8;
            //this.controls.enablePan=false;
            this.groupArea = new THREE.Group();
            this.groupArea.name = "groupArea";
            this.scene.add(this.groupArea);
            this.groupProvince = new THREE.Group();
            this.groupProvince.name = "groupProvince";
            this.scene.add(this.groupProvince);
            //添加模型
            this.loadModel();

        },
        loadModel() {
            let _this = this;
            let loader = new GLTFLoader();
            loader.load('screen-models/china.gltf', function (gltf) {
                gltf.scene.name = 'model';
                _this.scene.add(gltf.scene);
                _this.loadPins();
            });
        },
        loadPins() {
            let _this = this;
            this.areaData.forEach(item => {
                let pp = item.pos.split(',');
                item.pos3d = _this.getMolPos(+pp[0], +pp[1]);
                _this.initImg(item, this.groupArea);
            })
            this.provinceData.forEach(item => {
                let pp = item.pos.split(',');
                item.pos3d = _this.getMolPos(+pp[0], +pp[1]);
                _this.initImg(item, this.groupProvince);
            });
            this.setCss2dVisible(this.groupProvince, false);
        },
        initImg(data, group) {
            let _this = this;
            let ddiv = document.createElement('div');
            ddiv.className = 'pinPart';
            ddiv.innerHTML = '<div class="pin"><div class="pinTitle">' + data.name + '</div>' +
                '<div class="img"><i></i></div>' +
                '<div class="pinInfo" style="display: none">' +
                '<div class="name">' + data.name + '</div>' +
                '<div class="desp"><span>' + data.num + '</span><span>完成率：</span><span>' + data.rate + '</span>' +
                '</div></div></div>';
            let llabel = new CSS2DObject(ddiv);
            let obj3d = new THREE.Object3D();
            obj3d.name = data.name;
            obj3d.position.copy(data.pos3d);
            group.add(obj3d)
            obj3d.add(llabel);
            ddiv.addEventListener('pointerdown', (e) => {
                let bb = group == _this.groupArea ? true : false;
                _this.changArea(data, bb);
            })
            ddiv.addEventListener('mouseenter', (e) => { e.target.querySelector('.pinInfo').style.display = 'block'; })
            ddiv.addEventListener('mouseleave', (e) => { e.target.querySelector('.pinInfo').style.display = 'none'; })
            return obj3d;
        },
        animate() {
            this.renderer.render(this.scene, this.camera);
            this.labelRenderer.render(this.scene, this.camera);
            requestAnimationFrame(this.animate);
        },

        lngLatToMercator({ lng, lat, height }) {
            let mercatorMax = 20037508.3427892
            let y = height ? height : 0
            let z = (lng / 180.0) * mercatorMax
            let x = (Math.PI / 180.0) * lat
            let tmp = Math.PI / 4.0 + x / 2.0
            x = (mercatorMax * Math.log(Math.tan(tmp))) / Math.PI
            return { x: x, y: y, z: z }
        },
        getMolPos(lng, lat, height) {

            let center = this.lngLatToMercator(this.centerLngLat);
            let point = this.lngLatToMercator({ lng, lat });
            let scaleSize = 0.0000043;
            return { z: (center.x - point.x) * scaleSize, y: point.y - center.y, x: (point.z - center.z) * scaleSize, }
        },
        changArea(data, showProvince) {
            let _this = this;
            let model = this.scene.getObjectByName('model');
            if (model) {
                model.children.forEach(child => {
                    child.visible = child.name == data.mol || !showProvince ? true : false;
                    if (showProvince) {
                        if (child.visible){
                            _this.zoomTo(child, 1.6);
                            console.log('11111')
                        } 
                    }
                    else _this.zoomTo(model, 1);
                });
            }
            this.setCss2dVisible(this.groupArea, !showProvince);
            this.groupProvince.visible = showProvince;
            this.groupProvince.children.forEach(child => {
                child.children[0].visible = !data.province || data.province.indexOf(child.name) == -1 ? false : true;
            })
        },
        setCss2dVisible(group, isshow) {
            group.children.forEach(child => {
                child.children[0].visible = isshow;
            })
            group.visible = isshow;
        },
        zoomTo(mol, scale) {
            let bound = new THREE.Box3().setFromObject(mol);
            let vv = bound.getSize(new THREE.Vector3());
            let center = bound.getCenter(new THREE.Vector3());
            let v = new THREE.Vector3(0, vv.z, vv.x)
            v.y *= scale;
            //v= v.multiplyScalar(scale);
            v = v.add(center.clone());
            this.camera.position.copy(v);
            this.controls.target.copy(center);
            this.controls.update();
        },
    }
}
</script>
<style scoped>
#threeMap {
    width: 100%;
    height: 100%;
    margin: 1px auto;
    border: none;
}

.pin {
    position: relative;
    top: -43px;
}

.pin .img:hover {
    background-image: url("../assets/img/ChinaMap/pinBgSel.png");
}

.pin .img {
    width: 76px;
    height: 79px;
    background-image: url("../assets/img/ChinaMap/pinBg.png");
    background-size: 100%;
}

.pin .img i {
    display: inline-block;
    width: 40px;
    height: 33px;
    margin-left: 16px;
    margin-top: 18px;
    background-image: url("../assets/img/ChinaMap/building.png");
    background-size: 100%;
}

.pin .pinTitle {
    background-color: #153080;
    color: white;
    height: 22px;
    line-height: 22px;
    width: 70px;
    text-align: center;
}

.pinInfo {
    width: 240px;
    height: 84px;
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    margin-top: -200px;
    margin-left: -90px;
    color: white;
    padding: 10px 20px;
    position: absolute;

}

.pinInfo:before {
    content: '';
    width: 8px;
    height: 8px;
    background-color: #3c98b6;
    border: solid 1px #ffffff;
    position: absolute;
    border-radius: 8px;
    margin-left: 100px;
    margin-top: 70px;
}

.pinInfo .name {
    font-size: 16px;
    margin-bottom: 8px;
}

.pinInfo .desp span:first-child {
    font-size: 20px;
    margin-right: 40px;
}

.pinInfo .desp span:nth-child(2) {
    color: #86949f;
}

.pinInfo .desp span:nth-child(3) {
    color: #23dc46;
}
</style>