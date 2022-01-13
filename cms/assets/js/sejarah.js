$(document).ready(function () {

    $("#trigger-upload").click(function (event) {
      console.log("CLICKED!")
      var formData = {
        isi_sejarah: $("#inputDeskripsi").val(),
        tanggal_sejarah: $("#inputTanggalSejarah").val(),
      };

    
    $.ajax({
        type: "POST",
        url: api_url + "inputsejarah",
        data: formData,
        headers:{"Authorization":"Bearer "},
        dataType: "json",
        encode: true,
        success: function(data){
            event.preventDefault();
          console.log(data);
          console.log(formData);
          if ($("#inputDeskripsi").val() == "" && 
          $("#inputTanggalSejarah").val() == "" 
            ){
        alert("Mohon isi semua field dalam form");
        } else {
            alert("Data Berhasil Disimpan");
            window.location.reload();
        }
    }
      })
    })
})