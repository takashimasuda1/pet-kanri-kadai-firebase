<template>
  <div id="home">
    <ul class="collection with-header">
      <li class="collection-header"><h4>里親募集の投稿一覧</h4></li>
      <li v-for="pet in pets" v-bind:key="pet.id" class="collection-item">
        <div class="chip">{{pet.type}}</div>
        <div class="chip">{{pet.breed}}</div>
          名前： {{pet.name}} ｜ 場所： {{pet.location}}
         <router-link class="secondary-content" v-bind:to="{ name: 'view-pet', params: { pet_id: pet.pet_id }}"><i class="fa fa-eye"></i></router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit';
export default {
  name: 'home',
  data() {
    return {
      pets: [],
      loading: true
    };
  },
  created() {
    db
      .collection('pets')
      .orderBy('type')
      .get()
      .then(querySnapshot => {
        this.loading = false;
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            pet_id: doc.data().pet_id,
            type: doc.data().type,
            name: doc.data().name,
            breed: doc.data().breed,
            gender: doc.data().gender,
            age: doc.data().age,
            color: doc.data().color,
            weight: doc.data().weight,
            contact: doc.data().contact,
            location: doc.data().location
          };
          this.pets.push(data);
        });
      });
  }
};
</script>