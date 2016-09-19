var MAX = function() {
}
MAX.prototype = {
    ajaxGetArr: function(url, callback) {
        var xhr = new XMLHttpRequest() || new ActiveXObject(Microsoft.XMLHTTP);
        xhr.open("get", url, true);
        //改变获取的data格式。
        if ("responseType" in xhr) {
            xhr.responseType = "arraybuffer";
        }
        // older browser
        if (xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        }
        xhr.onreadystatechange = function(evt) {
            var file, err;
            // use `xhr` and not `this`... thanks IE
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 0) {
                    file = null;
                    err = null;
                    try {
                        file = xhr.response || xhr.responseText;
                    } catch (e) {
                        err = new Error(e);
                    }
                    callback(err, file);
                } else {
                    callback(new Error("Ajax error for " + path + " : " + this.status + " " + this.statusText), null);
                }
            }
        };
        // xhr.setRequestHeader("Origin","http://10.0.2.25/000/000/043")
        //  xhr.setRequestHeader("Access-Control-Request-Origin", "http://10.0.2.25/000/000/043");
        xhr.send(null)
    },
    //========================================================loadmodel======================================
    load: function(url) {
        var scope=this;
        var db,indexedDBOBJ={name:url};
        var request=indexedDB.open("mesh4",2);
        request.onupgradeneeded = function() {
    var db = request.result;
    if (!db.objectStoreNames.contains("mesh")) {
        db.createObjectStore("mesh", {
            keyPath: "name"
        });
    }
}

request.onsuccess = function() {
    db = request.result;
    var store = db.transaction(["mesh"], "readwrite").objectStore("mesh");
    var request2 = store.get(url);
    request2.onsuccess = function(e) {
        if (request2.result) {
            console.log(request2.result)
        }
         else {
        
            






        scope.ajaxGetArr(url, function(err, data) {
            if (err) {
                throw err;
            }

            var arrdata = new Uint8Array(data);
            var meshobj = {};
            var k = blockInfo(arrdata)
            var meshdata = arrdata.slice(k[0][0], (k[0][0] + k[0][1]))
            meshscript = arrdata.slice(k[1][0], (k[1][0] + k[1][2]))
            modelblob = {}
            var parser = new DOMParser();
            var result = pako.inflate(meshscript, {
                to: 'string'
            })
            var xml = parser.parseFromString(result, "text/xml");
            meshobj.script = xmlToJson(xml);
            var myFileName = picnames(arrdata)
            var filenamearr = [];
            for (var j = 0; j < myFileName.length; j++) {
                filenamearr[j] = ""
                for (var i = 0; i < myFileName[j].length; i++) {
                    if (myFileName[j][i] == 0) {
                        break;
                    }
                    filenamearr[j] += (String.fromCharCode(myFileName[j][i]))
                }
            }
            for (var i = 2; i < k.length; i++) {
                modelblob[filenamearr[i]] = new Blob([arrdata.slice(k[i][0], (k[i][0] + k[i][1]))])
            }
            meshobj.modelblob = modelblob;
            function logBlobText2(z) {
                var reader = new FileReader();
                reader.readAsDataURL(z);
                reader.onload = function(e) {
                }
            }
            //将每一块小mesh放入lum数组中。这里用到了while循环切割。
            var lum = []
            function splitMesh() {
                var p = tentosixteen(meshdata.slice(72, 76));
                var l = tentosixteen(meshdata.slice(76, 80));
                while (p < meshdata.length) {
                    lum.push(pako.inflate(meshdata.slice((p + 16), (p + 16 + l)), {
                        to: 'ArrayBuffer'
                    }))
                    p = p + 16 + l;
                    if (p < meshdata.length) {
                        l = tentosixteen(meshdata.slice(p + 8, p + 12))
                    }
                }
            }
            splitMesh();
            var meshblocks = {}
            for (var k = 0; k < lum.length; k++) {
                var mbpy;
                var mbnamelen = tentosixteen(lum[k].slice(0, 4));
                var h = arrToString(lum[k].slice(4, mbnamelen + 3))
                meshblocks[h] = {}
                mbpy = mbnamelen + 4;
                var mbindicelen = tentosixteen(lum[k].slice(mbpy, mbpy + 4));
                meshblocks[h]["indices"] = tentosixteensz(lum[k].slice(mbpy + 4, mbpy + 4 + mbindicelen * 4))
                mbpy = mbpy + 4 + mbindicelen * 4
                var mbvexlen = tentosixteen(lum[k].slice(mbpy, mbpy + 4))
                meshblocks[h]["vextex"] = hextofloatsz(lum[k].slice(mbpy + 4, mbpy + 4 + mbvexlen * 12))
                mbpy = mbpy + 4 + mbvexlen * 12;
                var mbtexnum = tentosixteen(lum[k].slice(mbpy, mbpy + 4))
                meshblocks[h]["texture"] = []
                for (var i = 0; i < mbtexnum; i++) {
                    meshblocks[h]["texture"].push(hextofloatsz(lum[k].slice(mbpy + 4 + mbvexlen * 8 * i, mbpy + 4 + mbvexlen * 8 * (i + 1))))
                }
                mbpy = mbpy + 4 + mbvexlen * 8 * (meshblocks[h]["texture"].length)
                var mbattrnum = tentosixteen(lum[k].slice(mbpy, mbpy + 4))
                meshblocks[h]["attr"] = hextofloatsz(lum[k].slice(mbpy + 4, mbpy + 4 + mbvexlen * 12))
            }
            // console.log(meshblocks)
            meshobj.meshblocks = meshblocks;
            console.log(meshobj)


            //将解析对象添加到数据库中
            store = db.transaction(["mesh"], "readwrite").objectStore("mesh");
            indexedDBOBJ.contents=meshobj;
            store.put(indexedDBOBJ);
            console.log("--------------------------添加完成-----------------")
            // for (var i = 0; i < meshobj.script.SCRIPT.MATERIAL.length; i++) {
               
                // console.log(meshobj.script.SCRIPT.MATERIAL[i])
                // var x=meshobj.script.SCRIPT.MATERIAL[i].attr.name
                // console.log(meshobj.meshblocks[x])
                // var y=meshobj.script.SCRIPT.MATERIAL[i].DIFFUSE_MAP.MAP["#text"]
                // console.log(meshobj.modelblob[y])
            // }
            //=================================================================================模型加载start=============================================
            var camera, scene, renderer, step = 1;
            var clock = new THREE.Clock();
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setClearColor(0xeeeeee)
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.shadowMapEnabled = true;
            document.body.appendChild(renderer.domElement);
            camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 0, 2)
            scene = new THREE.Scene();
            camera.lookAt(scene.position)
            var trackballControls = new THREE.TrackballControls(camera);
            trackballControls.rotateSpeed = 1.0;
            trackballControls.zoomSpeed = 1.0;
            trackballControls.panSpeed = 1.0;
            var ground = new THREE.PlaneGeometry(20, 20, 50, 50);
            var groundMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff })
            var groundMesh = new THREE.Mesh(ground, groundMaterial)
            groundMesh.receiveShadow = true;
            groundMesh.rotation.x = -0.5 * Math.PI;
            groundMesh.position.set(0, -0.27, -5)
            scene.add(groundMesh);
            var group1 = new THREE.Group();
            group1.position.set(0, 0.3, 0)
            group1.rotation.set(0.5 * Math.PI, Math.PI, 1.1 * Math.PI)
            group1.castShadow = true;
            scene.add(group1)
            var ambiColor = "#999999";
            var ambientLight = new THREE.AmbientLight(ambiColor);
            scene.add(ambientLight);
            var dirLight = new THREE.DirectionalLight(0xffffff);
            dirLight.position.set(-20, 30, 30)
            dirLight.castShadow = true;
            dirLight.shadowCameraNear = 1;
            dirLight.shadowCameraFar = 50;
            dirLight.shadowCameraLeft = -50;
            dirLight.shadowCameraRight = 50;
            dirLight.shadowCameraTop = 50;
            dirLight.shadowCameraBottom = -50;
            // directionalLight.distance = 10;
            dirLight.intensity = 3;
            dirLight.target = group1;
            // dirLight.shadowMapHeight = 1024;
            // dirLight.shadowMapWidth = 1024;
            scene.add(dirLight)
            for (var i = 0; i < meshobj.script.SCRIPT.MATERIAL.length; i++) {
                var x = meshobj.script.SCRIPT.MATERIAL[i].attr.name
                    // console.log(meshobj.meshblocks[x])
                var y = meshobj.script.SCRIPT.MATERIAL[i].DIFFUSE_MAP.MAP["#text"]
                console.log(meshobj.modelblob[y])
                creatMeshs(meshobj.meshblocks[x].indices, meshobj.meshblocks[x].vextex, meshobj.meshblocks[x].texture[0], meshobj.modelblob[y])
            }
            // var mesh1 = creatMeshs(meshobj.meshobj1.indices, meshobj.meshobj1.vextex, meshobj.meshobj1.tex1, meshobj.meshobj1.diffusetexture)
            // var mesh2 = creatMeshs(meshobj.meshobj2.indices, meshobj.meshobj2.vextex, meshobj.meshobj2.tex1, meshobj.meshobj2.diffusetexture)
            // var mesh3 = creatMeshs(meshobj.meshobj3.indices, meshobj.meshobj3.vextex, meshobj.meshobj3.tex1, meshobj.meshobj3.diffusetexture)
            // var mesh4 = creatMeshs(meshobj.meshobj4.indices, meshobj.meshobj4.vextex, meshobj.meshobj4.tex1, meshobj.meshobj4.diffusetexture)
            window.addEventListener('resize', onWindowResize, false);
            function creatMeshs(indicesarr, verticesarr, texarr, blobpic) {
                var geometry = new THREE.Geometry();
                var vertices = []
                for (var i = 0; i < verticesarr.length; i++) {
                    vertices.push(new THREE.Vector3(verticesarr[i++], verticesarr[i++], verticesarr[i]))
                }
                var faces = []
                for (var i = 0; i < indicesarr.length; i++) {
                    faces.push(new THREE.Face3(indicesarr[i++], indicesarr[i++], indicesarr[i]))
                }
                geometry.vertices = vertices;
                geometry.faces = faces;
                geometry.faceVertexUvs[0] = [];
                for (var i = 0; i < faces.length; i++) {
                    geometry.faceVertexUvs[0].push([
                        new THREE.Vector2(texarr[faces[i].a * 2], texarr[faces[i].a * 2 + 1]),
                        new THREE.Vector2(texarr[faces[i].b * 2], texarr[faces[i].b * 2 + 1]),
                        new THREE.Vector2(texarr[faces[i].c * 2], texarr[faces[i].c * 2 + 1])
                    ]);
                }
                // geometry.computeTangents();
                geometry.computeFaceNormals();
                geometry.computeVertexNormals();
                geometry.computeBoundingSphere();
                geometry.uvsNeedUpdate = true;
                if (blobpic) {
                    var reader = new FileReader();
                    reader.readAsDataURL(blobpic);
                    reader.onload = function(e) {
                        var texture = THREE.ImageUtils.loadTexture(e.target.result, null, function(t) {});
                        var material = new THREE.MeshPhongMaterial({
                            map: texture
                        });
                        var mesh = new THREE.Mesh(geometry, material);
                        mesh.castShadow = true;
                        group1.add(mesh);
                        return mesh;
                    }
                }
            }
            // document.onmousewheel=function(ev){
            //     step+=ev.wheelDelta/1200
            //     if(step<=0.1){
            //       step=0.1
            //     }
            //     else if(step>=3.0){
            //       step=3.0
            //     }
            //   }
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
            function animate() {
                var delta = clock.getDelta();
                trackballControls.update(delta);
                // group1.rotation.x+=0.001*Math.PI;
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            }
            animate();
            //=========================================================================模型加载end============================================================
            function blockInfo(arr) {
                var n = tentosixteen(arr.slice(-4));
                var o = [];
                var a = [];
                var p = []
                for (var i = 0; i < n; i++) {
                    o[i] = [];
                    a[i] = arr.slice(-1 * n * 80 - 4).slice((i * 80), (i + 1) * 80)
                    for (var j = 0; j < 4; j++) {
                        p = a[i].slice(j * 4, (j + 1) * 4);
                        o[i][j] = tentosixteen(p)
                    }
                }
                return o;
            }
            function picnames(arr) {
                var a = [];
                var n = tentosixteen(arr.slice(-4));
                for (var i = 0; i < n; i++) {
                    a[i] = arr.slice(-1 * n * 80 - 4).slice((i * 80 + 16), (i + 1) * 80)
                }
                return a;
            }
            //返回一个数字
            function tentosixteen(a) {
                var y = "",
                    z;
                for (var i = 0; i < 4; i++) {
                    if (a[i] < 16) {
                        y = "0" + a[i].toString(16) + y;
                    } else {
                        y = a[i].toString(16) + y;
                    }
                }
                z = parseInt(y, 16);
                return z;
            }
            function tentosixteensz(a) {
                var y = "",
                    z = [];
                for (var i = 0; i < a.length; i++) {
                    if (a[i] < 16) {
                        y = "0" + a[i].toString(16) + y;
                    } else {
                        y = a[i].toString(16) + y;
                    }
                    if ((i + 1) % 4 == 0) {
                        z.push(parseInt(y, 16));
                        y = "";
                    }
                }
                return z;
            }
            function arrToString(arr) {
                var s = ""
                for (var i = 0; i < arr.length; i++) {
                    s += String.fromCharCode(arr[i])
                }
                return s;
            }
            function hextofloatsz(arr) {
                var arr2 = tentosixteenstring(arr);
                var o = []
                for (var i = 0; i < arr2.length; i++) {
                    o.push(HexToSingle(arr2[i]))
                }
                return o;
                function tentosixteenstring(a) {
                    var y = "",
                        z = [];
                    for (var i = 0; i < a.length; i++) {
                        if (a[i] < 16) {
                            y = "0" + a[i].toString(16) + y;
                        } else {
                            y = a[i].toString(16) + y;
                        }
                        if ((i + 1) % 4 == 0) {
                            z.push(y);
                            y = "";
                        }
                    }
                    return z;
                }
                function HexToSingle(t) {
                    t = t.replace(/\s+/g, "");
                    if (t == "") {
                        return "";
                    }
                    if (t == "00000000") {
                        return "0";
                    }
                    if ((t.length > 8) || (isNaN(parseInt(t, 16)))) {
                        return "Error";
                    }
                    if (t.length < 8) {
                        t = FillString(t, "0", 8, true);
                    }
                    t = parseInt(t, 16).toString(2);
                    t = FillString(t, "0", 32, true);
                    var s = t.substring(0, 1);
                    var e = t.substring(1, 9);
                    var m = t.substring(9);
                    e = parseInt(e, 2) - 127;
                    m = "1" + m;
                    if (e >= 0) {
                        m = m.substr(0, e + 1) + "." + m.substring(e + 1)
                    } else {
                        m = "0." + FillString(m, "0", m.length - e - 1, true)
                    }
                    if (m.indexOf(".") == -1) {
                        m = m + ".0";
                    }
                    var a = m.split(".");
                    var mi = parseInt(a[0], 2);
                    var mf = 0;
                    for (var i = 0; i < a[1].length; i++) {
                        mf += parseFloat(a[1].charAt(i)) * Math.pow(2, -(i + 1));
                    }
                    m = parseInt(mi) + parseFloat(mf);
                    if (s == 1) {
                        m = 0 - m;
                    }
                    return m;
                }
                function FillString(t, c, n, b) {
                    if ((t == "") || (c.length != 1) || (n <= t.length)) {
                        return t;
                    }
                    var l = t.length;
                    for (var i = 0; i < n - l; i++) {
                        if (b == true) {
                            t = c + t;
                        } else {
                            t += c;
                        }
                    }
                    return t;
                }
            }
            function xmlToJson(xml) {
                'use strict';
                var obj = {};
                if (xml.nodeType == 1) {
                    if (xml.attributes.length > 0) {
                        obj["attr"] = {};
                        for (var j = 0; j < xml.attributes.length; j++) {
                            var attribute = xml.attributes.item(j);
                            obj["attr"][attribute.nodeName] = attribute.nodeValue;
                        }
                    }
                } else if (xml.nodeType == 3) {
                    obj = xml.nodeValue;
                }
                if (xml.hasChildNodes()) {
                    for (var i = 0; i < xml.childNodes.length; i++) {
                        var item = xml.childNodes.item(i);
                        var nodeName = item.nodeName;
                        if (typeof(obj[nodeName]) == "undefined") {
                            obj[nodeName] = xmlToJson(item);
                        } else {
                            if (typeof(obj[nodeName].push) == "undefined") {
                                var old = obj[nodeName];
                                obj[nodeName] = [];
                                obj[nodeName].push(old);
                            }
                            obj[nodeName].push(xmlToJson(item));
                        }
                    }
                }
                return obj;
            };
            return meshobj;
        });
    }
    // ,
    // ajaxGetArr: function(url, callback) {
    //     var xhr = new XMLHttpRequest() || new ActiveXObject(Microsoft.XMLHTTP);
    //     xhr.open("get", url, true);
    //     //改变获取的data格式。
    //     if ("responseType" in xhr) {
    //         xhr.responseType = "arraybuffer";
    //     }
    //     // older browser
    //     if (xhr.overrideMimeType) {
    //         xhr.overrideMimeType("text/plain; charset=x-user-defined");
    //     }
    //     xhr.onreadystatechange = function(evt) {
    //         var file, err;
    //         // use `xhr` and not `this`... thanks IE
    //         if (xhr.readyState === 4) {
    //             if (xhr.status === 200 || xhr.status === 0) {
    //                 file = null;
    //                 err = null;
    //                 try {
    //                     file = xhr.response || xhr.responseText;;
    //                 } catch (e) {
    //                     err = new Error(e);
    //                 }
    //                 callback(err, file);
    //             } else {
    //                 callback(new Error("Ajax error for " + path + " : " + this.status + " " + this.statusText), null);
    //             }
    //         }
    //     };
    //     xhr.send(null)
    // }
}
        }
    }
}
