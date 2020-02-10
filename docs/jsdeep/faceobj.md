

# 面向对象编程

## 单例模式
```js
var num = '张三'
var age = 18

var num = '李四'
var age = 28

console.log(num,age) //李四 28
```

### 解决问题：

对象数据类型的作用：把描述同一个事物（对象）的属性和方法放在一个内存空间下，起到了分组的作用，这样不同事物之间的属性即使属性名相同，相互也不会发生冲突

**这种分组编写代码的模式就叫做“单例模式”**

```js
var p1 = {
    num = '张三'
    age = 18
}
var p2 = {
    num = '李四'
    age = 28
}
console.log(p1.name,p2,name) //张三  李四
//其中的p1 p2 称为命名空间
```

单例模式是一种项目开发中经常使用的模式，因为在项目中我们可以使用单例模式来进行**模块化开发**

**模块化开发**：对于一个相对来说比较答得项目，需要多人协同开发的，一般这种情况下回根据当前项目的需求划分成几个功能模块，每个人负责一部分，同时开发，最后把每个人的代码进行合并

```js
var utils = {
    select: function () {

    }
}

var tabRender = {
    change: function () {
        utils.select() //在自己命名空间下调用其他命名空间的方法
    }
}

var searchReander = {
    change: function () {
        this.clickEven() //在自己命名空间下调用自己命名空间的方法
    },
    clickEven: function () {

    }
}

tabRender.change()   //互不影响
searchReander.change() //互不影响
```

## 工厂模式

## 构造函数模式

## 原型链模式

## 综合练习