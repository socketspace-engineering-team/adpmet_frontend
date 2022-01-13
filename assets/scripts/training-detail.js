$( document ).ready(function() {
  console.log('training READY')
  var url = new URL(window.location.href);
  var index = url.searchParams.get("index");

  $.ajax({
    type: "GET",
    url: api_url + "training",
    dataType: "json",
    encode: true,
    success: function(data){
      var url = new URL(window.location.href);
      var dataTraining = data.data;

      var dateTime = dataTraining[index].tanggal;
      var newDate = new Date(dateTime);
      // var itemUrl = dataTraining[j].judul;
      // var itemUrl = itemUrl.replace(/\s+/g, "-");
      $("#itemTitle").append(
          `
            ${dataTraining[index].judul}
          `
        );
      $('#itemDate').append(
          `${monthNames[newDate.getMonth()] + " " + newDate.getDate() +"," + " " + newDate.getFullYear()}`
      );
      $('#itemImage').append(
          `<figure class="figure text-center">
              <img src="${dataTraining[index].foto}" class="img-fluid w-75" alt="">
              
          </figure>`
      )
      $('#itemContent').append(
          `${dataTraining[index].isi}`
      )
  
      for (i = 0; i < 5; i++) {
          $("#indexList").append(
          `
          <li class="list-group-item text-center">
            <a href="${`${domain_name}/training.html?index=${i}&id=${dataTraining[i].id}`}" class="text-decoration-none">
              <ul class="list-unstyled sub-article">
                <li><img src=${dataTraining[i].foto} class="card-img-top img-fluid w-50" alt="gambar-berita"></li>
                <li class="text-muted"><small>${dataTraining[i].judul}</small></li>
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
