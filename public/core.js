'use strict';
var recipe = angular.module('recipe', []);
//angular.controller('mainController', ['$scope', '$http', '$q'], mainController($scope, $http, $q))

/*app.service('Recipe', [$http], function($http, $q){

})*/


function mainController($scope, $http, $q){
	main();

	//console.log($q);

	async function main(){
		var deferred = $q.defer();
		$scope.formData = {};
		$scope.recipe = null;
		recipe = null
		var recipe = null;
		
		await getDataAsync('/api/recipe').then(c => recipe = c);
		
		var steps = createStepTiles(recipe.steps, recipe.image);
		console.log(steps);
		$scope.$apply(function(){
			$scope.recipe = recipe;
			$scope.steps = steps;
			$scope.getTileInclude = getTileInclude;
		});
		
	}

	function createStepTiles(steps, image){
		var stepTiles = [];
		//check if there is an image
		if(image != undefined && image != null){
			stepTiles.push({
				empty: false,
				image: true,
				imageUrl: image,
				number: 0,
				instructions: ""
			});
		}
		//create tile object for each step
		for(var cStep = 0; cStep < steps.length; cStep++){
			var step = steps[cStep];
			stepTiles.push({
				empty: false,
				image: false,
				imageUrl:"",
				number: step.number,
				instructions: step.instruction
			});
		}

		if(stepTiles.length%6 != 0){
			for(var cExtra = 0; cExtra < stepTiles.length%6; cExtra++){
				stepTiles.push({
					empty: true,
					image: false,
					imageUrl:"",
					number: "",
					instructions: ""
				});
			}
		}

		return {
			tileCount: stepTiles.length,
			tiles: stepTiles
		};
	}

	function getDataAsync(endpoint){
		var deferred = $q.defer();

		$http.get(endpoint)
				.then(function(res){
					deferred.resolve(res.data);
				});
		return deferred.promise;
	}
	

	function getTileInclude(step){
		var prefix = "templates/";
		if(step.image == true){
			return prefix+"tileImage.html";
		}
		else if(step.empty == false){
			return prefix+"tileStep.html";
		}
		else if(step.empty == true){
			return prefix+"tileEmpty.html";
		}

	}
}