'use strict';

/* global m */

// Resource list
var db = {};

m.request('db').then(function (data) {
  db = data;
});

m.mount(document.getElementById('resources'), {
  view: function view() {
    var keys = Object.keys(db);
    var resourceList = m('ul', keys.map(function (key) {
      return m('li', [m('a', { href: key }, '/' + key), m('sup', Array.isArray(db[key]) ? ' ' + db[key].length + 'x' : ' object')]);
    }).concat([m('a', { href: 'db' }, '/db'), m('sup', m('em', ' state'))]));

    return [m('h4', 'Resources'), keys.length ? resourceList : m('p', 'No resources found')];
  }
});

// Custom routes
var customRoutes = {};

m.request('__rules').then(function (data) {
  customRoutes = data;
});

m.mount(document.getElementById('custom-routes'), {
  view: function view() {
    var rules = Object.keys(customRoutes);
    if (rules.length) {
      return [m('h4', 'Custom routes'), m('table', rules.map(function (rule) {
        return m('tr', [m('td', rule), m('td', '⇢ ' + customRoutes[rule])]);
      }))];
    }
  }
});

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
    await fetch('http://localhost:80/degree', {
      method: 'POST',
      body: JSON.stringify(degreePost),
      headers: {'content-type': 'application/json'}
    });
  
  }

  degreeForm.addEventListener('submit', createPost);