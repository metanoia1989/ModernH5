const fs = require("fs");
const request = require("request");
const qs = require("querystring");

// 通过 JSON.parse 来解析 IP 地址中的列表
function readIP(path, callback) {
  fs.readFile(path, (err, data) => {
    if (err) {
      callback(err);
    } else {
      try {
        data = JSON.parse(data);  
        callback(null, data);
      } catch (error) {
        callback(error); 
      }
    }
  });
}

// 通过 telize 的公共GEO服务来获取城市信息 已不可用 要收费
function ip2geo(ip, callback) {
  const url = "http://www.telize.com/geoip/" + ip;
  request({
    url, json: true,
  }, (err, resp, body) => {
    callback(err, body);
  });
}

// 通过 openweathermap 的公共服务来获取当地的天气信息
function geo2weather(lat, lon, callback) {
  const params = {
    lat, lon,
    APPID: 'public key',
  }; 
  const url = "http://api.oepnweathermap.org/data/2.5/weather?" + qs.stringify(params);
  request({ url, json: true }, (err, resp, body) => {
    callback(err, body);
  });
}

function getos2weathers(geos, callback) {
  var weathers = [];
  var geo;
  var remain = geos.length;
  for (let i = 0; i < geos.length; i++) {
    geo = geos[i];
    (function (geo) {
      geo2weather(geo.latitude, geo.longitude, (err, weather) => {
        if (err) {
          callback(err);
        } else {
          weather.geo = geo;
          weathers.push(weather);
          remain--;
        }
        if (remain == 0) {
          callback(null, weathers);
        }
      });
    })(geo);
  }
}

function writeWeather(weathers, callback) {
  var output = [];
  var weather;
  // 使用 for 循环遍历每个IP地址的嘻嘻
  for (let i = 0; i < weathers.length; i++) {
    const weather = weathers[i];
    output.push({
      ip: weather.geo.ip,
      weather: weather.weather[0].main,
      region: weather.geo.region,
    });
  }
  // 使用 fs.writeFile 函数将结果写入到 weather.json 中
  fs.writeFile("./weather.json", JSON.stringify(output, null, ' '), callback);
}