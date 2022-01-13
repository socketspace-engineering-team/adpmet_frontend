$(document).ready(function () {

    $("#trigger-upload").click(function (event) {
      console.log("CLICKED!")

      var formData = {
          nomor_prokum : $("#inputProkum").val(),
          tentang : $("#inputTentang").val(),
          tahun : $("#inputTahun").val(),
      };
    
    $.ajax({
        type: "POST",
        url: api_url + "inputperaturan",
        data: formData,
        headers:{"Authorization":"Bearer "},
        dataType: "json",
        encode: true,
        success: function(data){
            event.preventDefault();
          console.log(data);
          console.log(formData);
          if ( $("#inputProkum").val() == "" &&  
          $("#inputTentang").val() == "" &&
          $("#inputTahun").val() == ""){
            alert("Mohon isi semua field dalam form");
         } else {
          alert("Data Berhasil Disimpan");
          window.location.reload();
      }
        }
      })
    })
})