import { useNotificationStore } from "@/stores/notification";

export const REQUEST_ERROR = "Ошибка запроса";
export const NETWORK_ERROR = "Ошибка сети";

export const useNotifications = () => {
  return {
    success: (text: string) => {
      const store = useNotificationStore();

      store.setText(text);
      store.setColor("green");
      store.setIsShow(true);
    },

    info: (text: string) => {
      const store = useNotificationStore();

      store.setText(text);
      store.setColor("orange-accent-4");
      store.setIsShow(true);
    },

    error: (text: string) => {
      const store = useNotificationStore();

      store.setText(text);
      store.setColor("red");
      store.setIsShow(true);
    }
  };
};
