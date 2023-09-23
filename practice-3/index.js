const table = document.getElementById("table");
const input = document.getElementById("searchInput");
const tr = table.getElementsByTagName("tr");

const sortTable = (column) => {
  let switching = true;

  while (switching) {
    switching = false;
    let shouldSwitch = false;
    let index;
    let rows = table.getElementsByTagName("tr");
    
    for (let i = 1; i < (rows.length - 1); i += 1) {
      index = i;
      let x = rows[i].getElementsByTagName("td")[column];
      let y = rows[i + 1].getElementsByTagName("td")[column];
      let xValue = x.innerHTML.toLowerCase();
      let yValue = y.innerHTML.toLowerCase();
      let shouldSwitchAscending = false;
      
      if (!isNaN(xValue) && !isNaN(yValue)) {
        shouldSwitchAscending = parseInt(xValue) > parseInt(yValue);
      } else {
        shouldSwitchAscending = xValue > yValue;
      }
      
      if (shouldSwitchAscending) {
        shouldSwitch = true;
        break;
      }
    }
    
    if (shouldSwitch) {
      rows[index].parentNode.insertBefore(rows[index + 1], rows[index]);
      switching = true;
    }
  }
};

const thElements = document.querySelectorAll('tr th');
thElements.forEach((el, index) => {
  el.addEventListener('click', () => {
    sortTable(index);
  })
})

const populateTable = (data) => {
  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  
  for (let i = 0; i < data.length; i += 1) {
    let row = tableBody.insertRow();
    const { userId, id, title, body } = data[i];
    row.insertCell().innerHTML = userId;
    row.insertCell().innerHTML = id;
    row.insertCell().innerHTML = title;
    row.insertCell().innerHTML = body;
  }
};

const generateTable = (fillFn) => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => fillFn(data))
    .catch((error) => console.log(error));
};

const filterTable = () => {
  let filter = input.value.toUpperCase();
  
  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td");
    
    for (let j = 0; j < td.length; j++) {
      if (td[j]) {
        let txtValue = td[j].textContent || td[j].innerText;
        
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          break;
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
};

window.onload = function() {
  generateTable(populateTable);
  
  var searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", filterTable);
};
