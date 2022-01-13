$( document ).ready(function() {
    $.ajax({
        "type":"GET",
        "url": api_url + "footer",
        "dataType":"json",
        encode:true,
        success:function(data){
          // console.log(data);
          const footerData=data.data;
          $('#footer-sosmed').append(`
            <li>
            <a href="${footerData.instagram_link}" class="text-decoration-none text-dark" target="_blank">
                <i class="fab fa-instagram"></i> 
                ${footerData.instagram_username}
            </a>
            </li>
            <li>
                <a href="${footerData.facebook_link}" class="text-decoration-none text-dark" target="_blank">
                    <i class="fab fa-facebook"></i>
                    ${footerData.facebook_username}
                </a>
            </li>
            <li>
                <a href="${footerData.twitter_link}" target="_blank" class="text-decoration-none text-dark">
                    <i class="fab fa-twitter"></i>
                    ${footerData.twitter_username}
                </a>
            </li>
            <li>
                <a href="${footerData.youtube_link}" target="_blank" class="text-decoration-none text-dark">
                    <i class="fab fa-youtube"></i>
                    ${footerData.youtube_username}
                </a>
            </li>
          `)
          $('#footer-contact').append(`
            <li>
                <a href="#!" class="text-dark text-decoration-none"> 
                    <i class="fab fa-whatsapp"></i> 
                    ${footerData.wa}
                </a>
            </li>
            <li>
                <a href="#!" class="text-dark text-decoration-none"> 
                    <i class="fas fa-phone"></i>
                    ${footerData.no_telpon}
                </a>
            </li>
          `)
          $('#footer-address').append(
              `
                ${footerData.alamat}
              `
          )
        }
      })
});
           
