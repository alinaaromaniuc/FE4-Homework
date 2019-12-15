//1
function print() {
    console.log(print);
}
print();
//2
function media(a, b) {
    return a * b / 2
}
console.log(media(9, 8));

//3
function celMaiMic(a, b) {
    return Math.min(a, b)
}
console.log(celMaiMic(-1, 10))

//4
function ridicareaLaPutere(a, b) {
    return Math.pow(a, b)
}
console.log(ridicareaLaPutere(9, 2))

//5
function countLetters(a, b) {
    var count = 0;
    for (var i = 0; i < a.length; i++) {
        if (a[i] == b) {
            count++;
        }
    }
    return count;
}
console.log(countLetters("dnjfa afyeL ldlka", 'a'))