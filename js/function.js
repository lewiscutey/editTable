// 元素获取方式和页面加载事件的简化
function $(selector,range){
	var range = range||document;
	if(typeof selector=="function"){
		// alert("页面加载");
		// window.onload = selector;
		addEvent(window,"load",selector);

	}
	if(typeof selector=="string"){
		// alert("获取元素");
		if(selector.charAt(0)=="#"){
			return range.getElementById(selector.substr(1));
		}
		if(selector.charAt(0)=="."){
			return getclassname(selector.substr(1),range);
		}
		if(/^[a-zA-Z][a-zA-Z1-6]{0,9}$/.test(selector)){
			return range.getElementsByTagName(selector);
		}
		if(/^<[a-zA-Z][a-zA-Z1-6]{0,9}>$/.test(selector)){
			return document.createElement(selector.slice(1,-1));
		}
	}
}





//类名获取方式兼容IE6—8支持classname 
function getclassname (classname,range) {                      //第一个参数是类名，第二个是范围
	
	if(document.getElementsByClassName){                       // 判断浏览器是否支持这个方法
		// alert("支持"); 
		return range.getElementsByClassName(classname);        //返回warp
	}else{
	// alert("不支持"); 
	var all = range.getElementsByTagName('*');
	// console.dir(all);
	var arr = [];
	for (var i = 0; i < all.length; i++) {
		if(checkName(all[i].className,classname)){
			arr.push(all[i]);
		}
	}
	// console.dir(arr);	
	return arr;
	}
// checkName方法1
// function checkName(tagname,classname){
// 	var arr = tagname.split(" ");
// 	for (var i = 0; i < arr.length; i++) {
// 		if(arr[i]==classname){
// 			return true;
// 		}
// 	}
// 	return false;
// } 
// checkName方法2

}
function checkName(tagname,classname){
		if(tagname.match(classname)){
			return true;
		}
		return false; 
	}


//兼容IE6—8支持textContent属性 
function getText(obj,texts){
	if(texts!=undefined){
		if(obj.textContent!=undefined){
			obj.textContent = texts;
		}else{
			obj.innerText = texts;
		}
	}else{
		if(obj.textContent!=undefined){
			return obj.textContent;
		}else{
			return obj.innerText;
		}
	}
	
}

//兼容行内样式和外部样式通用的获取方法:
function getAttr(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return window.getComputedStyle(obj,null)[attr];
	}
}

// 解决兼容获取的子节点的引用   （不包含  换行和注释）
function getChilds(obj){
	var childs = obj.childNodes;
	var newArr = [];
	for (var i = 0; i < childs.length; i++) {
		if(!((childs[i].nodeType==8)||(childs[i].nodeType==3&&trim(childs[i].nodeValue)==""))){
			newArr.push(childs[i]);
		}
	}
	return newArr;
}

// 把字符串中的前后空格替换为空的字符串
function trim(str){
	return str.replace(/^\s+|\s+$/g,"");
}

// 获取第一个子节点的引用
function getFirstChild(obj){
	return getChilds(obj)[0];
}

// 获取最后一个子节点的的引用
function getLastChild(obj){
	var last = getChilds(obj);
	return last[last.length-1];
}

//nextSibling 获得下一个兄弟节点的引用
function getNextSibling(obj){
	var next = obj.nextSibling;
	if(!next){
		return false;
	}
	while((next.nodeType==8)||(next.nodeType==3&&trim(next.nodeValue)=="")){
		next = next.nextSibling;
		if(!next){
			return false;
		}
	}
	return next;
}

//previousSibling 获得上一个兄弟节点的引用
function getPreviousSibling(obj){
	var pre = obj.previousSibling;
	if(!pre){
		return false;
	}
	while(((pre.nodeType==8)||(pre.nodeType==3&&trim(pre.nodeValue)==""))){
		pre = pre.previousSibling;
		if(!pre){
			return false;
		}
	}
	return pre;
}

// 父对象.insertBefore(要插入的对象,之前的对象) 插入到某个对象之前
function insertBefore(obj1,obj2){
	var parent = obj2.parentNode;
	parent.insertBefore(obj1,obj2);
}

// 父对象.insertAfter(要插入的对象,之后的对象) 插入到某个对象之后
function insertAfter(obj1,obj2){
	var parent = obj2.parentNode;
	var next = getNextSibling(obj2);
	if(next){
		parent.insertBefore(obj1,next);
	}else{
		parent.appendChild(obj1);
	}
	
}

// 删除节点  父对象.removeChild(删除的对象)
function removeChild(obj){
	var parent = obj.parentNode;
	parent.removeChild(obj);
	obj = null;
}

// 兼容获取滚动条的scrollTop值
function scrollTops(){
	return document.body.scrollTop||document.documentElement.scrollTop;
}

// 兼容同一个事件可以绑定多个处理程序  添加
function addEvent(obj,event,callback){
	if(obj.addEventListener){
		return obj.addEventListener(event,callback);
	}else{
		// obj.handle = function(){
		// 	callback.call(obj);
		// }
		return obj.attachEvent("on"+event,callback);
	}
}

// 兼容同一个事件可以绑定多个处理程序  删除
function delEvent(obj,event,callback){
	if(obj.removeEventListener){
		return obj.removeEventListener(event,callback);
	}else{
		// obj.handle = function(){
		// 	callback.call(obj);
		// }
		return obj.detachEvent("on"+event,callback);
	}
}

// 兼容浏览器关于鼠标滚轮的事件
function mouseWheel(obj,upcallback,downcallback){
	if(document.attachEvent){
		obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
	}else if(document.addEventListener){
		obj.addEventListener("mousewheel",scrollFn,false);//chrome,safari -webkit-
		obj.addEventListener("DOMMouseScroll",scrollFn,false);//firefox -moz-
	}

	function scrollFn(e){
		var event = e || window.event;
		var dir = event.wheelDelta || event.detail;
		if(event.preventDefault){
			event.preventDefault(); //阻止默认浏览器动作(W3C)
		}else{
			event.returnValue = false;//IE中阻止函数器默认动作的方式
		}
		if(dir==120||dir==-3){
			return upcallback.call(obj);
		}else if(dir==-120||dir==3){
			return downcallback.call(obj);
		}	
	}
}









