var path = "https://xiangjun-chen.github.io/smart-factory/images/";

var model = {
	//鼠标拾取三维坐标
	getCoordinates: function(scene, camera) {
		var raycaster = new THREE.Raycaster(); //创建光线投射
		var mouse = new THREE.Vector2(); //创建二维平面
		window.addEventListener("mousedown", mousedown); //页面绑定鼠标点击事件
		function mousedown(e){
			//将html坐标系转化为webgl坐标系，并确定鼠标点击位置
			mouse.x =  e.clientX / window.innerWidth * 2 - 1;
			mouse.y =  -(e.clientY / window.innerHeight * 2) + 1;
			//以camera为z坐标，确定所点击物体的3D空间位置
			raycaster.setFromCamera(mouse, camera);
			//获取与射线相交的对象数组，其中的元素按照距离排序，越近的越靠前
			var intersects = raycaster.intersectObjects(scene.children);
			//选中后进行的操作
			if(intersects.length > 0){
				var selected = intersects[0]; //取第一个物体
				if( selected.object.name.indexOf('v_') != -1 || selected.object.name.indexOf('cv_') != -1 ) {
					var _el = document.getElementById(selected.object.name);
					_el.classList.add('active');
					_el = document.getElementById('filter');
					_el.classList.add('active');
				}
				console.log("x坐标:" + selected.point.x);
				console.log("y坐标:" + selected.point.y);
				console.log("z坐标:" + selected.point.z);
			}
		}
	},
	//创建地基
	createLand: function(width,height,depth) {
		var geometry = new THREE.BoxGeometry(width,height,depth);
		var texture = new THREE.TextureLoader().load(path + 'land.jpg');
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(width / 100, depth / 100);
		var material = new THREE.MeshLambertMaterial({
			map: texture,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.3
		});
		var mesh = new THREE.Mesh(geometry, material);
		return mesh;
	},
	//创建文字贴图
	createText: function(width,height,depth,path) {
		var geometry = new THREE.BoxGeometry(width, height, depth);
		var texture = new THREE.TextureLoader().load(path);
		var material = new THREE.MeshLambertMaterial({
			map: texture,
			side: THREE.FrontSide,
			transparent: true,
			depthWrite: false,
			depthTest: true
		});
		var mesh = new THREE.Mesh(geometry, material);
		return mesh;
	},
	//创建轨道
	createStreamer: function(lightPath) {
		var geometry = new THREE.TubeGeometry(lightPath, 1000, 10, 100);
		var texture = new THREE.TextureLoader().load(path + 'lightLine' + '.jpg');
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1, 1);
		var material = new THREE.MeshBasicMaterial({
            map: texture,
			side: THREE.DoubleSide
        });
		var mesh = new THREE.Mesh(geometry, material);
		var time = 0;
		function render() {
			if( time > 2 ) {
				time = 0;
				texture.offset.x += 0.02;
			}
			time++;
			requestAnimationFrame(render);
		}
		render();
		return mesh;
	},
	//建筑物材质
	buildingMaterial: function(uniforms) {
		var material = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: `
				varying vec3 vPosition; //varying变量指顶点着色器传递给片元着色器的数据
                void main()
                {
                    vPosition = position; //attribute变量指外部应用程序传递给顶点着色器的数据，attribute vec3 position是系统默认定义的顶点位置坐标
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }
			`,
			fragmentShader: `
				uniform float time;
				uniform float height;
				varying vec3 vPosition;
				void main() {
					float cy = vPosition.y / height; //归一化位置坐标
					float cy_r = mix(0.0, 0.0, cy); //线性渐变
					float cy_g = mix(0.03, 0.69, cy);
					float cy_b = mix(0.16, 1.0, cy);
					gl_FragColor = vec4(cy_r*time, cy_g*time, cy_b*time, 1.0);
				}
			`
		});
		return material;
	},
	/**
     * 扩散光柱效果
	 * @param r {Number} 半径
	 * @param h {Number} 高度
     */
	createScatter3DCylinder: function(r, h) {
		var geometry = new THREE.CylinderGeometry(r, r, h, 100, 1, true);
		var texture = new THREE.TextureLoader().load(path + 'blueLight' + '.png');
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1, 1);
		var material = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide,
			transparent: true,
			depthWrite: false,
			depthTest: true
		});
		var mesh = new THREE.Mesh(geometry, material);
		var s = 0,
			p = 100;
        function render() {
			if (s > 100) {
				s = 0;
				p = 100;
			}
			mesh.scale.set(1 + s/25, 1 + s/50, 1 + s/25);
			mesh.material.opacity = p / 100;
			s++;
			p--;
			requestAnimationFrame(render);
        }
        render();
		return mesh;
	},
	/**
     * 闪烁光柱效果
	 * @param r1 {Number} 顶部圆半径
	 * @param r2 {Number} 底部圆半径
	 * @param h {Number} 高度
     */
	createRotating3DCylinder: function(r1, r2, h) {
		var geometry = new THREE.CylinderGeometry(r1, r2, h, 100, 1, true);
		var texture = new THREE.TextureLoader().load(path + 'blueLight' + '.png');
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set(1, 1);
		var material = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide,
			transparent: true,
			depthWrite: false,
			depthTest: true
		});
		var mesh = new THREE.Mesh(geometry, material);
		var p = 100,
			order = 0;
		function render() {
			if( order == 0 ) {
				if( p < 30 ) {
					order = 1;
				}
				p -= 0.5;
			}else {
				if( p > 100 ) {
					order = 0;
				}
				p += 0.5;
			}
			mesh.material.opacity = p / 100;
			requestAnimationFrame(render);
		}
		render();
		return mesh;
	},
	/**
     * 旋转圆锥效果
	 * @param r {Number} 半径,
	 * @param h {Number} 高度
     */
	createRotating3DCone: function(r, h) {
		var geometry = new THREE.ConeGeometry(r, h, 4, 1);
		var material = new THREE.MeshPhongMaterial({
            color: 0x169550,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.5,
			depthWrite: false,
			depthTest: true
        });
		var mesh = new THREE.Mesh(geometry, material);
		mesh.rotateX(THREE.MathUtils.degToRad(180));
		var posY = 0;
		var up = true;
		function render() {
			mesh.rotateY(THREE.MathUtils.degToRad(3));
			pos = mesh.position;
			if( up ) {
				posY++;
				mesh.position.set(pos.x, pos.y + 1.5, pos.z);
				if( posY >= 30 ) {
					up = false;
				}
			}else {
				posY--;
				mesh.position.set(pos.x, pos.y - 1.5, pos.z);
				if( posY <= 0 ) {
					up = true;
				}
			}
			requestAnimationFrame(render);
		}
		render();
		return mesh;
	},
	/**
     * 警报效果
	 * @param r {Number} 半径
     */
	createWarning: function(r) {
		var geometry = new THREE.CircleGeometry(r, 100);
		var texture = new THREE.TextureLoader().load(path + 'redLight' + '.png');
		var material = new THREE.MeshBasicMaterial({
			map: texture,
			side: THREE.DoubleSide,
			transparent: true,
			depthWrite: false,
			depthTest: true
		});
		var mesh = new THREE.Mesh(geometry, material);
		mesh.rotateX(THREE.MathUtils.degToRad(90));
		var s = 0;
			p = 100;
		function render() {
			if (s > 100) {
				s = 0;
				p = 100;
			}
			mesh.scale.set(1 + s/25, 1 + s/25, 1);
			mesh.material.opacity = p / 100;
			s++;
			p--;
			requestAnimationFrame(render);
        }
        render();
        return mesh;
	},
	/**
     * 视频看板
     */
	createVideoBoard: function(width, height, src) {
		var _el = document.getElementById('main');
		var _time = new Date().getTime();
		var videoWrapper = document.createElement('div');
		videoWrapper.setAttribute('id', 'vw_' + _time);
		_el.appendChild(videoWrapper);
		_el = document.getElementById('vw_' + _time);
		_el.innerHTML = '<video id="v_'+ _time +'" class="videoBoard toBeCleared" autoplay muted loop controls><source src="'+ src +'" type="video/mp4"></source></video>';
		var video = document.getElementById('v_' + _time);
		var geometry = new THREE.BoxGeometry(width, height, 1);
		var texture = new THREE.VideoTexture(video);
		var material = new THREE.MeshLambertMaterial({
			map: texture,
			side: THREE.FrontSide,
			transparent: true,
			depthWrite: false,
			depthTest: true
		});
		var mesh = new THREE.Mesh(geometry, material);
		mesh.name = 'v_' + _time;
		return mesh;
	},
	/**
     * 数据看板
     */
	createDataBoard: function(width, height, txt) {
		var el = document.getElementById('main');
		var _time = new Date().getTime();
		var canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		canvas.setAttribute('id', 'cv_' + _time);
		canvas.classList.add('dataBoard', 'toBeCleared');
		el.appendChild(canvas);
		var c = canvas.getContext('2d');
		c.fillStyle = 'rgba(35,49,82,0.6)';
		c.fillRect(0, 0, width, height);
		c.lineWidth = 30;
		c.strokeStyle = '#074C81';
		c.strokeRect(0, 0, width, height);
		c.font = '100px sans-serif';
		c.fillStyle = '#31ABE3';
		c.fillText('当前危险作业', 120, 160);
		c.lineWidth = 10;
		c.beginPath();
		c.moveTo(0, 240);
		c.lineTo(1600, 240);
		c.closePath();
		c.stroke();
		c.font = '80px sans-serif';
		c.fillStyle = '#cccccc';
		var txtArray = txt.split('<br/>');
		var linePosition = 340;
		txtArray.forEach(function(e, i) {
			c.fillText(e, 120, linePosition);
			linePosition += 100;
		});
		var geometry = new THREE.BoxGeometry(width, height, 1);
		var texture = new THREE.CanvasTexture(canvas);
		var material = new THREE.MeshLambertMaterial({
			map: texture,
			side: THREE.FrontSide,
			transparent: true,
			depthWrite: false,
			depthTest: true
		});
		var mesh = new THREE.Mesh(geometry, material);
		mesh.name = 'cv_' + _time;
		return mesh;
	},
}