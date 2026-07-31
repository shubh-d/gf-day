const targetDate = new Date('August 1, 2026 00:00:00');

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const slideshowImages = [
  'IMG_20251203_103915.jpg',
  'IMG_20260306_145755_479.jpg',
  'IMG_20260701_020605_301.jpg',
  'Snapchat-396656849.jpg',
  'Snapchat-674959464.jpg',
  'Snapchat-783007435.jpg',
  'Snapchat-1627153413.jpg',
  'Snapchat-2024376500.jpg'
];

const slideshowImage = document.getElementById('slideshow-image');
const dotsContainer = document.getElementById('slideshow-dots');
const prevButton = document.querySelector('.slideshow-nav.prev');
const nextButton = document.querySelector('.slideshow-nav.next');
const profileImage = document.getElementById('profile-image');
const profileInput = document.getElementById('profile-image-input');
const slideshowInput = document.getElementById('slideshow-input');

let currentSlide = 0;
let slideshowInterval;

function renderSlideshow() {
  if (!slideshowImage || !dotsContainer) {
    return;
  }

  if (slideshowImages.length === 0) {
    slideshowImage.removeAttribute('src');
    slideshowImage.alt = 'No photo yet';
    dotsContainer.innerHTML = '';
    return;
  }

  if (currentSlide >= slideshowImages.length) {
    currentSlide = 0;
  }

  slideshowImage.src = slideshowImages[currentSlide];
  slideshowImage.alt = `Favorite photo ${currentSlide + 1}`;
  dotsContainer.innerHTML = '';

  slideshowImages.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `dot${index === currentSlide ? ' active' : ''}`;
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to photo ${index + 1}`);
    dot.addEventListener('click', () => {
      currentSlide = index;
      renderSlideshow();
      resetAutoPlay();
    });
    dotsContainer.appendChild(dot);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slideshowImages.length;
  renderSlideshow();
}

function resetAutoPlay() {
  clearInterval(slideshowInterval);
  slideshowInterval = setInterval(nextSlide, 4000);
}

if (prevButton && nextButton) {
  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slideshowImages.length) % slideshowImages.length;
    renderSlideshow();
    resetAutoPlay();
  });

  nextButton.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });
}

function addSlideshowPhotos(files) {
  if (!files || files.length === 0) {
    return;
  }

  Array.from(files).forEach((file) => {
    if (!file.type.startsWith('image/')) {
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      slideshowImages.push(event.target.result);
      renderSlideshow();
      resetAutoPlay();
    };
    reader.readAsDataURL(file);
  });
}

function setProfilePhoto(file) {
  if (!file || !profileImage) {
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    profileImage.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

if (profileInput) {
  profileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    setProfilePhoto(file);
  });
}

if (slideshowInput) {
  slideshowInput.addEventListener('change', (event) => {
    addSlideshowPhotos(event.target.files);
    event.target.value = '';
  });
}

renderSlideshow();
resetAutoPlay();
