$(document).ready(function () {

    $("#trigger-upload").click(function (event) {
      console.log("CLICKED!")
      
      var formData = {
        alamat: $("#inputAlamat").val(),
        instagram_username: $("#inputIgUser").val(),
        instagram_link: $("#inputIg").val(),
        youtube_username: $("#inputYtUser").val(),
        youtube_link: $("#inputYt").val(),
        facebook_username: $("#inputFbUser").val(),
        facebook_link: $("#inputFb").val(),
        twitter_username: $("#inputTwUser").val(),
        twitter_link: $("#inputTw").val(),
        no_telpon: $("#inputTelp").val(),
        wa: $("#inputWa").val(),
      };
      console.log(formData);

    
    $.ajax({
        type: "PUT",
        url: api_url + "footer",
        data: formData,
        headers:{"Authorization":"Bearer "},
        dataType: "json",
        encode: true,
        success: function(data){
            event.preventDefault();
            alert('Data Berhasil Disimpan');
            window.location.reload();
            
    }
      })
    })
})