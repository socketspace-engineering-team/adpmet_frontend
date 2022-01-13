var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'inputbanner',
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
        showBannerDate: $("#bannerShow").val(),
        showBannerEnd: $("#bannerEnd").val(),
    });
    if ($("#bannerShow").val() == "" && $("#bannerEnd").val() == ""){
        alert("Tolong Isi Semua Field Dalam Form")
    } else {
        manualUploader.uploadStoredFiles();
    }
});
