let resource = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];
const cityUL = document.querySelector('#city-ul');
const cityLI = document.querySelectorAll('.cityLI');
let cityList = [];
let searchBox=document.querySelector('#searchbox');

//Fetching the data from the API
const getData = async () => {
    const response = await fetch(resource);
    if (response.status != 200) {
        throw new Error("Could not fetch data");
    }
    const data = await response.json();
    return data;
}

//Calling the function getData() to fetch the data
getData()
.then(data => cities.push(...data))
.catch(err => console.log(err.message))

//Checks whether the passed value is there in the array or not
function checkCities(checkWord, cities) {
    return cities.filter(item => {
        const regex = new RegExp(checkWord, 'gi');
        return item.city.match(regex);
    })
}


//Checks the input area and filters the results
searchBox.addEventListener('keyup',()=>{
    cityUL.textContent='';
    cityList = (checkCities(searchBox.value, cities));
    if (searchBox.value!='') {
        cityList.forEach(e => {
            let li = document.createElement('li');
            li.innerText=e.city;
            const reg = new RegExp(searchBox.value,'gi');
            li.innerHTML=li.innerText.replace(reg, match=>`<mark>${match}</mark>`)
            li.classList.add('city-li')
            cityUL.append(li);
        });
    }

})