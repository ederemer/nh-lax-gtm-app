d3app.directive('donutChart', function() {
		
	function link(scope, el) {
    
	    var data = [{label: 'one', value: 10},{label: 'two', value: 20},{label: 'three', value: 30}];

		var color = d3.scaleOrdinal(d3.schemeCategory10);
		var el = el[0];
		var width = 200;
		var height = 200;
	    var donutWidth = 30;
	    var radius = Math.min(width, height) / 2;
	    var min = Math.min(width, height);

	    var svg = d3.select(el).append('svg')
	    	.attr("width", width)
	      	.attr("height", height)
	      	.attr("style", "display: block; margin: auto")
	      	.append('g')
	      		.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
 
	    var arc = d3.arc()
	    	.innerRadius(radius - donutWidth)
	     	.outerRadius(radius);
		     	    	    	    
	    var pie = d3.pie()
	    	.value(function(d) { return d.value })
	      	.sort(null);
     
	    // add the paths for each arc slice
	    svg.selectAll('path')
	    	.data(pie(data))
	      	.enter()
	      	.append('path')
	        	.attr('d', arc);
	        	.attr('fill', function(d, i) { return color(i)});

	    //scope.$watch('data', function(data) {
	    //	if (!data) { return; };
	    //	svg.selectAll('path').data(pie(data));
	    //	svg.selectAll('path').remove();
	    //	svg.selectAll('path').append('path')
	    //		.attr('fill', function(d, i) { return color(i)});
	    //	svg.selectAll('path').attr('d', arc);
	    //}, true);

	  };
  
  return {
    restrict: 'E',
    link: link,
    scope: { data: '=' }
  };
	
  });