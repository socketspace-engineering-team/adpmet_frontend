console.log('edit bumdpi ready');

var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'update-bumd-pi',
    },
    callbacks: {
        onAllComplete: function() {
            alert('Data Berhasil Disimpan')
            window.location.reload();
        }
    },
    autoUpload: false,
    debug: true
});
qq(document.getElementById("trigger-upload")).attach("click", function() {
    manualUploader.setParams({
        id: $("#inputId").val(),
        judul: $("#inputJudul").val(),
        sumberFoto: $("#inputSumberFoto").val(),
        author: $("#inputAuthor").val(),
        isi: document.getElementById('page').innerHTML,
        tanggal : $('#inputTanggal').val(),
        provinsi : $('#inputProvinsi').val(),
    })
    if ($("#inputJudul").val() == "" && $("#inputSumberFoto").val() == "" 
    && $("#inputAuthor").val() == "" && $('#inputTanggal').val() ==""){
        alert("Mohon isi semua field dalam form");
    } else {
        manualUploader.uploadStoredFiles();
    }
});

$.ajax({
    type: "GET",
    url: api_url + "bumd-pi",
    dataType: "json",
    encode: true,
    success: function(data){
        console.log(data)
        var dataBumd = data.data;
        var url = new URL(window.location.href);
        var index = url.searchParams.get("index");
        var dateTime = dataBumd[index].tanggal;
        var newDate = new Date(dateTime);
        var month = ("0" + (newDate.getMonth() + 1)).slice(-2);
        var date = ("0" + (newDate.getDate() + 1)).slice(-2);

        $('#idBumd').append(`
            <label class="form-label">Id</label>
            <input type="text" class="form-control" value="${dataBumd[index].id}" id="inputId" required disabled>
        `);
        $('#judulBumd').append(`
            <label class="form-label">Judul BUMD & Pi</label>
            <input type="text" class="form-control" value="${dataBumd[index].judul}" id="inputJudul" required>
        `);

        $('#sumberFotoBumd').append(`
            <label class="form-label">Sumber Foto</label>
            <input type="text" class="form-control" value="${dataBumd[index].sumber_foto}" id="inputSumberFoto" required>
        `);
        $('#authorBumd').append(`
            <label class="form-label">Author</label>
            <input type="text" class="form-control" value="${dataBumd[index].author}" id="inputAuthor" required>
        `);
        $('#tanggalBumd').append(`
            <label class="form-label">Tanggal</label>
            <input type="date" class="form-control" value="${newDate.getFullYear() + "-" + month + "-" + date}" id="inputTanggal" required>
        `)
        $("#page-content").append(`
            ${dataBumd[index].isi}
        `);
        $("#fotoBumd").append(
            `<img src="${dataBumd[index].foto}" class="img-fluid img-thumbnail" alt="dbh-lifting"></img>`
        )

        $('#inputProvinsi').append(`
        <option class="text-secondary text-capitalize" selected value=${dataBumd[index].provinsi}>${dataBumd[index].provinsi}</option>
        `)
        for(i = 0; i < MOCK_PROVINCE.length; i++){
            $('#inputProvinsi').append(`
                
                <option class="text-secondary text-capitalize" value=${MOCK_PROVINCE[i].filter_name}>${MOCK_PROVINCE[i].name}</option>
            `)
        }

        for (i = 0; i < dataBumd.length; i++) {
            var dateTime = dataBumd[i].tanggal;
            var newDate = new Date(dateTime);
            $("#bumdPiList").append(
              `<tr>
              <th scope="row">${dataBumd[i].id}</th>
              <td class="w-25"><img src="${dataBumd[i].foto}" class="img-fluid img-thumbnail" alt="dbh-lifting"></td>
              <td class="text-capitalize">${dataBumd[i].judul}</td>
              <td class="text-capitalize">${monthNames[newDate.getMonth()] +" " +newDate.getDate() +"," +" " +newDate.getFullYear()}</td>
              <td class="text-capitalize">${dataBumd[i].author}</td>
              <td class="text-capitalize">${dataBumd[i].provinsi}</td>
              <td>
              <a href="#" id="deleteEvent${dataBumd[i].id}" data-id="${dataBumd[i].id}"><i class="text-danger far fa-trash-alt"></i></a>
              <a href="${`./cmsbumdpiedit.html?index=${i}`}"><i class="far fa-edit"></i></a>
            </td>
              </tr>`
            );
            $(`#deleteEvent${dataBumd[i].id}`).click(function (event) {
              var id = $(this).data("id");
              console.log(id);
              var formData = {
                id: id,
              };
              console.log(formData);
      
              $.ajax({
                type: "DELETE",
                url: api_url + "bumd-pi",
                data: formData,
                headers: { Authorization: "Bearer " },
                dataType: "json",
                encode: true,
                success: function (data) {
                  alert("Data Berhasil Dihapus");
                  window.location.reload();
                  event.preventDefault();
                  console.log(data);
                  console.log(formData);
                },
              });
            });
          }
    },
    error: function(){
        console.log('error')
      }
});