function createNode(element) {
  return document.createElement(element);
}

console.log("Last Updated 13/12/2021");

function append(parent, el) {
  return parent.appendChild(el);
}

const endPointBanner = "banner";
const endPointBerita = "berita";
const endPointEvent = "event";
const endPointViewNews = "view_news";
const endPointArtikel = "artikel";
const endPointFlash = "flash";
const endPointSponsor = "sponsorship";

fetch(api_url + endPointSponsor)
  .then((resp) => resp.json())
  .then(function (data) {
    let sponsor = data.data;
    for (i = 0; i < sponsor.length; i++) {
      if (sponsor[i].jenis == 0) {
        $("#sponsor-utama").append(
          `<div class="sponsor-logo col text-center">
          <img src=${sponsor[i].gambar} alt="" class="w-50 mb-2">
        </div>`
        );
      } else {
        $("#sponsor-lain").append(
          `<div class="sponsor-logo col">
          <img src=${sponsor[i].gambar} alt="" class="w-50 text-center">
        </div>`
        );
      }
    }
  })
  .catch(function (error) {
    console.log(error);
  });

// Banners Slider
fetch(api_url + endPointBanner)
  .then((resp) => resp.json())
  .then(function (data) {
    let banners = data.data;
    for (i = 0; i < banners.length; i++) {
      if (i == 0) {
        $("#banners").append(
          `<div class="carousel-item active" data-bs-interval="5000">
            <img src=${banners[i].gambar} class="d-block w-100" alt="...">
        </div>`
        );
      } else {
        $("#banners").append(
          `<div class="carousel-item" data-bs-interval="5000">
            <img src=${banners[i].gambar} class="d-block w-100" alt="...">
        </div>`
        );
      }
    }
  })
  .catch(function (error) {
  });

// Banners CMS
fetch(api_url + endPointBanner)
  .then((resp) => resp.json())
  .then(function (data) {
    let banners = data.data;
    for (i = 0; i < banners.length; i++) {
      var dateTimeStart = banners[i].banner_show_date;
      var newDateStart = new Date(dateTimeStart);
      var dateTimeEnd = banners[i].banner_end_date;
      var newDateEnd = new Date(dateTimeEnd);

      var dateTimeUpl = banners[i].tanggal;
      var newDateUpl = new Date(dateTimeUpl);
      $("#bannerDataList").append(
        `<tr>
        <th scope="row">${banners[i].id}</th>
        <td class="w-25">
          <img src="${
            banners[i].gambar
          }" class="img-fluid img-thumbnail" alt="Sheep">
        </td>
        <td class="text-capitalize">${
          monthNames[newDateStart.getMonth()] +
          " " +
          newDateStart.getDate() +
          "," +
          " " +
          newDateStart.getFullYear()
        }</td>
        <td class="text-capitalize">${
          monthNames[newDateEnd.getMonth()] +
          " " +
          newDateEnd.getDate() +
          "," +
          " " +
          newDateEnd.getFullYear()
        }</td>
        <td class="text-capitalize">${
          monthNames[newDateUpl.getMonth()] +
          " " +
          newDateUpl.getDate() +
          "," +
          " " +
          newDateUpl.getFullYear()
        }</td>
        <td><a id="deleteBanner${banners[i].id}" data-id="${
          banners[i].id
        }" href="#"><i class="far fa-trash-alt"></i></a></td>
      </tr>`
      );
      $(`#deleteBanner${banners[i].id}`).click(function (event) {
        var thisBannerId = $(this).data("id");
        console.log(thisBannerId);
        var formData = {
          bannerId: thisBannerId,
        };

        $.ajax({
          type: "DELETE",
          url: api_url + "deletebanner",
          data: formData,
          headers: { Authorization: "Bearer " },
          dataType: "json",
          encode: true,
          success: function (data) {
            alert("Data Berhasil Dihapus");
            window.location.reload();
            event.preventDefault();
            console.log(data);
            console.log(formData);
          },
        });
      });
    }
  })
  .catch(function (error) {
    // console.log(error);
  });

// Main Artikel
fetch(api_url + endPointArtikel)
  .then((resp) => resp.json())
  .then(function (data) {
    // console.log(fetch)
    let artikelData = data.data;
    var url = new URL(window.location.href);
    var dateTimeArtikel = artikelData[0].tanggal;
    var newDate = new Date(dateTimeArtikel);
    let articleUrl = artikelData[0].judul;
    articleUrl = articleUrl.replace(/\s+/g, "-");
    $("#leftArticle").append(
      `<div class="row">
      <div class="col text-muted mt-2 artikelAuthor">
        <h6>Penulis : ${artikelData[0].author}</h6>
      </div>
      <div class="col text-muted mt-2 artikelDate">
        <h6 class="text-capitalize">${
          monthNames[newDate.getMonth()] +
          " " +
          newDate.getDate() +
          "," +
          " " +
          newDate.getFullYear()
        }</h6>
      </div>
      <div class="row artikelJudul">
        <h4>${artikelData[0].judul}</h4>
      </div>
    </div>
    <div class="container">
    <div class="article-content text-center mt-3">
        <p class="text-justified">
        ${artikelData[0].isi}                     
        </p>
    </div>
    </div>
    <hr>
      <div>
        <a href="${
          `https://` +
          url.hostname +
          `/artikel/${artikelData[0].id}/${articleUrl}/?index=${0}&id=${
            artikelData[0].id
          }`
        }" class="btn btn-sm btn-custom rounded-pill article-main-click mb-2" data-index="${[
        0,
      ]}">Selengkapnya</a>
      </div>
    `
    );
  })
  .catch(function (error) {
    // console.log(error);
  });

// Artikel List
fetch(api_url + endPointArtikel)
  .then((resp) => resp.json())
  .then(function (data) {
    let articleData = data.data;
    var url = new URL(window.location.href);
    // console.log(newsData.length)
    for (i = 0; i < articleData.length; i++) {
      var dateTime = articleData[i].tanggal;
      var newDate = new Date(dateTime);
      let articleUrl = articleData[i].judul;
      articleUrl = articleUrl.replace(/\s+/g, "-");
      // console.log(newDate)
      $("#articleList").append(
        `<li class="list-group-item">
      <ul class="list-unstyled sub-article text-black">
          <li><span class="article-title">Judul : </span><a class="text-decoration-none" href=${
            `https://` + url.hostname + `/artikel.html?index=${i}`
          }>${articleData[i].judul}</a></li>
          <li><span class="article-title">Penulis : </span> ${
            articleData[i].author
          }</li>
      </ul>
      <div class="row mt-2">
          <div class="col text-start">
              <a class="btn btn-sm btn-custom rounded-pill" data-index="${[
                i,
              ]}" href="${
          `https://` +
          url.hostname +
          `/artikel/${articleData[i].id}/${articleUrl}/?index=${i}&id=${articleData[i].id}`
        }" }>Detail</a>
          </div>
          <div class="col text-end text-gray text-capitalize">
              ${
                monthNames[newDate.getMonth()] +
                " " +
                newDate.getDate() +
                "," +
                " " +
                newDate.getFullYear()
              }
          </div>
      </div>
      </li>`
      );
      // $(document).on('ready', function() {

      // });
    }
    $(".article-list-click").click(function () {
      // alert($(this).data('index'));
      // console.log($(this).data('index'))
      var x = $(this).data("index");
      var url = new URL(window.location.href);
      // console.log(url.hostname)
      window.location.href =
        `https://` + url.hostname + `/artikel.html?index=${i}`;
      // console.log(x)
    });
  });

