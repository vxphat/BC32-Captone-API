function getId(id) {
    return document.getElementById(id);
}

function dom(selector) {
    return document.querySelector(selector);
}

function domAll(selector) {
    return document.querySelectorAll(selector);
}


const productList = new DanhSachSanPham();
const tableList = new GioHang();
const mappingTable = () => {};
const shopping_cart = dom('.shopping_cart');
const cartBtns = domAll('.addToCart');



// const service = new Service();


const getProduct = () => {

    getListProductAPI()
        .then((result) => {
            productList.addProduct(result.data);
            renderProduct();
        })
        .catch((error) => console.error(error));
};
getProduct();


const renderProduct = () => {
    const product = productList.filterProduct().reduce((total, ele, idx) => {
        total += `
    <div class="col-3 p-0">
                    <div class="card">
                        <div class="card-header">
                            <img src="${ele.img}" alt="${ele.name}">
                        </div>
                        <div class="card-body">
                            <div class="card-title">
                                <h6 class="name__product">${ele.name}</h6>
                                <h6 class="price__product">${ele.price} đ</h6>
                            </div>
                            <div class="card-info">
                                <ul>
                                    <li><span>Screen:</span> ${ele.screen} </li>
                                    <li><span>Back Cam:</span> ${ele.backCamera} </li>
                                    <li><span>Front Cam:</span> ${ele.frontCamera}</li>
                                    <li><span>Desc:</span> ${ele.desc}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="card-footer">
                            <button id="btnThem" class="btn-addCart addToCart" onclick="themProduct('${idx}')">Add to cart</button>
                        </div>
                    </div>
                </div>
    `;
        return total;
    }, "");
    getId("productList").innerHTML = product;
};


getId("selectProduct").onchange = () => {
    const value = getId("selectProduct").value;
    productList.selectProduct = value;
    renderProduct();
};



const themProduct = (id) => {
    getProductById(id)
        .then((result) => {
            tableList.addToCart(result.data);
            renderTable();
            totalCart();
        })
        .catch((error) => console.error(error));
};

function deleteCart(productId) {
    tableList.DSGH.deleteCart(productId);
    renderTable(tableList.DSGH);
}


const renderTable = () => {
    const product = tableList.DSGH.reduce((total, item, idx) => {
        const {
            id,
            name,
            img,
            price
        } = item.product;
        const {
            quantity
        } = item.quantity;

        total += `
    <tr>
      <td>${idx + 1}</td>
      <td>${name}</td>
      <td><img class="img-item w-25" src="${img}" /></td>
      <td class="price">${price}</td>
      <td class="quantity-item">

      <button 
      class="minusQuantity"
      onclick="giamSL(${id})"
      >
      <i class="las la-minus"></i>
      </button>
      
      <input
      name=""
      id="soLuongSP"
      class="btn"
      type="button"
      disable
      value="${item.quantity}"
    />
    
      <button class="addQuantity" onclick="tangSL(${id})">
      <i class="las la-plus"></i>
      </button>
      
      </td>
      <td>

      <button 
      class="btn-delete" 
      title="xoá"
      onclick="deleteItem(${id})"
      >
      <i class="fa-regular fa-trash-can text-danger"></i>
      </button>
      </td>
    </tr>

    `;
        return total;
    }, "");
    getId("tableProduct").innerHTML = product;
};

const giamSL = (id) => {
    getProductById(id)
        .then((response) => {
            console.log(response);
            tableList.minusItem(response.data);
            renderTable();
            totalCart();
        })
        .catch((error) => console.log(error))
};

const tangSL = (id) => {
    getProductById(id)
        .then((response) => {
            console.log(response);
            tableList.addToCart(response.data);
            renderTable();
            totalCart()
        })
        .catch((error) => console.log(error))
};

const deleteItem = (id) => {
    getProductById(id)
        .then((response) => {
            // console.log(response);
            tableList.deleteItemCart(response.data.id);
            renderTable();
            
        })
        .catch((error) => console.log(error))
};

for (cartBtn of cartBtns) {
    cartBtn.onclick = (e) => {
        let product_count = Number(shopping_cart.getAttribute('data-product-count')) || 0;
        shopping_cart.setAttribute('data-product-count', product_count + 1)

    }
}

const totalCart = () => {
    const product = tableList.DSGH.reduce((total, item, index) => {
        total += Number(item.product.price) * Number(item.quantity);
        return total;

    }, 0)
    dom('#total').innerHTML = product;
}