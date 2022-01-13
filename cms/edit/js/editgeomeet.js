console.log('geomet ready');

var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'update-geomet-portal',
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
    url: api_url + "geomet-portal",
    dataType: "json",
    encode: true,
    success: function(data){
        console.log(data)
        var dataGeomet = data.data;
        var url = new URL(window.location.href);
        var index = url.searchParams.get("index");
        var dateTime = dataGeomet[index].tanggal;
        var newDate = new Date(dateTime);
        var month = ("0" + (newDate.getMonth() + 1)).slice(-2);
        var date = ("0" + (newDate.getDate() + 1)).slice(-2);
        $('#idGeoMet').append(`
            <label class="form-label">Id</label>
            <input type="text" class="form-control" value="${dataGeomet[index].id}" id="inputId" disabled required>
        `)
        $('#judulGeomet').append(`
            <label class="form-label">Judul GeoMET</label>
            <input type="text" class="form-control" value="${dataGeomet[index].judul}" id="inputJudul" required>
        `);

        $('#sumberGeomet').append(`
            <label class="form-label">Sumber Foto</label>
            <input type="text" class="form-control" value="${dataGeomet[index].sumber_foto}" id="inputSumberFoto" required>
        `);
        $('#authorGeomet').append(`
            <label class="form-label">Author</label>
            <input type="text" class="form-control" value="${dataGeomet[index].author}" id="inputAuthor" required>
        `);
        $('#tanggalGeomet').append(`
            <label class="form-label">Tanggal</label>
            <input type="date" class="form-control" value="${newDate.getFullYear() + "-" + month + "-" + date}" id="inputTanggal" required>
        `)
        $("#page-content").append(`
            ${dataGeomet[index].isi}
        `);
        $("#fotoGeomet").append(
            `<img src="${dataGeomet[index].foto}" class="img-fluid img-thumbnail" alt="dbh-lifting"></img>`
        )
        $('#inputProvinsi').append(`
            <option class="text-secondary text-capitalize" selected value=${dataGeomet[index].provinsi}>${dataGeomet[index].provinsi}</option>
        `)
        for(i = 0; i < MOCK_PROVINCE.length; i++){
            $('#inputProvinsi').append(`
                <option class="text-secondary text-capitalize" value=${MOCK_PROVINCE[i].filter_name}>${MOCK_PROVINCE[i].name}</option>
            `)
        }

        for (i = 0; i < dataGeomet.length; i++) {
            var dateTime = dataGeomet[i].tanggal;
            var newDate = new Date(dateTime);
            $("#geoMetList").append(
              `<tr>
              <th scope="row">${dataGeomet[i].id}</th>
              <td class="w-25"><img src="${dataGeomet[i].foto}" class="img-fluid img-thumbnail" alt="dbh-lifting"></td>
              <td class="text-capitalize">${dataGeomet[i].judul}</td>
              <td class="text-capitalize">${monthNames[newDate.getMonth()] +" " +newDate.getDate() +"," +" " +newDate.getFullYear()}</td>
              <td class="text-capitalize">${dataGeomet[i].author}</td>
              <td class="text-capitalize">${dataGeomet[i].provinsi}</td>
              <td>
              <a href="#" id="deleteEvent${dataGeomet[i].id}" data-id="${dataGeomet[i].id}"><i class="text-danger far fa-trash-alt"></i></a>
              <a href="${`./cmsgeomeetedit.html?index=${i}`}"><i class="far fa-edit"></i></a>
            </td>
              </tr>`
            );
            $(`#deleteEvent${dataGeomet[i].id}`).click(function (event) {
              var id = $(this).data("id");
              console.log(id);
              var formData = {
                id: id,
              };
              console.log(formData);
      
              $.ajax({
                type: "DELETE",
                url: api_url + "geomet-portal",
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