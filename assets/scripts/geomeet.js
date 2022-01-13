  var access_token = localStorage.getItem("access_token");
  if (access_token == null || access_token == undefined) {
    console.log('Login Terlebih Dahulu');
    location.replace(`${domain_name}`);
  }

// GET MOCK_PROVINCE API
for (i = 0; i < MOCK_PROVINCE.length; i++) {
  $("#provinceList").append(
    `
        <li class="list-group-item px-0 py-1 m-0">
            <a href="#" class="text-decoration-none province-filter" data-filter='${MOCK_PROVINCE[i].filter_name}'>
              <img class="province-icons" src="${MOCK_PROVINCE[i].logo_url}" alt="ADPMET_PROVINCE_LIST">      
              <small class="text-capitalize text-secondary">
                    ${MOCK_PROVINCE[i].name}
                </small>
            </a>
        </li>
    `
  );
}

$.ajax({
  type: "GET",
  url: api_url + "geomet-portal",
  dataType: "json",
  encode: true,
  success: function (data) {
    var dataGeomet = data.data;

    // Pagination Start
    // function getPageList(totalPages, page, maxLength) {
    //   if (maxLength < 5) throw "maxLength must be at least 5";

    //   function range(start, end) {
    //     return Array.from(Array(end - start + 1), (_, i) => i + start);
    //   }

    //   var sideWidth = maxLength < 9 ? 1 : 2;
    //   var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
    //   var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1;
    //   if (totalPages <= maxLength) {
    //     return range(1, totalPages);
    //   }
    //   if (page <= maxLength - sideWidth - 1 - rightWidth) {
    //     return range(1, maxLength - sideWidth - 1)
    //       .concat([0])
    //       .concat(range(totalPages - sideWidth + 1, totalPages));
    //   }
    //   if (page >= totalPages - sideWidth - 1 - rightWidth) {
    //     return range(1, sideWidth)
    //       .concat([0])
    //       .concat(
    //         range(
    //           totalPages - sideWidth - 1 - rightWidth - leftWidth,
    //           totalPages
    //         )
    //       );
    //   }
    //   return range(1, sideWidth)
    //     .concat([0])
    //     .concat(range(page - leftWidth, page + rightWidth))
    //     .concat([0])
    //     .concat(range(totalPages - sideWidth + 1, totalPages));
    // }

    // $(function () {
    //   var numberOfItems = $("#jar .news-container").length;
    //   var limitPerPage = 9;
    //   var totalPages = Math.ceil(numberOfItems / limitPerPage);
    //   var paginationSize = 7;
    //   var currentPage;

    //   function showPage(whichPage) {
    //     if (whichPage < 1 || whichPage > totalPages) return false;
    //     currentPage = whichPage;
    //     $("#jar .news-container")
    //       .hide()
    //       .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
    //       .show();

    //     $(".pagination li").slice(1, -1).remove();
    //     getPageList(totalPages, currentPage, paginationSize).forEach((item) => {
    //       $("<li>")
    //         .addClass(
    //           "page-item " +
    //             (item ? "current-page " : "") +
    //             (item === currentPage ? "active " : "")
    //         )
    //         .append(
    //           $("<a>")
    //             .addClass("page-link")
    //             .attr({
    //               href: "javascript:void(0)",
    //             })
    //             .text(item || "...")
    //         )
    //         .insertBefore("#next-page");
    //     });
    //     return true;
    //   }

    //   $(".pagination").append(
    //     $("<li>")
    //       .addClass("page-item")
    //       .attr({ id: "previous-page" })
    //       .append(
    //         $("<a>")
    //           .addClass("page-link")
    //           .attr({
    //             href: "javascript:void(0)",
    //           })
    //           .text("Prev")
    //       ),
    //     $("<li>")
    //       .addClass("page-item")
    //       .attr({ id: "next-page" })
    //       .append(
    //         $("<a>")
    //           .addClass("page-link")
    //           .attr({
    //             href: "javascript:void(0)",
    //           })
    //           .text("Next")
    //       )
    //   );
    //   $("#jar").show();
    //   showPage(1);

    //   $(document).on(
    //     "click",
    //     ".pagination li.current-page:not(.active)",
    //     function () {
    //       return showPage(+$(this).text());
    //     }
    //   );
    //   $("#next-page").on("click", function () {
    //     return showPage(currentPage + 1);
    //   });

    //   $("#previous-page").on("click", function () {
    //     return showPage(currentPage - 1);
    //   });
    //   $(".pagination").on("click", function () {
    //     $("html,body").animate({ scrollTop: 0 }, 0);
    //   });
    // });
    // Pagination End
    // GET dataGeomet API
    for (j = 0; j < dataGeomet.length; j++) {
      var url = new URL(window.location.href);
      // var itemUrl = dataGeomet[j].judul;
      // var itemUrl = itemUrl.replace(/\s+/g, "-");
      $("#itemList").append(`
          <div class="col-md-4 news-container" data-index="${j}" data-filter="${
        dataGeomet[j].provinsi
      }" id="${dataGeomet[j].id}">
              <a class="btn card hvr-grow-shadow" href="${`${domain_name}/geomet.html?index=${j}&id=${dataGeomet[j].id}`}">
                  <div class="card-image-wrapper">
                      <img src="${
                        dataGeomet[j].foto
                      }" class="card-img-top img-fluid" alt="gambar-berita">
                  </div>
                  <div class="card-body">
                      <h6 class="card-title">${dataGeomet[j].judul}</h6>
                  </div>
              </a>
          </div>
          `);
    }
  },
  error: function () {
    console.log("error");
  },
});

// Province Filter
const provinceFilters = document.querySelectorAll(".province-filter");
provinceFilters.forEach((filter) => {
  filter.addEventListener("click", function () {
    let selectedFilter = filter.getAttribute("data-filter");
    let itemsToHide = document.querySelectorAll(
      `.itemList .col-md-4:not([data-filter='${selectedFilter}'])`
    );
    let itemsToShow = document.querySelectorAll(
      `.itemList [data-filter='${selectedFilter}']`
    );

    if (selectedFilter == "all") {
      itemsToHide = [];
      itemsToShow = document.querySelectorAll(".itemList [data-filter]");
    }

    itemsToHide.forEach((el) => {
      el.classList.add("hide-item");
      el.classList.remove("show-item");
    });

    itemsToShow.forEach((el) => {
      el.classList.remove("hide-item");
      el.classList.add("show-item");
    });

    console.log(selectedFilter);
    console.log(itemsToShow.length);
  });
});

// Province Filter End

// Search Input Start
$(document).ready(function () {
  $("#item-title-input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".itemList .col-md-4").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
// Search Input End