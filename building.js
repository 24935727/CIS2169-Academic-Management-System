const building_form = document.getElementById('building_form');

const createPost = async (e) => {
    e.preventDefault();
  
    const post = {
        "building": building_form.create_building.value
    }
    await fetch('http://localhost:80/building', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {'content-type': 'application/json'}
    });
  
  }

  building_form.addEventListener('submit', createPost);