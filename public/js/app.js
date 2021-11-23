const form = document.querySelector('form')
const input = form.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.innerHTML = ''
    messageTwo.innerHTML = ''
    fetch(`/weather?address=${decodeURIComponent(input.value)}`)
        .then((response) => {
            // console.log(response)
            if (!response.status.toString().match(/^20*/g)) {
                response.json()
                    .then((json) => {
                        // console.log('Error')
                        // console.log(json.error)
                        messageOne.innerHTML = 'Error'
                        messageTwo.innerHTML = JSON.stringify(json.error)

                    })
            } else if (response.headers.get("content-type").includes('application/json')) {
                return response.json()
            }
        })
        .then(({forcast,placeName}) => {
            // console.log(json)
            messageOne.innerHTML = placeName
            messageTwo.innerHTML = forcast

        })
        .catch((e) => {
            console.log(e)
        })
})

