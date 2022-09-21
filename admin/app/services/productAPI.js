//get api
apiGetProducts = () => {
    return axios({
      url: `https://628b995c7886bbbb37bbca5a.mockapi.io/api/Captone`,
      method: "GET",
    });
  };
  
  getProductById = (id) => {
    return axios({
      url: `https://628b995c7886bbbb37bbca5a.mockapi.io/api/Captone/${id}`,
      method: "GET",
    });
  };

  apiAddProduct = (product) =>{
    return axios ({
      url: `https://628b995c7886bbbb37bbca5a.mockapi.io/api/Captone`,
      method: "POST",
      data: product,
    })
  }

  function apiDeleteProduct(productId){
    return axios({
        url: `https://628b995c7886bbbb37bbca5a.mockapi.io/api/Captone/${productId}`,
        method: "DELETE",
    })
}

//Sửa dữ liệu từ API
function apiGetProductById(productId){
    return axios({
        url: `https://628b995c7886bbbb37bbca5a.mockapi.io/api/Captone/${productId}`,
        method: "GET",
    })
}

//Cập nhật dữ liệu từ API
function apiUpdateProduct(productId, product){
    return axios({
        url: `https://628b995c7886bbbb37bbca5a.mockapi.io/api/Captone/${productId}`,
        method: "PUT",
        data: product
    });
}


