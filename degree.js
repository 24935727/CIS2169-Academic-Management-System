
// Getting the elements from the html file
const create_degree = document.getElementById("create_degree");
const degree_form = document.getElementById("degree_form");
const create_LO= document.getElementById("create_LO");
const LO_container = document.getElementById("LO_container");
// Add rows to the table with data from the json file
  const addRow = async () => {
    // get request to the degree endpoint
    const request = await fetch('http://localhost:80/degree');
    const response = await request.json();
    let template = "";
    response.forEach(response => {
      template += `
      <tr>
      <td>${response.name}</td>
      <td>${response.degree_code}</td>
      <td>${response.learning_outcomes}</td>
      </tr>
      `
    })
    degree_table.insertAdjacentHTML('afterbegin', template);
    }
create_LO.addEventListener('click', () => { 
    let input = prompt("Please enter the number of learning outcomes for this degree.");
    // Makes the integer from input usable in other functions
    num_LO = parseInt(input);
    let template = '';
    for(let i = 0; i< input; i++){
      template += `
      <label class="form-label">Learning Outcome ${i+1}</label>
      <input type="text" name="LO${i+1}" class="form-control">
      `
      LO_container.insertAdjacentHTML('afterbegin', template);
    };
});
create_degree.addEventListener('click', () => {
  // Adds hidden class from the style sheet
  degree_form.classList.remove('hidden');
  create_degree.classList.add('hidden');
})

const createPost = async (e) => {
    e.preventDefault();
    // Post object that holds the data of the inputs from the form
    const post = {
        "name": degree_form.degree_name.value,
        "degree_code" : degree_form.degree_code.value,
        "learning_outcomes": []
    }
    // takes the number of learning outcomes which then get pushed into the object's learning outcomes array
    for (let i = 0; i < num_LO; i++) {
        post["learning_outcomes"].push(degree_form[`LO${i+1}`].value);
      }
      // Post request to the degree endpoint
    await fetch('http://localhost:80/degree', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {'content-type': 'application/json'}
    });
  
  }
  addRow();

  degree_form.addEventListener('submit', createPost);