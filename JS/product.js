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

let newProduct =$("#newProduct")
btnSave = $("#btnSave")
formContainer = $("#formContainer")
form = $("#form")

nameTxt=$("#nameTxt")
categoryTxt=$("#categoryTxt")
quantityTxt=$("#quantityTxt")
priceTxt=$("#priceTxt")
imageTxt=$("#imageTxt")
descriptionTxt=$("#descriptionTxt")
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
    // if (nameTxt.val() == "" || nameTxt.val() == null) {
    //     validateName.html("emptyfield")

    // }
    // else {
    //     validateName.html("");
    //     console.log(nameTxt.val());
    // }

    // if (categoryTxt.val() == "" || categoryTxt.val() == null) {
    //     validateEmail.html("emptyfield")

    // }
    // else {
    //     categoryTxt.html("");
    //     console.log(categoryTxt.val());
    // }




    // if (phoneTxt.val() == "" || phoneTxt.val() == null) {
    //     validatePhone.html("emptyfield")

    // }
    // else {
    //     validatePhone.html("");
    //     console.log(phoneTxt.val());
    // }


    // if (passwordTxt.val() == "" || passwordTxt.val() == null) {
    //     validatePassword.html("emptyfield")

    // }
    // else {
    //     validatePassword.html("");
    //     console.log(passwordTxt.val());
    // }


    if (categoryTxt.val() != "" && nameTxt.val() != "" && quantityTxt.val() &&
    imageTxt.val() != "" && descriptionTxt.val()!= ""&& priceTxt.val()!= "") {

        addProduct()
        console.log(categoryTxt.val() , nameTxt.val(), quantityTxt.val(),
        imageTxt.val(), descriptionTxt.val(),priceTxt.val());
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


                    ProductsShow += `
                  <div class="col ">
                  <div class="card">
                    <div class="card-body">
                    <input type="checkbox" name="" id="" index=${i}> 
                      <img src="./${productArr.image}" class="card-img" alt="">

                      <p class=" mt-3 " style="color: rgb(43, 41, 41); text-transform: capitalize;"> ${productArr[i].category}</p>
                      <h5 class="card-title text-black">${productArr[i].name}</h5>
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

                }
                
                
             




            }
        }


    })


}


function updateProduct() {
    
    let productObj = {
       
        
                
        "name":  nameTxt.val(),
        "category": categoryTxt.val(),
        "description": descriptionTxt.val(),
        "price": priceTxt.val(),
        "quantity": quantityTxt.val(),


    }
    

    $.ajax({
        type:"put", 
url:"http://159.65.21.42:9000/update/product/"+ productArr[productIndex]._id,
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
    index = null
    clearTxtFields()

    
}
function clearTxtFields() {
    
          
    nameTxt.val("")
    categoryTxt.val("")
    descriptionTxt.val("")
    priceTxt.val("")
    quantityTxt.val("")


}