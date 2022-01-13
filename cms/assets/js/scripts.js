/*!
* Start Bootstrap - Simple Sidebar v6.0.0 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

// Token Login Function
var tokenLogin = (function() {
  if(localStorage.access_token === undefined){
    location.replace("https://adpmet.or.id/page/login.html");
  }
});

window.addEventListener('DOMContentLoaded', event => {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll('.list-group .nav-link').forEach(function(element){
    
    element.addEventListener('click', function (e) {

      let nextEl = element.nextElementSibling;
      let parentEl  = element.parentElement;	

        if(nextEl) {
            e.preventDefault();	
            let mycollapse = new bootstrap.Collapse(nextEl);
            
            if(nextEl.classList.contains('show')){
              mycollapse.hide();
            } else {
                mycollapse.show();
                // find other submenus with class=show
                var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
                // if it exists, then close all of them
                if(opened_submenu){
                  new bootstrap.Collapse(opened_submenu);
                }
            }
        }
    }); // addEventListener
  }) // forEach
}); 
// DOMContentLoaded  end

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#banner')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function readURLBerita(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#thumbBerita')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function readURLEvent(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#thumbEvent')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function readURLArtikel(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#thumbArtikel')
                .attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

var ghostEditor = {
    bindEvents: function() {
      this.bindDesignModeToggle();
      this.bindToolbarButtons();
    },
  
    bindDesignModeToggle: function() {
      $('#page-content').on('click', function(e) {
        document.designMode = 'on';
      });
  
      $('#page-content').on('click', function(e) {
        var $target = $(e.target);
  
        if ($target.is('#page-content')) {
          document.designMode = 'off';
        }
      });
    },
  
    bindToolbarButtons: function() {
      $('#toolbar').on('mousedown', '.icon', function(e) {
        e.preventDefault();
        var btnId = $(e.target).attr('id');
        this.editStyle(btnId);
      }.bind(this));
    },
  
    editStyle: function(btnId) {
      var value = null;
  
      if (btnId === 'createLink') {
        if (this.isSelection()) value = prompt('Enter a link:');
      }
  
      document.execCommand(btnId, true, value);
    },
  
    isSelection: function() {
      var selection = window.getSelection();
      return selection.anchorOffset !== selection.focusOffset
    },
  
    init: function() {
      this.bindEvents();
    },
  }
  
  ghostEditor.init();
  
  $("#logoutCms").click(function (event) {
    localStorage.clear();
    location.replace(`${domain_name}/page/login.html`);
  });


