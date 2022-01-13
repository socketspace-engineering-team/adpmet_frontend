var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'update-event',
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
        id : $("#inputIdEvent").val(),
        judul : $("#inputJudulEvent").val(),
        eventDate: $("#inputMulaiEvent").val(),
        eventTillDate: $("#inputAkhirEvent").val(),
        deskripsi: document.getElementById('page').innerHTML,
        namaPic: $("#inputNamaKontak").val(),
        alamat: $("#inputAlamatEvent").val(),
        noKontak: $("#inputKontakEvent").val(),
        namaPic: $("#inputPicEvent").val(),
    })
    manualUploader.uploadStoredFiles();
    
});