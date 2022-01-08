export class DragService {
  draggedElement;

  setDraggedElement(elt) {
    this.draggedElement = elt;
  }

  getDraggedElement() {
    return this.draggedElement;
  }
}
