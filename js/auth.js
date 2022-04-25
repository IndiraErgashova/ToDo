const $email = document.querySelector('.emailInput')
const $password = document.querySelector('.passwordInput')
const $btnRegister = document.querySelector('.btnRegister')

const base_url = 'https://todo-itacademy.herokuapp.com/api'




function getRegister(){
    fetch(`${base_url}/login`, {
        method: 'POST',
        body: JSON.stringify({
            email: $email.value,
            password: $password.value
        }),
        headers: {
            'Content-type':'application/json'
        }
    })
    .then(res => res.json())
    .then(r => console.log(r))

}

$btnRegister.addEventListener('click' , e => {
    e.preventDefault()


    if($email.value.length === 0 || $password.value.length === 0){
        if($email.value.length === 0){
            $email.classList.add('active')
        }
        if($password.value.length === 0){
            $password.classList.add('active')
        }
    }else{
        getRegister()
    }
})