const postsContainer = document.querySelector('.posts');
const countEl = document.querySelector('.count');

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.removedNodes.length > 0) {
      const removedPostsCount = [...mutation.removedNodes].filter(
        (node) => node.nodeName === 'ARTICLE'
      ).length;

      if (removedPostsCount > 0) {
        const currentPostsCount = Number(countEl.textContent);
        countEl.textContent = currentPostsCount - removedPostsCount;
      }
    }

    if (mutation.addedNodes.length > 0) {
      const newPostsCount = [...mutation.addedNodes].filter(
        (node) => node.nodeName === 'ARTICLE'
      ).length;

      if (newPostsCount > 0) {
        const currentPostsCount = Number(countEl.textContent);
        countEl.textContent = currentPostsCount + newPostsCount;
      }
    }
  }
});

observer.observe(postsContainer, { childList: true });
