L.GeoCoder = L.Class.extend({
  initialize: function () {
    this._geoUrl = 'https://restapi.amap.com/v3/geocode/geo?';
    this._regeoUrl = 'https://restapi.amap.com/v3/geocode/regeo?';
    this._address = " ";
    this._location = " ";
  },
  /**
   * 正向地理编码： 将地址描述信息转换成地理坐标（经纬度）
   */
  getLocation: function (address, callback) {
    let me = this;
    var url = this._buildGeoUrl(address);
    var request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    request.onreadystatechange = function () { // 状态发生变化时，函数被回调
      if (request.readyState === 4) { // 成功完成
        // 判断响应结果:
        if (request.status === 200) {
          // 成功，通过responseText拿到响应的文本:
          return me._geoSuccess(request.responseText, callback);
        } else {
          // 失败，根据响应码判断失败原因:
          return me._geoFail(request.status);
        }
      } else {
        // HTTP请求还在继续...
      }
    }
    // 发送请求:
    request.open('GET', url);
    request.send();
  },
  /**
   * 逆向地理编码：将地理坐标（经纬度）转换成地址描述信息
   */
  getAddress: function (location, callback) {
    let me = this;
    var url = this._buildRegeoUrl(location);
    var request;
    if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    } else {
      request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          return me._regeoSuccess(request.responseText, callback);
        } else {
          return me._regeoFail(request.status);
        }
      } else {
        //
      }
    }
    request.open('GET', url);
    request.send();
  },
  /**
   * 构建正向地理编码请求地址
   * @private
   */
  _buildGeoUrl: function (address) {
    var url = this._geoUrl + 'address=' + address + '&key=b151f5f88c28da34b95dd35b3d329618';
    return url;
  },
  /**
   * 构建逆地理编码请求地址
   * lnglat 经纬度坐标  格式：[110.235,38.31]
   * @private
   */
  _buildRegeoUrl: function (lnglat) {
    var url = this._regeoUrl + 'location=' + lnglat[0] + ',' + lnglat[1] + '&key=b151f5f88c28da34b95dd35b3d329618';
    return url;
  },
  /**
   * 地理编码服务请求成功，回调方法
   * @param response
   * @private
   */
  _geoSuccess: function (response, callback) {
    return callback(response);
  },
  /**
   * 地理编码服务请求失败
   * @param response
   * @private
   */
  _geoFail: function (error) {
    alert('请求失败' + error);
  },
  /**
   * 逆地理编码服务请求成功，回调方法
   * @param response
   * @private
   */
  _regeoSuccess: function (response, callback) {
    return callback(response);
  },
  _regeoFail: function (error) {
    alert("请求失败" + error);
  }
});

L.geoCoder = function () {
  return new L.GeoCoder();
}
