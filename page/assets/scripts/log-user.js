$(document).ready(function () {

  $("#btnLogin").click(function (event) {
    // console.log("CLICKED!")
    var formData = {
      email: $("#inputEmail").val(),
      password: $("#inputPassword").val(),
    };

    var timeleft = 3;
    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "Finished";
      } else {
        document.getElementById("countdown").innerHTML = timeleft;
      }
      timeleft -= 1;
    }, 1000);
  
  $.ajax({
      type: "POST",
      url: api_url + "login",
      data: formData,
      dataType: "json",
      encode: true,
      success: function(data){
        if(data.status == 1){
          // 1. Simpan Token
          if(typeof window !== "undefined"){
            localStorage.setItem("access_token",data.token);
            localStorage.setItem("status_admin",data.status_user);
          }

          // 2. Pop Up Ucapan Selamat Datang
          $("#pop-up").html(`
              <div class="alert alert-success">
                <h6>Login Berhasil</h6>
                <div class="text-muted">Tunggu <span id = "countdown"></span> Detik ...</div>
                <i class="far fa-check-circle fa-2x"></i>
              </div>
          `);
          window.setTimeout(function(){window.location = "/";},3000);
        } else {

          // 1. Pop Up Gagal Login
          $("#pop-up").html(`
              <div class="alert alert-danger">
                <h6>Status Login Gagal </h6>
                <i>${data.message}</i>
              </div>
            `);   
        }
      }
    })

  event.preventDefault();
  });
});