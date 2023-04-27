const createDegreeBtn = document.getElementById("createDegree");
const container = document.getElementById("learningOutcomes");
const degreeForm = document.getElementById("degreeForm")

let userInput = prompt("Please enter the number of learning outcomes for this degree.");

function createLO(){ 
    let template = '';
    for(let i = 0; i< userInput; i++){
      template += `
      <label class="label">Learning Outcome ${i+1}</label>
      <input type="text" name="LO${i+1}" class="input">
      `
      container.innerHTML = template;
    };
}

createLO(userInput);
const createPost = async (e) => {
    e.preventDefault();
  
    const degreePost = {
        "name": degreeForm.degreeName.value,
        "degreeCode" : degreeForm.degreeCode.value,
        "learning-outcomes": []
    }
    for (let i = 0; i < userInput; i++) {
        degreePost["learning-outcomes"].push(degreeForm[`LO${i+1}`].value);
      }
    console.log(degreePost);
    await fetch('http://localhost:3000/degree', {
      method: 'POST',
      body: JSON.stringify(degreePost),
      headers: {'content-type': 'application/json'}
    });
  
  }

  degreeForm.addEventListener('submit', createPost);