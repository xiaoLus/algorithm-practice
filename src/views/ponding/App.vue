<template>
  <div id="app">
    <v-stage :config="configStage">
      <v-layer>
        <v-rect :config="item" v-for="(item,key) in configRect" :key="key"></v-rect>
      </v-layer>
    </v-stage>
    <input v-model="inputStr" />
    <button @click="start">开始</button>
  </div>
</template>

<script>
const WIDTH = 50;
const HEIGHT = 50;

export default {
  name: 'app',
  components: {
    
  },
  computed: {
    configStage() {
      return {
        width: 200,
        height: 200
      }
    }
  },
  data() {
    return {
      inputStr: '',
      inputArr: [],
      inputMax: null,
      configRect: [{
        x: 0,
        y: 0,
        width: WIDTH,
        height: HEIGHT,
        fill: "grey",
        stroke: "black",
        strokeWidth: 2
      },
      {
        x: WIDTH,
        y: HEIGHT,
        width: WIDTH,
        height: HEIGHT,
        fill: "grey",
        stroke: "black",
        strokeWidth: 2
      }]
    }
  },
  methods: {
    async start() {
      await this.RectInit();

    },
    async RectInit() {
      if(!this.inputStr) return;
      this.inputArr = this.inputStr.split(',')
      console.log(this.inputStr,this.inputArr.length)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
