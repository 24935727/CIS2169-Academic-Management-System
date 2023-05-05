// Getting the elements from the html page
const create_module = document.getElementById('create_module');
const module_table = document.getElementById('module_table');
const add_assessment = document.getElementById('add_assessment');
const assessment_container = document.getElementById('assessment_container');
const submit = document.getElementById('submit');
const module_form = document.getElementById('module_form');

const addRow = async () => {
  // Get request made to module endpoint
  const request = await fetch('http://localhost:80/module');
  const response = await request.json();
  let template = "";
  response.forEach(response => {
    // Template for the HTMl to be inserted into the table
    template += `
    
    <tr>
    <td>${response.course}</td>
    <td>${response.name}</td>
    <td>${response.module_code}</td>
    <td>${response.number_of_hours}</td>
    </tr>
    `
  })
  module_table.insertAdjacentHTML('beforeend', template);
}
// event listener that waits for a button to be clicked which then creates the inputs for the module form
create_module.addEventListener('click', () => {
  let template = "";
    template += `
    <div class="row">
    <div class="col-md-6">
      <div class="mb-3">
        <label class="form-label">Course</label>
        <input type="text" name="course" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Module name</label>
        <input type="text" name="module_name" class="form-control">
      </div>
    </div>
    <div class="col-md-6">
      <div class="mb-3">
        <label class="form-label">Module code</label>
        <input type="text" name="module_code" class="form-control">
      </div>
      <div class="mb-3">
        <label class="form-label">Number of hours</label>
        <input type="text" name="number_of_hours" class="form-control">
      </div>
    </div>
  </div>
    `
    module_form.insertAdjacentHTML('afterbegin', template);
    // adds the class list hidden to change the display type to none of the elements.
    create_module.classList.add('hidden');
    add_assessment.classList.remove('hidden');
    submit.classList.remove('hidden');


});
// Event listener that waits for a button to be clicked to ask the user to input the number of assessments are in that module
add_assessment.addEventListener('click', () => {
  const input = prompt("How many assessments would you like to create?");
  // makes the input usuable by other functions
  num_assessments = parseInt(input);
  // Template for creating the html for the inputs
  let template = "";
  for(let i = 0; i < input; i++){

  
    template += `
    <div class="row mb-3">
    <div class="col-md-6">
      <label class="form-label">Assessment</label>
      <input type="text" name="assessment_${i}" class="form-control">
    </div>
    <div class="col-md-6">
      <label class="form-label">Learning Outcome</label>
      <input type="text" name="LO_${i}" class="form-control">
    </div>
  </div>
  <div class="row mb-3">
    <div class="col-md-6">
      <label class="form-label">Volume</label>
      <input type="text" name="volume_${i}" class="form-control">
    </div>
    <div class="col-md-6">
      <label class="form-label">Weighting</label>
      <input type="text" name="weighting_${i}" class="form-control">
    </div>
    <div class="col-md-6">
    <label class="form-label">Submission date</label>
    <input type="date" name="submission_date_${i}" class="form-control">
  </div>
  </div>
    `
  }
    assessment_container.insertAdjacentHTML('afterbegin', template);
    // Class list hidden to hide certain buttons
    create_module.classList.add('hidden');
    add_assessment.classList.remove('hidden');


});



  const createPost = async (e) => {
    e.preventDefault();

    // Post object that will be stored in the json file
    const post = {
      "course" : module_form.course.value,
      "name": module_form.module_name.value,
      "module_code": module_form.module_code.value,
      "number_of_hours": module_form.number_of_hours.value,
      "assessment": [],
      "learning_outcomes": [],
      "volume": [],
      "weighting" : [],
      "submission_date" : []

    }
    // Takes the integer from the prompt earlier and then loops through pushing the data in each input into the array in the post object
    for (let i = 0; i < num_assessments; i++) {
      post["assessment"].push(module_form[`assessment_${i}`].value);
      post["learning_outcomes"].push(module_form[`LO_${i}`].value);
      post["volume"].push(module_form[`volume_${i}`].value);
      post["weighting"].push(module_form[`weighting_${i}`].value);
      post["submission_date"].push(module_form[`submission_date_${i}`].value);
  
    }
    // Post request to the module endpoint
    await fetch('http://localhost:80/module', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {'content-type': 'application/json'}
    });
  }
module_form.addEventListener('submit', createPost)
addRow();