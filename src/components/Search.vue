<template>
  <div class="search">
    <input type="text" placeholder="Buscar..." class="input-search"/>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

});
</script>
<style lang="scss" scoped>
@import '~/src/assets/variables.scss';
.search {
  input[type=text] {
    padding: 10px;
    width: 90%;
    background: $backgroundColorMessages;
    border: none;
    outline: none;
    color: $fontColor;
    &::placeholder {
      color: $fontColor;
    }
  }
}
</style>
