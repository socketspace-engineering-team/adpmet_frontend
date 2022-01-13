console.log('berita ready')

var showDate;
var endDate;
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: api_url + 'inputberita',
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
        $("#inputAuthor").val() == ""){
            alert("Tolong Isi Semua Field Dalam Form")
    } else {
            manualUploader.uploadStoredFiles();
            console.log(manualUploader.uploadStoredFiles())
        } 
});

// $("#trigger-upload").click(function (event) {
//     console.log("CLICKED!")
//     event.preventDefault();
//     var judul = $("#inputJudulBerita").val();
//     var isi = document.getElementById('page').innerHTML;
//     var tanggal = $("#inputTanggalBerita").val();
//     var sumberFoto = $("#inputSumberFoto").val();
//     var file_data = $('#inputGambarBerita').prop('files')[0];
//     var author = $("#inputAuthor").val();
//     var jenis = $("#inputJenisBerita").val();
//     var pin=$("#pin-item-news").is(":checked");
//     var form_data = new FormData();

//     form_data.append('judul', judul);
//     form_data.append('isi', isi);
//     form_data.append('tanggal', tanggal);
//     form_data.append('sumberFoto', sumberFoto);
//     form_data.append('foto', file_data);
//     form_data.append('author', author);
//     form_data.append('jenis', jenis);
//     form_data.append('pin', pin);

//     console.log(pin)
//     $.ajax({
//         url: api_url + 'inputberita',
//         dataType: "json",
//         cache: false,
//         contentType : false,
//         processData: false,
//         async: true,
//         crossDomain: true,
//         type: 'post',
//         data: form_data,
//         // encode: true,
//         success: function(data){
//             console.log(data);
//             console.clear()
//         },
//         error: function (xhr, ajaxOptions, thrownError) {
//             console.log('Error')
//             alert('Data Berhasil Disimpan')
//             window.location.reload();
//         }
//     })
// });