const moduleDropdown = document.querySelector('.moduleSelect');

const renderPosts = async () => {
  let uri = 'http://localhost:80/room';

  const response = await fetch(uri);
  const posts = await response.json();

  console.log(posts);
  let template = '';
  posts.forEach(post => {
    template += `
    <option value="option1">${post.course}</option>
    `
  })
  moduleDropdown.innerHTML = template;
};

window.addEventListener('DOMContentLoaded', () => renderPosts())