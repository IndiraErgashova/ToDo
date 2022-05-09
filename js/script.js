const $title = document.querySelector('.title')
const $content = document.querySelector('.content')
const $date = document.querySelector('.date')
const $submit = document.querySelector('.submit')
const $container = document.querySelector('.row')
const $loader = document.querySelector('.loader')
const $signOut = document.querySelector('.signOut')
const $allInputs = document.querySelectorAll('.form div input')



const base = 'https://todo-itacademy.herokuapp.com/api'
const accessToken = localStorage.getItem('accessToken')

function requestHeader(accessToken){
    return {
        'Content-type' : 'application/json',
        'Authorization' : `Bearer ${accessToken}`
    }
}

const requests = {
    get: (url, accessToken) => {
        return fetch(url , {
            method: 'GET',
            headers: requestHeader(accessToken),
        })
        .then(res => {
            if(res === 401){
                getRefresh()
            }

            return res.json()
        })
    },
    post: (url , accessToken , body) => {
        return fetch(url , {
            method: 'GET',
            headers: requestHeader(accessToken),
            body: JSON.stringify(body)
        })
    }
}

// --------Check unAuthorized-----------

window.addEventListener('DOMContentLoaded' , () => {
    const accessToken = localStorage.getItem('accessToken')

    if(!accessToken){
        window.open('../auth.html' , '_self')
    }
})


// --------Render todos when window loaded-----------

window.addEventListener('DOMContentLoaded' , () => {
    $loader.innerHTML = ''
    getTodos()
})


// --------Get todos-----------

function getTodos(){
    requests.get(`${base}/todos` , accessToken)
    .then(r => {
        const todos = r.todos
        const result = todos
            .reverse()
            .map(todo => cardTemplate(todo))
            .join('')

            $container.innerHTML = result
    })
}


// --------Get single todo-----------

function getSingleTodo(id){
    return requests.get(`${base}/todos/${id}` , accessToken)

}

// --------Create todos-----------

function createTodos(title , content , date){
    $submit.disabled = true

    requests.post(`${base}/todos/create` , accessToken , getValueFromInputs())
    .then(() => getTodos())
    .finally(() => $submit.disabled = false)
}

// -------------Card Template--------------

function cardTemplate({title , content , date , id , completed , edited}){
    return `
        <div class="col-12 col-lg-4 col-xl-4 mb-4">
            <div class="card">
                <div class="card-header d-flex align-items-center justify-content-between">
                    <h3 class="card-title mb-0">${title}</h3>
                    ${completed ? `<img src="" style="width:30px; height:30px">` : ""}
                </div>
                <div class="card-body content">
                    <p>${content}</p>
                    <span class="time">
                        ${date}
                        ${edited.state ? `<span class="small">edited. ${edited.date}</span>` : ''}
                    </span>
                </div>
                <div class="card-footer p-3 d-flex align-items-center justify-content-between">
                    <button class="btn btn-danger" onclick="deleteTodo('${id}')">Delete</button>
                    <button class="btn btn-danger" onclick="completeTodo('${id}')">Complete</button>
                    <button class="btn btn-primary">Edit</button>
                </div>
            </div>
        </div>
    `
}

// --------Complete todos-----------

function completeTodo(id){
    requests.get(`${base}/todos/${id}/completed`)
    .then(getTodos)
}


// --------delete todos-----------

function deleteTodos(id){
    fetch(`${base}/todos/${id}`, {
        method: 'DELETE',
        headers: requestHeader(accessToken)
    })
    .then(getTodos)
}

// --------Edit todos-----------

function editTodo(id){
    getSingleTodo(id)
    .then(res => {
        const askTitle = prompt('New title', res.title)
        const askContent = prompt('New content' , res.content)

        fetch(`${base}/todos/${id}` , {
            method: 'PUT',
            headers: requestHeader(accessToken),
            body:JSON.stringify({
                title: askTitle || res.title,
                content: askContent || res.content
            })
        })
        .then(getTodos)
    })
}



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

console.log(getValueFromInputs());
$submit.addEventListener('click' , e => {
    e.preventDefault()

    $submit.disabled = true

    isValidate() && createTodos()
})

// --------Get refresh-----------

function getRefresh(){
    requests.post(`${base}/refresh` , accessToken , {refreshToken})
    .then(getTodos)
}
// --------Sign out-----------

$signOut.addEventListener('click' , e => {
    e.preventDefault()

    const refreshToken = localStorage.getItem('refreshToken')

    $signOut.disabled = true
    $signOut.classList.add('disabled')

    requests.post(`${base}/logout` , '' , {refreshToken})
    .then(res => res.json())
    .then(res => {
        console.log(res)
        localStorage.clear()
        window.open(`../auth.html` , '_self')
    })
    .finally(() => {
        $signOut.disabled = false
        $signOut.classList.remove('disabled')
    })
})