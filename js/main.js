import {
  slider,
  slides,
  laptopsList,
  laptopsArr,
  labelMenu,
  filterBrands,
  searchProducts,
  userLoginPopup,
  modalLogin,
  currentUser,
  users,
} from "./documents.js";

let counterSlides = 0;
if (slider) {
  setInterval(changeSlide, 2500);
}

if (currentUser) {
  userLoginPopup.innerHTML = `<i class="fa-solid fa-user" style="padding: 0 6px"></i>`;
  document.querySelector(".modal-user .userFullname").innerHTML = `Welcome, ${currentUser.name} ${currentUser.surname}`
  document.querySelector(".modal-user .modal-userName").innerHTML = `Username: ${currentUser.userName}`
  userLoginPopup.addEventListener("click", (e) => {
    document.querySelector(".modal-user").classList.toggle("d-block");
  });
  document.querySelector(".modal-logout-btn").addEventListener("click", (e)=>{
    localStorage.removeItem("currentUser");
    window.location.reload();
  })
} else {
  userLoginPopup.addEventListener("click", (e) => {
    document.querySelector(".modal-login").classList.toggle("d-block");
  });
}
if (modalLogin) {
  let loginForm = modalLogin.querySelector("#login-form");
  loginForm.addEventListener("submit", loginUser);
}

function changeSlide() {
  slider.setAttribute("src", slides[counterSlides]?.src);
  slider.setAttribute("alt", slides[counterSlides]?.id);
  counterSlides = (counterSlides + 1) % slides.length;
}

document.addEventListener("DOMContentLoaded", renderUI);

if (filterBrands) {
  filterBrands.forEach((brand) =>
    brand.addEventListener("click", filterByBrandNames)
  );
}
if (searchProducts) {
  searchProducts.addEventListener("submit", searchFilter);
}

function loginUser(e) {
  e.preventDefault();
  console.log(e.target);
  let userNameEmail = document.getElementById("userNameEmail").value.trim();
  let userPass = document.getElementById("userPass").value.trim();

  const foundUser = users.find(
    (user) => user.userName === userNameEmail || user.email === userNameEmail
  );

  if (foundUser && foundUser.password === userPass) {
    // alert("Login successful!");
    userLoginPopup.innerHTML = `<i class="fa-solid fa-user" style="padding: 0 6px"></i>`;
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    window.location.reload();
  } else {
    alert("Invalid username/email or password. Please try again.");
  }
}

function renderUI(e) {
  e.preventDefault();

  if (laptopsList && labelMenu) {
    let productsArr = JSON.parse(localStorage.getItem("cards")) || [];
    let count = productsArr.reduce(
      (total, product) => total + product.count,
      0
    );
    labelMenu.textContent = count;
    laptopsList.innerHTML = "";

    laptopsArr.forEach((laptop) => {
      laptopsList.innerHTML += `
            <div class="col-6 col-md-4 col-lg-4 p-12">
                <a href="detail.html?id=${laptop?.id}" class="card">
                    <div class="card-top">
                        <img src="${laptop.src}" alt="" />
                    </div>
                    <div class="card-bottom p-12">
                        <div class="like-btn">
                            <i class="fa-light fa-heart"></i>
                        </div>
                        <div class="card-info">
                            <span class="price">${laptop.price} <span class="currency">₼</span></span>
                            <p class="title">${laptop.name}</p>
                            <p class="brand">${laptop.brand}</p>
                        </div>
                    </div>
                </a>
            </div>`;
    });
  }
}

function filterByBrandNames(e) {
  e.preventDefault();
  console.log(e.target.innerText);

  let filtered = laptopsArr.filter((laptop) => {
    if (
      laptop.subtitle
        .toLowerCase()
        .includes(e.target.innerText.toLowerCase()) ||
      laptop.brand.toLowerCase().includes(e.target.innerText.toLowerCase())
    ) {
      return laptop;
    }
  });
  renderFilteredUI(filtered);
}

function searchFilter(e) {
  e.preventDefault();
  let searchValue = document
    .getElementById("searchNavbar")
    .value.toLowerCase()
    .trim();
  let filtered = laptopsArr.filter((laptop) => {
    if (
      laptop.subtitle.toLowerCase().includes(searchValue) ||
      laptop.brand.toLowerCase().includes(searchValue)
    ) {
      return laptop;
    }
  });
  renderFilteredUI(filtered);
}

function renderFilteredUI(filteredlist) {
  laptopsList.innerHTML = "";
  if (filteredlist.length === 0) {
    laptopsList.innerHTML += `No item`;
  } else {
    filteredlist.forEach((laptop) => {
      laptopsList.innerHTML += `
            <div class="col-6 col-md-4 col-lg-4 p-12">
                <a href="detail.html?id=${laptop?.id}" class="card">
                    <div class="card-top">
                        <img src="${laptop.src}" alt="" />
                    </div>
                    <div class="card-bottom p-12">
                        <div class="like-btn">
                            <i class="fa-light fa-heart"></i>
                        </div>
                        <div class="card-info">
                            <span class="price">${laptop.price} <span class="currency">₼</span></span>
                            <p class="title">${laptop.name}</p>
                            <p class="brand">${laptop.brand}</p>
                        </div>
                    </div>
                </a>
            </div>`;
    });
  }
}
