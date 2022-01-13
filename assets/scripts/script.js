
(function() {

  'use strict';

  // define variables
  var items = document.querySelectorAll(".timeline li");

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

})();

// Navbar Scroll Function Start 

$(function(){
	var navbar = $('.navbar');
	
	$(window).scroll(function(){
		if($(window).scrollTop() <= 40){
			navbar.removeClass('navbar-scroll');
		} else {
			navbar.addClass('navbar-scroll');
		}
	});
});

// Navbar Scroll Function End

// Social Media Function Start

function btnInstagram(){
    console.log("click");
    $("#pills-instagram-tab").addClass("btn-instagram");
    $('#pills-instagram-tab').removeClass("btn-custom");
    $('#pills-facebook-tab').addClass("btn-custom");
    $('#pills-twitter-tab').addClass("btn-custom");
    $('#pills-facebook-tab').removeClass("btn-facebook");
    $('#pills-twitter-tab').removeClass("btn-twitter");
  }

function btnFacebook(){
    console.log("click");
    $("#pills-facebook-tab").addClass("btn-facebook");
    $('#pills-facebook-tab').removeClass("btn-custom");
    $('#pills-instagram-tab').addClass("btn-custom");
    $('#pills-twitter-tab').addClass("btn-custom");
    $('#pills-instagram-tab').removeClass("btn-instagram");
    $('#pills-twitter-tab').removeClass("btn-twitter");
}

function btnTwitter(){
    console.log("click");
    $("#pills-twitter-tab").addClass("btn-twitter");
    $('#pills-twitter-tab').removeClass("btn-custom");
    $('#pills-instagram-tab').addClass("btn-custom");
    $('#pills-facebook-tab').addClass("btn-custom");
    $('#pills-instagram-tab').removeClass("btn-instagram");
    $('#pills-facebook-tab').removeClass("btn-facebook");
}

// Social Media Function End

// Membership Function Start

function serviceFunction(){
    console.log("click");
    $("#serviceMember").addClass("disabled");
    $('#invoiceMember').removeClass("disabled");
    $('#yourInvoices').addClass("hide");
    $('#yourServices').removeClass("hide");
  }

function invoiceFunction(){
    console.log("click");
    $("#invoiceMember").addClass("disabled");
    $('#serviceMember').removeClass("disabled");
    $('#yourServices').addClass("hide");
    $('#yourInvoices').removeClass("hide");
  }


// Membership Function End

// Section Title Animation Start
var animationDelay = 2500;

animateHeadline($('.sec-title'));

function animateHeadline($headlines) {
   $headlines.each(function(){
      var headline = $(this);
      //trigger animation
      setTimeout(function(){ hideWord( headline.find('.is-visible') ) }, animationDelay);
      //other checks here ...
   });
}

function hideWord($word) {
    var nextWord = takeNext($word);
    switchWord($word, nextWord);
    setTimeout(function(){ hideWord(nextWord) }, animationDelay);
 }
 
 function takeNext($word) {
    return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
 }
 
 function switchWord($oldWord, $newWord) {
    $oldWord.removeClass('is-visible').addClass('is-hidden');
    $newWord.removeClass('is-hidden').addClass('is-visible');
 }

 singleLetters($('.cd-headline.letters').find('b'));

function singleLetters($words) {
   $words.each(function(){
      var word = $(this),
          letters = word.text().split(''),
          selected = word.hasClass('is-visible');
      for (i in letters) {
         letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
      }
      var newLetters = letters.join('');
      word.html(newLetters);
   });
}

// Section Title Animation End


// Pagination Start 

    // Returns an array of maxLength (or less) page numbers
