const doc = document;
const main = doc.getElementById("main");
const back = doc.getElementById("back");
curwords = [], choosenL = [];
bookid = -1;
correct = 0, ans = 0;
start = false;

function Init() {
    main.innerHTML = mainHTML;
    const options = doc.getElementById("options");

    back.classList.add("hidden"); back.disabled = true; back.addEventListener("click", goback);
    
    for(let i = 0;i < 3;i++) doc.getElementById("option" + i.toString()).addEventListener("click", function() {
        bookid = i;
        ButtonUpdate(bookid);
    });

    main.querySelector("#start").addEventListener("click", function() { // start button
        bookid = -1, len = 0;
        for(let i = 0;i < choosenL.length;i++) {
            if (i >= len) bookid++, len += Books[bookid].length;
            if (!choosenL[i]) continue;
            for (let j = 0;j < words[bookid][i-len+Books[bookid].length].length;j++) curwords.push(words[bookid][i-len+Books[bookid].length][j]);
        }
        if (curwords.length < 4) {
            window.alert("請至少選擇一課");
            return;
        }
        main.innerHTML = quizHTML;
        for(let i = 0;i < 4;i++) doc.getElementById(String.fromCharCode(65 + i)).addEventListener("click", function() {answer(rand[i], i);});
        doc.getElementById("incorcnt").addEventListener("click", function() {uStupid();});
        back.addEventListener("click", function() {location.reload();});
        back.removeEventListener("click", goback);
        newWords();
        start = true;
    });
}

for(let i = 0;i < Books.length;i++) {
    for(let j = 0;j < Books[i].length;j++) choosenL.push(0);
}

function goback() {
    Init();
}

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
        doc.getElementById("incorcnt").innerHTML = "<i class=\"fa-regular fa-face-frown\"></i>";
    }

    doc.getElementById("correctcnt").innerHTML = "<i class=\"fa-solid fa-check\"></i> " + correct.toString() + '/' + ans.toString();

    newWords();
}

function uStupid() { // incorrectcnt button
    let WA = doc.getElementById("incorcnt");
    if (WA.innerHTML == "<i class=\"fa-regular fa-face-frown\" aria-hidden=\"true\"></i>") WA.innerHTML = incorword;
    else if (ans != correct) WA.innerHTML = "<i class=\"fa-regular fa-face-frown\"></i>";
}

function ButtonUpdate(bookid) {
    back.classList.remove("hidden"); back.disabled = false;
    options.innerHTML = "";

    prelen = 0;
    for(let i = 0;i < bookid;i++) prelen += Books[i].length;

    for(let i = 0;i < Books[bookid].length;i++) { // button display
        options.innerHTML += "<button class = \"Button\" id = \"" + i.toString() + "\" >" + Books[bookid][i] + "</button><br>";
        if (choosenL[prelen+i]) doc.getElementById(i.toString()).classList.add("choosen");
    }
    
    for(let i = 0;i < Books[bookid].length;i++) {
        doc.getElementById(i.toString()).addEventListener("click", function() {
            if (choosenL[prelen+i]) {
                choosenL[prelen+i] = false;
                doc.getElementById(i.toString()).classList.remove("choosen");
            } else {
                choosenL[prelen+i] = true;
                doc.getElementById(i.toString()).classList.add("choosen");
            }
        });
    }
}

Init();