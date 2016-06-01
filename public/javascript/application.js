$(document).ready(function() {

  $("#search").submit(function(e) {
    e.preventDefault();
    var city_search_url = "http://autocomplete.wunderground.com/aq?query=";
    var query = $(this).children("#name").val();
    var query_url = city_search_url + query;
    console.log(query_url);
    $.get(query_url, function( data ) {
        console.log(data);
      });
  });

});
