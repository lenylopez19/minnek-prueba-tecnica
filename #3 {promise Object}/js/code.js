
// ################# START -> VISUAL WINDOW MANAGEMENT ###########################
function hideWindow(element){
    element.style.transition = 'opacity 0.3s ease, height 0.3s ease-out, margin 0.3s ease'
    element.style.marginBottom = '-20px';
    element.style.opacity = 0;
    setTimeout(() =>{
        element.style.display= "none";
    },200)
}

function showWindow(element,display="flex"){
    element.style.display= display;
    element.style.marginBottom = '-20px';
    element.style.transition = 'opacity 0.3s ease, height 0.3s ease-out, margin 0.3s ease'
   
    setTimeout(() =>{
        element.style.marginBottom = '0px';
        element.style.opacity = 1;
    },200)
    
}

function toggleForms(id){
    const createUserForm = document.getElementById("createUserForm");
    const loginUserForm = document.getElementById("loginUserForm");
   
    switch (id){
        case "register": 
        hideWindow(loginUserForm);
        setTimeout(() =>{
            showWindow(createUserForm,"flex");
        },300)
        

        break;
        case "signIn":
          
            hideWindow(createUserForm);
            setTimeout(() =>{
                showWindow(loginUserForm,"flex");
            },300)
        break;
    }
       
}
// ################# END -> VISUAL WINDOW MANAGEMENT ###########################


// ################# START -> VISUAL ERROR MANAGEMENT ###########################
function showError(elementErrMjs,height){
    elementErrMjs.style.display = "block";
   
    
    setTimeout(function(){
        
        elementErrMjs.style.opacity = 1;
        elementErrMjs.style.height = height;
        elementErrMjs.style.margin = "10px";
        elementErrMjs.style.padding = "10px";
        
        

    },100)
}

function hideError(elementErrMjs){
    elementErrMjs.style.opacity = 0;
    elementErrMjs.style.height = "0";
    elementErrMjs.style.margin = "0";
    elementErrMjs.style.padding = "0";
    setTimeout(function(){
        
        elementErrMjs.style.display = "none";
        

    },200)
}
// ################# END -> VISUAL ERROR MANAGEMENT ###########################



// ################# START -> VALIDATEINPUT ###########################

function validateUser(userInput){
    const err = document.getElementById("createUser-errMsj");
    const errDisplay = window.getComputedStyle(err, null).display;
    // const Regex = /^(?!.*[ !@#$%^&*(),])[a-zA-Z.\d]{6,}$/
    // const Regex = /^(?!.*[ !@#$%^&*(),])[\w-\.]{6,}$/
    const Regex = /^[^\W_](?!.*?[._]{2})[\w.]{6,18}[^\W_]$/

   

    if(Regex.test(userInput)){
        if (errDisplay != "none"){
            err.textContent = "";
            hideError(err);
            
        }
       
    
    }else{
        if (errDisplay == "none"){
            err.textContent = "User name should be atleast 6 character, can't contain spaces or special Characters other than .(dot) ";
            showError(err,"80px");  
        }
    }

    validateCreateUserForm()
}

function validateUserPassword(userInput){
    const err = document.getElementById("createUserPassword-errMsj");
    const errDisplay = window.getComputedStyle(err, null).display;
    const Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*().,])[a-zA-Z\d!@#$%^&*().,]{8,}$/

    if(Regex.test(userInput)){
        if (errDisplay != "none"){
        err.textContent = "";
        hideError(err);
       
        }
        
        
    }else{
        if (errDisplay == "none"){
            err.innerHTML = `
            <h3 style="padding:10px 0">Atleast :</h3>  
            <ul style='list-style-type:none;list-style-position:inside'>
                <li>8 Characters</li>
                <li>One special character !@#$%^&*</li>
                <li>One lowercase</li>
                <li>One uppercase</li>
            </ul>`;
            showError(err,"140px");  
        }
    }

    validateCreateUserForm()
}

function validateUserEmail(userInput){
    const err = document.getElementById("createUserEmail-errMsj");
     const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w]{2,3}$/
    const errDisplay = window.getComputedStyle(err, null).display;

    if(emailRegex.test(userInput)){
        if (errDisplay != "none"){
        err.textContent = "";
        hideError(err);
       
        }
      
       
    }else{
        err.textContent = "Fill with a valid email"
        if(errDisplay == "none"){
            showError(err,"40px");
        }
    }
    validateCreateUserForm()
}


document.getElementById("createUserForm").addEventListener("submit", (e)=>{
    e.preventDefault();
})


function validateCreateUserForm(){
    
    const userErr = document.getElementById("createUser-errMsj").innerHTML;
    const userField = document.getElementById("createUser-input").value;

    const passErr = document.getElementById("createUserPassword-errMsj").innerHTML;
    const passField = document.getElementById("createUser-password").value;

    const emailErr = document.getElementById("createUserEmail-errMsj").innerHTML;
    const emailField = document.getElementById("createUser-Email").value;

    const submitButton = document.getElementById("createUserSubmit");
    const isEnabled = submitButton.classList.contains("stateEnabled");

    if((userErr == "" && userField != "") && (passErr == "" && passField != "" ) && (emailErr == "" && emailField != "")){
        
        
        if (!isEnabled){
        submitButton.classList.toggle("stateEnabled");
        }
        
       
    }else{
       
        if (isEnabled){
            submitButton.classList.toggle("stateEnabled");
        }
    }
    

}


// ################# END -> VALIDATEINPUT ###########################




const a = document.querySelectorAll('a');

for (link of a){
    link.addEventListener('click', function(event){
        event.preventDefault();
        const id = this.getAttribute("id");
        toggleForms(id);
    });
}



const inputs = document.querySelectorAll(".inputData");

for (const input of inputs){
    input.addEventListener("focus", function(){
        
        const selectedInput = this.getAttribute("id");

        switch(selectedInput){

            case 'createUser-input':
                this.addEventListener("input",function(event){
                    
                    validateUser(this.value); 
                });
            break;

            case 'createUser-password' : 
                this.addEventListener("input",function(event){
                 
                   
                    validateUserPassword(this.value);

                });
            break;

            case 'createUser-Email':
                this.addEventListener("input",function(event){
                   
                    validateUserEmail(this.value);
                 });
            break;
        }
        
    },{once:true})

   
}


const submitButtons = document.querySelectorAll(".submitButton");
for (const button of submitButtons){
    button.addEventListener("click", function(e){
        const buttonElement = this;
        const isEnabled = button.classList.contains("stateEnabled");
        const buttonID = buttonElement.getAttribute("id");

        switch (buttonID){
            case 'createUserSubmit':
                if(isEnabled){
                    formMsj("createUserFormMsj","done");
                    document.getElementById("createUserForm").reset();
                    buttonElement.classList.toggle("stateEnabled");
                }
            break

            case '':
            break
        }
    })
}


function formMsj(formMsjId, type){
    const formMsj = document.getElementById(formMsjId);
   switch(type){
    case "done":
        formMsj.style.display = "flex";
        formMsj.style.opacity = 1;
        setTimeout(() => {
            formMsj.style.opacity = 0;
            setTimeout(() =>{
                formMsj.style.display = "none";
            },200)
        }, 2000);
    break
    case "failed":

    break
   }
}
