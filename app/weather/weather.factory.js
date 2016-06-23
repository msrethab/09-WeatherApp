
// Creating Factory to perform weather related services

(function() {
    'use strict';

    angular
        .module('weatherApp')
        .factory('WeatherFactory', WeatherFactory);

    WeatherFactory.$inject = ['$http','$q'];

    /* @ngInject */
    function WeatherFactory($http,$q) {
        var service = {
            getWeatherInfo: getWeatherInfo,
            convertTemp: convertTemp
        };
        return service;

        ////////////////

        //Defining function for calling openweather API and appending timestamp date to end of response data

        function getWeatherInfo(citySearchName) {
        	var defer = $q.defer();
        	var date = new Date();

                $http({
                method: 'GET',
                url: 'http://api.openweathermap.org/data/2.5/weather',
                params:{ 
                	q: citySearchName,
                	appid: 'bb34fd71a5ec81d14c88e09811ddd10b'
                }
            }).then(function(response){
                if (response.data.cod === 200){
                	response.data.date = date;
                    defer.resolve(response);
                } else{
                    defer.reject("City not found!");
                }              
            },
            function(error){
                defer.reject(error);
            });

            return defer.promise;
        }

        function convertTemp(temperature, convertTo){

        	if(convertTo === 'celsius'){
        		temperature = (temperature - 32)*5/9;
        	}
        	if(convertTo === 'fahrenheit'){
        		temperature = (temperature)*9/5 + 32;

        	}
        	return temperature;
        }
    }
})();