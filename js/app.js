const loadPhones = async() => {
    const url = `https://openapi.programming-hero.com/api/phones?search=iphone`
    /* fetch(url)
        .then(res => res.json())
        .then(data => console.log(data)) */
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    console.log(phones);
}

loadPhones();