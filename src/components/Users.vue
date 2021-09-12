<template>
  <div class="users">
    <ul class="usersList">
      <li
        :class="{
          active: loggedPhone === user.userUid
        }"
        v-for="user in aUsers"
        :key="user.userUid"
        @click="setUserUid(user)"
      >
        <img :src="user.photo" width="65" height="65"/>
        <section class="description">
          <div class="name">{{ user.name }}</div>
          <div class="lastMessage">Mi ultimo mensaje</div>
        </section>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import {
  defineComponent, ref, onMounted, computed,
} from 'vue';
import { useStore } from 'vuex';
import IUser from '@/interfaces/Users';
import { db, firebase } from '@/firebase';

export default defineComponent({
  setup() {
    const aUsers = ref<IUser[]>([]);
    const cUsers = db.collection('users');
    const store = useStore();
    const loggedPhone = computed(() => store.state.userUid);

    const setUserUid = (user: IUser) => {
      store.commit('setUserUid', user.userUid);
      store.dispatch('getMessages');
    };

    onMounted(async () => {
      const querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = await cUsers.get();
      querySnapshot.forEach((data: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) => {
        const {
          photo, name, userUid, date,
        } = data.data();
        aUsers.value.push({
          photo,
          name,
          userUid,
          date,
        });
      });
    });

    return {
      aUsers,
      loggedPhone,
      setUserUid,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '~/src/assets/variables.scss';
.users {
  width: 100%;
  .usersList {
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 10px;
    li {
      width: 95%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 70px;
      margin-bottom: 10px;
      border-radius: 7px;
      cursor: pointer;
      img {
        border-radius: 50%;
      }
      .description {
        padding: 10px;
        display: flex;
        width: calc(100% - 65px);
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        .name {
          font-size: 16px;
        }
        .lastMessage {
          font-size: 14px;
        }
      }
    }
    .active {
      background: $fontColorActivo;
    }
  }
}
</style>
