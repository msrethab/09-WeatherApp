
//Initializing Weather Controller to handle weather related service calls

(function() {
    'use strict';

    angular
        .module('weatherApp')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['WeatherFactory'];

    /* @ngInject */
    function WeatherController(WeatherFactory) {
        var vm = this;
        vm.title = 'WeatherController';
        vm.getWeatherInfo = getWeatherInfo;
        vm.convertTemp = convertTemp;

        activate();

        ////////////////

        //Initializing weather information to default city of San Diego

        function activate() {
        	WeatherFactory.getWeatherInfo('San Diego')
				.then(function(response) {

                vm.weatherInfo = response.data;
                vm.weatherInfo.main.temp = Math.round(((vm.weatherInfo.main.temp -273.15)*9/5+32)*100)/100;
                vm.weatherInfo.main.temp_min = Math.round(((vm.weatherInfo.main.temp_min -273.15)*9/5+32)*100)/100;
                vm.weatherInfo.main.temp_max = Math.round(((vm.weatherInfo.main.temp_max -273.15)*9/5+32)*100)/100;

                vm.search = {
                					name: vm.weatherInfo.name,
                					date: vm.weatherInfo.date
                }
                vm.searchHistory = new Array(vm.search);

                toastr.success('Weather Data Loaded!');


            },
            function(error){
                if(typeof error === 'object'){
                    toastr.error('There was an error: ' + error.data);  
                } else{
                    toastr.error(error);
                }     
            })
        }

        //Calling weather factory method getWeatherInfo for use within the controller

        function getWeatherInfo(citySearchName){

        	WeatherFactory.getWeatherInfo(citySearchName).then(function(response) {

                vm.weatherInfo = response.data;
                vm.weatherInfo.main.temp = Math.round(((vm.weatherInfo.main.temp -273.15)*9/5+32)*100)/100;
                vm.weatherInfo.main.temp_min = Math.round(((vm.weatherInfo.main.temp_min -273.15)*9/5+32)*100)/100;
                vm.weatherInfo.main.temp_max = Math.round(((vm.weatherInfo.main.temp_max -273.15)*9/5+32)*100)/100;

                vm.search = {
                					name: vm.weatherInfo.name,
                					date: vm.weatherInfo.date
                }

                vm.searchHistory.push(vm.search);

                toastr.success('Weather Data Loaded!');

            },
            function(error){
                if(typeof error === 'object'){
                    toastr.error('There was an error: ' + error.data);  
                } else{
                    toastr.error(error);
                }     
            });

        }

        function convertTemp(temperature, convertTo){
        	temperature = WeatherFactory.convertTemp(temperature, convertTo);
        	return temperature;
        }
    }
})();