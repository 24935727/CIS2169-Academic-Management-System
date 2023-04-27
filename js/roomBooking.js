const form = document.getElementById("moduleForm");
const container = document.getElementById('roomNumber');
const moduleContainer = document.getElementById('moduleName');
const academicContainer = document.getElementById('academicSelect');

const renderModule = async () => {
    let uri = 'http://localhost:3000/module'
    response = await fetch(uri);
    const posts = await response.json();
  let template = '';
  posts.forEach(post =>{
    
    
    
    template += `
    <option value="${post.name}">${post.name}</option>
    `
  })
  moduleContainer.innerHTML = template;
}
const renderRooms = async () => {

  const response = await fetch('http://localhost:3000/room');
  const posts = await response.json();
  let i = 0;
  let template = '';
  posts.forEach(post => {
    i++
    template += `
    <option value="room ${i}">${post.number}</option>
    `
  })
  container.innerHTML = template;
};
const renderAcademics = async () => {

  const response = await fetch('http://localhost:3000/academic');
  const posts = await response.json();
  let i = 0;
  let template = '';
  posts.forEach(post => {
    i++
    template += `
    <option value="${post.name}" ${i}">${post.name}</option>
    `
  })
  academicContainer.innerHTML = template;
};

window.addEventListener('DOMContentLoaded', () => renderModule(), renderRooms(), renderAcademics());


  const createPost = async (e) => {
    e.preventDefault();
  
    const roomBookingPost = {
      "module-name" : form.moduleSelect.value,
      "room": form.academicSelect.value,
      "academic-name": form.academicSelect.value,
      "timeslot": form.timeslot.value
      
    }
    await fetch('http://localhost:3000/room-booking', {
      method: 'POST',
      body: JSON.stringify(roomBookingPost),
      headers: {'content-type': 'application/json'}
    });
  }
  
  form.addEventListener('submit', createPost);