const Scroll = (() => {

  const init = () => {
    const scroll = new SmoothScroll('a[href*="#"]', {
      offset: () => {
        const viewportWidth = window.innerWidth || document.documentElement.clientWidth
        return viewportWidth >= 980 ? 0 : 50
      }
    })
  }

  return {
    init
  }

})()
