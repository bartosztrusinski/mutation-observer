const postsContainer = document.querySelector('.posts');
const button = document.querySelector('button');
const countEl = document.querySelector('.count');
const backgroundColors = [
  '#229954',
  '#3498db',
  '#8e44ad',
  '#48c9b0',
  '#e67e22',
  '#ff69b4',
  '#e74c3c',
];

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.addedNodes.length === 0) continue;

    const newPostsCount = [...mutation.addedNodes].filter(
      (node) => node.nodeName === 'ARTICLE'
    ).length;

    if (newPostsCount === 0) continue;

    const currentPostsCount = Number(countEl.textContent);
    countEl.textContent = currentPostsCount + newPostsCount;
  }
});

observer.observe(postsContainer, {
  childList: true,
});

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
    article.style.backgroundColor =
      backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    article.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.body}</p>
    `;

    return article;
  });

  postsContainer.append(...postElements);
}
