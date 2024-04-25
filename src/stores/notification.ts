import { acceptHMRUpdate, defineStore } from "pinia";

export const useNotificationStore = defineStore({
  id: "notification",

  state: () => ({
    _isShow: false,
    _text: "",
    _color: "green",
  }),

  actions: {
    setIsShow(isShow) {
      this._isShow = isShow;
    },

    setText(text) {
      this._text = text;
    },

    setColor(color) {
      this._color = color;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotificationStore, import.meta.hot));
}
