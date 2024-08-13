import intersectionObserver from './intersection-observer.js';
import resizeObserver from './resize-observer.js';

const postsContainer = document.querySelector('.posts');
const countEl = document.querySelector('.count');

const mutationObserver = new MutationObserver((mutations) => {
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
      const newPosts = [...mutation.addedNodes].filter(
        (node) => node.nodeName === 'ARTICLE'
      );

      newPosts.forEach((post) => {
        intersectionObserver.observe(post);
        resizeObserver.observe(post);
      });

      if (newPosts.length > 0) {
        const currentPostsCount = Number(countEl.textContent);
        countEl.textContent = currentPostsCount + newPosts.length;
      }
    }
  }
});

mutationObserver.observe(postsContainer, { childList: true });
