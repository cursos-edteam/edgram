<template>
  <div class="container-messages">
    <Message v-for="message in aMessages" :message="message" :key="message.userUid"/>
  </div>
</template>
<script lang="ts">
import {
  defineComponent, computed,
} from 'vue';
import { useStore } from 'vuex';
import Message from '@/components/Message.vue';

export default defineComponent({
  components: {
    Message,
  },
  setup() {
    const store = useStore();
    const aMessages = computed(() => store.state.messages);
    return {
      aMessages,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '~/src/assets/variables.scss';
.container-messages {
  height: calc(100vh - 70px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>
