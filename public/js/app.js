var app = angular.module('nhApp', []); 

$(document).ready(function() {

  // Hide elements
  $('#shortOpportunityForm').hide();
  $('#longOpportunityForm').hide();

  //Show new form/row
  $('span.f_showShortFormRow').on('click', function() {
      $('#shortOpportunityForm').toggle();
  });

  $('span.f_showLongFormRow').on('click', function() {
      $('#longOpportunityForm').toggle();
  });

});