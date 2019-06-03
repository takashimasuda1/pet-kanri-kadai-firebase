<template>
  <div id="view-pet">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{name }} ({{ type }})</h4></li>
      <li class="collection-item">ペット ID#: {{pet_id}}</li>
       <li class="collection-item">種類: {{type}}</li>
      <li class="collection-item">名前: {{name}}</li>
      <li class="collection-item">ブリード: {{breed}}</li>
      <li class="collection-item">性別: {{gender}}</li>
      <li class="collection-item">年齢: {{age}}才</li>
      <li class="collection-item">色: {{color}}</li>
      <li class="collection-item">体重: {{weight}}キロ</li>
      <li class="collection-item">連絡先: {{contact}}</li>
      <li class="collection-item">場所: {{location}}</li>
    </ul>
    <router-link to="/" class="btn grey">戻る</router-link>
    <button @click="deletePet" class="btn red">削除</button>

    <div class="fixed-action-btn">
      <router-link v-bind:to="{ name: 'edit-pet', params: { pet_id: pet_id }}" class="btn-floating btn-large red">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit';
export default {
  name: 'view-pet',
  data() {
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
    };
  },
  beforeRouteEnter(to, from, next) {
    db
      .collection('pets')
      .where('pet_id', '==', to.params.pet_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.pet_id = doc.data().pet_id;
            vm.type = doc.data().type;
            vm.name = doc.data().name;
            vm.breed = doc.data().breed;
            vm.gender = doc.data().gender;
            vm.age = doc.data().age;
            vm.color = doc.data().color;
            vm.weight = doc.data().weight;
            vm.location = doc.data().location;
            vm.contact = doc.data().contact;         
          });
        });
      });
  },
  watch: {
    $route: 'fetchData'
  },
  methods: {
    fetchData() {
      db
        .collection('pets')
        .where('pet_id', '==', this.$route.params.pet_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.pet_id = doc.data().pet_id;
            this.type = doc.data().type;
            this.name = doc.data().name;
            this.breed = doc.data().breed;
            this.gender = doc.data().gender;
            this.age = doc.data().age;
            this.color = doc.data().color;
            this.weight = doc.data().weight;
            this.location = doc.data().location;
            this.contact = doc.data().contact;         
         });
        });
    },
    deletePet() {
      if (confirm('本当に消しますか?')) {
        db
          .collection('pets')
          .where('pet_id', '==', this.$route.params.pet_id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push('/');
            });
          });
      }
    }
  }
};
</script>
