var recipe = angular.module('recipe', []);

function mainController($scope, $http){
	$scope.formData = {};

	$http.get('/api/recipe')
		.success(function(data){
			$scope.recipe = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
}