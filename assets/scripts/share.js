var newsUrl = window.location.href;
var fbButton = document.getElementById('fb-share-button');
var twButton = document.getElementById('tw-share-button');
var waButton = document.getElementById('wa-share-button');
var liButton = document.getElementById('li-share-button');
var mailButton = document.getElementById('mail-share-button');
var newsUrls = new URL(newsUrl);
var index = newsUrls.searchParams.get("index");
var jdlBerita = newsUrls.searchParams.get("jdl");

var linkedInUrl = `https://adpmet.or.id/berita.html?index%3D${index}`
var gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=ADPMET+News&body='+newsUrl+'&ui=2&tf=1&pli=1';

fbButton.addEventListener('click', function() {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + newsUrl,
        'facebook-share-dialog',
        'width=800,height=600'
    );
    return false;
});

twButton.addEventListener('click', function() {
  window.open('http://twitter.com/share?text=ADPMET NEWS :' + jdlBerita +'&url='+ newsUrl +'&hashtags=ADPMET,ADPMETNEWS,ADPMETINFO'
  );
  return false;
});

waButton.addEventListener('click', function() {
  window.open('https://api.whatsapp.com/send?text=' + newsUrl
  );
  return false;
});

liButton.addEventListener('click', function() {
  window.open('http://www.linkedin.com/shareArticle?mini=true&url='+ linkedInUrl
  );
  return false;
});

mailButton.addEventListener('click', function() {
  window.open(gmailUrl
  );
  return false;
});

