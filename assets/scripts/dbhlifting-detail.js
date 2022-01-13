  var access_token = localStorage.getItem("access_token");
  if (access_token == null || access_token == undefined) {
    console.log('Login Terlebih Dahulu');
    location.replace(`${domain_name}`);
  };

$(document).ready(function() {
    var url = new URL(window.location.href);
    var index = url.searchParams.get("index");

    $.ajax({
      type: "GET",
      url: api_url + "dbh_lifting",
      dataType: "json",
      encode: true,
      success: function(data){
        var url = new URL(window.location.href);
        var dataDbhLifting = data.data;

        var dateTime = dataDbhLifting[index].tanggal;
        var newDate = new Date(dateTime);
        // var itemUrl = dataDbhLifting[j].judul;
        // var itemUrl = itemUrl.replace(/\s+/g, "-");
        $("#itemTitle").append(
            `
              ${dataDbhLifting[index].judul}
            `
          );
        $('#itemDate').append(
            `${monthNames[newDate.getMonth()] + " " + newDate.getDate() +"," + " " + newDate.getFullYear()}`
        );
        $('#itemImage').append(
            `<figure class="figure text-center">
                <img src="${dataDbhLifting[index].foto}" class="img-fluid w-75" alt="">
                
            </figure>`
        )
        $('#itemContent').append(
            `${dataDbhLifting[index].isi}`
        )
    
        for (i = 0; i < 5; i++) {
            $("#indexList").append(
            `
            <li class="list-group-item text-center">
              <a href="${`${domain_name}/dbhlifting.html?index=${i}&id=${dataDbhLifting[i].id}`}" class="text-decoration-none">
                <ul class="list-unstyled sub-article">
                  <li><img src=${dataDbhLifting[i].foto} class="card-img-top img-fluid w-50" alt="gambar-berita"></li>
                  <li class="text-muted"><small>${dataDbhLifting[i].judul}</small></li>
                </ul>
              </a>
            </li>
            `
            );
        }
      },
      error: function(){
          console.log('error')
        }
    });
    
});


