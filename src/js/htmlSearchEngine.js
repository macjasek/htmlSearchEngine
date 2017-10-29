



//console.log(re.exec(html));
//console.log(html.match(re));

//let result = re.test(html) ? 'Znaleziono' : 'Nie znaleziono';

//let element = document.getElementById("result");

//element.innerHTML = result;
document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("search-btn").addEventListener('click',function(){
            search();
    });
    document.getElementById('searchString').addEventListener('click', function(){
            clearStatus();
    });

    document.getElementById('cases_id').addEventListener('click', function(){
        clearStatus();
    });

    document.getElementById('whole_id').addEventListener('click', function(){
        clearStatus();
    });
    
})

function clearStatus(){
    document.getElementById("search-btn").innerHTML = 'Search';
    sessionStorage.setItem('searchIdx','0');
}


function search() {
    //document.getElementById('result').innerHTML='';
    
    html = document.body.textContent;
    
    //Pełne słowa
    
    let searchString = document.getElementById('searchString').value;

    if (searchString == ''){
        return;
    }
    

    let caseCheckbox = document.getElementById('cases_id')

    let flags = caseCheckbox.checked ? 'gi' : 'g';

    let wholeCheckbox = document.getElementById('whole_id');

    let whole = wholeCheckbox.checked ? '\\b' : '';
    
    let re = new RegExp(`${whole}${searchString}${whole}`,flags);

    let searchArr = searchResult(html,re);

    let textNodesArr = getTextNodes();

    let selectionRanges = getRangesArr(textNodesArr,searchArr);

    console.log(selectionRanges);

    let s = window.getSelection();

    s.removeAllRanges();

    let range = document.createRange();
    
    let a = Number(sessionStorage.getItem('searchIdx'));

    console.log(sessionStorage.getItem('searchIdx'));

    if (a > selectionRanges.length - 1){
        a = 0;
    }

    console.log(textNodesArr[a]);

    

    //{start, end, node} = textNodesArr[a]
    
    range.setStart(selectionRanges[a].rangeNode,selectionRanges[a].rangeStart);
    range.setEnd(selectionRanges[a].rangeNode,selectionRanges[a].rangeEnd);

    s.addRange(range);

    document.getElementById("search-btn").innerHTML = 'Next';
    
    sessionStorage.setItem('searchIdx', `${a + 1}`);
    
}

function getRangesArr(textNodesArr,searchArr) {
    let outcome = [];

    for (el in textNodesArr){

        //console.log(textNodesArr[el]);

        for (id in searchArr){
            if(searchArr[id].startIndex >= textNodesArr[el].start && searchArr[id].endIndex <= textNodesArr[el].end){
                const rangeNode = textNodesArr[el].node;
                const rangeStart = searchArr[id].startIndex - textNodesArr[el].start;
                const rangeEnd = rangeStart + searchArr[id].endIndex - searchArr[id].startIndex;
                outcome.push({rangeNode,rangeStart,rangeEnd});
            }
            
        }
    }
    
    return outcome;
}

function getTextNodes (){
    let treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    //console.log(treeWalker);

    let outcome = [];
    let textLenght = 0;

    while(treeWalker.nextNode()){
        const node = treeWalker.currentNode;
        const start = textLenght;

        textLenght += node.nodeValue.length;
        
        const end = textLenght - 1;

        outcome.push({start, end, node});
    }

    

    return outcome;
}

function searchResult(html, re){
    let myArray;
    let msg = '';
    let outcome = [];
    while ((myArray = re.exec(html)) !== null ){

        const startIndex = re.lastIndex - myArray[0].length;
        const endIndex = re.lastIndex 

        //msg += `Found ${myArray[0]}. Next match starts at ${re.lastIndex} <br>`;

        outcome.push({startIndex, endIndex});
        
    };

    //document.getElementById('result').innerHTML=msg;

    return outcome;

    //let s = window.getSelection();

    //if(s.rangeCount > 0) s.removeAllRanges();

    //let range = document.createRange();

    //console.log(document.body.childNodes[4]);

    //range.setStart(document.body.childNodes[4],0);
    //range.setEnd(document.body.childNodes[4],2);

    //s.addRange(range);
}

