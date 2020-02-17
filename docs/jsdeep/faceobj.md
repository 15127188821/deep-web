

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

```js
var p1 = {
    num: '张三',
    age: 18,
    say: _ => {
        console.log(`我是${num}，年龄为${age}`)
    }
}
var p2 = {
    num: '李四',
    age: 28,
    say: _ => {
        console.log(`我是${num}，年龄为${age}`)
    }
}
```

### 解决问题：

单利模式虽然解决了分组的作用，但是不能实现批量的生产，属于手工作业模式

**把实现同一件事情的相同的代码放到一个函数中，以后如果需要实现这个功能，不需要重新编写这些代码，只需要执行这个函数即可，这种模式就叫做“工厂模式”，也叫函数的封装**

```js
function creatp(name,age){
    var obj = {}
    obj.name = name;
    obj.age = age;
    obj.say = _=>{
        console.log(`我是${num}，年龄为${age}`)
    }
    return obj
}
var p1 = creatp('张三'，18)
var p2 = creatp('李四'，28)
p1.say()
p2.say()
```

实现了“低耦合高内聚”：减少页面冗余代码，提高代码的重复利用率

## 构造函数模式

###  基础篇

构造函数模式的目的就是为了创建一个自定义类，并且创建这个类的实例

```js
function Creatp(name,age){
    this.name = name;
    this.age = age;
    this.say = _=>{
        console.log(`我是${this.num}，年龄为${this.age}`)
    }
}
var p1 = new Creatp('张三'，18)  //实例this为p1  p1 = {name: "张三", age: 18, say: ƒ}
var p2 = new Creatp('李四'，28)  //实例this为p2  p2 = {name: "李四", age: 28, say: ƒ}
var p3 = Creatp('王五'，38)  //这样写不是构造函数模式执行，而是普通函数执行，由于没有写return，若依p3=undefined，并且creatp这个放大中的this为window
```

#### 构造函数模式和工厂模式的区别：

+ 执行的时候
  + 普通函数执行**`var p1 = creatp()`**
  
  + 构造函数模式**`var p1 = new Creatp()`**   通过new执行后，`Creatp`就是一个类了，
  
  + 而函数执行的返回值`p1`就是`Creatp`这个类的一个实例
  
  + ```js
    var arr = []  //字面量方式
    var arr = new Array()  //构造函数模式执行方式
    ```
  
+ 在函数代码执行的时候

  + 相同：都是形成一个私有的作用域，然后  形参赋值--变量提升--代码从上到下赋值（类和普通函数一样，也有普通的一面）
  + 不同：
    + 在代码执行之前，不用自己手动创建对象了，浏览器会默认创建一个对象数据类型的值（这个对象其实就是当前类的一个实例）。
    + 接下来代码从上到下执行，以当前实例为执行的主体（this代表的就是当前的实例），然后分别的把属性名和属性值赋值给当前的实例。
    + 最后，浏览器会默认的把创建的实例返回，此时`p1 = {name: "张三", age: 18, say: ƒ}`

#### 知识点：

1. JS中所有的类都是函数数据类型的，它通过new执行变成了一个类，但是它本身也是一个普通的函数 `typeof Creatp() => function`

   JS中所有的实例都是对象数据类型的`typeof p1 => object`

2. 在构造函数当中，类中（函数体中）出现的`this.XXX = XXX`中的this，是当前类的一个实例，是当前实例的私有属性，实例和实例是单独的个体，所以私有属性之间永远是不想等的

3. 两个实例都拥有`say()`方法，但是不同势力之间的方法是不相等的`console.log(p1.say === p2.say)`结果为`false`，就好像人类是一个类，张三和李四是两个实例，他们都是单独的个体



```js

```

### 扩展篇：

单利模式虽然解决了分组的作用，但是不能实现批量的生产，属于手工作业模式

**把实现同一件事情的相同的代码放到一个函数中，以后如果需要实现这个功能，不需要重新编写这些代码，只需要执行这个函数即可，这种模式就叫做“工厂模式”，也叫函数的封装**

```js
function creatp(name,age){
    var obj = {}
    obj.name = name;
    obj.age = age;
    obj.say = _=>{
        console.log(`我是${num}，年龄为${age}`)
    }
    return obj
}
var p1 = creatp('张三'，18)
var p2 = creatp('李四'，28)
p1.say()
p2.say()
```

实现了“低耦合高内聚”：减少页面冗余代码，提高代码的重复利用率

## 原型链模式

## 综合练习