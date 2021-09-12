<template>
  <div class="sendMessage">
    <!-- <input type="text" v-model="text" @keypress.enter="sendMessage" width="100%" placeholder="Escriba su mensaje..."/> -->
    <discord-picker
      input
      :value="text"
      @update:value="text = $event"
      @emoji="setEmoji"
      @keypress.enter="sendMessage"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import DiscordPicker from 'vue3-discordpicker';
import { useStore } from 'vuex';
import { db, firebase } from '@/firebase';

export default defineComponent({
  components: {
    DiscordPicker,
  },
  setup() {
    const text = ref<string>('');
    const store = useStore();
    const cMessage = db.collection('messages');

    const setEmoji = (emoji: any): void => {
      console.log(emoji);
    };
    // cMessage.onSnapshot((snapShot) => {
    //   snapShot.docChanges().forEach((change) => {
    //     if (change.type === 'added') {
    //       store.dispatch('getMessages');
    //     }
    //   });
    // });

    const sendMessage = async (): Promise<void> => {
      const tmp = text.value;
      text.value = '';
      cMessage.add({
        type: 'text',
        text: tmp,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        userUid: store.state.userUid,
      });
    };

    return {
      text,
      setEmoji,
      sendMessage,
    };
  },
});
</script>