// where a 0 in the returned array denotes a gap in the series.
// Parameters:
//   totalPages:     total number of pages
//   page:           current page
//   maxLength:      maximum size of returned array
function getPageList(totalPages, page, maxLength) {
    if (maxLength < 5) throw "maxLength must be at least 5";
  
    function range(start, end) {
      return Array.from(Array(end - start + 1), (_, i) => i + start);
    }
  
    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
    if (totalPages <= maxLength) {
      // no breaks in list
      return range(1, totalPages);
    }
    if (page <= maxLength - sideWidth - 1 - rightWidth) {
      // no break on left of page
      return range(1, maxLength - sideWidth - 1)
        .concat([0])
        .concat(range(totalPages - sideWidth + 1, totalPages));
    }
    if (page >= totalPages - sideWidth - 1 - rightWidth) {
      // no break on right of page
      return range(1, sideWidth)
        .concat([0])
        .concat(
          range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
        );
    }
    // Breaks on both sides
    return range(1, sideWidth)
      .concat([0])
      .concat(range(page - leftWidth, page + rightWidth))
      .concat([0])
      .concat(range(totalPages - sideWidth + 1, totalPages));
  }
  
  $(function() {
    // Number of items and limits the number of items per page
    var numberOfItems = $("#jar .news-container").length;
    var limitPerPage = 6;
    // Total pages rounded upwards
    var totalPages = Math.ceil(numberOfItems / limitPerPage);
    // Number of buttons at the top, not counting prev/next,
    // but including the dotted buttons.
    // Must be at least 5:
    var paginationSize = 7;
    var currentPage;
  
    function showPage(whichPage) {
      if (whichPage < 1 || whichPage > totalPages) return false;
      currentPage = whichPage;
      $("#jar .news-container")
        .hide()
        .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
        .show();
      // Replace the navigation items (not prev/next):
      $(".pagination li").slice(1, -1).remove();
      getPageList(totalPages, currentPage, paginationSize).forEach(item => {
        $("<li>")
          .addClass(
            "page-item " +
              (item ? "current-page " : "") +
              (item === currentPage ? "active " : "")
          )
          .append(
            $("<a>")
              .addClass("page-link")
              .attr({
                href: "javascript:void(0)"
              })
              .text(item || "...")
          )
          .insertBefore("#next-page");
      });
      return true;
    }
  
    // Include the prev/next buttons:
    $(".pagination").append(
      $("<li>").addClass("page-item").attr({ id: "previous-page" }).append(
        $("<a>")
          .addClass("page-link")
          .attr({
            href: "javascript:void(0)"
          })
          .text("Prev")
      ),
      $("<li>").addClass("page-item").attr({ id: "next-page" }).append(
        $("<a>")
          .addClass("page-link")
          .attr({
            href: "javascript:void(0)"
          })
          .text("Next")
      )
    );
    // Show the page links
    $("#jar").show();
    showPage(1);
  
    // Use event delegation, as these items are recreated later
    $(
      document
    ).on("click", ".pagination li.current-page:not(.active)", function() {
      return showPage(+$(this).text());
    });
    $("#next-page").on("click", function() {
      return showPage(currentPage + 1);
    });
  
    $("#previous-page").on("click", function() {
      return showPage(currentPage - 1);
    });
    $(".pagination").on("click", function() {
      $("html,body").animate({ scrollTop: 0 }, 0);
    });
  });

// Pagination End

// News Filter Start

// Date Filter Start
const filters = document.querySelectorAll('.news-filter');

filters.forEach(filter => { 

  filter.addEventListener('click', function() {

    let selectedFilter = filter.getAttribute('data-filter');
    let itemsToHide = document.querySelectorAll(`.news-list .col-md-4:not([data-filter='${selectedFilter}'])`);
    let itemsToShow = document.querySelectorAll(`.news-list [data-filter='${selectedFilter}']`);

    if (selectedFilter == 'all') {
      itemsToHide = [];
      itemsToShow = document.querySelectorAll('.news-list [data-filter]');
    }

    itemsToHide.forEach(el => {
      el.classList.add('hide-item');
      el.classList.remove('show-item');
    });

    itemsToShow.forEach(el => {
      el.classList.remove('hide-item');
      el.classList.add('show-item'); 
    });

  });
});

// Date Filter End
$(document).ready(function(){
  $("#news-title-input").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".news-list .col-md-4").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});



