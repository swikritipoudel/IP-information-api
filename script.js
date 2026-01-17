let extractedInfo = document.querySelector(".extractedInfo")
let countryInput = document.querySelector(".countryInput")
let enter = document.querySelector(".enter")
let container = document.querySelector(".container")

container.addEventListener("submit", async (event)=>{
    event.preventDefault()

    let country = countryInput.value

    extractedInfo.innerHTML = ''
    if(country){
        try{
            let countryData = await getData(country)
            console.log(countryData)
            displayData(countryData)
        }

        catch(error){
            console.error(error)
            displayError(error)
        }
    }

    else{
        displayError("Please enter a country name")
    }
})


 async function getData(country){
    let response = await fetch (`https://restcountries.com/v3.1/name/${country}`)

    if(!response.ok){
        throw new Error("Could not fetch data")
    }

    return await response.json()
}

function displayData(countryData){

    extractedInfo.innerHTML = ''

const [{
    name:{common},
        region: continent,
        population: number,
        capital : [city],
        flags: {svg}
}] = countryData
    


 let name = document.createElement("p")
 name.classList.add("name")
 name.textContent = `Name: ${common}`
 extractedInfo.appendChild(name)
 
let region = document.createElement("p")
 region.classList.add("region")
 region.textContent = `Region: ${continent}`
 extractedInfo.appendChild(region)

let population = document.createElement("p")
 population.classList.add("population")
 population.textContent = `Population: ${number}`
 extractedInfo.appendChild(population)

  let capital = document.createElement("p")
 capital.classList.add("capital")
 capital.textContent = `Capital: ${city}`
 extractedInfo.appendChild(capital)

  let image = document.createElement("img")
 image.src = svg
 image.classList.add("image")
 extractedInfo.appendChild(image)
}

function displayError(error){
    let errorMessage = document.createElement("p")
    errorMessage.classList.add("errorMessage")
    errorMessage.textContent = error
    extractedInfo.appendChild(errorMessage)
}