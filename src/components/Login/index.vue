<template>
  <div class="login">
    <div class="container__image">
      <div class="image"></div>
    </div>
    <div class="description">
      <section class="title">Sign in to EDgram</section>
      <section class="subtitle">
        Please confirm your country and <br/>enter your phone number.
      </section>
    </div>
    <div class="container__select">
      <select v-model="countries" @change="searchCodes">
        <option value="AR">Argentina</option>
        <option value="BO">Bolivia</option>
        <option value="BR">Brazil</option>
        <option value="CL">Chile</option>
        <option value="CO">Colombia</option>
        <option value="EC">Ecuador</option>
        <option value="PY">Paraguay</option>
        <option value="UY">Uruguay</option>
      </select>
    </div>
    <div class="container__phone">
      <input type="text" class="phoneCode" v-model="code">
      <input type="text" autofocus class="phone" v-model="phone">
    </div>
    <div class="container__button">
      <div id="p-captcha"></div>
      <button id="sign" class="next" @click="loginWithPhoneNumber">INGRESAR</button>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent, ref, onMounted, inject,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { firebase } from '../../firebase';
import IStorage from '@/interfaces/Storage';

export default defineComponent({
  setup() {
    const countries = ref<string>('BO');
    const code = ref<string>('+ 591');
    const phone = ref<string>('');
    const Storage = inject<IStorage>('Storage');
    const router = useRouter();
    const store = useStore();

    const searchCodes = async (): Promise<void> => {
      try {
        const response: any = await fetch(`https://restcountries.eu/rest/v2/alpha?codes=${countries.value}`);
        const codes: any[] = await response.json();
        const [firstElement] = codes;
        code.value = `+ ${firstElement.callingCodes[0]}`;
      } catch (error) {
        console.error(error.message);
      }
    };

    const loginWithPhoneNumber = async (): Promise<void> => {
      try {
        // const phoneNumber: string = `${code.value}${phone.value}`; // +59178802950
        const phoneNumber = '+ 59178802950'; // +59178802950
        const appVerifier: any = window.recaptchaVerifier;
        const response = await firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier);
        if (response) {
          window.confirmationResult = response;
          const sCode = '025474';
          const confirmacion = await response.confirm(sCode);
          if (confirmacion) {
            // User signed in successfully.
            const { user } = confirmacion;
            console.log(user);
            Storage.set('refreshToken', user.refreshToken);
            store.commit('setLogged', phoneNumber.replace('+ ', '')); // + 59178802950 = 59178802950
            router.push('/');
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    onMounted(() => {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('p-captcha', {
        size: 'invisible',
        callback: (response: any): void => {
          // reCAPTCHA solved, allow signInWithPhoneNumber
          console.log('-----');
          console.log(response);
          console.log('-----');
        },
      });
    });
    return {
      countries,
      code,
      phone,
      searchCodes,
      loginWithPhoneNumber,
    };
  },
});
</script>
<style lang="scss" scoped>
  .login {
    background: #212121;
    height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .container__image {
      padding-bottom: 10px;
      .image {
        background: url('https://cursos-edteam.github.io/edgram/logoTelegram.png') no-repeat;
        background-position: center;
        background-size: contain;
        height: 150px;
        width: 150px;
      }
    }
    .description {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #FFF;
      font-family: 'Poppins';
      .title {
        margin-top: 15px;
        font-size: 1.8rem;
        font-weight: bold;
      }
      .subtitle {
        text-align: center;
        margin-top: 7px;
        font-size: 1.1rem;
        margin-bottom: 10px;
        font-weight: bold;
        color: #666666;
      }
    }
    .container__select {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding-top: 15px;
      select {
        width: 250px;
        padding: 10px;
        outline: none;
        border: none;
        height: 40px;
        border-radius: 7px;
      }
    }
    .container__phone {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding-top: 15px;
      .phoneCode {
        width: 50px;
        padding: 10px;
        padding-right: 0px;
        outline: none;
        border: none;
        height: 20px;
        text-align: right;
        border-radius: 7px 0px 0px 7px;
      }
      .phone {
        width: 175px;
        padding: 10px;
        padding-left: 5px;
        outline: none;
        border: none;
        height: 20px;
        border-radius: 0px 7px 7px 0px;
      }
    }
    .container__button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-top: 40px;
      .next {
        text-align: center;
        width: 250px;
        padding: 10px;
        border: none;
        background: #2EA6DA;
        color: #FFF;
        outline: none;
        border-radius: 7px;
        cursor: pointer;
      }
      .disabled {
        background: #CDCDCD;
        cursor: auto
      }
    }
  }
</style>
