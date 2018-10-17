<template>
    <div>
        <span v-show="show" class="loading">
            <img src="../assets/mo.gif" alt="">
        </span>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
    ...mapState({
      show: state => state.show
    })
  }
}
</script>

<style>
    .loading{
        z-index: 100;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
    }
    .loading img{
        position: fixed;
        left: 45%;
        top: 45%;
        vertical-align: middle;
    }
</style>
