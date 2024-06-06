// Add imports above this line
import { images } from './images';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import '../css/simple-lightbox-custom.css';

console.log('images before', images);
const gallery = document.querySelector('.gallery');

// Функція для створення і рендерування розмітки галереї
function createImagesMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join('');
}

// Додаємо розмітку до списку .gallery
gallery.insertAdjacentHTML('beforeend', createImagesMarkup(images));

// Ініціалізація бібліотеки SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log('images after', images);
