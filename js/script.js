let button = document.querySelector('#button')
let name = document.querySelector('#name')
let height = document.querySelector('#height')
let mass = document.querySelector('#mass')
let birthYear = document.querySelector('#birth-year')
let next_button = document.querySelector('#next_button')
let prev_button = document.querySelector('#prev_button')
var pageCounter = 1


function getInfo() {
    
    axios.get('http://swapi.co/api/people/?page=1').then(function(response){
        updateInfo(response.data.results[0]);  // display the first people of current page
        console.log(response.status); // for testing
           
    }).catch(function (error) {
        showErrorMessage();
    });  
}

function nextPage() {
    pageCounter ++
    axios.get('http://swapi.co/api/people', {
        params: {
            page: pageCounter
                }
    }).then(function(response){
        checkPage();  // does not work, don't know why
        updateInfo(response.data.results[0]);  
        console.log(response.status);
        
    }).catch(function (error) {
        showErrorMessage();
    });
}

function prevPage() {
    pageCounter --
    axios.get('http://swapi.co/api/people', {
        params: {
            page: pageCounter
                }
    }).then(function(response){
        updateInfo(response.data.results[0]);
        console.log(response.status); // for testing       
    }).catch(function (error) {
        showErrorMessage();
    });
}

function updateInfo(data) {
    name.innerText = data.name
    height.innerText = `Height: ${data.height}`
    mass.innerText = `Mass: ${data.mass}`
    birthYear.innerText = `Birth year: ${data.birth_year}`
    
}

function showErrorMessage() {
    name.innerText = '!Error!';
}

function checkPage(){       // does not work, don't know why
    if (pageCounter > 9){ console.log(pageCounter);}
}

button.addEventListener('click', getInfo)
next_button.addEventListener('click', nextPage)
prev_button.addEventListener('click', prevPage)