// Top Artikel
fetch(api_url + endPointArtikel)
  .then((resp) => resp.json())
  .then(function (data) {
    let articleData = data.data;

    // console.log(newsData.length)
    for (i = 0; i < 1; i++) {
      var url = new URL(window.location.href);
      var dateTime = articleData[i].tanggal;
      var newDate = new Date(dateTime);
      let articleUrl = articleData[i].judul;
      articleUrl = articleUrl.replace(/\s+/g, "-");
      // console.log(newDate)
      $("#topArticle").append(
        `<div class="card top-news">
      <div class="row mx-0">
          <div class="col mx-0">
              <div class="card-body">
                  <div class="top-news-title">
                  <h6 class ="fw-bolder">Artikel Terkini</h6>
                        <a href="${
                          `https://` +
                          url.hostname +
                          `/artikel/${articleData[i].id}/${articleUrl}/?index=${i}&id=${articleData[i].id}`
                        }" class="text-decoration-none text-dark article-title-click" data-index="${[
          i,
        ]}">
                           <h6>"${articleData[i].judul}"</h6>
                        </a>
                  </div>
                  <div class="news_postdate">
                      <span class ="text-capitalize">${
                        monthNames[newDate.getMonth()] +
                        " " +
                        newDate.getDate() +
                        "," +
                        " " +
                        newDate.getFullYear()
                      }</span>
                  </div>
              </div>
          </div>
      </div>
  </div>`
      );
    }
  });

// Isi Artikel
fetch(api_url + endPointArtikel)
  .then((resp) => resp.json())
  .then(function (data) {
    var url = new URL(window.location.href);
    var index = url.searchParams.get("index");
    let articleData = data.data;
    var dateTime = articleData[index].tanggal;
    var newDate = new Date(dateTime);
    // console.log(articleData[index])
    $("#articleItemTitle").append(
      `
        ${articleData[index].judul}
      `
    );
    $("#articleItemDate").append(
      `
      ${
        monthNames[newDate.getMonth()] +
        " " +
        newDate.getDate() +
        "," +
        " " +
        newDate.getFullYear()
      }
      `
    );
    $("#articleItemContent").append(
      `
      <p class="text-justified mb-4">
      ${articleData[index].isi}
      </p>
      <a href = ${articleData[index].artikel_url} target = "_blank" class="btn btn-sm btn-custom rounded-pill"> Selengkapnya </a>
      `
    );
    for (i = 0; i < 5; i++) {
      let articleUrl = articleData[i].judul;
      articleUrl = articleUrl.replace(/\s+/g, "-");
      $("#articleItemList").append(
        `
      <li class="list-group-item text-center">
          <ul class="list-unstyled sub-article">
            <li><a class="text-decoration-none" href="${
              `https://` +
              url.hostname +
              `/artikel/${articleData[i].id}/${articleUrl}/?index=${i}&id=${articleData[i].id}`
            }" >${articleData[i].judul}<a/></li>
          </ul>
      </li>
      `
      );
    }
  })
  .catch(function (error) {
    // console.log(error);
  });

// Artikel CMS
fetch(api_url + endPointArtikel)
  .then((resp) => resp.json())
  .then(function (data) {
    // console.log(fetch)
    let artikelData = data.data;
    for (i = 0; i < artikelData.length; i++) {
      var dateTimeArtikel = artikelData[i].tanggal;
      var newDate = new Date(dateTimeArtikel);
      var url = new URL(window.location.href);

      // <a href="#"><i class="fas fa-eye"></i></a></td>
      $("#artikelDataList").append(
        `<tr>
        <th scope="row">${artikelData[i].id}</th>
        <td class="text-capitalize">${artikelData[i].judul}</td>
        <td class="text-capitalize">${
          monthNames[newDate.getMonth()] +
          " " +
          newDate.getDate() +
          "," +
          " " +
          newDate.getFullYear()
        }</td>
        <td class="text-capitalize">${artikelData[i].author}</td>
        <td>
        <a href="#" id="deleteArtikel${artikelData[i].id}" data-id="${
          artikelData[i].id
        }"><i class="far fa-trash-alt"></i></a>
        <a href="${
          `https://` + url.hostname + `/cms/edit/cmsartikeledit.html?index=${i}`
        }"><i class="far fa-edit"></i></a>
      </tr>`
      );
      $(`#deleteArtikel${artikelData[i].id}`).click(function (event) {
        console.log("CLICKED!");
        var thisArticleId = $(this).data("id");
        console.log(thisArticleId);
        var formData = {
          artikelId: thisArticleId,
        };
        console.log(formData);

        $.ajax({
          type: "DELETE",
          url: api_url + "deleteartikel",
          data: formData,
          headers: { Authorization: "Bearer " },
          dataType: "json",
          encode: true,
          success: function (data) {
            alert("Data Berhasil Dihapus");
            window.location.reload();
            event.preventDefault();
            console.log(data);
            console.log(formData);
          },
        });
      });
    }
  })
  .catch(function (error) {
    // console.log(error);
  });

