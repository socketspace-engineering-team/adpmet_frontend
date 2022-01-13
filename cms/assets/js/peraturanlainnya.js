var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'inputperaturanlain',
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
    manualUploader.setParams({
        nama_peraturan: $("#inputNama").val(),
        tentang: $("#inputTentang").val(),
        jenis_peraturan: $("#inputJenis").val(),
    });
    manualUploader.uploadStoredFiles();
    // window.location.reload();
    // if ($("#inputNama").val() == "" && 
    //     $("#inputTentang").val() == "" &&
    //     $("#inputJenis").val() == ""){
    //         alert("Tolong Isi Semua Field Dalam Form")
    // } else {     
    //         alert("Data Berhasil Disimpan");
    //     } 
});