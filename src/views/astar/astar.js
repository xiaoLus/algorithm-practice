class Astar {
  constructor(targetList, barrierList, rangeX, rangeY) {
    this.startNode = targetList[0];
    this.endNode = targetList[1];
    this.barrierList = barrierList;
    this.rangeX = rangeX;
    this.rangeY = rangeY;

    this.openList = {}; // { x3y4: {x:3, y:4, node: 'x3y4', preNode: 'x3y3', G: 50, evaluate: 30, done: 20, closed: false} }  G = evaluate + done
    this.closeList = {};
    
    this.UNIT_STRAIGHT = 10; // 沿直线路径移动单格的单位值

    this.goIndex = 0;
  }

  /**
   * 启动
   */
  run() {
    // openList注入起点
    let startNodeKey = `x${this.startNode.x}y${this.startNode.y}`; // 'x3y4'
    this.openList[startNodeKey] = {
      ...this.startNode,
      ...{
        node: startNodeKey,
        preNode: -1,
        G: this.getDistance(this.startNode, this.endNode),
        evaluate: this.getDistance(this.startNode, this.endNode),
        done: 0,
        closed: false,
      }
    }
    let endNodeDetail = this.go();

    // 从结束节点开始循环获取 preNode,生成路径
    let pathList = {};
    let currentNode = {...endNodeDetail};
    while( currentNode.preNode && currentNode.preNode != -1  ) {
      pathList[currentNode.node] = currentNode;
      currentNode = currentNode.preNode;
      continue;
    }
    return pathList;
  }

  go() {
    // 节点更新
    this.updateNode();

    // 判断openList里是否包含了终点
    if( this.openList[this.endNode.node] ) {
      this.closeList[this.endNode.node] = {...this.openList[this.endNode.node], closed: true};
      delete this.openList[this.endNode.node];
      return this.closeList[this.endNode.node];
    }else{
      return this.go();
    }
  }

  createRoundNodeList(preNode) {
    let returnList = {};
    // 计算x轴上的节点(左右节点)
    for(var i=-1; i>=-1 && i<=1 ; i++ ) {
      if( i == 0 ) continue;
      if( this.barrierList[`x${preNode.x+i}y${preNode.y}`] == 'barrier' ) continue; // 障碍物不计算
      let pos = {
        x: preNode.x + i,
        y: preNode.y, 
      }
      if( pos.x < 0 || pos.x >= this.rangeX ) continue;
      let roundNode = {
        x: pos.x,
        y: pos.y,
        node: `x${pos.x}y${pos.y}`,
        preNode: preNode,
        evaluate: this.getDistance(pos, this.endNode),
        done: preNode.done + this.UNIT_STRAIGHT,
        G: -1,
        closed: false,
      }
      roundNode.G = roundNode.evaluate + roundNode.done;
      returnList[`x${pos.x}y${pos.y}`] = roundNode;
    }
    // 计算y轴上的节点(上下节点)
    for(var j=-1; j>=-1 && j<=1 ; j++ ) {
      if( j == 0 ) continue;
      if( this.barrierList[`x${preNode.x}y${preNode.y+j}`] == 'barrier' ) continue; // 障碍物不计算
      let pos = {
        x: preNode.x,
        y: preNode.y + j, 
      }
      if( pos.y < 0 || pos.y >= this.rangeY ) continue;
      let roundNode = {
        x: pos.x,
        y: pos.y,
        node: `x${pos.x}y${pos.y}`,
        preNode: preNode,
        evaluate: this.getDistance(pos, this.endNode),
        done: preNode.done + this.UNIT_STRAIGHT,
        G: -1,
      }
      roundNode.G = roundNode.evaluate + roundNode.done;
      returnList[`x${pos.x}y${pos.y}`] = roundNode;
    }
    return returnList;
  }

  updateNode() {
    let minNode = this.searchMinNode();
    let roundList = this.createRoundNodeList(minNode);

    Object.keys(roundList).forEach( key=>{
      let roundNode = roundList[key];
      if( this.closeList[key] && this.closeList[key].closed == true ) return; // 节点已在closeList内,不再添加
      if( this.openList[key] ) { // 节点已在openList内,去判定G大小,如果G也相同,判断evaluate大小
        if( this.openList[key].G > roundNode.G ) {
          this.openList[key] = {...roundNode};
        }else if( this.openList[key].G == roundNode.G ) {
          if( this.openList[key].evaluate > roundNode.evaluate ) this.openList[key] = {...roundNode};
        }
      }else{
        this.openList[key] = {...roundNode};
      }
    });
    this.closeList[minNode.node] = {...this.openList[minNode.node], closed: true};
    delete this.openList[minNode.node];
  }

  searchMinNode() {
    let minNode = {}; // 保存最小 G 的节点
    Object.keys(this.openList).forEach( key=>{
      if( !minNode.G ) { // 首次minNode不存在
        minNode = this.openList[key];
        return;
      }
      this.openList[key].G < minNode.G
        ? minNode = this.openList[key]
        : '';
    })
    return minNode;
  }

  getDistance(node1, node2) {
    // node format {x:2, y:3}
    return this.UNIT_STRAIGHT*( Math.abs(node1.x - node2.x) + Math.abs(node1.y - node2.y) );
  }

  
}

export default Astar;