// Artikel CMS Edit
fetch(api_url + endPointArtikel)
  .then((resp) => resp.json())
  .then(function (data) {
    // console.log(fetch)
    let artikelData = data.data;
    var url = new URL(window.location.href);
    var index = url.searchParams.get("index");
    var dateTime = artikelData[index].tanggal;
    var newDate = new Date(dateTime);
    var articleMonth = ("0" + (newDate.getMonth() + 1)).slice(-2);
    var articleDate = ("0" + (newDate.getDate() + 1)).slice(-2);
    $("#editIdArtikel").append(
      `
    <label class="form-label">Judul Artikel</label>
    <input type="text" class="form-control" id="inputIdArtikel" value="${artikelData[index].id}" disabled>
    `
    );
    $("#editJudulArtikel").append(
      `
    <label class="form-label">Judul Artikel</label>
    <input type="text" class="form-control" id="inputJudulArtikel" value="${artikelData[index].judul}" required>
    `
    );
    $("#editSumberFotoArtikel").append(
      `
    <label class="form-label">Sumber Foto</label>
    <input type="text" class="form-control" value="${artikelData[index].sumber_foto}" id="inputSumberFoto" required>
    `
    );
    $("#editAuthorArtikel").append(
      `
    <label class="form-label">Author</label>
    <input type="text" class="form-control" value="${artikelData[index].author}" id="inputAuthor" required>
    `
    );
    $(".myArticle").append(
      `
      ${artikelData[index].isi}
    `
    );
    $("#editTanggalArtikel").append(
      `
      <label class="form-label">Tanggal Artikel</label>
      <input type="date" class="form-control" value="${
        newDate.getFullYear() + "-" + articleMonth + "-" + articleDate
      }" id="inputTanggalArtikel" required>
    `
    );
    $("#editPDFArtikel").append(
      `
    <label for="pdfArticle" class="form-label">Input File PDF</label>
    <input type="file" class="form-control-file" id="pdfArticle">
    `
    );
  })
  .catch(function (error) {
    // console.log(error);
  });

