var request = require('request');
var Q = require("q");

var utils = require("soa-example-core-utils");

var config = require("soa-example-service-config").config();

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
	createEntry: createEntry
}