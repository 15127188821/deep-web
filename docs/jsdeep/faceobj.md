

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



+  在构造函数模式中，new Fn()执行，如果Fn不需要传参，后面的小括号可以省略

```js
function Fn(){}
var f = new Fn
```
+  this的问题，在类中出现的this.xxx = xxx中this都是当前类的实例，而某一个方法中的this，需要看方法执行的时候，前面是否有点才知道this是谁

```js
function Fn(){
    this.x = 100   //this为f
    this.say = function(){
        console.log(this.x)  //需要看say执行的时候才知道
    }
}
var f = new Fn
f.say()  //this为f   输出100
var ff = f.say
ff()  //方法中的this为window    输出undefined
```

+ 构造函数模式中，浏览器会默认将实例返回（一个对象数据类型的值），如果手动return 基本数据类型的，那么不会造成任何影响，若手动return 引用数据类型的，则会覆盖默认返回

在开发中尽量不要自己写return！

```js
function Fn1(){
    this.x = 100
}
var f1 = new Fn1  //f为{x:100}

function Fn2(){
    this.x = 100
    return 100
}
var f2 = new Fn2  //f2为{x:100}

function Fn3(){
    this.x = 100
    return {y:200}
}
var f3 = new Fn3  //f2为{y:200}
```

+ 检测某一个实例是否属于这个类**instanceof**

```js
function Fn(){}
var f = new Fn
f instanceof Fn   //true
f instanceof Array   //false
f instanceof Object   //true  因为所有实例都是对象数据类型的，而每一个对象数据类型都是Object这个内置类的一个实例，所以f也是它的一个实例
```

对于检测数据类型来说，typeof有自己的局限性，不能细分  对象、数组、正则

```js
var arr = []
arr instanceof Array   //true
```

+ 构造函数生成的多个实例之间都是相互独立的，所生成的属性都是实例的私有属性

```js
function Fn(){
    this.x = 100   //this为f
    this.say = function(){
        console.log(this.x)  //需要看say执行的时候才知道
    }
}
var f1 = new Fn
var f2 = new Fn
f1.say === f2.say    //false
```

+ isPrototypeOf

##### 扩展：

+ in：检测某一个属性是否属于这个对象，不管是私有属性还是公有属性，只要存在就返回true
+ hasOwnProperty：用来检测某一个属性是否属于这个对象的私有属性

```js
'say' in f1   //true  是它的属性
f1.hasOwnProperty('say')  //true  是它的私有属性
```

+ 检测一个属性是否为该对象的公有属性

```js
function hasPubProperty(obj,attr){
    //首先保证是它的一个属性，并且不是私有属性，那么只能是公有属性了
    return (attr in obj) && !obj.hasOwnProperty(attr)
}
hasPubProperty(f1,'say')  //false
```

## 原型链模式

构造函数模式中拥有了类和实例的概念，并且实例和实例之间是相互独立开的—>实例识别

```js
function Creatp(name,age){
    this.name = name;
    this.age = age;
}
Creatp.prototype.say = _=>{
    console.log(`I can weite js`)
}
var p1 = new Creatp('张三'，18)  
var p2 = new Creatp('李四'，28)  
p1.say === p2.say //true
```

### 解决问题

基于构造函数模式的原型模式解决了方法或者属性共有的问题，**把实例之间相同的属性和方法提取成共有的属性和方法，想要公有，就把方法放在prototype上即可**

#### 理解原型

+ 每一个函数数据类型（普通函数、类）都有一个自带的属性：prototype（原型），并且这个属性是一个对象数据类型的值
+ 并且在prototype上，浏览器给它加了一个属性constructor（构造函数），属性值是当前函数（类本身）
+ 每一个对象数据类型（普通对象、实例、prototype...）也天生自带一个属性：`__proto__`，这个属性值是当前实例所属类的原型（prototype）



```js
function Fn(){
    this.x = 100
}
Fn.prototype.say = function(){
    console.log(this.x)
}
var f1 = new Fn
var f2 = new Fn
//Fn作为一个类，具有prototype属性，在prototype上有一个constructor属性，这个属性指向本身Fn
//f1为对象数据类型，自带__ptoto__属性，这个属性值指向当前所属类Fn的原型Fn.prototype
//Fn的原型也是对象数据类型，它的__ptoto__属性指向Object的原型Object.prototype
console.log(Fn.prototype.constructor === Fn)  //true
```

**Object是所有对象数据类型的基类（最顶层的类）**

1. `f1 instancceof Object` 为true，因为`f1`通过`__proto__`向上级查找，不管多少级，最后总能找到Object
2. `Object.prototype`上没有`__proto__`属性

**原型链模式**
1.    `f1.hasWunProperty('x')`  hasWunProperty是f1的一个属性，但是在f1的私有属性上并没有这个方法，那书如何处理的呢
2.    通过 对象名.属性名的方式获取属性值的时候，首先在对象的私有属性上进行查找，如果私有属性有，则获取的就是私有的属性值
3.    如果私有的没有，那么通过`__proto__`找到所属类的原型（类的原型上定义的属性和方法，都是当前实例共有的属性和方法），原型上存在的话，获得的是共有的属性值
4.    如果原型上也没有，则继续通过原型上的`__proto__`继续向上查找，一直找到`Object.prototyper`为止

```js
//实际查找过程为
f1.__proto__.__proto__.hasWunProperty('x')
```



## 综合练习
```

```