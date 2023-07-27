
const a = document.querySelectorAll('a');

for (link of a){
    link.addEventListener('click', function(event){
        event.preventDefault();
        const id = this.getAttribute("id");
        toggleForms(id);
    });
}

function hide(element){
    element.style.transition = 'opacity 0.3s ease-out, margin 0.3s ease'
    element.style.marginBottom = '-20px';
    element.style.opacity = 0;
    setTimeout(() =>{
        element.style.display= "none";
    },200)
}

function show(element){
    element.style.display="flex";
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
            show(createUserForm);
        },300)
        

        break;
        case "signIn":
            console.log("logincalled")
            hide(createUserForm);
            setTimeout(() =>{
                show(loginUserForm);
            },300)
        break;
    }
       
}