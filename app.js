//  Manipulating the DOM exercise.
//  Exercise programmatically builds navigation,
//  scrolls to anchors from navigation,
//  and highlights section in viewport upon scrolling.

//  Dependencies: None

//  JS Version: ES2015/ES6

//  JS Standard: ESli

//  Comments should be present at the beginning of each procedure and class.
//  Great to have comments before crucial code sections within the procedure.

//  Define Global Variables

const section = document.querySelectorAll("section");

//  End Global Variables
//
//
//
//

//  Begin Main Functions

// build the nav

const ul = document.querySelector(".navbar__menu");

for (let i = 1; i <= section.length; i++) {
  const listItem = document.createElement("li");

  listItem.innerHTML = `<a  href = '#' data-sec = 'section ${i}'> section ${i} </a>`;

  ul.appendChild(listItem);
}

// Add class 'active' to section when near top of viewport
// plus Add an active state to navigation items when a section is in the viewport.

function scroll() {
  section.forEach((section) => {
    const DOMRect = section.getBoundingClientRect();
    if (DOMRect.top <= 200 && DOMRect.bottom >= 400) {
      section.classList.add("your-active-class");
      const sectionID = section.id;
      const activeList = document.querySelector(`[data-sec = '${sectionID}' ]`);
      activeList.parentElement.classList.add("active-nav");
    } else {
      section.classList.remove("your-active-class");
      const sectionID = section.id;
      const activeList = document.querySelector(`[data-sec = '${sectionID}' ]`);
      activeList.parentElement.classList.remove("active-nav");
    }
  });
}
document.addEventListener("scroll", scroll);

// Scroll to anchor ID using scrollTO event

const li = document.querySelectorAll("a");

li.forEach((li) => {
  li.addEventListener("click", function (evt) {
    evt.preventDefault();
    document.getElementById(`${evt.target.dataset.sec}`).scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  });
});

// Add a scroll to top button that’s only visible when the user scrolls below the fold of the page.
const scollToTop = document.querySelector(".to-top");
const firstSec = document.querySelector("section[id = 'section 1']");
const button = document.querySelector("button");
// visibility
function toTop() {
  if (firstSec.getBoundingClientRect().bottom < 300) {
    button.classList.add("active");
    button.classList.remove("non-active");
  } else {
    button.classList.add("non-active");
    button.classList.remove("active");
  }
}
// scrolling to top
document.addEventListener("scroll", toTop);
button.addEventListener("click", function (evt) {
  evt.preventDefault();
  scollToTop.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest",
  });
});

// Hide fixed navigation bar while not scrolling (it should still be present on page load).
const header = document.querySelector(".page__header");
let scrolling = false;
document.addEventListener("scroll", () => {
  if (scrolling) {
    clearTimeout(scrolling);
    header.classList.remove("hidden-nav");
  }
  scrolling = setTimeout(() => {
    header.classList.add("hidden-nav");
  }, 3000);
});
