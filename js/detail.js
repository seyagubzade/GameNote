import { laptopsArr, labelMenu } from "./documents.js";
const urlParams = new URLSearchParams(window.location.search);
const laptopID = urlParams.get("id");
const details = document.querySelector(".details-content");
// const addToCard = document.getElementById('addToCard')

console.log(laptopID);

document.addEventListener("DOMContentLoaded", renderUI);
details.addEventListener("click", addItemToCard);
details.addEventListener("click", increaseAndDecrease);
trackOfCount()

function trackOfCount() {
    let count = 0;
    const ordersAll = JSON.parse(localStorage.getItem("cards")) || [];
    ordersAll.map((product) => (count += product.count));
    labelMenu.innerHTML = count;
  
  }
function renderUI(e) {
  e.preventDefault();
  console.log(laptopsArr);
  let laptopChosen = laptopsArr.find((laptop) => laptop.id == laptopID);
  let productsArr = JSON.parse(localStorage.getItem("cards")) || [];
  let count = 0;

  console.log("choosenn>>>>>", laptopChosen);
  productsArr.map((product) => (count += product.count));
  labelMenu.innerHTML = count;
  //   console.log(productsArr);
  let amountofCosenLaptop =
    productsArr.find((product) => product.id == laptopID)?.count || 0;
  let totalPricefCosenLaptop =
    productsArr.find((product) => product.id == laptopID)?.price *
      amountofCosenLaptop || 0;
  //   console.log(amountofCosenLaptop);
  if (laptopChosen) {
    details.innerHTML = `
        <div class="row">
        <div class="col col-md-6 pr-18">
          <div class="main-img-container">
            <img src="${laptopChosen.src}" alt="">
          </div>
          <div class="additional-imgs d-flex flex-between">
            <img src="${laptopChosen.src}" alt="">
            <img src="${laptopChosen.src}" alt="">
            <img src="${laptopChosen.src}" alt="">
          </div>
        </div>
        <div class="col col-md-6">
          <h2 class="productName mb-12">
            ${laptopChosen.name}
          </h2>
          <p class="price mb-12">${laptopChosen.price} ₼</p>
          <p class="title mb-12">${laptopChosen.name}</p>
          <p class="brand mb-12">${laptopChosen.brand}</p>
          <p class="brand mb-12">${laptopChosen.color}</p>
          <div class="countControl mb-12">Miqdar: <div><button class="decreaseCount">-</button><input readonly="" class="countOfProduct" type="number" min="0" value="${amountofCosenLaptop}"><button class="increaseCount">+</button></div> </div>
          <div class="divider"></div>
          <p class="totalPrice mb-12">Total price: ${totalPricefCosenLaptop} ₼</p>
          <button class="addToCard btn btn-primary btn-w-100 mb-12">Add to cart</button>
          <div class="divider"></div>
          <div class="more-info">
            <h3>Mehsul haqqinda</h3>
            <ul class="product-info-list">
              <li class="row">
                <div class="col-4 info-bold">Ölçüləri</div>
                <div class="col-8">${laptopChosen.color}</div>
              </li>
              <li class="row">
                <div class="col-4 info-bold">Rəngləri</div>
                <div class="col-8">${laptopChosen.color}</div>
              </li>
              <li class="row">
                <div class="col-4 info-bold">İstehsal ölkəsi</div>
                <div class="col-8">${laptopChosen.country}</div>
              </li>
              <li class="row">
                <div class="col-4 info-bold">Xarakteristika</div>
                <div class="col-8">
                <ul>
                ${laptopChosen.description
                  .map((des, index) => `<li>${des}</li>`)
                  .join("")}
                </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
        `;
  }
}
function addItemToCard(e) {
  if (e.target.classList.contains("addToCard")) {
    let productsArr = JSON.parse(localStorage.getItem("cards")) || [];
    let productToAdd = laptopsArr.find((laptop) => laptop.id == laptopID);

    let existingProductIndex = productsArr.findIndex(
      (product) => product.id === productToAdd.id
    );

    if (existingProductIndex !== -1) {
      productsArr[existingProductIndex] = {
        ...productsArr[existingProductIndex],
        count: productsArr[existingProductIndex].count + 1,
        totalPrice:
          (productsArr[existingProductIndex].count + 1) *
          productsArr[existingProductIndex].price,
      };
      // Find the parent element and then find the .countOfProduct element within it
      let countOfProductElement = e.target
        .closest(".row")
        .querySelector(".countOfProduct");
      countOfProductElement.value = productsArr[existingProductIndex].count;
    } else {
      productsArr.push({
        ...productToAdd,
        count: 1,
        totalPrice: productToAdd.price,
      });
      let countOfProductElement = e.target
        .closest(".row")
        .querySelector(".countOfProduct");
      countOfProductElement.value = 1;
    }

    let countofCard = productsArr.reduce(
      (total, product) => total + (product.count || 0),
      0
    );
    labelMenu.innerHTML = countofCard;

    localStorage.setItem("cards", JSON.stringify(productsArr));
    let amountofCosenLaptop =
      productsArr.find((product) => product.id == laptopID)?.count || 0;
    let totalPricefCosenLaptop =
      productsArr.find((product) => product.id == laptopID)?.price *
        amountofCosenLaptop || 0;
    document.querySelector(
      ".totalPrice"
    ).innerHTML = `Total price: ${totalPricefCosenLaptop} ₼`;
  }
  //   document.location.reload();
  trackOfCount()
}
function increaseAndDecrease(e) {
  let productsArr = JSON.parse(localStorage.getItem("cards")) || [];
  let productToAdd = laptopsArr.find((laptop) => laptop.id == laptopID);

  let existingProductIndex = productsArr.findIndex(
    (product) => product.id === productToAdd.id
  );

  if (existingProductIndex !== -1) {
    if (e.target.classList.contains("decreaseCount")) {
      // Decrease logic
      if (productsArr[existingProductIndex].count > 0) {
        productsArr[existingProductIndex] = {
          ...productsArr[existingProductIndex],
          count: productsArr[existingProductIndex].count - 1,
          totalPrice:
            productsArr[existingProductIndex].count *
            productsArr[existingProductIndex].price,
        };
      }
    } else if (e.target.classList.contains("increaseCount")) {
      // Increase logic
      productsArr[existingProductIndex] = {
        ...productsArr[existingProductIndex],
        count: productsArr[existingProductIndex].count + 1,
        totalPrice:
          (productsArr[existingProductIndex].count + 1) *
          productsArr[existingProductIndex].price,
      };
    }

    // Find the parent element and then find the .countOfProduct element within it
    let countOfProductElement = e.target
      .closest(".row")
      .querySelector(".countOfProduct");
    countOfProductElement.value = productsArr[existingProductIndex].count;
  } else {
    if (e.target.classList.contains("increaseCount")) {
      // If the product is not in the cart, it can be added with count 1
      productsArr.push({
        ...productToAdd,
        count: 1,
        totalPrice: productToAdd.price,
      });
      let countOfProductElement = e.target
        .closest(".row")
        .querySelector(".countOfProduct");
      countOfProductElement.value = 1;
    }
  }

  let countofCard = productsArr.reduce(
    (total, product) => total + (product.count || 0),
    0
  );
  labelMenu.innerHTML = countofCard;

  localStorage.setItem("cards", JSON.stringify(productsArr));
  let amountofCosenLaptop =
  productsArr.find((product) => product.id == laptopID)?.count || 0;
let totalPricefCosenLaptop =
  productsArr.find((product) => product.id == laptopID)?.price *
    amountofCosenLaptop || 0;
document.querySelector(
  ".totalPrice"
).innerHTML = `Total price: ${totalPricefCosenLaptop} ₼`;
trackOfCount()
}
