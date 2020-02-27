//register section

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');


signInButton && signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});
signUpButton && signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
//carousel section
/*
document.ready(function() {
    $('.menu-toggle').on('click', function() {
        $('.nav').toggleClass('showing');
        $('.nav ul').toggleClass('showing');
    });
    $('.post-wrapper').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: $('.next'),
        prevArrow: $('.prev'),

    });

});
*/

function validate() {
    var firstname = document.getElementById("firstname").value;
    var secondname = document.getElementById("secondname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var city = document.getElementById("city").value;
    var country = document.getElementById("country").value;


    error_message.style.padding = "10px";

    var text;
    if (firstname.lenght < 2) {
        text = "Please enter valid First Name";
        error_message.innerHTML = text;
        return false;
    }

    if (secondname.lenght < 5) {
        text = "Please enter valid Second Name";
        error_message.innerHTML = text;
        return false;
    }

    if (email.indexOf("@") == -1 || email.length < 6) {
        text = "Please Enter valid Email";
        error_message.innerHTML = text;
        return false;
    }
    if (city.lenght < 2) {
        text = "Please enter valid First Name";
        error_message.innerHTML = text;
        return false;
    }
    if (country.lenght < 2) {
        text = "Please enter valid First Name";
        error_message.innerHTML = text;
        return false;
    }


    alert("Form Submitted Succesfully!")
}

//// Login
var signinVar = document.getElementById('sign-in')
    //console.log(signinVar)
signinVar && signinVar.addEventListener('click', SignInFunction)

function SignInFunction(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    body: {
        email,
        password
    }

    fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then(response => {
            localStorage.setItem('token', response.token)
            window.location.assign('mainPage.html')
        })
        .catch(error => {
            console.log('Request failed', error);
        });
};