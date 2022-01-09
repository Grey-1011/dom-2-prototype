window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
    let elements
    if (typeof selectorOrArrayOrTemplate === 'string') {
        if (selectorOrArrayOrTemplate[0] === '<') {
            //创建div
            elements = [createElement(selectorOrArrayOrTemplate)]
        } else {
            // 查找div
            elements = document.querySelectorAll(selectorOrArrayOrTemplate)
        }
    } else if (selectorOrArray instanceof Array) {
        elements = selectorOrArray
    }
    function createElement(string) {
        const container = document.createElement('template')
        container.innerHTML = string.trim()
        return container.content.firstChild
    }

    const api = Object.create(jQuery.prototype)// 创建一个对象，这个对象的__proto__为括号里的东西
    // 等价于 const aip = {__proto__:jQuery.prototype}
    Object.assign(api, {
        elements: elements,
        oldApi: selectorOrArrayOrTemplate.oldApi
    })
    // api.elements = elements
    // api.oldApi = selectorOrArrayOrTemplate.oldApi
    return api
};


jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    jQuery: true,
    get(index) {
        return this.elements[index]
    },
    appendTo(node) {
        if (node instanceof Element) {
            this.each(el => node.appendChild(el))//遍历elements,对每个el,进行node.appendChild 操作
        } else if (node.jQuery === true) {
            this.each(el => node.get(0).appendChild(el))// 遍历elements,对每个el,进行node.get(0).appendChild(el) 操作
        }
    },
    append(children) {
        if (children instanceof Element) {
            this.get(0).appendChild(children)
        } else if (children instanceof HTMLCollection) {
            for (let i = 0; i < children.length; i++) {
                this.get(0).appendChild(children[i])
            }
        } else if (children.jQuery === true) {
            children.each(node => this.get(0).appendChild(node))
        }
    },
    // 闭包： 函数访问外部变量
    addClass(className) {
        for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.add(className) // 遍历elements 给每个el添加className
        }
        return this  // this就是api
    },
    find(selector) {
        let array = []
        for (let i = 0; i < elements.length; i++) {
            const elements2 = Array.from(this.elements[i].querySelectorAll(selector))
            array = array.concat(elements2)
        }
        array.oldApi = this // this 就是 旧api
        return jQuery(array) // const newApi = jQuery(array) return newApi
    },
    each(fn) {
        for (let i = 0; i < elements.length; i++) {
            fn.call(null, elements[i], i)
        }
        return this // this 就是api 对象
    },
    parent() {
        const array = []
        this.each((node) => {
            if (array.indexOf(node.parentNode) === -1) {
                array.push(node.parentNode)
            }
        })
        return jQuery(array)
    },
    children() {
        const array = []
        this.each((node) => {
            array.push(...node.children) // 展开操作符 ...
        })
        return jQuery(array)
    },
    print() {
        console.log(elements)
    },
    end() {
        return this.oldApi // this 是 新api
    }
}
