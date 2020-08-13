
let company_record = [
    {
        company_user_no: 100001,
        company_user_pass: 12345
    },
    {
        company_user_no: 100002,
        company_user_pass: 12345
    }
]


function refresh_all_data() {

    if (localStorage.getItem("company_record") == null) {

        JSON.stringify(company_record)
        localStorage.setItem("company_record", company_record)
    }


    if (!(localStorage.getItem("restaurant_record"))) {
        let arr = []
        JSON.stringify(arr)
        localStorage.setItem("restaurant_record", arr)
    }
    if (!(localStorage.getItem("user_log_session"))) {

        let arr = {
            login_status: false
        }
        JSON.stringify(arr)
        localStorage.setItem("user_log_session", arr)

        let x = localStorage.getItem("user_log_session")
        if (x.login_status == true) {
            login_change()
        }

    }

}



function user_login_auth(elem) {
    elem.preventDefault()
    var user = document.getElementById("log_id").value
    var pass_elem = document.getElementById("log_pass")
    var pass = pass_elem.value
    pass_elem.value = ""

    var data = localStorage.getItem("user_record")

    arr = JSON.parse(data) || []
    var flag = false
    let x
    for (var i = 0; i < arr.length; i++) {
        x = arr[i]
        if (arr[i].user == user && arr[i].pass == pass) {
            current_user = arr[i].name
            flag = true
        }
    }

    if (flag == true) {
        let user_log_session = {
            login_status: true,
            current_user: x.name
        }
        JSON.stringify(user_log_session)
        localStorage.setItem("user_log_session", user_log_session)

        login_change()
    }

    else {
        var log_error = document.getElementById("login_error")
        log_error.textContent = "Wrong Credincials"
        remove(log_error)
    }
}


// ---------- restaurant authentication  not done  -----------

// function restaurant_login_auth(elem) {
//     elem.preventDefault()
//     var user = document.getElementById("log_id").value
//     var pass_elem = document.getElementById("log_pass")
//     var pass = pass_elem.value
//     pass_elem.value = ""

//     var data = localStorage.getItem("user_record")

//     arr = JSON.parse(data) || []
//     var flag = false
//     for (var i = 0; i < arr.length; i++) {
//         var x = arr[i]
//         if (arr[i].user == user && arr[i].pass == pass) {
//             current_user = arr[i].name
//             flag = true
//         }
//     }

//     if (flag == true) {
//         current_user = x.user
//         localStorage.setItem("user", x.user)
//         window.location.replace("index.html")
//     }

//     else {
//         var log_error = document.getElementById("log_error")
//         log_error.textContent = "Wrong Credincials"
//         remove(log_error)
//     }
// }

// -----------end---------

// ------company authentication done--------

function company_login_auth(elem) {
    elem.preventDefault()
    var user = document.getElementById("company_id").value
    var pass_elem = document.getElementById("company_pass")
    var pass = pass_elem.value
    pass_elem.value = ""

    let data = localStorage.getItem("company_record")

    arr = JSON.parse(data) || []
    var flag = false
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].user == user && arr[i].pass == pass) {
            flag = true
        }
    }

    if (flag == true) {
        window.location.replace("company_dashboard.html")
    }

    else {
        var log_error = document.getElementById("company_error")
        log_error.textContent = "Wrong Credincials"
        remove(log_error)
    }
}

// -----------end---------

function register() {
    var name = document.getElementById("register_name").value
    var userid = document.getElementById("register_userid").value
    var pass_elem = document.getElementById("register_pass")
    let registe_phone = document.getElementById("register_phone").value

    var pass = pass_elem.value

    pass_elem.value = ""

    if (userid != "" && pass != "" && name != "" && registe_phone != "") {


        var data = localStorage.getItem("user_record")

        arr = JSON.parse(data) || []

        for (var i = 0; i < arr.length; i++) {
            var x = arr[i]
            if (arr[i].user == userid) {
                var x = document.getElementById("register_error")
                x.textContent = "User allready registered"
                remove(x)
                return
            }
            if (arr[i].phone == registe_phone) {
                var x = document.getElementById("register_error")
                x.textContent = "User allready registered with this Phone Number"
                remove(x)
                return
            }
        }
        var new_user = {
            name: name,
            user: userid,
            pass: pass,
            phone: registe_phone
        }
        arr.push(new_user)

        var str = JSON.stringify(arr)

        localStorage.setItem("user_record", str)

        let user_log_session = {
            login_status: true,
            current_user: name
        }
        JSON.stringify(user_log_session)
        localStorage.setItem("user_log_session", user_log_session)

        login_change()

    }

    else {
        var clear = document.getElementById("register_error")
        clear.textContent = "Fill all the fields"
        remove(clear)

    }
}


function handle_find_food() {
    let x = document.getElementById("location_input").value
    if(x != ""){
        if(true){
        let params = new URLSearchParams()
        params.append("city", x)
        let url = "user_serach_dashboard.html"
        window.location.assign(url + "?" + params.toString())
        }
    }
    else{
        let err = document.getElementById("location_error")
        err.textContent = "Enter the delivery Location"
        remove(err) 
    }
}







function loctionTrack() {


    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let params = new URLSearchParams()
        params.append("latitude", latitude)
        params.append("longitude", longitude)
        let url = "user_serach_dashboard.html"
        window.location.assign(url + "?" + params.toString())
    }

    function error() {
        let err = document.getElementById("location_error")
        err.textContent = "Unable to get Location"
        remove(err)
    }


    navigator.geolocation.getCurrentPosition(success, error);

}





// not soo inportant //

function remove(x) {
    var elem = x
    setTimeout(function () {
        elem.textContent = ""
    }, 4000)

}


function login_change() {
    let target = document.getElementById("user_log_div")

    let user_detail = localStorage.getItem("user_log_session")

    target.innerHTML = `

    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  ${user_detail.name}
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href=user_profile.html>View Profile</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" id="logout_btn" href="login.html">logout</a>
  </div>
</div>`

    let logout = document.getElementById("logout_btn")
    logout.addEventListener("click", handle_logout)


}


function handle_logout() {
    localStorage.removeItem("user_log_session")
    window.location.replace("login.html")
}




// end //







function add() {
    var submit = document.getElementById("log_submit")
    submit.addEventListener("click", user_login_auth)
    var reg = document.getElementById("register")
    reg.addEventListener("click", register)
    var reg = document.getElementById("restaurant_submit")
    //reg.addEventListener("click", restaurant_login_auth)
    var reg = document.getElementById("company_submit")
    reg.addEventListener("click", company_login_auth)
    var reg = document.getElementById("locate_me")
    reg.addEventListener("click", loctionTrack)
    var reg = document.getElementById("find_food")
    reg.addEventListener("click", handle_find_food)

    refresh_all_data()
}


// function generateOTP() { 
          
     
//     var digits = '0123456789'; 
//     let OTP = ''; 
//     for (let i = 0; i < 4; i++ ) { 
//         OTP += digits[Math.floor(Math.random() * 10)]; 
//     } 
//     return OTP; 
// } 


window.addEventListener("load", add)