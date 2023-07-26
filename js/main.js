var userName=document.getElementById('name');
var email=document.getElementById('email');
var password=document.getElementById('password');
var userNameShow=document.getElementById('user-name-show');
var logoutBtn=document.getElementById('logout-btn')
var nameRegex=/^[A-Z]\w{3,}(\s+\w+)*$/;
//-------- var emailRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w*)+$/g; --------
var emailRegex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
var passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/; 
// btn holders
var entryBtn=document.getElementById('entry-btn')

// alert holder 
var alretHolder=document.querySelector('.alert');
// objct that hold user data 
var allUsers;
if (localStorage.getItem('users')!=null) {
    allUsers= JSON.parse( localStorage.getItem('users') );
    
}else{allUsers=[]}



// -------- sighUp event --------
if (document.body.contains(entryBtn)) {
    entryBtn.addEventListener('click',function () {
        if (entryBtn.innerHTML=='Login') {
            login();
        } else {
            sighUp() ;
        }
    
    })

// --------event on inputs when it change--------
if (entryBtn.innerHTML=='Sign Up') {
    // --------username input--------
    userName.addEventListener('input',function () 
        {   if (nameRegex.test(userName.value)) {  
                 nameValidation(true); 
                 alretHolder.classList.add('d-none');
             }  else {nameValidation(false);    }
        });    
        
// --------email input--------
    email.addEventListener('input',function () 
    {   if (emailRegex.test(email.value) && !emailRepeated(email.value))  {  
                emailValidation(true);
                alretHolder.classList.add('d-none');
         } 
          else if ( emailRepeated(email.value) ) { 
            nameValidation(true);
            emailRepeatedWarning(false);
         }
         else {emailValidation(false);    }
    });
// --------password input--------
    password.addEventListener('input',function () 
        {   if ( passwordRegex.test(password.value) ) {  
                    passwordValidation(true);
                    alretHolder.classList.add('d-none');
        }  else {passwordValidation(false);    }
        });
} 


    
}


        
// --------sighup funtion--------
    function sighUp() {
        if( password.value=='' || email.value=='' || userName.value=='') {
            clearingValidClasses();
            alretHolder.innerHTML=('you have an Empty data ??<3');
            alretHolder.classList.remove('d-none'); 
            timeout();
          
        }
    else if ( nameRegex.test(userName.value) && emailRegex.test(email.value) && !emailRepeated(email.value)  && passwordRegex.test(password.value)    ) 
        {       storeUsersData();
                clearingValidClasses();   
                clearingValues();
                clearingAlret() ;
                timeout();
                setTimeout(() => {
                    window.open('index.html', '_self');
                }, 2000);
               
        } 

        else if ( !nameRegex.test(userName.value) ) 
        {    nameValidation(false);  }
        else if ( emailRepeated(email.value) ) { 
            nameValidation(true);
            emailRepeatedWarning(false);
         }
        else if (  !emailRegex.test(email.value) && emailRepeated(email.value) ) 
        {   nameValidation(true);
            emailValidation(false);
        }

        else if ( !passwordRegex.test(password.value) ) 
        {  
            nameValidation(true);
            emailValidation(true); 
            passwordValidation(false);  }


    }
// --------login funtion--------
    function login() {
        var incorrect=true;
        if(email.value=='' || password.value==''){
                alretHolder.innerHTML=('All inputs is required ');
                alretHolder.classList.remove('alert-danger');
                alretHolder.classList.remove('d-none');
                timeout();
            }

        else{

                for (var i = 0; i < allUsers.length; i++) {
                    if (checkLogin(i)) {
                            localStorage.setItem('userIndex',JSON.stringify(i));
                            window.open('welcompage.html', '_self');
                            incorrect=false;
                            break;
                    }   
                }


                 if  (incorrect) {
                    alretHolder.innerHTML=('incorrect email or password? try again plz ');
                    alretHolder.classList.remove('alert-danger');
                    alretHolder.classList.remove('d-none');
                    timeout();
                }
        
        }


        

            
    }
