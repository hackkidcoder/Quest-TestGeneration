// Input and Output
window.addEventListener('load', init);
function init(){
    bindEvents();
    printCount();
    showFn=initCOunt();
    showCount();
}
function showCount(){
    document.getElementById('id').value=showFn();
}
function bindEvents(){
    document.getElementById('add').addEventListener('click', addQuestion);
    document.getElementById('delete').addEventListener('click', deletePerm);
    document.getElementById('update').addEventListener('click', updateQuestion);
    document.getElementById('sort').addEventListener('click', sorting);
    document.getElementById('search').addEventListener('click', searching);
    document.getElementById('save').addEventListener('click', save);
    document.getElementById('load').addEventListener('click', load);
}

function deletePerm(){
    questionOperations.remove();
    printTable();
    printCount();
    
    
}

function printTable(){
    document.getElementById('questions').innerHTML='';
    questionOperations.questions.forEach(printQuestion);
}

function addQuestion(){
    // read all fields
    const fields = ["id", "name", "optiona","optionb","optionc","optiond","rightans","score"];
        const questionObject = {}; // Create Object
        for(let  i= 0 ; i<fields.length;i++){
        questionObject[fields[i]] = document.getElementById(fields[i]).value ;
    }
    questionObject.isMarked = false;
    questionOperations.add(questionObject);
    printTable();
    printCount();
    showCount();
}

function printCount(){
    const total = questionOperations.getLength();
    const mark = questionOperations.countMark();
    const unMark = questionOperations.countUnMark();
    document.getElementById('total').innerText = total;
    document.getElementById('mark').innerText = mark;
    document.getElementById('unmark').innerText = unMark;
}

function markDelete(){
    // where i click (On Which Row)
    const icon = this;
    const qid = icon.getAttribute('qid');
    questionOperations.toggleMark(qid);
    const tr = this.parentNode.parentNode;
    tr.classList.toggle('alert-danger');
    printCount();
 // css  (toggle)
}
function createIcon(fn, id , className){
    // <i class="fa-solid fa-trash-can"></i>
    const icon = document.createElement('i');
    icon.className = className;
    icon.addEventListener('click',fn);
    icon.setAttribute("qid",id); // Custom Attribute
    return icon;
}

function printQuestion(questionObject){
// Row, Cells, Fill Data (Object)
const tbody = document.getElementById('questions');
const tr = tbody.insertRow();
tr.setAttribute('id', questionObject.id);
var index = 0;
for(let key in questionObject){
    if(key == 'isMarked'){
        continue;
    }
    tr.insertCell(index).innerText = questionObject[key];
    index++;
}
const cell=tr.insertCell(index);
cell.appendChild(createIcon(markDelete, questionObject.id,'fa-solid fa-trash-can'));
cell.appendChild( document. createTextNode( '\u00A0\u00A0\u00A0\u00A0\u00A0' ) );
cell.appendChild(createIcon(markEdit, questionObject.id,'fa-solid fa-pencil'));

}

function markEdit(){
    const icon=this;
    const qid = icon.getAttribute('qid');
    console.log(qid);
    const obj=questionOperations.searchById(qid);
    for(let key in obj){
        if(key=='isMarked' ){
            continue;
        }
        document.getElementById(key).value=obj[key];
}
}
function updateQuestion(){
    
    const fields = ["id", "name", "optiona","optionb","optionc","optiond","rightans","score"];
    const updatedObject={};
    for(let  i= 0 ; i<fields.length;i++){
        updatedObject[fields[i]] = document.getElementById(fields[i]).value ;
    }
    updatedObject.isMarked = false;
    var arr2=[updatedObject];
    var arr1=questionOperations.questions;
    var arr=arr1.map(obj => arr2.find(o => o.id === obj.id) || obj);
    questionOperations.questions=arr;
    console.log(arr);
    printTable();

}
function sorting(){
    questionOperations.sort();
    printTable();
}
function searching(){
    let sid=getID();
    let questionObject=questionOperations.searchById(sid);
    console.log(questionObject);
    showSearch(questionObject);
}

function showSearch(questionObject){
    const qid =questionObject.id;
    const tr=document.getElementById(qid);
    tr.classList.toggle('alert-success');
    setTimeout(function () {
        tr.classList.toggle('alert-success');
    }, 1500);
    

}
function getID(){
    return prompt("Enter Question ID -:");
}
function save(){
    if(window.localStorage){
        const questionArray=questionOperations.questions;
        localStorage.setItem('questions',JSON.stringify(questionArray));
    }
    else{
        alert("bROWSER oUTDATED");
    }
}
function load(){
    if(window.localStorage){
        if(localStorage.questions){
            var arr=JSON.parse(localStorage.getItem('questions'));
            questionOperations.questions=arr;
            printTable();
            printCount();
        }
        else{
            alert("Nothing to Load");
        }
    }
    else{
        alert("bROWSER oUTDATED");
    }
}