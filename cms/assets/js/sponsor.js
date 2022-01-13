var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'inputsponsorship',
    },
    callbacks: {
        onAllComplete: function() {
            alert("Data Berhasil Disimpan");
            window.location.reload();
        }
    },
    autoUpload: false,
    debug: true
});
qq(document.getElementById("trigger-upload")).attach("click", function() {
    manualUploader.setParams({
        jenis : $('#inputJenis').val(),
    })
    
    if ($("#inputJenis").val() == ""){
        alert("Mohon isi semua field dalam form");
    } else {
        manualUploader.uploadStoredFiles();
    }
});