// Berita
fetch(api_url + endPointBerita)
  .then((resp) => resp.json())
  .then(function (data) {
    let newsData = data.data;
    // console.log(newsData.length)
    for (i = 0; i < newsData.length; i++) {
      var dateTime = newsData[i].tanggal;
      var newDate = new Date(dateTime);
      let newsUrl = newsData[i].judul;
      newsUrl = newsUrl.replace(/\s+/g, "-");
      var url = new URL(window.location.href);
      // console.log(newDate)
      if (newsData[i].premium == 0) {
        $("#newsData").append(
          `<div class="news-item">
        <div class="news_box">
            <div class="newsimg" style="width: 100%; display: inline-block;"><img class="img-responsive" src="${
              newsData[i].foto
            }" alt=""></div>
            <div class="news-content">
                <div class="news_postdate">
                    <span class="text-capitalize">${
                      monthNames[newDate.getMonth()] +
                      " " +
                      newDate.getDate() +
                      "," +
                      " " +
                      newDate.getFullYear()
                    } </span>
                </div>
                
                <div class="news-title">
                    <a href="${
                      `https://` +
                      url.hostname +
                      `/berita/${newsData[i].id}/${newsUrl}/?index=${i}&id=${newsData[i].id}`
                    }" class="text-decoration-none news-title-click" data-index="${[
            i,
          ]}" data-id="${newsData[i].id}" id="thisNews${newsData[i].id}">
                        <h3>"${newsData[i].judul}"</h3>
                    </a>
                </div>
                <div class="news_authorinfo text-decoration-none">
                    <span><i class="fas fa-share"></i>${
                      newsData[i].jumlah_share
                    }</span>
                    <span><i class="far fa-eye"></i>${
                      newsData[i].jumlah_view
                    }</span>
                </div>
            </div>
        </div>
      </div>`
        );
      }
    }

    $(".autoplay").slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      // autoplaySpeed: 2000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 3,
            infinite: false,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  })
  .catch(function (error) {
    // console.log(error);
  });

// Top Berita
fetch(api_url + endPointBerita)
  .then((resp) => resp.json())
  .then(function (data) {

    let newsData = data.data;
    const pinnedNews = [];
    const unPinnedNews = [];
    const pinnedPremium = [];
    const unPinnedPremium = [];
    
    for (i = 0; i < newsData.length; i++) {
      let newsUrl = newsData[i].judul;
      newsUrl = newsUrl.replace(/\s+/g, "-");

      if (newsData[i].pinned == 1 || newsData[i].pinned == "true"){
        newsData[i].pinned = 'true';
      } else {
        newsData[i].pinned = 'false';
      }
      newsData[i].index = i;
      var dateTime = newsData[i].tanggal;
      newsData[i].tanggal = new Date(dateTime);
      var url = new URL(window.location.href);

      if (newsData[i].premium == 0 && newsData[i].pinned == "true") {
        pinnedNews.push(newsData[i]);
      } else if (newsData[i].premium == 0 && newsData[i].pinned !== "true") {
        unPinnedNews.push(newsData[i]);
      } else if (newsData[i].premium == 1 && newsData[i].pinned == "true"){
        pinnedPremium.push(newsData[i]);
      } else if (newsData[i].premium == 1 && newsData[i].pinned !== "true"){
        unPinnedPremium.push(newsData[i])
      }
    }

    if (pinnedNews.length !== 0) {
      let newsUrl = pinnedNews[0].judul;
      newsUrl = newsUrl.replace(/\s+/g, "-");
      $("#topNews").append(
        `
        <div class="card top-news">
          <div class="card-body">
            <div class="top-news-title">
              <h6 class="fw-bolder"><i class="text-secondary fas fa-thumbtack"></i> Berita</h6>
            </div>
            <a class="text-decoration-none text-dark top-news-click" href="${`https://`+url.hostname +`/berita/${pinnedNews[0].id}/${newsUrl}/?index=${pinnedNews[0].index}&id=${pinnedNews[0].id}`}">
              <h6>"${pinnedNews[0].judul}"</h6>
            </a>
              <div class="news_postdate">
                <span class ="text-capitalize">${monthNames[pinnedNews[0].tanggal.getMonth()] +" " +pinnedNews[0].tanggal.getDate() +","+" "+pinnedNews[0].tanggal.getFullYear()}</span>
              </div>
          </div>
        </div>
        `
      );
    }
    
    // Unpinned Top news Logic 
    if (unPinnedNews.length !== 0) {
      let newsUrl = unPinnedNews[0].judul;
      newsUrl = newsUrl.replace(/\s+/g, "-");
      $('#topNews').append(
      `
        <div class="card top-news">
          <div class="card-body">
            <div class="top-news-title">
              <h6 class="fw-bolder">Berita Terkini</h6>
            </div>
            <a class="text-decoration-none text-dark top-news-click" href="${`https://`+url.hostname +`/berita/${unPinnedNews[0].id}/${newsUrl}/?index=${unPinnedNews[0].index}&id=${unPinnedNews[0].id}`}">
              <h6>"${unPinnedNews[0].judul}"</h6>
            </a>
              <div class="news_postdate">
                <span class ="text-capitalize">${monthNames[unPinnedNews[0].tanggal.getMonth()] +" " +unPinnedNews[0].tanggal.getDate() +","+" "+unPinnedNews[0].tanggal.getFullYear()}</span>
              </div>
          </div>
        </div>
        `
      );
    }

    // Premium News Top News Logic 
    if (pinnedPremium.length !== 0) {
      let newsUrl = pinnedPremium[0].judul;
      newsUrl = newsUrl.replace(/\s+/g, "-");
      $('#topNewsPremium').append(`
        <div class="card top-news">
          <div class="card-body">
            <div class="top-news-title">
              <h6 class="fw-bolder"><i class="text-secondary fas fa-thumbtack"></i> Berita <span class="badge bg-warning text-dark">Premium</span></h6>
            </div>
            <a class="text-decoration-none text-dark top-news-click" href="${`https://`+url.hostname +`/berita/${pinnedPremium[0].id}/${newsUrl}/?index=${pinnedPremium[0].index}&id=${pinnedPremium[0].id}`}">
              <h6>"${pinnedPremium[0].judul}"</h6>
            </a>
              <div class="news_postdate">
                <span class ="text-capitalize">${monthNames[pinnedPremium[0].tanggal.getMonth()] +" " +pinnedPremium[0].tanggal.getDate() +","+" "+pinnedPremium[0].tanggal.getFullYear()}</span>
              </div>
          </div>
        </div>
      `)

    // UnPinned Premium Top News Logic 
    } else if (pinnedPremium.length == 0) {
      let newsUrl = unPinnedPremium[0].judul;
      newsUrl = newsUrl.replace(/\s+/g, "-");

      $('#topNewsPremium').append(`
        <div class="card top-news">
          <div class="card-body">
            <div class="top-news-title">
              <h6 class="fw-bolder">Berita <span class="badge bg-warning text-dark">Premium</span></h6>
            </div>
            <a class="text-decoration-none text-dark top-news-click" href="${`https://`+url.hostname +`/berita/${unPinnedPremium[0].id}/${newsUrl}/?index=${unPinnedPremium[0].index}&id=${unPinnedPremium[0].id}`}">
              <h6>"${unPinnedPremium[0].judul}"</h6>
            </a>
              <div class="news_postdate">
                <span class ="text-capitalize">${monthNames[unPinnedPremium[0].tanggal.getMonth()] +" " +unPinnedPremium[0].tanggal.getDate() +","+" "+unPinnedPremium[0].tanggal.getFullYear()}</span>
              </div>
          </div>
        </div>
      `)
    }
  })

  .catch(function (error) {
    // console.log(error);
  });

// List Berita
fetch(api_url + endPointBerita)
  .then((resp) => resp.json())
  .then(function (data) {
    let newsData = data.data;
    // Pagination Start
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
            range(
              totalPages - sideWidth - 1 - rightWidth - leftWidth,
              totalPages
            )
          );
      }
      // Breaks on both sides
      return range(1, sideWidth)
        .concat([0])
        .concat(range(page - leftWidth, page + rightWidth))
        .concat([0])
        .concat(range(totalPages - sideWidth + 1, totalPages));
    }

    $(function () {
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
        getPageList(totalPages, currentPage, paginationSize).forEach((item) => {
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
                  href: "javascript:void(0)",
                })
                .text(item || "...")
            )
            .insertBefore("#next-page");
        });
        return true;
      }

      // Include the prev/next buttons:
      // Pagination End
      $(".pagination").append(
        $("<li>")
          .addClass("page-item")
          .attr({ id: "previous-page" })
          .append(
            $("<a>")
              .addClass("page-link")
              .attr({
                href: "javascript:void(0)",
              })
              .text("Prev")
          ),
        $("<li>")
          .addClass("page-item")
          .attr({ id: "next-page" })
          .append(
            $("<a>")
              .addClass("page-link")
              .attr({
                href: "javascript:void(0)",
              })
              .text("Next")
          )
      );
      // Show the page links
      $("#jar").show();
      showPage(1);

      // Use event delegation, as these items are recreated later
      $(document).on(
        "click",
        ".pagination li.current-page:not(.active)",
        function () {
          return showPage(+$(this).text());
        }
      );
      $("#next-page").on("click", function () {
        return showPage(currentPage + 1);
      });

      $("#previous-page").on("click", function () {
        return showPage(currentPage - 1);
      });
      $(".pagination").on("click", function () {
        $("html,body").animate({ scrollTop: 0 }, 0);
      });
    });
    // Pagination End
    // console.log(newsData.length)
    for (i = 0; i < newsData.length; i++) {
      var dateTime = newsData[i].tanggal;
      var newDate = new Date(dateTime);
      let newsUrl = newsData[i].judul;
      newsUrl = newsUrl.replace(/\s+/g, "-");
      var url = new URL(window.location.href);
      if (newsData[i].premium == 0) {
        $("#newsList").append(
          `<div class="col-md-4 news-container" data-index="${i}" data-filter="${
            monthNames[newDate.getMonth()]
          }" id="${newsData[i].id}">
        <a class="btn card hvr-grow-shadow" href="${
          `https://` +
          url.hostname +
          `/berita/${newsData[i].id}/${newsUrl}/?index=${i}&id=${newsData[i].id}`
        }">
            <div class="card-image-wrapper">
                <img src="${
                  newsData[i].foto
                }" class="card-img-top img-fluid" alt="gambar-berita">
            </div>
        <div class="card-body">
            <h6 class="card-title">${newsData[i].judul}</h6>
        </div>
        </a>
        </div>`
        );
      }
    }
  })
  .catch(function (error) {
    // console.log(error);
  });

// Berita CMS
fetch(api_url + endPointBerita)
  .then((resp) => resp.json())
  .then(function (data) {
    // console.log(fetch)
    let newsData = data.data;
    for (i = newsData.length - 1; i >= 0; i--) {
      var dateTime = newsData[i].tanggal;
      var newDate = new Date(dateTime);
      var url = new URL(window.location.href);

      if (newsData[i].premium == 0) {
        newsData[i].premium = "Regular";
      } else {
        newsData[i].premium = "Premium";
      }
      if (newsData[i].pinned == 1 || newsData[i].pinned == 'true' ) {
        var pinStatus_news = "Pinned";
      } else {
        var pinStatus_news = "Unpinned";
      }
      $("#newsDataList").append(
        `<tr>
        <th scope="row">${newsData[i].id}</th>
        <td class="w-25">
          <img src="${
            newsData[i].foto
          }" class="img-fluid img-thumbnail" alt="berita">
        </td>
        <td class="text-capitalize">${newsData[i].judul}</td>
        <td class="text-capitalize">${
          monthNames[newDate.getMonth()] +
          " " +
          newDate.getDate() +
          "," +
          " " +
          newDate.getFullYear()
        }</td>
        <td class="text-capitalize">${newsData[i].premium}</td>
        <td class="text-capitalize">${pinStatus_news}</td>
        <td>
        <a id="deleteNews${newsData[i].id}" data-id="${
          newsData[i].id
        }" href="#"><i class="far fa-trash-alt"></i></a>
        <a href="${
          `https://` + url.hostname + `/cms/edit/cmsberitaedit.html?index=${i}`
        }"><i class="far fa-edit"></i></a>
        </td>
      </tr>`
      );
      $(`#deleteNews${newsData[i].id}`).click(function (event) {
        console.log("CLICKED!");
        var thisNewsId = $(this).data("id");
        console.log(thisNewsId);
        var formData = {
          beritaId: thisNewsId,
        };
        console.log(formData);

        $.ajax({
          type: "DELETE",
          url: api_url + "deleteberita",
          data: formData,
          headers: { Authorization: "Bearer " },
          dataType: "json",
          encode: true,
          success: function (data) {
            alert("Data Berhasil Dihapus");
            window.location.reload();
            event.preventDefault();
            console.log(data);
            console.log(formData);
          },
        });
      });
    }
  })
  .catch(function (error) {
    // console.log(error);
  });

