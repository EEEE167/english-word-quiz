const doc = document;
const main = doc.getElementById("main");
const options = doc.getElementById("options");
const exit = doc.getElementById("exit");
curwords = [], choosenL = [], bookid = -1, ButtonArr = [], correct = 0, wrong = 0, start = false;

exit.addEventListener("click", function() {location.reload();});

for(let i = 0;i < 19;i++) doc.getElementById("animation").innerHTML += "<li></li>";
for(let i = 0;i < 3;i++) doc.getElementById("option" + i.toString()).addEventListener("click", function() {
    bookid = i;
    ButtonUpdate(bookid);
});

function random(max) {
    arr = [];
    while(arr.length < 4) {
        tmpR = Math.floor(Math.random() * (max + 1));
        if (!arr.includes(tmpR)) arr.push(tmpR);
    }
    arr.push(Math.floor(Math.random() * (4)))
    return arr;
}

function newWords() {
    rand = random(curwords.length-1);
    doc.getElementById("content").innerHTML = "<strong>" + curwords[rand[rand[4]]][0] + "</strong>";
    for(let i = 0;i < 4;i++) {
        doc.getElementById(String.fromCharCode(65 + i)).innerHTML = "<strong>" + curwords[rand[i]][1] + "</strong>";
    }
}

// answer and check
function answer(optionid) {
    if (curwords[optionid][0] == curwords[rand[rand[4]]][0]) {
        correct++;
    } else wrong++;

    console.log(correct, wrong);
    newWords();
}

function ButtonUpdate(bookid) {
    exit.classList.remove("hidden"); exit.classList.add("visible"); exit.disabled = false;
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
        window.alert("請至少選擇一課")
        return;
    }
    main.innerHTML = quizHTML;
    for(let i = 0;i < 4;i++) doc.getElementById(String.fromCharCode(65 + i)).addEventListener("click", function() {answer(rand[i]);});
    newWords();
    start = true;
});