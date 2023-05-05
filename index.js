// This would be user specific but would require the logged in user to be stored in a session
const module_table = doucment.getElementById('module_table');
const module_form = document.getElementById('module_form');
// Function to add a row to the table 
const addRow = async () => {
    // sending a get request to the module endpoint
    const request = await fetch('http://localhost:80/module');
    const response = await request.json();
    let template = "";
    response.forEach(response => {
      template += `
      <tr>
      <td>${response.course}</td>
      <td>${response.name}</td>
      <td>${response.module_code}</td>
      <td>${response.number_of_hours}</td>
      </tr>
      `
    })
    // Adding the html with the data from the json file to the table
    module_table.insertAdjacentHTML('beforeend', template);
  }