$(document).ready(function () {

    $("#trigger-upload").click(function (event) {
      console.log("CLICKED!")

      var content = document.getElementById('page').innerHTML;
      var formData = {
          visi : content
      };
      console.log(formData);

    
    $.ajax({
        type: "POST",
        url: api_url + "inputvisi",
        data: formData,
        headers:{"Authorization":"Bearer"},
        dataType: "json",
        encode: true,
        success: function(data){
            event.preventDefault();
          console.log(data);
          console.log(formData)
          if (content == ""){
        alert("Mohon isi semua field dalam form");
        } else {
            alert("Data Berhasil Disimpan");
            window.location.reload();
        }
        }
      })
    })
})