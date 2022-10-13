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

let nameTxt = $("#nameTxt")
emailTxt = $("#emailTxt")
phoneTxt = $("#phoneTxt")

passwordTxt = $("#passwordTxt")
validateName = $("#validateName")
validateEmail = $("#validateEmail")
validatePassword = $("#validatePassword")
validatePhone = $("#validatePhone")








btnSave = $("#btnSave")
formContainer = $("#formContainer")
form = $("#form")
newUser = $("#newUser")


let setDate;
let userIndex;
let userArr = "";



$(".selectbtn").click(function () {

    $('input:checkbox').toggle()
    // $('input:checkbox').prop('checked', this.checked);  

});

loadUsers();


newUser.click(function () {
    formContainer.show()
    form.show(2000)


});

$("span").click(function () {
    formContainer.hide()
    form.hide(1000)

});


btnSave.click(function () {
    if (userIndex != null) {
        updateList()

    } else {
        validateForm()

    }

    clearTxtFields()

})


// 

$("#displayUser").on("click", ".editUser", function () {
    userIndex = $(this).attr("index");
    formContainer.show(1000)
    form.show(1000)
    btnSave.html("Update")
    nameTxt.val(userArr[userIndex].name)
    emailTxt.val(userArr[userIndex].email)
    phoneTxt.val(userArr[userIndex].phone)
});


$("#displayUser").on("click", ".deleteUser", function () {

    if (confirm("Are you sure want to delete this User?")) {
        let deleteIndex = $(this).attr("index")
        let UserId = userArr[deleteIndex]._id

        $.ajax({
            type: "delete",
            url: "http://159.65.21.42:9000/user/" + UserId,
            success: function (res) {
                console.log(res);
                if (res["success"]) {
                    alert(`${res["success"]} `)
                    console.log(res.success);
                    loadUsers()
                }
                else{
                    alert("failed to delete user")
                }

            },
            error: function (err) {
                console.log(err);
                alert(err.statusTxt)
            }


        })
    }
});



function validateForm() {
    if (nameTxt.val() == "" || nameTxt.val() == null) {
        validateName.html("emptyfield")

    }
    else {
        validateName.html("");
        console.log(nameTxt.val());
    }

    if (emailTxt.val() == "" || emailTxt.val() == null) {
        validateEmail.html("emptyfield")

    }
    else {
        validateEmail.html("");
        console.log(emailTxt.val());
    }



    if (phoneTxt.val() == "" || phoneTxt.val() == null) {
        validatePhone.html("emptyfield")

    }
    else {
        validatePhone.html("");
        console.log(phoneTxt.val());
    }


    if (passwordTxt.val() == "" || passwordTxt.val() == null) {
        validatePassword.html("emptyfield")

    }
    else {
        validatePassword.html("");
        console.log(passwordTxt.val());
    }


    if (emailTxt.val() != "" && nameTxt.val() != "" && phoneTxt.val() &&
        passwordTxt.val() != "") {

        addUser()
        console.log(emailTxt.val(), nameTxt.val(), phoneTxt.val());
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


function addUser() {
    let productObj = {

        "name": nameTxt.val(),
        "email": emailTxt.val(),

        "phone": phoneTxt.val(),
        "password": passwordTxt.val(),


    }

    $.ajax({
        type: "post",
        url: "http://159.65.21.42:9000/register ",
        data: productObj,

        success: function (res) {
            if (res["error"]) {
                alert(res["error"])
                console.log(res["error"]);
                window.location.href = "404.html"
            }
            else {


                alert(`${res["name"]} was added successfully`)
            }
            loadUsers()

        },

        error: function (err) {
            console.log(err)
            window.location.href = "404.html"
        }
    });

}



function loadUsers() {

    $.ajax({
        type: "get",
        url: "http://159.65.21.42:9000/users",
        data: "res",

        success: function (res) {
            if (res.error) {
                console.log(error);

            } else {
                console.log(res);
                userArr = res;
                res = res.reverse()
                let usersShow = ``
                for (let i = 0; i < userArr.length; i++) {


                    usersShow += `
                <tr>
                     
                <th scope="row"><input type="checkbox" name="" id=""> ${i + 1}</th>
                
                <td>${userArr[i].name}</td>
                <td>${userArr[i].email}</td>
                <td>${userArr[i].phone}</td>
                <td><button class="btn btn-primary btn-sm mb-2 editUser"index= ${i}>Edit</button> <button class="btn btn-danger deleteUser"index= ${i}> Delete</button></td>
              </tr>
                
                
                
                `
                    $("#displayUser").html(usersShow);

                }





            }
        }


    })


}


function updateList() {
    
    let productObj = {

        "name": nameTxt.val(),
        "email": emailTxt.val(),

        "phone": phoneTxt.val(),
        "password": passwordTxt.val(),


    }
    // userArr[userIndex] = userArr;

    $.ajax({
        type:"put",
url:"http://159.65.21.42:9000/user/"+ userArr[userIndex]._id,
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
    emailTxt.val("")
    phoneTxt.val()
    passwordTxt.val()
    // dateTxt.val("")



}



// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)',
//                 'rgba(153, 102, 255, 0.2)',
//                 'rgba(255, 159, 64, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)',
//                 'rgba(153, 102, 255, 1)',
//                 'rgba(255, 159, 64, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });

