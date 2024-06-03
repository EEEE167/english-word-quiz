const doc = document;
const main = doc.getElementById("main");
const options = doc.getElementById("options");
const back = doc.getElementById("back");
curwords = [], choosenL = [];
bookid = -1;
correct = 0, ans = 0;
start = false;
incorword = ":D";

back.addEventListener("click", function() {location.reload();});

for(let i = 0;i < 3;i++) doc.getElementById("option" + i.toString()).addEventListener("click", function() {
    bookid = i;
    ButtonUpdate(bookid);
});
function random(max) { // ( ^ω^)
    arr = [];
    while(arr.length < 4) {
        tmpR = Math.floor(Math.random() * (max + 1));
        if (!arr.includes(tmpR)) arr.push(tmpR);
    }
    arr.push(Math.floor(Math.random() * (4)));
    for(let i = 0;i < 4;i++) {
        arr.push(Math.floor(Math.random() * curwords[arr[i]][1].length));
    }    
    return arr;
}

function newWords() { // :D
    rand = random(curwords.length-1);
    doc.getElementById("content").innerHTML = "<strong>" + curwords[rand[rand[4]]][0] + "</strong>";
    for(let i = 0;i < 4;i++) {
        doc.getElementById(String.fromCharCode(65 + i)).innerHTML = "<strong>" + curwords[rand[i]][1][rand[5+i]] + "</strong>";
    }
}

function answer(optionid, order) { // answer and check
    ans++;
    if (curwords[rand[rand[4]]][1].includes(curwords[optionid][1][rand[5+order]])) {
        correct++;
    } else {
        incorword = curwords[rand[rand[4]]][0] + "<br>✔: " + curwords[rand[rand[4]]][1][rand[5+rand[4]]] + "<br>✘: " + curwords[optionid][1][rand[5+order]];
        doc.getElementById("incorcnt").innerHTML = "D:";
    }
    doc.getElementById("correctcnt").innerHTML = correct.toString() + '/' + ans.toString();

    newWords();
}

function uStupid() { // incorrectcnt button
    let WA = doc.getElementById("incorcnt");
    if (WA.innerHTML == "D:") WA.innerHTML = incorword;
    else if (WA.innerHTML != ":D") WA.innerHTML = "D:";
}

function ButtonUpdate(bookid) {
    back.classList.remove("hidden"); back.classList.add("visible"); back.disabled = false;
    options.innerHTML = "";
    for(let i = 0;i < Books[bookid].length;i++) { // button display
        options.innerHTML += "<button class = \"Button\" id = \"" + i.toString() + "\" >" + Books[bookid][i] + "</button><br>";
    }
    for(let i = 0;i < Books[bookid].length;i++) {
        doc.getElementById(i.toString()).addEventListener("click", function() {
            if (choosenL[i]) {
                choosenL[i] = false;
                doc.getElementById(i.toString()).classList.remove("choosen");
            } else {
                choosenL[i] = true;
                doc.getElementById(i.toString()).classList.add("choosen");
            }
        });
    }
}

main.querySelector("#start").addEventListener("click", function() { // start button
    for(let i = 0;i < choosenL.length;i++) {
        if (!choosenL[i]) continue;
        for (let j = 0;j < words[bookid][i].length;j++) curwords.push(words[bookid][i][j]);
    }
    if (curwords.length < 4) {
        window.alert("請至少選擇一課");
        return;
    }
    main.innerHTML = quizHTML;
    for(let i = 0;i < 4;i++) doc.getElementById(String.fromCharCode(65 + i)).addEventListener("click", function() {answer(rand[i], i);});
    doc.getElementById("incorcnt").addEventListener("click", function() {uStupid();});
    newWords();
    start = true;
});