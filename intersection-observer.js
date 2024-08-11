const posts = document.querySelectorAll('.post > article');

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });
  },
  { threshold: 0.5 }
);

posts.forEach((post) => intersectionObserver.observe(post));

export default intersectionObserver;
