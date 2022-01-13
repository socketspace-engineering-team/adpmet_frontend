$( document ).ready(function() {
    console.log( "Membership Ready #@" );
    const status_admin = localStorage.getItem('status_admin');
    if (status_admin && status_admin !== 0){
        $('#adpmetCMS').removeClass("d-none");
    }

    if(localStorage.length == 0){
        location.replace(`${domain_name}`)
    }

    if(status_admin == 2){$("#adpmetCMS").prop("href", `${domain_name}/cms/cmsbumdpi.html`)}
    if(status_admin == 3){$("#adpmetCMS").prop("href", `${domain_name}/cms/cmsgeomeet.html`)}
    if(status_admin == 4){$("#adpmetCMS").prop("href", `${domain_name}/cms/cmsdbhlifting.html`)}
    if(status_admin == 5){$("#adpmetCMS").prop("href", `${domain_name}/cms/cmstraining.html`)}
    if(status_admin == 6){$("#adpmetCMS").prop("href", `${domain_name}/cms/cmsberita.html`)}
    
    $.ajax({
        type: "GET",
        url: api_url + "profile",
        headers:{"Authorization":"Bearer "+localStorage.getItem("access_token")},
        dataType: "json",
        encode: true,
        success: function(data){
            event.preventDefault();
         $("#user_membership").html(`
            <a class="text-decoration-none" href="#"><strong class="text-secondary"></strong><strong>${data.data.name}</strong></a>
         `);
         $("#profile_nama").html(`
            <strong>${data.data.name}</strong></a>
               
        `);
        $("#profile_logout").html(`
            <a id="btn-logout" class="nav-link" href="#"></i>Log Out</a>
        `);
        }
    });

    $.ajax({
        type: "GET",
        url: api_url+"getservice",
        headers:{"Authorization":"Bearer "+localStorage.getItem("access_token")},
        dataType: "json",
        encode: true,
        success: function(data){
            event.preventDefault();
            $("#getService").html(`
            <a class="text-decoration-none" href="#"><strong class="text-secondary"></strong><strong>${data.data.service}</strong></a>
            `);
            // $("#getTanggal").html(`
            //    <a class="text-decoration-none" href="#"><strong class="text-secondary"></strong><strong>${data.data.tanggal_tagihan}</strong></a>
            // `);
            $("#getPenagihan").html(`
            <a class="text-decoration-none" href="#"><strong class="text-secondary"></strong><strong>${data.data.penagihan}</strong></a>
            `);
            $("#getStatus").html(`
            <a class="text-decoration-none" href="#"><strong class="text-secondary"></strong><strong>${data.data.status}</strong></a>
            `);
        }

    });
});