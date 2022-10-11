export const dom = {
  scrollToTop: (xCoord = 0, yCoord = 0) => {
    window.scrollTo(
      {
        top: xCoord,
        left: yCoord,
        behavior: 'smooth'
      }
    );
  }
}
