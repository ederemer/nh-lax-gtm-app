app.directive('leaderboard', function() {
	return {
		restrict: 'E',
		scope: {
			info: '='
		},
		templateUrl: 'js/directives/leaderboard.html'
	};
});