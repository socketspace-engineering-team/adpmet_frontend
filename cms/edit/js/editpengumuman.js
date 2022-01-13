$( document ).ready(function() {
    var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'update-pengumuman',
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
        id : $("#inputIdPengumuman").val(),
        judul : $("#inputJudulPengumuman").val(),
        isi: document.getElementById('page').innerHTML,
    })
    if ($("#inputJudulPengumuman").val()==""){
        alert("Mohon isi semua field dalam form");
    } else {
        manualUploader.uploadStoredFiles();
    }
});
})