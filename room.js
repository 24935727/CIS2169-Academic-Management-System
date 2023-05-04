const room_form = document.getElementById('room_form');
const building_select = document.getElementById('building_select');
const render_room = async () => {
  const request = await fetch('http://localhost:80/building');
  const response = await request.json();
  let template = "";
  response.forEach(response => {
    template += `
    <option value="${response.building}">${response.building}</option>
    `
  })
    

  building_select.insertAdjacentHTML('beforeend', template);
}

const createPost = async (e) => {
  e.preventDefault();


  const post = {
    "room" : room_form.create_room.value,
    "building": room_form.building_select.value,
  }

  await fetch('http://localhost:80/room', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {'content-type': 'application/json'}
  });
}
room_form.addEventListener('submit', createPost)
render_room();