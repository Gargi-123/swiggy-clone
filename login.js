window.addEventListener("load", add)

function add() {
    var submit = document.getElementById("log_submit")
    submit.addEventListener("click", user_login_auth)
    var reg = document.getElementById("register")
    reg.addEventListener("click", register)
    var reg = document.getElementById("restaurant_submit")
    reg.addEventListener("click", restaurant_login_auth)
    var reg = document.getElementById("company_submit")
    reg.addEventListener("click", company_login_auth)
    var reg = document.getElementById("locate_me")
    reg.addEventListener("click", loctionTrack)
    var reg = document.getElementById("find_food")
    reg.addEventListener("click", handle_find_food)

    refresh_all_data()
}

// function refresh_all_data(){

//     if( !(localStorage.getItem("user_record") ){
//         localStorage.setItem("user_record", str)
//     }

// }



function user_login_auth(elem) {
    elem.preventDefault()
    var user = document.getElementById("log_id").value
    var pass_elem = document.getElementById("log_pass")
    var pass = pass_elem.value
    pass_elem.value = ""

    var data = localStorage.getItem("user_record")

        arr = JSON.parse(data) || []
        var flag = false
        for(var i = 0 ; i < arr.length ; i++){
            var x = arr[i]
            if(arr[i].user == user && arr[i].pass == pass){
                current_user = arr[i].name
                flag = true
            }
        }

    if(flag == true){
        current_user = x.user
        localStorage.setItem("user", x.user)
        window.location.replace("index.html")
    }

    else{
        var log_error = document.getElementById("log_error")
        log_error.textContent = "Wrong Credincials"
        remove(log_error)
    }
}


function restaurant_login_auth(elem) {
    elem.preventDefault()
    var user = document.getElementById("log_id").value
    var pass_elem = document.getElementById("log_pass")
    var pass = pass_elem.value
    pass_elem.value = ""

    var data = localStorage.getItem("user_record")

        arr = JSON.parse(data) || []
        var flag = false
        for(var i = 0 ; i < arr.length ; i++){
            var x = arr[i]
            if(arr[i].user == user && arr[i].pass == pass){
                current_user = arr[i].name
                flag = true
            }
        }

    if(flag == true){
        current_user = x.user
        localStorage.setItem("user", x.user)
        window.location.replace("index.html")
    }

    else{
        var log_error = document.getElementById("log_error")
        log_error.textContent = "Wrong Credincials"
        remove(log_error)
    }
}

function company_login_auth(elem) {
    elem.preventDefault()
    var user = document.getElementById("log_id").value
    var pass_elem = document.getElementById("log_pass")
    var pass = pass_elem.value
    pass_elem.value = ""

    var data = localStorage.getItem("user_record")

        arr = JSON.parse(data) || []
        var flag = false
        for(var i = 0 ; i < arr.length ; i++){
            var x = arr[i]
            if(arr[i].user == user && arr[i].pass == pass){
                current_user = arr[i].name
                flag = true
            }
        }

    if(flag == true){
        current_user = x.user
        localStorage.setItem("user", x.user)
        window.location.replace("index.html")
    }

    else{
        var log_error = document.getElementById("log_error")
        log_error.textContent = "Wrong Credincials"
        remove(log_error)
    }
}

function register() {
    var name = document.getElementById("register_name").value
    var userid = document.getElementById("register_userid").value
    var pass_elem = document.getElementById("register_pass")

    var pass = pass_elem.value

    pass_elem.value = ""

    if (userid != "" && pass != "" && name != "") {


        var data = localStorage.getItem("user_record")

        arr = JSON.parse(data) || []

        for(var i = 0 ; i < arr.length ; i++){
            var x = arr[i]
            if(arr[i].user == userid){
            var x = document.getElementById("register_error")
                x.textContent = "User allready registered"
                remove(x)
                return
            }
        }

        var new_user = {
            name: name,
            user: userid,
            pass: pass
        }
        arr.push(new_user)

        var str = JSON.stringify(arr)

        localStorage.setItem("user_record", str)

        alert("Register Successful\nPlease Login")
        window.location.replace("login.html")
    }

    else{
        var clear = document.getElementById("register_error")
        clear.textContent = "Fill all the fields"
        remove(clear)
        
    }
}


function handle_find_food(){

}







function loctionTrack(){

      
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      console.log(latitude,longitude)
    }
  
    function error() {
      alert('Unable to retrieve your location')
    }
  
    
    navigator.geolocation.getCurrentPosition(success, error);
  
}





// not soo inportant

function remove(x){
    var elem = x
 setTimeout(function(){
    elem.textContent=""
},4000)

}