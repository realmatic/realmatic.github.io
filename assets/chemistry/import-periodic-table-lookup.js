const dropdown = document.getElementById('chemElements');
dropdown.innerHTML = '';

//todo, function to build dropdown select

fetch('/assets/chemistry/periodic-table-lookup.json')
  .then((response) => response.json())
  .then((data) => {
    data.forEach(ce => {
      dropdown.innerHTML += ce.name + ' ';
    });
    //console.log(dropdown.innerHTML)
  })
  .catch((error) => {
    console.error('Error Fetching JSON File:', error);
  });

