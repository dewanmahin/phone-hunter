const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
    /* fetch(url)
        .then(res => res.json())
        .then(data => console.log(data)) */
}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.textContent = ``;
    // Display 10 phones only
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }

    // display warning message
    const noPhone = document.getElementById('no-found-warning');
    if(phones.length == 0){
        noPhone.classList.remove('d-none');
        toggleSpinner(false); // stop spinning
    }// display all phones
    else{
        noPhone.classList.add('d-none');
        phones.forEach(phone => {
            const phoneDiv = document.createElement('div');
            phoneDiv.classList.add('col');
            phoneDiv.innerHTML = `
            <div class="card">
                <img src="${phone.image}" class="card-img-top mx-auto w-75" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                </div>
            </div>
            `
            phonesContainer.appendChild(phoneDiv);
        })
        toggleSpinner(false); // stop spinning
    }
}

const processSearch = (dataLimit) => {
    toggleSpinner(true); // start spinning
    const searchInput = document.getElementById('searchField');
    const searchText = searchInput.value;
    loadPhones(searchText, dataLimit);
    // searchInput.value = '';
}

// handle search button click
document.getElementById('btn-search').addEventListener('click', () => {
    processSearch(true);
})

// search button handler by enter button
document.getElementById('searchField').addEventListener('keyup', (e) => {
    if(e.key == 'Enter'){
        processSearch(true);
    }
})

// Spinner toggle using function
const toggleSpinner = isLoading => {
    const spinningSection = document.getElementById('spinner');
    if(isLoading){
        spinningSection.classList.remove('d-none');
    }else{
        spinningSection.classList.add('d-none');
    }
}

// not the best practice but for learning doing in this way
document.getElementById('btn-show-all').addEventListener('click', () => {
    processSearch(false);
})

// load details of specific model
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json()
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p>Display Size: ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'No Information Found'}</p>
        <p>Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No Information Found'}</p>
    `
}