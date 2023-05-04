const create_module = document.getElementById('create_module');
const module_table = document.getElementById('module_table');
const add_assessment = document.getElementById('add_assessment');
const assessment_container = document.getElementById('assessment_container');
const submit = document.getElementById('submit');
const addRow = async () => {
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
  module_table.insertAdjacentHTML('beforeend', template);
}
const module_form = document.getElementById('module_form');
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
    create_module.classList.add('hidden');
    add_assessment.classList.remove('hidden');
    submit.classList.remove('hidden');


});
add_assessment.addEventListener('click', () => {
  const input = prompt("How many assessments would you like to create?")
  num_assessments = parseInt(input);
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
    create_module.classList.add('hidden');
    add_assessment.classList.remove('hidden');


});



  const createPost = async (e) => {
    e.preventDefault();


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
    for (let i = 0; i < num_assessments; i++) {
      post["assessment"].push(module_form[`assessment_${i}`].value);
      post["learning_outcomes"].push(module_form[`LO_${i}`].value);
      post["volume"].push(module_form[`volume_${i}`].value);
      post["weighting"].push(module_form[`weighting_${i}`].value);
      post["submission_date"].push(module_form[`submission_date_${i}`].value);
  
    }

    await fetch('http://localhost:80/module', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {'content-type': 'application/json'}
    });
  }
module_form.addEventListener('submit', createPost)
addRow();