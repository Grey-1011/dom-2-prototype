// const api = jQuery('.test') // 不返回元素们，返回api对象
// api.addClass('red').addClass('blue')// 遍历所有刚才获取的元素，添加 .red
// 后面又写的 .addClass('blue') 因为返回的是api --return api,所以可以继续操作， 这叫链式操作
// 变量名api随便，不写也可以 
// jQuery对象，是jQuery构造出来的对象，也就是api

// jQuery('.test') //返回值并不是元素，而是一个api对象
//     .addClass('red')
//     .addClass('blue')
//     .addClass('green')

// jQuery('.test').find('.child')
// .addClass('red')
// .addClass('blue')
// .addClass('green')
// .end()
// .addClass('yellow')

// jQuery('.test').find('.child').each((div)=>console.log(div))

// const x = jQuery('.test').parent()
// x.print()
 
// const x = jQuery('.test').children()
// x.print()

$('.test').addClass('green')