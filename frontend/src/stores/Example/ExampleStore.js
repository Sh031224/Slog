import { observable, action } from "mobx";
import { autobind } from "core-decorators";

@autobind
class ExampleStore {
  @observable test = false;

  // @action
}

export default ExampleStore;
