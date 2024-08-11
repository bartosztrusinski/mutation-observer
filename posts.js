import intersectionObserver from './intersection-observer.js';

const postsContainer = document.querySelector('.posts');
const button = document.querySelector('button');
const backgroundColors = [
  '#229954',
  '#3498db',
  '#8e44ad',
  '#48c9b0',
  '#e67e22',
  '#ff69b4',
  '#e74c3c',
];

button.addEventListener('click', async () => {
  const posts = await loadPosts();
  renderPosts(posts);
});

async function loadPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  const postsToLoad = Math.floor(Math.random() * 8) + 3;
  const startIndex = Math.min(
    Math.floor(Math.random() * data.length),
    data.length - postsToLoad
  );
  const posts = data.slice(startIndex, startIndex + postsToLoad);

  return posts;
}

function renderPosts(posts) {
  const postElements = posts.map((post) => {
    const article = document.createElement('article');
    const hideButton = document.createElement('button');

    article.style.backgroundColor =
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    intersectionObserver.observe(article);

    article.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      `;

    hideButton.textContent = 'Hide';
    hideButton.addEventListener('click', () => {
      article.classList.remove('visible');
      setTimeout(() => article.remove(), 180);
    });

    article.append(hideButton);

    return article;
  });

  postsContainer.append(...postElements);
  document.body.scrollIntoView({ behavior: 'smooth' });
}
