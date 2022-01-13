$(document).ready(function () {

    $("#trigger-upload").click(function (event) {
      console.log("CLICKED!")

      var formData = {
          misi: $("#inputMisi").val(),
      };
      console.log(formData);

    
    $.ajax({
        type: "POST",
        url: api_url + "inputmisi",
        data: formData,
        headers:{"Authorization":"Bearer"},
        dataType: "json",
        encode: true,
        success: function(data){
            event.preventDefault();
          console.log(data);
          console.log(formData)
          if ($("#inputMisi").val() == ""){
        alert("Mohon isi semua field dalam form");
        } else {
            alert("Data Berhasil Disimpan");
            window.location.reload();
        }
        }
      })
    })
})