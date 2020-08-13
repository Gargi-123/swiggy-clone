function serch_restaurant() {

    let query = window.location.search
    if (query != "") {
        let url = new URLSearchParams(query)
        if (url.get("restaurant_id")) {
            let restaurant_id = url.get("restaurant_id")
            fetch(`http://localhost:3000/data?restaurant_id=${restaurant_id}`).then(response => response.json()).then(data => renderDom(data))
        }

    }
}

function renderDom(data){
    let target = document.getElementById("menu_in_glance")
    let target2 = document.getElementById("menu_div")
    let menu_item = data[0].menu_items
    if(menu_item.length != 0){
        for(let i = 0 ; i < menu_item.length; i++){
            let add_btn = document.createElement("button")
            add_btn.addEventListener("click", pushdata_cart)
            add_btn.textContent = "Add"
            add_btn.setAttribute("class", "btn btn-outline-success btn-sm")
            target.innerHTML += `<p style="font-size: 14px;">${menu_item[i].name}</p>`
            target2.innerHTML += `<div class="media p-3">
            <div class="media-body">
                <p class="mt-0 mb-1 h6">${menu_item[i].name}</p>
                <p>₹ ${menu_item[i].price}</p>
                <p class="text-muted">${menu_item[i].description}</p>
            </div>
            <img src="${menu_item[i].image}" class="ml-3" alt="...">
          </div>`
          add_btn.setAttribute("id", menu_item[i].id)
          
          target2.append(add_btn)
        }
    }
}


function pushdata_cart(event){
    console.log("cbjlds")
    console.log(event.target)


}


function handel_checkout(){
    
}




function add() {

    serch_restaurant()
    var submit = document.getElementById("checkout_btn")
    submit.addEventListener("click", handel_checkout)
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



window.addEventListener("load", add)