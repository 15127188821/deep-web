# 前端深入之Vue篇 丨如何在项目中优雅的使用Echarts（上）
## 写在前面

最近由于一些不可抗力因素，我跳槽去了一家做高校教育服务的公司，刚入职就正好赶上了**PC端项目的重构**，而我主要负责`数据可视化`这一模块，其实做起来不算复杂，但是在使用Echarts的过程中也踩到了一些坑。

所以有了这一文章，这一文章分为上下两篇

下篇地址：[前端深入之Vue篇 丨如何在项目中优雅的使用Echarts（下）](https://juejin.im/post/5e1f2658e51d45026a436aef)

在本篇中我将主要介绍

* 如何在vue项目中使用Echarts
* 如何确保Echarts在页面中正常显示并可随窗口变化

希望小伙伴阅读完之后可以在项目中**掌握Echarts正确的使用方式**，并且在我的基础上能够少踩一些坑。

话不多说，让我们开始吧。

## 在vue项目中使用Echarts
#### 安装

安装其实是比较简单的，直接在项目中打开命令行工具，执行`npm install echarts --save` 也可简写为`npm i echarts -S`，即将Echarts安装到项目生产环境中。

安装完成之后我们需要打开`main.js`文件，在上边找一个位置进行引入`Echarts`，并将其挂载到vue的原型中，具体代码如下

```js
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
```

#### 使用

在简单安装并挂载原型之后，我们即可在所需要的页面直接使用的。

首先我们要建立一个容器，一个可以放置Echarts的空div

```html
<div ref="myChart" style="width:100%;height:520px" id="myChart"></div>
```

> 在这里我使用了`ref`来获取DOM节点，主要是为了避免Echarts的容器还没有生成就进行初始化。

创建完容器之后即可使用数据对Echarts进行渲染了，为了方便各位小伙伴，我在此贴一个公共代码，需要在项目中使用Echarts的小伙伴可以直接复制啦~

```js
mounted(){
	this.setMyEchart()  //页面挂载完成后执行
},
methods: {
    setMyEchart() {
        const myChart = this.$refs.myChart;  //通过ref获取到DOM节点
        if (myChart) {
            const thisChart = this.$echarts.init(myChart);  //利用原型调取Echarts的初始化方法
            const option = {};  //{}内写需要图表的各种配置，可以在官方案例中修改完毕后复制过来
            thisChart.setOption(option);  //将编写好的配置项挂载到Echarts上
            window.addEventListener("resize", function() {
                thisChart.resize();  //页面大小变化后Echarts也更改大小
            });
        }
    }
}
```

## 使Echarts在页面中正常显示

在基本结构写完之后，就可以去[Echarts官方示例](https://www.echartsjs.com/examples/zh/index.html)找到你所需要的图，复制`option`中的内容粘贴到页面中`option对象`中即可。

这里我以[雷达图](https://www.echartsjs.com/examples/zh/editor.html?c=radar)为例进行展示，当我粘贴完代码之后页面是这样子的。



![](https://user-gold-cdn.xitu.io/2020/1/14/16fa1b083abc8e07?w=352&h=287&f=png&s=8779)

宽度只有`100px`，其实这是因为Echarts不识别百分比制，所以就会把100%识别为100px。当我们修改了浏览器宽高之后，触发` thisChart.resize();`，图表也就能正常显示了，但是我们不能在用户进来之后就改变浏览器宽高，官方建议我们给Echarts容器设置具体宽高以保证显示，这显然不是一个很好的适配方案。

所以我们应该设置**动态的宽**：这一步我们首先要有一个宽度参照物（这个参照物可以是百分比的宽，因为我们在获取宽的时候会被转化成真正的像素宽），参照物可以是`chart的wrap`，也可以是相邻宽度相同的DOM节点。

![](https://user-gold-cdn.xitu.io/2020/1/14/16fa1af129876786?w=374&h=520&f=png&s=28503)
拿我的页面举例，获取下面这一块的宽度，假设这个div的类名为`content`，那么我们可以编写如下代码

```js
document.querySelector('#myChart').style.width =  document.querySelector('.content').clientWidth
```

这样就可以在一开始设置到具体的宽了，同时在变话浏览器宽高后也能够自适应的更改。

至于内容自己找到需要的进行修改就好，更多配置项可以参考[这个链接](https://www.echartsjs.com/zh/option.html)进行学习。

## 结论

经过以上的学习，相信你已经初步了解了`Echarts`的用法，其实算是比较简单的，重要的还是你想要展现什么，选择好之后复制到我们的模板中就可以了。

在下篇中我将主要介绍如何将api接口返回的数据填充到Echarts中。

[前端深入之Vue篇 丨如何在项目中优雅的使用Echarts（下）](https://juejin.im/post/5e1f2658e51d45026a436aef)

最后给出所有的代码吧，供你参考。

```js
<div ref="myChart" style="width:100%;height:520px" id="myChart"></div>
<div class="content"></div>
<script>
mounted() {
    document.querySelector("#myChart").style.width = document.querySelector(".content").clientWidth;
    this.setMyEchart();
  },
  methods: {
      setMyEchart() {
        const myChart = this.$refs.myChart;  //通过ref获取到DOM节点
        if (myChart) {
            const thisChart = this.$echarts.init(myChart);  //利用原型调取Echarts的初始化方法
            const option = {
          tooltip: {
            confine: true,
            enterable: true //鼠标是否可以移动到tooltip区域内
          },
          legend: {
            // top : '96%',                    // 图例距离顶部边距
            textStyle: {
              coFlor: "#202124",
              fontWeight: "bold",
              fontSize: "14"
            },
            data: ["学生个人", "班级平均"]
          },

          calculable: true,
          color: ["#00CA90", "#4285F4"],
          radar: {
            name: {
              textStyle: {
                color: "#fff",
                backgroundColor: "#999",
                fontSize: "10",
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              { name: "出勤率", max: 1 },
              { name: "作业提交率", max: 1 },
              { name: "话题参与率", max: 1 },
              { name: "表现得星数", max: 1 },
              { name: "互动参与率", max: 1 }
            ],
            radius: 80
          },
          series: [
            {
              type: "radar",
              data: [
                {
                  value: [
                      0.85,0.94,0.24,0.56,0.23
                  ],
                  name: "学生个人"
                },
                {
                  value: [
                    0.90,0.85,0.37,0.85,0.52
                  ],
                  name: "班级平均"
                }
              ]
            }
          ]
        };  //这里是我配置好的一个雷达图，你可以复制到echart示例网查看效果
            thisChart.setOption(option);  //将编写好的配置项挂载到Echarts上
            window.addEventListener("resize", function() {
                thisChart.resize();  //页面大小变化后Echarts也更改大小
            });
        }
      }
    }
  }
</script>
```




## 结语

以上就是本文章的全部内容了，如果有不正确的地方欢迎指正。

**感谢您的阅读，如果感觉有用不妨点赞/转发。**

前端深入系列是一个踩坑系列，是由我本人对工作和学习中所遇到的问题和踩过的坑的一个探索与总结，在此记录分享出去，同时也是对自我技能的一个反思和追问。

前端路漫，踩坑不断。

前端深入系列持续更新中……

以上2020-01-13。