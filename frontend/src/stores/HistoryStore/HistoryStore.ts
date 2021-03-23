import { autobind } from "core-decorators";
import { action, observable } from "mobx";

@autobind
class HistoryStore {
  @observable prevUrl: string = "";
  @observable isClickedLogo: boolean = false;

  @action handlePrevUrl = () => {
    this.prevUrl = window.location.href;
  };

  @action handleIsClickedLogo = (isClickedLogo: boolean) => {
    this.isClickedLogo = isClickedLogo;
  }
}

export default HistoryStore;
