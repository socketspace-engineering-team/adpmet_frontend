var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'inputevent',
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
        judul : $("#inputJudulEvent").val(),
        eventDate: $("#inputMulaiEvent").val(),
        eventTillDate: $("#inputAkhirEvent").val(),
        deskripsi: document.getElementById('page').innerHTML,
        namaPic: $("#inputPicEvent").val(),
        alamat: $("#inputAlamatEvent").val(),
        noKontak: $("#inputKontakEvent").val(),
    })
    if ($("#inputJudulEvent").val()=="" && $("#inputMulaiEvent").val()== ""
    && $("#inputAkhirEvent").val() == "" && $("#inputNamaKontak").val() == ""
    && $("#inputAlamatEvent").val() =="" && $("#inputKontakEvent").val() =="" ){
        alert("Mohon isi semua field dalam form");
    } else {
        manualUploader.uploadStoredFiles();
    }
});