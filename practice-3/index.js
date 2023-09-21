const sortTable = (columnIndex) => {
  const rows = Array.from(tableBody.querySelectorAll('tr'));

  rows.sort((rowA, rowB) => {
    const cellA = rowA.querySelectorAll('td')[columnIndex].textContent;
    const cellB = rowB.querySelectorAll('td')[columnIndex].textContent;
    return cellA.localeCompare(cellB);
  });

  tableBody.innerHTML = '';
  rows.forEach(row => {
    tableBody.appendChild(row);
  });
};

const tableCells = document.querySelectorAll('th');

tableCells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    sortTable(index);
  });
});
