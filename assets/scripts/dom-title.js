console.log('ready')

    var url_string = window.location.href;
    var url_berita = new URL(url_string);
    var judul = url_berita.searchParams.get("jdl");
    var url_judul = judul.replaceAll("-"," ");
    console.log(url_string);
    console.log(url_judul);
    document.title= "ADPMET - Berita -" + url_judul;
    