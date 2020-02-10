

# 变量提升作用域this原理及应用

## 变量提升
+ 当浏览器加载HTML页面的时候，首先会提供一个供全局JS代码执行的环境**全局作用域（global/window）**
+ 在当前作用域中，JS代码执行之前，浏览器会默认把所有var和function进行提前声明或定义

  - 声明（declare）`var num `;   告诉浏览器在全局作用域声明一个num变量，此时默认值为`undefined`
  - 定义（defined）`num = 12;` 给变量进行赋值
  - var 在变量提升时候只是提前声明
  - function在变量提升中`声明`和`定义`都会完成
+ 变量提升只发生在当前作用域下，页面开始执行时只对window下的进行变量提升，只有函数执行的时候才会对函数内部进行变量提升
+ 只有var的会变量提升，提前执行不会报错，没有var的是给window增加一个属性名，所以提前执行会报错

```js
console.log(num)    //undefined
var num = 10
console.log(num2)   //Uncaught ReferenceError: num2 is not defined
num2 = 10
```

### 练习题

1.不管条件是否成立，var声明的都要进行变量提升

```js
if(!(num in window)){  //num in window == true
    var num = 12  
}
console,log(num)  //undefined
```

2.变量提升的时候只会提升等号左边，右边的是值，不会进行变量提升

```js
//匿名函数之函数表达式：吧函数定义的部分当做一个值赋值给变量/元素的事件
fn()
//fn变量提升了  变量提升后var fn = undefined  => fn() == undefined()
var fn = function(){
    console.log('ok')  //Uncaught TypeError: fn is not a function
}
```

变量提升后`var fn = undefined`  => `undefined()`报错

3.自执行函数定义的function在全局作用域下不进行便利提升，当代码执行到时定义和执行同时完成

```js
(function (num) { console.log(num) })(100)
~ function (num) { console.log(num) }(100)
+ function (num) { console.log(num) }(100)
- function (num) { console.log(num) }(100)
! function (num) { console.log(num) }(100)
```

4.函数体中return下面的代码虽然不会执行，但是仍然会变量提升；return的内容是返回的值，这个值不进行变量提升

```js
function fn(){
    //num变量提升了  var num = undefined
    console.log(num) // undefined
    return function(){}
    var num = 100
}
fn()
```

5.变量提升的时候，如果名字声明过了，那么不需要重新声明，但是需要重新赋值

```js
//变量提升 var fn => window.fn = undefinde   fn = xxxfff000 => window,fn = xxxfffooo
var fn = 100
function fn(){
    console.log('ok')
}
fn() //Uncaught TypeError: fn is not a function
```

```js
//变量提升
//声明+定义 fn = xxxfff000
//声明var fn (不需要重新声明)
//声明（不重复进行）+定义 fn=xxxfff111
fn() //2
function fn(){console.log(1)}
fn() //2
var fn = 10
fn() //Uncaught TypeError: fn is not a function
function fn(){console.log(2)}
fn()
```

## JS中的内存

栈内存：用来提供一个供JS代码执行的环境（全局作用域，私有作用域）

堆内存：用来存储引用数据类型的值（对象存储的属性名和属性值、函数存储的代码字符串等）

## 私有变量和全局变量

+ 在全局作用域下圣诞的变量是全局变量

+ 在私有作用域下声明的变量和函数的形参都是私有变量

在私有作用域中，代码执行的时候遇到了一个变量，首先要确定是否为私有变量，如果是私有变量，那么和外面的变量没有任何关系；如果不是私有的，则往当前作用域的上级进行查找，如果上级作用域也没有则继续查找，一直到window为止（作用域链）

## 函数执行过程

+ 首先会形成一个新的私有的作用域
+ 如果有形参，先给形参赋值
+ 进行私有作用域中的变量提升
+ 私有作用域中的代码从上到下执行

**闭包**：函数形成一个新的私有作用域保护了里面的私有变量不受外界的干扰（外面修改不了私有的，私有的也修改不了外面的）

