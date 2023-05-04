const module_select = document.getElementById('module_select');
const user_select = document.getElementById('user_select');
const room_select = document.getElementById('room_select');
const booking_form = document.getElementById('booking_form');
const booked_table = document.getElementById('booked_table');
const addRow = async () => {
  const request = await fetch('http://localhost:80/room-booking');
  const response = await request.json();
  let template = "";
  response.forEach(response => {
    template += `
    <tr>
      <td>${response.room_number}</td>
      <td>${response.module_name}</td>
      <td>${response.time}</td>
    </tr>
    `
  })
  booked_table.insertAdjacentHTML('beforeend', template);
}

const render_module = async () => {
  const request = await fetch('http://localhost:80/module');
  const response = await request.json();
  console.log(response);
  let template = "";
  response.forEach(response => {
    template += `
    <option value="${response.name}">${response.name}</option>
    `
  })

  module_select.insertAdjacentHTML('beforeend', template);
}
const render_user = async () => {
  const request = await fetch('http://localhost:80/users');
  const response = await request.json();
  console.log(response);
  let template = "";
  response.forEach(response => {
    template += `
    <option value="${response.name}">${response.name}</option>
    `
  })

  user_select.insertAdjacentHTML('beforeend', template);
}
const render_room = async () => {
  const request = await fetch('http://localhost:80/room');
  const response = await request.json();
  console.log(response);
  let template = "";
  let building = "";
  response.forEach(response => {
    template += `
    <option value="${response.number}">${response.number}</option>
    `
    building += `
    <option value="${response.building}">${response.building}</option>
    `
  })
  

  room_select.insertAdjacentHTML('beforeend', template);
  building_select.insertAdjacentHTML('beforeend', building);
}

const createPost = async (e) => {
  e.preventDefault();


  const post = {
    "module_name" : booking_form.module_select.value,
    "room_number": booking_form.room_select.value,
    "user" : booking_form.user_select.value,
    "building" : booking_form.building_select.value,
    "time": booking_form.timeslot.value,
  }
  await fetch('http://localhost:80/room-booking', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {'content-type': 'application/json'}
  });
}
booking_form.addEventListener('submit', createPost)
render_module();
render_user();
render_room();
addRow();