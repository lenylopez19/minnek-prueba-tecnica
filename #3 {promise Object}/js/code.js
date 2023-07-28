

function hide(element){
    element.style.transition = 'opacity 0.3s ease-out, margin 0.3s ease'
    element.style.marginBottom = '-20px';
    element.style.opacity = 0;
    setTimeout(() =>{
        element.style.display= "none";
    },200)
}

function showWindow(element,display){
    element.style.display= display;
    element.style.marginBottom = '-20px';
    element.style.transition = 'opacity 0.3s ease-out, margin 0.3s ease'
   
    setTimeout(() =>{
        element.style.marginBottom = '0px';
        element.style.opacity = 1;
    },200)
    
}

function toggleForms(id){
    const createUserForm = document.getElementById("createUserForm");
    const loginUserForm = document.getElementById("loginUserForm");
    console.log("id is: "+ id);
    switch (id){
        case "register": 
        hide(loginUserForm);
        setTimeout(() =>{
            showWindow(createUserForm,"flex");
        },300)
        

        break;
        case "signIn":
            console.log("logincalled")
            hide(createUserForm);
            setTimeout(() =>{
                showWindow(loginUserForm,"flex");
            },300)
        break;
    }
       
}


const a = document.querySelectorAll('a');

for (link of a){
    link.addEventListener('click', function(event){
        event.preventDefault();
        const id = this.getAttribute("id");
        toggleForms(id);
    });
}



const inputs = document.querySelectorAll(".inputData");
for (input of inputs){

    input.addEventListener("click", function(){
        const selectedInput = this.getAttribute("id");
        switch(selectedInput){

            case 'createUserInput':

                this.addEventListener("keyup",function(event){
                    // call validate createUser function
                    validateUser(this.value);
                 });

            break;

            case 'createUserPassword' : 

                this.addEventListener("keyup",function(event){
                    //call password value function
                    console.log(this.value);
                });
                
            break;

            case 'createUserEmail':
                this.addEventListener("keyup",function(event){
                    // call validate emailUser function
                    console.log(this.value);
                 });
            break;
        }
        
    })
}

function validateUser(key){
    const err = document.getElementById("userErrMsj");
    let errDisplay = window.getComputedStyle(err, null).display;

    if (key.length < 6){
        if (errDisplay == "none"){
        err.textContent = "User name should be atleast 6 character";
        setTimeout(function(){
            showWindow(err,"inline-block");
        },200)
        }

        // if()
        
    }else{
        hide(err);
        err.style.opacity = 0;
        setTimeout(function(){
            err.style.display = "none";
            err.textContent = "";

        },300);
    }
    
}