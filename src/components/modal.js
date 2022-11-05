const ESC_CODE = 'Escape';

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функции открытия и закрытия POPUP// ------------------------------
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown',  closeByEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown',  closeByEsc)
}
// -------------------------------------------------------------------

export {openPopup, closePopup}
