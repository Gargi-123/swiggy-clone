


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