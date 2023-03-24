import mapJson from "@/utils/leaflet/map-json";

function readyMap(mapContainerId) {
    let mapId = mapContainerId ? mapContainerId : 'map'
    console.log(mapId)
    //构建视图限制范围
    var corner1 = L.latLng(20.4538691639559, 98.1728228390779); //设置左上角经纬度
    var corner2 = L.latLng(49.4788701783912, 139.925366334714); //设置右下点经纬度
    var bounds = L.latLngBounds(corner1, corner2);
    this.map = L.map(mapId, {
        maxBounds: bounds,
        center: this.centerPoint,
        zoomSnap: 0.5,
        zoom: 12.5,
        maxZoom: 21,
        minZoom: 6,
        zoomControl: false, // +-工具
        attributionControl: false, // 隐藏logo
        measureControl: false, // 测距测面工具
        preferCanvas: true
    });
    this.map.createPane('labels');
    this.map.getPane('labels').style.zIndex = 10;
    this.map.createPane('annotion');
    this.map.getPane('annotion').style.zIndex = 50;
    this.ciLayer = L.canvasIconLayer({}).addTo(this.map);
    this.jdcCiLayer = L.canvasIconLayer({}).addTo(this.map);
    this.protectionTargetLayer = L.canvasIconLayer({}).addTo(this.map);
    this.factoryAirMuchLayer = L.canvasIconLayer({}).addTo(this.map);
    this.factoryWaterMuchLayer = L.canvasIconLayer({}).addTo(this.map);
    this.factoryElecMuchLayer = L.canvasIconLayer({}).addTo(this.map);
    let style = {
        "color": "#4682B4", //边框颜色
        "weight": 2, //边框粗细
        "opacity": 0.8, //透明度
        "fillColor": '#E0FFFF', //区域填充颜色
        "fillOpacity": 0.2, //区域填充颜色的透明
    };
    let geojsonOptions = {
        style: style,
        pane: 'labels',
    }
    if (this.map.hasLayer(this.mapJsonLayers)) {
        this.map.removeLayer(this.mapJsonLayers)
    }
    // L.geoJSON(mapJson.jsJson, geojsonOptions).addTo(this.map);
    this.mapJsonLayers = L.geoJSON(mapJson.sxzJson, geojsonOptions).addTo(this.map);

    let tianDiTuOptions = {
        maxNativeZoom: 18,
        key: this.tianDiTukey,
        maxZoom: 21,
        minZoom: 6,
        pane: 'labels',
    };
    let annotionOptions = {
        maxNativeZoom: 18,
        key: this.tianDiTukey,
        maxZoom: 21,
        minZoom: 6,
        pane: 'annotion',
    }
    // 影像图
    let imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', tianDiTuOptions)
    let imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', annotionOptions)
    let image = L.layerGroup([imgm, imga]).addTo(this.map);
    // 普通地图
    let normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', tianDiTuOptions)
    let normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', annotionOptions)
    let normal = L.layerGroup([normalm, normala]);

    // 深蓝色地图
    let trafficOptions = {
        maxNativeZoom: 16,
        maxZoom: 21,
        minZoom: 6,
        pane: 'labels',
        coordType: 'gcj02'
    }
    let blackWp = L.tileLayer.chinaProvider('Geoq.Normal.PurplishBlue', trafficOptions)
    let blackMap = L.layerGroup([blackWp])

    this.baseLayers = {
        " <div class='map-sl'></div><span class='my-layer-item'>深蓝<span/>": blackMap,
        "<div class='map-yx'></div><span class='my-layer-item'>影像<span/>": image,
        "<div class='map-pt'></div><span class='my-layer-item'>普通<span/>": normal,
    }
    L.control.layers(this.baseLayers).addTo(this.map);
    //定位工具
    this.coordinates = new L.Control.Coordinates().addTo(this.map)
    let coordinates = new L.Control.Coordinates()
    coordinates.addTo(this.map)
    this.map.on('click', function (e) {
        coordinates.setCoordinates(e);
    })
    // this.initDszLayer();
    // let _this = this
    // this.map.on('moveend', function (e) {
    //     console.log(_this.map.getCenter())
    //     console.log(_this.map.getZoom())
    // })
    this.initDszLayer();
    return this.map
}

// 深泽县边界线
function initDszLayer() {
    let areaOptions = {
        layers: 'dsz:深泽县镇界',
        format: 'image/png',
        transparent: true,
        minZoom: 6,
        maxZoom: 21,
    };
    // L.tileLayer.wms(IPConfig.geoserverUrl, areaOptions).addTo(this.map);
}

