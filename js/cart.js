import { labelMenu } from "./documents.js";

const basketContainer = document.querySelector(".basket-container");

const orders = JSON.parse(localStorage.getItem("cards")) || [];
console.log(orders);
if (orders.length == 0) {
  basketContainer.innerHTML = `<p style="text-align:center; padding-top:20px">No Item</p>`;
  labelMenu.innerHTML = 0;
} else {
  let totalPriceFinal = orders.reduce(
    (total, product) => total + (product.totalPrice || 0),
    0
  );
  basketContainer.innerHTML = `
    <div class="orders">
      ${orders
        .map(
          (order) => `
        <div data-id="${
          order.id
        }" class="row order-item d-flex flex-between borderBottomStyle">
          <div class="left col-3">
            <img src="${order.src}" />
          </div>
          <div class="right col-9 p-12">
            <div class="right-content row d-flex flex-between">
              <div class="info-content">
                <p class="infotitle">${order.name}</p>
                <p class="infosubtitle">${order.brand}</p>
                <p class="infosubtitle">${order.subtitle}</p>
                <p class="infosubtitle">
                  <span class="text-color-gray"> Rəng: </span>
                  ${order.color}
                </p>
                <div class="infosubtitle">
                  <span class="text-color-gray"> Ölçü: </span>
                  ${order.brief}
                </div>
                <div class="infosubtitle stepper d-flex">
                  <span class="text-color-gray"> Say: </span>
                  <div class="input-stepper">
                    <button
                      type="button"
                      data-basketid="9hd9ZfJdYT6TyMzfP"
                      class="minus countMinus"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      class="optionsCount"
                      readonly=""
                      step="1"
                      value="${order.count}"
                    />
                    <button
                      type="button"
                      class="plus countPlus"
                      data-basketid="9hd9ZfJdYT6TyMzfP"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div class="price-content">
                <div class="actionsButton deleteBasket">
                  <i class="fa-regular fa-circle-xmark"></i>
                </div>
                <div class="totalPriceProductBasket">${order.price.toFixed(
                  2
                )} ₼</div>
              </div>
            </div>
            <div class="text-align-right col-100"></div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
    <div class="aboutOrders borderBottomStyle">
    <div class="d-flex">
    <h3 class="about_product_h1">Sifariş haqqında</h3>
  </div>
  <div class="d-flex">
    <div class="name_about">Məhsulların sayı</div>
    <div class="result_about">${orders.length}</div>
  </div>
  <div class="d-flex">
    <div class="name_about">Məhsuların ümumi qiyməti</div>
    <div class="result_about totalPrice">
      ${totalPriceFinal.toFixed(2)}
      ₼
    </div>
  </div>
  <div class="d-flex">
    <h3 class="name_about totalPriceH3">Ümumi qiymət</h3>
    <h3 class="result_about totalPriceH3 totalPrice">
    ${totalPriceFinal.toFixed(2)}
      ₼
    </h3>
  </div>
    </div>
    <div class="buttons_in_cart">
      <button class="btn button_add_orders">
        Sifariş et
      </button>
    </div>
  `;
}
trackOfCount()

basketContainer.addEventListener("click", handleClick);

function handleClick(e) {
  e.preventDefault();
  let selectedOrderID = e.target
    .closest(".order-item")
    ?.getAttribute("data-id");
  let selectedOrder = orders.find((order) => order.id == selectedOrderID);
  let selectedOrderIndex = orders.findIndex((order) => order == selectedOrder);

  if (e.target.classList.contains("countPlus")) {
    orders[selectedOrderIndex].count++;
    e.target.previousElementSibling.value = orders[selectedOrderIndex].count;
    orders[selectedOrderIndex].totalPrice =
      orders[selectedOrderIndex].count * orders[selectedOrderIndex].price;
  }
  if (e.target.classList.contains("countMinus")) {
    if (orders[selectedOrderIndex].count > 0) {
      orders[selectedOrderIndex].count--;
      e.target.nextElementSibling.value = orders[selectedOrderIndex].count;
      orders[selectedOrderIndex].totalPrice =
        orders[selectedOrderIndex].count * orders[selectedOrderIndex].price;

      if (orders[selectedOrderIndex].count == 0) {
        e.target.closest(".order-item").remove();
        orders.splice(selectedOrderIndex, 1);
      }
    }
  }
  if (e.target.classList.contains("fa-circle-xmark")) {
    orders[selectedOrderIndex].count = 0;
    e.target.closest(".order-item").remove();
    orders.splice(selectedOrderIndex, 1);
  }

  updateTotalPrice();
  updateLocalStorage();
  trackOfCount();
}

function updateTotalPrice() {
  let totalPriceFinal = orders.reduce(
    (total, product) => total + (product.totalPrice || 0),
    0
  );
  document
    .querySelectorAll(".totalPrice")
    .forEach((item) => (item.innerHTML = `${totalPriceFinal.toFixed(2)} ₼`));
}

function updateLocalStorage() {
  console.log(orders);
  localStorage.setItem("cards", JSON.stringify(orders));
}

function trackOfCount() {
  let count = 0;
  const ordersAll = JSON.parse(localStorage.getItem("cards")) || [];
  ordersAll.map((product) => (count += product.count));
  labelMenu.innerHTML = count;

}
