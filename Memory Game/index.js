var main = document.getElementsByClassName("main")[0],
    letters0 = ["电", "买", "车", "红", "无", "买", "爱", "红", "爱", "无", "D电", "车"],
    letters1 = ["无", "红", "德", "电", "爱", "车", "电", "车", "德", "无", "爱", "红"],
    letters2 = ["车", "电", "红", "车", "红", "德", "莓", "莓", "买", "德", "买", "电"],
    letters3 = ["德", "车", "无", "买", "莓", "电", "电", "莓", "买", "无", "车", "德"],

    rArray = Math.floor(Math.random() * 3),
    all_div = document.getElementsByTagName("div"),
    div,
    h1;


function randomArray() {
    "use strict";
    if (rArray === 0) { rArray = letters1; }
    if (rArray === 1) { rArray = letters1; }
    if (rArray === 2) { rArray = letters2; }
    if (rArray === 3) { rArray = letters3; }

}
randomArray();

function lettersFunction() {
    "use strict";
    for (var i = 0; i <= 11; i = i + 1) {
        div = document.createElement("div");
        main.appendChild(div);
        h1 = document.createElement("h1");
        div.appendChild(h1);
        h1.innerText = rArray[i];
    }

}
lettersFunction();


"use strict";
var x = [],
    cas = true;
for (var i = 0; i <= all_div.length - 1; i++) {
    all_div[i].onclick = function() {

        if (!cas) return
        this.firstChild.style.opacity = "1"
        if (x.length == 0) {
            x[0] = this;
            x[0].style.pointerEvents = "none";
        } else if (x.length == 1) {
            x[1] = this;
            x[1].style.pointerEvents = "none";

        }

        if (x.length == 2) {
            cas = false;
            setTimeout(check, 500);

        }

    }

}

function check() {
    if (x[0].firstChild.innerText === x[1].firstChild.innerText) {} else {
        x[0].firstChild.style.opacity = "0"
        x[1].firstChild.style.opacity = "0"
        x[0].style.pointerEvents = "auto";
        x[1].style.pointerEvents = "auto";
    }
    x = [];
    cas = true;
}