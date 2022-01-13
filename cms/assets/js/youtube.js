$(document).ready(function () {

    $("#trigger-upload").click(function (event) {
      console.log("CLICKED!")

      var formData = {
          youtube: $("#inputYoutube").val(),
      };
      console.log(formData);

    
    // $.ajax({
    //     type: "POST",
    //     url: "https://apis.adpmet.or.id/v1/inputmisi",
    //     data: formData,
    //     headers:{"Authorization":"Bearer "},
    //     dataType: "json",
    //     encode: true,
    //     success: function(data){
    //         event.preventDefault();
    //       console.log(data);
    //       console.log(formData)
    //     }
    //   })
    })
})