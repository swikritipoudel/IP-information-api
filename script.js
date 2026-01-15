let extractedInfo = document.querySelector(".extractedInfo")
let countryInput = document.querySelector(".countryInput")
let enter = document.querySelector(".enter")

enter.addEventListener("click", async event=>{
    event.preventDefault()

    let country = countryInput.value

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
 name.textContent = common
 extractedInfo.appendChild(name)
 
let region = document.createElement("p")
 region.classList.add("region")
 region.textContent = continent
 extractedInfo.appendChild(region)

let population = document.createElement("p")
 population.classList.add("population")
 population.textContent = number
 extractedInfo.appendChild(population)

  let capital = document.createElement("p")
 capital.classList.add("capital")
 capital.textContent = city
 extractedInfo.appendChild(capital)

  let image = document.createElement("img")
 image.src = svg
 image.classList.add("image")
 extractedInfo.appendChild(image)
}