function serch_restaurant() {

    let query = window.location.search
    if (query != "") {
        let url = new URLSearchParams(query)
        if (url.get("restaurant_id")) {
            let city = url.get("restaurant_id")
            fetch(`http://localhost:3000/data=${firstletter + city}`).then(response => response.json()).then(data => renderDom(data))
        }


    }
}





window.addEventListener("load", add)


function add() {

    serch_restaurant()
    // var submit = document.getElementById("log_submit")
    // submit.addEventListener("click", user_login_auth)
    // var reg = document.getElementById("register")
    // reg.addEventListener("click", register)
    // var reg = document.getElementById("restaurant_submit")
    // //reg.addEventListener("click", restaurant_login_auth)
    // var reg = document.getElementById("company_submit")
    // reg.addEventListener("click", company_login_auth)
    // var reg = document.getElementById("locate_me")
    // reg.addEventListener("click", loctionTrack)
    // var reg = document.getElementById("find_food")
    // reg.addEventListener("click", handle_find_food)

    // refresh_all_data()
}