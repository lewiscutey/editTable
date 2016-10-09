
$(function(){
	var studentinfo = [{num:1001,name:"张三",sex:"男",age:21},{num:1002,name:"李思",sex:"女",age:20}];
	var box = $("#box");
	var tbody = $("tbody",box)[0];
	var btn = $(".btn",box)[0];
	var btns = $("button",btn);
	var index = 0;
	var str = "";

	// 创建一条学生信息
	function createTr(obj){
		index++;
		var str = "";
		str += "<tr class="+(index-1)+"><td><input class='check' type='checkbox'>"+index+"</td>";
		for(var i in obj){
			str += "<td class="+i+" attr='alter' >"+obj[i]+"</td>";
		}
		str += "</tr>";
		return str;
	}
	
	// 往表里增加新信息           
	function addTr(){
		index=0;
		var str="";
		for(var i=0;i<studentinfo.length;i++){
			str+=createTr(studentinfo[i]);
		}
		tbody.innerHTML=str;
	}

	// 把数组里的原来的对象放到str上    *查询*
	btns[3].onclick = function(){
		for (var i = 0; i < studentinfo.length; i++) {
			str += createTr(studentinfo[i]);
		}
		tbody.innerHTML = str;
	}

	// 添加按钮事件   *增加*
	btns[0].onclick = function(){
		studentinfo.push({
			sno:"",
			name:"",
			sex:"",
			age:""
		})
		addTr();
	}
	
	// 修改事件
	tbody.onclick = function(e){
		var ev = e || window.event;
		var evl = ev.target || ev.srcElement;
		if(!(evl.nodeName=="TD"&&evl.getAttribute("attr")=="alter")){
			return;
		}else{
			var val = evl.innerHTML;
			input = $("<input>");
			input.value = evl.innerHTML;
			evl.innerHTML = null;
			evl.appendChild(input);
			input.focus();

			input.onblur = function(){
				var v = input.value;
				var par = evl.parentNode.className;
				var attrs = evl.className;
				evl.removeChild(input);
				input = null;
				evl.innerHTML = v;
				if(val!=v){
					studentinfo[par][attrs] = evl.innerHTML;
				}				
				// console.dir(studentinfo);
			}
			
		}	
	}

	// 删除表里的内容     *删除*
	btns[1].onclick = function(){
		var checks=$(".check",tbody);
		for(var i=0;i<checks.length;i++){
			if(checks[i].checked){
				var ii=checks[i].parentNode.parentNode.className;
				studentinfo[ii]="";
			}			
		}	
		delEmp(studentinfo);
		addTr();
	}

	// 刷新页面
	btns[2].onclick = function(){
		  window.location.reload();
	}

	// 清空数组
	function delEmp(obj){
		var arr=[];
		for(var i=0;i<obj.length;i++){
			if(obj[i]){
				arr.push(obj[i]);
			}
		}
		obj.length=0;
		for(var i=0;i<arr.length;i++){
			obj.push(arr[i]);
		}
		return obj;
	}


});






