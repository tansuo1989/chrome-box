// 来自： https://github.com/JChehe/simple_browser_gesture
//感谢作者：@JChehe 
//根据需要，作了少量修改


function BrowserGesture() {
    this.TOLERANCE = 10 // 生成指令的阈值
    this.instructionSet = []
    this.isMouseDown = false
    this.temCanvas = null
    this.lineWidth = 3
    this.fillStyle = 'red'
    this.isShowPath = true
  
    this._init()
  }
  
  BrowserGesture.prototype = {
    _init: function() {
      this._bindEvent()
    //   console.log("init") //疑问：每点击一次，就会多绑定一次，为什么？
    },
  
    _bindEvent: function() {
      var self = this
      document.body.addEventListener('mousedown', function(e) {
        self._clickDownHandle(e)
      }, false)
  
      document.body.addEventListener('mousemove', function(e) {
        self._mouseMoveHandle(e)
      }, false)
  
      document.body.addEventListener('mouseup', function(e) {
        self._mouseUpHandle(e)
      }, false)
    },
  
    _clickDownHandle: function(e) {
      var temCanvas, ctx
  
      // 右键时
      if (e.which === 3) {
        if (this.temCanvas !== null) {
          try {
            document.body.removeChild(this.temCanvas)
            temCanvas = null
          } catch (e) {
            console.log(e)
          }
        }
        document.body.addEventListener("contextmenu",function(e){
            e.returnValue = true;
            // console.log("右键恢复",e)
        })
        var txt = window.getSelection().toString();
        if(txt){return;} //当选择文本后，显示右键菜单

        temCanvas = this.temCanvas = document.createElement('canvas')
        ctx = this.ctx = temCanvas.getContext('2d')
        temCanvas.width = Math.max(document.documentElement.scrollWidth, window.innerWidth);
        temCanvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
        temCanvas.style = 'position: fixed; left: 0; right: 0; top: 0; bottom: 0;'
        document.body.appendChild(temCanvas)

        var canvasMouse = this._windowToCanvas(temCanvas, e.clientX, e.clientY);//这里应该使用clientX而不是pageX
  
        this.lastX = canvasMouse.x
        this.lastY = canvasMouse.y
  
        this.isMouseDown = true
  
        if (this.isShowPath) {
          ctx.moveTo(this.lastX, this.lastY)
        }
      }
    },
  
    _mouseMoveHandle: function(e) {
      var temCanvas, ctx, direction, canvasMouse, curX, curY, dx, dy, lastDirection
  
      if (this.isMouseDown) {
        temCanvas = this.temCanvas
        ctx = this.ctx

        canvasMouse = this._windowToCanvas(temCanvas, e.clientX, e.clientY);//上同

        curX = canvasMouse.x
        curY = canvasMouse.y
  
        if (this.isShowPath) {
          ctx.lineTo(curX, curY)
          ctx.lineWidth = this.lineWidth
          ctx.strokeStyle = this.fillStyle
          ctx.stroke()
        }
  
        dx = Math.abs(curX - this.lastX)
        dy = Math.abs(curY - this.lastY)
  
        if (dx < this.TOLERANCE && dy < this.TOLERANCE) return;
  
  
        if (dx > dy) {
          direction = curX > this.lastX ? 'R' : 'L'
        } else {
          direction = curY > this.lastY ? 'D' : 'U'
        }
  
        lastDirection = this.instructionSet[this.instructionSet.length - 1]
  
        if (lastDirection !== direction) {
          this.instructionSet.push(direction)
        }
  
        this.lastX = curX
        this.lastY = curY
      }
    },
  
    _mouseUpHandle: function(e) {
      if (this.instructionSet.length !== 0) {
          this._performAction(e)
      }
      this.isMouseDown = false
      this.instructionSet.length = 0
  
      if (this.temCanvas) {
        try {
          document.body.removeChild(this.temCanvas)
          this.temCanvas = null
        } catch (e) {
          console.log(e)
        }
      }
    },

    _windowToCanvas: function(canvas, x, y) {
      var bbox = canvas.getBoundingClientRect();
      return {
        x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
      }
    },
    _performAction: function(e) {
        var gesture=this.instructionSet.join("");
        var action=false;
      switch (gesture) {
        case 'L':
          this.chrome_toback();
          action=true;
          break;
        case 'DR':
          this.chrome_close();
          action=true;
          break;
        case 'U':
          this.chrome_totop();
          action=true;
          break;
        case 'D':
          this.chrome_tobottom();
          action=true;
          break;
        default:
            // console.log('未指定该指令的执行操作2：',gesture)
      }
      if(action){
        document.body.addEventListener("contextmenu",function(e){
            e.returnValue = false;
            // console.log("右键禁用",e)
        })
      }
    },
  }

  