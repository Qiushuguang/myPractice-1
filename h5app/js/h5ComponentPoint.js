// 散点图表组件对象
var h5ComponentPoint=function(name,cfg) {
	
	var component=new h5ComponentBase(name,cfg);

	var base=cfg.data[0][1];//以第一个数据为基准，比例大小为 100%

	$.each( cfg.data,function (idx,item) {
		var point=$('<div class="point point_'+idx+'">');
		
		var name=$('<div class="name">'+item[0]+'</div>');
		var rate=$('<div class="per">'+item[1]*100+'%</div>');
		name.append(rate);
		point.append(name);

		var per=(item[1]/base*100)+'%';
		point.width(per).height(per);

		if(item[2]){
			point.css('backgroundColor',item[2]);

		}

		if(item[3]!=undefined&&item[4]!=undefined){
			point.css('left',item[3]).css('top',item[4]);
				//暂存元素的位置
			point.data('left',item[3]).data('top',item[4]);
		}

		//设置zindex,重设位置
		point.css('zIndex',100-idx);
		point.css('left',0).css('top',0);

		point.css('transition','all 1s '+idx*.5+'s');
		component.append(point);

		component.on('onLoad',function () {
			component.find('.point').each(function (idx,item) {
				$(item).css('left',$(item).data('left')).css('top',$(item).data('top')); 
			})
		})
		component.on('onLeave',function () {
			component.find('.point').each(function (idx,item) {
				$(item).css('left',0).css('top',0); 
			})
		})

		//点击每个点时的圈层动画
		component.find('.point').on('click',function () {
			component.find('.point').removeClass('point_focus');
			$(this).addClass('point_focus');

			return false;
		}).eq(0).addClass('point_focus');

	});

	return component;
}