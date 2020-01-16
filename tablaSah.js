var tab = document.querySelector('button')
console.log('tab', tab)
tab.addEventListener('click', tablaSah)

function tablaSah() {

    var x = parseInt(document.querySelector('#width').value);
    var y = parseInt(document.querySelector('#height').value);

    console.log('test');


    var chessBoard = document.querySelector('#tabla-wrapper')
    chessBoard.innerHTML = '';

    for (var i = 0; i < y; i++) {
        var row = chessBoard.appendChild(document.createElement("div"));
        for (var j = 0; j < x; j++) {
            row.appendChild(document.createElement("span"));
        }
    }

}