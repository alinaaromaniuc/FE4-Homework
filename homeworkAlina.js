function caractereSpeciale(a) {
    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-="; {
        for (i = 0; i < specialChars.length; i++) {
            if (a.indexOf(specialChars[i]) > -1) {
                return true
            }
        }
        return false;
    }
}

console.log(caractereSpeciale("alin@#nao"))



function validate(name, surname, password) {
    name = /^[a-zA-Z]$/;
    surname = /^[a-zA-Z]$/;
    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
    for (var i = 0; i < specialChars.length; i++) {
        if (password.indexOf(specialChars[i]) > -1) {
            return true
        }
        return false
    }

    if (!password.length <= 8) {
        errors.push("password must be at least 8 characters");
    }

    if (!name.test(name)) {
        alert('Please enter your full name.');

        return false;
    }
    if (!surname.test(surname)) {
        alert('Please enter your full surname.');

        return false;
    } else {
        alert('Valid name given.');
        return true;
    }

}


console.log(validate("Alina", "Rom", "Parola@#"))