$(document).ready(function () {

    $("#trigger-upload").click(function (event) {
      console.log("CLICKED!")
      
      var formData = {
        nama: $("#inputNamaPejabat").val(),
        nama_posisi: $("#inputPosisi").val(),
        nama_jabatan: $("#inputJabatanAdpmet").val(),
      };
      // console.log(formData);

    
    $.ajax({
        type: "POST",
        url: api_url + "inputdewanpengurus",
        data: formData,
        headers:{"Authorization":"Bearer "},
        dataType: "json",
        encode: true,
        success: function(data){
            event.preventDefault();
          console.log(data);
          console.log(formData);
          if ($("#inputNamaPejabat").val() == "" && $("#inputPosisi").val() == "" 
            && $("#inputJabatanAdpmet").val() == ""){
        alert("Mohon isi semua field dalam form");
        } else {
            alert("Data Berhasil Disimpan");
            window.location.reload();
        }
    }
      })
    })
})