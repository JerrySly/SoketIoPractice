<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="chat-wrapper">
      <div class="chat">
        <div class="message" v-for="(message,index) in messages" :key="index">
          <div :style="{'color':message.color}">{{message.nick+':'}}</div>
          <div>{{message.value}}</div>
        </div>
      </div>
    </div>
    <div class="input-block">
        <input v-model="inputMessage" placeholder="Your message" type="text">
        <button @click="send">Send</button>
    </div>
    <select-name-dialog @close="socketCreated" v-model="dialog"></select-name-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SelectNameDialog from '../components/SelectNameDialog.vue';

export default {
  components: { SelectNameDialog },
  name: "ChatView",
  data() {
    return {
      inputMessage: null,
      messages: [],
      dialog: true
    };
  },
  mounted(){
  },
  methods:{
    socketCreated(){
      this.dialog = false;
      this.socket.on('new-message', this.addNew)
    },  
    addNew(msgObject){
      this.messages.push({
        nick: msgObject.nick,
        value: msgObject.message,
        color: msgObject.color
      })
    },
    send(){
      let messageObj = {message:this.inputMessage, nick: this.nickConfig.nick, color:this.nickConfig.color}
      this.socket.emit('send',messageObj);
      this.addNew(messageObj)
      this.inputMessage = null;
    }
  },
  computed:{
    ...mapState({
      socket: state => state.socket,
      nickConfig: state => state.nickConfig
    })
  }
};
</script>
<style scoped>
.home{
  position: relative;
}
.message{
  display: flex;
  margin-left: 20px;
  margin-top: 10px;
  font-size: 18px;
}
.message div:first-child{
  color:rgb(239, 112, 73)
}
.message div:last-child{
  margin-left: 8px;
}
.chat-wrapper{
  display: flex;
  justify-content: center;
}
.chat {
  height: 700px;
  width: 500px;
  border: 1px solid black;
  overflow-y: scroll;
}
.input-block{
  display: flex;
  align-items: center;
  width: 500px;
  margin: auto;
}
.input-block input{
  height: 40px;
  width: 400px;
  font-size: 20px;
  padding-left: 10px;
}
.input-block button{
  font-size: 20px;
  height: 48px;
  width: 100px;
}
</style>
