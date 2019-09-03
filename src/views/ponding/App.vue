<template>
  <div id="app">
    <v-stage :config="configStage">
      <v-layer>
        <v-rect :ref=" 'rect'+ item.w + '_' +item.h " :config="item" v-for="(item,key) in rectList" :key="key"></v-rect>
      </v-layer>
    </v-stage>
    <input v-model="inputStr" />
    <button @click="start">start</button>
    <p>
      water:
      {{water_count}}
    </p>
  </div>
</template>

<script>
const WIDTH = 50;
const HEIGHT = 50;

const NORMAL = '#eee';
const STONE = '#222';
const WATER = 'blue';


export default {
  name: 'app',
  components: {
    
  },
  created() {
    window.$vue=this;
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
      rectList: [],
      water_count: null,
    }
  },
  methods: {
    async start() {
      await this.RectInit();
      let stoneArr = await this.getStoneArr();
      await this.drawStone(stoneArr);
      let waterArr = await this.getWaterArr();
      this.drawWater(waterArr);
    },
    async RectInit() {
      if(!this.inputStr) return;
      // 清空数据
      await this.resetData();

      this.inputArr = this.inputStr.split(',');
      console.log(this.inputArr.toString());
      this.inputLength = this.inputArr.length;
      // 获取最大高度
      this.inputArr.forEach(val=>{
        let num = Number(val);
        if( this.inputMax < num ) this.inputMax = num;
      });

      let rectArr = [];
      for( var h=0; h<this.inputMax; h++){
        for( var w=0; w<this.inputLength; w++){
          let rectConfig = this.createRect({
            w: w,
            h: h,
            color: 'grey',
          });
          rectArr.push( rectConfig )
        }
      };
      this.rectList = rectArr;
      this.$nextTick(()=>{
        this.drawStage();
      })
    },
    async resetData() {
      this.inputArr = [];
      this.inputMax = 0;
      this.inputLength = null;
      this.rectList= [];
      this.water_count = null;
      return new Promise(resolve=>{
        this.$nextTick(()=>{
          resolve();
        })
      });
    },

    getStoneArr() {
      let arr = [];
      for( var h=0; h<this.inputMax; h++){
        for( var w=0; w<this.inputLength; w++){
          if(this.inputArr[w] > h){
            arr.push({x:w, y:h});
          }
        }
      };
      return arr;
    },

    async getWaterArr() {
      let arr = [];
      for( var h=0; h<this.inputMax; h++){

        let left = -1;
        let right = -1;
        let emptyX = [];
        for( var w=0; w<this.inputLength; w++){
          if(this.inputArr[w] > h){
            if( left == -1 ) left = w;
            right = w;
          }else{
            emptyX.push(w);
          }
        }
        // 检验empty是否能储水
        emptyX.forEach(x=>{
          if(x>left && x<right) arr.push({x:x, y:h});
        })

      };
      this.water_count = arr.length;
      return arr;
    },

    createRect(config) {
      // 使用数学坐标系计算
      return {
        w: config.w, // 横坐标
        h: config.h,  // 纵坐标
        x: config.w*WIDTH,
        y: (this.inputMax - config.h - 1)*HEIGHT, // web坐标系 ==> 数学坐标系
        width: WIDTH,
        height: HEIGHT,
        fill: config.color,
        stroke: "grey",
        strokeWidth: 2
      }
    },

    getRect(x,y) {
      return this.$refs['rect'+ x + '_' + y][0].getNode();
    },

    /**
     * 绘制函数
     */
    drawStage() {
      for( var h=0; h<this.inputMax; h++){
        for( var w=0; w<this.inputLength; w++){
          this.getRect(w, h).fill(NORMAL);
        }
      };
    },

    drawStone(arr) {
      arr.forEach(item=>{
        this.getRect(item.x, item.y).fill(STONE);
      })
    },

    drawWater(arr) {
      arr.forEach(item=>{
        this.getRect(item.x, item.y).fill(WATER);
      })
    },
  }
}



</script>
<style lang="scss" scoped>

</style>
