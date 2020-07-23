console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageone= document.querySelector('#msg1')
const messagetwo=document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

messageone.textContent='Loading...'
messagetwo.textContent=''

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
               messageone.textContent=data.error
            } else {
               messageone.textContent=data.Location
               messagetwo.textContent=data.forecast
            }
        })
    })
})