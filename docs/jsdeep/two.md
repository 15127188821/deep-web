# 前端深入之Vue篇 丨如何在项目中优雅的使用Echarts（下）

## 写在前面

最近由于一些不可抗力因素，我跳槽去了一家做高校教育服务的公司，刚入职就正好赶上了**PC端项目的重构**，而我主要负责`数据可视化`这一模块，其实做起来不算复杂，但是在使用Echarts的过程中也踩到了一些坑。



这是vue项目实战echarts的下篇，还没有看过上篇的同学请点击这里进行查阅。经过了上一文章的学习， 相信你一定对如何在vue中使用echarts有了初步认识，可以在项目中熟练的绘制你想要的任何echart了。

上篇链接：[前端深入之Vue篇 丨如何在项目中优雅的使用Echarts（上）](https://juejin.im/post/5e1c80b5f265da3e43671365)

**还没有看过的小伙伴一定要先学习上篇练习一下呐~**



希望小伙伴阅读完之后可以在项目中**掌握Echarts正确的使用方式**，并且在我的基础上能够少踩一些坑。

在学习完上篇之后相信你一定会感觉很简单的，而真正做项目，我们的数据都是接口请求返回来的，如何将返回的数据展示到`Echarts`中呢，带着这个问题跟我一起来学习吧。

## 正文
 
为了保证小伙伴们都能够顺利进行，可以复制以下代码到data中，当做请求完之后的调用。

```js   
chartData = {
    attenceRate: 0.125,
    homewordRate: 0.125,
    topicRate: 0.125,
    starRate: 0.125,
    interactRate: 0.125,
    classAttenceRate: 0.125,
    classHomewordRate: 0.125,
    classTopicRate: 0.125,
    classStarRate: 0.125,
    classInteractRate: 0.125
};
```
由于上一篇我找的雷达图这个例子比较简单，所以我们依次把数据放进去就好，给出`option>series`的代码，小伙伴复制过去就可以了。
```js
series: [
    {
        type: "radar",
        data: [
            {
                value: [
                    this.userAnalycomplexEchart.attenceRate,
                    this.userAnalycomplexEchart.homewordRate,
                    this.userAnalycomplexEchart.topicRate,
                    this.userAnalycomplexEchart.starRate,
                    this.userAnalycomplexEchart.interactRate
                ],
                name: "学生个人"
            },
            {
                value: [
                    this.userAnalycomplexEchart.classAttenceRate,
                    this.userAnalycomplexEchart.classHomewordRate,
                    this.userAnalycomplexEchart.classTopicRate,
                    this.userAnalycomplexEchart.classStarRate,
                    this.userAnalycomplexEchart.classInteractRate
                ],
                name: "班级平均"
            }
        ]
    }
]
```
> 实际开发中只需要在接口请求完的`then`中调用`Echarts`绘制的方法就可以了。
#### 但是。。。

更多时候并不是这样直接填入就可以，比如折线图、柱状图等数据量很多的时候，接口返回给我们的常常是一个数组，我们需要准确取到数组的值`push`到对应的地方才可以。下面我以折线图为例进行展示。

```js
knowledgeChartData = [
    { timeDay: "01-08", knowledgeCount: 24 },
    { timeDay: "01-09", knowledgeCount: 23 },
    { timeDay: "01-10", knowledgeCount: 32 },
    { timeDay: "01-11", knowledgeCount: 43 },
    { timeDay: "01-12", knowledgeCount: 12 },
    { timeDay: "01-13", knowledgeCount: 53 },
];
```
首先给出接口数据，请你自行把它复制到`data`中。在下面我也给出你我页面中折线图`option`配置，同样你可以复制我的或者复制官方示例到自己的项目里。
```js
option = {
    tooltip: {
        trigger: "axis"
    },
    legend: {
        orient: "vertical",
        left: "5%",
        data: ["掌握情况"]
    },
    color: ["#FF507C"],
    grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
    },
    xAxis: {
        type: "category",
        boundaryGap: false,
        data: []
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                type: "dotted"
            }
        },
        nameTextStyle: {
            color: "#b5b8ba"
        },
        type: "value"
    },
    series: [
        {
            name: "掌握情况",
            smooth: true,
            type: "line",
            data: []
        }
    ]
};
```
OK，到这里你已经有了一个空的折线图了，通过阅读代码可以看到在`option`中分别有`xAxis`和`yAxis`，对应的分别是X轴和Y轴，而其中的`data`就是X轴和Y轴所对应的数据项。现在我们将`knowledgeChartData`的值拿出来，通过循环，将它们分别到对应的data中就可以了。
```js
 this.knowledgeChartData.map(i => {
     option.xAxis.data.push(i.timeDay);
     option.series[0].data.push(i.knowledgeCount);
 });
myChart.setOption(option);
```
在调整完`option`之后执行`setOption`，所有数据就能够正确显示到页面上了~

![](https://user-gold-cdn.xitu.io/2020/1/15/16fa9b269b0c60fa?w=881&h=363&f=png&s=16358)

当然，真实开发中还是会有各种各样的接口数据返回，更多时候返回的数据需要我们进行比对、拆分、整理、合并等步骤才能变成我们真正需要的数据结构。


## 结论

这篇文章主要是一个引子，让小伙伴们了解如何在vue项目中使用`Echarts`，并且真正能够在项目中使用简单的`Echarts`，更多更深入的就需要小伙伴们自己去研究了。

再对数据处理的时候免不了对数组的一些操作，如果有对数组的常用操作不了解的地方可以查看[这篇文章](https://juejin.im/post/5dbfbdc9e51d4557e847caff)，相信学完以后你就可以从容地将各种接口返回的数据处理成你想要的格式，从而可以在项目中使用各种Echarts了~



## 结语

以上就是本文章的全部内容了，如果有不正确的地方欢迎指正。

**感谢您的阅读，如果感觉有用不妨点赞/转发。**

前端深入系列是一个踩坑系列，是由我本人对工作和学习中所遇到的问题和踩过的坑的一个探索与总结，在此记录分享出去，同时也是对自我技能的一个反思和追问。

前端路漫，踩坑不断。

前端深入系列持续更新中……

以上2020-01-15。