// --------user name show --------
if (document.body.contains(userNameShow)) {  userNameShow.innerHTML=allUsers[JSON.parse(localStorage.getItem('userIndex'))].name;   }

// --------log out btn name show --------
if (document.body.contains(logoutBtn)) {  
    logoutBtn.addEventListener('click',function () {
        logout();
    })
  }


//-------- valdion functions--------
    function nameValidation(checkedValue) {
        if (checkedValue ) {
            userName.classList.remove('is-invalid');
            userName.classList.add('is-valid');

        }
        else if ( !checkedValue) {
            alretHolder.innerHTML=('your username is wrong >> ( ex: Akram  )need 4 char starting with capital ')
            alretHolder.classList.remove('d-none');
            userName.classList.remove('is-valid');
            userName.classList.add('is-invalid');  
        } 

    }
    function emailValidation(checkedValue) {
        if (checkedValue ) {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        
        }
        else if (  !checkedValue) {
            alretHolder.innerHTML=('you mail is wrong  ( ex: anystring@anystring.any)  ')
            alretHolder.classList.remove('d-none');
            email.classList.remove('is-valid');
            email.classList.add('is-invalid');
        } 

    }
// email repeated warning
    function emailRepeatedWarning(checkedValue) {
        if (checkedValue ) {
            email.classList.remove('is-invalid');
            email.classList.add('is-valid');
        
        }
        else if (  !checkedValue) {
            alretHolder.innerHTML=('< --you mail is repeated-- >>   ')
            alretHolder.classList.remove('d-none');
            email.classList.remove('is-valid');
            email.classList.add('is-invalid');
        } 
    }  
    function passwordValidation(checkedValue) {
        if ( checkedValue ) {
            password.classList.remove('is-invalid');
            password.classList.add('is-valid');
    
        }
        else if ( !checkedValue) {
                alretHolder.innerHTML=('your password is wrong >> (7 at least  characters which contain at least one numeric digit, one uppercase and one lowercase letter');
                alretHolder.classList.remove('d-none');
                password.classList.remove('is-valid');
                password.classList.add('is-invalid');
        } 

    }
// --------clearing functions--------
    function clearingValues(){
    //clear  class values
    userName.value='';
    email.value='';
    password.value='';
    }
    function clearingValidClasses(){
    //clear valid class
    userName.classList.remove('is-valid');
    userName.classList.remove('is-invalid');    
    email.classList.remove('is-valid');
    email.classList.remove('is-invalid');   
    password.classList.remove('is-valid');
    password.classList.remove('is-invalid');  
    }

    function clearingAlret() {
        //modify alert 
        alretHolder.innerHTML=('Succes << -- login will open right now -- >> ');
        alretHolder.classList.remove('alert-danger');
        alretHolder.classList.replace('text-danger','text-success');
        alretHolder.classList.remove('d-none');
    }
// timeout to clear alert
    function timeout() {
        setTimeout(() => {
            alretHolder.classList.add('d-none'); 
        }, "3000");
    }
// storing data 
    function storeUsersData() {
        var data={
                name:userName.value,
                userEmail:email.value,
                userPassword: password.value,  
            }
        allUsers.push(data);
        localStorage.setItem('users',JSON.stringify(allUsers))
    
    }
//  ckeckind data 
function checkLogin(i) {
    return(allUsers[i].userEmail==email.value && allUsers[i].userPassword==password.value);
} 
//log out
function logout() {
    localStorage.setItem('userIndex','-1')
    window.open('index.html', '_self');
}
//check if email was repeated
    function emailRepeated(email) {
        var check=false;
                for (var i = 0; i < allUsers.length; i++) {
                if ( allUsers[i].userEmail==email) 
                {  check=true; } 
                }
        return check;
    }
