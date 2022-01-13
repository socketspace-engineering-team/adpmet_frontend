var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'inputartikel',
    },
    validation: {
        allowedExtensions: ['pdf'],
        sizeLimit: 102400000 // 50 kB = 50 * 1024 bytes
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
        judul: $("#inputJudulArtikel").val(),
        isi: document.getElementById('page').innerHTML,
        tanggal: $("#inputTanggalArtikel").val(),
        author: $("#inputAuthor").val(),
        sumber_foto: null,
        foto: null,
        thumbnail_foto: null,
        premium: null
    })
    
    if ($("#inputJudulArtikel").val() == "" && $("#inputTanggalArtikel").val() == "" && $("#inputAuthor").val() == ""){
        alert("Mohon isi semua field pada form");
    } else {
        manualUploader.uploadStoredFiles();
    }
});