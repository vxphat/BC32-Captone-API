getProducts();

function getProducts() {
    apiGetProducts()
        .then((response) => {
            console.log(response.data);

            let products = response.data.map((product) => {
                return new Product(
                    product.id,
                    product.name,
                    product.price,
                    product.screen,
                    product.backCamera,
                    product.frontCamera,
                    product.img,
                    product.desc,
                    product.type)
            })
            display(products);
        })

        .catch((error) => {
            console.log(error);
        })
}

//Hiển thị data ra màn hình
function display(products) {
    let html = products.reduce((result, product, index) => {
        return result + `
        
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${formatVND(product.price.toString())}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>
            <img src="${product.img}" width="50px" height="50px"/>
            </td>
            <td>${product.desc}</td>
            <td>${product.type}</td>
            <td>
                <button
                class="btn btn-success" 
                data-id="${product.id}"
                data-type="edit"
                data-toggle="modal"
                data-target="#myModal"
                >
                Sửa
                </button>

                <button  
                class="btn btn-danger" 
                data-id="${product.id}"
                data-type="delete"
                >
                Xoá
            </button>
            </td>
        </tr>
        `
    }, "")
    dom('#tblDanhSachSP').innerHTML = html;
}

function resetForm() {
    dom('#name').value = "";
    dom('#price').value = "";
    dom('#screen').value = "";
    dom('#backCamera').value = "";
    dom('#frontCamera').value = "";
    dom('#image').value = "";
    dom('#desc').value = "";
    dom('#type').value = "Chọn loại sản phẩm";
}

function addProduct(product) {
    apiAddProduct(product)
        .then(() => {
            getProducts();
        })
        .catch((error) => {
            console.log(error);
        })
}

//Gắn sự kiện vào nút Thêm mới để đặt lại tiêu đề và thêm nút Huỷ và Thêm ở modal
dom('#btnThemSP').addEventListener('click', () => {
    dom('.modal-title').innerHTML = "Thêm sản phẩm"
    dom('.modal-footer').innerHTML = `
    <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
    <button class="btn btn-primary" data-type="add" >Thêm</button>
    `;

    resetForm();
})

//Gắn sự kiện vào nút Sửa để đặt lại tiêu đề và thêm nút Huỷ và Cập nhật ở modal
dom('#tblDanhSachSP').addEventListener('click', (evt) => {
    let id = evt.target.getAttribute('data-id');
    let elType = evt.target.getAttribute('data-type');

    if (elType === 'delete') {
        deleteProduct(id);
    } else if (elType === "edit") {
        dom('.modal-title').innerHTML = "Cập nhật sản phẩm"
        dom('.modal-footer').innerHTML = `
    <button class="btn btn-danger" data-dismiss="modal">Hủy</button>
    <button class="btn btn-primary" data-type="update" >Cập nhật</button>
    `;

        apiGetProductById(id)
            .then((response) => {
                let product = response.data;

                dom('#id').value = product.id;
                dom('#name').value = product.name;
                dom('#price').value = product.price;
                dom('#screen').value = product.screen;
                dom('#backCamera').value = product.backCamera;
                dom('#frontCamera').value = product.frontCamera;
                dom('#image').value = product.img;
                dom('#desc').value = product.desc;
                dom('#type').value = product.type;
            })
            .catch((error) => {
                console.log(error);
            });
    }

});

dom(".modal-footer").addEventListener("click", (evt) => {
    let elementType = evt.target.getAttribute("data-type")

    //dom
    let id = dom('#id').value;
    let name = dom('#name').value;
    let price = dom('#price').value;
    let screen = dom('#screen').value;
    let backCamera = dom('#backCamera').value;
    let frontCamera = dom('#frontCamera').value;
    let image = dom('#image').value;
    let desc = dom('#desc').value;
    let type = dom('#type').value;

    let valid = validateForm();    
    if(!valid){
        return
    }
    
    let product = new Product(null, name, price, screen, backCamera, frontCamera, image, desc, type)

    if(elementType === "add"){
        addProduct(product);
    }else if(elementType === "update"){
        updateProduct(id, product);
    }
});




function updateProduct(productId, product) {
    apiUpdateProduct(productId, product)
        .then(() => {
            getProducts();
        })
        .catch((error) => {
            console.log(error)
        })
}

function deleteProduct(productId) {
    apiDeleteProduct(productId)
        .then(() => {
            getProducts();
        })
        .catch((error) => {
            console.log(error);
        });
}

function formatVND(str) {
    return str
       .split("")
       .reverse()
       .reduce((prev, next, index) => {
          return (index % 3 ? next : next + ",") + prev;
       });
  }



function dom(selector) {
    return document.querySelector(selector);
}


//========VALIDATION=========
const validateName = () =>{
    let name = dom('#name').value;
    let spanEl = dom('#tbName');

    if(!name){
        spanEl.innerHTML = "Dữ liệu không được để trống"
        return false;
    }

    spanEl.innerHTML = "";
    return true
}

const validatePrice = () =>{
    let price = dom('#price').value;
    let spanEl = dom('#tbPrice');
    

    if(!price){
        spanEl.innerHTML = "Dữ liệu không được để trống"
        return false;
    }

    let regex = /^-?\d*\.?\d*$/;

    if(!regex.test(price)){
        spanEl.innerHTML = "Giá không được có ký tự"
        return false;
    }

    spanEl.innerHTML = "";
    return true
}

const validateScreen = () =>{
    let screen = dom('#screen').value;
    let spanEl = dom('#tbScreen');
    
    if(!screen){
        spanEl.innerHTML = "Dữ liệu không được để trống"
        return false;
    }

    spanEl.innerHTML = "";
    return true
}

const validateBackCam = () =>{
    let backCam = dom('#backCamera').value;
    let spanEl = dom('#tbBCam');
    
    if(!backCam){
        spanEl.innerHTML = "Dữ liệu không được để trống"
        return false;
    }

    spanEl.innerHTML = "";
    return true
}

const validateFrontCam = () =>{
    let frontCam = dom('#frontCamera').value;
    let spanEl = dom('#tbFCam');
    
    if(!frontCam){
        spanEl.innerHTML = "Dữ liệu không được để trống"
        return false;
    }

    spanEl.innerHTML = "";
    return true
}

const validateImage = () =>{
    let img = dom('#image').value;
    let spanEl = dom('#tbImg');
    
    if(!img){
        spanEl.innerHTML = "Dữ liệu không được để trống"
        return false;
    }

    spanEl.innerHTML = "";
    return true
}

const validateDesc = () =>{
    let desc = dom('#desc').value;
    let spanEl = dom('#tbDesc');
    
    if(!desc){
        spanEl.innerHTML = "Dữ liệu không được để trống"
        return false;
    }

    if(desc.length > 50){
        spanEl.innerHTML = "Dữ liệu không được quá 50 ký tự"
        return false;
    }

    spanEl.innerHTML = "";
    return true
}

const validateType = () =>{
    let type = dom('#type').value;
    let spanEl = dom('#tbType');
    
    if(type === "Chọn loại sản phẩm"){
        spanEl.innerHTML = "Chưa chọn loại sản phẩm"
        return false;
    }

    spanEl.innerHTML = "";
    return true
}

const validateForm = () =>{
    let isValid = true;

    isValid = 
    validateName()
    & validatePrice()
    & validateScreen()
    & validateBackCam()
    & validateFrontCam()
    & validateImage()
    & validateDesc()
    & validateType();

    if(!isValid){
        return true;
    }
    return true;
}