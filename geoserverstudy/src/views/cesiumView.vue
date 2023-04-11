<template>
  <div id="cesiumContainer"></div>
</template>
<script>
export default {
  name: "cesiumView",
  mounted() {
    this.initViewer()
  },

  data() {
    return {
      divTree: { far: 'farPoints', near: 'nearPoints', unzoom: 'unzoomPoints' },
      selPin: [],// 被选中的定位点
      selArea: null,
      heightLimit: 1500,
      clearSet: new Set(),
      camOrigin: {
        // pos: new Cesium.Cartesian3(-2142665.421788752, 4555188.252507338, 3911660.4514494464),
        direction: new Cesium.Cartesian3(0.3712932559230822, -0.7538693420697009, 0.5420538102379072),
        up: new Cesium.Cartesian3(-0.22619159040522838, 0.4927620717941341, 0.8402516914776823)
      },
      camAnima: { pos: null, dir: null, up: null, right: null },

    }
  },

  methods: {
    /**
     * 加载Cesium地球
     */
    initViewer() {
      let env = this;
      Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMThkYTE3NS0xODFlLTQ5ZTQtOTQxNC0wYWUwYmQ2NjVkZDYiLCJpZCI6NDkxNDYsImlhdCI6MTYzMjM5NTkwMX0.WLfHyZZFC721CDeP_bwJEtyDPnNTW87DM6dg0i-uG0o';
      window.viewer = new Cesium.Viewer("cesiumContainer", {
        animation: false,
        shouldAnimate: true,
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        homeButton: false,
        timeline: false,
        infoBox: false,
        sceneModePicker: false,
        selectionIndicator: false,
        navigationHelpButton: false,
        // scene3DOnly:true,
        // navigationInstructionsInitiallyVisible:false,
        // showRenderLoopErrors:false,//是否显示渲染错误
        // orderIndependentTranslucency:false,//设置背景透明
        //天地图加载
        imageryProvider: new Cesium.UrlTemplateImageryProvider({
          url: "https://{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=0be65571f8ced2413616dced9acc5099",
          subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          maximumLevel: 18,
        }),
      });

      // 倾斜模型平面底图
      // let basicMap =  new Cesium.TileMapServiceImageryProvider({
      //   url : "model/drones/",
      //   rectangle : Cesium.Rectangle.fromDegrees(117.831520,33.880022, 117.931617,33.935430) //切片加载范围
      // });
      // viewer.imageryLayers.addImageryProvider(basicMap);


      viewer.scene.screenSpaceCameraController.minimumZoomDistance = 10;
      viewer.scene.screenSpaceCameraController.maximumZoomDistance = 50000;
      viewer.scene.screenSpaceCameraController.tiltEventTypes = [
        Cesium.CameraEventType.RIGHT_DRAG, Cesium.CameraEventType.PINCH,
        { eventType: Cesium.CameraEventType.LEFT_DRAG, modifier: Cesium.KeyboardEventModifier.CTRL },
        { eventType: Cesium.CameraEventType.RIGHT_DRAG, modifier: Cesium.KeyboardEventModifier.CTRL }
      ];
      viewer.scene.screenSpaceCameraController.zoomEventTypes = [
        Cesium.CameraEventType.MIDDLE_DRAG, Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH
      ];
      // env.addModel();

      var position = Cesium.Cartesian3.fromDegrees(112.469434, 32.364355, 900)
      this.camOrigin.pos = { x: position.x, y: position.y, z: position.z }
      viewer.camera.flyTo({
        destination: this.camOrigin.pos,
        orientation: {
          direction: this.camOrigin.direction,
          up: this.camOrigin.up
        },
        duration: '0.5',
        complete: function callback() {
          // env.initParkWall();
          // env.addModel();
        }
      });

      //去掉ion标志
      viewer._cesiumWidget._creditContainer.style.display = 'none'
      // 通过createWorldTerrainhelper创建
      viewer.terrainProvider = Cesium.createWorldTerrain({
        requestWaterMask: true,        // 开启水光效果
        requestVertexNormals: true     // 开启地形光照
      });

      // 开始高程遮挡效果 
      viewer.scene.globe.depthTestAgainstTerrain = true;
    },
  },

}

</script>
<style scoped></style>