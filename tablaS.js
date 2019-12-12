var grid = 8;

for (var i = 0; i < grid; i++) {
    var tb = "";
    for (var j = 0; j < grid; j++) {
        if ((i + j) % 2)
            tb += "#"
        else {
            tb += " ";
        }
        if (j % 2)
            tb += " "
        else {
            tb += "#"
        }

    }
    console.log(tb)
}

// ma starui sa inteleg de ce se pun cate doua dar nu inteleg, help.