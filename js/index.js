function clearPopups() {
	var _el = document.getElementsByClassName('toBeCleared');
	for(var i=0;i<_el.length;i++) {
		if( _el[i].classList.contains('active') ) {
			_el[i].classList.remove('active');
		}
	}
	_el = document.getElementById('filter');
	_el.classList.remove('active');
}

$(document).ready(function() {
	var path = "https://xiangjun-chen.github.io/smart-factory/images/";
	
	/**
     * 创建场景对象
     */
    var scene = new THREE.Scene();
	
	/**
     * 光源设置
     */
    //平行光源
    var directional = new THREE.DirectionalLight(0xffffff); //添加平行光源
    directional.position.set(-4000, 4000, 0); //平行光源位置
    scene.add(directional); //平行光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x6495ED);
    scene.add(ambient);
   
    /**
     * 相机设置
     */
	var width = window.innerWidth; //窗口宽度
	var height = window.innerHeight; //窗口高度
	var camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 15000);
	camera.position.set(0, 4500, 6000); //设置相机位置
	//camera.position.set(0, 6000, 0);
	camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
	
	/**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer({
		antialias: true
	});
    renderer.setSize(width, height); //设置渲染区域尺寸
    renderer.setClearColor(0x05132D, 1); //设置背景颜色
	renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
	function render() {
	  renderer.render(scene, camera);
	  requestAnimationFrame(render);
	}
	render(); //执行渲染操作
	var controls = new THREE.OrbitControls(camera, renderer.domElement); //创建控件对象
	controls.enableRotate = false;
	controls.enableZoom = false;
	controls.screenSpacePanning = false;
	
	/**
     * 创建坐标轴对象
     */
    //var axes = new THREE.AxesHelper(10000);
    //scene.add(axes);
	model.getCoordinates(scene, camera); //添加鼠标拾取三维坐标
	
	/**
     * 创建地基
     */
	var _f = function() {
		var land = model.createLand(15000, 1, 8000);
		land.position.set(0, 0, 0);
		scene.add(land);
	}();
	
	/**
     * 划分区域
     */
	_f = function() {
		var areaName_1 = model.createText(1620, 1, 780, path + '冷床区' + '.png');
		areaName_1.position.set(-6200, 10, -2200);
		scene.add(areaName_1);
		var areaName_2 = model.createText(1620, 1, 780, path + '轧管机' + '.png');
		areaName_2.position.set(300, 10, -2800);
		scene.add(areaName_2);
		var areaName_3 = model.createText(1420, 1, 780, path + '火焰切割' + '.png');
		areaName_3.position.set(-2600, 10, -1200);
		scene.add(areaName_3);
		var areaName_4 = model.createText(1620, 1, 780, path + '环形炉' + '.png');
		areaName_4.position.set(2000, 10, -1700);
		scene.add(areaName_4);
		var areaName_5 = model.createText(1620, 1, 780, path + '矫直机' + '.png');
		areaName_5.position.set(-4200, 10, -400);
		scene.add(areaName_5);
		var areaName_6 = model.createText(1620, 1, 780, path + '管胚锯' + '.png');
		areaName_6.position.set(-300, 10, -200);
		scene.add(areaName_6);
		var areaName_7 = model.createText(1620, 1, 780, path + '管排锯' + '.png');
		areaName_7.position.set(-3800, 10, 600);
		scene.add(areaName_7);
		var areaName_8 = model.createText(1620, 1, 780, path + '长胚库' + '.png');
		areaName_8.position.set(4000, 10, 1000);
		scene.add(areaName_8);
		var areaName_9 = model.createText(1620, 1, 780, path + '精整区' + '.png');
		areaName_9.position.set(-4800, 10, 1800);
		scene.add(areaName_9);
		var areaName_10 = model.createText(1620, 1, 780, path + '合格品' + '.png');
		areaName_10.position.set(-2800, 10, 1800);
		scene.add(areaName_10);
		var areaName_11 = model.createText(2060, 1, 780, path + '成品库区' + '.png');
		areaName_11.position.set(3800, 10, 2400);
		scene.add(areaName_11);
		var areaName_12 = model.createText(1140, 1, 780, path + '水压机' + '.png');
		areaName_12.position.set(2500, 10, 3500);
		scene.add(areaName_12);
		var areaName_13 = model.createText(1420, 1, 780, path + '超声探伤' + '.png');
		areaName_13.position.set(3800, 10, 3500);
		scene.add(areaName_13);
		var areaName_14 = model.createText(1140, 1, 780, path + '单管锯' + '.png');
		areaName_14.position.set(5050, 10, 3500);
		scene.add(areaName_14);
	}();
	
	/**
     * 创建轨道
     */
	_f = function() {
		var _p1 = new THREE.Vector3(7100, 0, 4000);
		var _p2 = new THREE.Vector3(7100, 0, 3000);
		var _p3 = new THREE.Vector3(400, 0, 3000);
		var _p4 = new THREE.Vector3(400, 0, 1800);
		var _p5 = new THREE.Vector3(7500, 0, 1800);
		var _lineCurve1 = new THREE.LineCurve3(_p1, _p2);
		var _lineCurve2 = new THREE.LineCurve3(_p2, _p3);
		var _lineCurve3 = new THREE.LineCurve3(_p3, _p4);
		var _lineCurve4 = new THREE.LineCurve3(_p4, _p5);
		var _lightPath = new THREE.CurvePath();
		_lightPath.curves.push(_lineCurve1, _lineCurve2, _lineCurve3, _lineCurve4);
		var streamer_1 = model.createStreamer(_lightPath);
		scene.add(streamer_1);
		
		var _p1 = new THREE.Vector3(7500, 0, 500);
		var _p2 = new THREE.Vector3(1100, 0, 500);
		var _p3 = new THREE.Vector3(1100, 0, -2800);
		var _p4 = new THREE.Vector3(2000, 0, -2800);
		var _p5 = new THREE.Vector3(2000, 0, -4000);
		var _lineCurve1 = new THREE.LineCurve3(_p1, _p2);
		var _lineCurve2 = new THREE.LineCurve3(_p2, _p3);
		var _lineCurve3 = new THREE.LineCurve3(_p3, _p4);
		var _lineCurve4 = new THREE.LineCurve3(_p4, _p5);
		var _lightPath = new THREE.CurvePath();
		_lightPath.curves.push(_lineCurve1, _lineCurve2, _lineCurve3, _lineCurve4);
		var streamer_2 = model.createStreamer(_lightPath);
		scene.add(streamer_2);
		
		var _p1 = new THREE.Vector3(-1700, 0, -4000);
		var _p2 = new THREE.Vector3(-1700, 0, -1700);
		var _p3 = new THREE.Vector3(0, 0, -1700);
		var _p4 = new THREE.Vector3(0, 0, -1000);
		var _p5 = new THREE.Vector3(1100, 0, -1000);
		var _p6 = new THREE.Vector3(1100, 0, -2800);
		var _p7 = new THREE.Vector3(2000, 0, -2800);
		var _p8 = new THREE.Vector3(2000, 0, -4000);
		var _lineCurve1 = new THREE.LineCurve3(_p1, _p2);
		var _lineCurve2 = new THREE.LineCurve3(_p2, _p3);
		var _lineCurve3 = new THREE.LineCurve3(_p3, _p4);
		var _lineCurve4 = new THREE.LineCurve3(_p4, _p5);
		var _lineCurve5 = new THREE.LineCurve3(_p5, _p6);
		var _lineCurve6 = new THREE.LineCurve3(_p6, _p7);
		var _lineCurve7 = new THREE.LineCurve3(_p7, _p8);
		var _lightPath = new THREE.CurvePath();
		_lightPath.curves.push(_lineCurve1, _lineCurve2, _lineCurve3, _lineCurve4, _lineCurve5, _lineCurve6, _lineCurve7);
		var streamer_3 = model.createStreamer(_lightPath);
		scene.add(streamer_3);
		
		var _p1 = new THREE.Vector3(-700, 0, 4000);
		var _p2 = new THREE.Vector3(-700, 0, 1000);
		var _p3 = new THREE.Vector3(1100, 0, 1000);
		var _p4 = new THREE.Vector3(1100, 0, -1000);
		var _p5 = new THREE.Vector3(1100, 0, 0);
		var _p6 = new THREE.Vector3(7500, 0, 0);
		var _lineCurve1 = new THREE.LineCurve3(_p1, _p2);
		var _lineCurve2 = new THREE.LineCurve3(_p2, _p3);
		var _lineCurve3 = new THREE.LineCurve3(_p3, _p4);
		var _lineCurve4 = new THREE.LineCurve3(_p4, _p5);
		var _lineCurve5 = new THREE.LineCurve3(_p5, _p6);
		var _lightPath = new THREE.CurvePath();
		_lightPath.curves.push(_lineCurve1, _lineCurve2, _lineCurve3, _lineCurve4, _lineCurve5);
		var streamer_4 = model.createStreamer(_lightPath);
		scene.add(streamer_4);
		
		var _p1 = new THREE.Vector3(-1700, 0, -4000);
		var _p2 = new THREE.Vector3(-1700, 0, 1200);
		var _p3 = new THREE.Vector3(-6000, 0, 1200);
		var _p4 = new THREE.Vector3(-6000, 0, 2300);
		var _p5 = new THREE.Vector3(-7500, 0, 2300);
		var _lineCurve1 = new THREE.LineCurve3(_p1, _p2);
		var _lineCurve2 = new THREE.LineCurve3(_p2, _p3);
		var _lineCurve3 = new THREE.LineCurve3(_p3, _p4);
		var _lineCurve4 = new THREE.LineCurve3(_p4, _p5);
		var _lightPath = new THREE.CurvePath();
		_lightPath.curves.push(_lineCurve1, _lineCurve2, _lineCurve3, _lineCurve4);
		var streamer_5 = model.createStreamer(_lightPath);
		scene.add(streamer_5);
		
		var _p1 = new THREE.Vector3(-7500, 0, 3000);
		var _p2 = new THREE.Vector3(-700, 0, 3000);
		var _p3 = new THREE.Vector3(-700, 0, 1000);
		var _p4 = new THREE.Vector3(-1700, 0, 1000);
		var _p5 = new THREE.Vector3(-1700, 0, 100);
		var _p6 = new THREE.Vector3(-4700, 0, 100);
		var _p7 = new THREE.Vector3(-4700, 0, 300);
		var _p8 = new THREE.Vector3(-7500, 0, 300);
		var _lineCurve1 = new THREE.LineCurve3(_p1, _p2);
		var _lineCurve2 = new THREE.LineCurve3(_p2, _p3);
		var _lineCurve3 = new THREE.LineCurve3(_p3, _p4);
		var _lineCurve4 = new THREE.LineCurve3(_p4, _p5);
		var _lineCurve5 = new THREE.LineCurve3(_p5, _p6);
		var _lineCurve6 = new THREE.LineCurve3(_p6, _p7);
		var _lineCurve7 = new THREE.LineCurve3(_p7, _p8);
		var _lightPath = new THREE.CurvePath();
		_lightPath.curves.push(_lineCurve1, _lineCurve2, _lineCurve3, _lineCurve4, _lineCurve5, _lineCurve6, _lineCurve7);
		var streamer_6 = model.createStreamer(_lightPath);
		scene.add(streamer_6);
		
		var _p1 = new THREE.Vector3(-7500, 0, -3400);
		var _p2 = new THREE.Vector3(-5500, 0, -3400);
		var _p3 = new THREE.Vector3(-5500, 0, -1800);
		var _p4 = new THREE.Vector3(-3200, 0, -1800);
		var _p5 = new THREE.Vector3(-3200, 0, -800);
		var _p6 = new THREE.Vector3(-5000, 0, -800);
		var _p7 = new THREE.Vector3(-5000, 0, -100);
		var _p8 = new THREE.Vector3(-7500, 0, -100);
		var _lineCurve1 = new THREE.LineCurve3(_p1, _p2);
		var _lineCurve2 = new THREE.LineCurve3(_p2, _p3);
		var _lineCurve3 = new THREE.LineCurve3(_p3, _p4);
		var _lineCurve4 = new THREE.LineCurve3(_p4, _p5);
		var _lineCurve5 = new THREE.LineCurve3(_p5, _p6);
		var _lineCurve6 = new THREE.LineCurve3(_p6, _p7);
		var _lineCurve7 = new THREE.LineCurve3(_p7, _p8);
		var _lightPath = new THREE.CurvePath();
		_lightPath.curves.push(_lineCurve1, _lineCurve2, _lineCurve3, _lineCurve4, _lineCurve5, _lineCurve6, _lineCurve7);
		var streamer_7 = model.createStreamer(_lightPath);
		scene.add(streamer_7);
	}();
	
	/**
     * 冷床区建筑
     */
	_f = function() {
		var shape = new THREE.Shape();
		shape.moveTo(0, 0);
		shape.lineTo(600, 0);
		shape.lineTo(600, 2500);
		shape.lineTo(0, 2500);
		shape.lineTo(0, 0);
		p0 = new THREE.Vector3(0, 0, 0);
		p1 = new THREE.Vector3(0, 300, 0);
		var line = new THREE.LineCurve3(p0, p1);
		var geometry = new THREE.ExtrudeGeometry(shape,{
			bevelEnabled: false,
			extrudePath: line
		});
		var uniforms = {
			time: {
				type: 'f',
				value: 0.6
			},
			height: {
				type: 'f',
				value: 300.0
			}
		};
		var material = model.buildingMaterial(uniforms);
		var mesh = new THREE.Mesh(geometry, material);
		var order = 0;
		function render() {
			if( order == 0 ) {
				uniforms.time.value += 0.003;
				if( uniforms.time.value >= 1.0 ) {
					order = 1;
				}
			}else {
				uniforms.time.value -= 0.003;
				if( uniforms.time.value <= 0.6 ) {
					order = 0;
				}
			}
			requestAnimationFrame(render);
		}
		render();
		mesh.position.set(-3609, 0, -1000);
		scene.add(mesh);
	}();
	
	/**
     * 火焰切割建筑
     */
	_f = function() {
		var shape = new THREE.Shape();
		shape.moveTo(0, 0);
		shape.lineTo(400, 0);
		shape.lineTo(400, 2300);
		shape.lineTo(0, 2300);
		shape.lineTo(0, 0);
		p0 = new THREE.Vector3(0, 0, 0);
		p1 = new THREE.Vector3(0, 900, 0);
		var line = new THREE.LineCurve3(p0, p1);
		var geometry = new THREE.ExtrudeGeometry(shape,{
			bevelEnabled: false,
			extrudePath: line
		});
		var uniforms = {
			time: {
				type: 'f',
				value: 0.6
			},
			height: {
				type: 'f',
				value: 900.0
			}
		};
		var material = model.buildingMaterial(uniforms);
		var mesh = new THREE.Mesh(geometry, material);
		var order = 0;
		function render() {
			if( order == 0 ) {
				uniforms.time.value += 0.003;
				if( uniforms.time.value >= 1.0 ) {
					order = 1;
				}
			}else {
				uniforms.time.value -= 0.003;
				if( uniforms.time.value <= 0.6 ) {
					order = 0;
				}
			}
			requestAnimationFrame(render);
		}
		render();
		mesh.position.set(-2200, 0, -2900);
		scene.add(mesh);
	}();
	
	/**
     * 矫直机建筑
     */
	_f = function() {
		var shape = new THREE.Shape();
		shape.moveTo(0, 0);
		shape.lineTo(300, 0);
		shape.lineTo(300, 1200);
		shape.lineTo(0, 1200);
		shape.lineTo(0, 0);
		p0 = new THREE.Vector3(0, 0, 0);
		p1 = new THREE.Vector3(0, 200, 0);
		var line = new THREE.LineCurve3(p0, p1);
		var geometry = new THREE.ExtrudeGeometry(shape,{
			bevelEnabled: false,
			extrudePath: line
		});
		var uniforms = {
			time: {
				type: 'f',
				value: 0.6
			},
			height: {
				type: 'f',
				value: 200.0
			}
		};
		var material = model.buildingMaterial(uniforms);
		var mesh = new THREE.Mesh(geometry, material);
		var order = 0;
		function render() {
			if( order == 0 ) {
				uniforms.time.value += 0.003;
				if( uniforms.time.value >= 1.0 ) {
					order = 1;
				}
			}else {
				uniforms.time.value -= 0.003;
				if( uniforms.time.value <= 0.6 ) {
					order = 0;
				}
			}
			requestAnimationFrame(render);
		}
		render();
		mesh.position.set(-1729, 0, 64);
		scene.add(mesh);
	}();
	
	/**
     * 管排锯建筑
     */
	_f = function() {
		var shape = new THREE.Shape();
		shape.moveTo(0, 0);
		shape.lineTo(400, 0);
		shape.lineTo(400, 400);
		shape.lineTo(0, 400);
		shape.lineTo(0, 0);
		p0 = new THREE.Vector3(0, 0, 0);
		p1 = new THREE.Vector3(0, 100, 0);
		var line = new THREE.LineCurve3(p0, p1);
		var geometry = new THREE.ExtrudeGeometry(shape,{
			bevelEnabled: false,
			extrudePath: line
		});
		var uniforms = {
			time: {
				type: 'f',
				value: 0.6
			},
			height: {
				type: 'f',
				value: 100.0
			}
		};
		var material = model.buildingMaterial(uniforms);
		var mesh = new THREE.Mesh(geometry, material);
		var order = 0;
		function render() {
			if( order == 0 ) {
				uniforms.time.value += 0.003;
				if( uniforms.time.value >= 1.0 ) {
					order = 1;
				}
			}else {
				uniforms.time.value -= 0.003;
				if( uniforms.time.value <= 0.6 ) {
					order = 0;
				}
			}
			requestAnimationFrame(render);
		}
		render();
		mesh.position.set(-4180, 0, 650);
		scene.add(mesh);
	}();
	
	/**
     * 合格品建筑
     */
	_f = function() {
		function createBuilding() {
			var shape = new THREE.Shape();
			shape.moveTo(0, 0);
			shape.lineTo(600, 0);
			shape.lineTo(600, 1000);
			shape.lineTo(0, 1000);
			shape.lineTo(0, 0);
			p0 = new THREE.Vector3(0, 0, 0);
			p1 = new THREE.Vector3(0, 300, 0);
			var line = new THREE.LineCurve3(p0, p1);
			var geometry = new THREE.ExtrudeGeometry(shape,{
				bevelEnabled: false,
				extrudePath: line
			});
			var uniforms = {
				time: {
					type: 'f',
					value: 0.6
				},
				height: {
					type: 'f',
					value: 300.0
				}
			};
			var material = model.buildingMaterial(uniforms);
			var mesh = new THREE.Mesh(geometry, material);
			var order = 0;
			function render() {
				if( order == 0 ) {
					uniforms.time.value += 0.003;
					if( uniforms.time.value >= 1.0 ) {
						order = 1;
					}
				}else {
					uniforms.time.value -= 0.003;
					if( uniforms.time.value <= 0.6 ) {
						order = 0;
					}
				}
				requestAnimationFrame(render);
			}
			render();
			return mesh;
		}
		var building_1 = createBuilding();
		building_1.position.set(-2500, 0, 2800);
		scene.add(building_1);
		var building_2 = createBuilding();
		building_2.position.set(-1400, 0, 2800);
		scene.add(building_2);
		var building_3 = createBuilding();
		building_3.position.set(-2500, 0, 2000);
		scene.add(building_3);
		var building_4 = createBuilding();
		building_4.position.set(-1400, 0, 2000);
		scene.add(building_4);
	}();
	
	/**
     * 管胚锯建筑
     */
	_f = function() {
		function createBuilding() {
			var shape = new THREE.Shape();
			shape.moveTo(0, 0);
			shape.arc(0, 0, 200, 0, Math.PI * 2);
			p0 = new THREE.Vector3(0, 0, 0);
			p1 = new THREE.Vector3(0, 400, 0);
			var line = new THREE.LineCurve3(p0, p1);
			var geometry = new THREE.ExtrudeGeometry(shape,{
				bevelEnabled: false,
				extrudePath: line
			});
			var uniforms = {
				time: {
					type: 'f',
					value: 0.6
				},
				height: {
					type: 'f',
					value: 400.0
				}
			};
			var material = model.buildingMaterial(uniforms);
			var mesh = new THREE.Mesh(geometry, material);
			var order = 0;
			function render() {
				if( order == 0 ) {
					uniforms.time.value += 0.003;
					if( uniforms.time.value >= 1.0 ) {
						order = 1;
					}
				}else {
					uniforms.time.value -= 0.003;
					if( uniforms.time.value <= 0.6 ) {
						order = 0;
					}
				}
				requestAnimationFrame(render);
			}
			render();
			return mesh;
		}
		var building_1 = createBuilding();
		building_1.position.set(-1360, 0, -1068);
		scene.add(building_1);
		var building_2 = createBuilding();
		building_2.position.set(-860, 0, -1068);
		scene.add(building_2);
	}();
	
	/**
     * 环形炉建筑_1
     */
	_f = function() {
		var shape = new THREE.Shape();
		shape.moveTo(0, 0);
		shape.arc(0, 0, 1400, 0, Math.PI * 2);
		p0 = new THREE.Vector3(0, 0, 0);
		p1 = new THREE.Vector3(0, 400, 0);
		var line = new THREE.LineCurve3(p0, p1);
		var geometry = new THREE.ExtrudeGeometry(shape,{
			bevelEnabled: false,
			extrudePath: line
		});
		var uniforms = {
			time: {
				type: 'f',
				value: 0.6
			},
			height: {
				type: 'f',
				value: 400.0
			}
		};
		var material = model.buildingMaterial(uniforms);
		var mesh = new THREE.Mesh(geometry, material);
		var order = 0;
		function render() {
			if( order == 0 ) {
				uniforms.time.value += 0.003;
				if( uniforms.time.value >= 1.0 ) {
					order = 1;
				}
			}else {
				uniforms.time.value -= 0.003;
				if( uniforms.time.value <= 0.6 ) {
					order = 0;
				}
			}
			requestAnimationFrame(render);
		}
		render();
		mesh.position.set(4388, 0, -1805);
		scene.add(mesh);
	}();
	
	/**
     * 环形炉建筑_2
     */
	_f = function() {
		var shape = new THREE.Shape();
		shape.moveTo(0, 0);
		shape.lineTo(500, 0);
		shape.lineTo(500, 700);
		shape.lineTo(0, 700);
		shape.lineTo(0, 0);
		p0 = new THREE.Vector3(0, 0, 0);
		p1 = new THREE.Vector3(0, 700, 0);
		var line = new THREE.LineCurve3(p0, p1);
		var geometry = new THREE.ExtrudeGeometry(shape,{
			bevelEnabled: false,
			extrudePath: line
		});
		var uniforms = {
			time: {
				type: 'f',
				value: 0.6
			},
			height: {
				type: 'f',
				value: 700.0
			}
		};
		var material = model.buildingMaterial(uniforms);
		var mesh = new THREE.Mesh(geometry, material);
		var order = 0;
		function render() {
			if( order == 0 ) {
				uniforms.time.value += 0.003;
				if( uniforms.time.value >= 1.0 ) {
					order = 1;
				}
			}else {
				uniforms.time.value -= 0.003;
				if( uniforms.time.value <= 0.6 ) {
					order = 0;
				}
			}
			requestAnimationFrame(render);
		}
		render();
		mesh.position.set(1900, 0, -280);
		scene.add(mesh);
	}();
	
	/**
     * 长胚库建筑
     */
	_f = function() {
		function createBuilding() {
			var shape = new THREE.Shape();
			shape.moveTo(0, 0);
			shape.lineTo(300, 0);
			shape.lineTo(420, 220);
			shape.lineTo(300, 440);
			shape.lineTo(0, 440);
			shape.lineTo(-120, 220);
			shape.lineTo(0, 0);
			p0 = new THREE.Vector3(0, 0, 0);
			p1 = new THREE.Vector3(2200, 0, 0);
			var line = new THREE.LineCurve3(p0, p1);
			var geometry = new THREE.ExtrudeGeometry(shape,{
				bevelEnabled: false,
				extrudePath: line
			});
			var uniforms = {
				time: {
					type: 'f',
					value: 0.6
				},
				height: {
					type: 'f',
					value: 440.0
				}
			};
			var material = model.buildingMaterial(uniforms);
			var mesh = new THREE.Mesh(geometry, material);
			var order = 0;
			function render() {
				if( order == 0 ) {
					uniforms.time.value += 0.003;
					if( uniforms.time.value >= 1.0 ) {
						order = 1;
					}
				}else {
					uniforms.time.value -= 0.003;
					if( uniforms.time.value <= 0.6 ) {
						order = 0;
					}
				}
				requestAnimationFrame(render);
			}
			render();
			return mesh;
		}
		var building_1 = createBuilding();
		building_1.position.set(4971, 0, 1007);
		scene.add(building_1);
		var building_1 = createBuilding();
		building_1.position.set(4971, 0, 1607);
		scene.add(building_1);
	}();
	
	/**
     * 成品库区建筑
     */
	_f = function() {
		var shape = new THREE.Shape();
		shape.moveTo(0, 0);
		shape.lineTo(1500, 0);
		shape.lineTo(1500, 600);
		shape.lineTo(750, 900);
		shape.lineTo(0, 600);
		shape.lineTo(0, 0);
		p0 = new THREE.Vector3(0, 0, 0);
		p1 = new THREE.Vector3(2300, 0, 0);
		var line = new THREE.LineCurve3(p0, p1);
		var geometry = new THREE.ExtrudeGeometry(shape,{
			bevelEnabled: false,
			extrudePath: line
		});
		var uniforms = {
			time: {
				type: 'f',
				value: 0.6
			},
			height: {
				type: 'f',
				value: 900.0
			}
		};
		var material = model.buildingMaterial(uniforms);
		var mesh = new THREE.Mesh(geometry, material);
		mesh.rotateY(THREE.MathUtils.degToRad(90));
		var order = 0;
		function render() {
			if( order == 0 ) {
				uniforms.time.value += 0.003;
				if( uniforms.time.value >= 1.0 ) {
					order = 1;
				}
			}else {
				uniforms.time.value -= 0.003;
				if( uniforms.time.value <= 0.6 ) {
					order = 0;
				}
			}
			requestAnimationFrame(render);
		}
		render();
		mesh.position.set(1700, 0, 3677);
		scene.add(mesh);
	}();
	
	/**
     * 光柱效果
	 * @param r {Number} 半径
	 * @param h {Number} 高度
     */
	_f = function() {
		var scatter3DCylinder = model.createScatter3DCylinder(800, 250);
		scatter3DCylinder.position.set(0, 125, 0);
		scene.add(scatter3DCylinder);
	}();
	
	/**
     * 旋转圆锥效果
	 * @param r {Number} 半径,
	 * @param h {Number} 高度
     */
	_f = function() {
		var cone_1 = model.createRotating3DCone(80, 120);
		cone_1.position.set(-3000, 400, 2500);
		scene.add(cone_1);
		var cone_2 = model.createRotating3DCone(80, 120);
		cone_2.position.set(-1900, 400, 2500);
		scene.add(cone_2);
		var cone_3 = model.createRotating3DCone(80, 120);
		cone_3.position.set(-3000, 400, 1700);
		scene.add(cone_3);
		var cone_4 = model.createRotating3DCone(80, 120);
		cone_4.position.set(-1900, 400, 1700);
		scene.add(cone_4);
	}();
	
	/**
     * 警报效果
	 * @param r {Number} 半径
     */
	_f = function() {
		var scan = model.createWarning(300);
		scan.position.set(4200, 4, 2400);
		scene.add(scan);
	}();
	
	/**
     * 视频看板
     */
	_f = function() {
		var videoBoard = model.createVideoBoard(1600, 800, path + 'video.mp4');
		videoBoard.position.set(4388, 1600, -1805);
		scene.add(videoBoard);
		var rotating3DCylinder = model.createRotating3DCylinder(700, 30, 800);
		rotating3DCylinder.position.set(4388, 800, -1805);
		scene.add(rotating3DCylinder);
	}();
	
	/**
     * 数据看板
     */
	_f = function() {
		var dataBoard = model.createDataBoard(1600, 800, '项目名称：8月设备检维修任务<br/>施工单位：460钢管厂<br/>危险作业类型：高处危险作业<br/>危险作业级别：二级<br/>作业地点：矫直机');
		dataBoard.position.set(-4166, 1200, -330);
		scene.add(dataBoard);
		var rotating3DCylinder = model.createRotating3DCylinder(700, 30, 800);
		rotating3DCylinder.position.set(-4166, 400, -330);
		scene.add(rotating3DCylinder);
	}();
	
});