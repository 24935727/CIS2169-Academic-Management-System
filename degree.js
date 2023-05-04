

const create_degree = document.getElementById("create_degree");
const degree_form = document.getElementById("degree_form");
const create_LO= document.getElementById("create_LO");
const LO_container = document.getElementById("LO_container");

  const addRow = async () => {
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
  degree_form.classList.remove('hidden');
  create_degree.classList.add('hidden');
})

const createPost = async (e) => {
    e.preventDefault();
  
    const post = {
        "name": degree_form.degree_name.value,
        "degree_code" : degree_form.degree_code.value,
        "learning_outcomes": []
    }
    for (let i = 0; i < num_LO; i++) {
        post["learning_outcomes"].push(degree_form[`LO${i+1}`].value);
      }
    console.log(post);
    await fetch('http://localhost:80/degree', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {'content-type': 'application/json'}
    });
  
  }
  addRow();

  degree_form.addEventListener('submit', createPost);