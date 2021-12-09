const carouselImg = document.querySelector(".main-img");
const close = document.querySelector(".close");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");
const thumbnails = document.querySelectorAll(".small");
const modalThumbnails = document.querySelectorAll(".modal-thumbnails");
const minusButton = document.querySelector(".minus-button");
const addButton = document.querySelector(".add-button");
const cart = document.querySelector(".cart");
const addToCart = document.querySelector(".add-to-cart");
let currentImg = document.querySelector(".display-img");
let modal = document.querySelector(".modal");
let thumbnailImg = document.querySelectorAll(".small img");
let amount = document.querySelector(".amount");
let root = document.querySelector(":root");
let emptyCart = document.querySelector(".empty-cart");
let deleteItem = emptyCart.querySelector(".delete-button");
let numberOfItems = amount.getAttribute("data-count");

const images = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg", 
  "images/image-product-4.jpg",
];

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (event) => {
    selectedThumbnail(event.target, thumbnails);
    if (event.target.parentElement.id) {
      let imageIndex = event.target.parentElement.id;
      carouselImg.firstElementChild.setAttribute("src", images[imageIndex]);
    }
  });
});

carouselImg.addEventListener("click", () => {
  let carouselImgSrc = carouselImg.firstElementChild.getAttribute("src");
  currentImg.firstElementChild.setAttribute("src", carouselImgSrc);
  modalThumbnails.forEach((modalThumbnail) => {
    let modalValue = modalThumbnail.getAttribute("data-value");
    if (images[modalValue] == carouselImgSrc) {
      modalThumbnail.classList.add("thumbnail-active");
    } else {
      modalThumbnail.classList.remove("thumbnail-active");
    }
  });
  modal.style.display = "block";
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});

let i = 0;

nextButton.addEventListener("click", () => {
  const currentImgSrc = currentImg.firstElementChild.getAttribute("src");
  setCurrentImgSrc(currentImgSrc, images);
  i++;
  if (i >= images.length) {
    i = 0;
  }
  currentImg.firstElementChild.setAttribute("src", images[i]);
  modalThumbnails.forEach((modalThumbnail) => {
    if (modalThumbnail.getAttribute("data-value") == i) {
      modalThumbnail.classList.add("thumbnail-active");
    } else {
      modalThumbnail.classList.remove("thumbnail-active");
    }
  });
});

prevButton.addEventListener("click", () => {
  const currentImgSrc = currentImg.firstElementChild.getAttribute("src");
  setCurrentImgSrc(currentImgSrc, images);
  i--;
  if (i < 0) {
    i = images.length - 1;
  }
  currentImg.firstElementChild.setAttribute("src", images[i]);
  modalThumbnails.forEach((modalThumbnail) => {
    if (modalThumbnail.getAttribute("data-value") == i) {
      modalThumbnail.classList.add("thumbnail-active");
    } else {
      modalThumbnail.classList.remove("thumbnail-active");
    }
  });
});

function setCurrentImgSrc(imgSrc, imgArr) {
  for (let n = 0; n < imgArr.length; n++) {
    if (imgArr[n] === imgSrc) i = n;
  }
}

modalThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (event) => {
    const thumbId = event.target.getAttribute("data-value");
    currentImg.firstElementChild.setAttribute("src", images[thumbId]);
    modalSelectedThumbnail(event.target, modalThumbnails);
  });
});

function selectedThumbnail(thumb, thumbnails) {
  thumbnails.forEach((thumbnail) => {
    if (thumb.parentElement == thumbnail) {
      thumbnail.classList.add("active-small");
      thumbnail.firstElementChild.classList.add("active-small-img");
    } else {
      thumbnail.classList.remove("active-small");
      thumbnail.firstElementChild.classList.remove("active-small-img");
    }
  });
}

function modalSelectedThumbnail(thumb, modalThumbnails) {
  modalThumbnails.forEach((modalThumbnail) => {
    if (thumb == modalThumbnail) {
      modalThumbnail.classList.add("thumbnail-active");
    } else {
      modalThumbnail.classList.remove("thumbnail-active");
    }
  });
}

minusButton.addEventListener("click", () => {
  numberOfItems--;
  if (numberOfItems < 0) {
    numberOfItems = 0;
  }
  amount.setAttribute("data-count", numberOfItems);
  amount.innerHTML = numberOfItems;
});

addButton.addEventListener("click", () => {
  numberOfItems++;
  amount.setAttribute("data-count", numberOfItems);
  amount.innerHTML = numberOfItems;
});

cart.addEventListener("click", () => {
  let emptyCart = document.querySelector(".empty-cart");
    if(emptyCart.style.display == "block") {
      emptyCart.style.display = "none";
    } else {
      populateCart();
      emptyCart.style.display = "block";
    }
});

addToCart.addEventListener("click", () => {
  if(numberOfItems > 0) {
    root.style.setProperty("--pseudo-display", "inline-block");
    root.style.setProperty("--pseudo-text", `"${numberOfItems}"`);
    populateCart();
  } else {
    root.style.setProperty("--pseudo-display", "none");
    populateCart();
  }
});

let filledCartContent = document.querySelector(".filled-cart-content");
let emptyCartContent = document.querySelector(".empty-cart-content");
let itemPrice = filledCartContent.querySelector(".item-price");
let totalPrice = document.createElement("strong");

const populateCart = () => {
  if(numberOfItems > 0) {
  itemPrice.innerText = `$125.00 x ${numberOfItems}`;
  totalPrice.innerText = ` $${numberOfItems * 125.00}.00`;
  itemPrice.appendChild(totalPrice);
  filledCartContent.style.display = "block";
  emptyCartContent.style.display = "none"; 
  return emptyCart;
  } 
  filledCartContent.style.display = "none";
  emptyCartContent.style.display = "block"; 
  return emptyCart;
}

deleteItem.addEventListener("click", () => {
  numberOfItems--;
  amount.innerHTML = numberOfItems;
  if(numberOfItems > 0) {
    root.style.setProperty("--pseudo-display", "inline-block");
    root.style.setProperty("--pseudo-text", `"${numberOfItems}"`);
    populateCart();
  } else {
    root.style.setProperty("--pseudo-display", "none");
    populateCart();
  }
});

const buttons = document.querySelectorAll("[data-carousel-btn]");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselBtn === "next" ? 1 : -1;
    const slides = document.querySelector("[data-slides]");

    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if(newIndex < 0) newIndex = slides.children.length - 1;
        if(newIndex >= slides.children.length) newIndex = 0;
        
        slides.children[newIndex].dataset.active = true;
        delete activeSlide.dataset.active;
  });
});

const menu = document.querySelector(".menu");
const closeMenu = document.querySelector(".close-menu");
let activeMenu = document.querySelector(".active-menu");

menu.addEventListener("click", () => {
  activeMenu.classList.add("active");
})

closeMenu.addEventListener("click", () => {
  activeMenu.classList.remove("active");
})