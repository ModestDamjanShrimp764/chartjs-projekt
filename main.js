let labels = [];
let values = [];
let mode = "bar";
let chart = null;

const canvas = document.getElementById("chart");
const toggleBtn = document.getElementById("toggleBtn");
const addBtn = document.getElementById("addBtn");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");

const colors = [
"#e74c3c","#3498db","#2ecc71","#f1c40f",
"#9b59b6","#1abc9c","#e67e22","#34495e"
];

function buildConfig(){

const isDark = document.body.classList.contains("dark");

return{
type:mode,
data:{
labels,
datasets:[{
label:"Votes",
data:values,
backgroundColor:labels.map((_,i)=>colors[i%colors.length]),
borderColor:isDark?"#fff":"#333",
borderWidth:1
}]
},
options:{
responsive:true,
maintainAspectRatio:false,
animation:{
duration:1000
},
plugins:{
legend:{
labels:{color:isDark?"#fff":"#000"}
},
title:{
display:true,
text:"President Votes Dashboard",
color:isDark?"#fff":"#000"
}
},
scales:{
x:{ticks:{color:isDark?"#fff":"#000"}},
y:{ticks:{color:isDark?"#fff":"#000"}}
}
}
};
}

function render(){
if(chart)chart.destroy();
chart=new Chart(canvas,buildConfig());
}

async function loadData(){

// Ladeanimation
labels=["Loading..."];
values=[0];
render();

const response=await fetch("http://localhost:3000/api/presidents");
let data=await response.json();

if(sortSelect.value==="asc"){
data.sort((a,b)=>a.votes-b.votes);
}else{
data.sort((a,b)=>b.votes-a.votes);
}

// Filterfunktion
const search=searchInput.value.toLowerCase();
if(search){
data=data.filter(p=>p.name.toLowerCase().includes(search));
}

const total=data.reduce((sum,p)=>sum+p.votes,0);
const avg=data.length?Math.round(total/data.length):0;
const max=data.length?Math.max(...data.map(p=>p.votes)):0;
const min=data.length?Math.min(...data.map(p=>p.votes)):0;

document.getElementById("totalVotes").innerText="Total Votes: "+total;
document.getElementById("avgVotes").innerText="Average: "+avg;
document.getElementById("maxVotes").innerText="Highest: "+max;
document.getElementById("minVotes").innerText="Lowest: "+min;

// Prozentanzeige
labels=data.map(p=>{
const percent=((p.votes/total)*100).toFixed(1);
return `${p.name} (${p.votes}) - ${percent}%`;
});


values=data.map(p=>p.votes);

render();

const list=document.getElementById("list");
list.innerHTML="";

const tableBody=document.querySelector("#rankingTable tbody");
if(tableBody)tableBody.innerHTML="";

data.forEach((p,index)=>{

const li = document.createElement("li");

let medal = "";

if (index === 0) medal = '<img src="die-goldmedaille-ein-eisenstueck-eiffelturm-gold--silber--br_857925712_1200x675_6cfd0748f6ae7bcdd0176c5720cf2d19.jpg" class="medal">';
else if (index === 1) medal = '<img src="LVMH_MEDAILLE_OLY_ARGENT_CREDIT_THOMAS-DESCHAMPS.webp" class="medal">';
else if (index === 2) medal = '<img src="thumbnail_3740d85a-3b25-425b-a997-e91a7d6d3eab.png.1024x1024_q85.png" class="medal">';

li.innerHTML = `
<div style="display:flex; align-items:center;">
  ${medal}
  <span class="name">${p.name} (${p.votes})</span>
</div>

<div>
  <button onclick="deletePresident(${p.id})">Delete</button>
  <button onclick="updatePresident(${p.id})">Update</button>
</div>
`;

list.appendChild(li);

if(tableBody){
const row=document.createElement("tr");

row.innerHTML=`
<td>${index+1}</td>
<td>${p.name}</td>
<td>${p.votes}</td>
`;

tableBody.appendChild(row);
}

});
}

addBtn.addEventListener("click",async()=>{

const name=document.getElementById("nameInput").value.trim();
const votes=Number(document.getElementById("votesInput").value);

if(!name||isNaN(votes)||votes<0){
alert("Ungültige Eingabe");
return;
}

await fetch("http://localhost:3000/api/presidents",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,votes})
});

document.getElementById("nameInput").value="";
document.getElementById("votesInput").value="";

loadData();
});

async function deletePresident(id){

if(!confirm("Wirklich löschen?"))return;

await fetch(`http://localhost:3000/api/presidents/${id}`,{
method:"DELETE"
});

loadData();
}

async function updatePresident(id){

const newVotes=prompt("Neue Votes eingeben:");
if(!newVotes)return;

const votes=Number(newVotes);
if(isNaN(votes)||votes<0)return;

await fetch(`http://localhost:3000/api/presidents/${id}`,{
method:"PUT",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({votes})
});

loadData();
}

toggleBtn.addEventListener("click",()=>{
mode=mode==="bar"?"line":"bar";
render();
});

document.getElementById("darkBtn")
.addEventListener("click",()=>{
document.body.classList.toggle("dark");
render();
});

document.getElementById("exportBtn")
.addEventListener("click",async()=>{

const response=await fetch("http://localhost:3000/api/presidents");
const data=await response.json();

let csv="Name;Votes";   
data.forEach(p=>csv+=`${p.name};${p.votes}`);

const blob=new Blob([csv],{type:"text/csv"});
const url=window.URL.createObjectURL(blob);

const a=document.createElement("a");
a.href=url;
a.download="presidents.csv";
a.click();
});

sortSelect.addEventListener("change",loadData);
searchInput.addEventListener("input",loadData);

loadData();
