const fellows = [
  { name: 'Carmen', id: getId() },
  { name: 'Reuben', id: getId() },
  { name: 'Maya', id: getId() },
];

class Fellow {

  static all() {
    return [...fellows];
  }

  static find(id) {
    return fellows.find((fellow) => fellow.id === Number(id));
  }

  static create(name) {
    const newFellow = { name, id: getId() };
    fellows.push(newFellow);
    return newFellow;
  }

  static update(id, name) {
    const updatedFellow = this.find(id);
    if (!updatedFellow) return null;
    updatedFellow.name = name;
    return updatedFellow;
  }

  static delete(id) {
    const fellowIndex = fellows.findIndex((fellow) => fellow.id === Number(id));
    if (fellowIndex < 0) return null;
    return fellows.splice(fellowIndex, 1)[0];
  }
}