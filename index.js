import images from './gallery-items.js';

const ulRef = document.querySelector('.js-gallery');
const divModalRef = document.querySelector('.js-lightbox');
const btnRef = document.querySelector('.lightbox__button');
const imgRef = document.querySelector('.lightbox__image');
const backdrop = document.querySelector('.lightbox__overlay')


const galleryMarkup = createGalleryListMarkup(images);

ulRef.insertAdjacentHTML('beforeEnd', galleryMarkup); 


function createGalleryListMarkup(images) {
    const markup = images.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
        <a class="gallery__link"
        href="${original}">
        <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
        />
        </a>
        </li>`;
    }).join('');
    return markup;
}

// Open modal

ulRef.addEventListener('click', onOpenModal);

function onOpenModal(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== 'IMG') {
        return;

    }
    window.addEventListener('keydown', onCloseByEscape);
    divModalRef.classList.add('is-open');
    imgRef.src = evt.target.dataset.source;
    imgRef.alt = evt.target.alt;  
}

// close modal

btnRef.addEventListener('click', onCloseModal);

function onCloseModal() {
    
    window.removeEventListener('keydown', onCloseByEscape);
    divModalRef.classList.remove('is-open');

    imgRef.src = ' ';
    imgRef.alt = ' ';
    console.log('close by button');
}

backdrop.addEventListener('click', onBackropClick);

function onBackropClick(e) {
    if (e.currentTarget === e.target) {
        console.log('click')
        onCloseModal();
    }
}

function onCloseByEscape(e) {
    if (e.code === 'Escape') {
        onCloseModal();
        console.log('escape');
    }
    
}







