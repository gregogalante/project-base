const ServicesCarousel = (() => {

  let flickity

  const initializeFlickity = () => {
    flickity = new Flickity( '.js-services-carousel', {
      prevNextButtons: false,
      pageDots: false,
      wrapAround: true,
      adaptiveHeight: true
    })
  }

  const initializePages = () => {
    const pages = document.querySelectorAll('.js-services-carousel-page')

    pages.forEach((page) => {
      page.addEventListener('click', () => {
        const index = Array.prototype.indexOf.call(page.parentElement.children, page)
        flickity.select(index)

        pages.forEach((page) => page.classList.remove('is-selected'))
        page.classList.add('is-selected')
      })
    })
    
    flickity.on('change', (slide) => {
        pages.forEach((page) => page.classList.remove('is-selected'))
        pages[slide].classList.add('is-selected')
    })
  }

  const initializeNext = () => {
    const nexts = document.querySelectorAll('.js-services-carousel-next')

    nexts.forEach((next) => {
      next.addEventListener('click', (e) => {
        e.preventDefault()

        flickity.next()
      })
    })
  }

  const init = () => {
    initializeFlickity()
    initializePages()
    initializeNext()
  }

  return {
    init
  }

})()
