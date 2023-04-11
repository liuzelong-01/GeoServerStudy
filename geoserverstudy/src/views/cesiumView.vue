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

      //添加地图取点
      viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
        const { position } = movement//屏幕坐标
        //屏幕坐标转笛卡尔
        const ray = viewer.camera.getPickRay(position)
        const cartesian3 = viewer.scene.globe.pick(ray, viewer.scene)
        //笛卡尔坐标转经纬度
        const radians = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian3);
        const lat = Cesium.Math.toDegrees(radians.latitude); //弧度转度
        const lng = Cesium.Math.toDegrees(radians.longitude);
        const alt = radians.height;
        console.log(lng, lat, alt, '经纬度高度')

      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

      //添加点位
      let params = {
        id: 10086,
        lon: 112.46483483748143,
        lat: 32.36690289478925,
        alt: 59.56901707132832
      }

      let entity = new Cesium.Entity({
        id: params.id || `${params.lon}点`,
        name: params.name || '点',
        show: true,
        position: Cesium.Cartesian3.fromDegrees(params.lon, params.lat, params.alt+0.5),
        point: new Cesium.PointGraphics({
          show: true,
          pixelSize: 10,
          heightReference: Cesium.HeightReference.clampToGround,
          color: params.color || new Cesium.Color(255, 255, 0, 1),
          outlineColor: params.color || new Cesium.Color(0, 0, 0, 0),
          outlineWidth: params.outlineWidth || 0,
          scaleByDistance: params.scaleByDistance || new Cesium.NearFarScalar(0, 1, 5e10, 1),
          translucencyByDistance: params.translucencyByDistance || new Cesium.NearFarScalar(0, 1, 5e10, 1),
          distanceDisplayCondition: params.translucencyByDistance || new Cesium.DistanceDisplayCondition(0, 4.8e10),
          disableDepthTestDistance:50000
        })
      });
      viewer.entities.add(entity);

      console.log(entity,'entity')
    },
  },

}

</script>
<style scoped></style>