import { App } from 'vue';

export default {
  install(app: App) {
    // logica de crear un plugin
    const Storage = {
      get(key: string): any {
        if (window.localStorage) {
          const sKey = window.localStorage.getItem(`${process.env.VUE_APP_SITENAME}_${key}`);
          return sKey;
        }
        console.log('No soporta tu navegador');
        return null;
      },
      set(key: string, value: any): void {
        if (window.localStorage) {
          window.localStorage.setItem(`${process.env.VUE_APP_SITENAME}_${key}`, JSON.stringify(value));
        } else {
          console.warn('Tu navegador no soporta el localStorage');
        }
      },
      delete(): void {
        if (window.localStorage) {
          window.localStorage.clear();
        } else {
          console.warn('Tu navegador no soporta el localStorage');
        }
      },
    };
    const { config: { globalProperties } } = app;
    globalProperties.$storage = Storage;

    app.provide('Storage', Storage);
  },
};
