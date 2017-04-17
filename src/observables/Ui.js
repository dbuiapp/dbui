import { observable } from "mobx";

export default class Ui {
  @observable showMenu = true;

  toggleShowMenu () {
    this.showMenu = !this.showMenu;
  }
}
