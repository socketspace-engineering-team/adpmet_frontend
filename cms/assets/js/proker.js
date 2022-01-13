$(document).ready(function () {

    $("#trigger-upload").click(function (event) {
      console.log("CLICKED!")
      var formData = {
       program_kerja : $("#inputProker").val(),   
      };

    
    $.ajax({
        type: "POST",
        url: api_url + "inputprogramkerja",
        data: formData,
        headers:{"Authorization":"Bearer "},
        dataType: "json",
        encode: true,
        success: function(data){
            event.preventDefault();
          console.log(data);
          console.log(formData);
          if ( $("#inputProker").val() == ""){
              alert("Mohon isi semua field dalam form");
        } else {
            alert("Data Berhasil Disimpan");
            window.location.reload();
        }
    }
      })
    })
})