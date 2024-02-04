import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom<{
  userId: number | null;
  email: string;
  profileImage: string;
  nickname: string;
}>({
  key: "userState",
  default: {
    userId: null,
    email: "",
    profileImage: "",
    nickname: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const emailState = atom<string>({
  key: "emailState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const profileImageState = atom<string>({
  key: "profileImageState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const nicknameState = atom<string>({
  key: "nicknameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const modalState = atom<{
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
}>({
  key: "modalState",
  default: {
    top: false,
    left: false,
    bottom: false,
    right: false,
  },
});
