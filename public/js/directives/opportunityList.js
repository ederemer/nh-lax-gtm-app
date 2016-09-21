app.directive('opportunityList', function() {
	return {
		restrict: 'E',
		scope: {
			info: '='
		},
		templateUrl: 'js/directives/opportunityList.html'
	};
});