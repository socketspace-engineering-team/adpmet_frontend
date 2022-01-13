const status_admin = localStorage.getItem("status_admin");

$("#sidebar-wrapper").append(`
<div class="sidebar-heading border-bottom bg-light"><a href="/" class="text-decoration-none text-dark">ADPMET</a></div>
`)

if (status_admin == 1){
    $('#sidebar-wrapper').append(`
        <div class="list-group list-group-flush">
            <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmsbanner.html">Banners</a>
            <a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link p-3">Service</a>
            <ul class="submenu collapse list-group list-group-flush">
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmsbumdpi.html">BUMD & PI </a></li>
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmsgeomeet.html">GeoMet Portal </a></li>
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmsdbhlifting.html">DBH & Lifting </a> </li>
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmstraining.html">Training </a> </li>
            </ul>
            <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmsberita.html">Berita</a>
            <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmsevent.html">Upcoming Event</a>
            <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmsartikel">Artikel</a>
            <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmsflash.html">Flash News</a>
            <a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link p-3" href="../cmsstruktur.html">Struktur</a>
            <ul class="submenu collapse list-group list-group-flush">
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmsstruktur.html">Dewan Pengurus ADPMET </a></li>
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmsorganigram.html">Organigram </a></li>
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmsanggota.html">Anggota ADPMET </a> </li>
            </ul>
            <a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link p-3" href="#">Visi Misi</a>
            <ul class="submenu collapse list-group list-group-flush">
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmsvisi.html">Visi</a></li>
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmsmisi.html">Misi</a></li>
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmstugas.html">Tugas</a> </li>
            </ul>
            <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmssejarah.html">Sejarah</a>
            <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmsproker.html">Program Kerja</a>
            <a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link p-3" href="#">Repository</a>
            <ul class="submenu collapse list-group list-group-flush">
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmsundangundang.html">Undang-Undang</a></li>
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmsperaturanlain.html">Peraturan Lainnya</a></li>
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmsreferensi.html">Referensi</a></li>
                <li><a class="list-group-item list-group-item-action list-group-item-light has-submenu nav-link" href="../cmspengumuman.html">Pengumuman</a></li>
            </ul>
            <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmssponsor.html">Sponsor</a>
            <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmsmember.html">Membership</a>
            <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmsfooter.html">Footer</a>
        </div>
    `)
}

if (status_admin == 2) {
  $("#sidebar-wrapper").append(`
        <div class="list-group list-group-flush">
            <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmsbumdpi.html">BUMD & PI </a>
        </div>
    `);
}

if(status_admin == 3){
    $("#sidebar-wrapper").append(`
        <div class="list-group list-group-flush">
            <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmsgeomeet.html">GeoMet Portal </a>
        </div>
    `);
}

if(status_admin == 4){
    $("#sidebar-wrapper").append(`
    <div class="list-group list-group-flush">
        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmsdbhlifting.html">DBH & Lifting </a> 
    </div>
    `)
}

if(status_admin == 5){
    $('#sidebar-wrapper').append(`
    <div class="list-group list-group-flush">
        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmstraining.html">Training </a> 
    </div>
    `)
}

if(status_admin == 6){
    $('#sidebar-wrapper').append(`
    <div class="list-group list-group-flush">
        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmsberita.html">Berita</a>
        <a class="list-group-item list-group-item-action list-group-item-light p-3" href="../cmsflash.html">Flash News</a>
    </div>
    `)
}