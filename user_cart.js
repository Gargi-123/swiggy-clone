window.onload=function(){
    let pay_btn=document.getElementById('pay_btn')
    pay_btn.addEventListener('click',handlePayent)
}
const handlePayent=()=>{
    event.preventDefault()
    let res=document.getElementById('res')
    res.innerHTML=`<div class="alert alert-success" role="alert">
    <i class="fas fa-check text-success"></i>Payment successfull
  </div>`
}