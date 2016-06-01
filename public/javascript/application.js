$(document).ready(function() {

  $("#search").submit(function(e) {
    e.preventDefault();    var city_search_url = "http://autocomplete.wunderground.com/aq?query=";
    var query = $(this).children("#name").val();
    var query_url = city_search_url + query;
    //console.log(query_url);
    $.get(query_url,function( data ) {
      var results = jQuery.parseJSON( data );
      var cities = results["RESULTS"];
      //console.log(cities);
      $.each(cities, function( index, value ) {
        $("section").append("<a href='http://api.wunderground.com/api/1e0a68802ba3c6ed/conditions/q/"+ value["lat"] + "," + value["lon"] + ".json' class='button'>" + value["name"] + "</a> &nbsp; ");
      });
    });
  });

  $("section").on("click", "a", function(e){
    e.preventDefault();
    var url = $(this).attr("href");
    $.get(url, function(data){
      console.log(data["current_observation"]);
      $("#weather").html(data["current_observation"]["weather"]);
      $("#image").html("<img src='"+ data["current_observation"]["icon_url"] + "'/>");
      $("#temp_c").html(data["current_observation"]["temp_c"]);
      $("#wind").html(data["current_observation"]["wind_dir"]);
      $("#humidity").html(data["current_observation"]["relative_humidity"]);
      $("#location-info").fadeIn();
    });
  });

});
