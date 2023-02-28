const loadPhones = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
    /* fetch(url)
        .then(res => res.json())
        .then(data => console.log(data)) */
}

const displayPhones = phones => {
    console.log(phones);
    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.textContent = ``;
    phones = phones.slice(0, 3);

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
                </div>
            </div>
            `
            phonesContainer.appendChild(phoneDiv);
        })
        toggleSpinner(false); // stop spinning
    }
}

document.getElementById('btn-search').addEventListener('click', () => {
    toggleSpinner(true); // start spinning
    const searchInput = document.getElementById('searchField');
    const searchText = searchInput.value;
    loadPhones(searchText);
    searchInput.value = '';
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