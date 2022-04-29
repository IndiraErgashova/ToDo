const $email = document.querySelector('.emailInput')
const $password = document.querySelector('.passwordInput')
const $btnRegister = document.querySelector('.btnRegister')

const base_url = 'https://todo-itacademy.herokuapp.com/'

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
            'Content-type':'application/json'
        }
    })
    .then(res => res.json())
    .then(res => {
        localStorage.setItem('accessToken' , res.accessToken)
        localStorage.setItem('refreshToken' , res.refreshToken)
        localStorage.setItem('userId' , res.user.id)
        localStorage.setItem('isActivated' , res.user.isActivated)
        window.open('../auth.html' , '_self')
    })
    .finally(() => {
        $btnRegister.disabled = false
    })

}

window.addEventListener('DOMContentLoaded' , () => {
    const accessToken = localStorage.getItem('accessToken')

    if(accessToken){
        window.open('./auth.html' , '_self')
    }
})

$btnRegister.addEventListener('click' , e => {
    e.preventDefault()

    $btnRegister.disabled = true
    getRegister()
})