$( document ).ready(function() {
    fetch( api_url + 'pengumuman')
    .then((resp) => resp.json())
    .then(function(data) {
    var url = new URL(window.location.href);
    var index = url.searchParams.get("index");
    let pengumumanData = data.data;
    var dateTime = pengumumanData[index].tanggal;
    var newDate = new Date(dateTime);
    console.log(pengumumanData[index].id)
    $('#pengumumanTitle').append(`
        ${pengumumanData[index].judul}
    `)

    $('#pengumumanDate').append(`
        ${monthNames[newDate.getMonth()] + " " + newDate.getDate() +"," + " " + newDate.getFullYear()}
    `)

    $('#pengumumanContent').append(`
    <figure class="figure text-center">
    <img src="${pengumumanData[index].foto}" class="img-fluid w-75" alt="">
    </figure>
    <p class="text-start mb-4">
    ${pengumumanData[index].isi}
    </p>
    `)
    for ( i = 0; i < 5; i++){
      var url = new URL(window.location.href);
      let pengumumanUrl = pengumumanData[i].judul;
      pengumumanUrl = pengumumanUrl.replace(/\s+/g, '-');
      var url = new URL(window.location.href);
        $('#pengumumanList').append(`
        <li class="list-group-item text-center">
          <a href="https://`+url.hostname+`/pengumuman/${pengumumanData[i].id}/${pengumumanUrl}/?index=${i}&id=${pengumumanData[i].id}" class="text-decoration-none">
            <ul class="list-unstyled sub-article">
              <li><img src="${pengumumanData[i].foto}" class="card-img-top img-fluid w-50" alt="gambar-berita"></li>
              <li class="text-muted"><small>${pengumumanData[i].judul}</small></li>
            </ul>
          </a>
        </li>
        `)
    }
    })
});