$(document).ready(function(){
    var url = new URL(window.location.href);
    var thisnewsId = url.searchParams.get("id");
    var formData = {
          newsId: thisnewsId,
    }
$.ajax({
    type: "POST",
    url: api_url + "view_news",
    data: formData,
    headers:{"Authorization":"Bearer "},
    dataType: "json",
    encode: true,
    success: function(data){
        event.preventDefault();
    }
  });
});