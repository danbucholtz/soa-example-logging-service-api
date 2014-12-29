var request = require('request');
var Q = require("q");

var utils = require("soa-example-core-utils");

var config = require("soa-example-service-config").config();

var debug = function(accessToken, message){
	return createEntry(accessToken, 1, message);
};

var info = function(accessToken, message){
	return createEntry(accessToken, 2, message);
};

var warn = function(accessToken, message){
	return createEntry(accessToken, 3, message);
};

var error = function(accessToken, message){
	return createEntry(accessToken, 4, message);
};

var createEntry = function(accessToken, level, message){
	var deferred = Q.defer();
	
	var url = utils.createBaseUrl(config.loggingServiceIp, config.loggingServicePort);

	var object = {
		level: level,
		message: message
	};

	utils.postJson(accessToken, url + "/log").then(function(response){
		deferred.resolve(response);
	});

	return deferred.promise;
};

var getLogEntriesForUser = function(accessToken){
	var deferred = Q.defer();
	
	var url = utils.createBaseUrl(config.loggingServiceIp, config.loggingServicePort);

	utils.getWithAccessToken(accessToken, url + "/log").then(function(response){
		deferred.resolve(response);
	});

	return deferred.promise;
};

module.exports = {
	getLogEntriesForUser : getLogEntriesForUser,
	debug: debug,
	info: info,
	warn: warn,
	error: error
}