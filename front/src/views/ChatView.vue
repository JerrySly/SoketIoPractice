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
        <input v-model="inputMessage" @input="typing" placeholder="Your message" type="text">
        <button @click="send">Send</button>
    </div>
    <select-name-dialog @close="socketCreated" v-model="dialog"></select-name-dialog>
    <div class="typing-users-block">
      <div class="head">Typing users</div>
      <div v-for="(user,index) in typingUsers" :key="index" :style="{'color':user.color}">
      {{user.nick}}</div>
    </div>
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
      dialog: true,
      typingUsers: []
    };
  },
  mounted(){
  },
  methods:{
    typing(){
      this.socket.emit('typing-text',this.nickConfig)
    },
    socketCreated(){
      this.dialog = false;
      this.socket.on('new-message', this.addNew)
      this.socket.on('new-connection', this.newMember)
      this.socket.on('somebody-typing',this.setTyping)
    },
    setTyping(usersTyping){
      this.typingUsers = usersTyping.map(x=>x.nickConfig)
    },
    newMember(nickConfig){
      this.addSystemMessage(`New member: ${nickConfig.nick} `)
    },
    addSystemMessage(text){
      this.addNew({
        nick: 'MESSENGER-SYSTEM',
        color: '#000',
        message: text
      })
    } , 
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
      this.socket.emit('end-typing')
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
.typing-users-block{
  font-size: 20px;
}
.typing-users-block{
  position: absolute;
  top: 300px;
}
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
