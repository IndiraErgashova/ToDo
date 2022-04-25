const $email = document.querySelector('.emailInput')
const $password = document.querySelector('.passwordInput')
const $btnRegister = document.querySelector('.btnRegister')

const base_url = 'https://todo-itacademy.herokuapp.com/api'

// https://todo-itacademy.herokuapp.com/api/registration
// https://todo-itacademy.herokuapp.com/api/login
// https://todo-itacademy.herokuapp.com/api/create
// https://todo-itacademy.herokuapp.com/api/todos


function getRegister(){
    fetch(`${base_url}/registration`, {
        method: 'POST',
        body: JSON.stringify({
            email: $email.value,
            password: $password.value
        }),
        headers: {
            'content-type':'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        // localStorage.setItem('accessToken' , res.accessToken)
        // localStorage.setItem('refreshToken' , res.refreshToken)
        // localStorage.setItem('userId' , res.userId)
        console.log(res);
    })

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