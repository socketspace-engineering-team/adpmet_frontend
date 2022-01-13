$(document).ready(function () {

    $("#trigger-upload").click(function (event) {
      console.log("CLICKED!")
      
      var formData = {
        nama: $("#inputNama").val(),
        email: $("#inputEmail").val(),
        no_kontak: $("#inputKontak").val(),
        password: $("#inputPassword").val(),
        status_user: $("#inputStatusUser").val(),
        // service: $("#inputService").val(),
      };
      // console.log(formData);

    
    $.ajax({
        type: "POST",
        url: api_url + "register",
        data: formData,
        headers:{"Authorization":"Bearer "},
        dataType: "json",
        encode: true,
        success: function(data){
          alert("Data Member Berhasil Disimpan");
          window.location.reload();
          event.preventDefault();
          console.log(data);
          console.log(formData);
        }
      })
    })
})