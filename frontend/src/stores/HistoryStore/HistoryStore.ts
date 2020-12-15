import { autobind } from "core-decorators";
import { action, observable } from "mobx";

@autobind
class HistoryStore {
  @observable prevUrl: string = "";

  @action handlePrevUrl = () => {
    this.prevUrl = window.location.href;
    console.log(this.prevUrl);
  };
}

export default HistoryStore;
