function fetch() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      const table = document.createElement('table');
      const tableHeader = document.createElement('thead');
      const tableBody = document.createElement('tbody');

      const headerRow = document.createElement('tr');
      for (let key in data[0]) {
        const headerCell = document.createElement('th');
        headerCell.textContent = key;
        headerRow.appendChild(headerCell);
      }
    
      tableHeader.appendChild(headerRow);
      table.appendChild(tableHeader);

      data.forEach(post => {
        const row = document.createElement('tr');
        for (let key in post) {
          const cell = document.createElement('td');
         cell.textContent = post[key];
          row.appendChild(cell);
        }
        tableBody.appendChild(row);
      });

      table.appendChild(tableBody);
      document.body.appendChild(table)
    })
    .catch(error => console.log(error));
}

fetch();