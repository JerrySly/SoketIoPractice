<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div class="chat-wrapper">
      <div class="chat">
        <div class="message" v-for="(message,index) in messages" :key="index">
          <div>{{message.id+':'}}</div>
          <div>{{message.value}}</div>
        </div>
      </div>
    </div>
    <div class="input-block">
        <input v-model="inputMessage" placeholder="Your message" type="text">
        <button @click="send">Send</button>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  data() {
    return {
      inputMessage: null,
      messages: [
        {
          id: "12412412414",
          value: "Hello1111",
        },
        {
          id: "12412412414",
          value: "Hello",
        },
        {
          id: "12412412414",
          value: "Hello",
        },
        {
          id: "12412512332",
          value: "And you",
        },
      ],
    };
  },
  mounted(){
    this.$socket.on('new-message', this.addNew)
  },
  methods:{
    addNew(msgObject){
      this.messages.push({
        id: msgObject.id,
        value: msgObject.message
      })
    },
    send(){
      this.$socket.emit('send',{message:this.inputMessage, id: this.$socket.id});
      this.addNew({message:this.inputMessage, id: this.$socket.id})
      this.inputMessage = null;
    }
  }
};
</script>
<style scoped>
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
