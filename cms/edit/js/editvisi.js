$(document).ready(function () {

    $("#trigger-upload").click(function (event) {
      console.log("CLICKED!")

      var content = document.getElementById('page').innerHTML;
      var formData = {
          id : $("#inputidVisi").val(),
          visi : content
      };
      console.log(formData);

    
    $.ajax({
        type: "POST",
        url: api_url + "update-visi",
        data: formData,
        headers:{"Authorization":"Bearer "+localStorage.getItem("access_token")},
        dataType: "json",
        encode: true,
        success: function(data){
            event.preventDefault();
          console.log(data);
          console.log(formData)
        }
      })
    })
})