$(document).ready(function () {

    $("#trigger-upload").click(function (event) {
      console.log("CLICKED!")

      var formData = {
          tugas_kami: $("#inputTugas").val(),
      };
      console.log(formData);

    
    $.ajax({
        type: "POST",
        url: api_url + "inputtugaskami",
        data: formData,
        headers:{"Authorization":"Bearer "},
        dataType: "json",
        encode: true,
        success: function(data){
            event.preventDefault();
          console.log(data);
          console.log(formData);
          if ($("#inputTugas").val() == ""){
        alert("Mohon isi semua field dalam form");
        } else {
            alert("Data Berhasil Disimpan");
            window.location.reload();
        }
        }
      })
    })
})