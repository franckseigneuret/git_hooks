import __settings from "onp:helpers/settings";
import throttle from "onp:helpers/throttle";

// See: https://codepen.io/desandro/pen/ZXEGVq
Flickity.prototype._createResizeClass = function () {
  this.element.classList.add("flickity-resize");
};

// TODO : ceci devrait remonter

Flickity.createMethods.push("_createResizeClass");

var resize = Flickity.prototype.resize;

Flickity.prototype.resize = function () {
  this.element.classList.remove("flickity-resize");
  resize.call(this);
  this.element.classList.add("flickity-resize");
};

/** @param {HTMLElement} el */
const multiBlocs = (el) => {
  //var declarations
  let slider = null,
    itemsContainer = el.querySelector(".free-module-multi-blocs__track"),
    items = itemsContainer.querySelectorAll(".free-module-multi-blocs__slide"),
    itemsLength = items.length,
    navButtons = el.querySelectorAll(".free-module-multi-blocs__nav"),
    navPrev = el.querySelector(".free-module-multi-blocs__nav-prev"),
    navNext = el.querySelector(".free-module-multi-blocs__nav-next"),
    dotsContainer = null,
    pageDotsLength = 0;

  console.log(items.length);

  const navPrevNextResizeHandler = throttle(() => {
    slider.resize();

    pageDotsLength = itemsContainer.querySelectorAll(".dot").length;

    if (pageDotsLength > 1) {
      slider.options.draggable = true;
      slider.updateDraggable();

      showDots();

      if (__settings.get("isXLargeDesktop")) {
        showNavPrevNext();
      } else {
        hideNavPrevNext();
      }
    } else {
      slider.options.draggable = false;
      slider.updateDraggable();

      hideDots();
      hideNavPrevNext();
    }
  }, 500);

  //init
  init();

  function init() {
    if (items.length > 4 || (items.length > 1 && window.innerWidth <= 968)) {
      initSlider();
      initEvents();
    }
  }

  function initSlider() {
    slider = new Flickity(itemsContainer, {
      watchCSS: false,
      cellAlign: "left",
      imagesLoaded: false,
      cellSelector: ".free-module-multi-blocs__slide",
      setGallerySize: true, //Sets the height of the carousel to the height of the tallest cell. If false, size the carousel with CSS, rather than using the size of cells.
      prevNextButtons: false, //Using custom prev/next navigation
      pageDots: true,
      percentPosition: false,
      freeScroll: false,
      groupCells: true,
      contain: true,
      wrapAround: false,
      on: {
        ready: function () {
          pageDotsLength = itemsContainer.querySelectorAll(".dot").length;
          dotsContainer = itemsContainer.querySelector(".flickity-page-dots");

          hideDots();

          addClassSwitcher();

          if (pageDotsLength > 1) {
            showDots();

            if (__settings.get("isXLargeDesktop")) {
              showNavPrevNext();
            }
          }
        },
        // https://github.com/metafizzy/flickity/issues/740
        dragStart: function () {
          document.ontouchmove = (e) => e.preventDefault();
        },
        dragEnd: function () {
          document.ontouchmove = () => true;
        },
      },
    });
    [...items].map((item) => (item.style.minHeight = "100%"));
  }

  function initEvents() {
    navPrev.addEventListener("click", navigatePrev, false);
    navNext.addEventListener("click", navigateNext, false);
    window.addEventListener("resize", navPrevNextResizeHandler);

    slider &&
      slider.on("settle", function (index) {
        if (index === 0) {
          navPrev.disabled = true;
          navNext.disabled = false;
        } else if (index + 1 === pageDotsLength) {
          navPrev.disabled = false;
          navNext.disabled = true;
        } else {
          navPrev.disabled = false;
          navNext.disabled = false;
        }
      });
  }

  function addClassSwitcher() {
    switch (itemsLength) {
      case 1:
        itemsContainer.classList.add("one-item");
        break;
      case 2:
        itemsContainer.classList.add("two-items");
        break;
      case 3:
        itemsContainer.classList.add("three-items");
        break;
    }
  }

  function showNavPrevNext() {
    [...navButtons].map((button) => button.classList.remove("hide"));
  }

  function hideNavPrevNext() {
    [...navButtons].map((button) => button.classList.add("hide"));
  }

  function showDots() {
    dotsContainer.classList.remove("hide-dots");
  }

  function hideDots() {
    dotsContainer.classList.add("hide-dots");
  }

  function navigatePrev() {
    slider.previous(false, false);
    console.log("prev");
  }

  function navigateNext() {
    slider.next(false, false);
    console.log("next");
  }
};
// FIXME: finir ce travail
export default multiBlocs;
