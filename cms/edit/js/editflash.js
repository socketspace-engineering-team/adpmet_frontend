var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'update-flash',
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
    var pin=$("#pin-item").is(":checked");
    console.log(pin);
    manualUploader.setParams({
        id : $("#inputIdFlash").val(), 
        judul: $("#inputJudulFlash").val(),
        sumberFoto: $("#inputSumberFoto").val(),
        author: $("#inputAuthor").val(),
        isi: document.getElementById('page').innerHTML,
        tanggal : $('#inputTanggalFlash').val(),
        premium : pin,
    })
    if ($("#inputJudulFlash").val() == "" && $("#inputSumberFlash").val() == "" 
    && $("#inputAuthorFlash").val() == "" && $('#inputTanggalFlash').val() ==""){
        alert("Mohon isi semua field dalam form");
    } else {
        manualUploader.uploadStoredFiles();
    }
});