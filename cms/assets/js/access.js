// $(document).ready(function() {
//     const cms_url = window.location.href.split('?')[0];
//     const status_admin = localStorage.getItem('status_admin')
    
//     if(status_admin == 0 || status_admin == null || status_admin == undefined){
//       location.replace(`${domain_name}/page/login.html`);
//     } 
//     if(status_admin == 2 && cms_url !== `${domain_name}/cms/cmsbumdpi.html`){
//         location.replace(`${domain_name}/cms/cmsbumdpi.html`);
//     } 
//     if(status_admin == 3 && cms_url !== `${domain_name}/cms/cmsgeomeet.html`){
//         location.replace(`${domain_name}/cms/cmsgeomeet.html`);
//     } 
//     if(status_admin == 4 && cms_url !== `${domain_name}/cms/cmsdbhlifting.html`){
//         location.replace(`${domain_name}/cms/cmsdbhlifting.html`);
//     }
//     if(status_admin == 5 && cms_url !== `${domain_name}/cms/cmstraining.html`){
//         location.replace(`${domain_name}/cms/cmstraining.html`);
//     }
//     if(status_admin == 6 && !(cms_url == `${domain_name}/cms/cmsberita.html`||cms_url == `${domain_name}/cms/cmsflash.html`)){
//         location.replace(`${domain_name}/cms/cmsberita.html`);
//     }
//   });