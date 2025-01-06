// Crud system //
// Cart //
const numWish = document.querySelector(".num-wish");
const numCart = document.querySelector(".num-cart");
let addBtns = document.querySelectorAll(".btn-add");
let favBtns = document.querySelectorAll(".fav");
const cart = JSON.parse(localStorage.getItem("CartArray")) || [];
const wish = JSON.parse(localStorage.getItem("WishArray")) || [];

addBtns.forEach((btn, ind) => {
  btn.addEventListener("click", (e) => {
    if (!e.target.classList.contains("btn-remove")) {
      let item = {
        id: ind,
        name: `${e.target.parentElement.children[1].children[2].children[0].innerHTML}`,
        price: `${e.target.parentElement.children[1].children[0].innerHTML}`,
        cat: `${e.target.parentElement.children[1].children[1].innerHTML}`,
        count: 1,
        imgSrc: `${e.target.parentElement.children[0].children[0].getAttribute(
          "src"
        )}`,
      };

      cart.push(item);
      localStorage.setItem("CartArray", JSON.stringify(cart));
      e.target.classList.add("btn-remove");
      e.target.innerHTML = "Remove Cart";
      displayCart();
    } else {
      cart.splice(cart[cart.find((obj) => obj.id === ind)], 1);
      localStorage.setItem("CartArray", JSON.stringify(cart));
      e.target.classList.remove("btn-remove");
      e.target.innerHTML = "Add Cart";
      displayCart();
    }
  });
});
let numOfCart = 0;
addBtns.forEach((btn, ind) => {
  for (let i = 0; i < cart.length; i++) {
    if (cart.find((obj) => obj.id === ind)) {
      btn.classList.add("btn-remove");
      btn.innerHTML = "Remove Cart";
    }
  }
});
let totalPriceText = document.querySelector(".total-price");
function displayCart() {
  let totalPrice = 0;
  numOfCart = cart.length;
  numCart.innerHTML = numOfCart;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price.substring(1) * cart[i].count;
  }
  totalPriceText.innerHTML = "$ " + totalPrice;
}

displayCart();

// Wish //

favBtns.forEach((btn, ind) => {
  btn.addEventListener("click", (e) => {
    if (!e.target.parentElement.classList.contains("wish-remove")) {
      let item = {
        id: ind,
        name: `${e.target.parentElement.parentElement.children[4].children[0].innerHTML}`,
        price: `${e.target.parentElement.parentElement.children[4].children[1].innerHTML}`,
        cat: `${e.target.parentElement.parentElement.children[3].innerHTML}`,
        imgSrc: `${e.target.parentElement.parentElement.children[2].getAttribute(
          "src"
        )}`,
      };
      wish.push(item);
      localStorage.setItem("WishArray", JSON.stringify(wish));
      e.target.parentElement.classList.add("wish-remove");
      e.target.parentElement.innerHTML =
        "<i class='fa-solid fa-heart-crack'></i>";
      displayWish();
    } else {
      wish.splice(wish[wish.find((obj) => obj.id === ind)], 1);
      e.target.parentElement.classList.remove("wish-remove");
      localStorage.setItem("WishArray", JSON.stringify(wish));
      e.target.parentElement.innerHTML = "<i class='fa-solid fa-heart'></i>";
      displayWish();
    }
  });
});

//
let numOfWish = 0;

favBtns.forEach((btn, ind) => {
  for (let i = 0; i < wish.length; i++) {
    if (wish.find((obj) => obj.id === ind)) {
      btn.classList.add("wish-remove");
      btn.innerHTML = "<i class='fa-solid fa-heart-crack'></i>";
    }
  }
});
function displayWish() {
  numOfWish = wish.length;
  numWish.innerHTML = numOfWish;
}
displayWish();

//  super Section  //
// tabs

function tabingChange(Section) {
  let btnsArray = Array.from(
    document.querySelectorAll(`${Section} .tabs button`)
  );
  let superArray = Array.from(
    document.querySelectorAll(`${Section} .items-list`)
  );
  var i = 0;
  btnsArray.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      btnsArray.forEach((b) => {
        b.setAttribute("data-show", "false");
      });
      i = btnsArray.indexOf(btn);
      superArray.forEach((arr) => {
        arr.classList.replace("d-flex", "d-none");
      });
      e.target.setAttribute("data-show", "true");
      superArray[i].classList.replace("d-none", "d-flex");
    });
  });
}
tabingChange("#super");
tabingChange("#newArrival");
// time offer
const offerTime = Array.from(document.querySelectorAll(".time-end"));
let nowTime = new Date();
let endTime = new Date("Sep 16, 2024 16:35:00");

let timer = setInterval(() => {
  nowTime = new Date();
  let timeDifference = endTime.getTime() - nowTime.getTime();
  if (timeDifference > 0) {
    let seconds = Math.floor(timeDifference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    days < 10 ? (days = "0" + days) : "";

    hours = hours % 24;
    hours < 10 ? (hours = "0" + hours) : "";
    minutes = minutes % 60;
    minutes < 10 ? (minutes = "0" + minutes) : "";
    seconds = seconds % 60;
    seconds < 10 ? (seconds = "0" + seconds) : "";

    offerTime.forEach((time) => {
      time.innerHTML = `<b> ${days} :  ${hours} : ${minutes} : ${seconds}</b>`;
    });
  } else {
    offerTime.forEach((time) => {
      time.innerHTML = "This Offer ends";
    });
    clearInterval(timer);
  }
}, 1000);
///////////////////

//  Trends Section  //

let nextBtnTrend = document.querySelector(".next-trend-btn");

let pervBtnTrend = document.querySelector(".perv-trend-btn");
let trends = document.querySelector(".trend-flex");

let x = 0;

nextBtnTrend.addEventListener("click", () => {
  x += 100;
  if (window.screen.width < 550) {
    if (x > trends.clientWidth - 250) {
      x = trends.clientWidth - 250;
    }
  } else if (window.screen.width < 950) {
    if (x > trends.clientWidth - 600) {
      x = trends.clientWidth - 600;
    }
  } else {
    if (x > trends.clientWidth - 800) {
      x = trends.clientWidth - 800;
    }
  }
  trends.style.transform = `translateX(${-x}px)`;
});

pervBtnTrend.addEventListener("click", () => {
  x -= 100;
  if (x < 0) {
    x = -100;
  }
  trends.style.transform = `translateX(${-x}px)`;
});

//  Brands Section  //

const brandsScroller = document.querySelector(".brands-flex");
const brandsInner = Array.from(brandsScroller.children);

brandsInner.forEach((brandI) => {
  const dupl = brandI.cloneNode(true);
  brandsScroller.appendChild(dupl);
});

//  Aside arrow Section  //
const arrow = document.querySelector(".arrowUp");
const hero = document.getElementById("home");

window.addEventListener("scroll", () => {
  hero.getBoundingClientRect().bottom < 0
    ? arrow.classList.add("showArrow")
    : arrow.classList.remove("showArrow");
});

//  Aside loading Section  //
const loadingDiv = document.querySelector(".loading");

window.onload = function () {
  loadingDiv.classList.replace("opacity-1", "opacity-0");

  setTimeout(() => {
    loadingDiv.classList.add("d-none");
  }, 500);
};