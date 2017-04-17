import { observable } from "mobx";
import Ui from "./Ui";
import Datasource from "./Datasource";

export default class Store {
  ui = new Ui();
  datasource = new Datasource();
}