// Berita Edit CMS
fetch(api_url + endPointBerita)
  .then((resp) => resp.json())
  .then(function (data) {
    let newsData = data.data;
    var url = new URL(window.location.href);
    var index = url.searchParams.get("index");
    var dateTime = newsData[index].tanggal;
    var newDate = new Date(dateTime);
    var newsMonth = ("0" + (newDate.getMonth() + 1)).slice(-2);
    var newsDate = ("0" + (newDate.getDate() + 1)).slice(-2);
    if (newsData[index].pinned == "true") {
      document.getElementById("pin-item-news").checked = true;
      console.log("Data dengan nilai true");
    } else {
      document.getElementById("pin-item-news").checked = false;
      console.log("Data dengan nilai false");
    }
    $("#editIdBerita").append(
      `
        <label class="form-label">Id Berita</label>
        <input type="text" class="form-control" value="${newsData[index].id}" id="inputIdBerita" disabled>
      `
    );

    $("#editJudulBerita").append(
      `
        <label class="form-label">Judul Berita</label>
        <input type="text" class="form-control" value="${newsData[index].judul}" id="inputJudulBerita" required>
      `
    );

    $("#editSumberFoto").append(
      `
        <label class="form-label">Sumber Foto</label>
        <input type="text" class="form-control" value="${newsData[index].sumber_foto}" id="inputSumberFoto" required>
      `
    );

    $("#editGambarBerita").append(
      `
        <label class="form-label">Gambar Berita</label>  
        <input id="inputGambarBerita" type="file" class="form-control" aria-label="file example" onchange="readURLBerita(this);" required>
        <div class="invalid-feedback">Example invalid form file feedback</div>
        <img id="thumbBerita" class="img-fluid" src="${newsData[index].foto}" alt="your image" />
      `
    );
    $("#editSumberFotoBerita").append(
      `
        <label class="form-label">Sumber Foto</label>
        <input type="text" class="form-control" value="${newsData[index].sumber_foto}" id="inputSumberFotoBerita" required>
      `
    );
    $("#editAuthorBerita").append(
      `
      <label class="form-label">Author</label>
      <input type="text" class="form-control" value="${newsData[index].author}" id="inputAuthor" required>
      `
    );
    $(".myNews").append(
      `
      ${newsData[index].isi}
      `
    );
    $("#editTanggalBerita").append(
      `
      <label class="form-label">Tanggal Berita</label>
      <input type="date" class="form-control" value =${
        newDate.getFullYear() + "-" + newsMonth + "-" + newsDate
      } id="inputTanggalBerita" required>
      `
    );
    // console.log("ini berita" + newsData[index].premium)
    if (newsData[index].premium == 0) {
      $("#editJenisBerita").append(
        `
        <label class="form-label">Jenis Berita</label>
        <select class="custom-select form-control" id="inputJenisBerita">
            <option value="0" selected>Regular</option>
            <option value="1">Premium</option>
        </select>
        `
      );
    } else {
      $("#editJenisBerita").append(
        `
        <label class="form-label">Jenis Berita Berita</label>
        <select class="custom-select form-control" id="inputJenisBerita">
            <option value="1" selected>Premium</option>
            <option value="0">Regular</option> 
        </select>
        `
      );
    }
  });