```js
console.log(total)  //undefined   变量提升默认赋值为undefined
var tatal = 0
function fn(num1, num2) {
    console.log(total)   //0   total不是私有的，找到全局的total值为0
    total = num1 + num2   // 修改了全局total=300
    console.log(total)   //300   total不是私有的，找到全局的total值为300
}
fn(100, 200)
console.log(total)  //300
```

## 内存释放和作用域销毁

### 堆内存

对象数据类型或者函数数据类型在定义的时候首先会开辟一个堆内存，堆内存有一个引用的地址，如果外面有变量等是用来这个地址，那么就是内存被占用了，就不能被销毁了

当需要堆内存释放、销毁的时候，只需要把所有引用到它的变量值赋值为null即可，如果当前堆内存没有任何东西被占用了，那马浏览器会在空闲的时候把它销毁

### 栈内存

全局作用域：只有当页面关闭的时候全局作用域才会销毁

私有作用域（只有函数执行才会产生私有作用域）：

+ 一般情况下，函数执行会形成一个新的私有作用域，当私有作用域被内存以外的东西占用了，那么这个作用域就不能销毁了
+ 函数执行返回了一个引用数据类型的值，并且在函数外面被一个其他的东西给接收了，这种情况下一般形成的私有作用域都不会销毁

```js
function fn(){
	var num = 100
	return function(){}
}
var f = fn()  //fn执行形成的这个私有作用域就不能再销毁了
```
+ fn返回的函数没有被其他的东西占用，但是还需要执行一次，所以暂时不销毁，当返回的值执行完成后，浏览器会在空闲的时候把他销毁掉
```js
function fn(){
	var num = 100
	return function(){}
}
var f = fn()()  //fn执行，返回一个小函数对应的内存地址，然后紧接着让返回的小函数再执行
```

### 练习题

```js
function fn(){
    var i = 10
    return function (n) {
        console.log(n + (++i))
    }
}
var f = fn()
f(10)  //21
f(20)  //32
fn()(10)  //21
fn()(20)  //31
```

```js
function fn(i){
    return function (n) {
        console.log(n + i++)
    }
}
var f = fn(13)
f(12)  //25
f(14)  //28
fn(15)(12)  //27
fn(16)(13)  //29
```

## this指向

JS中的this代表的是当前行为执行的主体；JS中的context代表的是当前行为执行的环境（区域）

> 例：不是酸柠檬在GitHub写博客，this：不是酸柠檬    context：GitHub

this是谁和函数在哪里定义在哪里执行的都没有任何关系

### 如何区分this？

+ 函数执行首先看函数名前是否有**"."**，有的话点前面是谁，this就是谁，没有的话this就是window

```js
function fn(){
    console.log(this)
}
var obj = {fn:fn}
fn() //window
obj.fn() //obj
function sum(){
    fn() 
}
sun() //window
var cc = {
    sum:function(){
        fn() 
    }
}
cc.sum() //window
```
+ 自执行函数的this永远是window
```js
~function fn(){console.log(this)}()  //window
```

+ 给元素的某一个事件绑定方法，当时间触发的时候，执行对应的方法，方法中的this是当前的元素

```html
<div id="click">
    click me!
</div>
<script>
function fn(){
    console.log(this)
}
document.querySelector('#click').onclick = fn
//<div id="click">click me!</div>
document.querySelector('#click').onclick = function(){fn()}
//window
</script>
```

## 综合练习

```js
var num = 20
var obj = {
    num: 30,
    fn: (function (num) {
        this.num *= 3
        num += 15
        var num = 45
        return function () {
            this.num *= 4
            num += 20
            console.log(num)
        }
    })(num) //num值是全局变量中的20，而不是obj下面的30，如果想赋值obj下面的应该写obj.num
}
var fn = obj.fn
fn() //65
obj.fn() //85
console.log(window.num,obj.num) //240,120
```

![img](/jsimages/001.png)

