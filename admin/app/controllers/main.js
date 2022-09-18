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
            <td>${product.price}</td>
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



function dom(selector) {
    return document.querySelector(selector);
}