let current_restaurant_id

async function serch_restaurant() {

    let query = window.location.search
    if (query != "") {
        let url = new URLSearchParams(query)
        if (url.get("restaurant_id")) {
            let restaurant_id = url.get("restaurant_id")
            current_restaurant_id = restaurant_id
            await fetch(`https://swiggy-clone-json-server.herokuapp.com/data?restaurant_id=${restaurant_id}`).then(response => response.json()).then(data => renderDom(data))
        }

    }
}

function renderDom(data) {
    let img_div = document.getElementById("restaurant_img")
    img_div.setAttribute("src", `resource/${data[0].restaurant_images}`)
    let detail = document.getElementById("restaurant_details")
    detail.innerHTML = `<p class="h3">${data[0].restaurant_name}</p>
    <p class="text-muted">${data[0].Cuisines}</p>
    <p class="text-muted">${data[0].Address}</p>
    <div class="col-6">
        <p>${data[0].aggregate_rating}</p>
        <p class="text-muted">${data[0].Votes} Votes</p>
    </div>
    
    <div class="col-6">
        <p>${data[0].average_Cost_for_two}</p>
        <p class="text-muted">Cost for two</p>
    </div>`
    let target = document.getElementById("menu_in_glance")
    let target2 = document.getElementById("menu_div")
    let add_btn = document.createElement("button")
    add_btn.addEventListener("click", pushdata_cart)
    add_btn.textContent = "Add"
    add_btn.setAttribute("class", "btn btn-outline-success btn-sm")
    let menu_item = data[0].menu_items
    if (menu_item.length != 0) {
        for (let i = 0; i < menu_item.length; i++) {

            target.innerHTML += `<p style="font-size: 14px;">${menu_item[i].name}</p>`
            target2.innerHTML += `<div class="media p-3">
            <div class="media-body">
                <p class="mt-0 mb-1 h6">${menu_item[i].name}</p>
                <p>₹ ${menu_item[i].price}</p>
                <p class="text-muted">${menu_item[i].description}</p>
            </div>
            <img src="resource/${menu_item[i].image}" style="width:100px ; height: 100px"   class="ml-3" alt="...">
          </div>`
            add_btn.setAttribute("id", `add+${menu_item[i].id}`)

            target2.append(add_btn)
        }
    }
}


async function pushdata_cart() {
    let item = event.target.id
    item = item.split("+")
    if (item[0] == "add") {

        current_item_id = Number(item[1])

        let log_info = localStorage.getItem("user_log_session")
        if (log_info == null) {
            var log_error = document.getElementById("checkout_error")
            log_error.textContent = "Please Login to Proceed"
            remove(log_error)
        }
        else {

            log_info = JSON.parse(log_info)
            let price = 0
            let user_cart
            let item_name
            user_cart = log_info.user_cart || []

            let data = await fetch(`https://swiggy-clone-json-server.herokuapp.com/data?restaurant_id=${current_restaurant_id}`).then(response => response.json()).then(data => { return (data) })

            console.log(data)

            for (let i = 0; i < data[0].menu_items.length; i++) {
                if (current_item_id == data[0].menu_items[i].id) {
                    price = Number(data[0].menu_items[i].price)
                    item_name = data[0].menu_items[i].name
                }
            }

            let flag = false
            for (let j = 0; j < user_cart.length; j++) {
                if (user_cart[j].name == item_name) {
                    user_cart[j].price += price
                    user_cart[j].qty++
                    flag = true
                }
            }

            if (!flag) {
                let new_item = {
                    restaurant_id: current_restaurant_id,
                    item_name: item_name,
                    price: price,
                    qty: 1
                }

                user_cart.push(new_item)
                log_info.user_cart = user_cart
                localStorage.setItem("user_log_session", JSON.stringify(log_info))
            }
            else {
                log_info.user_cart = user_cart
                localStorage.setItem("user_log_session", JSON.stringify(log_info))
            }
            render_cart()
        }

    }


}


function render_cart() {
    let target = document.getElementById("cart_display_total_item")
    let subtotal_target = document.getElementById("cart_total_amount")
    target.innerHTML = ""
    let log_info = localStorage.getItem("user_log_session")
    log_info = JSON.parse(log_info)
    let subtotal = 0
    for (let i = 0; i < log_info.user_cart.length; i++) {
        target.innerHTML += `<div class="row">
        <div class="col-4"><p>${log_info.user_cart[i].item_name}</p></div>
        <div class="col-3"><p>${log_info.user_cart[i].qty}</p></div>
        <div class="col-2"><p>${log_info.user_cart[i].price}</p></div>
        </div>` 
        subtotal += log_info.user_cart[i].price
    }
    subtotal_target.textContent = "Rs."+subtotal

}


function handel_checkout() {
    let log_info = localStorage.getItem("user_log_session")
    log_info = JSON.parse(log_info)
    if(log_info.login_status){
        window.location.assign("user_cart.html")
    }
}

function remove(x) {
    var elem = x
    setTimeout(function () {
        elem.textContent = ""
    }, 4000)

}


function add() {

    serch_restaurant()
    var submit = document.getElementById("checkout_btn")
    submit.addEventListener("click", handel_checkout)
    let target2 = document.getElementById("menu_div")
    target2.addEventListener("click", pushdata_cart)
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



window.addEventListener("load", add)
