<template>
  <div class="dialog" v-if="modelValue">
    <div class="head">Type your nickname</div>
    <div class="nickname-block"><input type="text" v-model="nick" /></div>
    <div class="color-picker">
      <color-picker
        :color="color"
        @colorChange="changeColor"
        default-format="rgb"
      ></color-picker>
    </div>
    <div class="actions">
      <button @click="close">Cancel</button>
      <button @click="createNick">Ready to chat</button>
    </div>
  </div>
</template>

<script>
import { ColorPicker } from "vue-accessible-color-picker";
import {io} from "socket.io-client"
import { mapMutations } from "vuex";


export default {
  props: {
    modelValue: Boolean,
  },
  data() {
    return {
      color: "#fff",
      nick: '',
    };
  },
  components: {
    ColorPicker,
  },
  methods: {
    ...mapMutations(['setSocket','setNick']),
    close() {
     this.$emit('close')
    },
    changeColor(eventData) {
      this.color = eventData.cssColor;
    },
    createNick(){
        this.setSocket(io('http://localhost:3000'));
        this.setNick({
            color: this.color,
            nick: this.nick
        })
        this.close()
    }
  },
};
</script>

<style scoped>
.head {
  font-size: 24px;
  margin-bottom: 20px;
}
input {
  font-size: 18px;
  height: 40px;
  width: 250px;
  padding-left: 10px;
}
.nickname-block {
  margin-bottom: 20px;
}
.dialog {
  position: absolute;
  top: 300px;
  z-index: 1;
  padding: 20px 15px;
  width: 320px;
  background-color: white;
  border: 1px solid black;
  box-shadow: 4px 4px 10px;
  left: -webkit-calc(50% - 165px);
  left: -moz-calc(50% - 165px);
  left: calc(50% - 165px);
}
.actions{
    display: flex;
    justify-content: space-around;
}
button{
    height: 30px;
    min-width: 150px;
    cursor: pointer;
    font-size: 18px;
}
</style>