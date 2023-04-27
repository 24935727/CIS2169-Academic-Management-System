// CREATE FUNCTION THAT INCREMENTS THE FOR THE NUMBER OF LEARNING OBJECTS WHEN TRYING TO POST AND CREATE AN ARRAY THAT YOU WILL PASS INTO IT  
// EVERY TIME THE BUTTON IS CLICKED MAKE A NEW JAVASCRIPT POST VARIABLE THAT INCREMENTS WITH IT

const container = document.querySelector('.module');
const form = document.getElementById("moduleForm");
const formTemplate = document.getElementById("formTemplate");
let userInput = prompt("Please enter the number of learning outcomes for this degree.");

function createTemplate(){ 
  let template = '';
  for(let i = 0; i< userInput; i++){
    template += `
    <label>Learning Outcome ${i}</label>
    <input type="text" name="LO${i}">
    <label>Volume ${i}</label>
    <input type="text" name="volume${i}">
    <label>Weight ${i}</label>
    <input type="text" name="Weight${i}">
    `
    formTemplate.innerHTML = template;
  };
}
createTemplate(userInput);
// const renderPosts = async () => {
//   let uri = 'http://localhost:3000/module';

//   const response = await fetch(uri);
//   const posts = await response.json();
//   console.log(posts);

//   let template = '';
//   posts.forEach(post => {
//     template += `
//     <div class="posts">
//     <h2>${post.course}</h2>
//     </div>
//     `
//   })

//   container.innerHTML = template;
// };

// window.addEventListener('DOMContentLoaded', () => renderPosts())

moduleForm = document.querySelector('.moduleForm');


const createPost = async (e) => {
  e.preventDefault();

  const modulePost = {
    "course": form.module.course,
    "name": form.moduleName.value,
    "module-code": form.moduleCode.value,
    "number-of-hours": form.hours.value,
    "learning-outcomes": [],
    "volume" : [],
    "weight": [],
  }
  for (let i = 0; i < userInput; i++) {
    modulePost["learning-outcomes"].push(moduleForm[`LO${i}`].value);
    modulePost["weight"].push(moduleForm[`LO${i}`].value);
    modulePost["volume"].push(moduleForm[`LO${i}`].value);

  }

  await fetch('http://localhost:80/module', {
    method: 'POST',
    body: JSON.stringify(modulePost),
    headers: { 'content-type': 'application/json' }
  });

}


form.addEventListener('submit', createPost);

