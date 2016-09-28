app.controller('MainController', ['$scope', '$http', function($scope, $http) {
	
	$scope.newField = {};
	$scope.newOpportunity = {};
	$scope.editing = false;

	$http.get('/api/opportunities')
		.success(function(data){
			$scope.opportunities = data;
			//console.log(data);
		})
		.error(function(data) {
			console.log('Error:' + data);
		});

	$http.get('/api/leaderboard')
		.success(function(data){
			$scope.leaders = data;
			//console.log(data);
		})
		.error(function(data) {
			console.log('Error:' + data);
		});

	$http.get('/api/charts')
		.success(function(data){
			$scope.chartData = data;
			console.log($scope.chartData);	
		})
		.error(function(data) {
			console.log('Error:' + data);
		})
		.then(function(res) {
			console.log(res.data);
			$scope.chartData = res.data;
		});
		
	$scope.addOpportunity = function(newOpportunity, opportunityType) {
		$scope.newOpportunity.type = opportunityType;
		$scope.newOpportunity.is_deleted = false;
		$http.post('/api/opportunities', newOpportunity)
			.success(function(data) {
				$scope.newOpportunity = {};
				$http.get('/api/opportunities')
					.success(function(data){
						$scope.opportunities = data;
						console.log(data);
					})
					.error(function(data) {
						console.log('Error:' + data);
					});
			});
	};

	$scope.updateOpportunity = function(opportunity) {
		console.log(opportunity);
		$http.put('api/opportunities/'+opportunity._id,  opportunity)
	};

	$scope.editTableRow = function(field) {
		$scope.editing = $scope.opportunities.indexOf(field);
		$scope.newField = angular.copy(field);
	};

	$scope.saveTableRow = function(index) {
		if ($scope.editing !== false) {
			$scope.opportunities[$scope.editing] = $scope.newField;
			$scope.editing = false;
		}
	};

	$scope.cancel = function(index) {
		if ($scope.editing !== false) {
			$scope.opportunities[$scope.editing] = $scope.newField;
			$scope.editing = false;
		}
	};

	$scope.archiveOpportunity = function(opportunity) { 
		console.log(opportunity);
		if (confirm ('Delete this item? This cannot be undone.')) {
			$http.delete('api/opportunities/'+opportunity._id)
				.success(function(data) {
					$http.get('/api/opportunities')
					.success(function(data){
						$scope.opportunities = data;
						console.log(data);
					})
					.error(function(data) {
						console.log('Error:' + data);
					})
				});
		}
	};

	$scope.addItem = function(itemToAdd) {
		var index = $scope.opportunities.indexOf(itemToAdd);
		$scope.opportunities.splice(index, 1);
		$scope.opportunities.push(angular.copy(itemToAdd));
	}

}])