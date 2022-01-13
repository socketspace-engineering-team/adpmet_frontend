const monthNamesFull = [
  "Januari",
  "Februari",
  "March",
  "April",
  "May",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
const dateObj = new Date();
let startMonth = dateObj.getMonth() - 1;
let nextFourMonth = startMonth + 3;
var monthList = [];

// MARI KITA HANDLE BULANNYA
for (startMonth; startMonth <= nextFourMonth; startMonth++) {
  monthList.push(monthNamesFull[(startMonth, startMonth % 12)]);
}

$.ajax({
  type: "GET",
  url: api_url + "training",
  dataType: "json",
  encode: true,
  success: function (data) {
    var dataTraining = data.data;
    var bulanSatu = [];
    var bulanDua = [];
    var bulanTiga = [];
    var bulanEmpat = [];
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

    // GET dataTraining API
    for (j = 0; j < dataTraining.length; j++) {
      var url = new URL(window.location.href);

      var dateTime = dataTraining[j].tanggal;
      var newDate = new Date(dateTime);
      dataTraining[j].tanggal_bulan = newDate.getDate() + "-" + monthNames[newDate.getMonth()];
      dataTraining[j].bulan = monthNamesFull[newDate.getMonth()];
      dataTraining[j].hari = parseInt(newDate.getDate());
      if (monthList.includes(dataTraining[j].bulan)) {
        if (monthList[0] == dataTraining[j].bulan) {
          bulanSatu.push(dataTraining[j].hari);
          dataTraining[j].filter = `bulan1${dataTraining[j].hari}`
        } else if (monthList[1] == dataTraining[j].bulan) {
          bulanDua.push(dataTraining[j].hari);
          dataTraining[j].filter = `bulan2${dataTraining[j].hari}`
        } else if (monthList[2] == dataTraining[j].bulan) {
          bulanTiga.push(dataTraining[j].hari);
          dataTraining[j].filter = `bulan3${dataTraining[j].hari}`
        } else if (monthList[3] == dataTraining[j].bulan) {
          bulanEmpat.push(dataTraining[j].hari);
          dataTraining[j].filter = `bulan4${dataTraining[j].hari}`;
        }
      }
      
      
      $("#itemList").append(`
          <div class="col-md-4 news-container" data-index="${j}" data-filter="${
        dataTraining[j].filter
      }" id="${dataTraining[j].id}">
              <a class="btn card hvr-grow-shadow" href="${`${domain_name}/training.html?index=${j}&id=${dataTraining[j].id}`}">
                  <div class="card-image-wrapper">
                      <img src="${
                        dataTraining[j].foto
                      }" class="card-img-top img-fluid" alt="gambar-berita">
                  </div>
                  <div class="card-body">
                      <h6 class="card-title">${dataTraining[j].judul}</h6>
                  </div>
              </a>
          </div>
          `);
    }
    bulanSatu.sort(function(a,b){
      return a - b
    })
    bulanDua.sort(function(a,b){
      return a - b
    })
    bulanTiga.sort(function(a,b){
      return a - b
    })
    bulanEmpat.sort(function(a,b){
      return a - b
    })
    // MARI KITA APPEND 4 Bulan Kedepan

    for (m = 0; m < monthList.length; m++) {
    $("#months-list").append(`
    <li>
      <span class="btn text-decoration-none text-dark" data-bs-toggle="collapse" href="#bulan${m+1}" role="button" aria-expanded="false" aria-controls="bulan${m+1}" id="months-filter${m+1}" data-filter=${monthList[m]}>${monthList[m]}</span>
    </li>
    <div class="collapse multi-collapse bg-light" id="bulan${m+1}">
      
    </div>
  `);
    }
    for (d = 0; d < bulanSatu.length; d++) {
      $('#bulan1').append(`
        <li><a href="#" class="ms-3 text-secondary btn date-month" data-filter="bulan1${bulanSatu[d]}">${bulanSatu[d]}</a></li>
      `)
    }
    for (d = 0; d < bulanDua.length; d++){
      $('#bulan2').append(`
        <li><a href="#" class="ms-3 text-secondary btn date-month" data-filter="bulan2${bulanDua[d]}">${bulanDua[d]}</a></li>
      `)
    }
    for (d = 0; d < bulanTiga.length; d++){
      $('#bulan3').append(`
        <li><a href="#" class="ms-3 text-secondary btn date-month" data-filter="bulan3${bulanTiga[d]}">${bulanTiga[d]}</a></li>
      `)
    }
    for (d = 0; d < bulanEmpat.length; d++){
      $('#bulan4').append(`
        <li><a href="#" class="ms-3 text-secondary btn date-month" data-filter="bulan4${bulanEmpat[d]}">${bulanEmpat[d]}</a></li>
      `)
    }
    const provinceFilters = document.querySelectorAll(".date-month");
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
  },
  error: function () {
    console.log("error");
  },
});

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
