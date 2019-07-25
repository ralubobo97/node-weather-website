
// the url we are trying to fetch from:
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {    //parsed data
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

// Will run every time the form is submitted.
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // Fetch weather
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => { 
            if(data.error){
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.summary + ', umiditate ' + data.forecast.humidity + '%, cu o temperatura de ' + data.forecast.degrees + ' °C.'
            }
        })
    })
})