function removeLayers() {
    if (this.map.hasLayer(this.layerDtGroups)) {
        this.map.removeLayer(this.layerDtGroups)
    }
    if (this.map.hasLayer(this.ciLayer)) {
        this.ciLayer.clearLayers()
    }
    if (this.map.hasLayer(this.airLayers)) {
        this.map.removeLayer(this.airLayers)
    }
    if (this.map.hasLayer(this.factoryAirMuchLayer)) {
        this.factoryAirMuchLayer.clearLayers()
    }
    if (this.map.hasLayer(this.factoryWaterMuchLayer)) {
        this.factoryWaterMuchLayer.clearLayers()
    }
    if (this.map.hasLayer(this.factoryElecMuchLayer)) {
        this.factoryElecMuchLayer.clearLayers()
    }
    if (this.map.hasLayer(this.noiseLayers)) {
        this.noiseLayers.clearLayers()
    }
}

function removeWaterLayers() {
    if (this.map.hasLayer(this.layerDtGroups)) {
        this.map.removeLayer(this.layerDtGroups)
    }
    if (this.map.hasLayer(this.ciLayer)) {
        this.ciLayer.clearLayers()
    }
}

function removeAirLayers() {
    if (this.map.hasLayer(this.airLayers)) {
        this.map.removeLayer(this.airLayers)
    }
}


// 添加动态框
function addDtMarker(latitude, longitude) {
    if (this.map.hasLayer(this.layerDtGroups)) {
        this.map.removeLayer(this.layerDtGroups)
    }
    this.layerDtGroups = new L.featureGroup().addTo(this.map)
    let transportIcon = L.Icon.extend({
        options: {
            iconSize: [56, 56],
            iconAnchor: [28, 43],
        }
    });
    let myIcon = new transportIcon({iconUrl: './leafletIcon/square.png'})
    let lat = latitude
    let lng = longitude
    let dtMarker = L.marker(new L.LatLng(lat, lng), {icon: myIcon, zIndexOffset: -999});
    this.layerDtGroups.addLayer(dtMarker)
}

// 根据不同的放大倍率添加动态框
function addDtMarkerByZoom(zoom, latitude, longitude) {
    if (this.map.hasLayer(this.layerDtGroups)) {
        this.map.removeLayer(this.layerDtGroups)
    }
    this.layerDtGroups = new L.featureGroup().addTo(this.map)

    let transportIcon = ''
    if (zoom >= 10) {
        transportIcon = L.Icon.extend({
            options: {
                iconSize: [56, 56],
                iconAnchor: [28, 43],
            }
        })
    } else {
        transportIcon = L.Icon.extend({
            options: {
                iconSize: [28, 28],
                iconAnchor: [14, 14],
            }
        })
    }

    let myIcon = new transportIcon({iconUrl: './leafletIcon/square.png'})
    let lat = latitude
    let lng = longitude
    let dtMarker = L.marker(new L.LatLng(lat, lng), {icon: myIcon, zIndexOffset: -999});
    this.layerDtGroups.addLayer(dtMarker)
}

export default {
    tianDiTukey: "857a886d04222c02a303959a4bc31f00",
    // centerPoint: [31.2537256130906, 119.86012585460709],
    centerPoint: [38.20091818214704, 115.21771045653715],
    // centerPoint: [33.897744 ,117.892168],
    ciLayer: [], // 海量点位图层
    airLayers: null,
    noiseLayers: null,
    pollutionAlarmLayer: [], // 污染源告警图层
    vocsLayers: null, // vocs站点
    stenchLayers: null, // 恶臭站
    locusLayer: [], // 轨迹溯源图层
    gasLayers: null, // 加油站
    repairLayers: null, // 汽修企业
    factoryAirMuchLayer: null, // 废气企业海量点图层
    factoryWaterMuchLayer: null, // 废水企业海量点图层
    factoryElecMuchLayer: null, // 用电企业海量点图层
    jdcCiLayer: null,
    map: {},
    zoom: null,
    mapJsonLayers: null, // 底图json
    marker: null,
    searchMarker: null,
    coordinates: null,
    readyMap,
    initDszLayer,
    addDtMarker,
    removeLayers,
    addDtMarkerByZoom,
    removeWaterLayers,
    removeAirLayers,
    baseLayers: {},
    layerDtGroups: [], // 动态框
    layerRedGroups: [],
    shpLayerGroup: [],


}
