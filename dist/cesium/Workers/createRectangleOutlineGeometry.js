/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.95
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
define(["./defaultValue-97284df2","./Matrix2-73789715","./Transforms-d3d3b2a9","./ComponentDatatype-e7fbe225","./RuntimeError-4f8ec8a2","./GeometryAttribute-fd1d7e90","./GeometryAttributes-734a3446","./GeometryOffsetAttribute-59b14f45","./IndexDatatype-65271ba3","./PolygonPipeline-00dc0c6e","./RectangleGeometryLibrary-cff60d30","./_commonjsHelpers-3aae1032-65601a27","./combine-d11b1f00","./WebGLConstants-6da700a2","./EllipsoidRhumbLine-60f14314"],(function(e,t,i,n,o,a,r,l,s,u,c,p,d,f,g){"use strict";const h=new i.BoundingSphere,y=new i.BoundingSphere,m=new t.Cartesian3,b=new t.Rectangle;function _(e,t){const i=e._ellipsoid,o=t.height,l=t.width,u=t.northCap,p=t.southCap;let d=o,f=2,g=0,h=4;u&&(f-=1,d-=1,g+=1,h-=2),p&&(f-=1,d-=1,g+=1,h-=2),g+=f*l+2*d-h;const y=new Float64Array(3*g);let b,_=0,E=0;const A=m;if(u)c.RectangleGeometryLibrary.computePosition(t,i,!1,E,0,A),y[_++]=A.x,y[_++]=A.y,y[_++]=A.z;else for(b=0;b<l;b++)c.RectangleGeometryLibrary.computePosition(t,i,!1,E,b,A),y[_++]=A.x,y[_++]=A.y,y[_++]=A.z;for(b=l-1,E=1;E<o;E++)c.RectangleGeometryLibrary.computePosition(t,i,!1,E,b,A),y[_++]=A.x,y[_++]=A.y,y[_++]=A.z;if(E=o-1,!p)for(b=l-2;b>=0;b--)c.RectangleGeometryLibrary.computePosition(t,i,!1,E,b,A),y[_++]=A.x,y[_++]=A.y,y[_++]=A.z;for(b=0,E=o-2;E>0;E--)c.RectangleGeometryLibrary.computePosition(t,i,!1,E,b,A),y[_++]=A.x,y[_++]=A.y,y[_++]=A.z;const G=y.length/3*2,R=s.IndexDatatype.createTypedArray(y.length/3,G);let P=0;for(let e=0;e<y.length/3-1;e++)R[P++]=e,R[P++]=e+1;R[P++]=y.length/3-1,R[P++]=0;const L=new a.Geometry({attributes:new r.GeometryAttributes,primitiveType:a.PrimitiveType.LINES});return L.attributes.position=new a.GeometryAttribute({componentDatatype:n.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:y}),L.indices=R,L}function E(i){const o=(i=e.defaultValue(i,e.defaultValue.EMPTY_OBJECT)).rectangle,a=e.defaultValue(i.granularity,n.CesiumMath.RADIANS_PER_DEGREE),r=e.defaultValue(i.ellipsoid,t.Ellipsoid.WGS84),l=e.defaultValue(i.rotation,0),s=e.defaultValue(i.height,0),u=e.defaultValue(i.extrudedHeight,s);this._rectangle=t.Rectangle.clone(o),this._granularity=a,this._ellipsoid=r,this._surfaceHeight=Math.max(s,u),this._rotation=l,this._extrudedHeight=Math.min(s,u),this._offsetAttribute=i.offsetAttribute,this._workerName="createRectangleOutlineGeometry"}E.packedLength=t.Rectangle.packedLength+t.Ellipsoid.packedLength+5,E.pack=function(i,n,o){return o=e.defaultValue(o,0),t.Rectangle.pack(i._rectangle,n,o),o+=t.Rectangle.packedLength,t.Ellipsoid.pack(i._ellipsoid,n,o),o+=t.Ellipsoid.packedLength,n[o++]=i._granularity,n[o++]=i._surfaceHeight,n[o++]=i._rotation,n[o++]=i._extrudedHeight,n[o]=e.defaultValue(i._offsetAttribute,-1),n};const A=new t.Rectangle,G=t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),R={rectangle:A,ellipsoid:G,granularity:void 0,height:void 0,rotation:void 0,extrudedHeight:void 0,offsetAttribute:void 0};E.unpack=function(i,n,o){n=e.defaultValue(n,0);const a=t.Rectangle.unpack(i,n,A);n+=t.Rectangle.packedLength;const r=t.Ellipsoid.unpack(i,n,G);n+=t.Ellipsoid.packedLength;const l=i[n++],s=i[n++],u=i[n++],c=i[n++],p=i[n];return e.defined(o)?(o._rectangle=t.Rectangle.clone(a,o._rectangle),o._ellipsoid=t.Ellipsoid.clone(r,o._ellipsoid),o._surfaceHeight=s,o._rotation=u,o._extrudedHeight=c,o._offsetAttribute=-1===p?void 0:p,o):(R.granularity=l,R.height=s,R.rotation=u,R.extrudedHeight=c,R.offsetAttribute=-1===p?void 0:p,new E(R))};const P=new t.Cartographic;return E.createGeometry=function(t){const o=t._rectangle,r=t._ellipsoid,p=c.RectangleGeometryLibrary.computeOptions(o,t._granularity,t._rotation,0,b,P);let d,f;if(n.CesiumMath.equalsEpsilon(o.north,o.south,n.CesiumMath.EPSILON10)||n.CesiumMath.equalsEpsilon(o.east,o.west,n.CesiumMath.EPSILON10))return;const g=t._surfaceHeight,m=t._extrudedHeight;let E;if(!n.CesiumMath.equalsEpsilon(g,m,0,n.CesiumMath.EPSILON2)){if(d=function(e,t){const i=e._surfaceHeight,n=e._extrudedHeight,o=e._ellipsoid,a=n,r=i,l=_(e,t),c=t.height,p=t.width,d=u.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,r,o,!1);let f=d.length;const g=new Float64Array(2*f);g.set(d);const h=u.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,a,o);g.set(h,f),l.attributes.position.values=g;const y=t.northCap,m=t.southCap;let b=4;y&&(b-=1),m&&(b-=1);const E=2*(g.length/3+b),A=s.IndexDatatype.createTypedArray(g.length/3,E);f=g.length/6;let G,R=0;for(let e=0;e<f-1;e++)A[R++]=e,A[R++]=e+1,A[R++]=e+f,A[R++]=e+f+1;if(A[R++]=f-1,A[R++]=0,A[R++]=f+f-1,A[R++]=f,A[R++]=0,A[R++]=f,y)G=c-1;else{const e=p-1;A[R++]=e,A[R++]=e+f,G=p+c-2}if(A[R++]=G,A[R++]=G+f,!m){const e=p+G-1;A[R++]=e,A[R]=e+f}return l.indices=A,l}(t,p),e.defined(t._offsetAttribute)){const e=d.attributes.position.values.length/3;let i=new Uint8Array(e);t._offsetAttribute===l.GeometryOffsetAttribute.TOP?i=i.fill(1,0,e/2):(E=t._offsetAttribute===l.GeometryOffsetAttribute.NONE?0:1,i=i.fill(E)),d.attributes.applyOffset=new a.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:i})}const c=i.BoundingSphere.fromRectangle3D(o,r,g,y),b=i.BoundingSphere.fromRectangle3D(o,r,m,h);f=i.BoundingSphere.union(c,b)}else{if(d=_(t,p),d.attributes.position.values=u.PolygonPipeline.scaleToGeodeticHeight(d.attributes.position.values,g,r,!1),e.defined(t._offsetAttribute)){const e=d.attributes.position.values.length;E=t._offsetAttribute===l.GeometryOffsetAttribute.NONE?0:1;const i=new Uint8Array(e/3).fill(E);d.attributes.applyOffset=new a.GeometryAttribute({componentDatatype:n.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:i})}f=i.BoundingSphere.fromRectangle3D(o,r,g)}return new a.Geometry({attributes:d.attributes,indices:d.indices,primitiveType:a.PrimitiveType.LINES,boundingSphere:f,offsetAttribute:t._offsetAttribute})},function(i,n){return e.defined(n)&&(i=E.unpack(i,n)),i._ellipsoid=t.Ellipsoid.clone(i._ellipsoid),i._rectangle=t.Rectangle.clone(i._rectangle),E.createGeometry(i)}}));
