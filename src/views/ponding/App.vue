<template>
  <div id="app">
    <v-stage :config="configStage">
      <v-layer>
        <v-rect :ref=" 'rect'+ item.h + '_' +item.w " :config="item" v-for="(item,key) in rectList" :key="key"></v-rect>

        <!-- <div v-for="(row,key1) in rectList" :key="key1">
          <v-rect :config="col" v-for="(col,key2) in row" :key="key2"></v-rect>
        </div> -->
      </v-layer>
    </v-stage>
    <input v-model="inputStr" />
    <button @click="start">开始</button>
  </div>
</template>

<script>
const WIDTH = 50;
const HEIGHT = 50;

const NORMAL = '#eee';
// const STONE = '#222';
// const WATER = 'blue';


export default {
  name: 'app',
  components: {
    
  },
  computed: {
    configStage() {
      return {
        width: this.inputLength*WIDTH,
        height: this.inputMax*HEIGHT,
      }
    }
  },
  data() {
    return {
      inputStr: '',
      inputArr: [],
      inputMax: 0, // =>高度
      inputLength: null, // =>宽度
      rectList: []
    }
  },
  methods: {
    async start() {
      await this.RectInit();

    },
    async RectInit() {
      if(!this.inputStr) return;
      // 清空数据
      this.resetData();

      this.inputArr = this.inputStr.split(',');
      this.inputLength = this.inputArr.length;
      // 获取最大高度
      this.inputArr.forEach(val=>{
        if( this.inputMax < val ) this.inputMax = val;
      });

      let rectArr = [];
      for( var h=0; h<this.inputMax; h++){
        for( var w=0; w<this.inputLength; w++){
          let a = createRect({
            w: w,
            h: h,
            color: NORMAL,
          });
          console.log('config',a);
          rectArr.push( a )
        }
      };
      console.log(rectArr)
      this.rectList = rectArr;

      // this.$refs['1:3'].fill('black');
      console.log('ref',this.$refs)

    },
    async resetData() {
      this.inputArr = [];
      this.inputMax = 0;
      this.inputLength = null;
    },
  }
}

function createRect(config) {

  return {
    w: config.w,
    h: config.h,
    x: config.w*WIDTH,
    y: config.h*HEIGHT,
    width: WIDTH,
    height: HEIGHT,
    fill: config.color,
    stroke: "black",
    strokeWidth: 2
  }
}

</script>
<style lang="scss" scoped>

</style>
