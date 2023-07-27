const carouselContainers = document.querySelectorAll(".carousel-container");

carouselContainers.forEach((container) => {
  const slideContainer = container.querySelector(".carousel-slide");
  const slides = container.querySelectorAll(".carousel-slide img");
  const prevButton = container.querySelector(".carousel-prev");
  const nextButton = container.querySelector(".carousel-next");
  const pagination = container.querySelector(".carousel-pagination");

  let currentIndex = 0;
  const slideWidth = slides[0].clientWidth;
  const totalSlides = slides.length;

  function createPaginationButtons() {
    for (let i = 0; i < totalSlides; i++) {
      const button = document.createElement("button");
      button.addEventListener("click", () => goToSlide(i));
      pagination.appendChild(button);
    }
    updatePagination();
  }

  function updatePagination() {
    const paginationButtons = pagination.querySelectorAll("button");
    paginationButtons.forEach((button, index) => {
      button.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlidePosition();
    updatePagination();
  }

  function goToNextSlide() {
    currentIndex++;
    if (currentIndex >= totalSlides) {
      currentIndex = 0;
    }
    updateSlidePosition();
    updatePagination();
  }

  function goToPrevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalSlides - 1;
    }
    updateSlidePosition();
    updatePagination();
  }

  function updateSlidePosition() {
    slideContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Auto-slide functionality
  let autoSlideInterval;

  function startAutoSlide() {
    autoSlideInterval = setInterval(goToNextSlide, 1000); // Change slide every 1 seconds
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Event listeners for navigation buttons
  nextButton.addEventListener("click", () => {
    goToNextSlide();
    stopAutoSlide();
  });

  prevButton.addEventListener("click", () => {
    goToPrevSlide();
    stopAutoSlide();
  });

  // Start auto-slide and create pagination buttons when the page loads
  startAutoSlide();
  createPaginationButtons();
});
