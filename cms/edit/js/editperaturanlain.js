console.log("test")
var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'update-peraturanlain',
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
    debug: true,
});
qq(document.getElementById("trigger-upload")).attach("click", function() {
    alert('clicked')
    manualUploader.setParams({
        id : $("#inputId").val(),
        nama_peraturan: $("#inputNama").val(),
        tentang: $("#inputTentang").val(),
        jenis_peraturan: $("#inputJenis").val(),
    });
    if ($("#inputNama").val() == "" && 
        $("#inputTentang").val() == "" &&
        $("#inputJenis").val() == ""){
            alert("Tolong Isi Semua Field Dalam Form")
    } else {
            manualUploader.uploadStoredFiles();
        } 
});