import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
//회원아이디를 저장하는 저장소(atom)

const loginIdState = atom({
  key: "loginIdState",
  default: "", //초기값 널이나 빈값
  effects_UNSTABLE: [persistAtom], //브라우저 새로고침을 했을때 저장해주는 옵션
});

//회원 타입을 저장하는 저장소(atom)
const memberTypeState = atom({
  key: "memberTypeState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export { loginIdState, memberTypeState };
