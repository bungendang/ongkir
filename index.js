'use strict'
var qs = require("querystring");
var http = require('https')

var data = require('./services/data.json')

module.exports = function(){
	return []
}
module.exports.getProvince = function(province_id){
	if (province_id) {
		var result = data.provinces.find(function(prov){
			return prov.province_id === province_id
		})
		if (result) {
			return result
		} else {
			return []
		}
	} else {
		return data.provinces
	}
}

module.exports.getCity = function(city_id, province_id){
	if (province_id) {
		var cities = data.cities.filter(function(x){
			return x.province_id === province_id
		})
		if (city_id) {
			var result = cities.find(function(y){
				return y.city_id === city_id
			})
			if (result) {
				return result
			} else {
				return []
			}
		} else {
			return cities
		}
		// return result
	} else {
		return data.cities
	}
}

module.exports.getCost = function(origin, destination, weight, courier, callback){
	if (origin && destination && weight && courier) {
		var postData = qs.stringify({ origin: origin,
		  destination: destination,
		  weight: weight,
		  courier: courier
		})
		var options = {
		  "method": "POST",
		  "hostname": "ongkir-a01d2.appspot.com",
		  "port": null,
		  "path": "/cost",
		  "headers": {
		    "content-type": "application/x-www-form-urlencoded",
		    'Content-Length': postData.length
		  }
		};
		postToServer(options, postData, function(response){
			var jsonRes = JSON.parse(response)
			callback(jsonRes)
		})
	} else {
		return "Courier option required"
	}
}

function postToServer(options, postData, callback){
	var req = http.request(options, function (res) {
		var chunks = [];

		res.on("data", function (chunk) {
			chunks.push(chunk);
		});

		res.on("end", function () {
			var body = Buffer.concat(chunks)
			return callback(body.toString())
		});
	});

	req.write(postData);
	req.end();
}