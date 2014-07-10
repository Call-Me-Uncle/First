window.onload = function() {
	waterfall('wrapper','box');
	var dataInt={"data":[{'src':'89.jpg'},{'src':'90.jpg'},{'src':'91.jpg'},{'src':'92.jpg'},{'src':'93.jpg'},{'src':'94.jpg'},{'src':'95.jpg'},{'src':'96.jpg'},{'src':'97.jpg'}]}
	
	window.onscroll=function(){
		if(checkScrollSlide()){
			var pNode=document.getElementById('wrapper');
			for (var i = 0; i < dataInt.data.length; i++) {
				var obox = document.createElement('div');
				obox.className='box';
				pNode.appendChild(obox);

				var opic = document.createElement('div');
				opic.className = 'pic';
				obox.appendChild(opic);
				var oimg = document.createElement('img');
				oimg.src = 'images/'+dataInt.data[i].src;
				console.log(oimg.src);
				opic.appendChild(oimg);
				
			}
			waterfall('wrapper','box');
			
		}
		
		
	}
}
function waterfall(parent,cname){
	var pNode = document.getElementById(parent);
	//	取出所有class为box的盒子
	var oboxs = getByClass(pNode,cname);
	//计算整个页面显示的列数(页面宽/每个box的宽度)
	//页面宽度
	var winW = document.documentElement.clientWidth;
	
	//取得box的宽度，202=图片宽度165+内边距10*2+边框1*2+外层box内边距15
	var oboxW = oboxs[0].offsetWidth;
	var cols = Math.floor(winW/oboxW);
	//设置wrapper宽度并居中
	pNode.style.cssText='width:'+oboxW*cols+'px;margin:0 auto;';
	var hArr=new Array();
	for (var i = 0; i < oboxs.length; i++) {
		if(i<cols){
			hArr.push(oboxs[i].offsetHeight);
		}else{
			
			var oMin = Math.min.apply(Math,hArr);
			var min = getMinIndex(hArr,oMin);
			oboxs[i].style.position="absolute";
			oboxs[i].style.top = oMin+'px';
			oboxs[i].style.left = oboxs[min].offsetLeft+'px';
			hArr[min]+=oboxs[i].offsetHeight;
		}
	};
}
//取出所有class为指定名称的盒子（数组形式）
function getByClass(parent,clsName){
	var cNameArr = new Array();
	var oElements = parent.getElementsByTagName('*');
	
	for(var i=0;i<oElements.length;i++){
		if(oElements[i].className == clsName){
			cNameArr.push(oElements[i]);
			
		}
	}
	
	return cNameArr;
}
function getMinIndex(arr,val){
	for (var i in arr) {
				if(arr[i] == val){
					return i;
				}
			};
}
//检测是否具备了加载数据块的条件

function checkScrollSlide(){
	var pNode = document.getElementById('wrapper');
	//	取出所有class为box的盒子
	var oboxs = getByClass(pNode,'box');
	var lastBoxH=oboxs[oboxs.length-1].offsetTop+Math.floor(oboxs[oboxs.length-1].offsetHeight/2);
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	var wHeight=document.body.clientHeight ||document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+wHeight)?true:false;
}