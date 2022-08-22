import axios from "axios";
import MockAdapter from "axios-mock-adapter";

type MockAdapterOptions = {
  delayResponse?: number;
  onNoMatch?: "passthrough" | "throwException";
};

const getAxiosMock = (options?: MockAdapterOptions) => new MockAdapter(axios, options);

export default getAxiosMock;
