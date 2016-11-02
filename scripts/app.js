var endpoint1 = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';
var endpoint2 = 'http://api.giphy.com/v1/gifs/search';
var limit = 50;
var isDefalt = true;
var submit = true;

$(document).on("ready", function(){

  $.ajax({
    method: 'GET',
    url: endpoint1,
    dataType: 'json',
    success: uploadGifs
  });

  $('form').on('submit', function(event){
    event.preventDefault();
    $.ajax({
      method: 'GET',
      url: endpoint2,
      data: $("form").serialize(),
      dataType: 'json',
      success: uploadGifs,
      complete: changeDefault
    });
    limit = 25;
  });

  $('#loadMore').on('click', function(event){
    if(isDefalt){
      $.ajax({
        method: 'GET',
        url: endpoint1 + "&limit=" + limit,
        dataType: 'json',
        success: uploadGifs,
      });
      limit+=25;
    }
    else{
      submit = false;
      $.ajax({
        method: 'GET',
        url: endpoint2,
        data: $("form").serialize()+"&offset=" + limit,
        dataType: 'json',
        success: uploadGifs,
      });
      customLimit+=25;
    }
  });
});

function uploadGifs(json){
  if(submit){
    $(".gif-gallery").html("");
  }
  json.data.forEach(function(obj){
    $(".gif-gallery").append('<img src="'+obj.images.fixed_height.url+'">');
  });
}

function changeDefault(){
  isDefalt = false;
}
