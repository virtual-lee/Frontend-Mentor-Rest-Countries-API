$('.dark-mode').on('click', function () {
    $('body').toggleClass('dark');
    $('.item').toggleClass('dark');
    $('#header-container').toggleClass('dark');
    $('svg').toggleClass('dark');
    $('button').toggleClass('dark');
    $('.search-container').toggleClass('dark');
    $('input').toggleClass('dark');
    $('.filter').toggleClass('dark');
    $('.option').toggleClass('dark');
});

let url = 'all'
getCountries(url)

$( "#search" ).keyup(function() {
    let searchWord = $('#search').val();
    searchWord = searchWord.toLowerCase();
    //console.log(searchWord);

    const countries = $('.country');
    //console.log(countries);
    if (searchWord === ''){
        countries.css('display','block');
    } else {
        countries.not(`.country[value*='${searchWord}']`).css('display','none');
        $(`.country[value*='${searchWord}']`).css('display','block');
    }

});


$( "#region-filter" ).on( "change", function() {

    let region = $('#region-filter :selected').attr("value");
    $('.item').remove();
    let url;
    if (region === 'all'){
        url = 'all'
    } else {
        url = `region/${region}`
    }
    getCountries(url);
});

function getCountries(url){
    $.ajax({
        url: `https://restcountries.com/v2/${url}`,
        success: function(data){
            console.log(data);
            displayCountryData(data);
        }
    });
}

function displayCountryData(data) {

    $('.chad').remove();

    data.forEach(el => {
        const name = el.name;
        const nameLower = name.toLowerCase();
        const population = parseInt(el.population).toLocaleString('en-US');
        const region = el.region;
        const capital = el.capital;
        //console.log(capital);
        const flagImage = el.flags.png;


        
        const holder = $('#country-holder')
        let countryItem ='';

        countryItem += `<div class="country item light" value="${nameLower}">`;
        countryItem += `<img src="${flagImage}" alt="flag">`;
        countryItem += '<br>';
        countryItem += '<div class="content">';
        countryItem += `<h4 class="name">${name}</h4>`;
        countryItem += '<br>';
        countryItem += `<div class="population"><span class="label">Population: </span><span>${population}</span>`;
        countryItem += `<div class="region"><span class="label">Region: </span><span>${region}</span>`;
        countryItem += `<div class="captial"><span class="label">Capital: </span><span>${capital}</span>`;
        countryItem += '</div>';
        countryItem += '</div>';

        holder.append(countryItem);




        
    });
}