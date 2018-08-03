'use strict'
var qs = require("querystring");
var http = require('https')

var secret_key = 'f40003c5de1eacb500f9af7d55a47e01'

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
		var postData = qs.stringify({ origin: '501',
		  destination: '114',
		  weight: 1700,
		  courier: 'jne'
		})
		var options = {
		  "method": "POST",
		  "hostname": "api.rajaongkir.com",
		  "port": null,
		  "path": "/basic/cost",
		  "headers": {
		    "key": secret_key,
		    "content-type": "application/x-www-form-urlencoded",
		    'Content-Length': postData.length
		  }
		};
		postToServer(options, postData, function(response){
			var jsonRes = JSON.parse(response)
			callback(jsonRes.rajaongkir)
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
			// console.log(body.toString())
			// return body.toString()
			// console.log(body.toString())
			return callback(body.toString())
			// returnData(body.toString())
		});
	});

	req.write(postData);

	// function returnData(data){
	// 	console.log(data)
	// 	return ""
	// }
	req.end();
}