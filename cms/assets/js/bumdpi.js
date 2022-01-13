
for(i = 0; i < MOCK_PROVINCE.length; i++){
    $('#inputProvinsi').append(`
        <option class="text-secondary text-capitalize" value=${MOCK_PROVINCE[i].filter_name}>${MOCK_PROVINCE[i].name}</option>
    `)
}

var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'bumd-pi',
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
        var dataBumd = data.data;
        var url = new URL(window.location.href);
        for (i = 0; i < dataBumd.length; i++) {
            var dateTime = dataBumd[i].tanggal;
            var newDate = new Date(dateTime);
            $("#bumdpiList").append(
              `<tr>
              <th scope="row">${dataBumd[i].id}</th>
              <td class="w-25"><img src="${dataBumd[i].foto}" class="img-fluid img-thumbnail" alt="event"></td>
              <td class="text-capitalize">${dataBumd[i].judul}</td>
              <td class="text-capitalize">${monthNames[newDate.getMonth()] +" " +newDate.getDate() +"," +" " +newDate.getFullYear()}</td>
              <td class="text-capitalize">${dataBumd[i].author}</td>
              <td class="text-capitalize">${dataBumd[i].provinsi}</td>
              <td>
              <a href="#" id="deleteEvent${dataBumd[i].id}" data-id="${dataBumd[i].id}"><i class="text-danger far fa-trash-alt"></i></a>
              <a href="${`./edit/cmsbumdpiedit.html?index=${i}`}"><i class="far fa-edit"></i></a>
            </td>
              </tr>`
            );
            $(`#deleteEvent${dataBumd[i].id}`).click(function (event) {
              var id = $(this).data("id");
              var formData = {
                id: id,
              };
      
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


    

