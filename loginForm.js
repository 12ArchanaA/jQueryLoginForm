/*window.addEventListener("load",main);
function main()
{
    _("signup-form").addEventListener("submit",validate);
}   -when we use js in head without defer
*/

$(document).ready(main);

function main(){
    $("#signup-form").submit(validate);
}
function validate(event)
{
    event.preventDefault();
    var formData = new FormData($(this)[0]);    
    var name = formData.get("name");
    var email = formData.get("email");
    var password = formData.get("password");
    var phone = formData.get("phone");
    var username= formData.get("username");
    var passwordConformation = formData.get("password-confirmation");
    if(
        nameValidation(name, "name-error") &&
        emailValidation(email, "email-error") &&
        phoneValidation(phone, "phone-error") &&
        passwordValidation(password, "password-error") &&
        confirmPasswordValidation(passwordConformation, password, "passwordConfirmation-error") &&
        usernameValidation(username, "username-error"))
        {
            submit({name,email,password,phone,username,});
            
        }
        else{
            console.log("Failed");
        }  
}
function submit(data)                                               
{
    /*let postRequest = function (url,data){
        return new Promise(function(resolve,reject){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if(this.readyState == 4 && this.status == 201){
                    resolve(JSON.parse(this.responseText));
                }
                else if(this.readyState == 4){
                    reject(JSON.parse(this.responseText || "error"));
                }
            };
            xhttp.open("POST", "http://192.168.1.39:3000/user" , true);
            xhttp.setRequestHeader("Content-type" , "application/json");
            xhttp.send(JSON.stringify(data));
        });
    }*/
    
    // fetch("http://192.168.1.39:3000/user", {
    //     method : "POST",
    //     headers:{
    //     "Content-type" : "application/json"
    //     },
    //     body : JSON.stringify(data),
    // })
    // .then((response) =>response.json())
    // .then((result)=>{
    //     window.location.href = "./user.html?id=" + result.id;
    // })

    // .catch((err) =>{
    //     console.log(err);
    // });
    

    //Using Ajax
    $.ajax("http://192.168.1.39:3000/user", {
        method: "POST",
        data: JSON.stringify(data),
        contentType : "application/json",
    }).done(function (result){
        console.log(result);
        window.location.href = "./user.html?id=" + result.id;
    });


    

    //  $.post("http://192.168.1.39:3000/user", data, function(result){
    //      window.location.href = "./user.html?id=" + result.id;
    //      console.log(result);
    //  });

}

function isEmptyOrShort(value, id, minlength, key)
{
    if(!value)
    {
        setError(id," Please enter your" + key);
        return true;
    }
    if(value.length < minlength)
    {
        setError(id , key + " must be at least " + minlength + " characters " );
        return true;
    }
    setError(id, "")
    return false;
}

function nameValidation(value, id)
{
    return !isEmptyOrShort(value, id, 3, "name");
}

function emailValidation(value, id)
{
    if(!value)
    {
        setError(id, "Please enter your email");
        return false;
    }
    if(!value.includes("@"))
    {
        setError(id, "Please enter a valid email");
        return false;
    }
    setError(id, "");
    return true;
}


function phoneValidation(value, id)
{
   return !isEmptyOrShort(value, id, 10, "phone")
}


 function passwordValidation(value, id)
 {
    return !isEmptyOrShort(value, id, 6, "password")
 }


function confirmPasswordValidation(value, password, id)
{
    console.log(value, password, id)
    if(value != password)
    {
       setError(id, "Password does not match");
       return false;
    }
    setError(id, "");
    return true;
}


function usernameValidation(value,id)
{
    return !isEmptyOrShort(value, id, 4, "username");
}


function setError(id, message)
{
  $("#"+id).text(message);
}

 