function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const ul = document.getElementById('banners');
const url = 'https://randomuser.me/api/?results=1'

fetch(url)
.then((resp) => resp.json())
.then(function(data) {
  let banners = data.results;
  return banners.map(function(banner) {
    let img = createNode('img');
    img.src = banner.picture.medium;
        for(var i=0;i<1;i++){
            $("#banners").append(
            `<div class="carousel-item active" data-bs-interval="5000">
                <img src="./assets/img/jumbotron/jumbotron1.jpeg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="5000">
                <img src="https://via.placeholder.com/1366x480px" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="2000">
                <img src="./assets/img/jumbotron/jumbotron2.png" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item" data-bs-interval="2000">
                <img src="./assets/img/jumbotron/jumbotron3.jpeg" class="d-block w-100" alt="...">
            </div>`
)
}
    console.log(img.src);
  })
})
.catch(function(error) {
  console.log(error);
});


