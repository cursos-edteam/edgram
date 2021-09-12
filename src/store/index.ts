import { createStore } from 'vuex';
import { db } from '@/firebase';
import IMessage from '@/interfaces/Message';

export default createStore({
  state: {
    userUid: '' as string,
    messages: [] as IMessage[],
    logged: '' as string,
  },
  mutations: {
    setUserUid(state: any, payload: any) {
      state.userUid = payload;
    },
    setLogged(state: any, payload: any) {
      state.logged = payload; // 59178802950
    },
    setMessages(state: any, payload: any) {
      state.messages = payload;
    },
  },
  actions: {
    async getMessages({ commit, state }) {
      try {
        const aMessages: IMessage[] = [];
        const cMessages = await db.collection('messages').orderBy('date').where('userUid', 'in', [state.userUid, state.logged]).get();
        cMessages.forEach((data) => {
          const {
            date, type, text, userUid,
          } = data.data();
          aMessages.push({
            date,
            type,
            text,
            userUid,
          });
        });
        commit('setMessages', aMessages);
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {
  },
});
