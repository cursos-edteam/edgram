<template>
  <div class="home">
    <section class="container-users">
      <Search/>
      <Users/>
    </section>
    <section class="messages">
      <Cerrar/>
      <Message/>
      <Input/>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Search from '@/components/Search.vue';
import Users from '@/components/Users.vue';
import Message from '@/components/Messages.vue';
import Input from '@/components/Input.vue';
import Cerrar from '@/components/Cerrar.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Search,
    Users,
    Message,
    Input,
    Cerrar,
  },
});
</script>
<style lang="scss" scoped>
@import '~/src/assets/variables.scss';
.home {
  background: $backgroundColor;
  width: 100%;
  height: 100vh;
  color: $fontColor;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  .container-users {
    width: 35%;
    display: flex;
    flex-direction: column;
  }
  .messages {
    width: 65%;
    background: $backgroundColorMessages;
    height: 100vh;
  }
}
</style>