// Isi Berita
fetch(api_url + endPointBerita)
  .then((resp) => resp.json())
  .then(function (data) {
    var url = new URL(window.location.href);
    var index = url.searchParams.get("index");
    let newsData = data.data;
    var dateTime = newsData[index].tanggal;
    var newDate = new Date(dateTime);

    for (i = 0; i < 5; i++) {
      var newDate = new Date(dateTime);
      let newsUrl = newsData[i].judul;
      newsUrl = newsUrl.replace(/\s+/g, "-");
      if (newsData[i].premium == 0) {
        $("#newsItemList").append(
          `
        <li class="list-group-item text-center">
          <a href="${
            `https://` +
            url.hostname +
            `/berita/${newsData[i].id}/${newsUrl}/?index=${i}&id=${newsData[i].id}`
          }" class="text-decoration-none">
            <ul class="list-unstyled sub-article">
              <li><img src="${
                newsData[i].foto
              }" class="card-img-top img-fluid w-50" alt="gambar-berita"></li>
              <li class="text-muted"><small>${newsData[i].judul}</small></li>
            </ul>
          </a>
        </li>
        `
        );
      }
    }
    
    // console.log(newsData[index].id)
    $("#fb-share-button").click(function (event) {
      // console.log("CLICKED!")
      var thisnewsId = newsData[index].id;
      var formData = {
        newsId: thisnewsId,
      };
      // console.log(formData)

      $.ajax({
        type: "POST",
        url: api_url + "share_news",
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        dataType: "json",
        encode: true,
        success: function (data) {
          event.preventDefault();
          // console.log(data);
          // console.log(formData)
        },
      });
    });

    $("#wa-share-button").click(function (event) {
      console.log("CLICKED!");
      var thisnewsId = newsData[index].id;
      var formData = {
        newsId: thisnewsId,
      };
      // console.log(formData)

      $.ajax({
        type: "POST",
        url: api_url + "share_news",
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        dataType: "json",
        encode: true,
        success: function (data) {
          event.preventDefault();
          // console.log(data);
          // console.log(formData)
        },
      });
    });

    $("#tw-share-button").click(function (event) {
      console.log("CLICKED!");
      var thisnewsId = newsData[index].id;
      var formData = {
        newsId: thisnewsId,
      };
      // console.log(formData)

      $.ajax({
        type: "POST",
        url: api_url + "share_news",
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        dataType: "json",
        encode: true,
        success: function (data) {
          event.preventDefault();
          // console.log(data);
          // console.log(formData)
        },
      });
    });

    $("#li-share-button").click(function (event) {
      console.log("CLICKED!");
      var thisnewsId = newsData[index].id;
      var formData = {
        newsId: thisnewsId,
      };
      // console.log(formData)

      $.ajax({
        type: "POST",
        url: api_url + "share_news",
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        dataType: "json",
        encode: true,
        success: function (data) {
          event.preventDefault();
          // console.log(data);
          // console.log(formData)
        },
      });
    });

    $("#mail-share-button").click(function (event) {
      console.log("CLICKED!");
      var thisnewsId = newsData[index].id;
      var formData = {
        newsId: thisnewsId,
      };
      // console.log(formData)

      $.ajax({
        type: "POST",
        url: api_url + "share_news",
        data: formData,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        dataType: "json",
        encode: true,
        success: function (data) {
          event.preventDefault();
          console.log(data);
          console.log(formData);
        },
      });
    });
    // document.getElementById("metaTitle").setAttribute("content", `${newsData[index].judul}`);
    $("#newsItemTitle").append(
      `
        ${newsData[index].judul}
      `
    );
    $("#newsItemDate").append(
      `
      ${
        monthNames[newDate.getMonth()] +
        " " +
        newDate.getDate() +
        "," +
        " " +
        newDate.getFullYear()
      }
      `
    );
    $("#newsItemContent").append(
      `
      <figure class="figure text-center">
        <img src="${newsData[index].foto}" class="img-fluid w-75" alt="">
      <figcaption class="figure-caption">${newsData[index].sumber_foto}</figcaption>
      </figure>
      <p class="text-start mb-4">
      ${newsData[index].isi}
      </p>
      `
    );
    
    for (i = 0; i < newsData.length; i++) {
      var newDate = new Date(dateTime);
      let newsUrl = newsData[i].judul;
      newsUrl = newsUrl.replace(/\s+/g, "-");
      if (newsData[i].premium !== 0) {
        $("#premiumNewsList").append(
          `
          <li class="list-group-item text-center">
            <a href="${
              `https://` +
              url.hostname +
              `/berita/${newsData[i].id}/${newsUrl}/?index=${i}&id=${newsData[i].id}`
            }" class="text-decoration-none">
              <ul class="list-unstyled sub-article">
                <li><img src="${
                  newsData[i].foto
                }" class="card-img-top img-fluid w-50" alt="gambar-berita"></li>
                <li class="text-muted"><small>${newsData[i].judul}</small></li>
              </ul>
            </a>
          </li>
          `
        );
      }
    }
  })

  .catch(function (error) {
    // console.log(error);
  });

// Event CMS
fetch(api_url + endPointEvent)
  .then((resp) => resp.json())
  .then(function (data) {
    var url = new URL(window.location.href);
    var index = url.searchParams.get("index");
    let eventData = data.data;
    var dateTime = eventData[0].event_date;
    var newDate = new Date(dateTime);
    for (i = 0; i < 1; i++) {
      $("#eventData").append(
        `<div class="col-md-12">
      <h2 class="sec-title">Upcoming Event</h2>
  </div>
  <div class="col-md-12">
      <div class="row bg-white rounded mt-3">
          <div class="col-md-1 text-center">
              <h3 class="text-capitalize">${
                monthNames[newDate.getMonth()]
              }<br><strong>${newDate.getDate()}</strong></h3>
          </div>
          <div class="col-md-4 no-padding">
              <img class="img-fluid w-100" src=${eventData[i].gambar}>
          </div>
          <div class="col-md-7 py-3">
              <div class="card-block px-3">
                  <h4 class="card-title mt-0"><strong>${
                    eventData[i].judul
                  }</strong></h4>
                  <p class="text-secondary mb-0">
                      <strong>${eventData[i].alamat}</strong>
                  </p>
                  <div class = "event-text">
                  <p class="card-text">
                    ${eventData[i].deskripsi}
                  </p>
                  </div>
                  <hr>
                  <a href=${
                    `https://` + url.hostname + `/event.html?index=${0}`
                  } class="btn btn-sm btn-custom rounded-pill" data-index = ${[
          0,
        ]}>Selengkapnya</a>
              </div>
          </div>
      </div>
    </div>`
      );
      $("#eventDateTicker").append(
        `${
          monthNames[newDate.getMonth()] +
          " " +
          newDate.getDate() +
          "," +
          " " +
          newDate.getFullYear()
        }`
      );
    }
  })
  .catch(function (error) {
    // console.log(error);
  });

// Isi Event
fetch(api_url + endPointEvent)
  .then((resp) => resp.json())
  .then(function (data) {
    var url = new URL(window.location.href);
    var index = url.searchParams.get("index");
    let eventData = data.data;
    var dateTime = eventData[index].event_date;
    var dateTimeTill = eventData[index].event_till_date;
    var dateTimePost = eventData[index].tanggal;
    var newDate = new Date(dateTime);
    var newDatePost = new Date(dateTimePost);
    var newDateTill = new Date(dateTimeTill);
    // console.log(eventData[index])
    $("#eventItemTitle").append(
      `
      ${eventData[index].judul}
      `
    );
    $("#eventItemDate").append(
      `
      Dipublikasikan pada : 
      ${
        monthNames[newDatePost.getMonth()] +
        " " +
        newDatePost.getDate() +
        "," +
        " " +
        newDatePost.getFullYear()
      }
      `
    );
    $("#eventItemContent").append(
      `
      <figure class="figure text-center">
        <img src="${eventData[index].gambar}" class="img-fluid w-75" alt="">
      </figure>
      <h6>${eventData[index].alamat}</h6>
      <h6 class="text-capitalize">${
        monthNames[newDate.getMonth()] +
        " " +
        newDate.getDate() +
        "," +
        " " +
        newDate.getFullYear()
      } - ${
        monthNames[newDateTill.getMonth()] +
        " " +
        newDateTill.getDate() +
        "," +
        " " +
        newDateTill.getFullYear()
      } </h6>
      <p class="text-start mb-4">
      ${eventData[index].deskripsi}
      </p>
      `
    );
    for (i = 0; i < 5; i++) {
      $("#eventItemList").append(
        `
      <li class="list-group-item text-center">
        <a href="${
          `https://` + url.hostname + `/event.html?index=${i}`
        }" class="text-decoration-none">
          <ul class="list-unstyled sub-article">
            <li><img src=${
              eventData[i].gambar
            } class="card-img-top img-fluid w-50" alt="gambar-berita"></li>
            <li class="text-muted"><small>${eventData[i].judul}</small></li>
          </ul>
        </a>
      </li>
      `
      );
    }
  })
  .catch(function (error) {
    // console.log(error);
  });

// CMS Event

fetch(api_url + endPointEvent)
  .then((resp) => resp.json())
  .then(function (data) {
    let eventData = data.data;
    var url = new URL(window.location.href);
    for (i = 0; i < eventData.length; i++) {
      var dateTimeStart = eventData[i].event_date;
      var newDateStart = new Date(dateTimeStart);
      var dateTimeEnd = eventData[i].event_till_date;
      var newDateEnd = new Date(dateTimeEnd);

      $("#eventDataList").append(
        `<tr>
        <th scope="row">${eventData[i].id}</th>
        <td class="w-25">
          <img src="${
            eventData[i].gambar
          }" class="img-fluid img-thumbnail" alt="event">
        </td>
        <td class="text-capitalize">${eventData[i].judul}</td>
        <td class="text-capitalize">${
          monthNames[newDateStart.getMonth()] +
          " " +
          newDateStart.getDate() +
          "," +
          " " +
          newDateStart.getFullYear()
        }</td>
        <td class="text-capitalize">${
          monthNames[newDateEnd.getMonth()] +
          " " +
          newDateEnd.getDate() +
          "," +
          " " +
          newDateEnd.getFullYear()
        }</td>
        <td>
        <a href="#" id="deleteEvent${eventData[i].id}" data-id="${
          eventData[i].id
        }"><i class="far fa-trash-alt"></i></a>
        <a href="${
          `https://` + url.hostname + `/cms/edit/cmseventedit.html?index=${i}`
        }"><i class="far fa-edit"></i></a>
      </tr>`
      );
      $(`#deleteEvent${eventData[i].id}`).click(function (event) {
        console.log("CLICKED!");
        var thisEventId = $(this).data("id");
        console.log(thisEventId);
        var formData = {
          eventId: thisEventId,
        };
        console.log(formData);

        $.ajax({
          type: "DELETE",
          url: api_url + "deleteevent",
          data: formData,
          headers: { Authorization: "Bearer " },
          dataType: "json",
          encode: true,
          success: function (data) {
            alert("Data Berhasil Dihapus");
            window.location.reload();
            event.preventDefault();
            console.log(data);
            console.log(formData);
          },
        });
      });
    }
  })
  .catch(function (error) {
    // console.log(error);
  });

