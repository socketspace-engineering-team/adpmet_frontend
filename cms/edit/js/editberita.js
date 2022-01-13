var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'update-berita',
    },
    callbacks: {
        onAllComplete: function() {
            alert('Data Berhasil Disimpan')
            window.location.reload();
        }
    },
    autoUpload: false,
    debug: true,
});
qq(document.getElementById("trigger-upload")).attach("click", function() {

    var pin=$("#pin-item-news").is(":checked");
    console.log(pin);
    manualUploader.setParams({
        id : $("#inputIdBerita").val(),
        judul: $("#inputJudulBerita").val(),
        isi: document.getElementById('page').innerHTML,
        tanggal: $("#inputTanggalBerita").val(),
        sumberFoto: $("#inputSumberFoto").val(),
        author: $("#inputAuthor").val(),
        jenis: $("#inputJenisBerita").val(),
        pin : pin
    });
    
    if ($("#inputJudulBerita").val() == "" && 
        $("#inputTanggalBerita").val() == "" &&
        $("#inputSumberFoto").val() == "" && 
        $("#inputAuthor").val() == "" &&
        $("#inputTanggalBerita").val() == ""){
            alert("Tolong Isi Semua Field Dalam Form")
    } else {
            manualUploader.uploadStoredFiles();
        }
    
});