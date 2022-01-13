console.log("edit Training ready");

var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
  element: document.getElementById("fine-uploader-manual-trigger"),
  template: "qq-template-manual-trigger",
  request: {
    endpoint: api_url + "update-training",
  },
  callbacks: {
    onAllComplete: function () {
      alert("Data Berhasil Disimpan");
      window.location.reload();
    },
  },
  autoUpload: false,
  debug: true,
});
qq(document.getElementById("trigger-upload")).attach("click", function () {
  manualUploader.setParams({
    id: $("#inputId").val(),
    judul: $("#inputJudul").val(),
    sumberFoto: $("#inputSumberFoto").val(),
    author: $("#inputAuthor").val(),
    isi: document.getElementById("page").innerHTML,
    tanggal: $("#inputTanggal").val(),
  });
  if (
    $("#inputJudul").val() == "" &&
    $("#inputSumberFoto").val() == "" &&
    $("#inputAuthor").val() == "" &&
    $("#inputTanggal").val() == ""
  ) {
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
  success: function (data) {
    console.log(data);
    var dataDbhLifting = data.data;
    var url = new URL(window.location.href);
    var index = url.searchParams.get("index");
    var dateTime = dataDbhLifting[index].tanggal;
    var newDate = new Date(dateTime);
    var month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    var date = ("0" + (newDate.getDate() + 1)).slice(-2);

    $("#idTraining").append(`
            <label class="form-label">Id</label>
            <input type="text" class="form-control" value="${dataDbhLifting[index].id}" id="inputId" required disabled>
        `);
    $("#judulTraining").append(`
            <label class="form-label">Judul BUMD & Pi</label>
            <input type="text" class="form-control" value="${dataDbhLifting[index].judul}" id="inputJudul" required>
        `);

    $("#sumberTraining").append(`
            <label class="form-label">Sumber Foto</label>
            <input type="text" class="form-control" value="${dataDbhLifting[index].sumber_foto}" id="inputSumberFoto" required>
        `);
    $("#authorTraining").append(`
            <label class="form-label">Author</label>
            <input type="text" class="form-control" value="${dataDbhLifting[index].author}" id="inputAuthor" required>
        `);
    $("#tanggalTraining").append(`
            <label class="form-label">Tanggal</label>
            <input type="date" class="form-control" value="${
              newDate.getFullYear() + "-" + month + "-" + date
            }" id="inputTanggal" required>
        `);
    $("#page-content").append(`
            ${dataDbhLifting[index].isi}
        `);
    $("#fotoTraining").append(
      `<img src="${dataDbhLifting[index].foto}" class="img-fluid img-thumbnail" alt="dbh-lifting"></img>`
    );

    for (i = 0; i < dataDbhLifting.length; i++) {
      var dateTime = dataDbhLifting[i].tanggal;
      var newDate = new Date(dateTime);
      $("#trainingList").append(
        `<tr>
              <th scope="row">${dataDbhLifting[i].id}</th>
              <td class="w-25"><img src="${
                dataDbhLifting[i].foto
              }" class="img-fluid img-thumbnail" alt="dbh-lifting"></td>
              <td class="text-capitalize">${dataDbhLifting[i].judul}</td>
              <td class="text-capitalize">${
                monthNames[newDate.getMonth()] +
                " " +
                newDate.getDate() +
                "," +
                " " +
                newDate.getFullYear()
              }</td>
              <td class="text-capitalize">${dataDbhLifting[i].author}</td>
              <td>
              <a href="#" id="deleteEvent${dataDbhLifting[i].id}" data-id="${
          dataDbhLifting[i].id
        }"><i class="text-danger far fa-trash-alt"></i></a>
              <a href="${`./cmstrainingedit.html?index=${i}`}"><i class="far fa-edit"></i></a>
            </td>
              </tr>`
      );
      $(`#deleteEvent${dataDbhLifting[i].id}`).click(function (event) {
        var id = $(this).data("id");
        console.log(id);
        var formData = {
          id: id,
        };
        console.log(formData);

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
  error: function () {
    console.log("error");
  },
});
