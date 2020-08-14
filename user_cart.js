


function render_cart() {
    let total_tax = document.getElementById("total_taxes")
    let delivery_fee = document.getElementById("delivery_fee")
    let total_discount = document.getElementById("total_item")
    let total_pay = document.getElementById("total_pay")
    total_pay.innerText = ""
    let log_info = localStorage.getItem("user_log_session")
    log_info = JSON.parse(log_info)
    let subtotal = 0
    for (let i = 0; i < log_info.user_cart.length; i++) {
        subtotal += log_info.user_cart[i].price
    }
    total_pay.textContent = "Rs."+subtotal
    total_discount.innerText = log_info.user_cart.length
}

window.onload=function(){
    let pay_btn=document.getElementById('pay_btn')
    pay_btn.addEventListener('click',handlePayent)
    render_cart()
}
const handlePayent=()=>{
    event.preventDefault()
    let res=document.getElementById('res')
    res.innerHTML=`<div class="alert alert-success" role="alert">
    <i class="fas fa-check text-success"></i>Payment successfull
  </div>`
}
