console.log("Script connected successfully")

let cartList = new Set();

document.addEventListener("DOMContentLoaded", () => {
    // auto sllider section
    autoSlider();

    // manual/button slider section
    manualSlider();

    // top product section
    changeTopProduct();

    // product details/modal open
    // product modal system added only for first 3 products
    previewProductModal();

    // product cart button action
    addToCart();

    // modal cross button action
    closeModal();

    // small product image selection to display big image
    previewImage();

    // display cart items
    previewCart();
});

function autoSlider() {
    let counter = 0;
    setInterval(function () {
        if (counter % 2 === 0) turnNext();
        else turnPre();
        counter++;
    }, 3000);  // Delay here = 3 seconds
}
function manualSlider() {
    document.getElementById("btn1").addEventListener("click", () => {
        turnPre();
    });
    document.getElementById("btn2").addEventListener("click", () => {
        turnNext();
    });
}
function turnPre() {
    document.getElementsByClassName("imgSection")[0].style.left = "0%";
    document.getElementById("btn1").style.background = "lightcoral"
    document.getElementById("btn2").style.background = "white"
}
function turnNext() {
    document.getElementsByClassName("imgSection")[0].style.left = "-100%";
    document.getElementById("btn1").style.background = "white"
    document.getElementById("btn2").style.background = "lightcoral"
}

function changeTopProduct() {
    let totalPage = 2, currentPage = 0;
    document.getElementById("pre").addEventListener("click", () => {
        currentPage--;
        if (currentPage < 0) currentPage = totalPage;
        let val = (currentPage * 105)
        document.getElementsByClassName("thumb")[0].style.left = "-" + val + "%";
    });
    document.getElementById("next").addEventListener("click", () => {
        currentPage++;
        if (currentPage > totalPage) currentPage = 0;
        let val = (currentPage * 105)
        document.getElementsByClassName("thumb")[0].style.left = "-" + val + "%";
    });
}

function previewProductModal() {
    let pImg = document.querySelectorAll(".pImg");
    for (let i = 0; i < pImg.length; i++) {
        pImg[i].addEventListener("click", () => {
            if (i < 3) {
                pImg[i].parentNode.querySelector(".pModal").style.left = "0%";
            } else {
                alert("product modal system added only for first 3 products");
            }
        });
    };
}

function addToCart() {
    document.querySelectorAll(".pCart").forEach((item) => {
        item.addEventListener("click", () => {
            let p = item.getAttribute("id");
            cartList.add(p);

            // displaying cart counter on red icon
            if (cartList.size > 0) {
                document.querySelector(".cartCount").style.display = "block";
                document.querySelector(".cartCount").innerHTML = cartList.size;
            }
        });
    });
}

function closeModal() {
    document.querySelectorAll(".cross").forEach((item) => {
        item.addEventListener("click", () => {
            item.parentNode.style.left = "-100%";
        });
    });
}

function previewImage() {
    document.querySelectorAll(".pViewSmall img").forEach((item) => {
        item.addEventListener("click", () => {
            let imgSrc = item.getAttribute("src");
            item.parentNode.parentNode.querySelector(".pViewLarge img").setAttribute("src", imgSrc);
        });
    });
}

function previewCart() {
    document.getElementsByClassName("cart")[0].addEventListener("click", () => {
        document.getElementsByClassName("cartModal")[0].style.left = "10%";
        cartModalStatus = true;

        // removing existing items
        document.querySelectorAll(".cartDes ul li").forEach((item) => {
            item.remove();
        });

        // adding new items
        let data = "", serial = 1;
        cartList.forEach((item) => {
            data += `<li>
                    <p>`+ serial + `.</p>
                    <p class="cartItem">`+ item + `</p>
                    <button class="btnMinus">-</button>
                    <p class="cartQuantity">1</p>
                    <button class="btnPlus">+</button>
                </li>`
            serial++;
        });
        document.querySelector(".cartDes ul").insertAdjacentHTML("beforeend", data);

        // item +/- button action
        cartMinus();
        cartPlus();
    });
}
function cartMinus() {
    document.querySelectorAll(".btnMinus").forEach((item) => {
        item.addEventListener("click", () => {
            let oldQuantity = item.parentNode.querySelector(".cartQuantity").innerHTML;
            let newQuantity = Math.max(oldQuantity - 1, 1);
            item.parentNode.querySelector(".cartQuantity").innerHTML = newQuantity;
        });
    });
}
function cartPlus() {
    document.querySelectorAll(".btnPlus").forEach((item) => {
        item.addEventListener("click", () => {
            let oldQuantity = item.parentNode.querySelector(".cartQuantity").innerHTML;
            let newQuantity = parseInt(oldQuantity) + 1;
            item.parentNode.querySelector(".cartQuantity").innerHTML = newQuantity;
        });
    });
}