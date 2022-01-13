console.log('TRAINING READY')

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
        endpoint: api_url + 'training',
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
    console.log($('#inputProvinsi').val())
    manualUploader.setParams({
        judul: $("#inputJudul").val(),
        sumberFoto: $("#inputSumberFoto").val(),
        author: $("#inputAuthor").val(),
        isi: document.getElementById('page').innerHTML,
        tanggal : $('#inputTanggal').val(),
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
    url: api_url + "training",
    dataType: "json",
    encode: true,
    success: function(data){
        var dataTraining = data.data;
        var url = new URL(window.location.href);
        for (i = 0; i < dataTraining.length; i++) {
            var dateTime = dataTraining[i].tanggal;
            console.log(dataTraining)
            var newDate = new Date(dateTime);
            $("#trainingList").append(
              `<tr>
              <th scope="row">${dataTraining[i].id}</th>
              <td class="w-25"><img src="${dataTraining[i].foto}" class="img-fluid img-thumbnail" alt="event"></td>
              <td class="text-capitalize">${dataTraining[i].judul}</td>
              <td class="text-capitalize">${monthNames[newDate.getMonth()] +" " +newDate.getDate() +"," +" " +newDate.getFullYear()}</td>
              <td class="text-capitalize">${dataTraining[i].author}</td>
              <td>
              <a href="#" id="deleteEvent${dataTraining[i].id}" data-id="${dataTraining[i].id}"><i class="text-danger far fa-trash-alt"></i></a>
              <a href="${`./edit/cmstrainingedit.html?index=${i}`}"><i class="far fa-edit"></i></a>
            </td>
              </tr>`
            );
            $(`#deleteEvent${dataTraining[i].id}`).click(function (event) {
              var id = $(this).data("id");
              var formData = {
                id: id,
              };
      
              $.ajax({
                type: "DELETE",
                url: api_url + "training",
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

    

