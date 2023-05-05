// Getting the element from the html file

const building_form = document.getElementById('building_form');

const createPost = async (e) => {
    e.preventDefault();
  
    const post = {
        "building": building_form.create_building.value
    }
    // Creating a post request to the building endpoint
    await fetch('http://localhost:80/building', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {'content-type': 'application/json'}
    });
  
  }
// Event listener for submit on the form
  building_form.addEventListener('submit', createPost);