// CMS Edit Event
fetch(api_url + endPointEvent)
  .then((resp) => resp.json())
  .then(function (data) {
    let eventData = data.data;
    var url = new URL(window.location.href);
    var index = url.searchParams.get("index");
    var dateTimeStart = eventData[index].event_date;
    var dateTimeEnd = eventData[index].event_till_date;

    var newDateStart = new Date(dateTimeStart);
    var eventStartMonth = ("0" + (newDateStart.getMonth() + 1)).slice(-2);
    var eventStartDate = ("0" + (newDateStart.getDate() + 1)).slice(-2);

    var newDateEnd = new Date(dateTimeEnd);
    var eventEndMonth = ("0" + (newDateEnd.getMonth() + 1)).slice(-2);
    var eventEndDate = ("0" + (newDateEnd.getDate() + 1)).slice(-2);
    $("#eventEditId").append(
      `
    <label class="form-label">Id Event</label>
    <input type="text" class="form-control" value="${eventData[index].id}" id="inputIdEvent" Disabled>
    `
    );
    $("#eventEditJudul").append(
      `
      <label class="form-label">Nama Event</label>
      <input type="text" class="form-control" value="${eventData[index].judul}" id="inputJudulEvent" required>
      `
    );
    $("#eventEditGambar").append(
      `
    <label class="form-label">Gambar Event</label>  
    <input id="inputEventGambar" type="file" class="form-control" aria-label="file example" onchange="readURLEvent(this);" required>
      <div class="invalid-feedback">Example invalid form file feedback</div>
    <img id="thumbEvent" src="${eventData[index].gambar}" class="img-fluid" alt="eventImage" />
    `
    );
    $("#eventEditAlamat").append(
      `
      <label class="form-label">Alamat Event</label>
      <textarea class="form-control" id="inputAlamatEvent" rows="3">${eventData[index].alamat}</textarea>
      `
    );
    $(".myEvent").append(eventData[index].deskripsi);
    $("#eventEditMulai").append(
      `
      <label class="form-label">Tanggal Mulai</label>
      <input type="date" class="form-control" value =${
        newDateStart.getFullYear() +
        "-" +
        eventStartMonth +
        "-" +
        eventStartDate
      } id="inputMulaiEvent" required>
      `
    );
    $("#eventEditSelesai").append(
      `
      <label class="form-label">Tanggal Berakhir</label>
      <input type="date" value =${
        newDateEnd.getFullYear() + "-" + eventEndMonth + "-" + eventEndDate
      } class="form-control" id="inputAkhirEvent" required>
      `
    );
    $("#eventEditContact").append(
      `
      <label class="form-label">No Kontak</label>
      <input type="tel" class="form-control" value="${eventData[index].no_kontak}" id="inputKontakEvent" required>
      `
    );
    $("#eventEditPic").append(
      `
      <label class="form-label">Nama PIC</label>
      <input type="tel" class="form-control" value="${eventData[index].nama_pic}" id="inputPicEvent" required>
      `
    );
  })
  .catch(function (error) {
    // console.log(error);
  });

