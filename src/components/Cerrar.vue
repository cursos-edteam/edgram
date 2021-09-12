<template>
  <div class="cerrar">
    <button @click="logout">Cerrar session</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from 'vue';
import { useRouter } from 'vue-router';
import IStorage from '@/interfaces/Storage';

export default defineComponent({
  setup() {
    const router = useRouter();
    const Storage = inject<IStorage>('Storage');
    const logout = (): void => {
      Storage.delete();
      router.push('/login');
    };

    return {
      logout,
    };
  },
});
</script>
