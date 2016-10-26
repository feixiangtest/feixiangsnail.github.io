THREE.MAX = function(manager) {
    this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
};
THREE.MAX.prototype = {
    constructor: THREE.MAX,
    load: function(url, onLoad, onProgress, onError) {
        var scope = this;
        var loader = new THREE.XHRLoader(scope.manager);
        loader.setResponseType('arraybuffer');
        loader.load(url, function(text) {
            onLoad(scope.parse(text));
        }, onProgress, onError);
    },
    //========================================================loadmodel======================================
    parse: function(data) {
        var json = this.parseScript(data);
        var json2=JSON.stringify(json);
        var json3=JSON.parse(json2)
        console.log(json3)
        return this.parseObj(json);
    },
    parseObj: function(meshobj) {
        var group1 = new THREE.Group();
        group1.indexs = ""
        for (var i = 0; i < meshobj.MATERIAL.length; i++) {
            var geomName = meshobj.MATERIAL[i].attr.name
            var diffuMapName = meshobj.MATERIAL[i].DIFFUSE_MAP.MAP["#text"]
            var lightMapName = meshobj.MATERIAL[i].LIGHTING_MAP.MAP["#text"]
            if(meshobj.MATERIAL[i].SPECULAR_MAP){
                 var specularMapName = meshobj.MATERIAL[i].SPECULAR_MAP.MAP["#text"]
            }
           
            createMesh(meshobj.MATERIAL[i])
        }
        function createMesh(geoMat) {
            var geometry = new THREE.Geometry();
            var vertices = [],
                faces = [];
            for (var i = 0, l = geoMat.GEOM.vextex.length; i < l; i++) {
                vertices.push(new THREE.Vector3(geoMat.GEOM.vextex[i++], geoMat.GEOM.vextex[i++], geoMat.GEOM.vextex[i]))
            }
            for (var i = 0, l = geoMat.GEOM.indices.length; i < l; i++) {
                faces.push(new THREE.Face3(geoMat.GEOM.indices[i++], geoMat.GEOM.indices[i++], geoMat.GEOM.indices[i]))
            }
            geometry.vertices = vertices;
            geometry.faces = faces;
            var f0 = geoMat.DIFFUSE_MAP.CHANNEL['#text']
            var f1 = geoMat.LIGHTING_MAP.CHANNEL['#text'];
            
            geometry.faceVertexUvs[0] = [];
            for (var i = 0, l = faces.length; i < l; i++) {
                geometry.faceVertexUvs[0].push([
                    new THREE.Vector2(geoMat.GEOM.texture[f0][faces[i].a * 2], geoMat.GEOM.texture[f0][faces[i].a * 2 + 1]),
                    new THREE.Vector2(geoMat.GEOM.texture[f0][faces[i].b * 2], geoMat.GEOM.texture[f0][faces[i].b * 2 + 1]),
                    new THREE.Vector2(geoMat.GEOM.texture[f0][faces[i].c * 2], geoMat.GEOM.texture[f0][faces[i].c * 2 + 1])
                ]);
            }

            geometry.faceVertexUvs[1] = [];
            for (var i = 0, l = faces.length; i < l; i++) {
                geometry.faceVertexUvs[1].push([
                    new THREE.Vector2(geoMat.GEOM.texture[f1][faces[i].a * 2], geoMat.GEOM.texture[f1][faces[i].a * 2 + 1]),
                    new THREE.Vector2(geoMat.GEOM.texture[f1][faces[i].b * 2], geoMat.GEOM.texture[f1][faces[i].b * 2 + 1]),
                    new THREE.Vector2(geoMat.GEOM.texture[f1][faces[i].c * 2], geoMat.GEOM.texture[f1][faces[i].c * 2 + 1])
                ]);
            }
           
            
           
            
            
            geometry.computeFaceNormals();
            geometry.computeVertexNormals();
            geometry.computeBoundingSphere();
            geometry.uvsNeedUpdate = true;
            var material = new THREE.MeshPhongMaterial({
               

            });
            if (geoMat.DIFFUSE_MAP[diffuMapName]) {
                
                var reader = new FileReader();
                reader.readAsDataURL(geoMat.DIFFUSE_MAP[diffuMapName]);
                reader.onload = function(e) {
                    
                    var loader = new THREE.TextureLoader();
                    var texture1 = loader.load(e.target.result, function(tex) {
                        material.map = tex;
                        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
                        material.map.needsUpdate = true;
                        material.needsUpdate = true;
                        group1.add(mesh);
                    })
                }
            }
           
            
                
                new THREE.TextureLoader().load('picture/lightmap.png',function(tex) {
                        
                        material.lightMap = tex;
                        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
                        material.lightMap.needsUpdate = true;
                        material.needsUpdate = true;
                        group1.add(mesh);
                    });
            
            
           
                    
            //      if (geoMat.LIGHTING_MAP[lightMapName]) {
               
            //     var reader2 = new FileReader();
            //     reader2.readAsDataURL(geoMat.LIGHTING_MAP[lightMapName]);
            //     reader2.onload = function(e) {
                    
            //         var loader2 = new THREE.TextureLoader();
            //         var texture2 = loader2.load(e.target.result, function(tex) {
            //             material.lightMap = tex;
            //             tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            //             tex.needsUpdate = true;
            //             material.needsUpdate = true;
            //             group1.add(mesh);
            //         })
            //     }
            // }
            

                 
            if (geoMat.SPECULAR_MAP&&geoMat.SPECULAR_MAP[specularMapName]) {
               
                var reader3 = new FileReader();
                reader3.readAsDataURL(geoMat.SPECULAR_MAP[specularMapName]);
                reader3.onload = function(e) {
                    
                    var loader3 = new THREE.TextureLoader();
                    var texture3 = loader3.load(e.target.result, function(tex) {
                        material.specularMap = tex;
                        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
                        tex.needsUpdate = true;                       
                        material.needsUpdate = true;
                        group1.add(mesh);
                    })
                }
            }
            var mesh = new THREE.Mesh(geometry, material);
        }
        return group1
    },
    parseScript: function(data) {
        var arrdata = new Uint8Array(data),
            n = tentosixteen(arrdata.slice(-4)),
            meshobj = {},
            blockInformation = blockInfo(arrdata),
            k = blockInformation.modelInfo,
            meshdata = arrdata.slice(k[0][0], (k[0][0] + k[0][1])),
            meshscript = arrdata.slice(k[1][0], (k[1][0] + k[1][2])),
            modelblob = blockInformation.modelblob,
            lum = [],
            meshblocks = {};
        var parser = new DOMParser();
        var result0 = pako.inflate(meshscript, {
            to: 'string'
        })
        var result = result0.replace(/[\t\n\x0B\f\r]/ig, "")
        var xml = parser.parseFromString(result, "text/xml");
        meshobj = xmlToJson(xml).SCRIPT;
        var filenamearr = blockInformation.blockName;
        // //将每一块小mesh放入lum数组中。这里用到了while循环切割。
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
        var time1 = new Date();
        //解析每个lum内容的索引，顶点，纹理坐标等数据。
        for (var k = 0, l = lum.length; k < l; k++) {
            var mbpy;
            var mbnamelen = tentosixteen(lum[k].slice(0, 4));
            var mbkey = arrToString(lum[k].slice(4, mbnamelen + 3))
            meshblocks[mbkey] = {}
            mbpy = mbnamelen + 4;
            var mbindicelen = tentosixteen(lum[k].slice(mbpy, mbpy + 4));
            meshblocks[mbkey]["indices"] = tentosixteensz(lum[k].slice(mbpy + 4, mbpy + 4 + mbindicelen * 4))
            mbpy = mbpy + 4 + mbindicelen * 4
            var mbvexlen = tentosixteen(lum[k].slice(mbpy, mbpy + 4))
            meshblocks[mbkey]["vextex"] = HexToFloat(lum[k].slice(mbpy + 4, mbpy + 4 + mbvexlen * 12))
            mbpy = mbpy + 4 + mbvexlen * 12;
            var mbtexnum = tentosixteen(lum[k].slice(mbpy, mbpy + 4))
            meshblocks[mbkey]["texture"] = []
            for (var i = 0; i < mbtexnum; i++) {
                var temarr=HexToFloat(lum[k].slice(mbpy + 4 + mbvexlen * 8 * i, mbpy + 4 + mbvexlen * 8 * (i + 1)))
                
                for(var t=0;t<temarr.length;t++){
                    if(t%2==1){
                       temarr[t]=1-temarr[t];
                    }
                    
                }
                meshblocks[mbkey]["texture"].push(temarr)
               
            }
            mbpy = mbpy + 4 + mbvexlen * 8 * (meshblocks[mbkey]["texture"].length)
            var mbattrnum = tentosixteen(lum[k].slice(mbpy, mbpy + 4))
            meshblocks[mbkey]["attr"] = HexToFloat(lum[k].slice(mbpy + 4, mbpy + 4 + mbvexlen * 12))
        }
        var time2 = new Date();
        console.log(time2 - time1)
            //=================================================================================模型加载start
        meshblocks.name = "geometry信息"
        modelblob.name = "纹理信息"
        console.log(meshblocks)
        console.log(modelblob)
        console.log(meshobj)
        if (!(meshobj.MATERIAL instanceof Array)) {
            meshobj.MATERIAL = [meshobj.MATERIAL]
        }
        for (var i = 0; i < meshobj.MATERIAL.length; i++) {
            var geomName = meshobj.MATERIAL[i].attr.name
            var diffuMapName = meshobj.MATERIAL[i].DIFFUSE_MAP.MAP["#text"]
            var lightMapName = meshobj.MATERIAL[i].LIGHTING_MAP.MAP["#text"]
            if(meshobj.MATERIAL[i].SPECULAR_MAP){
                var specularMapName = meshobj.MATERIAL[i].SPECULAR_MAP.MAP["#text"]
            meshobj.MATERIAL[i].SPECULAR_MAP[specularMapName] = modelblob[specularMapName];
            }
            
            meshobj.MATERIAL[i].GEOM = meshblocks[geomName]
            meshobj.MATERIAL[i].DIFFUSE_MAP[diffuMapName] = modelblob[diffuMapName];
            meshobj.MATERIAL[i].LIGHTING_MAP[lightMapName] = modelblob[lightMapName];
            
        }
        //=========================================================================模型加载end====================
        //获取文件的信息，包括模型数据的偏移大小，每一块的名字，图片文件。
        function blockInfo(arr) {
            var o = [];
            var a = [];
            var p = [];
            var q = [];
            var filenamearr = [];
            var sli;
            var modelblob = {};
            for (var i = 0; i < n; i++) {
                o[i] = [];
                sli = arr.slice(-1 * n * 80 - 4)
                a[i] = sli.slice((i * 80), (i + 1) * 80)
                q[i] = sli.slice((i * 80 + 16), (i + 1) * 80)
                for (var j = 0; j < 4; j++) {
                    p = a[i].slice(j * 4, (j + 1) * 4);
                    o[i][j] = tentosixteen(p)
                }
                filenamearr[i] = "";
                for (var k = 0; k < 64; k++) {
                    if (q[i][k] == 0) {
                        break;
                    }
                    filenamearr[i] += String.fromCharCode(q[i][k])
                }
                if (i > 1) {
                    modelblob[filenamearr[i]] = new Blob([arr.slice(o[i][0], (o[i][0] + o[i][1]))])
                }
            }
            return { modelInfo: o, blockName: filenamearr, modelblob: modelblob }
        }
        //将数组的数字转为16进制再转回来（由于小端存储需要换位置），返回一个数字。
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
        //这里是返回一个数组
        function tentosixteensz(a) {
            var y = "",
                z = [];
            for (var i = 0, l = a.length; i < l; i++) {
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
            for (var i = 0, l = arr.length; i < l; i++) {
                s += String.fromCharCode(arr[i])
            }
            return s;
        }
        //16进制数转为浮点数。
        function HexToFloat(a) {
            var y = "",
                o = [],
                z = [];
            for (var i = 0, l = a.length; i < l; i++) {
                if (a[i] < 16) {
                    y = "0" + a[i].toString(16) + y;
                } else {
                    y = a[i].toString(16) + y;
                }
                if ((i + 1) % 4 == 0) {
                    o.push(HexToSingle(y))
                    y = "";
                }
            }
            return o;
        }
        function HexToSingle(t) {
            t = t.replace(/\s+/g, "");
            if (t == "") {
                return "";
            }
            if (t == "00000000") {
                return 0;
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
    }
}
