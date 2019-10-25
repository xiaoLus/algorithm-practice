<template>
  <div id="app">
    <p>
      <pre>
        A*寻路最基础版
        双击: 选择起点和终点
        按住左键滑动: 选择障碍物路线
        start按钮: 开始计算路线
      </pre>
    </p>
    <v-stage :config="configStage">
      <v-layer @mousedown="left_button_down=true;" @mouseup="left_button_down=false;">
        <v-rect :ref=" 'rect'+ item.w + '_' +item.h " :config="item" v-for="(item,key) in rectList" :key="key"
          @dblclick="selectTargetNode(item)"
          @mouseover="selectBarrier(item)"
        ></v-rect>
      </v-layer>
    </v-stage>
    <br>
    <button @click="init">init</button>
    <span style="margin: 0 30px"></span>
    <button @click="start">start</button>

  </div>
</template>

<script>
import Astar from './astar';

const WIDTH = 20;
const HEIGHT = 20;

const X_AMOUNT = 40;
const Y_AMOUNT = 30;

// color
const NORMAL = '#eee';
const STROKE = '#ccc;'

// const START = '#f6f';
// const END = '#f3f';
const TARGET = '#f3f';
const BARRIER = '#333';
const PATH = '#ff6';


export default {
  name: 'app',
  components: {
    
  },
  created() {
    this.init();
  },
  computed: {
    configStage() {
      return {
        width: X_AMOUNT*WIDTH,
        height: Y_AMOUNT*HEIGHT,
      }
    }
  },
  data() {
    return {
      rectList: {}, // 用于绘图 
      barrierList: {}, // 障碍物列表 {x5y3:'barrier',x12y1:'barrier'}
      targetNodeList: [], // 目标节点 [{node:'x8y12', x: 8, y: 12},{node:'x23y20', x: 23, y: 20}]
      left_button_down: false, // 鼠标左键按下状态
    }
  },
  methods: {
    async init() {
      await this.RectInit();
    },
    async RectInit() {
      // 清空数据
      await this.resetData();

      let rectObj = {};
      for( var h=0; h<Y_AMOUNT; h++){
        for( var w=0; w<X_AMOUNT; w++){
          let rectConfig = createRect({
            w: w,
            h: h,
            color: NORMAL,
          });
          rectObj[`x${w}y${h}`] = {...rectConfig};
        }
      };
      this.rectList = rectObj;

      return new Promise(resolve=>{
        this.$nextTick(()=>{
          this.drawStage();
          resolve();
        })
      })
    },
    async resetData() {
      this.rectList = {};
      this.barrierList = {};
      this.targetNodeList = [];
    },

    async start() {
      if(this.targetNodeList.length != 2){
        alert(`The number of pink nodes must be 2 !`);
        return;
      }
      let astar_instance = new Astar(this.targetNodeList, this.barrierList, X_AMOUNT, Y_AMOUNT);
      let pathList = astar_instance.run();
      this.drawPath(pathList);
    },

    // 选择目标点
    selectTargetNode(item) {
      while( this.targetNodeList.length >= 2 ) {
        let node = this.targetNodeList.shift();
        this.getRect(node.x, node.y).fill(NORMAL);
      }
      this.targetNodeList.push({node:`x${item.w}y${item.h}`, x: item.w, y: item.h});
      this.removeBarrier(item.w, item.h);
      item.fill = TARGET;
    },
    // 选择障碍物
    selectBarrier(item) {
      if( this.left_button_down ) {
        item.fill = BARRIER;
        // this.barrierList[`x${item.w}y${item.h}`] = 'barrier';
        this.$set(this.barrierList, `x${item.w}y${item.h}`, 'barrier');
        this.removeTargetNode(item.w, item.h);
      }
    },
    // 移除目标点
    removeTargetNode(x, y) {
      let index = this.targetNodeList.findIndex( node=>{
        return node.x == x && node.y == y;
      });
      if(index != -1) this.targetNodeList.splice(index, 1);
    },
    // 移除障碍
    removeBarrier(x, y) {
      if( this.barrierList[`x${x}y${y}`] ){
        delete this.barrierList[`x${x}y${y}`];
        this.getRect(x, y).fill(NORMAL);
      }
    },


    // 获取Rect节点
    getRect(x,y) {
      let ref_name = 'rect'+ x + '_' + y;
      return this.$refs[ref_name][0].getNode();
    },

    /**
     * 绘制函数
     */
    // 绘制舞台
    drawStage() {
      for( var h=0; h<this.Y_AMOUNT; h++){
        for( var w=0; w<this.X_AMOUNT; w++){
          this.rectList[`x${w}y${h}`].fill = NORMAL;
        }
      };
    },
    // 绘制路径
    drawPath(pathList) {
      Object.keys(pathList).forEach( key=>{
        let item = pathList[key];
        this.rectList[`x${item.x}y${item.y}`].fill = PATH;
      })
    },
  }
}


function createRect(config) {
  // 使用数学坐标系计算
  return {
    w: config.w, // 横坐标
    h: config.h,  // 纵坐标
    x: config.w*WIDTH,
    y: (Y_AMOUNT - config.h - 1)*HEIGHT, // web坐标系 ==> 数学坐标系
    width: WIDTH,
    height: HEIGHT,
    fill: config.color,
    stroke: STROKE,
    strokeWidth: 1
  }
}



</script>
<style lang="scss" scoped>

</style>
