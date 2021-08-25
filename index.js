let nav_lists = [
    {
        name:"Bosh Sahifa",
        url:"#head"
    },{
        name:"Veb sahifa haqida",
        url:"#about"
    }
]
let navbar = document.getElementById("navbar")
for(let i=0;i<nav_lists.length;i++){
    navbar.innerHTML+=`
    <a href="${nav_lists[i].url}"><h4>${nav_lists[i].name}</h4><h4 class="far fa-angle-right"></h4></a>
    `
}

let textarea = [
{
    language:"Lotincha matn uchun maydon.",
    id:"text1",
    onkey:"translate1(this.value)"
},{
    language:"Крилча матн учун майдон.",
    id:"text2",
    onkey:"translate2(this.value)"
}
]

//Krill Harflari
let kirils = ["Ю","Ч","ю","ч","Ғ","ғ","Ў","ў","Ц","У","К","Е","Ё","Н","Г","Ш","Щ","З","Х","Ҳ","Ъ","Ф","Қ","В","А","П","Р","О","Л","Д","Ж","Э","Я","С","М","И","Т","Ь","Б","Й","ц","у","к","е","ё","н","г","ш","щ","з","х","ҳ","ъ","ф","қ","в","а","п","р","о","л","д","ж","э","я","с","м","и","т","ь","б","й"];

//Lotin Harflari
let lotins = ["Yu","Ch","yu","ch","G'","g'","O'","o'","Ts","U","K","E","Yo","N","G","Sh","Sh","Z","H","X","`","F","Q","V","A","P","R","O","L","D","J","E","Ya","S","M","I","T","'","B","Y","ts","u","k","e","yo","n","g","sh","sh","z","h","x","`","f","q","v","a","p","r","o","l","d","j","e","ya","s","m","i","t","'","b","y"];
    //navbar
 let header = document.querySelector("header")
 let op_c = document.querySelector("header h2")  
 let nav_active = false
function nav(){
    header.classList.toggle("nav")
    if(!nav_active){
     nav_active = true
op_c.classList="far fa-arrow-right"   
    }else{
     nav_active = false
op_c.classList="far fa-bars"
    }
}    
    let section = document.querySelector("section")
//add textareas
for(let i=0;i<textarea.length;i++){
    section.innerHTML+=`
<div id="text-area">
    <textarea oninput="${textarea[i].onkey}" placeholder="${textarea[i].language}" id="${textarea[i].id}"></textarea>
    <div id="content">
<h2 onclick="copy(${i})"><i class="fal fa-clipboard"></i></h2>  
<h2 onclick="downloadPdf(${i})"><i class="fal fa-file-download"></i></h2>      
    </div>
</div>      
`}

let lotin = document.getElementById("text1")
let kril = document.getElementById("text2")
//Kril => Lotin
function translate1(val){
for(var i=0;i<kirils.length;i++){
 val = val.replaceAll(lotins[i], kirils[i])}   
    kril.value=val
}
//Lotin => Krill
function translate2(val){
for(var i=0;i<lotins.length;i++){
 val = val.replaceAll(kirils[i], lotins[i])}   
    lotin.value=val
}
function copy(c) {        
window.navigator.vibrate([100,50,100])
let c_text = document.getElementById(`${textarea[c].id}`)
    c_text.focus();
    c_text.select();
try{
    document.execCommand('copy');
} catch (err) {
console.log("Error, unable to copy.");
    } 
}

let rf = document.getElementById("read_file")
let rt = document.getElementById("read_text")
function downloadPdf(i){
    rf.classList.toggle("read")
if(i == 0 && lotin.value !== ""){
    rt.innerHTML= lotin.value
}else if(i == 1 && kril.value !== ""){
    rt.innerHTML= kril.value
}else{
    rt.innerHTML="Hozircha hech qanday matnni tarjima qilmadingiz."
}
}

function download(){
window.navigator.vibrate([100,50,100])
    rf.classList.toggle("read")
  let element = document.getElementById("read_text"); 
let opt = {margin:1,
  filename:'LotinKrill.pdf',
image:{ type: 'jpeg', quality: 0.98 },
  html2canvas:  { scale: 2 },
  jsPDF: { unit: 'in', format:'letter', orientation: 'portrait' }
};html2pdf().set(opt).from(element).save();
html2pdf(element, opt);
}     

let deg = 0
function reset_area(){
    lotin.value=""
    kril.value=""
    deg+= 360
let res = document.getElementById("reset") 
res.style.transition="1s"
res.style.transform="rotate("+deg+"deg)"   
}