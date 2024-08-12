const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const isSmall = entry.borderBoxSize[0].inlineSize < 430;
    entry.target.classList.toggle('small', isSmall);
  });
});

export default resizeObserver;
