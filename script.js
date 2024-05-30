const doc = document;
const main = doc.getElementById("main");
const sub = doc.getElementById("sub");
const les = doc.getElementById("lessons");
curwords = [], choosenL = [], correct = 0, wrong = 0;

for (let i = 0;i < lessons.length;i++) {
    choosenL.push(false);
}

for(let i = 0;i < lessons.length;i++) {
    les.innerHTML += "<button class = \"l notchoosen\" id = \"" + i.toString() + "\" >" + lessons[i] + "</button><br><br>";
}
for(let i = 0;i < lessons.length;i++) {
    doc.getElementById(i.toString()).addEventListener("click", function() {
        if (choosenL[i]) {
            choosenL[i] = false;
            doc.getElementById(i.toString()).classList.remove("choosen");
            doc.getElementById(i.toString()).classList.add("notchoosen");
        } else {
            choosenL[i] = true;
            doc.getElementById(i.toString()).classList.remove("notchoosen");
            doc.getElementById(i.toString()).classList.add("choosen");
        }
    });
}

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
    doc.getElementById("content").innerHTML = curwords[rand[rand[4]]][0];
    for(let i = 0;i < 4;i++) {
        doc.getElementById("option" + String.fromCharCode(65+i)).innerHTML = curwords[rand[i]][1];
    }
}

function choose(op) {
    if (curwords[op][0] == curwords[rand[rand[4]]][0]) {
        correct++;
    } else wrong++;

    console.log(correct, wrong);
    newWords();
}

main.querySelector("#start").addEventListener("click", function() { //start button
    for(let i = 0;i < choosenL.length;i++) {
        if (!choosenL[i]) continue;
        for(let j = 0;j < words[i].length;j++) curwords.push(words[i][j]);
    }
    newWords();
    doc.getElementById("main").remove();
    doc.getElementById("sub").classList.remove("hidden")
    doc.getElementById("sub").classList.add("visible")
});

for(let i = 0;i < 4;i++) {
    doc.getElementById("option" + String.fromCharCode(65+i)).addEventListener("click", function() {choose(rand[i])})
}