const ServicesCarousel = (() => {

  let flickity

  const initializeFlickity = () => {
    flickity = new Flickity( '.js-services-carousel', {
      prevNextButtons: false,
      pageDots: false
    })
  }

  const initializePages = () => {
    const pages = document.querySelectorAll('.js-services-carousel-page')

    pages.forEach((page) => {
      page.addEventListener('click', () => {
        const index = Array.prototype.indexOf.call(page.parentElement.children, page)
        flickity.select(index)

        pages.forEach((page) => page.classList.remove('is-active'))
        page.classList.add('is-active')
      })
    })
  }

  const init = () => {
    initializeFlickity()
    initializePages()
  }

  return {
    init
  }

})()
