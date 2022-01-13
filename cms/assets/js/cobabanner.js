var upload_endpoint = api_url + 'inputbanner';
var uploader = new qq.FineUploader({
    debug: true,
    element: document.getElementById('uploader'),
    request : {
        endpoint: upload_endpoint+'/',
        params : {
            bannerShowDate : $("#bannerShowDate").val(),
            bannerEndDate: $("#bannerEndDate").val(),
        }
    },
    objectProperties: {
        key: function(fileId){
            return '12345/';
        }
    }
})