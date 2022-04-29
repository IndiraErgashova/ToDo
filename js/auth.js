const $email = document.querySelector('.emailInput')
const $password = document.querySelector('.passwordInput')
const $submit = document.querySelector('.submit')

const base_url = 'https://todo-itacademy.herokuapp.com/api'




function getAuth(){
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
    .then(r => {
        localStorage.setItem('accessToken' , res.accessToken)
        localStorage.setItem('refreshToken' , res.refreshToken)
        localStorage.setItem('userId' , res.user.id)
        if(res.user.isActivated){
            window.open('../index.html' , '_self')
            localStorage.setItem('isActivated' , res.user.isActivated)
        }
    })
    .finally(() => {
        $submit.disabled = false
    })

}



$submit.addEventListener('click' , e => {
    e.preventDefault()

    $submit.disabled = true
    getAuth()
    
})