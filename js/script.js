// These were used for the first version, I let it here for later testing
// let name = document.querySelector('#name')
// let height = document.querySelector('#height')
// let mass = document.querySelector('#mass')
// let birthYear = document.querySelector('#birth-year')
let button = document.querySelector('#button')
let next_button = document.querySelector('#next_button')
let prev_button = document.querySelector('#prev_button')
var peopleContainer = document.querySelector("#people-container")
var nextPage
var prevPage

function getInfo() {
    prev_button.disabled = "true"
    axios.get('http://swapi.co/api/people/?page=1').then(function(response){
        clearDiv();
        console.log(response.status); // for testing
        updateInfo2(response.data.results);         
        nextPage = response.data.next;
        prevPage = response.data.previous;
        checkPage();
     }).catch(function (error) {
         showErrorMessage();
     });  
}

function nextPage() {
    
    axios.get(nextPage).then(function(response){
        clearDiv();
        updateInfo2(response.data.results);  
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
        clearDiv();
        updateInfo2(response.data.results);  
        console.log(response.status); // for testing
        nextPage = response.data.next;
        prevPage = response.data.previous;
        checkPage();  
    }).catch(function (error) {
        showErrorMessage();
    });
}

// This was the first version, I used insertAdjacentHTML instead (see below)
// function updateInfo(data) {
//     name.innerText = data.name
//     height.innerText = `Height: ${data.height}`
//     mass.innerText = `Mass: ${data.mass}`
//     birthYear.innerText = `Birth year: ${data.birth_year}`  
// }

function updateInfo2(data){
    var peopleString = '';
    for (i=0; i < data.length; i++){
        peopleString += '<h2 id="name">' +data[i].name+ '</h2> \
                         <p id="height">Height: ' +data[i].height+ '</p> \
                         <p id="mass">Mass: ' +data[i].mass+ '</p> \
                         <p id="birth-year">Birth year: ' +data[i].birth_year+ '</p>'
    }
    peopleContainer.insertAdjacentHTML('beforeend', peopleString);
}

function showErrorMessage() {
    name.innerText = '!Error!';
}

function clearDiv(){
    peopleContainer.innerHTML = "";
}

function checkPage(){
    if (prevPage == null) {prev_button.disabled=true;} else {prev_button.disabled=false;};
    if (nextPage == null) {next_button.disabled=true;} else {next_button.disabled=false;};
    
}

button.addEventListener('click', getInfo)
next_button.addEventListener('click', nextPage)
prev_button.addEventListener('click', prevPage)
