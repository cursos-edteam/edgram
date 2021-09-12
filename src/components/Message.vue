<template>
  <div class="message">
    {{ message.text }}
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, toRefs } from 'vue';
import IMessage from '@/interfaces/Message';

export default defineComponent({
  props: {
    message: {
      required: true,
      default: Object as PropType<IMessage>,
    },
  },
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
});
</script>
<style lang="scss" scoped>
@import '~/src/assets/variables.scss';
.message {
  color: $fontColor;
  background: $fontColorActivo;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 7px;
  width: fit-content;
  margin-right: 10px;
}
</style>
