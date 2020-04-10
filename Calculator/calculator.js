//import "./styles.css";

//document.getElementById("app").innerHTML = `
//<h1>Hello Vanilla!</h1>
//<div>
//We use Parcel to bundle this sandbox, you can find more info about Parcel
//<a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
//</div>
//`;



function CreateCalculator() {
    var number = {};

    number.read = function read() {
        firstnr = parseInt(document.getElementById('operand-one').value)
        secondnr = parseInt(document.getElementById('operand-two').value)

        number.firstnr = firstnr;
        number.secondnr = secondnr;
    }
    number.sum = function sum() {
        return document.getElementById("card-text").innerHTML = this.firstnr + this.secondnr;
    }
    number.diff = function diff() {
        var d = this.firstnr - this.secondnr;
        return document.getElementById("card-text").innerHTML = d;

    }
    number.multiply = function multiply() {
        var m = this.firstnr * this.secondnr;
        return document.getElementById("card-text").innerHTML = m;
        //parca gata merci)) 
    }
    number.divide = function divide() {
        var dv = this.firstnr / this.secondnr
        return document.getElementById("card-text").innerHTML = dv;

    }
    return number;
}

const calc = CreateCalculator();

document.querySelector('#sum').addEventListener('click', function() {
    calc.read();
    calc.sum();
});

document.querySelector('#sub').addEventListener('click', function() {
    calc.read();
    calc.diff();
});

document.querySelector('#mul').addEventListener('click', function() {
    calc.read();
    calc.multiply();
});

document.querySelector('#div').addEventListener('click', function() {
    calc.read();
    calc.divide();
});