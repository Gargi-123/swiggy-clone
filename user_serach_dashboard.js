
function serch_restaurant() {

    let query = window.location.search
    if (query != "") {
        let url = new URLSearchParams(query)
        if (url.get("city")) {
            let city = url.get("city")
            let firstletter = city[0].toUpperCase()
            city = city.slice(1, city.length)
            console.log(city)
            fetch(`http://localhost:3000/data/?City=${firstletter + city}`).then(response => response.json()).then(data => renderDom(data))
        }
    }
}


function renderDom(data) {
    console.log(data)
    let target = document.getElementById("restaurants_cards")
    let count_target = document.getElementById("total_restaurant_count")
    let row = document.createElement("div")
    row.setAttribute("class", "row py-4")
    if (data != []) {
        
        count_target.innerText = data.length + " restaurants"
        for (let i = 0; i < data.length; i++) {
            let rating = Number(data[i].aggregate_rating)
            let color_code
            if(rating > 3.5){
                color_code = "badge-success"
            }
            else if(rating < 3.5 && rating > 2.3){
                color_code = "badge-warning"
            }
            else{
                color_code = "badge-danger"
            }

            row.innerHTML = row.innerHTML + ` 
            <a href="user_restaurent_view.html?restaurant_id=${data[i].restaurant_id}"><div class="col-3 mb-4">
                    <div class="card">
                        <img src="resource/${data[i].restaurant_images}" class="card-img-top" alt="restaurant_img">
                    <div class="card-body">

                        <p>${data[i].restaurant_name}</p>
                        <p class="text-muted">${data[i].Cuisines}</p>
                        <div class="col">
                            <span class="badge ${color_code}">★ ${rating}</span>
                        </div>
                        <div class="col">
                            <p>Delivery Time</p>
                        </div>
                        <div class="col">
                            <p>₹${data[i].average_Cost_for_two} FOR TWO</p>
                        </div>
                        <div class="dropdown-divider"></div>
                        <a href="">Look Up the restaurant</a>

                    </div>
                </div>
            </div></a>`
        }
        target.append(row)
    }
    else{
        target.innerHTML = `<p class="h3">No Result Found</p>`
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
