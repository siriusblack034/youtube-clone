<template>
  <div class="row">
    <div
      class="col l-2-4 m-3 c-2"
      v-for="(item, index) in searchList"
      :key="index"
    >
      <item-home :item="item" :isChannel="true" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ItemHome from "../../components/ItemHome.vue";
export default {
  components: { ItemHome },
  computed: {
    ...mapState("listVideo", ["searchList"]),
  },
};
</script>

<style>
</style>