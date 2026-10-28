/* ================================
   ARTICLES CAROUSEL (AUTOPLAY)
================================ */
window.addEventListener("load", () => {
  const track = document.getElementById("articlesTrack");
  if (!track) return;

  const gap = 20;
  const originalCards = Array.from(track.children);
  let currentIndex = 1;

  // Create clones
  const firstClone = originalCards[0].cloneNode(true);
  const lastClone = originalCards[originalCards.length - 1].cloneNode(true);

  track.insertBefore(lastClone, originalCards[0]);
  track.appendChild(firstClone);

  const slides = Array.from(track.children);

  function getCardWidth() {
    return slides[0].offsetWidth + gap;
  }

  function moveCarousel(transition = true) {
    track.style.transition = transition ? "transform 0.6s ease" : "none";
    track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
  }

  // Initial position
  moveCarousel(false);

  // AUTOPLAY (ALWAYS ON)
  setInterval(() => {
    currentIndex++;
    moveCarousel();
  }, 4000);

  // Infinite loop fix
  track.addEventListener("transitionend", () => {
    if (currentIndex === slides.length - 1) {
      currentIndex = 1;
      moveCarousel(false);
    }

    if (currentIndex === 0) {
      currentIndex = slides.length - 2;
      moveCarousel(false);
    }
  });
});


/* ================================
   MAN SLIDER (TABS + SWIPE)
================================ */
const manTabs = document.querySelectorAll(".ts-tab");
const manContents = document.querySelectorAll(".ts-content");
const manSlider = document.querySelector(".man-slider");

let startX = 0;

// Tabs click
manTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    manTabs.forEach(t => t.classList.remove("active"));
    manContents.forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab)?.classList.add("active");
  });
});

// Swipe support
if (manSlider) {
  manSlider.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  manSlider.addEventListener("touchend", e => {
    const endX = e.changedTouches[0].clientX;
    const activeIndex = [...manTabs].findIndex(tab =>
      tab.classList.contains("active")
    );

    if (startX - endX > 50 && activeIndex < manTabs.length - 1) {
      manTabs[activeIndex + 1].click();
    }

    if (endX - startX > 50 && activeIndex > 0) {
      manTabs[activeIndex - 1].click();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");
  const video = document.querySelector(".mockup video");
  const source = video.querySelector("source");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      // remove active
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      // activate clicked tab + content
      tab.classList.add("active");
      const target = tab.dataset.tab;
      document.getElementById(target).classList.add("active");

      // 🎬 CHANGE VIDEO
      if(target === "postcards"){
        source.src = "postcards.mp4";
      }
      if(target === "slides"){
        source.src = "slides.mp4";
      }
      if(target === "startup"){
        source.src = "startup.mp4";
      }

      video.load(); // reload video
      video.play(); // autoplay again
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      const answer = faqItem.querySelector(".faq-answer");

      // toggle active class
      faqItem.classList.toggle("active");

      // show / hide answer
      if (faqItem.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = null;
      }
    });
  });
});

// navbar scroll
window.addEventListener("scroll", function () {
    let navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

