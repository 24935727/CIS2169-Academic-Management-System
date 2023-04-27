academicForm = document.querySelector('.academicForm')

const createPost = async (e) => {
    e.preventDefault();
  
    const academicPost = {
      "name" : academicForm.academicName.value,
      "field-of-study": academicForm.fieldOfStudy.value,
      "modules-covered": academicForm.modulesCovered.value
    }
    await fetch('http://localhost:3000/academic', {
      method: 'POST',
      body: JSON.stringify(academicPost),
      headers: {'content-type': 'application/json'}
    });
  }

  academicForm.addEventListener('submit', createPost);