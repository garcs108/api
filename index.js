console.log("101");

let apiData= [];
let apiURL = "https://api.airtable.com/v0/app1fSfPkcGpk7ET0/tbliiPt1HNqq9SFEN?api_key=keyiCUOLdRf4cvsZ0"

let activity = [];

const select_menu = document.getElementById("activity_show_select");
const image_container = document.getElementByID ("image_container");

async function fetchData(url){
    let response = await fetch(url);
    let jsonData = await response.json();
    return jsonData;
}

async function getData(){
    let data= await fetchData (apiURL);
}

for(let i=0; i<data.records.lenth; i++){
let record = data.records [i].fields;
apiData.push(record);
}

makeDropdown ();

select_menu.addEventListener('change', function handleChange (event){
    imageSearch();
});

function makeDropdown(){
    for(let i=0; i<apiData.length; i++){
        let activityName = apiData [i].Descritpiton;
        activity.push(activityName);
    }
}

activity = removeDuplicates(activity);
console.log(activity);

let i = 0;
activity.forEach(element => {
    let option = document.createElement("option");
    option.className = "options";
    option.id = "option" + i;
    option.innerHTML = element;
    option.value = element;
    select_menu.appendChild(option);
    i++;
})

function removeDuplicates(arr) {
    return arr.filter ((item,
        index) => arr.indexOF(item)===index);
}

function imageSearch(){
    console.log(select_menu.value);

    const results = apiData.filter((entry) => {
        const descriptionMatch = entry.Description.includes(select_menu.value);
        return descriptionMatch;
    })

renderSortedImages(results, image_container);
}

function renderSortedImages(data, container){
    container.innerHTML = "";

    data.forEach((entry, index) => {
        const image = document.createElement("img");
        image.src = entry.Image[0].url;

        container.appendChild(image);
    })
}