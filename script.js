const doc = document;
const main = doc.getElementById("main");
const sub = doc.getElementById("sub");
const les = doc.getElementById("lessons");
cor = 0;
wro = 0;

for(let i = 0;i < lessons.length;i++) {
    les.innerHTML += "<button class = \"l\">" + lessons[i] + "</button><br><br>";
}

function random(max) {
    arr = [];
    while(arr.length < 4) {
        tmp = Math.floor(Math.random() * (max + 1));
        if (!arr.includes(tmp)) arr.push(tmp);
    }
    arr.push(Math.floor(Math.random() * (4)))
    return arr;
}


function newWords() {
    rand = random(words[7].length-1);
    doc.getElementById("content").innerHTML = words[7][rand[rand[4]]][0];
    doc.getElementById("optionA").innerHTML = words[7][rand[0]][1];
    doc.getElementById("optionB").innerHTML = words[7][rand[1]][1];
    doc.getElementById("optionC").innerHTML = words[7][rand[2]][1];
    doc.getElementById("optionD").innerHTML = words[7][rand[3]][1];
}

function choose(op) {
    if (words[7][op][0] == words[7][rand[rand[4]]][0]) {
        cor++;
    } else wro++;

    console.log(cor, wro);
    newWords();
}

main.querySelector("#start").addEventListener("click", function() { //start button
    newWords();
    doc.getElementById("main").remove();
    doc.getElementById("sub").classList.remove("hidden")
    doc.getElementById("sub").classList.add("visible")
});

doc.getElementById("optionA").addEventListener("click", function() {choose(rand[0]);});
doc.getElementById("optionB").addEventListener("click", function() {choose(rand[1]);});
doc.getElementById("optionC").addEventListener("click", function() {choose(rand[2]);});
doc.getElementById("optionD").addEventListener("click", function() {choose(rand[3]);});