// Flash News
fetch(api_url + endPointFlash)
  .then((resp) => resp.json())
  .then(function (data) {
    let flashData = data.data;
    const pinnedFlash = [];
    const unPinnedFlash = [];
    for (i = 0; i < flashData.length; i++) {
      if (flashData[i].premium == "true") {
        pinnedFlash.push(flashData[i]);
      } else if (flashData[i].premium !== "true" || flashData[i].premium == null) {
        unPinnedFlash.push(flashData[i]);
      }
    }

    for (l = 0; l < 3; l++) {
      var dateTime = flashData[l].tanggal;
      var flashDate = new Date(dateTime);
      $("#flashRunText").append(
        `
      <div class="ticker-item text-capitalize"><i class="far fa-newspaper text-white"></i> ${
        monthNames[flashDate.getMonth()] +
        " " +
        flashDate.getDate() +
        "," +
        " " +
        flashDate.getFullYear()
      } - ${flashData[l].judul}</div>
      `
      );
    }

    if (unPinnedFlash.length !== 0){
      for (k = 0; k < 6; k++) {
        var dateTime = unPinnedFlash[k].tanggal;
        var unPinnedFlashDate = new Date(dateTime);
        $("#flashNews").append(
          `
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0ms" data-index="${k}" data-id="${
            unPinnedFlash[k].judul
          }">
            <div class="news-item">
              <div class="news_box">
                <div class="newsimg"><img class="img-fluid" src="${
                  unPinnedFlash[k].foto
                }" alt="foto-flash"></div>
                  <div class="news-content">
                      <div class="news_postdate">
                          <span class="text-capitalize">${
                            monthNames[unPinnedFlashDate.getMonth()] +
                            " " +
                            unPinnedFlashDate.getDate() +
                            "," +
                            " " +
                            unPinnedFlashDate.getFullYear()
                          }</span>
                      </div>
                      <div class="flash-title mb-2">
                              <h3>${unPinnedFlash[k].judul}</h3>
                      </div>
                      <div class="flash-description">
                          <p>${unPinnedFlash[k].isi}</p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        `
        );
      }
    }

    if (pinnedFlash.length !== 0){
      for (j = 0; j < 3; j++) {
        var dateTime = pinnedFlash[j].tanggal;
        var pinnedFlashDate = new Date(dateTime);
        $("#pinnedflashNews").append(
          `
          <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0ms" data-index="${j}" data-id="${
            pinnedFlash[j].judul
          }">
            <div class="news-item">
              <div class="news_box">
                <div class="newsimg">
                <i class="text-danger fas fa-thumbtack"></i>
                <img class="img-fluid" src="${
                  pinnedFlash[j].foto
                }" alt="foto-flash"></div>
                  <div class="news-content">
                      <div class="news_postdate">
                          <span class="text-capitalize">${
                            monthNames[pinnedFlashDate.getMonth()] +
                            " " +
                            pinnedFlashDate.getDate() +
                            "," +
                            " " +
                            pinnedFlashDate.getFullYear()
                          }</span>
                      </div>
                      <div class="flash-title mb-2">
                              <h3>${pinnedFlash[j].judul}</h3>
                      </div>
                      <div class="flash-description">
                          <p>${pinnedFlash[j].isi}</p>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          `
        );
      }
    }
    
  })
  .catch(function (error) {
    // console.log(error);
  });

// Flash CMS
fetch(api_url + endPointFlash)
  .then((resp) => resp.json())
  .then(function (data) {
    // console.log(fetch)
    let flashData = data.data;
    var url = new URL(window.location.href);
    for (i = 0; i < flashData.length; i++) {
      var dateTime = flashData[i].tanggal;
      var newDate = new Date(dateTime);
      if (flashData[i].premium == "true") {
        var pinStatus = "Pinned";
      } else {
        var pinStatus = "Unpinned";
      }
      // <a href=""><i class="fas fa-eye"></i></a>
      $("#flashDataList").append(
        `<tr>
        <th scope="row">${flashData[i].id}</th>
        <td class="w-25">
          <img src="${
            flashData[i].foto
          }" class="img-fluid img-thumbnail" alt="Sheep">
        </td>
        <td class="text-capitalize">${flashData[i].judul}</td>
        <td class="text-capitalize">${
          monthNames[newDate.getMonth()] +
          " " +
          newDate.getDate() +
          "," +
          " " +
          newDate.getFullYear()
        }</td>
        <td class="text-capitalize">${flashData[i].author}</td>
        <td class="text-capitalize">${pinStatus}</td>
        <td>
        <a id="deleteFlash${flashData[i].id}" href="#" data-id="${
          flashData[i].id
        }"><i class="far fa-trash-alt"></i></a>
        <a href="${
          `https://` + url.hostname + `/cms/edit/cmsflashedit.html?index=${i}`
        }"><i class="far fa-edit"></i></a>
        </td>
      </tr>`
      );
      $(`#deleteFlash${flashData[i].id}`).click(function (event) {
        console.log("CLICKED!");
        var thisFlashId = $(this).data("id");
        console.log(thisFlashId);
        var formData = {
          flashId: thisFlashId,
        };
        console.log(formData);

        $.ajax({
          type: "DELETE",
          url: api_url + "deleteflash",
          data: formData,
          headers: { Authorization: "Bearer " },
          dataType: "json",
          encode: true,
          success: function (data) {
            alert("Data Berhasil Dihapus");
            window.location.reload();
            event.preventDefault();
            console.log(data);
            console.log(formData);
          },
        });
      });
    }
  })
  .catch(function (error) {
    // console.log(error);
  });

// Edit Flash CMS
fetch(api_url + endPointFlash)
  .then((resp) => resp.json())
  .then(function (data) {
    let flashData = data.data;
    var url = new URL(window.location.href);
    var index = url.searchParams.get("index");
    var dateTime = flashData[index].tanggal;
    var newDate = new Date(dateTime);

    var flashMonth = ("0" + (newDate.getMonth() + 1)).slice(-2);
    var flashDate = ("0" + (newDate.getDate() + 1)).slice(-2);
    if (flashData[index].premium == "true") {
      document.getElementById("pin-item").checked = true;
      console.log("Data dengan nilai true");
    } else {
      document.getElementById("pin-item").checked = false;
      console.log("Data dengan nilai false");
    }

    // console.log(flashMonth);
    $("#flashId").append(
      ` <label class="form-label">Id Flash News</label>
        <input type="text" class="form-control" value = "${flashData[index].id}" id="inputIdFlash" disabled>`
    );
    $("#flashTitle").append(
      `
        <label class="form-label">Judul Flash News</label>
        <input type="text" class="form-control" id="inputJudulFlash" value="${flashData[index].judul}" required>
      `
    );
    $("#flashPhoto").append(
      `
        <label class="form-label">Gambar Flash</label>  
        <input id="inputFotoFlash" type="file" class="form-control" aria-label="file example" onchange="readURLArtikel(this);" required>
            <div class="invalid-feedback">Example invalid form file feedback</div>
        <img id="thumbArtikel" src="${flashData[index].foto}"" class="img-fluid" alt="your image" />
      `
    );
    $("#flashSource").append(
      `
        <label class="form-label">Sumber Foto</label>
        <input type="text" class="form-control" id="inputSumberFoto" value="${flashData[index].sumber_foto}" required>
      `
    );
    $("#flashAuthor").append(
      `
        <label class="form-label">Author</label>
        <input type="text" class="form-control" id="inputAuthor" value="${flashData[index].author}" required>
      `
    );
    $(".myContent").append(flashData[index].isi);
    $("#flashDate").append(
      `
      <label class="form-label">Tanggal Flash</label>
      <input type="date" class="form-control" value =${
        newDate.getFullYear() + "-" + flashMonth + "-" + flashDate
      } id="inputTanggalFlash" required>
      `
    );
  })
  .catch(function (error) {
    // console.log(error);
  });
