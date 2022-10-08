let itemTxt =$("#itemTxt")
descriptionTxt=$("#descriptionTxt") 
validateItem=$("#validateItem") 
validateDescription=$("#validateDescription") 
validateDate =$("#validateDate")         
dateTxt=$("#dateTxt")
btnSave=$("#btnSave")
formContainer=$("#formContainer")
form=$("#form")
newTask=$("#newTask")
displaytxt=$("#displaytxt")
toDoList=[];
 let setDate;
let itemIndex;
$(".selectbtn").click(function () { 
  
    $('input:checkbox').toggle() 
    // $('input:checkbox').prop('checked', this.checked);  
    
 });
 



newTask.click(function () { 
    formContainer.show()
    form.show(2000)
            
    
});

$("span").click(function () { 
    formContainer.hide()
    form.hide(1000)
    
});

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
btnSave.click(function () {
    if ( itemIndex!=null ) {
        updateList()
        
    } else {
        validateForm()
        
    }
   
    clearTxtFields()
    
})


displaytxt.on("click",".editTask", function () {
   itemIndex= $(this).attr("index");
    formContainer.show(1000)
    form.show(1000)
            btnSave.html("Update")
    itemTxt.val( toDoList[itemIndex].item)
    descriptionTxt.val([toDoList[itemIndex].description])
    dateTxt.val([toDoList[itemIndex].date])


    
});


displaytxt.on("click",".deleteTask", function () {
   
     if (confirm("Are you sure want to delete this task?") ) {
        let deleteIndex = $(this).attr("index")
        toDoList.splice(deleteIndex,1)
        
      console.log(deleteIndex);
      localStorage.setItem("toDoTask",JSON.stringify(toDoList))
          loadList()
     }
  
 });

function validateForm() {
   if (itemTxt.val()==""||itemTxt.val()==null ) {
    validateItem.html("emptyfield")
    
      }
    else {
        validateItem.html("");
        console.log(itemTxt.val());
   } 

   if (descriptionTxt.val()==""||descriptionTxt.val()==null) {
    validateDescription.html("emptyfield")
    
      }
    else {
        validateDescription.html("");
        console.log(descriptionTxt.val());
   } 


   if (descriptionTxt.val()!=""&& itemTxt.val()!="") {
    
addItem()
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


function addItem() {
setDate=` ${new Date( dateTxt.val() ).getDate()}| ${new Date( dateTxt.val() ).getFullYear()}`
    let toDoItem={
        "item":itemTxt.val(),
"description":descriptionTxt.val(),
"date":setDate


    }
    toDoList.push(toDoItem)
console.log(toDoList)
$("#tasksNo").html(toDoList.length)

localStorage.setItem("toDoTask",JSON.stringify(toDoList))
loadList()
}



function loadList() {

    let getStorage =localStorage.getItem("toDoTask")
    if (getStorage!=null) {
        toDoList= JSON.parse(getStorage)
    }
    
   let itemsShow=``
    for (let i = 0; i < toDoList.length; i++) {

        if ( dateTxt.val()!="") {
            itemsShow+=`
            <div class="col" >
            <div class="p-5 border bg-light rounded-5">
            <p>DUE ${ toDoList[i].date} </p>
            
            <h3>${toDoList[i].item} </h3>
            <p> ${toDoList[i].description} </p>
    
            <button class="editTask btn btn-outline-primary mb-2 text-light" index=${i}> <i class="fa fa-edit" aria-hidden="true"></i></button>
            
            <button type="button" class="deleteTask btn btn-outline-danger text-light"index=${i} ><i class="fa fa-trash " aria-hidden="true" ></i></button>
            </div>
            </div>
            
            
            
            `
            $("#displaytxt").html(itemsShow);
    
        }
         else {
            itemsShow+=`
            <div class="col" >
            <div class="p-5 border bg-light rounded-5">
          
            
            <h3>${toDoList[i].item} </h3>
            <p> ${toDoList[i].description} </p>
    
            <button class="editTask btn btn-outline-primary mb-2 text-light" index=${i}> <i class="fa fa-edit" aria-hidden="true"></i></button>
            
            <button type="button" class="deleteTask btn btn-outline-danger text-light"index=${i} ><i class="fa fa-trash " aria-hidden="true" ></i></button>
            </div>
            </div>
            
            
            
            `
            $("#displaytxt").html(itemsShow);
            
        }

   

    }
}


function updateList() {
    let toDoItem={
        "item":itemTxt.val(),
"description":descriptionTxt.val(),
"date":setDate


    }
    toDoList[itemIndex]= toDoItem;
    localStorage.setItem("toDoTask",JSON.stringify(toDoList))
    formContainer.hide()
    form.hide()
    btnSave.html("Save")
    index=null
    loadList()
}

function clearTxtFields() {
   
    itemTxt.val("")
    descriptionTxt.val("")
    dateTxt.val("")
    
 
 
 }



const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

