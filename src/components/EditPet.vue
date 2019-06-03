<template>
  <div id="new-pet">
    <h3>情報を修正</h3>
    <div class="row">
    <form @submit.prevent="updatePet" class="col s12">
       <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="pet_id" required>
          <label>Pet ID#</label>
        </div>
      </div>

        <div class="row">
        <div class="input-field col s12">
          <input type="text" v-model="type" required>
          <label>種類</label>
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
          <label>体重</label>
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
      <button type="submit" class="btn">編集する</button>
      <router-link to="/" class="btn grey">キャンセル</router-link>
    </form>
  </div>
  </div>
</template>

<script>
  import db from './firebaseInit'
  export default {
    name: 'edit-pet',
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
    beforeRouteEnter (to, from, next) {
      db.collection('pets').where('pet_id', '==', to.params.pet_id).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next(vm => {
            vm.pet_id = doc.data().pet_id
            vm.type = doc.data().type
            vm.name = doc.data().name
            vm.breed = doc.data().breed
            vm.gender = doc.data().gender
            vm.age = doc.data().age
            vm.color = doc.data().color
            vm.weight = doc.data().weight
            vm.contact = doc.data().contact
            vm.location = doc.data().location
          })
        })
      })
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        db.collection('pets').where('pet_id', '==', this.$route.params.pet_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.pet_id = doc.data().pet_id
            this.type = doc.data().type
            this.name = doc.data().name
            this.breed = doc.data().breed
            this.gender = doc.data().gender
            this.age = doc.data().age
            this.color = doc.data().color
            this.weight = doc.data().weight
            this.contact = doc.data().contact
            this.location = doc.data().location
          })
        })
      },
      updatePet () {
        db.collection('pets').where('pet_id', '==', this.$route.params.pet_id).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.update({
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
            .then(() => {
              this.$router.push({ name: 'view-pet', params: { pet_id: this.pet_id }})
            });
          })
        })
      }
    }
  }
</script>