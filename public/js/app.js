
const weatherForm= document.querySelector('form')
const search= document.querySelector('input')
const msgOne= document.querySelector('#one')
const msgTwo= document.querySelector('#two')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location= search.value

    const url='http://localhost:3000/weather?address='+location
    
    msgOne.textContent= 'Loading'
    msgTwo.textContent= ''
    fetchForecast(url)
})

const fetchForecast= (url)=>{fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgOne.textContent= data.error
        }
        else{
            msgOne.textContent= data.Location
            msgTwo.textContent= data.Forecast
        }
    } )
})
}