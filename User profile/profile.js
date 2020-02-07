function getUsers() {
    fetch('sampleUsers.json')
        .then((res) => res.json())
        .then((data) => {
            let output = '';
            data.forEach(function(user) {
                output += `
               
        <div class="profileCard">
          <ul class="list-group mb-3">
          <li class="list-group-item"> <img src=" ${user.avatar}" class="image-styles"/></li>
          <li class="list-group-item" > ${user.first_name} ${user.last_name}</li>
        <li class="list-group-item">${user.email}</li>
          </ul>
          </div>
         
        `
            });
            document.getElementById('output').innerHTML = output;
        })
        .catch(error => console.log("Request failed", error))

}

document.getElementById('getUsers').addEventListener('click', getUsers);