const $email = document.querySelector('.emailInput')
const $password = document.querySelector('.passwordInput')
const $submit = document.querySelector('.submit')
const $allInputs = document.querySelector('.card div input')
const base_url = 'https://todo-itacademy.herokuapp.com/api'




function getAuth(){
    fetch(`${base_url}/login`, {
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
        localStorage.setItem('userId' , res.userId)
        if(!res.userIsActivated){
            window.open('../index.html' , '_self')
            localStorage.setItem('isActivated' , res.userIsActivated)
        }
    })
    .finally(() => {
        $submit.disabled = false
    })

}

window.addEventListener('DOMContentLoaded' , () => {
    const isActivated = localStorage.getItem('isActivated')

    if(isActivated){
        window.open('../index.html' , '_self')
    }
})

$submit.addEventListener('click' , e => {
    e.preventDefault()

    $submit.disabled = true
    isValidate() && getAuth()
    
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