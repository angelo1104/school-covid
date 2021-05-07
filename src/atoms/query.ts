import { atom } from "recoil";

const queryState = atom({
  key: "query",
  default: "#covid19india ",
});

export default queryState;
