var form = document.getElementById("form");

function addNewField() {
    var title = document.createElement("label");
    var titleInput  = document.createElement("input");
    var number = document.createElement("label");
    var numberInput  = document.createElement("input");
  
    var volume = document.createElement("label");
    var volumeInput  = document.createElement("input");
    var weighting = document.createElement("label");
    var weightingInput  = document.createElement("input");
    var addLO = document.createElement("button");
  
    title.textContent = "Title";
    titleInput.type = "text";
    titleInput.setAttribute('name', 'title');
  
    number.textContent = "Number";
    numberInput.type = "number";
    numberInput.setAttribute('name', 'number');
  
  
    volume.textContent = "Volume";
    volumeInput.type = "text";
    volumeInput.setAttribute('name', 'volume');
    
    weighting.textContent = "Weighting";
    weightingInput.type = "number";
    weightingInput.setAttribute('name', 'weighting');
  
    addLO.type = "button";
    addLO.textContent = "Add a learning outcome";
    addLO.setAttribute('onclick', 'addLO()')
  
    form.appendChild(title);
    form.appendChild(titleInput);
    form.appendChild(number);
    form.appendChild(numberInput);
    form.appendChild(volume);
    form.appendChild(volumeInput);
    form.appendChild(weighting);
    form.appendChild(weightingInput);
    form.appendChild(addLO);
  
  }
  
  
  
  
  function addLO(){
      var LO = document.createElement("label");
      var LOInput  = document.createElement("input");
      LO.textContent = "Learning Outcomes";
      LOInput.type = "text";
      LOInput.setAttribute('name', 'LO');
      form.appendChild(LO);
      form.appendChild(LOInput);
  }
  
  
  const submitBtn = document.getElementById('submitBtn');
  
  submitBtn.addEventListener('click',function(){
    // e.preventDefault();
    const moduleID = document.getElementsByName('moduleIDCode')[0].value;
    const moduleName = document.getElementsByName('moduleName')[0].value;
    const hours = document.getElementsByName('hours')[0].value;
    const credits = document.getElementsByName('credits')[0].value;
    const title = document.getElementsByName('title')[0].value;
    const number = document.getElementsByName('number')[0].value;
    const volume = document.getElementsByName('volume')[0].value;
    const weighting = document.getElementsByName('weighting')[0].value;
    const LO = document.getElementsByName('LO')[0].value;
    const newData = {
      ModuleID: moduleID,
      ModuleName: moduleName,
      Number_Of_Hours: hours,
      Credits: credits,
      Assignment:{
        Title: title,
        Number: number,
        Volume: volume,
        Weighting: weighting,
        Learning_Outcomes: LO
      }
    };
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'test.json', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log('Data added successfully');
        console.log(newData);
      }
    }
  
    xhr.send(JSON.stringify(newData));
  })