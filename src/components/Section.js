export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.append(element);
  }

  addItemfirst(element) {
    this._container.prepend(element);
  }


  renderItems(cards, userData) {
    cards.forEach((item) => {
      this._renderer(item, userData._id);
    });
  }

//   renderItems() {
//     this._items()
//       .then(([userData, cards]) => {
//         cards.forEach((item) => {
//           this._renderer(item, userData._id)
//         })
//       })
//   }

// }
