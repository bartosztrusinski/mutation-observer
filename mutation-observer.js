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

const observer = new MutationObserver((mutations) => {});

button.addEventListener('click', async () => {
  const posts = await loadPosts();
  renderPosts(posts);
});

async function loadPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  const postsToLoad = Math.floor(Math.random() * 10) + 3;
  console.log(postsToLoad);

  const startIndex = Math.min(
    Math.floor(Math.random() * data.length),
    data.length - postsToLoad
  );
  const posts = data.slice(startIndex, startIndex + postsToLoad);

  return posts;
}

function renderPosts(posts) {
  const postElements = posts.map((post) => {
    return `
      <article style="background-color: ${
        backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
      }">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      </article>
    `;
  });

  postsContainer.innerHTML += postElements.join('');
}
