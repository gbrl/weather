$(document).ready(function() {

  $("#search").submit(function(e) {
    e.preventDefault();

    $("section").html("");
    $("#locations-header").fadeIn();

    var city_search_url = "http://autocomplete.wunderground.com/aq?query=";
    var query = $(this).children("#name").val();
    var query_url = city_search_url + query;

    $.ajax({
      url: query_url,
      type: "GET",
      dataType: "jsonp",
      success: function (data) {
        var cities = data["RESULTS"];
        $.each(cities, function( index, value ) {
          $("section").append("<a href='http://api.wunderground.com/api/1e0a68802ba3c6ed/conditions/q/"+ value["lat"] + "," + value["lon"] + ".json' class='button'>" + value["name"] + "</a> &nbsp; ");
        });
      },
      error: function (xhr, status) {
        console.log(status);
        console.log(xhr);
      }
    });

  });

  $("section").on("click", "a", function(e){
    e.preventDefault();
    var url = $(this).attr("href");
    var name = $(this).text();
    $.get(url, function(data){
      console.log(data["current_observation"]);
      $("#location-name").html(name);
      $("#weather").html(data["current_observation"]["weather"]);
      $("#image").html("<img src='"+ data["current_observation"]["icon_url"] + "'/>");
      $("#temp_c").html(data["current_observation"]["temp_c"] + " Celcius");
      $("#wind").html(data["current_observation"]["wind_string"]);
      $("#humidity").html(data["current_observation"]["relative_humidity"]);
      $("#location-info").fadeIn();
    });
  });

});
