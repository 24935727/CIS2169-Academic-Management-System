const form = document.getElementById('registration_form');
const createPost = async (e) => {
  e.preventDefault();


  const post = {
    "name" : form.name.value,
    "email": form.email.value,
    "password" : form.password.value,
    "field_of_study" : form.field_of_study.value
  }

  await fetch('http://localhost:80/users', {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {'content-type': 'application/json'}
  });
}

form.addEventListener('submit', createPost);
