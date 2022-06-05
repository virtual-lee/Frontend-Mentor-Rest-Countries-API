//Dark mode ***START***

let currentTheme = localStorage.getItem("theme");
//console.log(currentTheme);
const stylesheet = $("link[rel='stylesheet']");
const btn = $('.dark-mode');

if (currentTheme === "dark") {
    stylesheet.attr('href', 'style-dark.css');
} else {
    stylesheet.attr('href', 'style-light.css');
}

//Dark mode button click
btn.on('click', function () {

    const href = $("link[rel='stylesheet']").attr('href');
    //const stylesheet = $("link[rel='stylesheet']")

    if (currentTheme == 'light'){
        stylesheet.attr('href', 'style-dark.css');
        currentTheme = "dark";
        localStorage.setItem('theme', 'dark');
    } else  {
        stylesheet.attr('href', 'style-light.css');
        currentTheme = "light";
        localStorage.setItem('theme', 'light');        
    }

});

//Dark mode ***END***

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
            //console.log(data);
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

        countryItem += `<div class="country item" value="${nameLower}">`;
        countryItem += '<a href="detail.html">';
        countryItem += `<img src="${flagImage}" alt="flag">`;
        countryItem += '<br>';
        countryItem += '<div class="content">';
        countryItem += `<h4 class="name">${name}</h4>`;
        countryItem += '<br>';
        countryItem += `<div class="population"><span class="label">Population: </span><span>${population}</span>`;
        countryItem += `<div class="region"><span class="label">Region: </span><span>${region}</span>`;
        countryItem += `<div class="captial"><span class="label">Capital: </span><span>${capital}</span>`;
        countryItem += '</div>';
        countryItem += '</a>';
        countryItem += '</div>';

        holder.append(countryItem);

        $('document').ready(function() {
            $('.country').each(function() {
                $(this).on('click', function() {
                    const selectValue = $('#region-filter :selected').attr("value");
                    const searchValue = $('#search').val()
                    //alert(`${selectValue}`);
                    //alert(searchValue);
                    localStorage.setItem('select', selectValue);
                    localStorage.setItem('search', searchValue);
                });
            });
        });
        
        $('document').ready(function() {

            let countries = $('.country');
            if (storedSearch != '') {
                $('#search').val(`${storedSearch}`);
                countries.not(`.country[value*='${storedSearch}']`).css('display','none'); 
            }
            

        });

    });
}


//Country details click ***START***

//Store values for when returning to home page

const storedSearch = localStorage.getItem("search");
console.log(storedSearch);
const storedSelect = localStorage.getItem("select");
console.log(storedSelect);



