<template>
  <div id="new-pet">
    <h3>新しいペットを登録</h3>
    <div class="row">
    <form @submit.prevent="savePet" class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="pet_id" required>
          <label>Pet ID#</label>
        </div>
      </div>

           <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="type" required>
          <label>動物の種類</label>
        </div>
      </div>
        
        <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="name" required>
          <label>ペット名</label>
        </div>
      </div>
            <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="breed" required>
          <label>ブリード</label>
        </div>
      </div>
            <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="gender" required>
          <label>性別</label>
        </div>
      </div>
            <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="age" required>
          <label>年齢</label>
        </div>
      </div>
            <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="color" required>
          <label>色</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="weight" required>
          <label>体重 (KG)</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="contact" required>
          <label>連絡先</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="location" required>
          <label>場所</label>
        </div>
      </div>
      <button type="submit" class="btn">ペット登録</button>
      <router-link to="/" class="btn grey">キャンセル</router-link>
    </form>
  </div>
  </div>
</template>

<script>
    import db from './firebaseInit'
    export default {
      name: 'new-pet',
      data () {
        return {
          pet_id: null,
          type: null,
          name: null,
          breed: null,
          gender: null,
          age: null,
          color: null,
          weight: null,
          contact: null,      
          location: null                 
        }
      },
      methods: {
        savePet () {
          db.collection('pets').add({
            pet_id: this.pet_id,
            type: this.type,
            name: this.name,
            breed: this.breed,
            gender: this.gender,
            age: this.age,
            color: this.color,
            weight: this.weight,
            contact: this.contact,
            location: this.location     
         })
          .then(docRef => {
            console.log('ペット追加しました: ', docRef.id)
            this.$router.push('/')
          })
          .catch(error => {
            console.error('エラー: ', error)
          })
        }
      }
    }
</script>
