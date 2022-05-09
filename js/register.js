const $email = document.querySelector('.emailInput')
const $password = document.querySelector('.passwordInput')
const $btnRegister = document.querySelector('.btnRegister')
const $allInputs = document.querySelector('.card div input')
const base_url = 'https://todo-itacademy.herokuapp.com/api'

// https://todo-itacademy.herokuapp.com/api/registration
// https://todo-itacademy.herokuapp.com/api/login
// https://todo-itacademy.herokuapp.com/api/create
// https://todo-itacademy.herokuapp.com/api/todos


function getRegister(){
    fetch(`${base_url}/registration`, {
        method: 'POST',
        body: JSON.stringify(getValueFromInputs()),
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



$btnRegister.addEventListener('click' , e => {
    e.preventDefault()

    $btnRegister.disabled = true
    isValidate() && getRegister()
})


window.addEventListener('DOMContentLoaded' , () => {
    const accessToken = localStorage.getItem('accessToken')

    if(accessToken){
        window.open('../auth.html' , '_self')
    }
})

function isValidate(){
    $allInputs.forEach(item => {
        item.value.length === 0 
        ? item.classList.add('border-danger')
        : item.classList.remove('border-danger')
    })

    return [...$allInputs].every(item => item.value)
}


function getValueFromInputs(){
    return [...$allInputs].reduce((object , input) => {
        return {
            ...object,
            [input.name]:input.value
        }
    } , {})
}