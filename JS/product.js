(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})();

let newProduct =$("#newProduct"),
btnSave = $("#btnSave"),
formContainer = $("#formContainer"),
form = $("#form"),

nameTxt=$("#nameTxt"),
categoryTxt=$("#categoryTxt"),
quantityTxt=$("#quantityTxt"),
priceTxt=$("#priceTxt"),
imageTxt=$("#imageTxt"),
descriptionTxt=$("#descriptionTxt");
let productIndex

 loadProducts()
newProduct.click(function () {
    formContainer.show()
    form.show(2000)


});

$("span").click(function () {
    formContainer.hide()
    form.hide(1000)

});









 $(".selectbtn").click(function () { 
  
    $('input:checkbox').toggle() 
    // $('input:checkbox').prop('checked', this.checked);  
    
 });

 $("#displayProducts").on("click", ".editProduct", function () {
    productIndex = $(this).attr("index");
    formContainer.show(1000)
    form.show(1000)
    btnSave.html("Update")
    // imageTxt.val(productArr[productIndex].image)
    nameTxt.val(productArr[productIndex].name)
    categoryTxt.val(productArr[productIndex].category)
    priceTxt.val(productArr[productIndex].price)
    quantityTxt.val(productArr[productIndex].quantity)
    descriptionTxt.val(productArr[productIndex].description)
    imageTxt.val(productArr[productIndex].image);

console.log(nameTxt.val(),
    categoryTxt.val(),
    priceTxt.val(),
      quantityTxt.val(),
      descriptionTxt.val());
    






});


$("#displayProducts").on("click", ".deleteProduct", function () {

    if (confirm("Are you sure want to delete this Product?")) {
        let deleteIndex = $(this).attr("index")
        let productId = productArr[deleteIndex]._id

        $.ajax({
            type: "delete",
            url: "http://159.65.21.42:9000/Product/" + productId,
            success: function (res) {
                console.log(res);
                if (res["success"]) {
                    alert(`${res["success"]} `)
                    console.log(res.success);
                    loadProducts()
                }
                else{
                    alert("failed to delete Product")
                }

            },
            error: function (err) {
                console.log(err);
                alert(err.statusTxt)
            }


        })
    }
});

btnSave.click(function () {
    if (productIndex != null) {
        updateProduct()

    } else {
        validateForm()

    }

    // clearTxtFields()

})


 function validateForm() {
    


    if (categoryTxt.val() != "" && nameTxt.val() != "" && quantityTxt.val() &&
    imageTxt.val() != "" && descriptionTxt.val()!= ""&& priceTxt.val()!= "") {

        addProduct()
      
        console.log(categoryTxt.val() , nameTxt.val(), quantityTxt.val(),
        imageTxt.val(), descriptionTxt.val(),priceTxt.val());
        clearTxtFields()
        formContainer.hide()
    }
    //    if (dateTxt.val()==""||dateTxt.val()==null) {
    //     validateDate.html("emptyfield")

    //       }
    //     else {
    //         validateDate.html("");
    //         console.log(dateTxt.val());
    //    } 


}

//  function addProduct() {
//     let productObj = {

//         "name": nameTxt.val(),
//         "email": categoryTxt.val(),

//         "phone": phoneTxt.val(),
//         "password": passwordTxt.val(),


//     }

//     $.ajax({
//         type: "post",
//         url: "http://159.65.21.42:9000/register ",
//         data: productObj,

//         success: function (res) {
//             if (res["error"]) {
//                 alert(res["error"])
//                 console.log(res["error"]);
//                 window.location.href = "404.html"
//             }
//             else {


//                 alert(`${res["name"]} was added successfully`)
//             }
//             loadProducts()

//         },

//         error: function (err) {
//             console.log(err)
//             window.location.href = "404.html"
//         }
//     });

// }


 function loadProducts() {

    $.ajax({
        type: "get",
        url: "http://159.65.21.42:9000/Products",
        data: "res",

        success: function (res) {
            if (res.error) {
                console.log(error);

            } else {
                console.log(res);
                productArr = res;
                res = res.reverse()
                let ProductsShow = ``
                for (let i = 0; i < productArr.length; i++) {
if (productArr[i].category=="vincent") {
    


                    ProductsShow += `
                  <div class="col ">
                  <div class="card">
                    <div class="card-body">
                    <input type="checkbox" name="" id="" index=${i}> 
                      <img src="http://159.65.21.42:9000${productArr[i].image}" class="card-img" alt="" height="250">

                 
                      <h5 class="card-title text-black">${productArr[i].name}</h5>
                      <p class=" mt-3 " style="color: rgb(43, 41, 41); text-transform: capitalize;"> ${productArr[i].category}</p>
                      <p class="card-text" style="color: rgb(141, 137, 137);"   >${productArr[i].description}</p>
                    </div>
                    <div class="d-flex container mt-3 mb-3 ">
                     <div class="col-3"><button class="editProduct btn btn-outline-primary mb-2 text-light" index=${i}> <i class="fa fa-edit" aria-hidden="true"></i></button>
                     </div>
                    <div class="col-3 ">
                       <button type="button" class="deleteProduct btn btn-outline-danger  text-light"index=${i} ><i class="fa fa-trash " aria-hidden="true" ></i></button>
                     </div>
                     <p class="ms-3"> $${productArr[i].price} | ${productArr[i].quantity} in stock</p> </div>
                       
                    </div>
                  </div>

                `
                    $("#displayProducts").html(ProductsShow);
                    $("#productsNo").html(productArr.length);
                    
                }
            }
                
             




            }
        }


    })


}


function updateProduct() {
    let id=productArr[productIndex]._id

let productObj={
"name":$(input[name="name"].val()),
"category":$(input[name="category"].val()),
"quantity":$(input[name="quantity"].val()),
"description":$(input[name="description"].val()),
"price":$(input[name="price"].val()),
"price":$(input[name="image"].val()),

}
    $.ajax({
        type:"put",
url:"http://159.65.21.42:9000/update/product/"+id,
data:productObj,
success:function (res) {
    if (res.error) {
     
       
        alert(res.error)
        console.log(res.error);
        
    }
    else{
        loadUsers()
        alert(`${res["name"]} was updated successfully`)
       
        

    }
}

    })

  
    formContainer.hide()
    form.hide()
    btnSave.html("Save")
    productIndex = null
    loadProducts()
    clearTxtFields()

    
}


function updateList() {
    
    let productObj = {

        "name": nameTxt.val(),
        "email": emailTxt.val(),

        "phone": phoneTxt.val(),
        "password": passwordTxt.val(),


    }
    // userArr[userIndex] = userArr;

  

  
    formContainer.hide()
    form.hide()
    btnSave.html("Save")
    index = null
    clearTxtFields()

    
}
function clearTxtFields() {
    
          imageTxt.val("")
    nameTxt.val("")
    categoryTxt.val("")
    descriptionTxt.val("")
    priceTxt.val("")
    quantityTxt.val("")


}