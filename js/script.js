
let button = document.querySelector('#button')
let name = document.querySelector('#name')
let height = document.querySelector('#height')
let mass = document.querySelector('#mass')
let birthYear = document.querySelector('#birth-year')
let next_button = document.querySelector('#next_button')
let prev_button = document.querySelector('#prev_button')
var nextPage
var prevPage

function getInfo() {
    prev_button.disabled = "true"
    axios.get('http://swapi.co/api/people/?page=1').then(function(response){
        updateInfo(response.data.results[0]);  // display the first people of current page
        console.log(response.status); // for testing
        nextPage = response.data.next;
        prevPage = response.data.previous;
        checkPage();
    }).catch(function (error) {
        showErrorMessage();
    });  
}

function nextPage() {
    
    axios.get(nextPage).then(function(response){
        updateInfo(response.data.results[0]);  // display the first people of current page
        console.log(response.status);  // for testing
        nextPage = response.data.next;
        prevPage = response.data.previous;
        checkPage();
    }).catch(function (error) {
        showErrorMessage();
    });
}

function prevPage() {
    
    axios.get(prevPage).then(function(response){
        updateInfo(response.data.results[0]);  // display the first people of current page
        console.log(response.status); // for testing
        nextPage = response.data.next;
        prevPage = response.data.previous;
        checkPage();  
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

function checkPage(){
    if (prevPage == null) {prev_button.disabled=true;} else {prev_button.disabled=false;};
    if (nextPage == null) {next_button.disabled=true;} else {next_button.disabled=false;};
    
}

button.addEventListener('click', getInfo)
next_button.addEventListener('click', nextPage)
prev_button.addEventListener('click', prevPage)
