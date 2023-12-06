(()=>{var UA=Object.create;var sp=Object.defineProperty;var qA=Object.getOwnPropertyDescriptor;var jA=Object.getOwnPropertyNames;var GA=Object.getPrototypeOf,HA=Object.prototype.hasOwnProperty;var on=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var j=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),KA=(t,e)=>{for(var r in e)sp(t,r,{get:e[r],enumerable:!0})},WA=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of jA(e))!HA.call(t,i)&&i!==r&&sp(t,i,{get:()=>e[i],enumerable:!(n=qA(e,i))||n.enumerable});return t};var de=(t,e,r)=>(r=t!=null?UA(GA(t)):{},WA(e||!t||!t.__esModule?sp(r,"default",{value:t,enumerable:!0}):r,t));var su=j(wt=>{"use strict";Object.defineProperty(wt,"__esModule",{value:!0});wt.thenable=wt.typedArray=wt.stringArray=wt.array=wt.func=wt.error=wt.number=wt.string=wt.boolean=void 0;function BA(t){return t===!0||t===!1}wt.boolean=BA;function Zg(t){return typeof t=="string"||t instanceof String}wt.string=Zg;function zA(t){return typeof t=="number"||t instanceof Number}wt.number=zA;function VA(t){return t instanceof Error}wt.error=VA;function ey(t){return typeof t=="function"}wt.func=ey;function ty(t){return Array.isArray(t)}wt.array=ty;function XA(t){return ty(t)&&t.every(e=>Zg(e))}wt.stringArray=XA;function YA(t,e){return Array.isArray(t)&&t.every(e)}wt.typedArray=YA;function JA(t){return t&&ey(t.then)}wt.thenable=JA});var An=j(up=>{"use strict";Object.defineProperty(up,"__esModule",{value:!0});var ap;function cp(){if(ap===void 0)throw new Error("No runtime abstraction layer installed");return ap}(function(t){function e(r){if(r===void 0)throw new Error("No runtime abstraction layer provided");ap=r}t.install=e})(cp||(cp={}));up.default=cp});var au=j($a=>{"use strict";Object.defineProperty($a,"__esModule",{value:!0});$a.Disposable=void 0;var QA;(function(t){function e(r){return{dispose:r}}t.create=e})(QA=$a.Disposable||($a.Disposable={}))});var fp=j(cu=>{"use strict";Object.defineProperty(cu,"__esModule",{value:!0});cu.AbstractMessageBuffer=void 0;var ZA=13,ek=10,tk=`\r
`,lp=class{constructor(e="utf-8"){this._encoding=e,this._chunks=[],this._totalLength=0}get encoding(){return this._encoding}append(e){let r=typeof e=="string"?this.fromString(e,this._encoding):e;this._chunks.push(r),this._totalLength+=r.byteLength}tryReadHeaders(){if(this._chunks.length===0)return;let e=0,r=0,n=0,i=0;e:for(;r<this._chunks.length;){let c=this._chunks[r];for(n=0;n<c.length;){switch(c[n]){case ZA:switch(e){case 0:e=1;break;case 2:e=3;break;default:e=0}break;case ek:switch(e){case 1:e=2;break;case 3:e=4,n++;break e;default:e=0}break;default:e=0}n++}i+=c.byteLength,r++}if(e!==4)return;let o=this._read(i+n),s=new Map,a=this.toString(o,"ascii").split(tk);if(a.length<2)return s;for(let c=0;c<a.length-2;c++){let u=a[c],l=u.indexOf(":");if(l===-1)throw new Error("Message header must separate key and value using :");let f=u.substr(0,l),m=u.substr(l+1).trim();s.set(f,m)}return s}tryReadBody(e){if(!(this._totalLength<e))return this._read(e)}get numberOfBytes(){return this._totalLength}_read(e){if(e===0)return this.emptyBuffer();if(e>this._totalLength)throw new Error("Cannot read so many bytes!");if(this._chunks[0].byteLength===e){let o=this._chunks[0];return this._chunks.shift(),this._totalLength-=e,this.asNative(o)}if(this._chunks[0].byteLength>e){let o=this._chunks[0],s=this.asNative(o,e);return this._chunks[0]=o.slice(e),this._totalLength-=e,s}let r=this.allocNative(e),n=0,i=0;for(;e>0;){let o=this._chunks[i];if(o.byteLength>e){let s=o.slice(0,e);r.set(s,n),n+=e,this._chunks[i]=o.slice(e),this._totalLength-=e,e-=e}else r.set(o,n),n+=o.byteLength,this._chunks.shift(),this._totalLength-=o.byteLength,e-=o.byteLength}return r}};cu.AbstractMessageBuffer=lp});var iy=j(hp=>{"use strict";Object.defineProperty(hp,"__esModule",{value:!0});var rk=An(),ry=on("util"),ao=au(),nk=fp(),uu=class t extends nk.AbstractMessageBuffer{constructor(e="utf-8"){super(e)}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return Buffer.from(e,r)}toString(e,r){return e instanceof Buffer?e.toString(r):new ry.TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e instanceof Buffer?e:Buffer.from(e):e instanceof Buffer?e.slice(0,r):Buffer.from(e,0,r)}allocNative(e){return Buffer.allocUnsafe(e)}};uu.emptyBuffer=Buffer.allocUnsafe(0);var dp=class{constructor(e){this.stream=e}onClose(e){return this.stream.on("close",e),ao.Disposable.create(()=>this.stream.off("close",e))}onError(e){return this.stream.on("error",e),ao.Disposable.create(()=>this.stream.off("error",e))}onEnd(e){return this.stream.on("end",e),ao.Disposable.create(()=>this.stream.off("end",e))}onData(e){return this.stream.on("data",e),ao.Disposable.create(()=>this.stream.off("data",e))}},pp=class{constructor(e){this.stream=e}onClose(e){return this.stream.on("close",e),ao.Disposable.create(()=>this.stream.off("close",e))}onError(e){return this.stream.on("error",e),ao.Disposable.create(()=>this.stream.off("error",e))}onEnd(e){return this.stream.on("end",e),ao.Disposable.create(()=>this.stream.off("end",e))}write(e,r){return new Promise((n,i)=>{let o=s=>{s==null?n():i(s)};typeof e=="string"?this.stream.write(e,r,o):this.stream.write(e,o)})}end(){this.stream.end()}},ny=Object.freeze({messageBuffer:Object.freeze({create:t=>new uu(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{try{return Promise.resolve(Buffer.from(JSON.stringify(t,void 0,0),e.charset))}catch(r){return Promise.reject(r)}}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{try{return t instanceof Buffer?Promise.resolve(JSON.parse(t.toString(e.charset))):Promise.resolve(JSON.parse(new ry.TextDecoder(e.charset).decode(t)))}catch(r){return Promise.reject(r)}}})}),stream:Object.freeze({asReadableStream:t=>new dp(t),asWritableStream:t=>new pp(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setImmediate(t,...e);return{dispose:()=>clearImmediate(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function mp(){return ny}(function(t){function e(){rk.default.install(ny)}t.install=e})(mp||(mp={}));hp.default=mp});var zo=j(rr=>{"use strict";Object.defineProperty(rr,"__esModule",{value:!0});rr.stringArray=rr.array=rr.func=rr.error=rr.number=rr.string=rr.boolean=void 0;function ik(t){return t===!0||t===!1}rr.boolean=ik;function oy(t){return typeof t=="string"||t instanceof String}rr.string=oy;function ok(t){return typeof t=="number"||t instanceof Number}rr.number=ok;function sk(t){return t instanceof Error}rr.error=sk;function ak(t){return typeof t=="function"}rr.func=ak;function sy(t){return Array.isArray(t)}rr.array=sy;function ck(t){return sy(t)&&t.every(e=>oy(e))}rr.stringArray=ck});var Up=j(V=>{"use strict";Object.defineProperty(V,"__esModule",{value:!0});V.Message=V.NotificationType9=V.NotificationType8=V.NotificationType7=V.NotificationType6=V.NotificationType5=V.NotificationType4=V.NotificationType3=V.NotificationType2=V.NotificationType1=V.NotificationType0=V.NotificationType=V.RequestType9=V.RequestType8=V.RequestType7=V.RequestType6=V.RequestType5=V.RequestType4=V.RequestType3=V.RequestType2=V.RequestType1=V.RequestType=V.RequestType0=V.AbstractMessageSignature=V.ParameterStructures=V.ResponseError=V.ErrorCodes=void 0;var co=zo(),ay;(function(t){t.ParseError=-32700,t.InvalidRequest=-32600,t.MethodNotFound=-32601,t.InvalidParams=-32602,t.InternalError=-32603,t.jsonrpcReservedErrorRangeStart=-32099,t.serverErrorStart=-32099,t.MessageWriteError=-32099,t.MessageReadError=-32098,t.PendingResponseRejected=-32097,t.ConnectionInactive=-32096,t.ServerNotInitialized=-32002,t.UnknownErrorCode=-32001,t.jsonrpcReservedErrorRangeEnd=-32e3,t.serverErrorEnd=-32e3})(ay=V.ErrorCodes||(V.ErrorCodes={}));var gp=class t extends Error{constructor(e,r,n){super(r),this.code=co.number(e)?e:ay.UnknownErrorCode,this.data=n,Object.setPrototypeOf(this,t.prototype)}toJson(){let e={code:this.code,message:this.message};return this.data!==void 0&&(e.data=this.data),e}};V.ResponseError=gp;var br=class t{constructor(e){this.kind=e}static is(e){return e===t.auto||e===t.byName||e===t.byPosition}toString(){return this.kind}};V.ParameterStructures=br;br.auto=new br("auto");br.byPosition=new br("byPosition");br.byName=new br("byName");var Ye=class{constructor(e,r){this.method=e,this.numberOfParams=r}get parameterStructures(){return br.auto}};V.AbstractMessageSignature=Ye;var yp=class extends Ye{constructor(e){super(e,0)}};V.RequestType0=yp;var Tp=class extends Ye{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType=Tp;var vp=class extends Ye{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.RequestType1=vp;var Rp=class extends Ye{constructor(e){super(e,2)}};V.RequestType2=Rp;var xp=class extends Ye{constructor(e){super(e,3)}};V.RequestType3=xp;var bp=class extends Ye{constructor(e){super(e,4)}};V.RequestType4=bp;var Sp=class extends Ye{constructor(e){super(e,5)}};V.RequestType5=Sp;var wp=class extends Ye{constructor(e){super(e,6)}};V.RequestType6=wp;var Cp=class extends Ye{constructor(e){super(e,7)}};V.RequestType7=Cp;var Ap=class extends Ye{constructor(e){super(e,8)}};V.RequestType8=Ap;var kp=class extends Ye{constructor(e){super(e,9)}};V.RequestType9=kp;var Ep=class extends Ye{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType=Ep;var _p=class extends Ye{constructor(e){super(e,0)}};V.NotificationType0=_p;var Np=class extends Ye{constructor(e,r=br.auto){super(e,1),this._parameterStructures=r}get parameterStructures(){return this._parameterStructures}};V.NotificationType1=Np;var $p=class extends Ye{constructor(e){super(e,2)}};V.NotificationType2=$p;var Ip=class extends Ye{constructor(e){super(e,3)}};V.NotificationType3=Ip;var Pp=class extends Ye{constructor(e){super(e,4)}};V.NotificationType4=Pp;var Dp=class extends Ye{constructor(e){super(e,5)}};V.NotificationType5=Dp;var Op=class extends Ye{constructor(e){super(e,6)}};V.NotificationType6=Op;var Lp=class extends Ye{constructor(e){super(e,7)}};V.NotificationType7=Lp;var Mp=class extends Ye{constructor(e){super(e,8)}};V.NotificationType8=Mp;var Fp=class extends Ye{constructor(e){super(e,9)}};V.NotificationType9=Fp;var uk;(function(t){function e(i){let o=i;return o&&co.string(o.method)&&(co.string(o.id)||co.number(o.id))}t.isRequest=e;function r(i){let o=i;return o&&co.string(o.method)&&i.id===void 0}t.isNotification=r;function n(i){let o=i;return o&&(o.result!==void 0||!!o.error)&&(co.string(o.id)||co.number(o.id)||o.id===null)}t.isResponse=n})(uk=V.Message||(V.Message={}))});var jp=j(Qn=>{"use strict";var cy;Object.defineProperty(Qn,"__esModule",{value:!0});Qn.LRUCache=Qn.LinkedMap=Qn.Touch=void 0;var fr;(function(t){t.None=0,t.First=1,t.AsOld=t.First,t.Last=2,t.AsNew=t.Last})(fr=Qn.Touch||(Qn.Touch={}));var lu=class{constructor(){this[cy]="LinkedMap",this._map=new Map,this._head=void 0,this._tail=void 0,this._size=0,this._state=0}clear(){this._map.clear(),this._head=void 0,this._tail=void 0,this._size=0,this._state++}isEmpty(){return!this._head&&!this._tail}get size(){return this._size}get first(){return this._head?.value}get last(){return this._tail?.value}has(e){return this._map.has(e)}get(e,r=fr.None){let n=this._map.get(e);if(n)return r!==fr.None&&this.touch(n,r),n.value}set(e,r,n=fr.None){let i=this._map.get(e);if(i)i.value=r,n!==fr.None&&this.touch(i,n);else{switch(i={key:e,value:r,next:void 0,previous:void 0},n){case fr.None:this.addItemLast(i);break;case fr.First:this.addItemFirst(i);break;case fr.Last:this.addItemLast(i);break;default:this.addItemLast(i);break}this._map.set(e,i),this._size++}return this}delete(e){return!!this.remove(e)}remove(e){let r=this._map.get(e);if(r)return this._map.delete(e),this.removeItem(r),this._size--,r.value}shift(){if(!this._head&&!this._tail)return;if(!this._head||!this._tail)throw new Error("Invalid list");let e=this._head;return this._map.delete(e.key),this.removeItem(e),this._size--,e.value}forEach(e,r){let n=this._state,i=this._head;for(;i;){if(r?e.bind(r)(i.value,i.key,this):e(i.value,i.key,this),this._state!==n)throw new Error("LinkedMap got modified during iteration.");i=i.next}}keys(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.key,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}values(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:r.value,done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}entries(){let e=this._state,r=this._head,n={[Symbol.iterator]:()=>n,next:()=>{if(this._state!==e)throw new Error("LinkedMap got modified during iteration.");if(r){let i={value:[r.key,r.value],done:!1};return r=r.next,i}else return{value:void 0,done:!0}}};return n}[(cy=Symbol.toStringTag,Symbol.iterator)](){return this.entries()}trimOld(e){if(e>=this.size)return;if(e===0){this.clear();return}let r=this._head,n=this.size;for(;r&&n>e;)this._map.delete(r.key),r=r.next,n--;this._head=r,this._size=n,r&&(r.previous=void 0),this._state++}addItemFirst(e){if(!this._head&&!this._tail)this._tail=e;else if(this._head)e.next=this._head,this._head.previous=e;else throw new Error("Invalid list");this._head=e,this._state++}addItemLast(e){if(!this._head&&!this._tail)this._head=e;else if(this._tail)e.previous=this._tail,this._tail.next=e;else throw new Error("Invalid list");this._tail=e,this._state++}removeItem(e){if(e===this._head&&e===this._tail)this._head=void 0,this._tail=void 0;else if(e===this._head){if(!e.next)throw new Error("Invalid list");e.next.previous=void 0,this._head=e.next}else if(e===this._tail){if(!e.previous)throw new Error("Invalid list");e.previous.next=void 0,this._tail=e.previous}else{let r=e.next,n=e.previous;if(!r||!n)throw new Error("Invalid list");r.previous=n,n.next=r}e.next=void 0,e.previous=void 0,this._state++}touch(e,r){if(!this._head||!this._tail)throw new Error("Invalid list");if(!(r!==fr.First&&r!==fr.Last)){if(r===fr.First){if(e===this._head)return;let n=e.next,i=e.previous;e===this._tail?(i.next=void 0,this._tail=i):(n.previous=i,i.next=n),e.previous=void 0,e.next=this._head,this._head.previous=e,this._head=e,this._state++}else if(r===fr.Last){if(e===this._tail)return;let n=e.next,i=e.previous;e===this._head?(n.previous=void 0,this._head=n):(n.previous=i,i.next=n),e.next=void 0,e.previous=this._tail,this._tail.next=e,this._tail=e,this._state++}}}toJSON(){let e=[];return this.forEach((r,n)=>{e.push([n,r])}),e}fromJSON(e){this.clear();for(let[r,n]of e)this.set(r,n)}};Qn.LinkedMap=lu;var qp=class extends lu{constructor(e,r=1){super(),this._limit=e,this._ratio=Math.min(Math.max(0,r),1)}get limit(){return this._limit}set limit(e){this._limit=e,this.checkTrim()}get ratio(){return this._ratio}set ratio(e){this._ratio=Math.min(Math.max(0,e),1),this.checkTrim()}get(e,r=fr.AsNew){return super.get(e,r)}peek(e){return super.get(e,fr.None)}set(e,r){return super.set(e,r,fr.Last),this.checkTrim(),this}checkTrim(){this.size>this._limit&&this.trimOld(Math.round(this._limit*this._ratio))}};Qn.LRUCache=qp});var lo=j(uo=>{"use strict";Object.defineProperty(uo,"__esModule",{value:!0});uo.Emitter=uo.Event=void 0;var lk=An(),fk;(function(t){let e={dispose(){}};t.None=function(){return e}})(fk=uo.Event||(uo.Event={}));var Gp=class{add(e,r=null,n){this._callbacks||(this._callbacks=[],this._contexts=[]),this._callbacks.push(e),this._contexts.push(r),Array.isArray(n)&&n.push({dispose:()=>this.remove(e,r)})}remove(e,r=null){if(!this._callbacks)return;let n=!1;for(let i=0,o=this._callbacks.length;i<o;i++)if(this._callbacks[i]===e)if(this._contexts[i]===r){this._callbacks.splice(i,1),this._contexts.splice(i,1);return}else n=!0;if(n)throw new Error("When adding a listener with a context, you should remove it with the same context")}invoke(...e){if(!this._callbacks)return[];let r=[],n=this._callbacks.slice(0),i=this._contexts.slice(0);for(let o=0,s=n.length;o<s;o++)try{r.push(n[o].apply(i[o],e))}catch(a){(0,lk.default)().console.error(a)}return r}isEmpty(){return!this._callbacks||this._callbacks.length===0}dispose(){this._callbacks=void 0,this._contexts=void 0}},fu=class t{constructor(e){this._options=e}get event(){return this._event||(this._event=(e,r,n)=>{this._callbacks||(this._callbacks=new Gp),this._options&&this._options.onFirstListenerAdd&&this._callbacks.isEmpty()&&this._options.onFirstListenerAdd(this),this._callbacks.add(e,r);let i={dispose:()=>{this._callbacks&&(this._callbacks.remove(e,r),i.dispose=t._noop,this._options&&this._options.onLastListenerRemove&&this._callbacks.isEmpty()&&this._options.onLastListenerRemove(this))}};return Array.isArray(n)&&n.push(i),i}),this._event}fire(e){this._callbacks&&this._callbacks.invoke.call(this._callbacks,e)}dispose(){this._callbacks&&(this._callbacks.dispose(),this._callbacks=void 0)}};uo.Emitter=fu;fu._noop=function(){}});var Bp=j(fo=>{"use strict";Object.defineProperty(fo,"__esModule",{value:!0});fo.CancellationTokenSource=fo.CancellationToken=void 0;var dk=An(),pk=zo(),Hp=lo(),Kp;(function(t){t.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:Hp.Event.None}),t.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Hp.Event.None});function e(r){let n=r;return n&&(n===t.None||n===t.Cancelled||pk.boolean(n.isCancellationRequested)&&!!n.onCancellationRequested)}t.is=e})(Kp=fo.CancellationToken||(fo.CancellationToken={}));var mk=Object.freeze(function(t,e){let r=(0,dk.default)().timer.setTimeout(t.bind(e),0);return{dispose(){r.dispose()}}}),du=class{constructor(){this._isCancelled=!1}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?mk:(this._emitter||(this._emitter=new Hp.Emitter),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=void 0)}},Wp=class{get token(){return this._token||(this._token=new du),this._token}cancel(){this._token?this._token.cancel():this._token=Kp.Cancelled}dispose(){this._token?this._token instanceof du&&this._token.dispose():this._token=Kp.None}};fo.CancellationTokenSource=Wp});var uy=j(Zn=>{"use strict";Object.defineProperty(Zn,"__esModule",{value:!0});Zn.ReadableStreamMessageReader=Zn.AbstractMessageReader=Zn.MessageReader=void 0;var Vp=An(),Vo=zo(),zp=lo(),hk;(function(t){function e(r){let n=r;return n&&Vo.func(n.listen)&&Vo.func(n.dispose)&&Vo.func(n.onError)&&Vo.func(n.onClose)&&Vo.func(n.onPartialMessage)}t.is=e})(hk=Zn.MessageReader||(Zn.MessageReader={}));var pu=class{constructor(){this.errorEmitter=new zp.Emitter,this.closeEmitter=new zp.Emitter,this.partialMessageEmitter=new zp.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e){this.errorEmitter.fire(this.asError(e))}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}get onPartialMessage(){return this.partialMessageEmitter.event}firePartialMessage(e){this.partialMessageEmitter.fire(e)}asError(e){return e instanceof Error?e:new Error(`Reader received error. Reason: ${Vo.string(e.message)?e.message:"unknown"}`)}};Zn.AbstractMessageReader=pu;var Xp;(function(t){function e(r){let n,i,o,s=new Map,a,c=new Map;if(r===void 0||typeof r=="string")n=r??"utf-8";else{if(n=r.charset??"utf-8",r.contentDecoder!==void 0&&(o=r.contentDecoder,s.set(o.name,o)),r.contentDecoders!==void 0)for(let u of r.contentDecoders)s.set(u.name,u);if(r.contentTypeDecoder!==void 0&&(a=r.contentTypeDecoder,c.set(a.name,a)),r.contentTypeDecoders!==void 0)for(let u of r.contentTypeDecoders)c.set(u.name,u)}return a===void 0&&(a=(0,Vp.default)().applicationJson.decoder,c.set(a.name,a)),{charset:n,contentDecoder:o,contentDecoders:s,contentTypeDecoder:a,contentTypeDecoders:c}}t.fromOptions=e})(Xp||(Xp={}));var Yp=class extends pu{constructor(e,r){super(),this.readable=e,this.options=Xp.fromOptions(r),this.buffer=(0,Vp.default)().messageBuffer.create(this.options.charset),this._partialMessageTimeout=1e4,this.nextMessageLength=-1,this.messageToken=0}set partialMessageTimeout(e){this._partialMessageTimeout=e}get partialMessageTimeout(){return this._partialMessageTimeout}listen(e){this.nextMessageLength=-1,this.messageToken=0,this.partialMessageTimer=void 0,this.callback=e;let r=this.readable.onData(n=>{this.onData(n)});return this.readable.onError(n=>this.fireError(n)),this.readable.onClose(()=>this.fireClose()),r}onData(e){for(this.buffer.append(e);;){if(this.nextMessageLength===-1){let i=this.buffer.tryReadHeaders();if(!i)return;let o=i.get("Content-Length");if(!o)throw new Error("Header must provide a Content-Length property.");let s=parseInt(o);if(isNaN(s))throw new Error("Content-Length value must be a number.");this.nextMessageLength=s}let r=this.buffer.tryReadBody(this.nextMessageLength);if(r===void 0){this.setPartialMessageTimer();return}this.clearPartialMessageTimer(),this.nextMessageLength=-1;let n;this.options.contentDecoder!==void 0?n=this.options.contentDecoder.decode(r):n=Promise.resolve(r),n.then(i=>{this.options.contentTypeDecoder.decode(i,this.options).then(o=>{this.callback(o)},o=>{this.fireError(o)})},i=>{this.fireError(i)})}}clearPartialMessageTimer(){this.partialMessageTimer&&(this.partialMessageTimer.dispose(),this.partialMessageTimer=void 0)}setPartialMessageTimer(){this.clearPartialMessageTimer(),!(this._partialMessageTimeout<=0)&&(this.partialMessageTimer=(0,Vp.default)().timer.setTimeout((e,r)=>{this.partialMessageTimer=void 0,e===this.messageToken&&(this.firePartialMessage({messageToken:e,waitingTime:r}),this.setPartialMessageTimer())},this._partialMessageTimeout,this.messageToken,this._partialMessageTimeout))}};Zn.ReadableStreamMessageReader=Yp});var ly=j(mu=>{"use strict";Object.defineProperty(mu,"__esModule",{value:!0});mu.Semaphore=void 0;var gk=An(),Jp=class{constructor(e=1){if(e<=0)throw new Error("Capacity must be greater than 0");this._capacity=e,this._active=0,this._waiting=[]}lock(e){return new Promise((r,n)=>{this._waiting.push({thunk:e,resolve:r,reject:n}),this.runNext()})}get active(){return this._active}runNext(){this._waiting.length===0||this._active===this._capacity||(0,gk.default)().timer.setImmediate(()=>this.doRunNext())}doRunNext(){if(this._waiting.length===0||this._active===this._capacity)return;let e=this._waiting.shift();if(this._active++,this._active>this._capacity)throw new Error("To many thunks active");try{let r=e.thunk();r instanceof Promise?r.then(n=>{this._active--,e.resolve(n),this.runNext()},n=>{this._active--,e.reject(n),this.runNext()}):(this._active--,e.resolve(r),this.runNext())}catch(r){this._active--,e.reject(r),this.runNext()}}};mu.Semaphore=Jp});var my=j(ei=>{"use strict";Object.defineProperty(ei,"__esModule",{value:!0});ei.WriteableStreamMessageWriter=ei.AbstractMessageWriter=ei.MessageWriter=void 0;var fy=An(),Ia=zo(),yk=ly(),dy=lo(),Tk="Content-Length: ",py=`\r
`,vk;(function(t){function e(r){let n=r;return n&&Ia.func(n.dispose)&&Ia.func(n.onClose)&&Ia.func(n.onError)&&Ia.func(n.write)}t.is=e})(vk=ei.MessageWriter||(ei.MessageWriter={}));var hu=class{constructor(){this.errorEmitter=new dy.Emitter,this.closeEmitter=new dy.Emitter}dispose(){this.errorEmitter.dispose(),this.closeEmitter.dispose()}get onError(){return this.errorEmitter.event}fireError(e,r,n){this.errorEmitter.fire([this.asError(e),r,n])}get onClose(){return this.closeEmitter.event}fireClose(){this.closeEmitter.fire(void 0)}asError(e){return e instanceof Error?e:new Error(`Writer received error. Reason: ${Ia.string(e.message)?e.message:"unknown"}`)}};ei.AbstractMessageWriter=hu;var Qp;(function(t){function e(r){return r===void 0||typeof r=="string"?{charset:r??"utf-8",contentTypeEncoder:(0,fy.default)().applicationJson.encoder}:{charset:r.charset??"utf-8",contentEncoder:r.contentEncoder,contentTypeEncoder:r.contentTypeEncoder??(0,fy.default)().applicationJson.encoder}}t.fromOptions=e})(Qp||(Qp={}));var Zp=class extends hu{constructor(e,r){super(),this.writable=e,this.options=Qp.fromOptions(r),this.errorCount=0,this.writeSemaphore=new yk.Semaphore(1),this.writable.onError(n=>this.fireError(n)),this.writable.onClose(()=>this.fireClose())}async write(e){return this.writeSemaphore.lock(async()=>this.options.contentTypeEncoder.encode(e,this.options).then(n=>this.options.contentEncoder!==void 0?this.options.contentEncoder.encode(n):n).then(n=>{let i=[];return i.push(Tk,n.byteLength.toString(),py),i.push(py),this.doWrite(e,i,n)},n=>{throw this.fireError(n),n}))}async doWrite(e,r,n){try{return await this.writable.write(r.join(""),"ascii"),this.writable.write(n)}catch(i){return this.handleError(i,e),Promise.reject(i)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){this.writable.end()}};ei.WriteableStreamMessageWriter=Zp});var Ry=j(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.createMessageConnection=Y.ConnectionOptions=Y.CancellationStrategy=Y.CancellationSenderStrategy=Y.CancellationReceiverStrategy=Y.ConnectionStrategy=Y.ConnectionError=Y.ConnectionErrors=Y.LogTraceNotification=Y.SetTraceNotification=Y.TraceFormat=Y.TraceValues=Y.Trace=Y.NullLogger=Y.ProgressType=Y.ProgressToken=void 0;var hy=An(),It=zo(),Z=Up(),gy=jp(),Pa=lo(),em=Bp(),Oa;(function(t){t.type=new Z.NotificationType("$/cancelRequest")})(Oa||(Oa={}));var yy;(function(t){function e(r){return typeof r=="string"||typeof r=="number"}t.is=e})(yy=Y.ProgressToken||(Y.ProgressToken={}));var Da;(function(t){t.type=new Z.NotificationType("$/progress")})(Da||(Da={}));var tm=class{constructor(){}};Y.ProgressType=tm;var rm;(function(t){function e(r){return It.func(r)}t.is=e})(rm||(rm={}));Y.NullLogger=Object.freeze({error:()=>{},warn:()=>{},info:()=>{},log:()=>{}});var _e;(function(t){t[t.Off=0]="Off",t[t.Messages=1]="Messages",t[t.Compact=2]="Compact",t[t.Verbose=3]="Verbose"})(_e=Y.Trace||(Y.Trace={}));var Rk;(function(t){t.Off="off",t.Messages="messages",t.Compact="compact",t.Verbose="verbose"})(Rk=Y.TraceValues||(Y.TraceValues={}));(function(t){function e(n){if(!It.string(n))return t.Off;switch(n=n.toLowerCase(),n){case"off":return t.Off;case"messages":return t.Messages;case"compact":return t.Compact;case"verbose":return t.Verbose;default:return t.Off}}t.fromString=e;function r(n){switch(n){case t.Off:return"off";case t.Messages:return"messages";case t.Compact:return"compact";case t.Verbose:return"verbose";default:return"off"}}t.toString=r})(_e=Y.Trace||(Y.Trace={}));var sn;(function(t){t.Text="text",t.JSON="json"})(sn=Y.TraceFormat||(Y.TraceFormat={}));(function(t){function e(r){return It.string(r)?(r=r.toLowerCase(),r==="json"?t.JSON:t.Text):t.Text}t.fromString=e})(sn=Y.TraceFormat||(Y.TraceFormat={}));var Ty;(function(t){t.type=new Z.NotificationType("$/setTrace")})(Ty=Y.SetTraceNotification||(Y.SetTraceNotification={}));var nm;(function(t){t.type=new Z.NotificationType("$/logTrace")})(nm=Y.LogTraceNotification||(Y.LogTraceNotification={}));var gu;(function(t){t[t.Closed=1]="Closed",t[t.Disposed=2]="Disposed",t[t.AlreadyListening=3]="AlreadyListening"})(gu=Y.ConnectionErrors||(Y.ConnectionErrors={}));var Xo=class t extends Error{constructor(e,r){super(r),this.code=e,Object.setPrototypeOf(this,t.prototype)}};Y.ConnectionError=Xo;var vy;(function(t){function e(r){let n=r;return n&&It.func(n.cancelUndispatched)}t.is=e})(vy=Y.ConnectionStrategy||(Y.ConnectionStrategy={}));var im;(function(t){t.Message=Object.freeze({createCancellationTokenSource(r){return new em.CancellationTokenSource}});function e(r){let n=r;return n&&It.func(n.createCancellationTokenSource)}t.is=e})(im=Y.CancellationReceiverStrategy||(Y.CancellationReceiverStrategy={}));var om;(function(t){t.Message=Object.freeze({sendCancellation(r,n){return r.sendNotification(Oa.type,{id:n})},cleanup(r){}});function e(r){let n=r;return n&&It.func(n.sendCancellation)&&It.func(n.cleanup)}t.is=e})(om=Y.CancellationSenderStrategy||(Y.CancellationSenderStrategy={}));var sm;(function(t){t.Message=Object.freeze({receiver:im.Message,sender:om.Message});function e(r){let n=r;return n&&im.is(n.receiver)&&om.is(n.sender)}t.is=e})(sm=Y.CancellationStrategy||(Y.CancellationStrategy={}));var xk;(function(t){function e(r){let n=r;return n&&(sm.is(n.cancellationStrategy)||vy.is(n.connectionStrategy))}t.is=e})(xk=Y.ConnectionOptions||(Y.ConnectionOptions={}));var an;(function(t){t[t.New=1]="New",t[t.Listening=2]="Listening",t[t.Closed=3]="Closed",t[t.Disposed=4]="Disposed"})(an||(an={}));function bk(t,e,r,n){let i=r!==void 0?r:Y.NullLogger,o=0,s=0,a=0,c="2.0",u,l=new Map,f,m=new Map,T=new Map,S,C=new gy.LinkedMap,N=new Map,A=new Set,v=new Map,y=_e.Off,_=sn.Text,D,X=an.New,ye=new Pa.Emitter,Ee=new Pa.Emitter,Ht=new Pa.Emitter,Rt=new Pa.Emitter,M=new Pa.Emitter,w=n&&n.cancellationStrategy?n.cancellationStrategy:sm.Message;function q(R){if(R===null)throw new Error("Can't send requests with id null since the response can't be correlated.");return"req-"+R.toString()}function H(R){return R===null?"res-unknown-"+(++a).toString():"res-"+R.toString()}function ce(){return"not-"+(++s).toString()}function ee(R,P){Z.Message.isRequest(P)?R.set(q(P.id),P):Z.Message.isResponse(P)?R.set(H(P.id),P):R.set(ce(),P)}function Q(R){}function xt(){return X===an.Listening}function lt(){return X===an.Closed}function me(){return X===an.Disposed}function Nr(){(X===an.New||X===an.Listening)&&(X=an.Closed,Ee.fire(void 0))}function Xn(R){ye.fire([R,void 0,void 0])}function _a(R){ye.fire(R)}t.onClose(Nr),t.onError(Xn),e.onClose(Nr),e.onError(_a);function no(){S||C.size===0||(S=(0,hy.default)().timer.setImmediate(()=>{S=void 0,lr()}))}function lr(){if(C.size===0)return;let R=C.shift();try{Z.Message.isRequest(R)?bt(R):Z.Message.isNotification(R)?wn(R):Z.Message.isResponse(R)?er(R):Kt(R)}finally{no()}}let Ko=R=>{try{if(Z.Message.isNotification(R)&&R.method===Oa.type.method){let P=R.params.id,F=q(P),B=C.get(F);if(Z.Message.isRequest(B)){let Le=n?.connectionStrategy,Qe=Le&&Le.cancelUndispatched?Le.cancelUndispatched(B,Q):void 0;if(Qe&&(Qe.error!==void 0||Qe.result!==void 0)){C.delete(F),v.delete(P),Qe.id=B.id,xr(Qe,R.method,Date.now()),e.write(Qe).catch(()=>i.error("Sending response for canceled message failed."));return}}let Oe=v.get(P);if(Oe!==void 0){Oe.cancel(),Ci(R);return}else A.add(P)}ee(C,R)}finally{no()}};function bt(R){if(me())return;function P(le,qe,Te){let gt={jsonrpc:c,id:R.id};le instanceof Z.ResponseError?gt.error=le.toJson():gt.result=le===void 0?null:le,xr(gt,qe,Te),e.write(gt).catch(()=>i.error("Sending response failed."))}function F(le,qe,Te){let gt={jsonrpc:c,id:R.id,error:le.toJson()};xr(gt,qe,Te),e.write(gt).catch(()=>i.error("Sending response failed."))}function B(le,qe,Te){le===void 0&&(le=null);let gt={jsonrpc:c,id:R.id,result:le};xr(gt,qe,Te),e.write(gt).catch(()=>i.error("Sending response failed."))}io(R);let Oe=l.get(R.method),Le,Qe;Oe&&(Le=Oe.type,Qe=Oe.handler);let St=Date.now();if(Qe||u){let le=R.id??String(Date.now()),qe=w.receiver.createCancellationTokenSource(le);R.id!==null&&A.has(R.id)&&qe.cancel(),R.id!==null&&v.set(le,qe);try{let Te;if(Qe)if(R.params===void 0){if(Le!==void 0&&Le.numberOfParams!==0){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${R.method} defines ${Le.numberOfParams} params but received none.`),R.method,St);return}Te=Qe(qe.token)}else if(Array.isArray(R.params)){if(Le!==void 0&&Le.parameterStructures===Z.ParameterStructures.byName){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${R.method} defines parameters by name but received parameters by position`),R.method,St);return}Te=Qe(...R.params,qe.token)}else{if(Le!==void 0&&Le.parameterStructures===Z.ParameterStructures.byPosition){F(new Z.ResponseError(Z.ErrorCodes.InvalidParams,`Request ${R.method} defines parameters by position but received parameters by name`),R.method,St);return}Te=Qe(R.params,qe.token)}else u&&(Te=u(R.method,R.params,qe.token));let gt=Te;Te?gt.then?gt.then(tr=>{v.delete(le),P(tr,R.method,St)},tr=>{v.delete(le),tr instanceof Z.ResponseError?F(tr,R.method,St):tr&&It.string(tr.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${R.method} failed with message: ${tr.message}`),R.method,St):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${R.method} failed unexpectedly without providing any details.`),R.method,St)}):(v.delete(le),P(Te,R.method,St)):(v.delete(le),B(Te,R.method,St))}catch(Te){v.delete(le),Te instanceof Z.ResponseError?P(Te,R.method,St):Te&&It.string(Te.message)?F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${R.method} failed with message: ${Te.message}`),R.method,St):F(new Z.ResponseError(Z.ErrorCodes.InternalError,`Request ${R.method} failed unexpectedly without providing any details.`),R.method,St)}}else F(new Z.ResponseError(Z.ErrorCodes.MethodNotFound,`Unhandled method ${R.method}`),R.method,St)}function er(R){if(!me())if(R.id===null)R.error?i.error(`Received response message without id: Error is: 
${JSON.stringify(R.error,void 0,4)}`):i.error("Received response message without id. No further error information provided.");else{let P=R.id,F=N.get(P);if(np(R,F),F!==void 0){N.delete(P);try{if(R.error){let B=R.error;F.reject(new Z.ResponseError(B.code,B.message,B.data))}else if(R.result!==void 0)F.resolve(R.result);else throw new Error("Should never happen.")}catch(B){B.message?i.error(`Response handler '${F.method}' failed with message: ${B.message}`):i.error(`Response handler '${F.method}' failed unexpectedly.`)}}}}function wn(R){if(me())return;let P,F;if(R.method===Oa.type.method){let B=R.params.id;A.delete(B),Ci(R);return}else{let B=m.get(R.method);B&&(F=B.handler,P=B.type)}if(F||f)try{if(Ci(R),F)if(R.params===void 0)P!==void 0&&P.numberOfParams!==0&&P.parameterStructures!==Z.ParameterStructures.byName&&i.error(`Notification ${R.method} defines ${P.numberOfParams} params but received none.`),F();else if(Array.isArray(R.params)){let B=R.params;R.method===Da.type.method&&B.length===2&&yy.is(B[0])?F({token:B[0],value:B[1]}):(P!==void 0&&(P.parameterStructures===Z.ParameterStructures.byName&&i.error(`Notification ${R.method} defines parameters by name but received parameters by position`),P.numberOfParams!==R.params.length&&i.error(`Notification ${R.method} defines ${P.numberOfParams} params but received ${B.length} arguments`)),F(...B))}else P!==void 0&&P.parameterStructures===Z.ParameterStructures.byPosition&&i.error(`Notification ${R.method} defines parameters by position but received parameters by name`),F(R.params);else f&&f(R.method,R.params)}catch(B){B.message?i.error(`Notification handler '${R.method}' failed with message: ${B.message}`):i.error(`Notification handler '${R.method}' failed unexpectedly.`)}else Ht.fire(R)}function Kt(R){if(!R){i.error("Received empty message.");return}i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(R,null,4)}`);let P=R;if(It.string(P.id)||It.number(P.id)){let F=P.id,B=N.get(F);B&&B.reject(new Error("The received response has neither a result nor an error property."))}}function ft(R){if(R!=null)switch(y){case _e.Verbose:return JSON.stringify(R,null,4);case _e.Compact:return JSON.stringify(R);default:return}}function Hr(R){if(!(y===_e.Off||!D))if(_===sn.Text){let P;(y===_e.Verbose||y===_e.Compact)&&R.params&&(P=`Params: ${ft(R.params)}

`),D.log(`Sending request '${R.method} - (${R.id})'.`,P)}else Ai("send-request",R)}function $r(R){if(!(y===_e.Off||!D))if(_===sn.Text){let P;(y===_e.Verbose||y===_e.Compact)&&(R.params?P=`Params: ${ft(R.params)}

`:P=`No parameters provided.

`),D.log(`Sending notification '${R.method}'.`,P)}else Ai("send-notification",R)}function xr(R,P,F){if(!(y===_e.Off||!D))if(_===sn.Text){let B;(y===_e.Verbose||y===_e.Compact)&&(R.error&&R.error.data?B=`Error data: ${ft(R.error.data)}

`:R.result?B=`Result: ${ft(R.result)}

`:R.error===void 0&&(B=`No result returned.

`)),D.log(`Sending response '${P} - (${R.id})'. Processing request took ${Date.now()-F}ms`,B)}else Ai("send-response",R)}function io(R){if(!(y===_e.Off||!D))if(_===sn.Text){let P;(y===_e.Verbose||y===_e.Compact)&&R.params&&(P=`Params: ${ft(R.params)}

`),D.log(`Received request '${R.method} - (${R.id})'.`,P)}else Ai("receive-request",R)}function Ci(R){if(!(y===_e.Off||!D||R.method===nm.type.method))if(_===sn.Text){let P;(y===_e.Verbose||y===_e.Compact)&&(R.params?P=`Params: ${ft(R.params)}

`:P=`No parameters provided.

`),D.log(`Received notification '${R.method}'.`,P)}else Ai("receive-notification",R)}function np(R,P){if(!(y===_e.Off||!D))if(_===sn.Text){let F;if((y===_e.Verbose||y===_e.Compact)&&(R.error&&R.error.data?F=`Error data: ${ft(R.error.data)}

`:R.result?F=`Result: ${ft(R.result)}

`:R.error===void 0&&(F=`No result returned.

`)),P){let B=R.error?` Request failed: ${R.error.message} (${R.error.code}).`:"";D.log(`Received response '${P.method} - (${R.id})' in ${Date.now()-P.timerStart}ms.${B}`,F)}else D.log(`Received response ${R.id} without active response promise.`,F)}else Ai("receive-response",R)}function Ai(R,P){if(!D||y===_e.Off)return;let F={isLSPMessage:!0,type:R,message:P,timestamp:Date.now()};D.log(F)}function oo(){if(lt())throw new Xo(gu.Closed,"Connection is closed.");if(me())throw new Xo(gu.Disposed,"Connection is disposed.")}function ip(){if(xt())throw new Xo(gu.AlreadyListening,"Connection is already listening")}function op(){if(!xt())throw new Error("Call listen() first.")}function so(R){return R===void 0?null:R}function Wo(R){if(R!==null)return R}function nu(R){return R!=null&&!Array.isArray(R)&&typeof R=="object"}function Na(R,P){switch(R){case Z.ParameterStructures.auto:return nu(P)?Wo(P):[so(P)];case Z.ParameterStructures.byName:if(!nu(P))throw new Error("Received parameters by name but param is not an object literal.");return Wo(P);case Z.ParameterStructures.byPosition:return[so(P)];default:throw new Error(`Unknown parameter structure ${R.toString()}`)}}function iu(R,P){let F,B=R.numberOfParams;switch(B){case 0:F=void 0;break;case 1:F=Na(R.parameterStructures,P[0]);break;default:F=[];for(let Oe=0;Oe<P.length&&Oe<B;Oe++)F.push(so(P[Oe]));if(P.length<B)for(let Oe=P.length;Oe<B;Oe++)F.push(null);break}return F}let ki={sendNotification:(R,...P)=>{oo();let F,B;if(It.string(R)){F=R;let Le=P[0],Qe=0,St=Z.ParameterStructures.auto;Z.ParameterStructures.is(Le)&&(Qe=1,St=Le);let le=P.length,qe=le-Qe;switch(qe){case 0:B=void 0;break;case 1:B=Na(St,P[Qe]);break;default:if(St===Z.ParameterStructures.byName)throw new Error(`Received ${qe} parameters for 'by Name' notification parameter structure.`);B=P.slice(Qe,le).map(Te=>so(Te));break}}else{let Le=P;F=R.method,B=iu(R,Le)}let Oe={jsonrpc:c,method:F,params:B};return $r(Oe),e.write(Oe).catch(()=>i.error("Sending notification failed."))},onNotification:(R,P)=>{oo();let F;return It.func(R)?f=R:P&&(It.string(R)?(F=R,m.set(R,{type:void 0,handler:P})):(F=R.method,m.set(R.method,{type:R,handler:P}))),{dispose:()=>{F!==void 0?m.delete(F):f=void 0}}},onProgress:(R,P,F)=>{if(T.has(P))throw new Error(`Progress handler for token ${P} already registered`);return T.set(P,F),{dispose:()=>{T.delete(P)}}},sendProgress:(R,P,F)=>ki.sendNotification(Da.type,{token:P,value:F}),onUnhandledProgress:Rt.event,sendRequest:(R,...P)=>{oo(),op();let F,B,Oe;if(It.string(R)){F=R;let le=P[0],qe=P[P.length-1],Te=0,gt=Z.ParameterStructures.auto;Z.ParameterStructures.is(le)&&(Te=1,gt=le);let tr=P.length;em.CancellationToken.is(qe)&&(tr=tr-1,Oe=qe);let Yn=tr-Te;switch(Yn){case 0:B=void 0;break;case 1:B=Na(gt,P[Te]);break;default:if(gt===Z.ParameterStructures.byName)throw new Error(`Received ${Yn} parameters for 'by Name' request parameter structure.`);B=P.slice(Te,tr).map(Cn=>so(Cn));break}}else{let le=P;F=R.method,B=iu(R,le);let qe=R.numberOfParams;Oe=em.CancellationToken.is(le[qe])?le[qe]:void 0}let Le=o++,Qe;return Oe&&(Qe=Oe.onCancellationRequested(()=>{let le=w.sender.sendCancellation(ki,Le);return le===void 0?(i.log(`Received no promise from cancellation strategy when cancelling id ${Le}`),Promise.resolve()):le.catch(()=>{i.log(`Sending cancellation messages for id ${Le} failed`)})})),new Promise((le,qe)=>{let Te={jsonrpc:c,id:Le,method:F,params:B},gt=Cn=>{le(Cn),w.sender.cleanup(Le),Qe?.dispose()},tr=Cn=>{qe(Cn),w.sender.cleanup(Le),Qe?.dispose()},Yn={method:F,timerStart:Date.now(),resolve:gt,reject:tr};Hr(Te);try{e.write(Te).catch(()=>i.error("Sending request failed."))}catch(Cn){Yn.reject(new Z.ResponseError(Z.ErrorCodes.MessageWriteError,Cn.message?Cn.message:"Unknown reason")),Yn=null}Yn&&N.set(Le,Yn)})},onRequest:(R,P)=>{oo();let F=null;return rm.is(R)?(F=void 0,u=R):It.string(R)?(F=null,P!==void 0&&(F=R,l.set(R,{handler:P,type:void 0}))):P!==void 0&&(F=R.method,l.set(R.method,{type:R,handler:P})),{dispose:()=>{F!==null&&(F!==void 0?l.delete(F):u=void 0)}}},hasPendingResponse:()=>N.size>0,trace:async(R,P,F)=>{let B=!1,Oe=sn.Text;F!==void 0&&(It.boolean(F)?B=F:(B=F.sendNotification||!1,Oe=F.traceFormat||sn.Text)),y=R,_=Oe,y===_e.Off?D=void 0:D=P,B&&!lt()&&!me()&&await ki.sendNotification(Ty.type,{value:_e.toString(R)})},onError:ye.event,onClose:Ee.event,onUnhandledNotification:Ht.event,onDispose:M.event,end:()=>{e.end()},dispose:()=>{if(me())return;X=an.Disposed,M.fire(void 0);let R=new Z.ResponseError(Z.ErrorCodes.PendingResponseRejected,"Pending response rejected since connection got disposed");for(let P of N.values())P.reject(R);N=new Map,v=new Map,A=new Set,C=new gy.LinkedMap,It.func(e.dispose)&&e.dispose(),It.func(t.dispose)&&t.dispose()},listen:()=>{oo(),ip(),X=an.Listening,t.listen(Ko)},inspect:()=>{(0,hy.default)().console.log("inspect")}};return ki.onNotification(nm.type,R=>{if(y===_e.Off||!D)return;let P=y===_e.Verbose||y===_e.Compact;D.log(R.message,P?R.verbose:void 0)}),ki.onNotification(Da.type,R=>{let P=T.get(R.token);P?P(R.value):Rt.fire(R)}),ki}Y.createMessageConnection=bk});var La=j($=>{"use strict";Object.defineProperty($,"__esModule",{value:!0});$.TraceFormat=$.TraceValues=$.Trace=$.ProgressType=$.ProgressToken=$.createMessageConnection=$.NullLogger=$.ConnectionOptions=$.ConnectionStrategy=$.WriteableStreamMessageWriter=$.AbstractMessageWriter=$.MessageWriter=$.ReadableStreamMessageReader=$.AbstractMessageReader=$.MessageReader=$.CancellationToken=$.CancellationTokenSource=$.Emitter=$.Event=$.Disposable=$.LRUCache=$.Touch=$.LinkedMap=$.ParameterStructures=$.NotificationType9=$.NotificationType8=$.NotificationType7=$.NotificationType6=$.NotificationType5=$.NotificationType4=$.NotificationType3=$.NotificationType2=$.NotificationType1=$.NotificationType0=$.NotificationType=$.ErrorCodes=$.ResponseError=$.RequestType9=$.RequestType8=$.RequestType7=$.RequestType6=$.RequestType5=$.RequestType4=$.RequestType3=$.RequestType2=$.RequestType1=$.RequestType0=$.RequestType=$.Message=$.RAL=void 0;$.CancellationStrategy=$.CancellationSenderStrategy=$.CancellationReceiverStrategy=$.ConnectionError=$.ConnectionErrors=$.LogTraceNotification=$.SetTraceNotification=void 0;var Ge=Up();Object.defineProperty($,"Message",{enumerable:!0,get:function(){return Ge.Message}});Object.defineProperty($,"RequestType",{enumerable:!0,get:function(){return Ge.RequestType}});Object.defineProperty($,"RequestType0",{enumerable:!0,get:function(){return Ge.RequestType0}});Object.defineProperty($,"RequestType1",{enumerable:!0,get:function(){return Ge.RequestType1}});Object.defineProperty($,"RequestType2",{enumerable:!0,get:function(){return Ge.RequestType2}});Object.defineProperty($,"RequestType3",{enumerable:!0,get:function(){return Ge.RequestType3}});Object.defineProperty($,"RequestType4",{enumerable:!0,get:function(){return Ge.RequestType4}});Object.defineProperty($,"RequestType5",{enumerable:!0,get:function(){return Ge.RequestType5}});Object.defineProperty($,"RequestType6",{enumerable:!0,get:function(){return Ge.RequestType6}});Object.defineProperty($,"RequestType7",{enumerable:!0,get:function(){return Ge.RequestType7}});Object.defineProperty($,"RequestType8",{enumerable:!0,get:function(){return Ge.RequestType8}});Object.defineProperty($,"RequestType9",{enumerable:!0,get:function(){return Ge.RequestType9}});Object.defineProperty($,"ResponseError",{enumerable:!0,get:function(){return Ge.ResponseError}});Object.defineProperty($,"ErrorCodes",{enumerable:!0,get:function(){return Ge.ErrorCodes}});Object.defineProperty($,"NotificationType",{enumerable:!0,get:function(){return Ge.NotificationType}});Object.defineProperty($,"NotificationType0",{enumerable:!0,get:function(){return Ge.NotificationType0}});Object.defineProperty($,"NotificationType1",{enumerable:!0,get:function(){return Ge.NotificationType1}});Object.defineProperty($,"NotificationType2",{enumerable:!0,get:function(){return Ge.NotificationType2}});Object.defineProperty($,"NotificationType3",{enumerable:!0,get:function(){return Ge.NotificationType3}});Object.defineProperty($,"NotificationType4",{enumerable:!0,get:function(){return Ge.NotificationType4}});Object.defineProperty($,"NotificationType5",{enumerable:!0,get:function(){return Ge.NotificationType5}});Object.defineProperty($,"NotificationType6",{enumerable:!0,get:function(){return Ge.NotificationType6}});Object.defineProperty($,"NotificationType7",{enumerable:!0,get:function(){return Ge.NotificationType7}});Object.defineProperty($,"NotificationType8",{enumerable:!0,get:function(){return Ge.NotificationType8}});Object.defineProperty($,"NotificationType9",{enumerable:!0,get:function(){return Ge.NotificationType9}});Object.defineProperty($,"ParameterStructures",{enumerable:!0,get:function(){return Ge.ParameterStructures}});var am=jp();Object.defineProperty($,"LinkedMap",{enumerable:!0,get:function(){return am.LinkedMap}});Object.defineProperty($,"LRUCache",{enumerable:!0,get:function(){return am.LRUCache}});Object.defineProperty($,"Touch",{enumerable:!0,get:function(){return am.Touch}});var Sk=au();Object.defineProperty($,"Disposable",{enumerable:!0,get:function(){return Sk.Disposable}});var xy=lo();Object.defineProperty($,"Event",{enumerable:!0,get:function(){return xy.Event}});Object.defineProperty($,"Emitter",{enumerable:!0,get:function(){return xy.Emitter}});var by=Bp();Object.defineProperty($,"CancellationTokenSource",{enumerable:!0,get:function(){return by.CancellationTokenSource}});Object.defineProperty($,"CancellationToken",{enumerable:!0,get:function(){return by.CancellationToken}});var cm=uy();Object.defineProperty($,"MessageReader",{enumerable:!0,get:function(){return cm.MessageReader}});Object.defineProperty($,"AbstractMessageReader",{enumerable:!0,get:function(){return cm.AbstractMessageReader}});Object.defineProperty($,"ReadableStreamMessageReader",{enumerable:!0,get:function(){return cm.ReadableStreamMessageReader}});var um=my();Object.defineProperty($,"MessageWriter",{enumerable:!0,get:function(){return um.MessageWriter}});Object.defineProperty($,"AbstractMessageWriter",{enumerable:!0,get:function(){return um.AbstractMessageWriter}});Object.defineProperty($,"WriteableStreamMessageWriter",{enumerable:!0,get:function(){return um.WriteableStreamMessageWriter}});var nr=Ry();Object.defineProperty($,"ConnectionStrategy",{enumerable:!0,get:function(){return nr.ConnectionStrategy}});Object.defineProperty($,"ConnectionOptions",{enumerable:!0,get:function(){return nr.ConnectionOptions}});Object.defineProperty($,"NullLogger",{enumerable:!0,get:function(){return nr.NullLogger}});Object.defineProperty($,"createMessageConnection",{enumerable:!0,get:function(){return nr.createMessageConnection}});Object.defineProperty($,"ProgressToken",{enumerable:!0,get:function(){return nr.ProgressToken}});Object.defineProperty($,"ProgressType",{enumerable:!0,get:function(){return nr.ProgressType}});Object.defineProperty($,"Trace",{enumerable:!0,get:function(){return nr.Trace}});Object.defineProperty($,"TraceValues",{enumerable:!0,get:function(){return nr.TraceValues}});Object.defineProperty($,"TraceFormat",{enumerable:!0,get:function(){return nr.TraceFormat}});Object.defineProperty($,"SetTraceNotification",{enumerable:!0,get:function(){return nr.SetTraceNotification}});Object.defineProperty($,"LogTraceNotification",{enumerable:!0,get:function(){return nr.LogTraceNotification}});Object.defineProperty($,"ConnectionErrors",{enumerable:!0,get:function(){return nr.ConnectionErrors}});Object.defineProperty($,"ConnectionError",{enumerable:!0,get:function(){return nr.ConnectionError}});Object.defineProperty($,"CancellationReceiverStrategy",{enumerable:!0,get:function(){return nr.CancellationReceiverStrategy}});Object.defineProperty($,"CancellationSenderStrategy",{enumerable:!0,get:function(){return nr.CancellationSenderStrategy}});Object.defineProperty($,"CancellationStrategy",{enumerable:!0,get:function(){return nr.CancellationStrategy}});var wk=An();$.RAL=wk.default});var ti=j(Se=>{"use strict";var Ck=Se&&Se.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Ak=Se&&Se.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Ck(e,t,r)};Object.defineProperty(Se,"__esModule",{value:!0});Se.createMessageConnection=Se.createServerSocketTransport=Se.createClientSocketTransport=Se.createServerPipeTransport=Se.createClientPipeTransport=Se.generateRandomPipeName=Se.StreamMessageWriter=Se.StreamMessageReader=Se.SocketMessageWriter=Se.SocketMessageReader=Se.IPCMessageWriter=Se.IPCMessageReader=void 0;var Yo=iy();Yo.default.install();var kn=La(),Sy=on("path"),kk=on("os"),Ek=on("crypto"),vu=on("net");Ak(La(),Se);var lm=class extends kn.AbstractMessageReader{constructor(e){super(),this.process=e;let r=this.process;r.on("error",n=>this.fireError(n)),r.on("close",()=>this.fireClose())}listen(e){return this.process.on("message",e),kn.Disposable.create(()=>this.process.off("message",e))}};Se.IPCMessageReader=lm;var fm=class extends kn.AbstractMessageWriter{constructor(e){super(),this.process=e,this.errorCount=0;let r=this.process;r.on("error",n=>this.fireError(n)),r.on("close",()=>this.fireClose)}write(e){try{return typeof this.process.send=="function"&&this.process.send(e,void 0,void 0,r=>{r?(this.errorCount++,this.handleError(r,e)):this.errorCount=0}),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};Se.IPCMessageWriter=fm;var po=class extends kn.ReadableStreamMessageReader{constructor(e,r="utf-8"){super((0,Yo.default)().stream.asReadableStream(e),r)}};Se.SocketMessageReader=po;var mo=class extends kn.WriteableStreamMessageWriter{constructor(e,r){super((0,Yo.default)().stream.asWritableStream(e),r),this.socket=e}dispose(){super.dispose(),this.socket.destroy()}};Se.SocketMessageWriter=mo;var yu=class extends kn.ReadableStreamMessageReader{constructor(e,r){super((0,Yo.default)().stream.asReadableStream(e),r)}};Se.StreamMessageReader=yu;var Tu=class extends kn.WriteableStreamMessageWriter{constructor(e,r){super((0,Yo.default)().stream.asWritableStream(e),r)}};Se.StreamMessageWriter=Tu;var wy=process.env.XDG_RUNTIME_DIR,_k=new Map([["linux",107],["darwin",103]]);function Nk(){let t=(0,Ek.randomBytes)(21).toString("hex");if(process.platform==="win32")return`\\\\.\\pipe\\vscode-jsonrpc-${t}-sock`;let e;wy?e=Sy.join(wy,`vscode-ipc-${t}.sock`):e=Sy.join(kk.tmpdir(),`vscode-${t}.sock`);let r=_k.get(process.platform);return r!==void 0&&e.length>=r&&(0,Yo.default)().console.warn(`WARNING: IPC handle "${e}" is longer than ${r} characters.`),e}Se.generateRandomPipeName=Nk;function $k(t,e="utf-8"){let r,n=new Promise((i,o)=>{r=i});return new Promise((i,o)=>{let s=(0,vu.createServer)(a=>{s.close(),r([new po(a,e),new mo(a,e)])});s.on("error",o),s.listen(t,()=>{s.removeListener("error",o),i({onConnected:()=>n})})})}Se.createClientPipeTransport=$k;function Ik(t,e="utf-8"){let r=(0,vu.createConnection)(t);return[new po(r,e),new mo(r,e)]}Se.createServerPipeTransport=Ik;function Pk(t,e="utf-8"){let r,n=new Promise((i,o)=>{r=i});return new Promise((i,o)=>{let s=(0,vu.createServer)(a=>{s.close(),r([new po(a,e),new mo(a,e)])});s.on("error",o),s.listen(t,"127.0.0.1",()=>{s.removeListener("error",o),i({onConnected:()=>n})})})}Se.createClientSocketTransport=Pk;function Dk(t,e="utf-8"){let r=(0,vu.createConnection)(t,"127.0.0.1");return[new po(r,e),new mo(r,e)]}Se.createServerSocketTransport=Dk;function Ok(t){let e=t;return e.read!==void 0&&e.addListener!==void 0}function Lk(t){let e=t;return e.write!==void 0&&e.addListener!==void 0}function Mk(t,e,r,n){r||(r=kn.NullLogger);let i=Ok(t)?new yu(t):t,o=Lk(e)?new Tu(e):e;return kn.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,kn.createMessageConnection)(i,o,r,n)}Se.createMessageConnection=Mk});var dm=j((MG,Cy)=>{"use strict";Cy.exports=ti()});var ho=j((Ay,Ru)=>{(function(t){if(typeof Ru=="object"&&typeof Ru.exports=="object"){var e=t(on,Ay);e!==void 0&&(Ru.exports=e)}else typeof define=="function"&&define.amd&&define(["require","exports"],t)})(function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.TextDocument=e.EOL=e.WorkspaceFolder=e.InlayHint=e.InlayHintLabelPart=e.InlayHintKind=e.InlineValueContext=e.InlineValueEvaluatableExpression=e.InlineValueVariableLookup=e.InlineValueText=e.SemanticTokens=e.SemanticTokenModifiers=e.SemanticTokenTypes=e.SelectionRange=e.DocumentLink=e.FormattingOptions=e.CodeLens=e.CodeAction=e.CodeActionContext=e.CodeActionTriggerKind=e.CodeActionKind=e.DocumentSymbol=e.WorkspaceSymbol=e.SymbolInformation=e.SymbolTag=e.SymbolKind=e.DocumentHighlight=e.DocumentHighlightKind=e.SignatureInformation=e.ParameterInformation=e.Hover=e.MarkedString=e.CompletionList=e.CompletionItem=e.CompletionItemLabelDetails=e.InsertTextMode=e.InsertReplaceEdit=e.CompletionItemTag=e.InsertTextFormat=e.CompletionItemKind=e.MarkupContent=e.MarkupKind=e.TextDocumentItem=e.OptionalVersionedTextDocumentIdentifier=e.VersionedTextDocumentIdentifier=e.TextDocumentIdentifier=e.WorkspaceChange=e.WorkspaceEdit=e.DeleteFile=e.RenameFile=e.CreateFile=e.TextDocumentEdit=e.AnnotatedTextEdit=e.ChangeAnnotationIdentifier=e.ChangeAnnotation=e.TextEdit=e.Command=e.Diagnostic=e.CodeDescription=e.DiagnosticTag=e.DiagnosticSeverity=e.DiagnosticRelatedInformation=e.FoldingRange=e.FoldingRangeKind=e.ColorPresentation=e.ColorInformation=e.Color=e.LocationLink=e.Location=e.Range=e.Position=e.uinteger=e.integer=e.URI=e.DocumentUri=void 0;var r;(function(p){function x(b){return typeof b=="string"}p.is=x})(r=e.DocumentUri||(e.DocumentUri={}));var n;(function(p){function x(b){return typeof b=="string"}p.is=x})(n=e.URI||(e.URI={}));var i;(function(p){p.MIN_VALUE=-2147483648,p.MAX_VALUE=2147483647;function x(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=x})(i=e.integer||(e.integer={}));var o;(function(p){p.MIN_VALUE=0,p.MAX_VALUE=2147483647;function x(b){return typeof b=="number"&&p.MIN_VALUE<=b&&b<=p.MAX_VALUE}p.is=x})(o=e.uinteger||(e.uinteger={}));var s;(function(p){function x(g,d){return g===Number.MAX_VALUE&&(g=o.MAX_VALUE),d===Number.MAX_VALUE&&(d=o.MAX_VALUE),{line:g,character:d}}p.create=x;function b(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.line)&&k.uinteger(d.character)}p.is=b})(s=e.Position||(e.Position={}));var a;(function(p){function x(g,d,E,I){if(k.uinteger(g)&&k.uinteger(d)&&k.uinteger(E)&&k.uinteger(I))return{start:s.create(g,d),end:s.create(E,I)};if(s.is(g)&&s.is(d))return{start:g,end:d};throw new Error("Range#create called with invalid arguments[".concat(g,", ").concat(d,", ").concat(E,", ").concat(I,"]"))}p.create=x;function b(g){var d=g;return k.objectLiteral(d)&&s.is(d.start)&&s.is(d.end)}p.is=b})(a=e.Range||(e.Range={}));var c;(function(p){function x(g,d){return{uri:g,range:d}}p.create=x;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(k.string(d.uri)||k.undefined(d.uri))}p.is=b})(c=e.Location||(e.Location={}));var u;(function(p){function x(g,d,E,I){return{targetUri:g,targetRange:d,targetSelectionRange:E,originSelectionRange:I}}p.create=x;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.targetRange)&&k.string(d.targetUri)&&a.is(d.targetSelectionRange)&&(a.is(d.originSelectionRange)||k.undefined(d.originSelectionRange))}p.is=b})(u=e.LocationLink||(e.LocationLink={}));var l;(function(p){function x(g,d,E,I){return{red:g,green:d,blue:E,alpha:I}}p.create=x;function b(g){var d=g;return k.objectLiteral(d)&&k.numberRange(d.red,0,1)&&k.numberRange(d.green,0,1)&&k.numberRange(d.blue,0,1)&&k.numberRange(d.alpha,0,1)}p.is=b})(l=e.Color||(e.Color={}));var f;(function(p){function x(g,d){return{range:g,color:d}}p.create=x;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&l.is(d.color)}p.is=b})(f=e.ColorInformation||(e.ColorInformation={}));var m;(function(p){function x(g,d,E){return{label:g,textEdit:d,additionalTextEdits:E}}p.create=x;function b(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.undefined(d.textEdit)||D.is(d))&&(k.undefined(d.additionalTextEdits)||k.typedArray(d.additionalTextEdits,D.is))}p.is=b})(m=e.ColorPresentation||(e.ColorPresentation={}));var T;(function(p){p.Comment="comment",p.Imports="imports",p.Region="region"})(T=e.FoldingRangeKind||(e.FoldingRangeKind={}));var S;(function(p){function x(g,d,E,I,re,dt){var je={startLine:g,endLine:d};return k.defined(E)&&(je.startCharacter=E),k.defined(I)&&(je.endCharacter=I),k.defined(re)&&(je.kind=re),k.defined(dt)&&(je.collapsedText=dt),je}p.create=x;function b(g){var d=g;return k.objectLiteral(d)&&k.uinteger(d.startLine)&&k.uinteger(d.startLine)&&(k.undefined(d.startCharacter)||k.uinteger(d.startCharacter))&&(k.undefined(d.endCharacter)||k.uinteger(d.endCharacter))&&(k.undefined(d.kind)||k.string(d.kind))}p.is=b})(S=e.FoldingRange||(e.FoldingRange={}));var C;(function(p){function x(g,d){return{location:g,message:d}}p.create=x;function b(g){var d=g;return k.defined(d)&&c.is(d.location)&&k.string(d.message)}p.is=b})(C=e.DiagnosticRelatedInformation||(e.DiagnosticRelatedInformation={}));var N;(function(p){p.Error=1,p.Warning=2,p.Information=3,p.Hint=4})(N=e.DiagnosticSeverity||(e.DiagnosticSeverity={}));var A;(function(p){p.Unnecessary=1,p.Deprecated=2})(A=e.DiagnosticTag||(e.DiagnosticTag={}));var v;(function(p){function x(b){var g=b;return k.objectLiteral(g)&&k.string(g.href)}p.is=x})(v=e.CodeDescription||(e.CodeDescription={}));var y;(function(p){function x(g,d,E,I,re,dt){var je={range:g,message:d};return k.defined(E)&&(je.severity=E),k.defined(I)&&(je.code=I),k.defined(re)&&(je.source=re),k.defined(dt)&&(je.relatedInformation=dt),je}p.create=x;function b(g){var d,E=g;return k.defined(E)&&a.is(E.range)&&k.string(E.message)&&(k.number(E.severity)||k.undefined(E.severity))&&(k.integer(E.code)||k.string(E.code)||k.undefined(E.code))&&(k.undefined(E.codeDescription)||k.string((d=E.codeDescription)===null||d===void 0?void 0:d.href))&&(k.string(E.source)||k.undefined(E.source))&&(k.undefined(E.relatedInformation)||k.typedArray(E.relatedInformation,C.is))}p.is=b})(y=e.Diagnostic||(e.Diagnostic={}));var _;(function(p){function x(g,d){for(var E=[],I=2;I<arguments.length;I++)E[I-2]=arguments[I];var re={title:g,command:d};return k.defined(E)&&E.length>0&&(re.arguments=E),re}p.create=x;function b(g){var d=g;return k.defined(d)&&k.string(d.title)&&k.string(d.command)}p.is=b})(_=e.Command||(e.Command={}));var D;(function(p){function x(E,I){return{range:E,newText:I}}p.replace=x;function b(E,I){return{range:{start:E,end:E},newText:I}}p.insert=b;function g(E){return{range:E,newText:""}}p.del=g;function d(E){var I=E;return k.objectLiteral(I)&&k.string(I.newText)&&a.is(I.range)}p.is=d})(D=e.TextEdit||(e.TextEdit={}));var X;(function(p){function x(g,d,E){var I={label:g};return d!==void 0&&(I.needsConfirmation=d),E!==void 0&&(I.description=E),I}p.create=x;function b(g){var d=g;return k.objectLiteral(d)&&k.string(d.label)&&(k.boolean(d.needsConfirmation)||d.needsConfirmation===void 0)&&(k.string(d.description)||d.description===void 0)}p.is=b})(X=e.ChangeAnnotation||(e.ChangeAnnotation={}));var ye;(function(p){function x(b){var g=b;return k.string(g)}p.is=x})(ye=e.ChangeAnnotationIdentifier||(e.ChangeAnnotationIdentifier={}));var Ee;(function(p){function x(E,I,re){return{range:E,newText:I,annotationId:re}}p.replace=x;function b(E,I,re){return{range:{start:E,end:E},newText:I,annotationId:re}}p.insert=b;function g(E,I){return{range:E,newText:"",annotationId:I}}p.del=g;function d(E){var I=E;return D.is(I)&&(X.is(I.annotationId)||ye.is(I.annotationId))}p.is=d})(Ee=e.AnnotatedTextEdit||(e.AnnotatedTextEdit={}));var Ht;(function(p){function x(g,d){return{textDocument:g,edits:d}}p.create=x;function b(g){var d=g;return k.defined(d)&&lt.is(d.textDocument)&&Array.isArray(d.edits)}p.is=b})(Ht=e.TextDocumentEdit||(e.TextDocumentEdit={}));var Rt;(function(p){function x(g,d,E){var I={kind:"create",uri:g};return d!==void 0&&(d.overwrite!==void 0||d.ignoreIfExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=x;function b(g){var d=g;return d&&d.kind==="create"&&k.string(d.uri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=b})(Rt=e.CreateFile||(e.CreateFile={}));var M;(function(p){function x(g,d,E,I){var re={kind:"rename",oldUri:g,newUri:d};return E!==void 0&&(E.overwrite!==void 0||E.ignoreIfExists!==void 0)&&(re.options=E),I!==void 0&&(re.annotationId=I),re}p.create=x;function b(g){var d=g;return d&&d.kind==="rename"&&k.string(d.oldUri)&&k.string(d.newUri)&&(d.options===void 0||(d.options.overwrite===void 0||k.boolean(d.options.overwrite))&&(d.options.ignoreIfExists===void 0||k.boolean(d.options.ignoreIfExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=b})(M=e.RenameFile||(e.RenameFile={}));var w;(function(p){function x(g,d,E){var I={kind:"delete",uri:g};return d!==void 0&&(d.recursive!==void 0||d.ignoreIfNotExists!==void 0)&&(I.options=d),E!==void 0&&(I.annotationId=E),I}p.create=x;function b(g){var d=g;return d&&d.kind==="delete"&&k.string(d.uri)&&(d.options===void 0||(d.options.recursive===void 0||k.boolean(d.options.recursive))&&(d.options.ignoreIfNotExists===void 0||k.boolean(d.options.ignoreIfNotExists)))&&(d.annotationId===void 0||ye.is(d.annotationId))}p.is=b})(w=e.DeleteFile||(e.DeleteFile={}));var q;(function(p){function x(b){var g=b;return g&&(g.changes!==void 0||g.documentChanges!==void 0)&&(g.documentChanges===void 0||g.documentChanges.every(function(d){return k.string(d.kind)?Rt.is(d)||M.is(d)||w.is(d):Ht.is(d)}))}p.is=x})(q=e.WorkspaceEdit||(e.WorkspaceEdit={}));var H=function(){function p(x,b){this.edits=x,this.changeAnnotations=b}return p.prototype.insert=function(x,b,g){var d,E;if(g===void 0?d=D.insert(x,b):ye.is(g)?(E=g,d=Ee.insert(x,b,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.insert(x,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.replace=function(x,b,g){var d,E;if(g===void 0?d=D.replace(x,b):ye.is(g)?(E=g,d=Ee.replace(x,b,g)):(this.assertChangeAnnotations(this.changeAnnotations),E=this.changeAnnotations.manage(g),d=Ee.replace(x,b,E)),this.edits.push(d),E!==void 0)return E},p.prototype.delete=function(x,b){var g,d;if(b===void 0?g=D.del(x):ye.is(b)?(d=b,g=Ee.del(x,b)):(this.assertChangeAnnotations(this.changeAnnotations),d=this.changeAnnotations.manage(b),g=Ee.del(x,d)),this.edits.push(g),d!==void 0)return d},p.prototype.add=function(x){this.edits.push(x)},p.prototype.all=function(){return this.edits},p.prototype.clear=function(){this.edits.splice(0,this.edits.length)},p.prototype.assertChangeAnnotations=function(x){if(x===void 0)throw new Error("Text edit change is not configured to manage change annotations.")},p}(),ce=function(){function p(x){this._annotations=x===void 0?Object.create(null):x,this._counter=0,this._size=0}return p.prototype.all=function(){return this._annotations},Object.defineProperty(p.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),p.prototype.manage=function(x,b){var g;if(ye.is(x)?g=x:(g=this.nextId(),b=x),this._annotations[g]!==void 0)throw new Error("Id ".concat(g," is already in use."));if(b===void 0)throw new Error("No annotation provided for id ".concat(g));return this._annotations[g]=b,this._size++,g},p.prototype.nextId=function(){return this._counter++,this._counter.toString()},p}(),ee=function(){function p(x){var b=this;this._textEditChanges=Object.create(null),x!==void 0?(this._workspaceEdit=x,x.documentChanges?(this._changeAnnotations=new ce(x.changeAnnotations),x.changeAnnotations=this._changeAnnotations.all(),x.documentChanges.forEach(function(g){if(Ht.is(g)){var d=new H(g.edits,b._changeAnnotations);b._textEditChanges[g.textDocument.uri]=d}})):x.changes&&Object.keys(x.changes).forEach(function(g){var d=new H(x.changes[g]);b._textEditChanges[g]=d})):this._workspaceEdit={}}return Object.defineProperty(p.prototype,"edit",{get:function(){return this.initDocumentChanges(),this._changeAnnotations!==void 0&&(this._changeAnnotations.size===0?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),p.prototype.getTextEditChange=function(x){if(lt.is(x)){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var b={uri:x.uri,version:x.version},g=this._textEditChanges[b.uri];if(!g){var d=[],E={textDocument:b,edits:d};this._workspaceEdit.documentChanges.push(E),g=new H(d,this._changeAnnotations),this._textEditChanges[b.uri]=g}return g}else{if(this.initChanges(),this._workspaceEdit.changes===void 0)throw new Error("Workspace edit is not configured for normal text edit changes.");var g=this._textEditChanges[x];if(!g){var d=[];this._workspaceEdit.changes[x]=d,g=new H(d),this._textEditChanges[x]=g}return g}},p.prototype.initDocumentChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._changeAnnotations=new ce,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},p.prototype.initChanges=function(){this._workspaceEdit.documentChanges===void 0&&this._workspaceEdit.changes===void 0&&(this._workspaceEdit.changes=Object.create(null))},p.prototype.createFile=function(x,b,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ye.is(b)?d=b:g=b;var E,I;if(d===void 0?E=Rt.create(x,g):(I=ye.is(d)?d:this._changeAnnotations.manage(d),E=Rt.create(x,g,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p.prototype.renameFile=function(x,b,g,d){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var E;X.is(g)||ye.is(g)?E=g:d=g;var I,re;if(E===void 0?I=M.create(x,b,d):(re=ye.is(E)?E:this._changeAnnotations.manage(E),I=M.create(x,b,d,re)),this._workspaceEdit.documentChanges.push(I),re!==void 0)return re},p.prototype.deleteFile=function(x,b,g){if(this.initDocumentChanges(),this._workspaceEdit.documentChanges===void 0)throw new Error("Workspace edit is not configured for document changes.");var d;X.is(b)||ye.is(b)?d=b:g=b;var E,I;if(d===void 0?E=w.create(x,g):(I=ye.is(d)?d:this._changeAnnotations.manage(d),E=w.create(x,g,I)),this._workspaceEdit.documentChanges.push(E),I!==void 0)return I},p}();e.WorkspaceChange=ee;var Q;(function(p){function x(g){return{uri:g}}p.create=x;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)}p.is=b})(Q=e.TextDocumentIdentifier||(e.TextDocumentIdentifier={}));var xt;(function(p){function x(g,d){return{uri:g,version:d}}p.create=x;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.integer(d.version)}p.is=b})(xt=e.VersionedTextDocumentIdentifier||(e.VersionedTextDocumentIdentifier={}));var lt;(function(p){function x(g,d){return{uri:g,version:d}}p.create=x;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&(d.version===null||k.integer(d.version))}p.is=b})(lt=e.OptionalVersionedTextDocumentIdentifier||(e.OptionalVersionedTextDocumentIdentifier={}));var me;(function(p){function x(g,d,E,I){return{uri:g,languageId:d,version:E,text:I}}p.create=x;function b(g){var d=g;return k.defined(d)&&k.string(d.uri)&&k.string(d.languageId)&&k.integer(d.version)&&k.string(d.text)}p.is=b})(me=e.TextDocumentItem||(e.TextDocumentItem={}));var Nr;(function(p){p.PlainText="plaintext",p.Markdown="markdown";function x(b){var g=b;return g===p.PlainText||g===p.Markdown}p.is=x})(Nr=e.MarkupKind||(e.MarkupKind={}));var Xn;(function(p){function x(b){var g=b;return k.objectLiteral(b)&&Nr.is(g.kind)&&k.string(g.value)}p.is=x})(Xn=e.MarkupContent||(e.MarkupContent={}));var _a;(function(p){p.Text=1,p.Method=2,p.Function=3,p.Constructor=4,p.Field=5,p.Variable=6,p.Class=7,p.Interface=8,p.Module=9,p.Property=10,p.Unit=11,p.Value=12,p.Enum=13,p.Keyword=14,p.Snippet=15,p.Color=16,p.File=17,p.Reference=18,p.Folder=19,p.EnumMember=20,p.Constant=21,p.Struct=22,p.Event=23,p.Operator=24,p.TypeParameter=25})(_a=e.CompletionItemKind||(e.CompletionItemKind={}));var no;(function(p){p.PlainText=1,p.Snippet=2})(no=e.InsertTextFormat||(e.InsertTextFormat={}));var lr;(function(p){p.Deprecated=1})(lr=e.CompletionItemTag||(e.CompletionItemTag={}));var Ko;(function(p){function x(g,d,E){return{newText:g,insert:d,replace:E}}p.create=x;function b(g){var d=g;return d&&k.string(d.newText)&&a.is(d.insert)&&a.is(d.replace)}p.is=b})(Ko=e.InsertReplaceEdit||(e.InsertReplaceEdit={}));var bt;(function(p){p.asIs=1,p.adjustIndentation=2})(bt=e.InsertTextMode||(e.InsertTextMode={}));var er;(function(p){function x(b){var g=b;return g&&(k.string(g.detail)||g.detail===void 0)&&(k.string(g.description)||g.description===void 0)}p.is=x})(er=e.CompletionItemLabelDetails||(e.CompletionItemLabelDetails={}));var wn;(function(p){function x(b){return{label:b}}p.create=x})(wn=e.CompletionItem||(e.CompletionItem={}));var Kt;(function(p){function x(b,g){return{items:b||[],isIncomplete:!!g}}p.create=x})(Kt=e.CompletionList||(e.CompletionList={}));var ft;(function(p){function x(g){return g.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}p.fromPlainText=x;function b(g){var d=g;return k.string(d)||k.objectLiteral(d)&&k.string(d.language)&&k.string(d.value)}p.is=b})(ft=e.MarkedString||(e.MarkedString={}));var Hr;(function(p){function x(b){var g=b;return!!g&&k.objectLiteral(g)&&(Xn.is(g.contents)||ft.is(g.contents)||k.typedArray(g.contents,ft.is))&&(b.range===void 0||a.is(b.range))}p.is=x})(Hr=e.Hover||(e.Hover={}));var $r;(function(p){function x(b,g){return g?{label:b,documentation:g}:{label:b}}p.create=x})($r=e.ParameterInformation||(e.ParameterInformation={}));var xr;(function(p){function x(b,g){for(var d=[],E=2;E<arguments.length;E++)d[E-2]=arguments[E];var I={label:b};return k.defined(g)&&(I.documentation=g),k.defined(d)?I.parameters=d:I.parameters=[],I}p.create=x})(xr=e.SignatureInformation||(e.SignatureInformation={}));var io;(function(p){p.Text=1,p.Read=2,p.Write=3})(io=e.DocumentHighlightKind||(e.DocumentHighlightKind={}));var Ci;(function(p){function x(b,g){var d={range:b};return k.number(g)&&(d.kind=g),d}p.create=x})(Ci=e.DocumentHighlight||(e.DocumentHighlight={}));var np;(function(p){p.File=1,p.Module=2,p.Namespace=3,p.Package=4,p.Class=5,p.Method=6,p.Property=7,p.Field=8,p.Constructor=9,p.Enum=10,p.Interface=11,p.Function=12,p.Variable=13,p.Constant=14,p.String=15,p.Number=16,p.Boolean=17,p.Array=18,p.Object=19,p.Key=20,p.Null=21,p.EnumMember=22,p.Struct=23,p.Event=24,p.Operator=25,p.TypeParameter=26})(np=e.SymbolKind||(e.SymbolKind={}));var Ai;(function(p){p.Deprecated=1})(Ai=e.SymbolTag||(e.SymbolTag={}));var oo;(function(p){function x(b,g,d,E,I){var re={name:b,kind:g,location:{uri:E,range:d}};return I&&(re.containerName=I),re}p.create=x})(oo=e.SymbolInformation||(e.SymbolInformation={}));var ip;(function(p){function x(b,g,d,E){return E!==void 0?{name:b,kind:g,location:{uri:d,range:E}}:{name:b,kind:g,location:{uri:d}}}p.create=x})(ip=e.WorkspaceSymbol||(e.WorkspaceSymbol={}));var op;(function(p){function x(g,d,E,I,re,dt){var je={name:g,detail:d,kind:E,range:I,selectionRange:re};return dt!==void 0&&(je.children=dt),je}p.create=x;function b(g){var d=g;return d&&k.string(d.name)&&k.number(d.kind)&&a.is(d.range)&&a.is(d.selectionRange)&&(d.detail===void 0||k.string(d.detail))&&(d.deprecated===void 0||k.boolean(d.deprecated))&&(d.children===void 0||Array.isArray(d.children))&&(d.tags===void 0||Array.isArray(d.tags))}p.is=b})(op=e.DocumentSymbol||(e.DocumentSymbol={}));var so;(function(p){p.Empty="",p.QuickFix="quickfix",p.Refactor="refactor",p.RefactorExtract="refactor.extract",p.RefactorInline="refactor.inline",p.RefactorRewrite="refactor.rewrite",p.Source="source",p.SourceOrganizeImports="source.organizeImports",p.SourceFixAll="source.fixAll"})(so=e.CodeActionKind||(e.CodeActionKind={}));var Wo;(function(p){p.Invoked=1,p.Automatic=2})(Wo=e.CodeActionTriggerKind||(e.CodeActionTriggerKind={}));var nu;(function(p){function x(g,d,E){var I={diagnostics:g};return d!=null&&(I.only=d),E!=null&&(I.triggerKind=E),I}p.create=x;function b(g){var d=g;return k.defined(d)&&k.typedArray(d.diagnostics,y.is)&&(d.only===void 0||k.typedArray(d.only,k.string))&&(d.triggerKind===void 0||d.triggerKind===Wo.Invoked||d.triggerKind===Wo.Automatic)}p.is=b})(nu=e.CodeActionContext||(e.CodeActionContext={}));var Na;(function(p){function x(g,d,E){var I={title:g},re=!0;return typeof d=="string"?(re=!1,I.kind=d):_.is(d)?I.command=d:I.edit=d,re&&E!==void 0&&(I.kind=E),I}p.create=x;function b(g){var d=g;return d&&k.string(d.title)&&(d.diagnostics===void 0||k.typedArray(d.diagnostics,y.is))&&(d.kind===void 0||k.string(d.kind))&&(d.edit!==void 0||d.command!==void 0)&&(d.command===void 0||_.is(d.command))&&(d.isPreferred===void 0||k.boolean(d.isPreferred))&&(d.edit===void 0||q.is(d.edit))}p.is=b})(Na=e.CodeAction||(e.CodeAction={}));var iu;(function(p){function x(g,d){var E={range:g};return k.defined(d)&&(E.data=d),E}p.create=x;function b(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.command)||_.is(d.command))}p.is=b})(iu=e.CodeLens||(e.CodeLens={}));var ki;(function(p){function x(g,d){return{tabSize:g,insertSpaces:d}}p.create=x;function b(g){var d=g;return k.defined(d)&&k.uinteger(d.tabSize)&&k.boolean(d.insertSpaces)}p.is=b})(ki=e.FormattingOptions||(e.FormattingOptions={}));var R;(function(p){function x(g,d,E){return{range:g,target:d,data:E}}p.create=x;function b(g){var d=g;return k.defined(d)&&a.is(d.range)&&(k.undefined(d.target)||k.string(d.target))}p.is=b})(R=e.DocumentLink||(e.DocumentLink={}));var P;(function(p){function x(g,d){return{range:g,parent:d}}p.create=x;function b(g){var d=g;return k.objectLiteral(d)&&a.is(d.range)&&(d.parent===void 0||p.is(d.parent))}p.is=b})(P=e.SelectionRange||(e.SelectionRange={}));var F;(function(p){p.namespace="namespace",p.type="type",p.class="class",p.enum="enum",p.interface="interface",p.struct="struct",p.typeParameter="typeParameter",p.parameter="parameter",p.variable="variable",p.property="property",p.enumMember="enumMember",p.event="event",p.function="function",p.method="method",p.macro="macro",p.keyword="keyword",p.modifier="modifier",p.comment="comment",p.string="string",p.number="number",p.regexp="regexp",p.operator="operator",p.decorator="decorator"})(F=e.SemanticTokenTypes||(e.SemanticTokenTypes={}));var B;(function(p){p.declaration="declaration",p.definition="definition",p.readonly="readonly",p.static="static",p.deprecated="deprecated",p.abstract="abstract",p.async="async",p.modification="modification",p.documentation="documentation",p.defaultLibrary="defaultLibrary"})(B=e.SemanticTokenModifiers||(e.SemanticTokenModifiers={}));var Oe;(function(p){function x(b){var g=b;return k.objectLiteral(g)&&(g.resultId===void 0||typeof g.resultId=="string")&&Array.isArray(g.data)&&(g.data.length===0||typeof g.data[0]=="number")}p.is=x})(Oe=e.SemanticTokens||(e.SemanticTokens={}));var Le;(function(p){function x(g,d){return{range:g,text:d}}p.create=x;function b(g){var d=g;return d!=null&&a.is(d.range)&&k.string(d.text)}p.is=b})(Le=e.InlineValueText||(e.InlineValueText={}));var Qe;(function(p){function x(g,d,E){return{range:g,variableName:d,caseSensitiveLookup:E}}p.create=x;function b(g){var d=g;return d!=null&&a.is(d.range)&&k.boolean(d.caseSensitiveLookup)&&(k.string(d.variableName)||d.variableName===void 0)}p.is=b})(Qe=e.InlineValueVariableLookup||(e.InlineValueVariableLookup={}));var St;(function(p){function x(g,d){return{range:g,expression:d}}p.create=x;function b(g){var d=g;return d!=null&&a.is(d.range)&&(k.string(d.expression)||d.expression===void 0)}p.is=b})(St=e.InlineValueEvaluatableExpression||(e.InlineValueEvaluatableExpression={}));var le;(function(p){function x(g,d){return{frameId:g,stoppedLocation:d}}p.create=x;function b(g){var d=g;return k.defined(d)&&a.is(g.stoppedLocation)}p.is=b})(le=e.InlineValueContext||(e.InlineValueContext={}));var qe;(function(p){p.Type=1,p.Parameter=2;function x(b){return b===1||b===2}p.is=x})(qe=e.InlayHintKind||(e.InlayHintKind={}));var Te;(function(p){function x(g){return{value:g}}p.create=x;function b(g){var d=g;return k.objectLiteral(d)&&(d.tooltip===void 0||k.string(d.tooltip)||Xn.is(d.tooltip))&&(d.location===void 0||c.is(d.location))&&(d.command===void 0||_.is(d.command))}p.is=b})(Te=e.InlayHintLabelPart||(e.InlayHintLabelPart={}));var gt;(function(p){function x(g,d,E){var I={position:g,label:d};return E!==void 0&&(I.kind=E),I}p.create=x;function b(g){var d=g;return k.objectLiteral(d)&&s.is(d.position)&&(k.string(d.label)||k.typedArray(d.label,Te.is))&&(d.kind===void 0||qe.is(d.kind))&&d.textEdits===void 0||k.typedArray(d.textEdits,D.is)&&(d.tooltip===void 0||k.string(d.tooltip)||Xn.is(d.tooltip))&&(d.paddingLeft===void 0||k.boolean(d.paddingLeft))&&(d.paddingRight===void 0||k.boolean(d.paddingRight))}p.is=b})(gt=e.InlayHint||(e.InlayHint={}));var tr;(function(p){function x(b){var g=b;return k.objectLiteral(g)&&n.is(g.uri)&&k.string(g.name)}p.is=x})(tr=e.WorkspaceFolder||(e.WorkspaceFolder={})),e.EOL=[`
`,`\r
`,"\r"];var Yn;(function(p){function x(E,I,re,dt){return new Cn(E,I,re,dt)}p.create=x;function b(E){var I=E;return!!(k.defined(I)&&k.string(I.uri)&&(k.undefined(I.languageId)||k.string(I.languageId))&&k.uinteger(I.lineCount)&&k.func(I.getText)&&k.func(I.positionAt)&&k.func(I.offsetAt))}p.is=b;function g(E,I){for(var re=E.getText(),dt=d(I,function(Bo,ou){var Qg=Bo.range.start.line-ou.range.start.line;return Qg===0?Bo.range.start.character-ou.range.start.character:Qg}),je=re.length,rn=dt.length-1;rn>=0;rn--){var nn=dt[rn],Jn=E.offsetAt(nn.range.start),fe=E.offsetAt(nn.range.end);if(fe<=je)re=re.substring(0,Jn)+nn.newText+re.substring(fe,re.length);else throw new Error("Overlapping edit");je=Jn}return re}p.applyEdits=g;function d(E,I){if(E.length<=1)return E;var re=E.length/2|0,dt=E.slice(0,re),je=E.slice(re);d(dt,I),d(je,I);for(var rn=0,nn=0,Jn=0;rn<dt.length&&nn<je.length;){var fe=I(dt[rn],je[nn]);fe<=0?E[Jn++]=dt[rn++]:E[Jn++]=je[nn++]}for(;rn<dt.length;)E[Jn++]=dt[rn++];for(;nn<je.length;)E[Jn++]=je[nn++];return E}})(Yn=e.TextDocument||(e.TextDocument={}));var Cn=function(){function p(x,b,g,d){this._uri=x,this._languageId=b,this._version=g,this._content=d,this._lineOffsets=void 0}return Object.defineProperty(p.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(p.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),p.prototype.getText=function(x){if(x){var b=this.offsetAt(x.start),g=this.offsetAt(x.end);return this._content.substring(b,g)}return this._content},p.prototype.update=function(x,b){this._content=x.text,this._version=b,this._lineOffsets=void 0},p.prototype.getLineOffsets=function(){if(this._lineOffsets===void 0){for(var x=[],b=this._content,g=!0,d=0;d<b.length;d++){g&&(x.push(d),g=!1);var E=b.charAt(d);g=E==="\r"||E===`
`,E==="\r"&&d+1<b.length&&b.charAt(d+1)===`
`&&d++}g&&b.length>0&&x.push(b.length),this._lineOffsets=x}return this._lineOffsets},p.prototype.positionAt=function(x){x=Math.max(Math.min(x,this._content.length),0);var b=this.getLineOffsets(),g=0,d=b.length;if(d===0)return s.create(0,x);for(;g<d;){var E=Math.floor((g+d)/2);b[E]>x?d=E:g=E+1}var I=g-1;return s.create(I,x-b[I])},p.prototype.offsetAt=function(x){var b=this.getLineOffsets();if(x.line>=b.length)return this._content.length;if(x.line<0)return 0;var g=b[x.line],d=x.line+1<b.length?b[x.line+1]:this._content.length;return Math.max(Math.min(g+x.character,d),g)},Object.defineProperty(p.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),p}(),k;(function(p){var x=Object.prototype.toString;function b(fe){return typeof fe<"u"}p.defined=b;function g(fe){return typeof fe>"u"}p.undefined=g;function d(fe){return fe===!0||fe===!1}p.boolean=d;function E(fe){return x.call(fe)==="[object String]"}p.string=E;function I(fe){return x.call(fe)==="[object Number]"}p.number=I;function re(fe,Bo,ou){return x.call(fe)==="[object Number]"&&Bo<=fe&&fe<=ou}p.numberRange=re;function dt(fe){return x.call(fe)==="[object Number]"&&-2147483648<=fe&&fe<=2147483647}p.integer=dt;function je(fe){return x.call(fe)==="[object Number]"&&0<=fe&&fe<=2147483647}p.uinteger=je;function rn(fe){return x.call(fe)==="[object Function]"}p.func=rn;function nn(fe){return fe!==null&&typeof fe=="object"}p.objectLiteral=nn;function Jn(fe,Bo){return Array.isArray(fe)&&fe.every(Bo)}p.typedArray=Jn})(k||(k={}))})});var it=j(dr=>{"use strict";Object.defineProperty(dr,"__esModule",{value:!0});dr.ProtocolNotificationType=dr.ProtocolNotificationType0=dr.ProtocolRequestType=dr.ProtocolRequestType0=dr.RegistrationType=dr.MessageDirection=void 0;var Jo=ti(),Fk;(function(t){t.clientToServer="clientToServer",t.serverToClient="serverToClient",t.both="both"})(Fk=dr.MessageDirection||(dr.MessageDirection={}));var pm=class{constructor(e){this.method=e}};dr.RegistrationType=pm;var mm=class extends Jo.RequestType0{constructor(e){super(e)}};dr.ProtocolRequestType0=mm;var hm=class extends Jo.RequestType{constructor(e){super(e,Jo.ParameterStructures.byName)}};dr.ProtocolRequestType=hm;var gm=class extends Jo.NotificationType0{constructor(e){super(e)}};dr.ProtocolNotificationType0=gm;var ym=class extends Jo.NotificationType{constructor(e){super(e,Jo.ParameterStructures.byName)}};dr.ProtocolNotificationType=ym});var xu=j(Ct=>{"use strict";Object.defineProperty(Ct,"__esModule",{value:!0});Ct.objectLiteral=Ct.typedArray=Ct.stringArray=Ct.array=Ct.func=Ct.error=Ct.number=Ct.string=Ct.boolean=void 0;function Uk(t){return t===!0||t===!1}Ct.boolean=Uk;function ky(t){return typeof t=="string"||t instanceof String}Ct.string=ky;function qk(t){return typeof t=="number"||t instanceof Number}Ct.number=qk;function jk(t){return t instanceof Error}Ct.error=jk;function Gk(t){return typeof t=="function"}Ct.func=Gk;function Ey(t){return Array.isArray(t)}Ct.array=Ey;function Hk(t){return Ey(t)&&t.every(e=>ky(e))}Ct.stringArray=Hk;function Kk(t,e){return Array.isArray(t)&&t.every(e)}Ct.typedArray=Kk;function Wk(t){return t!==null&&typeof t=="object"}Ct.objectLiteral=Wk});var Ny=j(Ma=>{"use strict";Object.defineProperty(Ma,"__esModule",{value:!0});Ma.ImplementationRequest=void 0;var _y=it(),Bk;(function(t){t.method="textDocument/implementation",t.messageDirection=_y.MessageDirection.clientToServer,t.type=new _y.ProtocolRequestType(t.method)})(Bk=Ma.ImplementationRequest||(Ma.ImplementationRequest={}))});var Iy=j(Fa=>{"use strict";Object.defineProperty(Fa,"__esModule",{value:!0});Fa.TypeDefinitionRequest=void 0;var $y=it(),zk;(function(t){t.method="textDocument/typeDefinition",t.messageDirection=$y.MessageDirection.clientToServer,t.type=new $y.ProtocolRequestType(t.method)})(zk=Fa.TypeDefinitionRequest||(Fa.TypeDefinitionRequest={}))});var Py=j(Ei=>{"use strict";Object.defineProperty(Ei,"__esModule",{value:!0});Ei.DidChangeWorkspaceFoldersNotification=Ei.WorkspaceFoldersRequest=void 0;var bu=it(),Vk;(function(t){t.method="workspace/workspaceFolders",t.messageDirection=bu.MessageDirection.serverToClient,t.type=new bu.ProtocolRequestType0(t.method)})(Vk=Ei.WorkspaceFoldersRequest||(Ei.WorkspaceFoldersRequest={}));var Xk;(function(t){t.method="workspace/didChangeWorkspaceFolders",t.messageDirection=bu.MessageDirection.clientToServer,t.type=new bu.ProtocolNotificationType(t.method)})(Xk=Ei.DidChangeWorkspaceFoldersNotification||(Ei.DidChangeWorkspaceFoldersNotification={}))});var Oy=j(Ua=>{"use strict";Object.defineProperty(Ua,"__esModule",{value:!0});Ua.ConfigurationRequest=void 0;var Dy=it(),Yk;(function(t){t.method="workspace/configuration",t.messageDirection=Dy.MessageDirection.serverToClient,t.type=new Dy.ProtocolRequestType(t.method)})(Yk=Ua.ConfigurationRequest||(Ua.ConfigurationRequest={}))});var Ly=j(_i=>{"use strict";Object.defineProperty(_i,"__esModule",{value:!0});_i.ColorPresentationRequest=_i.DocumentColorRequest=void 0;var Su=it(),Jk;(function(t){t.method="textDocument/documentColor",t.messageDirection=Su.MessageDirection.clientToServer,t.type=new Su.ProtocolRequestType(t.method)})(Jk=_i.DocumentColorRequest||(_i.DocumentColorRequest={}));var Qk;(function(t){t.method="textDocument/colorPresentation",t.messageDirection=Su.MessageDirection.clientToServer,t.type=new Su.ProtocolRequestType(t.method)})(Qk=_i.ColorPresentationRequest||(_i.ColorPresentationRequest={}))});var Fy=j(qa=>{"use strict";Object.defineProperty(qa,"__esModule",{value:!0});qa.FoldingRangeRequest=void 0;var My=it(),Zk;(function(t){t.method="textDocument/foldingRange",t.messageDirection=My.MessageDirection.clientToServer,t.type=new My.ProtocolRequestType(t.method)})(Zk=qa.FoldingRangeRequest||(qa.FoldingRangeRequest={}))});var qy=j(ja=>{"use strict";Object.defineProperty(ja,"__esModule",{value:!0});ja.DeclarationRequest=void 0;var Uy=it(),eE;(function(t){t.method="textDocument/declaration",t.messageDirection=Uy.MessageDirection.clientToServer,t.type=new Uy.ProtocolRequestType(t.method)})(eE=ja.DeclarationRequest||(ja.DeclarationRequest={}))});var Gy=j(Ga=>{"use strict";Object.defineProperty(Ga,"__esModule",{value:!0});Ga.SelectionRangeRequest=void 0;var jy=it(),tE;(function(t){t.method="textDocument/selectionRange",t.messageDirection=jy.MessageDirection.clientToServer,t.type=new jy.ProtocolRequestType(t.method)})(tE=Ga.SelectionRangeRequest||(Ga.SelectionRangeRequest={}))});var Hy=j(cn=>{"use strict";Object.defineProperty(cn,"__esModule",{value:!0});cn.WorkDoneProgressCancelNotification=cn.WorkDoneProgressCreateRequest=cn.WorkDoneProgress=void 0;var rE=ti(),wu=it(),nE;(function(t){t.type=new rE.ProgressType;function e(r){return r===t.type}t.is=e})(nE=cn.WorkDoneProgress||(cn.WorkDoneProgress={}));var iE;(function(t){t.method="window/workDoneProgress/create",t.messageDirection=wu.MessageDirection.serverToClient,t.type=new wu.ProtocolRequestType(t.method)})(iE=cn.WorkDoneProgressCreateRequest||(cn.WorkDoneProgressCreateRequest={}));var oE;(function(t){t.method="window/workDoneProgress/cancel",t.messageDirection=wu.MessageDirection.clientToServer,t.type=new wu.ProtocolNotificationType(t.method)})(oE=cn.WorkDoneProgressCancelNotification||(cn.WorkDoneProgressCancelNotification={}))});var Ky=j(un=>{"use strict";Object.defineProperty(un,"__esModule",{value:!0});un.CallHierarchyOutgoingCallsRequest=un.CallHierarchyIncomingCallsRequest=un.CallHierarchyPrepareRequest=void 0;var Qo=it(),sE;(function(t){t.method="textDocument/prepareCallHierarchy",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType(t.method)})(sE=un.CallHierarchyPrepareRequest||(un.CallHierarchyPrepareRequest={}));var aE;(function(t){t.method="callHierarchy/incomingCalls",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType(t.method)})(aE=un.CallHierarchyIncomingCallsRequest||(un.CallHierarchyIncomingCallsRequest={}));var cE;(function(t){t.method="callHierarchy/outgoingCalls",t.messageDirection=Qo.MessageDirection.clientToServer,t.type=new Qo.ProtocolRequestType(t.method)})(cE=un.CallHierarchyOutgoingCallsRequest||(un.CallHierarchyOutgoingCallsRequest={}))});var Wy=j(At=>{"use strict";Object.defineProperty(At,"__esModule",{value:!0});At.SemanticTokensRefreshRequest=At.SemanticTokensRangeRequest=At.SemanticTokensDeltaRequest=At.SemanticTokensRequest=At.SemanticTokensRegistrationType=At.TokenFormat=void 0;var ri=it(),uE;(function(t){t.Relative="relative"})(uE=At.TokenFormat||(At.TokenFormat={}));var Cu;(function(t){t.method="textDocument/semanticTokens",t.type=new ri.RegistrationType(t.method)})(Cu=At.SemanticTokensRegistrationType||(At.SemanticTokensRegistrationType={}));var lE;(function(t){t.method="textDocument/semanticTokens/full",t.messageDirection=ri.MessageDirection.clientToServer,t.type=new ri.ProtocolRequestType(t.method),t.registrationMethod=Cu.method})(lE=At.SemanticTokensRequest||(At.SemanticTokensRequest={}));var fE;(function(t){t.method="textDocument/semanticTokens/full/delta",t.messageDirection=ri.MessageDirection.clientToServer,t.type=new ri.ProtocolRequestType(t.method),t.registrationMethod=Cu.method})(fE=At.SemanticTokensDeltaRequest||(At.SemanticTokensDeltaRequest={}));var dE;(function(t){t.method="textDocument/semanticTokens/range",t.messageDirection=ri.MessageDirection.clientToServer,t.type=new ri.ProtocolRequestType(t.method),t.registrationMethod=Cu.method})(dE=At.SemanticTokensRangeRequest||(At.SemanticTokensRangeRequest={}));var pE;(function(t){t.method="workspace/semanticTokens/refresh",t.messageDirection=ri.MessageDirection.clientToServer,t.type=new ri.ProtocolRequestType0(t.method)})(pE=At.SemanticTokensRefreshRequest||(At.SemanticTokensRefreshRequest={}))});var zy=j(Ha=>{"use strict";Object.defineProperty(Ha,"__esModule",{value:!0});Ha.ShowDocumentRequest=void 0;var By=it(),mE;(function(t){t.method="window/showDocument",t.messageDirection=By.MessageDirection.serverToClient,t.type=new By.ProtocolRequestType(t.method)})(mE=Ha.ShowDocumentRequest||(Ha.ShowDocumentRequest={}))});var Xy=j(Ka=>{"use strict";Object.defineProperty(Ka,"__esModule",{value:!0});Ka.LinkedEditingRangeRequest=void 0;var Vy=it(),hE;(function(t){t.method="textDocument/linkedEditingRange",t.messageDirection=Vy.MessageDirection.clientToServer,t.type=new Vy.ProtocolRequestType(t.method)})(hE=Ka.LinkedEditingRangeRequest||(Ka.LinkedEditingRangeRequest={}))});var Yy=j(ot=>{"use strict";Object.defineProperty(ot,"__esModule",{value:!0});ot.WillDeleteFilesRequest=ot.DidDeleteFilesNotification=ot.DidRenameFilesNotification=ot.WillRenameFilesRequest=ot.DidCreateFilesNotification=ot.WillCreateFilesRequest=ot.FileOperationPatternKind=void 0;var Kr=it(),gE;(function(t){t.file="file",t.folder="folder"})(gE=ot.FileOperationPatternKind||(ot.FileOperationPatternKind={}));var yE;(function(t){t.method="workspace/willCreateFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(yE=ot.WillCreateFilesRequest||(ot.WillCreateFilesRequest={}));var TE;(function(t){t.method="workspace/didCreateFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(TE=ot.DidCreateFilesNotification||(ot.DidCreateFilesNotification={}));var vE;(function(t){t.method="workspace/willRenameFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(vE=ot.WillRenameFilesRequest||(ot.WillRenameFilesRequest={}));var RE;(function(t){t.method="workspace/didRenameFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(RE=ot.DidRenameFilesNotification||(ot.DidRenameFilesNotification={}));var xE;(function(t){t.method="workspace/didDeleteFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolNotificationType(t.method)})(xE=ot.DidDeleteFilesNotification||(ot.DidDeleteFilesNotification={}));var bE;(function(t){t.method="workspace/willDeleteFiles",t.messageDirection=Kr.MessageDirection.clientToServer,t.type=new Kr.ProtocolRequestType(t.method)})(bE=ot.WillDeleteFilesRequest||(ot.WillDeleteFilesRequest={}))});var Qy=j(ln=>{"use strict";Object.defineProperty(ln,"__esModule",{value:!0});ln.MonikerRequest=ln.MonikerKind=ln.UniquenessLevel=void 0;var Jy=it(),SE;(function(t){t.document="document",t.project="project",t.group="group",t.scheme="scheme",t.global="global"})(SE=ln.UniquenessLevel||(ln.UniquenessLevel={}));var wE;(function(t){t.$import="import",t.$export="export",t.local="local"})(wE=ln.MonikerKind||(ln.MonikerKind={}));var CE;(function(t){t.method="textDocument/moniker",t.messageDirection=Jy.MessageDirection.clientToServer,t.type=new Jy.ProtocolRequestType(t.method)})(CE=ln.MonikerRequest||(ln.MonikerRequest={}))});var Zy=j(fn=>{"use strict";Object.defineProperty(fn,"__esModule",{value:!0});fn.TypeHierarchySubtypesRequest=fn.TypeHierarchySupertypesRequest=fn.TypeHierarchyPrepareRequest=void 0;var Zo=it(),AE;(function(t){t.method="textDocument/prepareTypeHierarchy",t.messageDirection=Zo.MessageDirection.clientToServer,t.type=new Zo.ProtocolRequestType(t.method)})(AE=fn.TypeHierarchyPrepareRequest||(fn.TypeHierarchyPrepareRequest={}));var kE;(function(t){t.method="typeHierarchy/supertypes",t.messageDirection=Zo.MessageDirection.clientToServer,t.type=new Zo.ProtocolRequestType(t.method)})(kE=fn.TypeHierarchySupertypesRequest||(fn.TypeHierarchySupertypesRequest={}));var EE;(function(t){t.method="typeHierarchy/subtypes",t.messageDirection=Zo.MessageDirection.clientToServer,t.type=new Zo.ProtocolRequestType(t.method)})(EE=fn.TypeHierarchySubtypesRequest||(fn.TypeHierarchySubtypesRequest={}))});var eT=j(Ni=>{"use strict";Object.defineProperty(Ni,"__esModule",{value:!0});Ni.InlineValueRefreshRequest=Ni.InlineValueRequest=void 0;var Au=it(),_E;(function(t){t.method="textDocument/inlineValue",t.messageDirection=Au.MessageDirection.clientToServer,t.type=new Au.ProtocolRequestType(t.method)})(_E=Ni.InlineValueRequest||(Ni.InlineValueRequest={}));var NE;(function(t){t.method="workspace/inlineValue/refresh",t.messageDirection=Au.MessageDirection.clientToServer,t.type=new Au.ProtocolRequestType0(t.method)})(NE=Ni.InlineValueRefreshRequest||(Ni.InlineValueRefreshRequest={}))});var tT=j(dn=>{"use strict";Object.defineProperty(dn,"__esModule",{value:!0});dn.InlayHintRefreshRequest=dn.InlayHintResolveRequest=dn.InlayHintRequest=void 0;var es=it(),$E;(function(t){t.method="textDocument/inlayHint",t.messageDirection=es.MessageDirection.clientToServer,t.type=new es.ProtocolRequestType(t.method)})($E=dn.InlayHintRequest||(dn.InlayHintRequest={}));var IE;(function(t){t.method="inlayHint/resolve",t.messageDirection=es.MessageDirection.clientToServer,t.type=new es.ProtocolRequestType(t.method)})(IE=dn.InlayHintResolveRequest||(dn.InlayHintResolveRequest={}));var PE;(function(t){t.method="workspace/inlayHint/refresh",t.messageDirection=es.MessageDirection.clientToServer,t.type=new es.ProtocolRequestType0(t.method)})(PE=dn.InlayHintRefreshRequest||(dn.InlayHintRefreshRequest={}))});var nT=j(Wt=>{"use strict";Object.defineProperty(Wt,"__esModule",{value:!0});Wt.DiagnosticRefreshRequest=Wt.WorkspaceDiagnosticRequest=Wt.DocumentDiagnosticRequest=Wt.DocumentDiagnosticReportKind=Wt.DiagnosticServerCancellationData=void 0;var rT=ti(),DE=xu(),ts=it(),OE;(function(t){function e(r){let n=r;return n&&DE.boolean(n.retriggerRequest)}t.is=e})(OE=Wt.DiagnosticServerCancellationData||(Wt.DiagnosticServerCancellationData={}));var LE;(function(t){t.Full="full",t.Unchanged="unchanged"})(LE=Wt.DocumentDiagnosticReportKind||(Wt.DocumentDiagnosticReportKind={}));var ME;(function(t){t.method="textDocument/diagnostic",t.messageDirection=ts.MessageDirection.clientToServer,t.type=new ts.ProtocolRequestType(t.method),t.partialResult=new rT.ProgressType})(ME=Wt.DocumentDiagnosticRequest||(Wt.DocumentDiagnosticRequest={}));var FE;(function(t){t.method="workspace/diagnostic",t.messageDirection=ts.MessageDirection.clientToServer,t.type=new ts.ProtocolRequestType(t.method),t.partialResult=new rT.ProgressType})(FE=Wt.WorkspaceDiagnosticRequest||(Wt.WorkspaceDiagnosticRequest={}));var UE;(function(t){t.method="workspace/diagnostic/refresh",t.messageDirection=ts.MessageDirection.clientToServer,t.type=new ts.ProtocolRequestType0(t.method)})(UE=Wt.DiagnosticRefreshRequest||(Wt.DiagnosticRefreshRequest={}))});var sT=j(Re=>{"use strict";Object.defineProperty(Re,"__esModule",{value:!0});Re.DidCloseNotebookDocumentNotification=Re.DidSaveNotebookDocumentNotification=Re.DidChangeNotebookDocumentNotification=Re.NotebookCellArrayChange=Re.DidOpenNotebookDocumentNotification=Re.NotebookDocumentSyncRegistrationType=Re.NotebookDocument=Re.NotebookCell=Re.ExecutionSummary=Re.NotebookCellKind=void 0;var Wa=ho(),pn=xu(),En=it(),iT;(function(t){t.Markup=1,t.Code=2;function e(r){return r===1||r===2}t.is=e})(iT=Re.NotebookCellKind||(Re.NotebookCellKind={}));var oT;(function(t){function e(i,o){let s={executionOrder:i};return(o===!0||o===!1)&&(s.success=o),s}t.create=e;function r(i){let o=i;return pn.objectLiteral(o)&&Wa.uinteger.is(o.executionOrder)&&(o.success===void 0||pn.boolean(o.success))}t.is=r;function n(i,o){return i===o?!0:i==null||o===null||o===void 0?!1:i.executionOrder===o.executionOrder&&i.success===o.success}t.equals=n})(oT=Re.ExecutionSummary||(Re.ExecutionSummary={}));var Tm;(function(t){function e(o,s){return{kind:o,document:s}}t.create=e;function r(o){let s=o;return pn.objectLiteral(s)&&iT.is(s.kind)&&Wa.DocumentUri.is(s.document)&&(s.metadata===void 0||pn.objectLiteral(s.metadata))}t.is=r;function n(o,s){let a=new Set;return o.document!==s.document&&a.add("document"),o.kind!==s.kind&&a.add("kind"),o.executionSummary!==s.executionSummary&&a.add("executionSummary"),(o.metadata!==void 0||s.metadata!==void 0)&&!i(o.metadata,s.metadata)&&a.add("metadata"),(o.executionSummary!==void 0||s.executionSummary!==void 0)&&!oT.equals(o.executionSummary,s.executionSummary)&&a.add("executionSummary"),a}t.diff=n;function i(o,s){if(o===s)return!0;if(o==null||s===null||s===void 0||typeof o!=typeof s||typeof o!="object")return!1;let a=Array.isArray(o),c=Array.isArray(s);if(a!==c)return!1;if(a&&c){if(o.length!==s.length)return!1;for(let u=0;u<o.length;u++)if(!i(o[u],s[u]))return!1}if(pn.objectLiteral(o)&&pn.objectLiteral(s)){let u=Object.keys(o),l=Object.keys(s);if(u.length!==l.length||(u.sort(),l.sort(),!i(u,l)))return!1;for(let f=0;f<u.length;f++){let m=u[f];if(!i(o[m],s[m]))return!1}}return!0}})(Tm=Re.NotebookCell||(Re.NotebookCell={}));var qE;(function(t){function e(n,i,o,s){return{uri:n,notebookType:i,version:o,cells:s}}t.create=e;function r(n){let i=n;return pn.objectLiteral(i)&&pn.string(i.uri)&&Wa.integer.is(i.version)&&pn.typedArray(i.cells,Tm.is)}t.is=r})(qE=Re.NotebookDocument||(Re.NotebookDocument={}));var Ba;(function(t){t.method="notebookDocument/sync",t.messageDirection=En.MessageDirection.clientToServer,t.type=new En.RegistrationType(t.method)})(Ba=Re.NotebookDocumentSyncRegistrationType||(Re.NotebookDocumentSyncRegistrationType={}));var jE;(function(t){t.method="notebookDocument/didOpen",t.messageDirection=En.MessageDirection.clientToServer,t.type=new En.ProtocolNotificationType(t.method),t.registrationMethod=Ba.method})(jE=Re.DidOpenNotebookDocumentNotification||(Re.DidOpenNotebookDocumentNotification={}));var GE;(function(t){function e(n){let i=n;return pn.objectLiteral(i)&&Wa.uinteger.is(i.start)&&Wa.uinteger.is(i.deleteCount)&&(i.cells===void 0||pn.typedArray(i.cells,Tm.is))}t.is=e;function r(n,i,o){let s={start:n,deleteCount:i};return o!==void 0&&(s.cells=o),s}t.create=r})(GE=Re.NotebookCellArrayChange||(Re.NotebookCellArrayChange={}));var HE;(function(t){t.method="notebookDocument/didChange",t.messageDirection=En.MessageDirection.clientToServer,t.type=new En.ProtocolNotificationType(t.method),t.registrationMethod=Ba.method})(HE=Re.DidChangeNotebookDocumentNotification||(Re.DidChangeNotebookDocumentNotification={}));var KE;(function(t){t.method="notebookDocument/didSave",t.messageDirection=En.MessageDirection.clientToServer,t.type=new En.ProtocolNotificationType(t.method),t.registrationMethod=Ba.method})(KE=Re.DidSaveNotebookDocumentNotification||(Re.DidSaveNotebookDocumentNotification={}));var WE;(function(t){t.method="notebookDocument/didClose",t.messageDirection=En.MessageDirection.clientToServer,t.type=new En.ProtocolNotificationType(t.method),t.registrationMethod=Ba.method})(WE=Re.DidCloseNotebookDocumentNotification||(Re.DidCloseNotebookDocumentNotification={}))});var hT=j(h=>{"use strict";Object.defineProperty(h,"__esModule",{value:!0});h.WorkspaceSymbolRequest=h.CodeActionResolveRequest=h.CodeActionRequest=h.DocumentSymbolRequest=h.DocumentHighlightRequest=h.ReferencesRequest=h.DefinitionRequest=h.SignatureHelpRequest=h.SignatureHelpTriggerKind=h.HoverRequest=h.CompletionResolveRequest=h.CompletionRequest=h.CompletionTriggerKind=h.PublishDiagnosticsNotification=h.WatchKind=h.RelativePattern=h.FileChangeType=h.DidChangeWatchedFilesNotification=h.WillSaveTextDocumentWaitUntilRequest=h.WillSaveTextDocumentNotification=h.TextDocumentSaveReason=h.DidSaveTextDocumentNotification=h.DidCloseTextDocumentNotification=h.DidChangeTextDocumentNotification=h.TextDocumentContentChangeEvent=h.DidOpenTextDocumentNotification=h.TextDocumentSyncKind=h.TelemetryEventNotification=h.LogMessageNotification=h.ShowMessageRequest=h.ShowMessageNotification=h.MessageType=h.DidChangeConfigurationNotification=h.ExitNotification=h.ShutdownRequest=h.InitializedNotification=h.InitializeErrorCodes=h.InitializeRequest=h.WorkDoneProgressOptions=h.TextDocumentRegistrationOptions=h.StaticRegistrationOptions=h.PositionEncodingKind=h.FailureHandlingKind=h.ResourceOperationKind=h.UnregistrationRequest=h.RegistrationRequest=h.DocumentSelector=h.NotebookCellTextDocumentFilter=h.NotebookDocumentFilter=h.TextDocumentFilter=void 0;h.TypeHierarchySubtypesRequest=h.TypeHierarchyPrepareRequest=h.MonikerRequest=h.MonikerKind=h.UniquenessLevel=h.WillDeleteFilesRequest=h.DidDeleteFilesNotification=h.WillRenameFilesRequest=h.DidRenameFilesNotification=h.WillCreateFilesRequest=h.DidCreateFilesNotification=h.FileOperationPatternKind=h.LinkedEditingRangeRequest=h.ShowDocumentRequest=h.SemanticTokensRegistrationType=h.SemanticTokensRefreshRequest=h.SemanticTokensRangeRequest=h.SemanticTokensDeltaRequest=h.SemanticTokensRequest=h.TokenFormat=h.CallHierarchyPrepareRequest=h.CallHierarchyOutgoingCallsRequest=h.CallHierarchyIncomingCallsRequest=h.WorkDoneProgressCancelNotification=h.WorkDoneProgressCreateRequest=h.WorkDoneProgress=h.SelectionRangeRequest=h.DeclarationRequest=h.FoldingRangeRequest=h.ColorPresentationRequest=h.DocumentColorRequest=h.ConfigurationRequest=h.DidChangeWorkspaceFoldersNotification=h.WorkspaceFoldersRequest=h.TypeDefinitionRequest=h.ImplementationRequest=h.ApplyWorkspaceEditRequest=h.ExecuteCommandRequest=h.PrepareRenameRequest=h.RenameRequest=h.PrepareSupportDefaultBehavior=h.DocumentOnTypeFormattingRequest=h.DocumentRangeFormattingRequest=h.DocumentFormattingRequest=h.DocumentLinkResolveRequest=h.DocumentLinkRequest=h.CodeLensRefreshRequest=h.CodeLensResolveRequest=h.CodeLensRequest=h.WorkspaceSymbolResolveRequest=void 0;h.DidCloseNotebookDocumentNotification=h.DidSaveNotebookDocumentNotification=h.DidChangeNotebookDocumentNotification=h.NotebookCellArrayChange=h.DidOpenNotebookDocumentNotification=h.NotebookDocumentSyncRegistrationType=h.NotebookDocument=h.NotebookCell=h.ExecutionSummary=h.NotebookCellKind=h.DiagnosticRefreshRequest=h.WorkspaceDiagnosticRequest=h.DocumentDiagnosticRequest=h.DocumentDiagnosticReportKind=h.DiagnosticServerCancellationData=h.InlayHintRefreshRequest=h.InlayHintResolveRequest=h.InlayHintRequest=h.InlineValueRefreshRequest=h.InlineValueRequest=h.TypeHierarchySupertypesRequest=void 0;var O=it(),aT=ho(),Bt=xu(),BE=Ny();Object.defineProperty(h,"ImplementationRequest",{enumerable:!0,get:function(){return BE.ImplementationRequest}});var zE=Iy();Object.defineProperty(h,"TypeDefinitionRequest",{enumerable:!0,get:function(){return zE.TypeDefinitionRequest}});var cT=Py();Object.defineProperty(h,"WorkspaceFoldersRequest",{enumerable:!0,get:function(){return cT.WorkspaceFoldersRequest}});Object.defineProperty(h,"DidChangeWorkspaceFoldersNotification",{enumerable:!0,get:function(){return cT.DidChangeWorkspaceFoldersNotification}});var VE=Oy();Object.defineProperty(h,"ConfigurationRequest",{enumerable:!0,get:function(){return VE.ConfigurationRequest}});var uT=Ly();Object.defineProperty(h,"DocumentColorRequest",{enumerable:!0,get:function(){return uT.DocumentColorRequest}});Object.defineProperty(h,"ColorPresentationRequest",{enumerable:!0,get:function(){return uT.ColorPresentationRequest}});var XE=Fy();Object.defineProperty(h,"FoldingRangeRequest",{enumerable:!0,get:function(){return XE.FoldingRangeRequest}});var YE=qy();Object.defineProperty(h,"DeclarationRequest",{enumerable:!0,get:function(){return YE.DeclarationRequest}});var JE=Gy();Object.defineProperty(h,"SelectionRangeRequest",{enumerable:!0,get:function(){return JE.SelectionRangeRequest}});var vm=Hy();Object.defineProperty(h,"WorkDoneProgress",{enumerable:!0,get:function(){return vm.WorkDoneProgress}});Object.defineProperty(h,"WorkDoneProgressCreateRequest",{enumerable:!0,get:function(){return vm.WorkDoneProgressCreateRequest}});Object.defineProperty(h,"WorkDoneProgressCancelNotification",{enumerable:!0,get:function(){return vm.WorkDoneProgressCancelNotification}});var Rm=Ky();Object.defineProperty(h,"CallHierarchyIncomingCallsRequest",{enumerable:!0,get:function(){return Rm.CallHierarchyIncomingCallsRequest}});Object.defineProperty(h,"CallHierarchyOutgoingCallsRequest",{enumerable:!0,get:function(){return Rm.CallHierarchyOutgoingCallsRequest}});Object.defineProperty(h,"CallHierarchyPrepareRequest",{enumerable:!0,get:function(){return Rm.CallHierarchyPrepareRequest}});var rs=Wy();Object.defineProperty(h,"TokenFormat",{enumerable:!0,get:function(){return rs.TokenFormat}});Object.defineProperty(h,"SemanticTokensRequest",{enumerable:!0,get:function(){return rs.SemanticTokensRequest}});Object.defineProperty(h,"SemanticTokensDeltaRequest",{enumerable:!0,get:function(){return rs.SemanticTokensDeltaRequest}});Object.defineProperty(h,"SemanticTokensRangeRequest",{enumerable:!0,get:function(){return rs.SemanticTokensRangeRequest}});Object.defineProperty(h,"SemanticTokensRefreshRequest",{enumerable:!0,get:function(){return rs.SemanticTokensRefreshRequest}});Object.defineProperty(h,"SemanticTokensRegistrationType",{enumerable:!0,get:function(){return rs.SemanticTokensRegistrationType}});var QE=zy();Object.defineProperty(h,"ShowDocumentRequest",{enumerable:!0,get:function(){return QE.ShowDocumentRequest}});var ZE=Xy();Object.defineProperty(h,"LinkedEditingRangeRequest",{enumerable:!0,get:function(){return ZE.LinkedEditingRangeRequest}});var go=Yy();Object.defineProperty(h,"FileOperationPatternKind",{enumerable:!0,get:function(){return go.FileOperationPatternKind}});Object.defineProperty(h,"DidCreateFilesNotification",{enumerable:!0,get:function(){return go.DidCreateFilesNotification}});Object.defineProperty(h,"WillCreateFilesRequest",{enumerable:!0,get:function(){return go.WillCreateFilesRequest}});Object.defineProperty(h,"DidRenameFilesNotification",{enumerable:!0,get:function(){return go.DidRenameFilesNotification}});Object.defineProperty(h,"WillRenameFilesRequest",{enumerable:!0,get:function(){return go.WillRenameFilesRequest}});Object.defineProperty(h,"DidDeleteFilesNotification",{enumerable:!0,get:function(){return go.DidDeleteFilesNotification}});Object.defineProperty(h,"WillDeleteFilesRequest",{enumerable:!0,get:function(){return go.WillDeleteFilesRequest}});var xm=Qy();Object.defineProperty(h,"UniquenessLevel",{enumerable:!0,get:function(){return xm.UniquenessLevel}});Object.defineProperty(h,"MonikerKind",{enumerable:!0,get:function(){return xm.MonikerKind}});Object.defineProperty(h,"MonikerRequest",{enumerable:!0,get:function(){return xm.MonikerRequest}});var bm=Zy();Object.defineProperty(h,"TypeHierarchyPrepareRequest",{enumerable:!0,get:function(){return bm.TypeHierarchyPrepareRequest}});Object.defineProperty(h,"TypeHierarchySubtypesRequest",{enumerable:!0,get:function(){return bm.TypeHierarchySubtypesRequest}});Object.defineProperty(h,"TypeHierarchySupertypesRequest",{enumerable:!0,get:function(){return bm.TypeHierarchySupertypesRequest}});var lT=eT();Object.defineProperty(h,"InlineValueRequest",{enumerable:!0,get:function(){return lT.InlineValueRequest}});Object.defineProperty(h,"InlineValueRefreshRequest",{enumerable:!0,get:function(){return lT.InlineValueRefreshRequest}});var Sm=tT();Object.defineProperty(h,"InlayHintRequest",{enumerable:!0,get:function(){return Sm.InlayHintRequest}});Object.defineProperty(h,"InlayHintResolveRequest",{enumerable:!0,get:function(){return Sm.InlayHintResolveRequest}});Object.defineProperty(h,"InlayHintRefreshRequest",{enumerable:!0,get:function(){return Sm.InlayHintRefreshRequest}});var za=nT();Object.defineProperty(h,"DiagnosticServerCancellationData",{enumerable:!0,get:function(){return za.DiagnosticServerCancellationData}});Object.defineProperty(h,"DocumentDiagnosticReportKind",{enumerable:!0,get:function(){return za.DocumentDiagnosticReportKind}});Object.defineProperty(h,"DocumentDiagnosticRequest",{enumerable:!0,get:function(){return za.DocumentDiagnosticRequest}});Object.defineProperty(h,"WorkspaceDiagnosticRequest",{enumerable:!0,get:function(){return za.WorkspaceDiagnosticRequest}});Object.defineProperty(h,"DiagnosticRefreshRequest",{enumerable:!0,get:function(){return za.DiagnosticRefreshRequest}});var _n=sT();Object.defineProperty(h,"NotebookCellKind",{enumerable:!0,get:function(){return _n.NotebookCellKind}});Object.defineProperty(h,"ExecutionSummary",{enumerable:!0,get:function(){return _n.ExecutionSummary}});Object.defineProperty(h,"NotebookCell",{enumerable:!0,get:function(){return _n.NotebookCell}});Object.defineProperty(h,"NotebookDocument",{enumerable:!0,get:function(){return _n.NotebookDocument}});Object.defineProperty(h,"NotebookDocumentSyncRegistrationType",{enumerable:!0,get:function(){return _n.NotebookDocumentSyncRegistrationType}});Object.defineProperty(h,"DidOpenNotebookDocumentNotification",{enumerable:!0,get:function(){return _n.DidOpenNotebookDocumentNotification}});Object.defineProperty(h,"NotebookCellArrayChange",{enumerable:!0,get:function(){return _n.NotebookCellArrayChange}});Object.defineProperty(h,"DidChangeNotebookDocumentNotification",{enumerable:!0,get:function(){return _n.DidChangeNotebookDocumentNotification}});Object.defineProperty(h,"DidSaveNotebookDocumentNotification",{enumerable:!0,get:function(){return _n.DidSaveNotebookDocumentNotification}});Object.defineProperty(h,"DidCloseNotebookDocumentNotification",{enumerable:!0,get:function(){return _n.DidCloseNotebookDocumentNotification}});var fT;(function(t){function e(r){let n=r;return Bt.string(n.language)||Bt.string(n.scheme)||Bt.string(n.pattern)}t.is=e})(fT=h.TextDocumentFilter||(h.TextDocumentFilter={}));var dT;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Bt.string(n.notebookType)||Bt.string(n.scheme)||Bt.string(n.pattern))}t.is=e})(dT=h.NotebookDocumentFilter||(h.NotebookDocumentFilter={}));var pT;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(Bt.string(n.notebook)||dT.is(n.notebook))&&(n.language===void 0||Bt.string(n.language))}t.is=e})(pT=h.NotebookCellTextDocumentFilter||(h.NotebookCellTextDocumentFilter={}));var mT;(function(t){function e(r){if(!Array.isArray(r))return!1;for(let n of r)if(!Bt.string(n)&&!fT.is(n)&&!pT.is(n))return!1;return!0}t.is=e})(mT=h.DocumentSelector||(h.DocumentSelector={}));var e_;(function(t){t.method="client/registerCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(e_=h.RegistrationRequest||(h.RegistrationRequest={}));var t_;(function(t){t.method="client/unregisterCapability",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(t_=h.UnregistrationRequest||(h.UnregistrationRequest={}));var r_;(function(t){t.Create="create",t.Rename="rename",t.Delete="delete"})(r_=h.ResourceOperationKind||(h.ResourceOperationKind={}));var n_;(function(t){t.Abort="abort",t.Transactional="transactional",t.TextOnlyTransactional="textOnlyTransactional",t.Undo="undo"})(n_=h.FailureHandlingKind||(h.FailureHandlingKind={}));var i_;(function(t){t.UTF8="utf-8",t.UTF16="utf-16",t.UTF32="utf-32"})(i_=h.PositionEncodingKind||(h.PositionEncodingKind={}));var o_;(function(t){function e(r){let n=r;return n&&Bt.string(n.id)&&n.id.length>0}t.hasId=e})(o_=h.StaticRegistrationOptions||(h.StaticRegistrationOptions={}));var s_;(function(t){function e(r){let n=r;return n&&(n.documentSelector===null||mT.is(n.documentSelector))}t.is=e})(s_=h.TextDocumentRegistrationOptions||(h.TextDocumentRegistrationOptions={}));var a_;(function(t){function e(n){let i=n;return Bt.objectLiteral(i)&&(i.workDoneProgress===void 0||Bt.boolean(i.workDoneProgress))}t.is=e;function r(n){let i=n;return i&&Bt.boolean(i.workDoneProgress)}t.hasWorkDoneProgress=r})(a_=h.WorkDoneProgressOptions||(h.WorkDoneProgressOptions={}));var c_;(function(t){t.method="initialize",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(c_=h.InitializeRequest||(h.InitializeRequest={}));var u_;(function(t){t.unknownProtocolVersion=1})(u_=h.InitializeErrorCodes||(h.InitializeErrorCodes={}));var l_;(function(t){t.method="initialized",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(l_=h.InitializedNotification||(h.InitializedNotification={}));var f_;(function(t){t.method="shutdown",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType0(t.method)})(f_=h.ShutdownRequest||(h.ShutdownRequest={}));var d_;(function(t){t.method="exit",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType0(t.method)})(d_=h.ExitNotification||(h.ExitNotification={}));var p_;(function(t){t.method="workspace/didChangeConfiguration",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(p_=h.DidChangeConfigurationNotification||(h.DidChangeConfigurationNotification={}));var m_;(function(t){t.Error=1,t.Warning=2,t.Info=3,t.Log=4})(m_=h.MessageType||(h.MessageType={}));var h_;(function(t){t.method="window/showMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(h_=h.ShowMessageNotification||(h.ShowMessageNotification={}));var g_;(function(t){t.method="window/showMessageRequest",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType(t.method)})(g_=h.ShowMessageRequest||(h.ShowMessageRequest={}));var y_;(function(t){t.method="window/logMessage",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(y_=h.LogMessageNotification||(h.LogMessageNotification={}));var T_;(function(t){t.method="telemetry/event",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(T_=h.TelemetryEventNotification||(h.TelemetryEventNotification={}));var v_;(function(t){t.None=0,t.Full=1,t.Incremental=2})(v_=h.TextDocumentSyncKind||(h.TextDocumentSyncKind={}));var R_;(function(t){t.method="textDocument/didOpen",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(R_=h.DidOpenTextDocumentNotification||(h.DidOpenTextDocumentNotification={}));var x_;(function(t){function e(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range!==void 0&&(i.rangeLength===void 0||typeof i.rangeLength=="number")}t.isIncremental=e;function r(n){let i=n;return i!=null&&typeof i.text=="string"&&i.range===void 0&&i.rangeLength===void 0}t.isFull=r})(x_=h.TextDocumentContentChangeEvent||(h.TextDocumentContentChangeEvent={}));var b_;(function(t){t.method="textDocument/didChange",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(b_=h.DidChangeTextDocumentNotification||(h.DidChangeTextDocumentNotification={}));var S_;(function(t){t.method="textDocument/didClose",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(S_=h.DidCloseTextDocumentNotification||(h.DidCloseTextDocumentNotification={}));var w_;(function(t){t.method="textDocument/didSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(w_=h.DidSaveTextDocumentNotification||(h.DidSaveTextDocumentNotification={}));var C_;(function(t){t.Manual=1,t.AfterDelay=2,t.FocusOut=3})(C_=h.TextDocumentSaveReason||(h.TextDocumentSaveReason={}));var A_;(function(t){t.method="textDocument/willSave",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(A_=h.WillSaveTextDocumentNotification||(h.WillSaveTextDocumentNotification={}));var k_;(function(t){t.method="textDocument/willSaveWaitUntil",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(k_=h.WillSaveTextDocumentWaitUntilRequest||(h.WillSaveTextDocumentWaitUntilRequest={}));var E_;(function(t){t.method="workspace/didChangeWatchedFiles",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolNotificationType(t.method)})(E_=h.DidChangeWatchedFilesNotification||(h.DidChangeWatchedFilesNotification={}));var __;(function(t){t.Created=1,t.Changed=2,t.Deleted=3})(__=h.FileChangeType||(h.FileChangeType={}));var N_;(function(t){function e(r){let n=r;return Bt.objectLiteral(n)&&(aT.URI.is(n.baseUri)||aT.WorkspaceFolder.is(n.baseUri))&&Bt.string(n.pattern)}t.is=e})(N_=h.RelativePattern||(h.RelativePattern={}));var $_;(function(t){t.Create=1,t.Change=2,t.Delete=4})($_=h.WatchKind||(h.WatchKind={}));var I_;(function(t){t.method="textDocument/publishDiagnostics",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolNotificationType(t.method)})(I_=h.PublishDiagnosticsNotification||(h.PublishDiagnosticsNotification={}));var P_;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.TriggerForIncompleteCompletions=3})(P_=h.CompletionTriggerKind||(h.CompletionTriggerKind={}));var D_;(function(t){t.method="textDocument/completion",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(D_=h.CompletionRequest||(h.CompletionRequest={}));var O_;(function(t){t.method="completionItem/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(O_=h.CompletionResolveRequest||(h.CompletionResolveRequest={}));var L_;(function(t){t.method="textDocument/hover",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(L_=h.HoverRequest||(h.HoverRequest={}));var M_;(function(t){t.Invoked=1,t.TriggerCharacter=2,t.ContentChange=3})(M_=h.SignatureHelpTriggerKind||(h.SignatureHelpTriggerKind={}));var F_;(function(t){t.method="textDocument/signatureHelp",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(F_=h.SignatureHelpRequest||(h.SignatureHelpRequest={}));var U_;(function(t){t.method="textDocument/definition",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(U_=h.DefinitionRequest||(h.DefinitionRequest={}));var q_;(function(t){t.method="textDocument/references",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(q_=h.ReferencesRequest||(h.ReferencesRequest={}));var j_;(function(t){t.method="textDocument/documentHighlight",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(j_=h.DocumentHighlightRequest||(h.DocumentHighlightRequest={}));var G_;(function(t){t.method="textDocument/documentSymbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(G_=h.DocumentSymbolRequest||(h.DocumentSymbolRequest={}));var H_;(function(t){t.method="textDocument/codeAction",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(H_=h.CodeActionRequest||(h.CodeActionRequest={}));var K_;(function(t){t.method="codeAction/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(K_=h.CodeActionResolveRequest||(h.CodeActionResolveRequest={}));var W_;(function(t){t.method="workspace/symbol",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(W_=h.WorkspaceSymbolRequest||(h.WorkspaceSymbolRequest={}));var B_;(function(t){t.method="workspaceSymbol/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(B_=h.WorkspaceSymbolResolveRequest||(h.WorkspaceSymbolResolveRequest={}));var z_;(function(t){t.method="textDocument/codeLens",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(z_=h.CodeLensRequest||(h.CodeLensRequest={}));var V_;(function(t){t.method="codeLens/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(V_=h.CodeLensResolveRequest||(h.CodeLensResolveRequest={}));var X_;(function(t){t.method="workspace/codeLens/refresh",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType0(t.method)})(X_=h.CodeLensRefreshRequest||(h.CodeLensRefreshRequest={}));var Y_;(function(t){t.method="textDocument/documentLink",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Y_=h.DocumentLinkRequest||(h.DocumentLinkRequest={}));var J_;(function(t){t.method="documentLink/resolve",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(J_=h.DocumentLinkResolveRequest||(h.DocumentLinkResolveRequest={}));var Q_;(function(t){t.method="textDocument/formatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Q_=h.DocumentFormattingRequest||(h.DocumentFormattingRequest={}));var Z_;(function(t){t.method="textDocument/rangeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(Z_=h.DocumentRangeFormattingRequest||(h.DocumentRangeFormattingRequest={}));var eN;(function(t){t.method="textDocument/onTypeFormatting",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(eN=h.DocumentOnTypeFormattingRequest||(h.DocumentOnTypeFormattingRequest={}));var tN;(function(t){t.Identifier=1})(tN=h.PrepareSupportDefaultBehavior||(h.PrepareSupportDefaultBehavior={}));var rN;(function(t){t.method="textDocument/rename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(rN=h.RenameRequest||(h.RenameRequest={}));var nN;(function(t){t.method="textDocument/prepareRename",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(nN=h.PrepareRenameRequest||(h.PrepareRenameRequest={}));var iN;(function(t){t.method="workspace/executeCommand",t.messageDirection=O.MessageDirection.clientToServer,t.type=new O.ProtocolRequestType(t.method)})(iN=h.ExecuteCommandRequest||(h.ExecuteCommandRequest={}));var oN;(function(t){t.method="workspace/applyEdit",t.messageDirection=O.MessageDirection.serverToClient,t.type=new O.ProtocolRequestType("workspace/applyEdit")})(oN=h.ApplyWorkspaceEditRequest||(h.ApplyWorkspaceEditRequest={}))});var yT=j(ku=>{"use strict";Object.defineProperty(ku,"__esModule",{value:!0});ku.createProtocolConnection=void 0;var gT=ti();function sN(t,e,r,n){return gT.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,gT.createMessageConnection)(t,e,r,n)}ku.createProtocolConnection=sN});var wm=j(pr=>{"use strict";var aN=pr&&pr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Eu=pr&&pr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&aN(e,t,r)};Object.defineProperty(pr,"__esModule",{value:!0});pr.LSPErrorCodes=pr.createProtocolConnection=void 0;Eu(ti(),pr);Eu(ho(),pr);Eu(it(),pr);Eu(hT(),pr);var cN=yT();Object.defineProperty(pr,"createProtocolConnection",{enumerable:!0,get:function(){return cN.createProtocolConnection}});var uN;(function(t){t.lspReservedErrorRangeStart=-32899,t.RequestFailed=-32803,t.ServerCancelled=-32802,t.ContentModified=-32801,t.RequestCancelled=-32800,t.lspReservedErrorRangeEnd=-32800})(uN=pr.LSPErrorCodes||(pr.LSPErrorCodes={}))});var kt=j(Nn=>{"use strict";var lN=Nn&&Nn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),TT=Nn&&Nn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&lN(e,t,r)};Object.defineProperty(Nn,"__esModule",{value:!0});Nn.createProtocolConnection=void 0;var fN=dm();TT(dm(),Nn);TT(wm(),Nn);function dN(t,e,r,n){return(0,fN.createMessageConnection)(t,e,r,n)}Nn.createProtocolConnection=dN});var Cm=j(Wr=>{"use strict";Object.defineProperty(Wr,"__esModule",{value:!0});Wr.generateUuid=Wr.parse=Wr.isUUID=Wr.v4=Wr.empty=void 0;var Va=class{constructor(e){this._value=e}asHex(){return this._value}equals(e){return this.asHex()===e.asHex()}},Xa=class t extends Va{constructor(){super([t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),"-","4",t._randomHex(),t._randomHex(),t._randomHex(),"-",t._oneOf(t._timeHighBits),t._randomHex(),t._randomHex(),t._randomHex(),"-",t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex(),t._randomHex()].join(""))}static _oneOf(e){return e[Math.floor(e.length*Math.random())]}static _randomHex(){return t._oneOf(t._chars)}};Xa._chars=["0","1","2","3","4","5","6","6","7","8","9","a","b","c","d","e","f"];Xa._timeHighBits=["8","9","a","b"];Wr.empty=new Va("00000000-0000-0000-0000-000000000000");function vT(){return new Xa}Wr.v4=vT;var pN=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;function RT(t){return pN.test(t)}Wr.isUUID=RT;function mN(t){if(!RT(t))throw new Error("invalid uuid");return new Va(t)}Wr.parse=mN;function hN(){return vT().asHex()}Wr.generateUuid=hN});var xT=j(Ii=>{"use strict";Object.defineProperty(Ii,"__esModule",{value:!0});Ii.attachPartialResult=Ii.ProgressFeature=Ii.attachWorkDone=void 0;var $i=kt(),gN=Cm(),yo=class t{constructor(e,r){this._connection=e,this._token=r,t.Instances.set(this._token,this)}begin(e,r,n,i){let o={kind:"begin",title:e,percentage:r,message:n,cancellable:i};this._connection.sendProgress($i.WorkDoneProgress.type,this._token,o)}report(e,r){let n={kind:"report"};typeof e=="number"?(n.percentage=e,r!==void 0&&(n.message=r)):n.message=e,this._connection.sendProgress($i.WorkDoneProgress.type,this._token,n)}done(){t.Instances.delete(this._token),this._connection.sendProgress($i.WorkDoneProgress.type,this._token,{kind:"end"})}};yo.Instances=new Map;var _u=class extends yo{constructor(e,r){super(e,r),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose(),super.done()}cancel(){this._source.cancel()}},Ya=class{constructor(){}begin(){}report(){}done(){}},Nu=class extends Ya{constructor(){super(),this._source=new $i.CancellationTokenSource}get token(){return this._source.token}done(){this._source.dispose()}cancel(){this._source.cancel()}};function yN(t,e){if(e===void 0||e.workDoneToken===void 0)return new Ya;let r=e.workDoneToken;return delete e.workDoneToken,new yo(t,r)}Ii.attachWorkDone=yN;var TN=t=>class extends t{constructor(){super(),this._progressSupported=!1}initialize(e){super.initialize(e),e?.window?.workDoneProgress===!0&&(this._progressSupported=!0,this.connection.onNotification($i.WorkDoneProgressCancelNotification.type,r=>{let n=yo.Instances.get(r.token);(n instanceof _u||n instanceof Nu)&&n.cancel()}))}attachWorkDoneProgress(e){return e===void 0?new Ya:new yo(this.connection,e)}createWorkDoneProgress(){if(this._progressSupported){let e=(0,gN.generateUuid)();return this.connection.sendRequest($i.WorkDoneProgressCreateRequest.type,{token:e}).then(()=>new _u(this.connection,e))}else return Promise.resolve(new Nu)}};Ii.ProgressFeature=TN;var Am;(function(t){t.type=new $i.ProgressType})(Am||(Am={}));var km=class{constructor(e,r){this._connection=e,this._token=r}report(e){this._connection.sendProgress(Am.type,this._token,e)}};function vN(t,e){if(e===void 0||e.partialResultToken===void 0)return;let r=e.partialResultToken;return delete e.partialResultToken,new km(t,r)}Ii.attachPartialResult=vN});var bT=j($u=>{"use strict";Object.defineProperty($u,"__esModule",{value:!0});$u.ConfigurationFeature=void 0;var RN=kt(),xN=su(),bN=t=>class extends t{getConfiguration(e){return e?xN.string(e)?this._getConfiguration({section:e}):this._getConfiguration(e):this._getConfiguration({})}_getConfiguration(e){let r={items:Array.isArray(e)?e:[e]};return this.connection.sendRequest(RN.ConfigurationRequest.type,r).then(n=>Array.isArray(n)?Array.isArray(e)?n:n[0]:Array.isArray(e)?[]:null)}};$u.ConfigurationFeature=bN});var ST=j(Pu=>{"use strict";Object.defineProperty(Pu,"__esModule",{value:!0});Pu.WorkspaceFoldersFeature=void 0;var Iu=kt(),SN=t=>class extends t{constructor(){super(),this._notificationIsAutoRegistered=!1}initialize(e){super.initialize(e);let r=e.workspace;r&&r.workspaceFolders&&(this._onDidChangeWorkspaceFolders=new Iu.Emitter,this.connection.onNotification(Iu.DidChangeWorkspaceFoldersNotification.type,n=>{this._onDidChangeWorkspaceFolders.fire(n.event)}))}fillServerCapabilities(e){super.fillServerCapabilities(e);let r=e.workspace?.workspaceFolders?.changeNotifications;this._notificationIsAutoRegistered=r===!0||typeof r=="string"}getWorkspaceFolders(){return this.connection.sendRequest(Iu.WorkspaceFoldersRequest.type)}get onDidChangeWorkspaceFolders(){if(!this._onDidChangeWorkspaceFolders)throw new Error("Client doesn't support sending workspace folder change events.");return!this._notificationIsAutoRegistered&&!this._unregistration&&(this._unregistration=this.connection.client.register(Iu.DidChangeWorkspaceFoldersNotification.type)),this._onDidChangeWorkspaceFolders.event}};Pu.WorkspaceFoldersFeature=SN});var wT=j(Du=>{"use strict";Object.defineProperty(Du,"__esModule",{value:!0});Du.CallHierarchyFeature=void 0;var Em=kt(),wN=t=>class extends t{get callHierarchy(){return{onPrepare:e=>this.connection.onRequest(Em.CallHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onIncomingCalls:e=>{let r=Em.CallHierarchyIncomingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onOutgoingCalls:e=>{let r=Em.CallHierarchyOutgoingCallsRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Du.CallHierarchyFeature=wN});var Nm=j(Pi=>{"use strict";Object.defineProperty(Pi,"__esModule",{value:!0});Pi.SemanticTokensBuilder=Pi.SemanticTokensDiff=Pi.SemanticTokensFeature=void 0;var Ou=kt(),CN=t=>class extends t{get semanticTokens(){return{refresh:()=>this.connection.sendRequest(Ou.SemanticTokensRefreshRequest.type),on:e=>{let r=Ou.SemanticTokensRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onDelta:e=>{let r=Ou.SemanticTokensDeltaRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onRange:e=>{let r=Ou.SemanticTokensRangeRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Pi.SemanticTokensFeature=CN;var Lu=class{constructor(e,r){this.originalSequence=e,this.modifiedSequence=r}computeDiff(){let e=this.originalSequence.length,r=this.modifiedSequence.length,n=0;for(;n<r&&n<e&&this.originalSequence[n]===this.modifiedSequence[n];)n++;if(n<r&&n<e){let i=e-1,o=r-1;for(;i>=n&&o>=n&&this.originalSequence[i]===this.modifiedSequence[o];)i--,o--;(i<n||o<n)&&(i++,o++);let s=i-n+1,a=this.modifiedSequence.slice(n,o+1);return a.length===1&&a[0]===this.originalSequence[i]?[{start:n,deleteCount:s-1}]:[{start:n,deleteCount:s,data:a}]}else return n<r?[{start:n,deleteCount:0,data:this.modifiedSequence.slice(n)}]:n<e?[{start:n,deleteCount:e-n}]:[]}};Pi.SemanticTokensDiff=Lu;var _m=class{constructor(){this._prevData=void 0,this.initialize()}initialize(){this._id=Date.now(),this._prevLine=0,this._prevChar=0,this._data=[],this._dataLen=0}push(e,r,n,i,o){let s=e,a=r;this._dataLen>0&&(s-=this._prevLine,s===0&&(a-=this._prevChar)),this._data[this._dataLen++]=s,this._data[this._dataLen++]=a,this._data[this._dataLen++]=n,this._data[this._dataLen++]=i,this._data[this._dataLen++]=o,this._prevLine=e,this._prevChar=r}get id(){return this._id.toString()}previousResult(e){this.id===e&&(this._prevData=this._data),this.initialize()}build(){return this._prevData=void 0,{resultId:this.id,data:this._data}}canBuildEdits(){return this._prevData!==void 0}buildEdits(){return this._prevData!==void 0?{resultId:this.id,edits:new Lu(this._prevData,this._data).computeDiff()}:this.build()}};Pi.SemanticTokensBuilder=_m});var CT=j(Mu=>{"use strict";Object.defineProperty(Mu,"__esModule",{value:!0});Mu.ShowDocumentFeature=void 0;var AN=kt(),kN=t=>class extends t{showDocument(e){return this.connection.sendRequest(AN.ShowDocumentRequest.type,e)}};Mu.ShowDocumentFeature=kN});var AT=j(Fu=>{"use strict";Object.defineProperty(Fu,"__esModule",{value:!0});Fu.FileOperationsFeature=void 0;var ns=kt(),EN=t=>class extends t{onDidCreateFiles(e){return this.connection.onNotification(ns.DidCreateFilesNotification.type,r=>{e(r)})}onDidRenameFiles(e){return this.connection.onNotification(ns.DidRenameFilesNotification.type,r=>{e(r)})}onDidDeleteFiles(e){return this.connection.onNotification(ns.DidDeleteFilesNotification.type,r=>{e(r)})}onWillCreateFiles(e){return this.connection.onRequest(ns.WillCreateFilesRequest.type,(r,n)=>e(r,n))}onWillRenameFiles(e){return this.connection.onRequest(ns.WillRenameFilesRequest.type,(r,n)=>e(r,n))}onWillDeleteFiles(e){return this.connection.onRequest(ns.WillDeleteFilesRequest.type,(r,n)=>e(r,n))}};Fu.FileOperationsFeature=EN});var kT=j(Uu=>{"use strict";Object.defineProperty(Uu,"__esModule",{value:!0});Uu.LinkedEditingRangeFeature=void 0;var _N=kt(),NN=t=>class extends t{onLinkedEditingRange(e){return this.connection.onRequest(_N.LinkedEditingRangeRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0))}};Uu.LinkedEditingRangeFeature=NN});var ET=j(qu=>{"use strict";Object.defineProperty(qu,"__esModule",{value:!0});qu.TypeHierarchyFeature=void 0;var $m=kt(),$N=t=>class extends t{get typeHierarchy(){return{onPrepare:e=>this.connection.onRequest($m.TypeHierarchyPrepareRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),void 0)),onSupertypes:e=>{let r=$m.TypeHierarchySupertypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))},onSubtypes:e=>{let r=$m.TypeHierarchySubtypesRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};qu.TypeHierarchyFeature=$N});var NT=j(ju=>{"use strict";Object.defineProperty(ju,"__esModule",{value:!0});ju.InlineValueFeature=void 0;var _T=kt(),IN=t=>class extends t{get inlineValue(){return{refresh:()=>this.connection.sendRequest(_T.InlineValueRefreshRequest.type),on:e=>this.connection.onRequest(_T.InlineValueRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r)))}}};ju.InlineValueFeature=IN});var $T=j(Gu=>{"use strict";Object.defineProperty(Gu,"__esModule",{value:!0});Gu.InlayHintFeature=void 0;var Im=kt(),PN=t=>class extends t{get inlayHint(){return{refresh:()=>this.connection.sendRequest(Im.InlayHintRefreshRequest.type),on:e=>this.connection.onRequest(Im.InlayHintRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r))),resolve:e=>this.connection.onRequest(Im.InlayHintResolveRequest.type,(r,n)=>e(r,n))}}};Gu.InlayHintFeature=PN});var IT=j(Hu=>{"use strict";Object.defineProperty(Hu,"__esModule",{value:!0});Hu.DiagnosticFeature=void 0;var Ja=kt(),DN=t=>class extends t{get diagnostics(){return{refresh:()=>this.connection.sendRequest(Ja.DiagnosticRefreshRequest.type),on:e=>this.connection.onRequest(Ja.DocumentDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Ja.DocumentDiagnosticRequest.partialResult,r))),onWorkspace:e=>this.connection.onRequest(Ja.WorkspaceDiagnosticRequest.type,(r,n)=>e(r,n,this.attachWorkDoneProgress(r),this.attachPartialResultProgress(Ja.WorkspaceDiagnosticRequest.partialResult,r)))}}};Hu.DiagnosticFeature=DN});var Dm=j(Ku=>{"use strict";Object.defineProperty(Ku,"__esModule",{value:!0});Ku.TextDocuments=void 0;var To=kt(),Pm=class{constructor(e){this._configuration=e,this._syncedDocuments=new Map,this._onDidChangeContent=new To.Emitter,this._onDidOpen=new To.Emitter,this._onDidClose=new To.Emitter,this._onDidSave=new To.Emitter,this._onWillSave=new To.Emitter}get onDidOpen(){return this._onDidOpen.event}get onDidChangeContent(){return this._onDidChangeContent.event}get onWillSave(){return this._onWillSave.event}onWillSaveWaitUntil(e){this._willSaveWaitUntil=e}get onDidSave(){return this._onDidSave.event}get onDidClose(){return this._onDidClose.event}get(e){return this._syncedDocuments.get(e)}all(){return Array.from(this._syncedDocuments.values())}keys(){return Array.from(this._syncedDocuments.keys())}listen(e){e.__textDocumentSync=To.TextDocumentSyncKind.Incremental;let r=[];return r.push(e.onDidOpenTextDocument(n=>{let i=n.textDocument,o=this._configuration.create(i.uri,i.languageId,i.version,i.text);this._syncedDocuments.set(i.uri,o);let s=Object.freeze({document:o});this._onDidOpen.fire(s),this._onDidChangeContent.fire(s)})),r.push(e.onDidChangeTextDocument(n=>{let i=n.textDocument,o=n.contentChanges;if(o.length===0)return;let{version:s}=i;if(s==null)throw new Error(`Received document change event for ${i.uri} without valid version identifier`);let a=this._syncedDocuments.get(i.uri);a!==void 0&&(a=this._configuration.update(a,o,s),this._syncedDocuments.set(i.uri,a),this._onDidChangeContent.fire(Object.freeze({document:a})))})),r.push(e.onDidCloseTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&(this._syncedDocuments.delete(n.textDocument.uri),this._onDidClose.fire(Object.freeze({document:i})))})),r.push(e.onWillSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onWillSave.fire(Object.freeze({document:i,reason:n.reason}))})),r.push(e.onWillSaveTextDocumentWaitUntil((n,i)=>{let o=this._syncedDocuments.get(n.textDocument.uri);return o!==void 0&&this._willSaveWaitUntil?this._willSaveWaitUntil(Object.freeze({document:o,reason:n.reason}),i):[]})),r.push(e.onDidSaveTextDocument(n=>{let i=this._syncedDocuments.get(n.textDocument.uri);i!==void 0&&this._onDidSave.fire(Object.freeze({document:i}))})),To.Disposable.create(()=>{r.forEach(n=>n.dispose())})}};Ku.TextDocuments=Pm});var Lm=j(is=>{"use strict";Object.defineProperty(is,"__esModule",{value:!0});is.NotebookDocuments=is.NotebookSyncFeature=void 0;var Br=kt(),PT=Dm(),ON=t=>class extends t{get synchronization(){return{onDidOpenNotebookDocument:e=>this.connection.onNotification(Br.DidOpenNotebookDocumentNotification.type,r=>{e(r)}),onDidChangeNotebookDocument:e=>this.connection.onNotification(Br.DidChangeNotebookDocumentNotification.type,r=>{e(r)}),onDidSaveNotebookDocument:e=>this.connection.onNotification(Br.DidSaveNotebookDocumentNotification.type,r=>{e(r)}),onDidCloseNotebookDocument:e=>this.connection.onNotification(Br.DidCloseNotebookDocumentNotification.type,r=>{e(r)})}}};is.NotebookSyncFeature=ON;var Wu=class t{onDidOpenTextDocument(e){return this.openHandler=e,Br.Disposable.create(()=>{this.openHandler=void 0})}openTextDocument(e){this.openHandler&&this.openHandler(e)}onDidChangeTextDocument(e){return this.changeHandler=e,Br.Disposable.create(()=>{this.changeHandler=e})}changeTextDocument(e){this.changeHandler&&this.changeHandler(e)}onDidCloseTextDocument(e){return this.closeHandler=e,Br.Disposable.create(()=>{this.closeHandler=void 0})}closeTextDocument(e){this.closeHandler&&this.closeHandler(e)}onWillSaveTextDocument(){return t.NULL_DISPOSE}onWillSaveTextDocumentWaitUntil(){return t.NULL_DISPOSE}onDidSaveTextDocument(){return t.NULL_DISPOSE}};Wu.NULL_DISPOSE=Object.freeze({dispose:()=>{}});var Om=class{constructor(e){e instanceof PT.TextDocuments?this._cellTextDocuments=e:this._cellTextDocuments=new PT.TextDocuments(e),this.notebookDocuments=new Map,this.notebookCellMap=new Map,this._onDidOpen=new Br.Emitter,this._onDidChange=new Br.Emitter,this._onDidSave=new Br.Emitter,this._onDidClose=new Br.Emitter}get cellTextDocuments(){return this._cellTextDocuments}getCellTextDocument(e){return this._cellTextDocuments.get(e.document)}getNotebookDocument(e){return this.notebookDocuments.get(e)}getNotebookCell(e){let r=this.notebookCellMap.get(e);return r&&r[0]}findNotebookDocumentForCell(e){let r=typeof e=="string"?e:e.document,n=this.notebookCellMap.get(r);return n&&n[1]}get onDidOpen(){return this._onDidOpen.event}get onDidSave(){return this._onDidSave.event}get onDidChange(){return this._onDidChange.event}get onDidClose(){return this._onDidClose.event}listen(e){let r=new Wu,n=[];return n.push(this.cellTextDocuments.listen(r)),n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i=>{this.notebookDocuments.set(i.notebookDocument.uri,i.notebookDocument);for(let o of i.cellTextDocuments)r.openTextDocument({textDocument:o});this.updateCellMap(i.notebookDocument),this._onDidOpen.fire(i.notebookDocument)})),n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o===void 0)return;o.version=i.notebookDocument.version;let s=o.metadata,a=!1,c=i.change;c.metadata!==void 0&&(a=!0,o.metadata=c.metadata);let u=[],l=[],f=[],m=[];if(c.cells!==void 0){let A=c.cells;if(A.structure!==void 0){let v=A.structure.array;if(o.cells.splice(v.start,v.deleteCount,...v.cells!==void 0?v.cells:[]),A.structure.didOpen!==void 0)for(let y of A.structure.didOpen)r.openTextDocument({textDocument:y}),u.push(y.uri);if(A.structure.didClose)for(let y of A.structure.didClose)r.closeTextDocument({textDocument:y}),l.push(y.uri)}if(A.data!==void 0){let v=new Map(A.data.map(y=>[y.document,y]));for(let y=0;y<=o.cells.length;y++){let _=v.get(o.cells[y].document);if(_!==void 0){let D=o.cells.splice(y,1,_);if(f.push({old:D[0],new:_}),v.delete(_.document),v.size===0)break}}}if(A.textContent!==void 0)for(let v of A.textContent)r.changeTextDocument({textDocument:v.document,contentChanges:v.changes}),m.push(v.document.uri)}this.updateCellMap(o);let T={notebookDocument:o};a&&(T.metadata={old:s,new:o.metadata});let S=[];for(let A of u)S.push(this.getNotebookCell(A));let C=[];for(let A of l)C.push(this.getNotebookCell(A));let N=[];for(let A of m)N.push(this.getNotebookCell(A));(S.length>0||C.length>0||f.length>0||N.length>0)&&(T.cells={added:S,removed:C,changed:{data:f,textContent:N}}),(T.metadata!==void 0||T.cells!==void 0)&&this._onDidChange.fire(T)})),n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);o!==void 0&&this._onDidSave.fire(o)})),n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i=>{let o=this.notebookDocuments.get(i.notebookDocument.uri);if(o!==void 0){this._onDidClose.fire(o);for(let s of i.cellTextDocuments)r.closeTextDocument({textDocument:s});this.notebookDocuments.delete(i.notebookDocument.uri);for(let s of o.cells)this.notebookCellMap.delete(s.document)}})),Br.Disposable.create(()=>{n.forEach(i=>i.dispose())})}updateCellMap(e){for(let r of e.cells)this.notebookCellMap.set(r.document,[r,e])}};is.NotebookDocuments=Om});var DT=j(Bu=>{"use strict";Object.defineProperty(Bu,"__esModule",{value:!0});Bu.MonikerFeature=void 0;var LN=kt(),MN=t=>class extends t{get moniker(){return{on:e=>{let r=LN.MonikerRequest.type;return this.connection.onRequest(r,(n,i)=>e(n,i,this.attachWorkDoneProgress(n),this.attachPartialResultProgress(r,n)))}}}};Bu.MonikerFeature=MN});var Gm=j(he=>{"use strict";Object.defineProperty(he,"__esModule",{value:!0});he.createConnection=he.combineFeatures=he.combineNotebooksFeatures=he.combineLanguagesFeatures=he.combineWorkspaceFeatures=he.combineWindowFeatures=he.combineClientFeatures=he.combineTracerFeatures=he.combineTelemetryFeatures=he.combineConsoleFeatures=he._NotebooksImpl=he._LanguagesImpl=he.BulkUnregistration=he.BulkRegistration=he.ErrorMessageTracker=void 0;var U=kt(),zr=su(),Fm=Cm(),te=xT(),FN=bT(),UN=ST(),qN=wT(),jN=Nm(),GN=CT(),HN=AT(),KN=kT(),WN=ET(),BN=NT(),zN=$T(),VN=IT(),XN=Lm(),YN=DT();function Mm(t){if(t!==null)return t}var Um=class{constructor(){this._messages=Object.create(null)}add(e){let r=this._messages[e];r||(r=0),r++,this._messages[e]=r}sendErrors(e){Object.keys(this._messages).forEach(r=>{e.window.showErrorMessage(r)})}};he.ErrorMessageTracker=Um;var zu=class{constructor(){}rawAttach(e){this._rawConnection=e}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}fillServerCapabilities(e){}initialize(e){}error(e){this.send(U.MessageType.Error,e)}warn(e){this.send(U.MessageType.Warning,e)}info(e){this.send(U.MessageType.Info,e)}log(e){this.send(U.MessageType.Log,e)}send(e,r){this._rawConnection&&this._rawConnection.sendNotification(U.LogMessageNotification.type,{type:e,message:r}).catch(()=>{(0,U.RAL)().console.error("Sending log message failed")})}},qm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}showErrorMessage(e,...r){let n={type:U.MessageType.Error,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Mm)}showWarningMessage(e,...r){let n={type:U.MessageType.Warning,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Mm)}showInformationMessage(e,...r){let n={type:U.MessageType.Info,message:e,actions:r};return this.connection.sendRequest(U.ShowMessageRequest.type,n).then(Mm)}},OT=(0,GN.ShowDocumentFeature)((0,te.ProgressFeature)(qm)),JN;(function(t){function e(){return new Vu}t.create=e})(JN=he.BulkRegistration||(he.BulkRegistration={}));var Vu=class{constructor(){this._registrations=[],this._registered=new Set}add(e,r){let n=zr.string(e)?e:e.method;if(this._registered.has(n))throw new Error(`${n} is already added to this registration`);let i=Fm.generateUuid();this._registrations.push({id:i,method:n,registerOptions:r||{}}),this._registered.add(n)}asRegistrationParams(){return{registrations:this._registrations}}},QN;(function(t){function e(){return new Qa(void 0,[])}t.create=e})(QN=he.BulkUnregistration||(he.BulkUnregistration={}));var Qa=class{constructor(e,r){this._connection=e,this._unregistrations=new Map,r.forEach(n=>{this._unregistrations.set(n.method,n)})}get isAttached(){return!!this._connection}attach(e){this._connection=e}add(e){this._unregistrations.set(e.method,e)}dispose(){let e=[];for(let n of this._unregistrations.values())e.push(n);let r={unregisterations:e};this._connection.sendRequest(U.UnregistrationRequest.type,r).catch(()=>{this._connection.console.info("Bulk unregistration failed.")})}disposeSingle(e){let r=zr.string(e)?e:e.method,n=this._unregistrations.get(r);if(!n)return!1;let i={unregisterations:[n]};return this._connection.sendRequest(U.UnregistrationRequest.type,i).then(()=>{this._unregistrations.delete(r)},o=>{this._connection.console.info(`Un-registering request handler for ${n.id} failed.`)}),!0}},Xu=class{attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}register(e,r,n){return e instanceof Vu?this.registerMany(e):e instanceof Qa?this.registerSingle1(e,r,n):this.registerSingle2(e,r)}registerSingle1(e,r,n){let i=zr.string(r)?r:r.method,o=Fm.generateUuid(),s={registrations:[{id:o,method:i,registerOptions:n||{}}]};return e.isAttached||e.attach(this.connection),this.connection.sendRequest(U.RegistrationRequest.type,s).then(a=>(e.add({id:o,method:i}),e),a=>(this.connection.console.info(`Registering request handler for ${i} failed.`),Promise.reject(a)))}registerSingle2(e,r){let n=zr.string(e)?e:e.method,i=Fm.generateUuid(),o={registrations:[{id:i,method:n,registerOptions:r||{}}]};return this.connection.sendRequest(U.RegistrationRequest.type,o).then(s=>U.Disposable.create(()=>{this.unregisterSingle(i,n).catch(()=>{this.connection.console.info(`Un-registering capability with id ${i} failed.`)})}),s=>(this.connection.console.info(`Registering request handler for ${n} failed.`),Promise.reject(s)))}unregisterSingle(e,r){let n={unregisterations:[{id:e,method:r}]};return this.connection.sendRequest(U.UnregistrationRequest.type,n).catch(()=>{this.connection.console.info(`Un-registering request handler for ${e} failed.`)})}registerMany(e){let r=e.asRegistrationParams();return this.connection.sendRequest(U.RegistrationRequest.type,r).then(()=>new Qa(this._connection,r.registrations.map(n=>({id:n.id,method:n.method}))),n=>(this.connection.console.info("Bulk registration failed."),Promise.reject(n)))}},jm=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}applyEdit(e){function r(i){return i&&!!i.edit}let n=r(e)?e:{edit:e};return this.connection.sendRequest(U.ApplyWorkspaceEditRequest.type,n)}},LT=(0,HN.FileOperationsFeature)((0,UN.WorkspaceFoldersFeature)((0,FN.ConfigurationFeature)(jm))),Yu=class{constructor(){this._trace=U.Trace.Off}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}set trace(e){this._trace=e}log(e,r){this._trace!==U.Trace.Off&&this.connection.sendNotification(U.LogTraceNotification.type,{message:e,verbose:this._trace===U.Trace.Verbose?r:void 0}).catch(()=>{})}},Ju=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}logEvent(e){this.connection.sendNotification(U.TelemetryEventNotification.type,e).catch(()=>{this.connection.console.log("Sending TelemetryEventNotification failed")})}},Qu=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._LanguagesImpl=Qu;var MT=(0,YN.MonikerFeature)((0,VN.DiagnosticFeature)((0,zN.InlayHintFeature)((0,BN.InlineValueFeature)((0,WN.TypeHierarchyFeature)((0,KN.LinkedEditingRangeFeature)((0,jN.SemanticTokensFeature)((0,qN.CallHierarchyFeature)(Qu)))))))),Zu=class{constructor(){}attach(e){this._connection=e}get connection(){if(!this._connection)throw new Error("Remote is not attached to a connection yet.");return this._connection}initialize(e){}fillServerCapabilities(e){}attachWorkDoneProgress(e){return(0,te.attachWorkDone)(this.connection,e)}attachPartialResultProgress(e,r){return(0,te.attachPartialResult)(this.connection,r)}};he._NotebooksImpl=Zu;var FT=(0,XN.NotebookSyncFeature)(Zu);function UT(t,e){return function(r){return e(t(r))}}he.combineConsoleFeatures=UT;function qT(t,e){return function(r){return e(t(r))}}he.combineTelemetryFeatures=qT;function jT(t,e){return function(r){return e(t(r))}}he.combineTracerFeatures=jT;function GT(t,e){return function(r){return e(t(r))}}he.combineClientFeatures=GT;function HT(t,e){return function(r){return e(t(r))}}he.combineWindowFeatures=HT;function KT(t,e){return function(r){return e(t(r))}}he.combineWorkspaceFeatures=KT;function WT(t,e){return function(r){return e(t(r))}}he.combineLanguagesFeatures=WT;function BT(t,e){return function(r){return e(t(r))}}he.combineNotebooksFeatures=BT;function ZN(t,e){function r(i,o,s){return i&&o?s(i,o):i||o}return{__brand:"features",console:r(t.console,e.console,UT),tracer:r(t.tracer,e.tracer,jT),telemetry:r(t.telemetry,e.telemetry,qT),client:r(t.client,e.client,GT),window:r(t.window,e.window,HT),workspace:r(t.workspace,e.workspace,KT),languages:r(t.languages,e.languages,WT),notebooks:r(t.notebooks,e.notebooks,BT)}}he.combineFeatures=ZN;function e$(t,e,r){let n=r&&r.console?new(r.console(zu)):new zu,i=t(n);n.rawAttach(i);let o=r&&r.tracer?new(r.tracer(Yu)):new Yu,s=r&&r.telemetry?new(r.telemetry(Ju)):new Ju,a=r&&r.client?new(r.client(Xu)):new Xu,c=r&&r.window?new(r.window(OT)):new OT,u=r&&r.workspace?new(r.workspace(LT)):new LT,l=r&&r.languages?new(r.languages(MT)):new MT,f=r&&r.notebooks?new(r.notebooks(FT)):new FT,m=[n,o,s,a,c,u,l,f];function T(v){return v instanceof Promise?v:zr.thenable(v)?new Promise((y,_)=>{v.then(D=>y(D),D=>_(D))}):Promise.resolve(v)}let S,C,N,A={listen:()=>i.listen(),sendRequest:(v,...y)=>i.sendRequest(zr.string(v)?v:v.method,...y),onRequest:(v,y)=>i.onRequest(v,y),sendNotification:(v,y)=>{let _=zr.string(v)?v:v.method;return arguments.length===1?i.sendNotification(_):i.sendNotification(_,y)},onNotification:(v,y)=>i.onNotification(v,y),onProgress:i.onProgress,sendProgress:i.sendProgress,onInitialize:v=>(C=v,{dispose:()=>{C=void 0}}),onInitialized:v=>i.onNotification(U.InitializedNotification.type,v),onShutdown:v=>(S=v,{dispose:()=>{S=void 0}}),onExit:v=>(N=v,{dispose:()=>{N=void 0}}),get console(){return n},get telemetry(){return s},get tracer(){return o},get client(){return a},get window(){return c},get workspace(){return u},get languages(){return l},get notebooks(){return f},onDidChangeConfiguration:v=>i.onNotification(U.DidChangeConfigurationNotification.type,v),onDidChangeWatchedFiles:v=>i.onNotification(U.DidChangeWatchedFilesNotification.type,v),__textDocumentSync:void 0,onDidOpenTextDocument:v=>i.onNotification(U.DidOpenTextDocumentNotification.type,v),onDidChangeTextDocument:v=>i.onNotification(U.DidChangeTextDocumentNotification.type,v),onDidCloseTextDocument:v=>i.onNotification(U.DidCloseTextDocumentNotification.type,v),onWillSaveTextDocument:v=>i.onNotification(U.WillSaveTextDocumentNotification.type,v),onWillSaveTextDocumentWaitUntil:v=>i.onRequest(U.WillSaveTextDocumentWaitUntilRequest.type,v),onDidSaveTextDocument:v=>i.onNotification(U.DidSaveTextDocumentNotification.type,v),sendDiagnostics:v=>i.sendNotification(U.PublishDiagnosticsNotification.type,v),onHover:v=>i.onRequest(U.HoverRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),void 0)),onCompletion:v=>i.onRequest(U.CompletionRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCompletionResolve:v=>i.onRequest(U.CompletionResolveRequest.type,v),onSignatureHelp:v=>i.onRequest(U.SignatureHelpRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),void 0)),onDeclaration:v=>i.onRequest(U.DeclarationRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDefinition:v=>i.onRequest(U.DefinitionRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onTypeDefinition:v=>i.onRequest(U.TypeDefinitionRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onImplementation:v=>i.onRequest(U.ImplementationRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onReferences:v=>i.onRequest(U.ReferencesRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentHighlight:v=>i.onRequest(U.DocumentHighlightRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentSymbol:v=>i.onRequest(U.DocumentSymbolRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbol:v=>i.onRequest(U.WorkspaceSymbolRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onWorkspaceSymbolResolve:v=>i.onRequest(U.WorkspaceSymbolResolveRequest.type,v),onCodeAction:v=>i.onRequest(U.CodeActionRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeActionResolve:v=>i.onRequest(U.CodeActionResolveRequest.type,(y,_)=>v(y,_)),onCodeLens:v=>i.onRequest(U.CodeLensRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onCodeLensResolve:v=>i.onRequest(U.CodeLensResolveRequest.type,(y,_)=>v(y,_)),onDocumentFormatting:v=>i.onRequest(U.DocumentFormattingRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),void 0)),onDocumentRangeFormatting:v=>i.onRequest(U.DocumentRangeFormattingRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),void 0)),onDocumentOnTypeFormatting:v=>i.onRequest(U.DocumentOnTypeFormattingRequest.type,(y,_)=>v(y,_)),onRenameRequest:v=>i.onRequest(U.RenameRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),void 0)),onPrepareRename:v=>i.onRequest(U.PrepareRenameRequest.type,(y,_)=>v(y,_)),onDocumentLinks:v=>i.onRequest(U.DocumentLinkRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onDocumentLinkResolve:v=>i.onRequest(U.DocumentLinkResolveRequest.type,(y,_)=>v(y,_)),onDocumentColor:v=>i.onRequest(U.DocumentColorRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onColorPresentation:v=>i.onRequest(U.ColorPresentationRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onFoldingRanges:v=>i.onRequest(U.FoldingRangeRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onSelectionRanges:v=>i.onRequest(U.SelectionRangeRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),(0,te.attachPartialResult)(i,y))),onExecuteCommand:v=>i.onRequest(U.ExecuteCommandRequest.type,(y,_)=>v(y,_,(0,te.attachWorkDone)(i,y),void 0)),dispose:()=>i.dispose()};for(let v of m)v.attach(A);return i.onRequest(U.InitializeRequest.type,v=>{e.initialize(v),zr.string(v.trace)&&(o.trace=U.Trace.fromString(v.trace));for(let y of m)y.initialize(v.capabilities);if(C){let y=C(v,new U.CancellationTokenSource().token,(0,te.attachWorkDone)(i,v),void 0);return T(y).then(_=>{if(_ instanceof U.ResponseError)return _;let D=_;D||(D={capabilities:{}});let X=D.capabilities;X||(X={},D.capabilities=X),X.textDocumentSync===void 0||X.textDocumentSync===null?X.textDocumentSync=zr.number(A.__textDocumentSync)?A.__textDocumentSync:U.TextDocumentSyncKind.None:!zr.number(X.textDocumentSync)&&!zr.number(X.textDocumentSync.change)&&(X.textDocumentSync.change=zr.number(A.__textDocumentSync)?A.__textDocumentSync:U.TextDocumentSyncKind.None);for(let ye of m)ye.fillServerCapabilities(X);return D})}else{let y={capabilities:{textDocumentSync:U.TextDocumentSyncKind.None}};for(let _ of m)_.fillServerCapabilities(y.capabilities);return y}}),i.onRequest(U.ShutdownRequest.type,()=>{if(e.shutdownReceived=!0,S)return S(new U.CancellationTokenSource().token)}),i.onNotification(U.ExitNotification.type,()=>{try{N&&N()}finally{e.shutdownReceived?e.exit(0):e.exit(1)}}),i.onNotification(U.SetTraceNotification.type,v=>{o.trace=U.Trace.fromString(v.value)}),A}he.createConnection=e$});var VT=j(mr=>{"use strict";Object.defineProperty(mr,"__esModule",{value:!0});mr.resolveModulePath=mr.FileSystem=mr.resolveGlobalYarnPath=mr.resolveGlobalNodePath=mr.resolve=mr.uriToFilePath=void 0;var t$=on("url"),mn=on("path"),Hm=on("fs"),Bm=on("child_process");function r$(t){let e=t$.parse(t);if(e.protocol!=="file:"||!e.path)return;let r=e.path.split("/");for(var n=0,i=r.length;n<i;n++)r[n]=decodeURIComponent(r[n]);if(process.platform==="win32"&&r.length>1){let o=r[0],s=r[1];o.length===0&&s.length>1&&s[1]===":"&&r.shift()}return mn.normalize(r.join("/"))}mr.uriToFilePath=r$;function Km(){return process.platform==="win32"}function el(t,e,r,n){let i="NODE_PATH",o=["var p = process;","p.on('message',function(m){","if(m.c==='e'){","p.exit(0);","}","else if(m.c==='rs'){","try{","var r=require.resolve(m.a);","p.send({c:'r',s:true,r:r});","}","catch(err){","p.send({c:'r',s:false});","}","}","});"].join("");return new Promise((s,a)=>{let c=process.env,u=Object.create(null);Object.keys(c).forEach(l=>u[l]=c[l]),e&&Hm.existsSync(e)&&(u[i]?u[i]=e+mn.delimiter+u[i]:u[i]=e,n&&n(`NODE_PATH value is: ${u[i]}`)),u.ELECTRON_RUN_AS_NODE="1";try{let l=(0,Bm.fork)("",[],{cwd:r,env:u,execArgv:["-e",o]});if(l.pid===void 0){a(new Error(`Starting process to resolve node module  ${t} failed`));return}l.on("error",m=>{a(m)}),l.on("message",m=>{m.c==="r"&&(l.send({c:"e"}),m.s?s(m.r):a(new Error(`Failed to resolve module: ${t}`)))});let f={c:"rs",a:t};l.send(f)}catch(l){a(l)}})}mr.resolve=el;function Wm(t){let e="npm",r=Object.create(null);Object.keys(process.env).forEach(o=>r[o]=process.env[o]),r.NO_UPDATE_NOTIFIER="true";let n={encoding:"utf8",env:r};Km()&&(e="npm.cmd",n.shell=!0);let i=()=>{};try{process.on("SIGPIPE",i);let o=(0,Bm.spawnSync)(e,["config","get","prefix"],n).stdout;if(!o){t&&t("'npm config get prefix' didn't return a value.");return}let s=o.trim();return t&&t(`'npm config get prefix' value is: ${s}`),s.length>0?Km()?mn.join(s,"node_modules"):mn.join(s,"lib","node_modules"):void 0}catch{return}finally{process.removeListener("SIGPIPE",i)}}mr.resolveGlobalNodePath=Wm;function n$(t){let e="yarn",r={encoding:"utf8"};Km()&&(e="yarn.cmd",r.shell=!0);let n=()=>{};try{process.on("SIGPIPE",n);let i=(0,Bm.spawnSync)(e,["global","dir","--json"],r),o=i.stdout;if(!o){t&&(t("'yarn global dir' didn't return a value."),i.stderr&&t(i.stderr));return}let s=o.trim().split(/\r?\n/);for(let a of s)try{let c=JSON.parse(a);if(c.type==="log")return mn.join(c.data,"node_modules")}catch{}return}catch{return}finally{process.removeListener("SIGPIPE",n)}}mr.resolveGlobalYarnPath=n$;var zT;(function(t){let e;function r(){return e!==void 0||(process.platform==="win32"?e=!1:e=!Hm.existsSync(__filename.toUpperCase())||!Hm.existsSync(__filename.toLowerCase())),e}t.isCaseSensitive=r;function n(i,o){return r()?mn.normalize(o).indexOf(mn.normalize(i))===0:mn.normalize(o).toLowerCase().indexOf(mn.normalize(i).toLowerCase())===0}t.isParent=n})(zT=mr.FileSystem||(mr.FileSystem={}));function i$(t,e,r,n){return r?(mn.isAbsolute(r)||(r=mn.join(t,r)),el(e,r,r,n).then(i=>zT.isParent(r,i)?i:Promise.reject(new Error(`Failed to load ${e} from node path location.`))).then(void 0,i=>el(e,Wm(n),t,n))):el(e,Wm(n),t,n)}mr.resolveModulePath=i$});var zm=j((HH,XT)=>{"use strict";XT.exports=kt()});var tl=j(zt=>{"use strict";var o$=zt&&zt.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),YT=zt&&zt.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&o$(e,t,r)};Object.defineProperty(zt,"__esModule",{value:!0});zt.ProposedFeatures=zt.NotebookDocuments=zt.TextDocuments=zt.SemanticTokensBuilder=void 0;var s$=Nm();Object.defineProperty(zt,"SemanticTokensBuilder",{enumerable:!0,get:function(){return s$.SemanticTokensBuilder}});YT(kt(),zt);var a$=Dm();Object.defineProperty(zt,"TextDocuments",{enumerable:!0,get:function(){return a$.TextDocuments}});var c$=Lm();Object.defineProperty(zt,"NotebookDocuments",{enumerable:!0,get:function(){return c$.NotebookDocuments}});YT(Gm(),zt);var u$;(function(t){t.all={__brand:"features"}})(u$=zt.ProposedFeatures||(zt.ProposedFeatures={}))});var Ne=j(Ir=>{"use strict";var l$=Ir&&Ir.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),QT=Ir&&Ir.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&l$(e,t,r)};Object.defineProperty(Ir,"__esModule",{value:!0});Ir.createConnection=Ir.Files=void 0;var Vm=su(),f$=Gm(),Za=VT(),vo=zm();QT(zm(),Ir);QT(tl(),Ir);var d$;(function(t){t.uriToFilePath=Za.uriToFilePath,t.resolveGlobalNodePath=Za.resolveGlobalNodePath,t.resolveGlobalYarnPath=Za.resolveGlobalYarnPath,t.resolve=Za.resolve,t.resolveModulePath=Za.resolveModulePath})(d$=Ir.Files||(Ir.Files={}));var JT;function rl(){if(JT!==void 0)try{JT.end()}catch{}}var os=!1,ZT;function p$(){let t="--clientProcessId";function e(r){try{let n=parseInt(r);isNaN(n)||(ZT=setInterval(()=>{try{process.kill(n,0)}catch{rl(),process.exit(os?0:1)}},3e3))}catch{}}for(let r=2;r<process.argv.length;r++){let n=process.argv[r];if(n===t&&r+1<process.argv.length){e(process.argv[r+1]);return}else{let i=n.split("=");i[0]===t&&e(i[1])}}}p$();var m$={initialize:t=>{let e=t.processId;Vm.number(e)&&ZT===void 0&&setInterval(()=>{try{process.kill(e,0)}catch{process.exit(os?0:1)}},3e3)},get shutdownReceived(){return os},set shutdownReceived(t){os=t},exit:t=>{rl(),process.exit(t)}};function h$(t,e,r,n){let i,o,s,a;return t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),vo.ConnectionStrategy.is(t)||vo.ConnectionOptions.is(t)?a=t:(o=t,s=e,a=r),g$(o,s,a,i)}Ir.createConnection=h$;function g$(t,e,r,n){if(!t&&!e&&process.argv.length>2){let a,c,u=process.argv.slice(2);for(let l=0;l<u.length;l++){let f=u[l];if(f==="--node-ipc"){t=new vo.IPCMessageReader(process),e=new vo.IPCMessageWriter(process);break}else if(f==="--stdio"){t=process.stdin,e=process.stdout;break}else if(f==="--socket"){a=parseInt(u[l+1]);break}else if(f==="--pipe"){c=u[l+1];break}else{var i=f.split("=");if(i[0]==="--socket"){a=parseInt(i[1]);break}else if(i[0]==="--pipe"){c=i[1];break}}}if(a){let l=(0,vo.createServerSocketTransport)(a);t=l[0],e=l[1]}else if(c){let l=(0,vo.createServerPipeTransport)(c);t=l[0],e=l[1]}}var o="Use arguments of createConnection or set command line parameters: '--node-ipc', '--stdio' or '--socket={number}'";if(!t)throw new Error("Connection input stream is not set. "+o);if(!e)throw new Error("Connection output stream is not set. "+o);if(Vm.func(t.read)&&Vm.func(t.on)){let a=t;a.on("end",()=>{rl(),process.exit(os?0:1)}),a.on("close",()=>{rl(),process.exit(os?0:1)})}let s=a=>(0,vo.createProtocolConnection)(t,e,a,r);return(0,f$.createConnection)(s,m$,n)}});var mA=j(zg=>{"use strict";Object.defineProperty(zg,"__esModule",{value:!0});var dA=An(),Aa=au(),xj=lo(),bj=fp(),Zd=class t extends bj.AbstractMessageBuffer{constructor(e="utf-8"){super(e),this.asciiDecoder=new TextDecoder("ascii")}emptyBuffer(){return t.emptyBuffer}fromString(e,r){return new TextEncoder().encode(e)}toString(e,r){return r==="ascii"?this.asciiDecoder.decode(e):new TextDecoder(r).decode(e)}asNative(e,r){return r===void 0?e:e.slice(0,r)}allocNative(e){return new Uint8Array(e)}};Zd.emptyBuffer=new Uint8Array(0);var Kg=class{constructor(e){this.socket=e,this._onData=new xj.Emitter,this._messageListener=r=>{r.data.arrayBuffer().then(i=>{this._onData.fire(new Uint8Array(i))},()=>{(0,dA.default)().console.error("Converting blob to array buffer failed.")})},this.socket.addEventListener("message",this._messageListener)}onClose(e){return this.socket.addEventListener("close",e),Aa.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Aa.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Aa.Disposable.create(()=>this.socket.removeEventListener("end",e))}onData(e){return this._onData.event(e)}},Wg=class{constructor(e){this.socket=e}onClose(e){return this.socket.addEventListener("close",e),Aa.Disposable.create(()=>this.socket.removeEventListener("close",e))}onError(e){return this.socket.addEventListener("error",e),Aa.Disposable.create(()=>this.socket.removeEventListener("error",e))}onEnd(e){return this.socket.addEventListener("end",e),Aa.Disposable.create(()=>this.socket.removeEventListener("end",e))}write(e,r){if(typeof e=="string"){if(r!==void 0&&r!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`);this.socket.send(e)}else this.socket.send(e);return Promise.resolve()}end(){this.socket.close()}},Sj=new TextEncoder,pA=Object.freeze({messageBuffer:Object.freeze({create:t=>new Zd(t)}),applicationJson:Object.freeze({encoder:Object.freeze({name:"application/json",encode:(t,e)=>{if(e.charset!=="utf-8")throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`);return Promise.resolve(Sj.encode(JSON.stringify(t,void 0,0)))}}),decoder:Object.freeze({name:"application/json",decode:(t,e)=>{if(!(t instanceof Uint8Array))throw new Error("In a Browser environments only Uint8Arrays are supported.");return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t)))}})}),stream:Object.freeze({asReadableStream:t=>new Kg(t),asWritableStream:t=>new Wg(t)}),console,timer:Object.freeze({setTimeout(t,e,...r){let n=setTimeout(t,e,...r);return{dispose:()=>clearTimeout(n)}},setImmediate(t,...e){let r=setTimeout(t,0,...e);return{dispose:()=>clearTimeout(r)}},setInterval(t,e,...r){let n=setInterval(t,e,...r);return{dispose:()=>clearInterval(n)}}})});function Bg(){return pA}(function(t){function e(){dA.default.install(pA)}t.install=e})(Bg||(Bg={}));zg.default=Bg});var hA=j(Gr=>{"use strict";var wj=Gr&&Gr.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),Cj=Gr&&Gr.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&wj(e,t,r)};Object.defineProperty(Gr,"__esModule",{value:!0});Gr.createMessageConnection=Gr.BrowserMessageWriter=Gr.BrowserMessageReader=void 0;var Aj=mA();Aj.default.install();var ka=La();Cj(La(),Gr);var Vg=class extends ka.AbstractMessageReader{constructor(e){super(),this._onData=new ka.Emitter,this._messageListener=r=>{this._onData.fire(r.data)},e.addEventListener("error",r=>this.fireError(r)),e.onmessage=this._messageListener}listen(e){return this._onData.event(e)}};Gr.BrowserMessageReader=Vg;var Xg=class extends ka.AbstractMessageWriter{constructor(e){super(),this.context=e,this.errorCount=0,e.addEventListener("error",r=>this.fireError(r))}write(e){try{return this.context.postMessage(e),Promise.resolve()}catch(r){return this.handleError(r,e),Promise.reject(r)}}handleError(e,r){this.errorCount++,this.fireError(e,r,this.errorCount)}end(){}};Gr.BrowserMessageWriter=Xg;function kj(t,e,r,n){return r===void 0&&(r=ka.NullLogger),ka.ConnectionStrategy.is(n)&&(n={connectionStrategy:n}),(0,ka.createMessageConnection)(t,e,r,n)}Gr.createMessageConnection=kj});var Yg=j((hue,gA)=>{"use strict";gA.exports=hA()});var TA=j(zn=>{"use strict";var Ej=zn&&zn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),yA=zn&&zn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&Ej(e,t,r)};Object.defineProperty(zn,"__esModule",{value:!0});zn.createProtocolConnection=void 0;var _j=Yg();yA(Yg(),zn);yA(wm(),zn);function Nj(t,e,r,n){return(0,_j.createMessageConnection)(t,e,r,n)}zn.createProtocolConnection=Nj});var RA=j((yue,vA)=>{"use strict";vA.exports=TA()});var SA=j(Vn=>{"use strict";var $j=Vn&&Vn.__createBinding||(Object.create?function(t,e,r,n){n===void 0&&(n=r);var i=Object.getOwnPropertyDescriptor(e,r);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[r]}}),Object.defineProperty(t,n,i)}:function(t,e,r,n){n===void 0&&(n=r),t[n]=e[r]}),bA=Vn&&Vn.__exportStar||function(t,e){for(var r in t)r!=="default"&&!Object.prototype.hasOwnProperty.call(e,r)&&$j(e,t,r)};Object.defineProperty(Vn,"__esModule",{value:!0});Vn.createConnection=void 0;var ep=tl();bA(RA(),Vn);bA(tl(),Vn);var xA=!1,Ij={initialize:t=>{},get shutdownReceived(){return xA},set shutdownReceived(t){xA=t},exit:t=>{}};function Pj(t,e,r,n){let i,o,s,a;t!==void 0&&t.__brand==="features"&&(i=t,t=e,e=r,r=n),ep.ConnectionStrategy.is(t)||ep.ConnectionOptions.is(t)?a=t:(o=t,s=e,a=r);let c=u=>(0,ep.createProtocolConnection)(o,s,u,a);return(0,ep.createConnection)(c,Ij,i)}Vn.createConnection=Pj});var CA=j((vue,wA)=>{"use strict";wA.exports=SA()});var fA=de(Ne(),1);var nl=class t{constructor(e,r,n,i){this._uri=e,this._languageId=r,this._version=n,this._content=i,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let r=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(r,n)}return this._content}update(e,r){for(let n of e)if(t.isIncremental(n)){let i=tv(n.range),o=this.offsetAt(i.start),s=this.offsetAt(i.end);this._content=this._content.substring(0,o)+n.text+this._content.substring(s,this._content.length);let a=Math.max(i.start.line,0),c=Math.max(i.end.line,0),u=this._lineOffsets,l=ev(n.text,!1,o);if(c-a===l.length)for(let m=0,T=l.length;m<T;m++)u[m+a+1]=l[m];else l.length<1e4?u.splice(a+1,c-a,...l):this._lineOffsets=u=u.slice(0,a+1).concat(l,u.slice(c+1));let f=n.text.length-(s-o);if(f!==0)for(let m=a+1+l.length,T=u.length;m<T;m++)u[m]=u[m]+f}else if(t.isFull(n))this._content=n.text,this._lineOffsets=void 0;else throw new Error("Unknown change event received");this._version=r}getLineOffsets(){return this._lineOffsets===void 0&&(this._lineOffsets=ev(this._content,!0)),this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let r=this.getLineOffsets(),n=0,i=r.length;if(i===0)return{line:0,character:e};for(;n<i;){let s=Math.floor((n+i)/2);r[s]>e?i=s:n=s+1}let o=n-1;return{line:o,character:e-r[o]}}offsetAt(e){let r=this.getLineOffsets();if(e.line>=r.length)return this._content.length;if(e.line<0)return 0;let n=r[e.line],i=e.line+1<r.length?r[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,i),n)}get lineCount(){return this.getLineOffsets().length}static isIncremental(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range!==void 0&&(r.rangeLength===void 0||typeof r.rangeLength=="number")}static isFull(e){let r=e;return r!=null&&typeof r.text=="string"&&r.range===void 0&&r.rangeLength===void 0}},ss;(function(t){function e(i,o,s,a){return new nl(i,o,s,a)}t.create=e;function r(i,o,s){if(i instanceof nl)return i.update(o,s),i;throw new Error("TextDocument.update: document must be created by TextDocument.create")}t.update=r;function n(i,o){let s=i.getText(),a=Xm(o.map(y$),(l,f)=>{let m=l.range.start.line-f.range.start.line;return m===0?l.range.start.character-f.range.start.character:m}),c=0,u=[];for(let l of a){let f=i.offsetAt(l.range.start);if(f<c)throw new Error("Overlapping edit");f>c&&u.push(s.substring(c,f)),l.newText.length&&u.push(l.newText),c=i.offsetAt(l.range.end)}return u.push(s.substr(c)),u.join("")}t.applyEdits=n})(ss||(ss={}));function Xm(t,e){if(t.length<=1)return t;let r=t.length/2|0,n=t.slice(0,r),i=t.slice(r);Xm(n,e),Xm(i,e);let o=0,s=0,a=0;for(;o<n.length&&s<i.length;)e(n[o],i[s])<=0?t[a++]=n[o++]:t[a++]=i[s++];for(;o<n.length;)t[a++]=n[o++];for(;s<i.length;)t[a++]=i[s++];return t}function ev(t,e,r=0){let n=e?[r]:[];for(let i=0;i<t.length;i++){let o=t.charCodeAt(i);(o===13||o===10)&&(o===13&&i+1<t.length&&t.charCodeAt(i+1)===10&&i++,n.push(r+i+1))}return n}function tv(t){let e=t.start,r=t.end;return e.line>r.line||e.line===r.line&&e.character>r.character?{start:r,end:e}:t}function y$(t){let e=tv(t.range);return e!==t.range?{newText:t.newText,range:e}:t}function Et(t){return typeof t=="object"&&t!==null&&typeof t.$type=="string"}function ni(t){return typeof t=="object"&&t!==null&&typeof t.$refText=="string"}function rv(t){return typeof t=="object"&&t!==null&&typeof t.name=="string"&&typeof t.type=="string"&&typeof t.path=="string"}function as(t){return typeof t=="object"&&t!==null&&Et(t.container)&&ni(t.reference)&&typeof t.message=="string"}var Ro=class{constructor(){this.subtypes={},this.allSubtypes={}}isInstance(e,r){return Et(e)&&this.isSubtype(e.$type,r)}isSubtype(e,r){if(e===r)return!0;let n=this.subtypes[e];n||(n=this.subtypes[e]={});let i=n[r];if(i!==void 0)return i;{let o=this.computeIsSubtype(e,r);return n[r]=o,o}}getAllSubTypes(e){let r=this.allSubtypes[e];if(r)return r;{let n=this.getAllTypes(),i=[];for(let o of n)this.isSubtype(o,e)&&i.push(o);return this.allSubtypes[e]=i,i}}};function $n(t){return typeof t=="object"&&t!==null&&Array.isArray(t.content)}function xo(t){return typeof t=="object"&&t!==null&&typeof t.tokenType=="object"}function nv(t){return $n(t)&&typeof t.fullText=="string"}var Pr=class t{constructor(e,r){this.startFn=e,this.nextFn=r}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),[Symbol.iterator]:()=>e};return e}[Symbol.iterator](){return this.iterator()}isEmpty(){return!!this.iterator().next().done}count(){let e=this.iterator(),r=0,n=e.next();for(;!n.done;)r++,n=e.next();return r}toArray(){let e=[],r=this.iterator(),n;do n=r.next(),n.value!==void 0&&e.push(n.value);while(!n.done);return e}toSet(){return new Set(this)}toMap(e,r){let n=this.map(i=>[e?e(i):i,r?r(i):i]);return new Map(n)}toString(){return this.join()}concat(e){let r=e[Symbol.iterator]();return new t(()=>({first:this.startFn(),firstDone:!1}),n=>{let i;if(!n.firstDone){do if(i=this.nextFn(n.first),!i.done)return i;while(!i.done);n.firstDone=!0}do if(i=r.next(),!i.done)return i;while(!i.done);return hr})}join(e=","){let r=this.iterator(),n="",i,o=!1;do i=r.next(),i.done||(o&&(n+=e),n+=T$(i.value)),o=!0;while(!i.done);return n}indexOf(e,r=0){let n=this.iterator(),i=0,o=n.next();for(;!o.done;){if(i>=r&&o.value===e)return i;o=n.next(),i++}return-1}every(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(!e(n.value))return!1;n=r.next()}return!0}some(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return!0;n=r.next()}return!1}forEach(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;)e(i.value,n),i=r.next(),n++}map(e){return new t(this.startFn,r=>{let{done:n,value:i}=this.nextFn(r);return n?hr:{done:!1,value:e(i)}})}filter(e){return new t(this.startFn,r=>{let n;do if(n=this.nextFn(r),!n.done&&e(n.value))return n;while(!n.done);return hr})}nonNullable(){return this.filter(e=>e!=null)}reduce(e,r){let n=this.iterator(),i=r,o=n.next();for(;!o.done;)i===void 0?i=o.value:i=e(i,o.value),o=n.next();return i}reduceRight(e,r){return this.recursiveReduce(this.iterator(),e,r)}recursiveReduce(e,r,n){let i=e.next();if(i.done)return n;let o=this.recursiveReduce(e,r,n);return o===void 0?i.value:r(o,i.value)}find(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(e(n.value))return n.value;n=r.next()}}findIndex(e){let r=this.iterator(),n=0,i=r.next();for(;!i.done;){if(e(i.value))return n;i=r.next(),n++}return-1}includes(e){let r=this.iterator(),n=r.next();for(;!n.done;){if(n.value===e)return!0;n=r.next()}return!1}flatMap(e){return new t(()=>({this:this.startFn()}),r=>{do{if(r.iterator){let o=r.iterator.next();if(o.done)r.iterator=void 0;else return o}let{done:n,value:i}=this.nextFn(r.this);if(!n){let o=e(i);if(il(o))r.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}}while(r.iterator);return hr})}flat(e){if(e===void 0&&(e=1),e<=0)return this;let r=e>1?this.flat(e-1):this;return new t(()=>({this:r.startFn()}),n=>{do{if(n.iterator){let s=n.iterator.next();if(s.done)n.iterator=void 0;else return s}let{done:i,value:o}=r.nextFn(n.this);if(!i)if(il(o))n.iterator=o[Symbol.iterator]();else return{done:!1,value:o}}while(n.iterator);return hr})}head(){let r=this.iterator().next();if(!r.done)return r.value}tail(e=1){return new t(()=>{let r=this.startFn();for(let n=0;n<e;n++)if(this.nextFn(r).done)return r;return r},this.nextFn)}limit(e){return new t(()=>({size:0,state:this.startFn()}),r=>(r.size++,r.size>e?hr:this.nextFn(r.state)))}distinct(e){let r=new Set;return this.filter(n=>{let i=e?e(n):n;return r.has(i)?!1:(r.add(i),!0)})}exclude(e,r){let n=new Set;for(let i of e){let o=r?r(i):i;n.add(o)}return this.filter(i=>{let o=r?r(i):i;return!n.has(o)})}};function T$(t){return typeof t=="string"?t:typeof t>"u"?"undefined":typeof t.toString=="function"?t.toString():Object.prototype.toString.call(t)}function il(t){return!!t&&typeof t[Symbol.iterator]=="function"}var cs=new Pr(()=>{},()=>hr),hr=Object.freeze({done:!0,value:void 0});function ie(...t){if(t.length===1){let e=t[0];if(e instanceof Pr)return e;if(il(e))return new Pr(()=>e[Symbol.iterator](),r=>r.next());if(typeof e.length=="number")return new Pr(()=>({index:0}),r=>r.index<e.length?{done:!1,value:e[r.index++]}:hr)}return t.length>1?new Pr(()=>({collIndex:0,arrIndex:0}),e=>{do{if(e.iterator){let r=e.iterator.next();if(!r.done)return r;e.iterator=void 0}if(e.array){if(e.arrIndex<e.array.length)return{done:!1,value:e.array[e.arrIndex++]};e.array=void 0,e.arrIndex=0}if(e.collIndex<t.length){let r=t[e.collIndex++];il(r)?e.iterator=r[Symbol.iterator]():r&&typeof r.length=="number"&&(e.array=r)}}while(e.iterator||e.array||e.collIndex<t.length);return hr}):cs}var Vr=class extends Pr{constructor(e,r,n){super(()=>({iterators:n?.includeRoot?[[e][Symbol.iterator]()]:[r(e)[Symbol.iterator]()],pruned:!1}),i=>{for(i.pruned&&(i.iterators.pop(),i.pruned=!1);i.iterators.length>0;){let s=i.iterators[i.iterators.length-1].next();if(s.done)i.iterators.pop();else return i.iterators.push(r(s.value)[Symbol.iterator]()),s}return hr})}iterator(){let e={state:this.startFn(),next:()=>this.nextFn(e.state),prune:()=>{e.state.pruned=!0},[Symbol.iterator]:()=>e};return e}},ec;(function(t){function e(o){return o.reduce((s,a)=>s+a,0)}t.sum=e;function r(o){return o.reduce((s,a)=>s*a,0)}t.product=r;function n(o){return o.reduce((s,a)=>Math.min(s,a))}t.min=n;function i(o){return o.reduce((s,a)=>Math.max(s,a))}t.max=i})(ec=ec||(ec={}));function Ym(t){return new Vr(t,e=>$n(e)?e.content:[],{includeRoot:!0})}function sv(t){return Ym(t).filter(xo)}function av(t,e){for(;t.container;)if(t=t.container,t===e)return!0;return!1}function tc(t){return{start:{character:t.startColumn-1,line:t.startLine-1},end:{character:t.endColumn,line:t.endLine-1}}}function ir(t){if(!t)return;let{offset:e,end:r,range:n}=t;return{range:n,offset:e,end:r,length:r-e}}var ii;(function(t){t[t.Before=0]="Before",t[t.After=1]="After",t[t.OverlapFront=2]="OverlapFront",t[t.OverlapBack=3]="OverlapBack",t[t.Inside=4]="Inside"})(ii=ii||(ii={}));function v$(t,e){if(t.end.line<e.start.line||t.end.line===e.start.line&&t.end.character<t.start.character)return ii.Before;if(t.start.line>e.end.line||t.start.line===e.end.line&&t.start.character>e.end.character)return ii.After;let r=t.start.line>e.start.line||t.start.line===e.start.line&&t.start.character>=e.start.character,n=t.end.line<e.end.line||t.end.line===e.end.line&&t.end.character<=e.end.character;return r&&n?ii.Inside:r?ii.OverlapBack:ii.OverlapFront}function ol(t,e){return v$(t,e)>ii.After}var Jm=/^[\w\p{L}]$/u;function Pt(t,e,r=Jm){if(t){if(e>0){let n=e-t.offset,i=t.text.charAt(n);r.test(i)||e--}return Sr(t,e)}}function cv(t,e){if(t){let r=R$(t,!0);if(r&&iv(r,e))return r;if(nv(t)){let n=t.content.findIndex(i=>!i.hidden);for(let i=n-1;i>=0;i--){let o=t.content[i];if(iv(o,e))return o}}}}function iv(t,e){return xo(t)&&e.includes(t.tokenType.name)}function Sr(t,e){if(xo(t))return t;if($n(t)){let r=0,n=t.content.length-1;for(;r<n;){let i=Math.floor((r+n)/2),o=t.content[i];if(o.offset>e)n=i-1;else if(o.end<=e)r=i+1;else return Sr(o,e)}if(r===n)return Sr(t.content[r],e)}}function R$(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t);for(;n>0;){n--;let i=r.content[n];if(e||!i.hidden)return i}t=r}}function uv(t,e=!0){for(;t.container;){let r=t.container,n=r.content.indexOf(t),i=r.content.length-1;for(;n<i;){n++;let o=r.content[n];if(e||!o.hidden)return o}t=r}}function lv(t,e){let r=x$(t,e);return r?r.parent.content.slice(r.a+1,r.b):[]}function x$(t,e){let r=ov(t),n=ov(e),i;for(let o=0;o<r.length&&o<n.length;o++){let s=r[o],a=n[o];if(s.parent===a.parent)i={parent:s.parent,a:s.index,b:a.index};else break}return i}function ov(t){let e=[];for(;t.container;){let r=t.container,n=r.content.indexOf(t);e.push({parent:r,index:n}),t=r}return e.reverse()}function bo(t,e,r,n){let i=[t,e,r,n].reduce(mv,{});return pv(i)}var Qm=Symbol("isProxy");function sl(t){if(t&&t[Qm])for(let e of Object.values(t))sl(e);return t}function pv(t,e){let r=new Proxy({},{deleteProperty:()=>!1,get:(n,i)=>dv(n,i,t,e||r),getOwnPropertyDescriptor:(n,i)=>(dv(n,i,t,e||r),Object.getOwnPropertyDescriptor(n,i)),has:(n,i)=>i in t,ownKeys:()=>[...Reflect.ownKeys(t),Qm]});return r[Qm]=!0,r}var fv=Symbol();function dv(t,e,r,n){if(e in t){if(t[e]instanceof Error)throw new Error("Construction failure. Please make sure that your dependencies are constructable.",{cause:t[e]});if(t[e]===fv)throw new Error('Cycle detected. Please make "'+String(e)+'" lazy. See https://langium.org/docs/configuration-services/#resolving-cyclic-dependencies');return t[e]}else if(e in r){let i=r[e];t[e]=fv;try{t[e]=typeof i=="function"?i(n):pv(i,n)}catch(o){throw t[e]=o instanceof Error?o:void 0,o}return t[e]}else return}function mv(t,e){if(e){for(let[r,n]of Object.entries(e))if(n!==void 0){let i=t[r];i!==null&&n!==null&&typeof i=="object"&&typeof n=="object"?t[r]=mv(i,n):t[r]=n}}return t}var Me=class{constructor(e){if(this.map=new Map,e)for(let[r,n]of e)this.add(r,n)}get size(){return ec.sum(ie(this.map.values()).map(e=>e.length))}clear(){this.map.clear()}delete(e,r){if(r===void 0)return this.map.delete(e);{let n=this.map.get(e);if(n){let i=n.indexOf(r);if(i>=0)return n.length===1?this.map.delete(e):n.splice(i,1),!0}return!1}}get(e){var r;return(r=this.map.get(e))!==null&&r!==void 0?r:[]}has(e,r){if(r===void 0)return this.map.has(e);{let n=this.map.get(e);return n?n.indexOf(r)>=0:!1}}add(e,r){return this.map.has(e)?this.map.get(e).push(r):this.map.set(e,[r]),this}addAll(e,r){return this.map.has(e)?this.map.get(e).push(...r):this.map.set(e,Array.from(r)),this}forEach(e){this.map.forEach((r,n)=>r.forEach(i=>e(i,n,this)))}[Symbol.iterator](){return this.entries().iterator()}entries(){return ie(this.map.entries()).flatMap(([e,r])=>r.map(n=>[e,n]))}keys(){return ie(this.map.keys())}values(){return ie(this.map.values()).flat()}entriesGroupedByKey(){return ie(this.map.entries())}};var Zm="AbstractRule";var So="AbstractType";var b$="Condition";var S$="TypeDefinition";var eh="AbstractElement";function us(t){return ue.isInstance(t,eh)}var hv="ArrayType";function wo(t){return ue.isInstance(t,hv)}var gv="Conjunction";function yv(t){return ue.isInstance(t,gv)}var Tv="Disjunction";function vv(t){return ue.isInstance(t,Tv)}var Rv="Grammar";function ls(t){return ue.isInstance(t,Rv)}var w$="GrammarImport";function al(t){return ue.isInstance(t,w$)}var C$="InferredType";function fs(t){return ue.isInstance(t,C$)}var nc="Interface";function wr(t){return ue.isInstance(t,nc)}var xv="LiteralCondition";function bv(t){return ue.isInstance(t,xv)}var Sv="Negation";function wv(t){return ue.isInstance(t,Sv)}var Cv="Parameter";function Av(t){return ue.isInstance(t,Cv)}var kv="ParameterReference";function ds(t){return ue.isInstance(t,kv)}var Ev="ParserRule";function K(t){return ue.isInstance(t,Ev)}var _v="ReferenceType";function Co(t){return ue.isInstance(t,_v)}var A$="ReturnType";function ps(t){return ue.isInstance(t,A$)}var Nv="SimpleType";function or(t){return ue.isInstance(t,Nv)}var th="TerminalRule";function we(t){return ue.isInstance(t,th)}var ic="Type";function Mt(t){return ue.isInstance(t,ic)}var k$="TypeAttribute";function cl(t){return ue.isInstance(t,k$)}var $v="UnionType";function Xr(t){return ue.isInstance(t,$v)}var Iv="Action";function $e(t){return ue.isInstance(t,Iv)}var Pv="Alternatives";function Dr(t){return ue.isInstance(t,Pv)}var Dv="Assignment";function xe(t){return ue.isInstance(t,Dv)}var Ov="CharacterRange";function ul(t){return ue.isInstance(t,Ov)}var Lv="CrossReference";function Vt(t){return ue.isInstance(t,Lv)}var Mv="Group";function Ft(t){return ue.isInstance(t,Mv)}var Fv="Keyword";function pt(t){return ue.isInstance(t,Fv)}var Uv="NegatedToken";function qv(t){return ue.isInstance(t,Uv)}var jv="RegexToken";function Gv(t){return ue.isInstance(t,jv)}var Hv="RuleCall";function Ie(t){return ue.isInstance(t,Hv)}var Kv="TerminalAlternatives";function Wv(t){return ue.isInstance(t,Kv)}var Bv="TerminalGroup";function zv(t){return ue.isInstance(t,Bv)}var Vv="TerminalRuleCall";function ll(t){return ue.isInstance(t,Vv)}var Xv="UnorderedGroup";function Or(t){return ue.isInstance(t,Xv)}var Yv="UntilToken";function Jv(t){return ue.isInstance(t,Yv)}var Qv="Wildcard";function Zv(t){return ue.isInstance(t,Qv)}var rc=class extends Ro{getAllTypes(){return["AbstractElement","AbstractRule","AbstractType","Action","Alternatives","ArrayType","Assignment","CharacterRange","Condition","Conjunction","CrossReference","Disjunction","Grammar","GrammarImport","Group","InferredType","Interface","Keyword","LiteralCondition","NamedArgument","NegatedToken","Negation","Parameter","ParameterReference","ParserRule","ReferenceType","RegexToken","ReturnType","RuleCall","SimpleType","TerminalAlternatives","TerminalGroup","TerminalRule","TerminalRuleCall","Type","TypeAttribute","TypeDefinition","UnionType","UnorderedGroup","UntilToken","Wildcard"]}computeIsSubtype(e,r){switch(e){case Iv:return this.isSubtype(eh,r)||this.isSubtype(So,r);case Pv:case Dv:case Ov:case Lv:case Mv:case Fv:case Uv:case jv:case Hv:case Kv:case Bv:case Vv:case Xv:case Yv:case Qv:return this.isSubtype(eh,r);case hv:case _v:case Nv:case $v:return this.isSubtype(S$,r);case gv:case Tv:case xv:case Sv:case kv:return this.isSubtype(b$,r);case nc:case ic:return this.isSubtype(So,r);case Ev:return this.isSubtype(Zm,r)||this.isSubtype(So,r);case th:return this.isSubtype(Zm,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){case"Action:type":case"CrossReference:type":case"Interface:superTypes":case"ParserRule:returnType":case"SimpleType:typeRef":return So;case"Grammar:hiddenTokens":case"ParserRule:hiddenTokens":case"RuleCall:rule":return Zm;case"Grammar:usedGrammars":return Rv;case"NamedArgument:parameter":case"ParameterReference:parameter":return Cv;case"TerminalRuleCall:rule":return th;default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"Grammar":return{name:"Grammar",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"imports",type:"array"},{name:"interfaces",type:"array"},{name:"isDeclared",type:"boolean"},{name:"rules",type:"array"},{name:"types",type:"array"},{name:"usedGrammars",type:"array"}]};case"Interface":return{name:"Interface",mandatory:[{name:"attributes",type:"array"},{name:"superTypes",type:"array"}]};case"LiteralCondition":return{name:"LiteralCondition",mandatory:[{name:"true",type:"boolean"}]};case"NamedArgument":return{name:"NamedArgument",mandatory:[{name:"calledByName",type:"boolean"}]};case"ParserRule":return{name:"ParserRule",mandatory:[{name:"definesHiddenTokens",type:"boolean"},{name:"entry",type:"boolean"},{name:"fragment",type:"boolean"},{name:"hiddenTokens",type:"array"},{name:"parameters",type:"array"},{name:"wildcard",type:"boolean"}]};case"TerminalRule":return{name:"TerminalRule",mandatory:[{name:"fragment",type:"boolean"},{name:"hidden",type:"boolean"}]};case"TypeAttribute":return{name:"TypeAttribute",mandatory:[{name:"isOptional",type:"boolean"}]};case"UnionType":return{name:"UnionType",mandatory:[{name:"types",type:"array"}]};case"Alternatives":return{name:"Alternatives",mandatory:[{name:"elements",type:"array"}]};case"CrossReference":return{name:"CrossReference",mandatory:[{name:"deprecatedSyntax",type:"boolean"}]};case"Group":return{name:"Group",mandatory:[{name:"elements",type:"array"}]};case"RuleCall":return{name:"RuleCall",mandatory:[{name:"arguments",type:"array"}]};case"TerminalAlternatives":return{name:"TerminalAlternatives",mandatory:[{name:"elements",type:"array"}]};case"TerminalGroup":return{name:"TerminalGroup",mandatory:[{name:"elements",type:"array"}]};case"UnorderedGroup":return{name:"UnorderedGroup",mandatory:[{name:"elements",type:"array"}]};default:return{name:e,mandatory:[]}}}},ue=new rc;function eR(t){for(let[e,r]of Object.entries(t))e.startsWith("$")||(Array.isArray(r)?r.forEach((n,i)=>{Et(n)&&(n.$container=t,n.$containerProperty=e,n.$containerIndex=i)}):Et(r)&&(r.$container=t,r.$containerProperty=e))}function Pe(t,e){let r=t;for(;r;){if(e(r))return r;r=r.$container}}function ne(t){let r=fl(t).$document;if(!r)throw new Error("AST node has no document.");return r}function fl(t){for(;t.$container;)t=t.$container;return t}function Di(t,e){if(!t)throw new Error("Node must be an AstNode.");let r=e?.range;return new Pr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),n=>{for(;n.keyIndex<n.keys.length;){let i=n.keys[n.keyIndex];if(!i.startsWith("$")){let o=t[i];if(Et(o)){if(n.keyIndex++,rh(o,r))return{done:!1,value:o}}else if(Array.isArray(o)){for(;n.arrayIndex<o.length;){let s=n.arrayIndex++,a=o[s];if(Et(a)&&rh(a,r))return{done:!1,value:a}}n.arrayIndex=0}}n.keyIndex++}return hr})}function Ze(t,e){if(!t)throw new Error("Root node must be an AstNode.");return new Vr(t,r=>Di(r,e))}function si(t,e){if(t){if(e?.range&&!rh(t,e.range))return new Vr(t,()=>[])}else throw new Error("Root node must be an AstNode.");return new Vr(t,r=>Di(r,e),{includeRoot:!0})}function rh(t,e){var r;if(!e)return!0;let n=(r=t.$cstNode)===null||r===void 0?void 0:r.range;return n?ol(n,e):!1}function dl(t){return new Pr(()=>({keys:Object.keys(t),keyIndex:0,arrayIndex:0}),e=>{for(;e.keyIndex<e.keys.length;){let r=e.keys[e.keyIndex];if(!r.startsWith("$")){let n=t[r];if(ni(n))return e.keyIndex++,{done:!1,value:{reference:n,container:t,property:r}};if(Array.isArray(n)){for(;e.arrayIndex<n.length;){let i=e.arrayIndex++,o=n[i];if(ni(o))return{done:!1,value:{reference:o,container:t,property:r,index:i}}}e.arrayIndex=0}}e.keyIndex++}return hr})}function tR(t){var e,r;if(t){if("astNode"in t)return N$(t);if(Array.isArray(t))return t.reduce(rR,void 0);{let n=t,i=E$(n)?_$((r=(e=n?.root)===null||e===void 0?void 0:e.astNode)!==null&&r!==void 0?r:n?.astNode):void 0;return ms(n,i)}}else return}function E$(t){return typeof t<"u"&&"element"in t&&"text"in t}function _$(t){try{return ne(t).uri.toString()}catch{return}}function N$(t){var e,r;let{astNode:n,property:i,index:o}=t??{},s=(e=n?.$cstNode)!==null&&e!==void 0?e:n?.$textRegion;if(!(n===void 0||s===void 0)){if(i===void 0)return ms(s,nh(n));{let a=c=>o!==void 0&&o>-1&&Array.isArray(n[i])?o<c.length?c[o]:void 0:c.reduce(rR,void 0);if(!((r=s.assignments)===null||r===void 0)&&r[i]){let c=a(s.assignments[i]);return c&&ms(c,nh(n))}else if(n.$cstNode){let c=a(Oi(n.$cstNode,i));return c&&ms(c,nh(n))}else return}}}function nh(t){var e,r,n,i;return t.$cstNode?(r=(e=ne(t))===null||e===void 0?void 0:e.uri)===null||r===void 0?void 0:r.toString():t.$textRegion?t.$textRegion.documentURI||((i=(n=new Vr(t,o=>o.$container?[o.$container]:[]).find(o=>{var s;return(s=o.$textRegion)===null||s===void 0?void 0:s.documentURI}))===null||n===void 0?void 0:n.$textRegion)===null||i===void 0?void 0:i.documentURI):void 0}function ms(t,e){var r,n;let i={offset:t.offset,end:(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,length:(n=t.length)!==null&&n!==void 0?n:t.end-t.offset};return t.range&&(i.range=t.range),e??(e=t.fileURI),e&&(i.fileURI=e),i}function rR(t,e){var r,n;if(t){if(!e)return t&&ms(t)}else return e&&ms(e);let i=(r=t.end)!==null&&r!==void 0?r:t.offset+t.length,o=(n=e.end)!==null&&n!==void 0?n:e.offset+e.length,s=Math.min(t.offset,e.offset),a=Math.max(i,o),c=a-s,u={offset:s,end:a,length:c};if(t.range&&e.range&&(u.range={start:e.range.start.line<t.range.start.line||e.range.start.line===t.range.start.line&&e.range.start.character<t.range.start.character?e.range.start:t.range.start,end:e.range.end.line>t.range.end.line||e.range.end.line===t.range.end.line&&e.range.end.character>t.range.end.character?e.range.end:t.range.end}),t.fileURI||e.fileURI){let l=t.fileURI,f=e.fileURI,m=l&&f&&l!==f?`<unmergable text regions of ${l}, ${f}>`:l??f;u.fileURI=m}return u}var ih=class{constructor(e){this.defaultIndentation="    ",this.pendingIndent=!0,this.currentIndents=[],this.recentNonImmediateIndents=[],this.traceData=[],this.lines=[[]],typeof e=="string"?this.defaultIndentation=e:typeof e=="number"&&(this.defaultIndentation="".padStart(e))}get content(){return this.lines.map(e=>e.join("")).join("")}get currentLineNumber(){return this.lines.length-1}get currentLineContent(){return this.lines[this.currentLineNumber].join("")}get currentPosition(){return{offset:this.content.length,line:this.currentLineNumber,character:this.currentLineContent.length}}append(e,r){if(e.length>0){let n=r&&this.currentPosition;this.lines[this.currentLineNumber].push(e),n&&this.indentPendingTraceRegions(n)}}indentPendingTraceRegions(e){for(let r=this.traceData.length-1;r>=0;r--){let n=this.traceData[r];n.targetStart&&n.targetStart.offset===e.offset&&(n.targetStart=this.currentPosition)}}increaseIndent(e){this.currentIndents.push(e),e.indentImmediately||this.recentNonImmediateIndents.push(e)}decreaseIndent(){this.currentIndents.pop()}get relevantIndents(){return this.currentIndents.filter(e=>!this.recentNonImmediateIndents.includes(e))}resetCurrentLine(){this.lines[this.currentLineNumber]=[],this.pendingIndent=!0}addNewLine(){this.pendingIndent=!0,this.lines.push([]),this.recentNonImmediateIndents.length=0}pushTraceRegion(e){let r=$$(e,this.currentPosition,n=>{var i,o;return(o=(i=this.traceData[this.traceData.length-1])===null||i===void 0?void 0:i.children)===null||o===void 0?void 0:o.push(n)});return this.traceData.push(r),r}popTraceRegion(e){let r=this.traceData.pop();return this.assertTrue(r===e,"Trace region mismatch!"),r}getParentTraceSourceFileURI(){var e;for(let r=this.traceData.length-1;r>-1;r--){let n=(e=this.traceData[r].sourceRegion)===null||e===void 0?void 0:e.fileURI;if(n)return n}}assertTrue(e,r){if(!e)throw new Error(r)}};function $$(t,e,r){let n={sourceRegion:t,targetRegion:void 0,children:[],targetStart:e,complete:i=>{var o,s;return n.targetRegion={offset:n.targetStart.offset,end:i.offset,length:i.offset-n.targetStart.offset,range:{start:{line:n.targetStart.line,character:n.targetStart.character},end:{line:i.line,character:i.character}}},delete n.targetStart,((o=n.children)===null||o===void 0?void 0:o.length)===0&&delete n.children,!((s=n.targetRegion)===null||s===void 0)&&s.length&&r(n),delete n.complete,n}};return n}function nR(t,e){let r=new ih(e),n=r.pushTraceRegion(void 0);iR(t,r),r.popTraceRegion(n),n.complete&&n.complete(r.currentPosition);let i=n.children&&n.children.length===1?n.children[0]:void 0,o=i?.targetRegion,s=n.targetRegion;return o&&i.sourceRegion&&o.offset===s.offset&&o.length===s.length?{text:r.content,trace:i}:{text:r.content,trace:n}}function iR(t,e){typeof t=="string"?I$(t,e):t instanceof hs?P$(t,e):t instanceof Xt?aR(t,e):t instanceof Li&&D$(t,e)}function oR(t,e){return typeof t=="string"?t.length!==0:t instanceof Xt?t.contents.some(r=>oR(r,e)):t instanceof Li?!(t.ifNotEmpty&&e.currentLineContent.length===0):!1}function I$(t,e){t&&(e.pendingIndent&&sR(e,!1),e.append(t))}function sR(t,e){var r;let n="";for(let i of t.relevantIndents.filter(o=>o.indentEmptyLines||!e))n+=(r=i.indentation)!==null&&r!==void 0?r:t.defaultIndentation;t.append(n,!0),t.pendingIndent=!1}function aR(t,e){let r,n=tR(t.tracedSource);n&&(r=e.pushTraceRegion(n));for(let i of t.contents)iR(i,e);if(r){e.popTraceRegion(r);let i=e.getParentTraceSourceFileURI();i&&n?.fileURI===i&&delete n.fileURI,r.complete&&r.complete(e.currentPosition)}}function P$(t,e){var r;if(oR(t,e)){t.indentImmediately&&!e.pendingIndent&&e.append((r=t.indentation)!==null&&r!==void 0?r:e.defaultIndentation,!0);try{e.increaseIndent(t),aR(t,e)}finally{e.decreaseIndent()}}}function D$(t,e){t.ifNotEmpty&&!O$(e.currentLineContent)?e.resetCurrentLine():(e.pendingIndent&&sR(e,!0),e.append(t.lineDelimiter),e.addNewLine())}function O$(t){return t.trimStart()!==""}var mK=Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"),oc=/\r?\n/g,L$=/\S|$/;function cR(t){let e=t.filter(n=>n.length>0).map(n=>n.search(L$)),r=e.length===0?0:Math.min(...e);return Math.max(0,r)}function sh(t,...e){let r=M$(t),n=F$(t,e,r);return q$(n)}function fR(t,e,r){return(n,...i)=>ah(t,e,r)(sh(n,...i))}function M$(t){let e=t.join("_").split(oc),r=e.length>1&&e[0].trim().length===0,n=r&&e.length>1&&e[e.length-1].trim().length===0;if(e.length===1||e.length!==0&&e[0].trim().length!==0||e.length===2&&e[1].trim().length===0)return{indentation:0,omitFirstLine:r,omitLastLine:n,trimLastLine:e.length!==1&&e[e.length-1].trim().length===0};{let i=r?e.slice(1):e;i=n?i.slice(0,i.length-1):i,i=i.filter(s=>s.length!==0);let o=cR(i);return{indentation:o,omitFirstLine:r,omitLastLine:n&&(e[e.length-1].length<o||!e[e.length-1].startsWith(i[0].substring(0,o)))}}}function F$(t,e,{indentation:r,omitFirstLine:n,omitLastLine:i,trimLastLine:o}){let s=[];t.forEach((u,l)=>{s.push(...u.split(oc).map((f,m)=>m===0||f.length<r?f:f.substring(r)).reduce(l===0?(f,m,T)=>T===0?n?[]:[m]:T===1&&f.length===0?[m]:f.concat(pl,m):(f,m,T)=>T===0?[m]:f.concat(pl,m),[]).filter(f=>!(typeof f=="string"&&f.length===0)).concat(sc(e[l])?e[l]:e[l]!==void 0?{content:String(e[l])}:l<e.length?dR:[]))});let a=s.length,c=a!==0?s[a-1]:void 0;return(i||o)&&typeof c=="string"&&c.trim().length===0?n&&a!==1&&s[a-2]===pl?s.slice(0,a-2):s.slice(0,a-1):s}var pl={isNewLine:!0},dR={isUndefinedSegment:!0},lR=t=>t===pl,oh=t=>t===dR,U$=t=>t.content!==void 0;function q$(t){return t.reduce((r,n,i)=>oh(n)?r:lR(n)?{node:i!==0&&(oh(t[i-1])||sc(t[i-1]))||i>1&&typeof t[i-1]=="string"&&(oh(t[i-2])||sc(t[i-2]))?r.node.appendNewLineIfNotEmpty():r.node.appendNewLine()}:(()=>{var o;let s=(i===0||lR(t[i-1]))&&typeof n=="string"&&n.length!==0?"".padStart(n.length-n.trimStart().length):"",a=U$(n)?n.content:n,c;return{node:r.indented?r.node:s.length!==0?r.node.indent({indentation:s,indentImmediately:!1,indentedChildren:u=>c=u.append(a)}):r.node.append(a),indented:c??((o=r.indented)===null||o===void 0?void 0:o.append(a))}})(),{node:new Xt}).node}var uR=typeof process>"u"?`
`:process.platform==="win32"?`\r
`:`
`;function sc(t){return t instanceof Xt||t instanceof hs||t instanceof Li}function gs(t,e){return sc(t)?nR(t,e).text:String(t)}var Xt=class t{constructor(...e){this.contents=[],this.append(...e)}isEmpty(){return this.contents.length===0}trace(e,r,n){if(Et(e)){if(this.tracedSource={astNode:e,property:r,index:n},this.tracedSource.property===void 0&&this.tracedSource.index!==void 0&&this.tracedSource.index>-1)throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.")}else this.tracedSource=e;return this}append(...e){for(let r of e)typeof r=="function"?r(this):r&&this.contents.push(r);return this}appendIf(e,...r){return e?this.append(...r):this}appendNewLine(){return this.append(st)}appendNewLineIf(e){return e?this.append(st):this}appendNewLineIfNotEmpty(){return this.append(j$)}appendNewLineIfNotEmptyIf(e){return e?this.appendNewLineIfNotEmpty():this}appendTemplate(e,...r){return this.append(sh(e,...r))}appendTemplateIf(e){return e?(r,...n)=>this.appendTemplate(r,...n):()=>this}indent(e){let{indentedChildren:r,indentation:n,indentEmptyLines:i,indentImmediately:o}=Array.isArray(e)||typeof e=="function"?{indentedChildren:e}:typeof e=="object"?e:{},s=new hs(n,o,i);return this.contents.push(s),Array.isArray(r)?s.append(...r):r&&s.append(r),this}appendTraced(e,r,n){return i=>this.append(new t().trace(e,r,n).append(i))}appendTracedIf(e,r,n,i){return e?this.appendTraced(typeof r=="function"?r():r,n,i):()=>this}appendTracedTemplate(e,r,n){return(i,...o)=>this.append(fR(e,r,n)(i,...o))}appendTracedTemplateIf(e,r,n,i){return e?this.appendTracedTemplate(typeof r=="function"?r():r,n,i):()=>this}};function ah(t,e,r){return n=>n instanceof Xt&&n.tracedSource===void 0?n.trace(t,e,r):new Xt().trace(t,e,r).append(n)}var hs=class extends Xt{constructor(e,r=!0,n=!1){super(),this.indentImmediately=!0,this.indentEmptyLines=!1,typeof e=="string"?this.indentation=e:typeof e=="number"&&(this.indentation="".padStart(e)),this.indentImmediately=r,this.indentEmptyLines=n}},Li=class{constructor(e,r=!1){this.ifNotEmpty=!1,this.lineDelimiter=e??uR,this.ifNotEmpty=r}},st=new Li,j$=new Li(void 0,!0);function ai(t){return"referenceType"in t}function ci(t){return"elementType"in t}function Dt(t){return"types"in t}function lh(t){if(Dt(t)){let e=[];for(let r of t.types)e.push(...lh(r));return e}else return[t]}function Lr(t){return"value"in t}function Mr(t){return"primitive"in t}function In(t){return"string"in t}function hn(t){return t&&"type"in t}function yn(t){return t&&"properties"in t}var hl=class{constructor(e,r){var n;this.superTypes=new Set,this.subTypes=new Set,this.typeNames=new Set,this.name=e,this.declared=(n=r?.declared)!==null&&n!==void 0?n:!1,this.dataType=r?.dataType}toAstTypesString(e){let r=new Xt;return r.append(`export type ${this.name} = ${gn(this.type,"AstType")};`,st),e&&(r.append(st),hR(r,this.name)),this.dataType&&G$(r,this),gs(r)}toDeclaredTypesString(e){let r=new Xt;return r.append(`type ${fh(this.name,e)} = ${gn(this.type,"DeclaredType")};`,st),gs(r)}},ys=class t{get superProperties(){return this.getSuperProperties(new Set)}getSuperProperties(e){if(e.has(this.name))return[];e.add(this.name);let r=new Map;for(let n of this.properties)r.set(n.name,n);for(let n of this.interfaceSuperTypes){let i=n.getSuperProperties(e);for(let o of i)r.has(o.name)||r.set(o.name,o)}return Array.from(r.values())}get allProperties(){let e=new Map(this.superProperties.map(n=>[n.name,n]));for(let n of this.subTypes)this.getSubTypeProperties(n,e,new Set);return Array.from(e.values())}getSubTypeProperties(e,r,n){if(n.has(this.name))return;n.add(this.name);let i=yn(e)?e.properties:[];for(let o of i)r.has(o.name)||r.set(o.name,o);for(let o of e.subTypes)this.getSubTypeProperties(o,r,n)}get interfaceSuperTypes(){return Array.from(this.superTypes).filter(e=>e instanceof t)}constructor(e,r,n){this.superTypes=new Set,this.subTypes=new Set,this.containerTypes=new Set,this.typeNames=new Set,this.declared=!1,this.abstract=!1,this.properties=[],this.name=e,this.declared=r,this.abstract=n}toAstTypesString(e){let r=new Xt,n=this.interfaceSuperTypes.map(o=>o.name),i=n.length>0?Ao([...n]):["AstNode"];return r.append(`export interface ${this.name} extends ${i.join(", ")} {`,st),r.indent(o=>{this.containerTypes.size>0&&o.append(`readonly $container: ${Ao([...this.containerTypes].map(s=>s.name)).join(" | ")};`,st),this.typeNames.size>0&&o.append(`readonly $type: ${Ao([...this.typeNames]).map(s=>`'${s}'`).join(" | ")};`,st),pR(o,this.properties,"AstType")}),r.append("}",st),e&&(r.append(st),hR(r,this.name)),gs(r)}toDeclaredTypesString(e){let r=new Xt,n=fh(this.name,e),i=Ao(this.interfaceSuperTypes.map(o=>o.name)).join(", ");return r.append(`interface ${n}${i.length>0?` extends ${i}`:""} {`,st),r.indent(o=>pR(o,this.properties,"DeclaredType",e)),r.append("}",st),gs(r)}},gl=class extends Error{constructor(e,r){super(e),this.name="TypeResolutionError",this.target=r}};function cc(t,e){return Mi(t,e,new Map)}function Mi(t,e,r){let n=`${ac(t)}\xBB${ac(e)}`,i=r.get(n);return i!==void 0||(r.set(n,!1),i=!1,Dt(t)?i=t.types.every(o=>Mi(o,e,r)):Dt(e)?i=e.types.some(o=>Mi(t,o,r)):Lr(e)&&hn(e.value)?Lr(t)&&hn(t.value)&&e.value.name===t.value.name?i=!0:i=Mi(t,e.value.type,r):ai(t)?i=ai(e)&&Mi(t.referenceType,e.referenceType,r):ci(t)?i=ci(e)&&Mi(t.elementType,e.elementType,r):Lr(t)?hn(t.value)?i=Mi(t.value.type,e,r):Lr(e)?hn(e.value)?i=Mi(t,e.value.type,r):i=mR(t.value,e.value,new Set):i=!1:Mr(t)?i=Mr(e)&&t.primitive===e.primitive:In(t)&&(i=Mr(e)&&e.primitive==="string"||In(e)&&e.string===t.string),i&&r.set(n,i)),i}function mR(t,e,r){let n=t.name;if(r.has(n))return!1;if(r.add(n),t.name===e.name)return!0;for(let i of t.superTypes)if(yn(i)&&mR(i,e,r))return!0;return!1}function ac(t){if(ai(t))return`@(${ac(t.referenceType)})}`;if(ci(t))return`(${ac(t.elementType)})[]`;if(Dt(t)){let e=t.types.map(r=>ac(r)).join(" | ");return t.types.length<=1?`Union<${e}>`:e}else{if(Lr(t))return`Value<${t.value.name}>`;if(Mr(t))return t.primitive;if(In(t))return`'${t.string}'`}throw new Error("Invalid type")}function gn(t,e="AstType"){if(ai(t)){let r=gn(t.referenceType,e);return e==="AstType"?`Reference<${r}>`:`@${ch(t.referenceType,r)}`}else if(ci(t)){let r=gn(t.elementType,e);return e==="AstType"?`Array<${r}>`:`${ch(t.elementType,r)}[]`}else if(Dt(t)){let r=t.types.map(n=>ch(n,gn(n,e)));return Ao(r).join(" | ")}else{if(Lr(t))return t.value.name;if(Mr(t))return t.primitive;if(In(t)){let r=e==="AstType"?"'":'"';return`${r}${t.string}${r}`}}throw new Error("Invalid type")}function ch(t,e){return Dt(t)&&(e=`(${e})`),e}function pR(t,e,r,n=new Set){function i(o){let s=r==="AstType"?o.name:fh(o.name,n),a=o.optional&&!yl(o.type),c=gn(o.type,r);return`${s}${a?"?":""}: ${c}`}Ao(e,(o,s)=>o.name.localeCompare(s.name)).forEach(o=>t.append(i(o),st))}function yl(t){return ci(t)?!0:ai(t)?!1:Dt(t)?t.types.every(e=>yl(e)):Mr(t)?t.primitive==="boolean":!1}function hR(t,e){t.append(`export const ${e} = '${e}';`,st),t.append(st),t.append(`export function is${e}(item: unknown): item is ${e} {`,st),t.indent(r=>r.append(`return reflection.isInstance(item, ${e});`,st)),t.append("}",st)}function G$(t,e){switch(e.dataType){case"string":if(uh(e.type)){let r=Array.from(e.subTypes).map(o=>o.name),n=gR(e.type),i=yR(e.type);if(r.length===0&&n.length===0&&i.length===0)ml(t,e.name,`typeof item === '${e.dataType}'`);else{let o=H$(r,n,i);ml(t,e.name,o)}}break;case"number":case"boolean":case"bigint":ml(t,e.name,`typeof item === '${e.dataType}'`);break;case"Date":ml(t,e.name,"item instanceof Date");break;default:return}}function uh(t){let e=!0;if(Mr(t))return t.primitive==="string";if(In(t))return!0;if(Dt(t)){for(let r of t.types)if(Lr(r))if(hn(r.value)){if(!uh(r.value.type))return!1}else return!1;else if(Mr(r)){if(r.primitive!=="string"||!r.regex)return!1}else if(Dt(r))e=uh(r);else if(!In(r))return!1}else return!1;return e}function H$(t,e,r){let n=[...t.map(i=>`is${i}(item)`),...e.map(i=>`item === '${i}'`)];if(r.length>0){let i=r.map(o=>`${o}.test(item)`).join(" || ");n.push(`(typeof item === 'string' && (${i}))`)}return n.join(" || ")}function fh(t,e){return e.has(t)?`^${t}`:t}function gR(t){let e=[];if(In(t))return[t.string];if(Dt(t))for(let r of t.types)In(r)?e.push(r.string):Dt(r)&&e.push(...gR(r));return e}function yR(t){let e=[];if(Mr(t)&&t.primitive==="string"&&t.regex&&e.push(t.regex),Dt(t))for(let r of t.types)Mr(r)&&r.primitive==="string"&&r.regex?e.push(r.regex):Dt(r)&&e.push(...yR(r));return e}function ml(t,e,r){t.append(st,`export function is${e}(item: unknown): item is ${e} {`,st),t.indent(n=>n.append(`return ${r};`,st)),t.append("}",st)}function Ao(t,e){return Array.from(new Set(t)).sort(e)}function dh(t,e,r,n){let i=new Set;return i.add(t),e.findReferences(t,{}).forEach(s=>{let a=r.getOrCreateDocument(s.sourceUri),c=n.getAstNode(a.parseResult.value,s.sourcePath);wr(c)?(i.add(c),dh(c,e,r,n).forEach(l=>i.add(l))):c&&Mt(c.$container)&&i.add(c.$container)}),i}function uc(t){let e=new Set;if(wr(t))e.add(t),t.superTypes.forEach(r=>{if(wr(r.ref)){e.add(r.ref);let n=uc(r.ref);for(let i of n)e.add(i)}});else if(Mt(t)){let r=TR(t.type);for(let n of r){let i=uc(n);for(let o of i)e.add(o)}}return e}function TR(t){var e;if(Xr(t))return t.types.flatMap(r=>TR(r));if(or(t)){let r=(e=t.typeRef)===null||e===void 0?void 0:e.ref;if(Mt(r)||wr(r))return[r]}return[]}function ph(t,e){return t.interfaces.concat(e.interfaces)}function vl(t){return t.interfaces.concat(t.unions)}function vR(t){let e=t.sort((i,o)=>i.name.localeCompare(o.name)).map(i=>({value:i,nodes:[]}));for(let i of e)i.nodes=e.filter(o=>i.value.superTypes.has(o.value.name));let r=[],n=e.filter(i=>i.nodes.length===0);for(;n.length>0;){let i=n.shift();r.includes(i)||(r.push(i),e.filter(o=>o.nodes.includes(i)).forEach(o=>n.push(o)))}return r.map(i=>i.value)}function RR(t){return Tl(t,new Set)}function Tl(t,e){if(e.has(t))return[];if(e.add(t),Dt(t))return t.types.flatMap(r=>Tl(r,e));if(Lr(t)){let r=t.value;return"type"in r?Tl(r.type,e):[r.name]}else if(ci(t))return Tl(t.elementType,e);return[]}function lc(t){return typeof t.name=="string"}var Ts=class{getName(e){if(lc(e))return e.name}getNameNode(e){return Yt(e.$cstNode,"name")}};function J(t){return t.charCodeAt(0)}function Rl(t,e){Array.isArray(t)?t.forEach(function(r){e.push(r)}):e.push(t)}function vs(t,e){if(t[e]===!0)throw"duplicate flag "+e;let r=t[e];t[e]=!0}function ko(t){if(t===void 0)throw Error("Internal Error - Should never get here!");return!0}function fc(){throw Error("Internal Error - Should never get here!")}function mh(t){return t.type==="Character"}var dc=[];for(let t=J("0");t<=J("9");t++)dc.push(t);var pc=[J("_")].concat(dc);for(let t=J("a");t<=J("z");t++)pc.push(t);for(let t=J("A");t<=J("Z");t++)pc.push(t);var hh=[J(" "),J("\f"),J(`
`),J("\r"),J("	"),J("\v"),J("	"),J("\xA0"),J("\u1680"),J("\u2000"),J("\u2001"),J("\u2002"),J("\u2003"),J("\u2004"),J("\u2005"),J("\u2006"),J("\u2007"),J("\u2008"),J("\u2009"),J("\u200A"),J("\u2028"),J("\u2029"),J("\u202F"),J("\u205F"),J("\u3000"),J("\uFEFF")];var K$=/[0-9a-fA-F]/,xl=/[0-9]/,W$=/[1-9]/,Eo=class{constructor(){this.idx=0,this.input="",this.groupIdx=0}saveState(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}}restoreState(e){this.idx=e.idx,this.input=e.input,this.groupIdx=e.groupIdx}pattern(e){this.idx=0,this.input=e,this.groupIdx=0,this.consumeChar("/");let r=this.disjunction();this.consumeChar("/");let n={type:"Flags",loc:{begin:this.idx,end:e.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};for(;this.isRegExpFlag();)switch(this.popChar()){case"g":vs(n,"global");break;case"i":vs(n,"ignoreCase");break;case"m":vs(n,"multiLine");break;case"u":vs(n,"unicode");break;case"y":vs(n,"sticky");break}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:r,loc:this.loc(0)}}disjunction(){let e=[],r=this.idx;for(e.push(this.alternative());this.peekChar()==="|";)this.consumeChar("|"),e.push(this.alternative());return{type:"Disjunction",value:e,loc:this.loc(r)}}alternative(){let e=[],r=this.idx;for(;this.isTerm();)e.push(this.term());return{type:"Alternative",value:e,loc:this.loc(r)}}term(){return this.isAssertion()?this.assertion():this.atom()}assertion(){let e=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(e)};case"$":return{type:"EndAnchor",loc:this.loc(e)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(e)};case"B":return{type:"NonWordBoundary",loc:this.loc(e)}}throw Error("Invalid Assertion Escape");case"(":this.consumeChar("?");let r;switch(this.popChar()){case"=":r="Lookahead";break;case"!":r="NegativeLookahead";break}ko(r);let n=this.disjunction();return this.consumeChar(")"),{type:r,value:n,loc:this.loc(e)}}return fc()}quantifier(e=!1){let r,n=this.idx;switch(this.popChar()){case"*":r={atLeast:0,atMost:1/0};break;case"+":r={atLeast:1,atMost:1/0};break;case"?":r={atLeast:0,atMost:1};break;case"{":let i=this.integerIncludingZero();switch(this.popChar()){case"}":r={atLeast:i,atMost:i};break;case",":let o;this.isDigit()?(o=this.integerIncludingZero(),r={atLeast:i,atMost:o}):r={atLeast:i,atMost:1/0},this.consumeChar("}");break}if(e===!0&&r===void 0)return;ko(r);break}if(!(e===!0&&r===void 0)&&ko(r))return this.peekChar(0)==="?"?(this.consumeChar("?"),r.greedy=!1):r.greedy=!0,r.type="Quantifier",r.loc=this.loc(n),r}atom(){let e,r=this.idx;switch(this.peekChar()){case".":e=this.dotAll();break;case"\\":e=this.atomEscape();break;case"[":e=this.characterClass();break;case"(":e=this.group();break}return e===void 0&&this.isPatternCharacter()&&(e=this.patternCharacter()),ko(e)?(e.loc=this.loc(r),this.isQuantifier()&&(e.quantifier=this.quantifier()),e):fc()}dotAll(){return this.consumeChar("."),{type:"Set",complement:!0,value:[J(`
`),J("\r"),J("\u2028"),J("\u2029")]}}atomEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}decimalEscapeAtom(){return{type:"GroupBackReference",value:this.positiveInteger()}}characterClassEscape(){let e,r=!1;switch(this.popChar()){case"d":e=dc;break;case"D":e=dc,r=!0;break;case"s":e=hh;break;case"S":e=hh,r=!0;break;case"w":e=pc;break;case"W":e=pc,r=!0;break}return ko(e)?{type:"Set",value:e,complement:r}:fc()}controlEscapeAtom(){let e;switch(this.popChar()){case"f":e=J("\f");break;case"n":e=J(`
`);break;case"r":e=J("\r");break;case"t":e=J("	");break;case"v":e=J("\v");break}return ko(e)?{type:"Character",value:e}:fc()}controlLetterEscapeAtom(){this.consumeChar("c");let e=this.popChar();if(/[a-zA-Z]/.test(e)===!1)throw Error("Invalid ");return{type:"Character",value:e.toUpperCase().charCodeAt(0)-64}}nulCharacterAtom(){return this.consumeChar("0"),{type:"Character",value:J("\0")}}hexEscapeSequenceAtom(){return this.consumeChar("x"),this.parseHexDigits(2)}regExpUnicodeEscapeSequenceAtom(){return this.consumeChar("u"),this.parseHexDigits(4)}identityEscapeAtom(){let e=this.popChar();return{type:"Character",value:J(e)}}classPatternCharacterAtom(){switch(this.peekChar()){case`
`:case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:let e=this.popChar();return{type:"Character",value:J(e)}}}characterClass(){let e=[],r=!1;for(this.consumeChar("["),this.peekChar(0)==="^"&&(this.consumeChar("^"),r=!0);this.isClassAtom();){let n=this.classAtom(),i=n.type==="Character";if(mh(n)&&this.isRangeDash()){this.consumeChar("-");let o=this.classAtom(),s=o.type==="Character";if(mh(o)){if(o.value<n.value)throw Error("Range out of order in character class");e.push({from:n.value,to:o.value})}else Rl(n.value,e),e.push(J("-")),Rl(o.value,e)}else Rl(n.value,e)}return this.consumeChar("]"),{type:"Set",complement:r,value:e}}classAtom(){switch(this.peekChar()){case"]":case`
`:case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}}classEscape(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:J("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}}group(){let e=!0;switch(this.consumeChar("("),this.peekChar(0)){case"?":this.consumeChar("?"),this.consumeChar(":"),e=!1;break;default:this.groupIdx++;break}let r=this.disjunction();this.consumeChar(")");let n={type:"Group",capturing:e,value:r};return e&&(n.idx=this.groupIdx),n}positiveInteger(){let e=this.popChar();if(W$.test(e)===!1)throw Error("Expecting a positive integer");for(;xl.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}integerIncludingZero(){let e=this.popChar();if(xl.test(e)===!1)throw Error("Expecting an integer");for(;xl.test(this.peekChar(0));)e+=this.popChar();return parseInt(e,10)}patternCharacter(){let e=this.popChar();switch(e){case`
`:case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:J(e)}}}isRegExpFlag(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}}isRangeDash(){return this.peekChar()==="-"&&this.isClassAtom(1)}isDigit(){return xl.test(this.peekChar(0))}isClassAtom(e=0){switch(this.peekChar(e)){case"]":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}isTerm(){return this.isAtom()||this.isAssertion()}isAtom(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}}isAssertion(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return this.peekChar(1)==="?"&&(this.peekChar(2)==="="||this.peekChar(2)==="!");default:return!1}}isQuantifier(){let e=this.saveState();try{return this.quantifier(!0)!==void 0}catch{return!1}finally{this.restoreState(e)}}isPatternCharacter(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case`
`:case"\r":case"\u2028":case"\u2029":return!1;default:return!0}}parseHexDigits(e){let r="";for(let i=0;i<e;i++){let o=this.popChar();if(K$.test(o)===!1)throw Error("Expecting a HexDecimal digits");r+=o}return{type:"Character",value:parseInt(r,16)}}peekChar(e=0){return this.input[this.idx+e]}popChar(){let e=this.peekChar(0);return this.consumeChar(void 0),e}consumeChar(e){if(e!==void 0&&this.input[this.idx]!==e)throw Error("Expected: '"+e+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++}loc(e){return{begin:e,end:this.idx}}};var Pn=class{visitChildren(e){for(let r in e){let n=e[r];e.hasOwnProperty(r)&&(n.type!==void 0?this.visit(n):Array.isArray(n)&&n.forEach(i=>{this.visit(i)},this))}}visit(e){switch(e.type){case"Pattern":this.visitPattern(e);break;case"Flags":this.visitFlags(e);break;case"Disjunction":this.visitDisjunction(e);break;case"Alternative":this.visitAlternative(e);break;case"StartAnchor":this.visitStartAnchor(e);break;case"EndAnchor":this.visitEndAnchor(e);break;case"WordBoundary":this.visitWordBoundary(e);break;case"NonWordBoundary":this.visitNonWordBoundary(e);break;case"Lookahead":this.visitLookahead(e);break;case"NegativeLookahead":this.visitNegativeLookahead(e);break;case"Character":this.visitCharacter(e);break;case"Set":this.visitSet(e);break;case"Group":this.visitGroup(e);break;case"GroupBackReference":this.visitGroupBackReference(e);break;case"Quantifier":this.visitQuantifier(e);break}this.visitChildren(e)}visitPattern(e){}visitFlags(e){}visitDisjunction(e){}visitAlternative(e){}visitStartAnchor(e){}visitEndAnchor(e){}visitWordBoundary(e){}visitNonWordBoundary(e){}visitLookahead(e){}visitNegativeLookahead(e){}visitCharacter(e){}visitSet(e){}visitGroup(e){}visitGroupBackReference(e){}visitQuantifier(e){}};var B$=new Eo,yh=class extends Pn{constructor(){super(...arguments),this.isStarting=!0,this.endRegexStack=[],this.multiline=!1}get endRegex(){return this.endRegexStack.join("")}reset(e){this.multiline=!1,this.regex=e,this.startRegex="",this.isStarting=!0,this.endRegexStack=[]}visitGroup(e){e.quantifier&&(this.isStarting=!1,this.endRegexStack=[])}visitCharacter(e){let r=String.fromCharCode(e.value);if(!this.multiline&&r===`
`&&(this.multiline=!0),e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let n=ui(r);this.endRegexStack.push(n),this.isStarting&&(this.startRegex+=n)}}visitSet(e){if(!this.multiline){let r=this.regex.substring(e.loc.begin,e.loc.end),n=new RegExp(r);this.multiline=!!`
`.match(n)}if(e.quantifier)this.isStarting=!1,this.endRegexStack=[];else{let r=this.regex.substring(e.loc.begin,e.loc.end);this.endRegexStack.push(r),this.isStarting&&(this.startRegex+=r)}}visitChildren(e){e.type==="Group"&&e.quantifier||super.visitChildren(e)}},gh=new yh;function xR(t){try{return typeof t=="string"&&(t=new RegExp(t)),t=t.toString(),gh.reset(t),gh.visit(B$.pattern(t)),gh.multiline}catch{return!1}}function Th(t){return(typeof t=="string"?new RegExp(t):t).test(" ")}function ui(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function bR(t){return Array.prototype.map.call(t,e=>/\w/.test(e)?`[${e.toLowerCase()}${e.toUpperCase()}]`:ui(e)).join("")}function SR(t,e){let r=z$(t),n=e.match(r);return!!n&&n[0].length>0}function z$(t){typeof t=="string"&&(t=new RegExp(t));let e=t,r=t.source,n=0;function i(){let o="",s;function a(u){o+=r.substr(n,u),n+=u}function c(u){o+="(?:"+r.substr(n,u)+"|$)",n+=u}for(;n<r.length;)switch(r[n]){case"\\":switch(r[n+1]){case"c":c(3);break;case"x":c(4);break;case"u":e.unicode?r[n+2]==="{"?c(r.indexOf("}",n)-n+1):c(6):c(2);break;case"p":case"P":e.unicode?c(r.indexOf("}",n)-n+1):c(2);break;case"k":c(r.indexOf(">",n)-n+1);break;default:c(2);break}break;case"[":s=/\[(?:\\.|.)*?\]/g,s.lastIndex=n,s=s.exec(r)||[],c(s[0].length);break;case"|":case"^":case"$":case"*":case"+":case"?":a(1);break;case"{":s=/\{\d+,?\d*\}/g,s.lastIndex=n,s=s.exec(r),s?a(s[0].length):c(1);break;case"(":if(r[n+1]==="?")switch(r[n+2]){case":":o+="(?:",n+=3,o+=i()+"|$)";break;case"=":o+="(?=",n+=3,o+=i()+")";break;case"!":s=n,n+=3,i(),o+=r.substr(s,n-s);break;case"<":switch(r[n+3]){case"=":case"!":s=n,n+=4,i(),o+=r.substr(s,n-s);break;default:a(r.indexOf(">",n)-n+1),o+=i()+"|$)";break}break}else a(1),o+=i()+"|$)";break;case")":return++n,o;default:c(1);break}return o}return new RegExp(i(),t.flags)}var vh={};KA(vh,{URI:()=>V$,Utils:()=>X$});var wR;(()=>{"use strict";var t={470:i=>{function o(c){if(typeof c!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(c))}function s(c,u){for(var l,f="",m=0,T=-1,S=0,C=0;C<=c.length;++C){if(C<c.length)l=c.charCodeAt(C);else{if(l===47)break;l=47}if(l===47){if(!(T===C-1||S===1))if(T!==C-1&&S===2){if(f.length<2||m!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var N=f.lastIndexOf("/");if(N!==f.length-1){N===-1?(f="",m=0):m=(f=f.slice(0,N)).length-1-f.lastIndexOf("/"),T=C,S=0;continue}}else if(f.length===2||f.length===1){f="",m=0,T=C,S=0;continue}}u&&(f.length>0?f+="/..":f="..",m=2)}else f.length>0?f+="/"+c.slice(T+1,C):f=c.slice(T+1,C),m=C-T-1;T=C,S=0}else l===46&&S!==-1?++S:S=-1}return f}var a={resolve:function(){for(var c,u="",l=!1,f=arguments.length-1;f>=-1&&!l;f--){var m;f>=0?m=arguments[f]:(c===void 0&&(c=process.cwd()),m=c),o(m),m.length!==0&&(u=m+"/"+u,l=m.charCodeAt(0)===47)}return u=s(u,!l),l?u.length>0?"/"+u:"/":u.length>0?u:"."},normalize:function(c){if(o(c),c.length===0)return".";var u=c.charCodeAt(0)===47,l=c.charCodeAt(c.length-1)===47;return(c=s(c,!u)).length!==0||u||(c="."),c.length>0&&l&&(c+="/"),u?"/"+c:c},isAbsolute:function(c){return o(c),c.length>0&&c.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var c,u=0;u<arguments.length;++u){var l=arguments[u];o(l),l.length>0&&(c===void 0?c=l:c+="/"+l)}return c===void 0?".":a.normalize(c)},relative:function(c,u){if(o(c),o(u),c===u||(c=a.resolve(c))===(u=a.resolve(u)))return"";for(var l=1;l<c.length&&c.charCodeAt(l)===47;++l);for(var f=c.length,m=f-l,T=1;T<u.length&&u.charCodeAt(T)===47;++T);for(var S=u.length-T,C=m<S?m:S,N=-1,A=0;A<=C;++A){if(A===C){if(S>C){if(u.charCodeAt(T+A)===47)return u.slice(T+A+1);if(A===0)return u.slice(T+A)}else m>C&&(c.charCodeAt(l+A)===47?N=A:A===0&&(N=0));break}var v=c.charCodeAt(l+A);if(v!==u.charCodeAt(T+A))break;v===47&&(N=A)}var y="";for(A=l+N+1;A<=f;++A)A!==f&&c.charCodeAt(A)!==47||(y.length===0?y+="..":y+="/..");return y.length>0?y+u.slice(T+N):(T+=N,u.charCodeAt(T)===47&&++T,u.slice(T))},_makeLong:function(c){return c},dirname:function(c){if(o(c),c.length===0)return".";for(var u=c.charCodeAt(0),l=u===47,f=-1,m=!0,T=c.length-1;T>=1;--T)if((u=c.charCodeAt(T))===47){if(!m){f=T;break}}else m=!1;return f===-1?l?"/":".":l&&f===1?"//":c.slice(0,f)},basename:function(c,u){if(u!==void 0&&typeof u!="string")throw new TypeError('"ext" argument must be a string');o(c);var l,f=0,m=-1,T=!0;if(u!==void 0&&u.length>0&&u.length<=c.length){if(u.length===c.length&&u===c)return"";var S=u.length-1,C=-1;for(l=c.length-1;l>=0;--l){var N=c.charCodeAt(l);if(N===47){if(!T){f=l+1;break}}else C===-1&&(T=!1,C=l+1),S>=0&&(N===u.charCodeAt(S)?--S==-1&&(m=l):(S=-1,m=C))}return f===m?m=C:m===-1&&(m=c.length),c.slice(f,m)}for(l=c.length-1;l>=0;--l)if(c.charCodeAt(l)===47){if(!T){f=l+1;break}}else m===-1&&(T=!1,m=l+1);return m===-1?"":c.slice(f,m)},extname:function(c){o(c);for(var u=-1,l=0,f=-1,m=!0,T=0,S=c.length-1;S>=0;--S){var C=c.charCodeAt(S);if(C!==47)f===-1&&(m=!1,f=S+1),C===46?u===-1?u=S:T!==1&&(T=1):u!==-1&&(T=-1);else if(!m){l=S+1;break}}return u===-1||f===-1||T===0||T===1&&u===f-1&&u===l+1?"":c.slice(u,f)},format:function(c){if(c===null||typeof c!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof c);return function(u,l){var f=l.dir||l.root,m=l.base||(l.name||"")+(l.ext||"");return f?f===l.root?f+m:f+"/"+m:m}(0,c)},parse:function(c){o(c);var u={root:"",dir:"",base:"",ext:"",name:""};if(c.length===0)return u;var l,f=c.charCodeAt(0),m=f===47;m?(u.root="/",l=1):l=0;for(var T=-1,S=0,C=-1,N=!0,A=c.length-1,v=0;A>=l;--A)if((f=c.charCodeAt(A))!==47)C===-1&&(N=!1,C=A+1),f===46?T===-1?T=A:v!==1&&(v=1):T!==-1&&(v=-1);else if(!N){S=A+1;break}return T===-1||C===-1||v===0||v===1&&T===C-1&&T===S+1?C!==-1&&(u.base=u.name=S===0&&m?c.slice(1,C):c.slice(S,C)):(S===0&&m?(u.name=c.slice(1,T),u.base=c.slice(1,C)):(u.name=c.slice(S,T),u.base=c.slice(S,C)),u.ext=c.slice(T,C)),S>0?u.dir=c.slice(0,S-1):m&&(u.dir="/"),u},sep:"/",delimiter:":",win32:null,posix:null};a.posix=a,i.exports=a}},e={};function r(i){var o=e[i];if(o!==void 0)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,r),s.exports}r.d=(i,o)=>{for(var s in o)r.o(o,s)&&!r.o(i,s)&&Object.defineProperty(i,s,{enumerable:!0,get:o[s]})},r.o=(i,o)=>Object.prototype.hasOwnProperty.call(i,o),r.r=i=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})};var n={};(()=>{let i;r.r(n),r.d(n,{URI:()=>m,Utils:()=>Rt}),typeof process=="object"?i=process.platform==="win32":typeof navigator=="object"&&(i=navigator.userAgent.indexOf("Windows")>=0);let o=/^\w[\w\d+.-]*$/,s=/^\//,a=/^\/\//;function c(M,w){if(!M.scheme&&w)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${M.authority}", path: "${M.path}", query: "${M.query}", fragment: "${M.fragment}"}`);if(M.scheme&&!o.test(M.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(M.path){if(M.authority){if(!s.test(M.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(a.test(M.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}}let u="",l="/",f=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class m{static isUri(w){return w instanceof m||!!w&&typeof w.authority=="string"&&typeof w.fragment=="string"&&typeof w.path=="string"&&typeof w.query=="string"&&typeof w.scheme=="string"&&typeof w.fsPath=="string"&&typeof w.with=="function"&&typeof w.toString=="function"}scheme;authority;path;query;fragment;constructor(w,q,H,ce,ee,Q=!1){typeof w=="object"?(this.scheme=w.scheme||u,this.authority=w.authority||u,this.path=w.path||u,this.query=w.query||u,this.fragment=w.fragment||u):(this.scheme=function(xt,lt){return xt||lt?xt:"file"}(w,Q),this.authority=q||u,this.path=function(xt,lt){switch(xt){case"https":case"http":case"file":lt?lt[0]!==l&&(lt=l+lt):lt=l}return lt}(this.scheme,H||u),this.query=ce||u,this.fragment=ee||u,c(this,Q))}get fsPath(){return v(this,!1)}with(w){if(!w)return this;let{scheme:q,authority:H,path:ce,query:ee,fragment:Q}=w;return q===void 0?q=this.scheme:q===null&&(q=u),H===void 0?H=this.authority:H===null&&(H=u),ce===void 0?ce=this.path:ce===null&&(ce=u),ee===void 0?ee=this.query:ee===null&&(ee=u),Q===void 0?Q=this.fragment:Q===null&&(Q=u),q===this.scheme&&H===this.authority&&ce===this.path&&ee===this.query&&Q===this.fragment?this:new S(q,H,ce,ee,Q)}static parse(w,q=!1){let H=f.exec(w);return H?new S(H[2]||u,X(H[4]||u),X(H[5]||u),X(H[7]||u),X(H[9]||u),q):new S(u,u,u,u,u)}static file(w){let q=u;if(i&&(w=w.replace(/\\/g,l)),w[0]===l&&w[1]===l){let H=w.indexOf(l,2);H===-1?(q=w.substring(2),w=l):(q=w.substring(2,H),w=w.substring(H)||l)}return new S("file",q,w,u,u)}static from(w){let q=new S(w.scheme,w.authority,w.path,w.query,w.fragment);return c(q,!0),q}toString(w=!1){return y(this,w)}toJSON(){return this}static revive(w){if(w){if(w instanceof m)return w;{let q=new S(w);return q._formatted=w.external,q._fsPath=w._sep===T?w.fsPath:null,q}}return w}}let T=i?1:void 0;class S extends m{_formatted=null;_fsPath=null;get fsPath(){return this._fsPath||(this._fsPath=v(this,!1)),this._fsPath}toString(w=!1){return w?y(this,!0):(this._formatted||(this._formatted=y(this,!1)),this._formatted)}toJSON(){let w={$mid:1};return this._fsPath&&(w.fsPath=this._fsPath,w._sep=T),this._formatted&&(w.external=this._formatted),this.path&&(w.path=this.path),this.scheme&&(w.scheme=this.scheme),this.authority&&(w.authority=this.authority),this.query&&(w.query=this.query),this.fragment&&(w.fragment=this.fragment),w}}let C={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function N(M,w,q){let H,ce=-1;for(let ee=0;ee<M.length;ee++){let Q=M.charCodeAt(ee);if(Q>=97&&Q<=122||Q>=65&&Q<=90||Q>=48&&Q<=57||Q===45||Q===46||Q===95||Q===126||w&&Q===47||q&&Q===91||q&&Q===93||q&&Q===58)ce!==-1&&(H+=encodeURIComponent(M.substring(ce,ee)),ce=-1),H!==void 0&&(H+=M.charAt(ee));else{H===void 0&&(H=M.substr(0,ee));let xt=C[Q];xt!==void 0?(ce!==-1&&(H+=encodeURIComponent(M.substring(ce,ee)),ce=-1),H+=xt):ce===-1&&(ce=ee)}}return ce!==-1&&(H+=encodeURIComponent(M.substring(ce))),H!==void 0?H:M}function A(M){let w;for(let q=0;q<M.length;q++){let H=M.charCodeAt(q);H===35||H===63?(w===void 0&&(w=M.substr(0,q)),w+=C[H]):w!==void 0&&(w+=M[q])}return w!==void 0?w:M}function v(M,w){let q;return q=M.authority&&M.path.length>1&&M.scheme==="file"?`//${M.authority}${M.path}`:M.path.charCodeAt(0)===47&&(M.path.charCodeAt(1)>=65&&M.path.charCodeAt(1)<=90||M.path.charCodeAt(1)>=97&&M.path.charCodeAt(1)<=122)&&M.path.charCodeAt(2)===58?w?M.path.substr(1):M.path[1].toLowerCase()+M.path.substr(2):M.path,i&&(q=q.replace(/\//g,"\\")),q}function y(M,w){let q=w?A:N,H="",{scheme:ce,authority:ee,path:Q,query:xt,fragment:lt}=M;if(ce&&(H+=ce,H+=":"),(ee||ce==="file")&&(H+=l,H+=l),ee){let me=ee.indexOf("@");if(me!==-1){let Nr=ee.substr(0,me);ee=ee.substr(me+1),me=Nr.lastIndexOf(":"),me===-1?H+=q(Nr,!1,!1):(H+=q(Nr.substr(0,me),!1,!1),H+=":",H+=q(Nr.substr(me+1),!1,!0)),H+="@"}ee=ee.toLowerCase(),me=ee.lastIndexOf(":"),me===-1?H+=q(ee,!1,!0):(H+=q(ee.substr(0,me),!1,!0),H+=ee.substr(me))}if(Q){if(Q.length>=3&&Q.charCodeAt(0)===47&&Q.charCodeAt(2)===58){let me=Q.charCodeAt(1);me>=65&&me<=90&&(Q=`/${String.fromCharCode(me+32)}:${Q.substr(3)}`)}else if(Q.length>=2&&Q.charCodeAt(1)===58){let me=Q.charCodeAt(0);me>=65&&me<=90&&(Q=`${String.fromCharCode(me+32)}:${Q.substr(2)}`)}H+=q(Q,!0,!1)}return xt&&(H+="?",H+=q(xt,!1,!1)),lt&&(H+="#",H+=w?lt:N(lt,!1,!1)),H}function _(M){try{return decodeURIComponent(M)}catch{return M.length>3?M.substr(0,3)+_(M.substr(3)):M}}let D=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function X(M){return M.match(D)?M.replace(D,w=>_(w)):M}var ye=r(470);let Ee=ye.posix||ye,Ht="/";var Rt;(function(M){M.joinPath=function(w,...q){return w.with({path:Ee.join(w.path,...q)})},M.resolvePath=function(w,...q){let H=w.path,ce=!1;H[0]!==Ht&&(H=Ht+H,ce=!0);let ee=Ee.resolve(H,...q);return ce&&ee[0]===Ht&&!w.authority&&(ee=ee.substring(1)),w.with({path:ee})},M.dirname=function(w){if(w.path.length===0||w.path===Ht)return w;let q=Ee.dirname(w.path);return q.length===1&&q.charCodeAt(0)===46&&(q=""),w.with({path:q})},M.basename=function(w){return Ee.basename(w.path)},M.extname=function(w){return Ee.extname(w.path)}})(Rt||(Rt={}))})(),wR=n})();var{URI:V$,Utils:X$}=wR;var li=vh;"default"in li&&(li=li.default);var Jt=li.URI;var ve;(function(t){t.basename=li.Utils.basename,t.dirname=li.Utils.dirname,t.extname=li.Utils.extname,t.joinPath=li.Utils.joinPath,t.resolvePath=li.Utils.resolvePath;function e(n,i){return n?.toString()===i?.toString()}t.equals=e;function r(n,i){let o=typeof n=="string"?n:n.path,s=typeof i=="string"?i:i.path,a=o.split("/").filter(m=>m.length>0),c=s.split("/").filter(m=>m.length>0),u=0;for(;u<a.length&&a[u]===c[u];u++);let l="../".repeat(a.length-u),f=c.slice(u).join("/");return l+f}t.relative=r})(ve=ve||(ve={}));var KK=ve.equals,WK=ve.relative;var bl,CR=()=>bl??(bl=Sl(`{"$type":"Grammar","isDeclared":true,"name":"LangiumGrammar","rules":[{"$type":"ParserRule","name":"Grammar","entry":true,"definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"isDeclared","operator":"?=","terminal":{"$type":"Keyword","value":"grammar"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"with"},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"usedGrammars","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"}],"cardinality":"?"},{"$type":"Assignment","feature":"imports","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@12"},"arguments":[]},"cardinality":"*"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"rules","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@11"},"arguments":[]}},{"$type":"Assignment","feature":"interfaces","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@1"},"arguments":[]}},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@10"},"arguments":[]}}],"cardinality":"+"}]},"definesHiddenTokens":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Interface","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"interface"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"extends"},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"superTypes","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@2"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SchemaType","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"{"},{"$type":"Assignment","feature":"attributes","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@3"},"arguments":[]},"cardinality":"*"},{"$type":"Keyword","value":"}"},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeAttribute","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"isOptional","operator":"?=","terminal":{"$type":"Keyword","value":"?"},"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TypeDefinition","definition":{"$type":"RuleCall","rule":{"$ref":"#/rules@5"},"arguments":[]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnionType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnionType"},"feature":"types","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"types","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@6"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ArrayType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@7"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ArrayType"},"feature":"elementType","operator":"="},{"$type":"Keyword","value":"["},{"$type":"Keyword","value":"]"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReferenceType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"ReferenceType"}},{"$type":"Keyword","value":"@"},{"$type":"Assignment","feature":"referenceType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@8"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"SimpleType","inferredType":{"$type":"InferredType","name":"TypeDefinition"},"definition":{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]},{"$type":"Keyword","value":")"}]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"SimpleType"}},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"typeRef","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"primitiveType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}},{"$type":"Assignment","feature":"stringType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PrimitiveType","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"string"},{"$type":"Keyword","value":"number"},{"$type":"Keyword","value":"boolean"},{"$type":"Keyword","value":"Date"},{"$type":"Keyword","value":"bigint"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Type","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"type"},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Keyword","value":"="},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@4"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractRule","definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@13"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@46"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"GrammarImport","definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"import"},{"$type":"Assignment","feature":"path","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},{"$type":"Keyword","value":";","cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParserRule","definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"entry","operator":"?=","terminal":{"$type":"Keyword","value":"entry"}},{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}}],"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@15"},"arguments":[]},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"wildcard","operator":"?=","terminal":{"$type":"Keyword","value":"*"}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"returnType","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"dataType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]}}]}]},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":false},"calledByName":false}]}}],"cardinality":"?"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"definesHiddenTokens","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"}},{"$type":"Keyword","value":"("},{"$type":"Group","elements":[{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"hiddenTokens","operator":"+=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":")"}],"cardinality":"?"},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"InferredType","parameters":[{"$type":"Parameter","name":"imperative"}],"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Group","guardCondition":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}},"elements":[{"$type":"Keyword","value":"infer"}]},{"$type":"Group","guardCondition":{"$type":"Negation","value":{"$type":"ParameterReference","parameter":{"$ref":"#/rules@14/parameters@0"}}},"elements":[{"$type":"Keyword","value":"infers"}]}]},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"wildcard":false},{"$type":"ParserRule","name":"RuleNameAndParams","fragment":true,"definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"parameters","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@16"},"arguments":[]}}],"cardinality":"*"}],"cardinality":"?"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Parameter","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Alternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@18"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ConditionalBranch","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@19"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"}},{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"guardCondition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}},{"$type":"Keyword","value":">"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UnorderedGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UnorderedGroup"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@20"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Group","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Group"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@21"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@22"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@23"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTokenWithCardinality","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@37"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@24"},"arguments":[]}]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Action","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Action"}},{"$type":"Keyword","value":"{"},{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"inferredType","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@14"},"arguments":[{"$type":"NamedArgument","value":{"$type":"LiteralCondition","true":true},"calledByName":false}]}}]},{"$type":"Group","elements":[{"$type":"Keyword","value":"."},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"+="}]}},{"$type":"Keyword","value":"current"}],"cardinality":"?"},{"$type":"Keyword","value":"}"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AbstractTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@43"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@35"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@36"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@44"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Keyword","definition":{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RuleCall","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NamedArgument","definition":{"$type":"Group","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Assignment","feature":"calledByName","operator":"?=","terminal":{"$type":"Keyword","value":"="}}],"cardinality":"?"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"LiteralCondition","definition":{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"true","operator":"?=","terminal":{"$type":"Keyword","value":"true"}},{"$type":"Keyword","value":"false"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Disjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Disjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@30"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Conjunction","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Conjunction"},"feature":"left","operator":"="},{"$type":"Keyword","value":"&"},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Negation","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@32"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Negation"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@31"},"arguments":[]}}]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Atom","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@34"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@33"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@28"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedCondition","inferredType":{"$type":"InferredType","name":"Condition"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@29"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParameterReference","definition":{"$type":"Assignment","feature":"parameter","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@16"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedKeyword","inferredType":{"$type":"InferredType","name":"Keyword"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"value","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@60"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedRuleCall","inferredType":{"$type":"InferredType","name":"RuleCall"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@11"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Keyword","value":"<"},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":","},{"$type":"Assignment","feature":"arguments","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@27"},"arguments":[]}}],"cardinality":"*"},{"$type":"Keyword","value":">"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Assignment","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Assignment"}},{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}],"cardinality":"?"},{"$type":"Assignment","feature":"feature","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@58"},"arguments":[]}},{"$type":"Assignment","feature":"operator","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"+="},{"$type":"Keyword","value":"="},{"$type":"Keyword","value":"?="}]}},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@39"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@41"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedAssignableElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@40"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"AssignableAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Alternatives"},"feature":"elements","operator":"+="},{"$type":"Group","elements":[{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@38"},"arguments":[]}}],"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReference","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CrossReference"}},{"$type":"Keyword","value":"["},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/types@0"},"deprecatedSyntax":false}},{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Assignment","feature":"deprecatedSyntax","operator":"?=","terminal":{"$type":"Keyword","value":"|"}},{"$type":"Keyword","value":":"}]},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@42"},"arguments":[]}}],"cardinality":"?"},{"$type":"Keyword","value":"]"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CrossReferenceableTerminal","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@26"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"PredicatedGroup","inferredType":{"$type":"InferredType","name":"Group"},"definition":{"$type":"Group","elements":[{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"=>"},{"$type":"Keyword","value":"->"}]},{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@17"},"arguments":[]}},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ReturnType","definition":{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]}},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRule","definition":{"$type":"Group","elements":[{"$type":"Assignment","feature":"hidden","operator":"?=","terminal":{"$type":"Keyword","value":"hidden"},"cardinality":"?"},{"$type":"Keyword","value":"terminal"},{"$type":"Alternatives","elements":[{"$type":"Group","elements":[{"$type":"Assignment","feature":"fragment","operator":"?=","terminal":{"$type":"Keyword","value":"fragment"}},{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}}]},{"$type":"Group","elements":[{"$type":"Assignment","feature":"name","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":"returns"},{"$type":"Assignment","feature":"type","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@45"},"arguments":[]}}],"cardinality":"?"}]}]},{"$type":"Keyword","value":":"},{"$type":"Assignment","feature":"definition","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]}},{"$type":"Keyword","value":";"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalAlternatives","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalAlternatives"},"feature":"elements","operator":"+="},{"$type":"Keyword","value":"|"},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@48"},"arguments":[]}}],"cardinality":"*"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalGroup","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalGroup"},"feature":"elements","operator":"+="},{"$type":"Assignment","feature":"elements","operator":"+=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@49"},"arguments":[]},"cardinality":"+"}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]},{"$type":"Assignment","feature":"cardinality","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?"},{"$type":"Keyword","value":"*"},{"$type":"Keyword","value":"+"}]},"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalTokenElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Alternatives","elements":[{"$type":"RuleCall","rule":{"$ref":"#/rules@57"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@52"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@51"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@53"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@54"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@55"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@56"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"ParenthesizedTerminalElement","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Keyword","value":"("},{"$type":"Assignment","feature":"lookahead","operator":"=","terminal":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"?="},{"$type":"Keyword","value":"?!"}]},"cardinality":"?"},{"$type":"RuleCall","rule":{"$ref":"#/rules@47"},"arguments":[]},{"$type":"Keyword","value":")"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"TerminalRuleCall","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"TerminalRuleCall"}},{"$type":"Assignment","feature":"rule","operator":"=","terminal":{"$type":"CrossReference","type":{"$ref":"#/rules@46"},"terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]},"deprecatedSyntax":false}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"NegatedToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"NegatedToken"}},{"$type":"Keyword","value":"!"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"UntilToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"UntilToken"}},{"$type":"Keyword","value":"->"},{"$type":"Assignment","feature":"terminal","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@50"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"RegexToken","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"RegexToken"}},{"$type":"Assignment","feature":"regex","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@61"},"arguments":[]}}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"Wildcard","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"Wildcard"}},{"$type":"Keyword","value":"."}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"CharacterRange","inferredType":{"$type":"InferredType","name":"AbstractElement"},"definition":{"$type":"Group","elements":[{"$type":"Action","inferredType":{"$type":"InferredType","name":"CharacterRange"}},{"$type":"Assignment","feature":"left","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}},{"$type":"Group","elements":[{"$type":"Keyword","value":".."},{"$type":"Assignment","feature":"right","operator":"=","terminal":{"$type":"RuleCall","rule":{"$ref":"#/rules@25"},"arguments":[]}}],"cardinality":"?"}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"ParserRule","name":"FeatureName","dataType":"string","definition":{"$type":"Alternatives","elements":[{"$type":"Keyword","value":"current"},{"$type":"Keyword","value":"entry"},{"$type":"Keyword","value":"extends"},{"$type":"Keyword","value":"false"},{"$type":"Keyword","value":"fragment"},{"$type":"Keyword","value":"grammar"},{"$type":"Keyword","value":"hidden"},{"$type":"Keyword","value":"import"},{"$type":"Keyword","value":"interface"},{"$type":"Keyword","value":"returns"},{"$type":"Keyword","value":"terminal"},{"$type":"Keyword","value":"true"},{"$type":"Keyword","value":"type"},{"$type":"Keyword","value":"infer"},{"$type":"Keyword","value":"infers"},{"$type":"Keyword","value":"with"},{"$type":"RuleCall","rule":{"$ref":"#/rules@9"},"arguments":[]},{"$type":"RuleCall","rule":{"$ref":"#/rules@59"},"arguments":[]}]},"definesHiddenTokens":false,"entry":false,"fragment":false,"hiddenTokens":[],"parameters":[],"wildcard":false},{"$type":"TerminalRule","name":"ID","definition":{"$type":"RegexToken","regex":"/\\\\^?[_a-zA-Z][\\\\w_]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"STRING","definition":{"$type":"RegexToken","regex":"/\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","name":"RegexLiteral","type":{"$type":"ReturnType","name":"string"},"definition":{"$type":"RegexToken","regex":"/\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/[a-z]*/"},"fragment":false,"hidden":false},{"$type":"TerminalRule","hidden":true,"name":"WS","definition":{"$type":"RegexToken","regex":"/\\\\s+/"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"ML_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\//"},"fragment":false},{"$type":"TerminalRule","hidden":true,"name":"SL_COMMENT","definition":{"$type":"RegexToken","regex":"/\\\\/\\\\/[^\\\\n\\\\r]*/"},"fragment":false}],"types":[{"$type":"Type","name":"AbstractType","type":{"$type":"UnionType","types":[{"$type":"SimpleType","typeRef":{"$ref":"#/rules@1"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@10"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@23/definition/elements@0"}},{"$type":"SimpleType","typeRef":{"$ref":"#/rules@13"}}]}}],"definesHiddenTokens":false,"hiddenTokens":[],"imports":[],"interfaces":[],"usedGrammars":[]}`));var Al=de(ho(),1);var mc=de(ti(),1);function Y$(){return new Promise(t=>{typeof setImmediate>"u"?setTimeout(t,0):setImmediate(t)})}var AR=0,J$=10;var kR=Symbol("OperationCancelled");function _o(t){return t===kR}async function et(t){if(t===mc.CancellationToken.None)return;let e=Date.now();if(e-AR>=J$&&(AR=e,await Y$()),t.isCancellationRequested)throw kR}var wl=class{constructor(){this.previousAction=Promise.resolve(),this.previousTokenSource=new mc.CancellationTokenSource}lock(e){this.cancel();let r=new mc.CancellationTokenSource;return this.previousTokenSource=r,this.previousAction=this.previousAction.then(()=>e(r.token).catch(n=>{_o(n)||console.error("Error: ",n)}))}cancel(){this.previousTokenSource.cancel()}};function Fr(t){return{code:t}}var Rs;(function(t){t.all=["fast","slow","built-in"]})(Rs=Rs||(Rs={}));var Cl=class{constructor(e){this.entries=new Me,this.reflection=e.shared.AstReflection}register(e,r=this,n="fast"){if(n==="built-in")throw new Error("The 'built-in' category is reserved for lexer, parser, and linker errors.");for(let[i,o]of Object.entries(e)){let s=o;if(Array.isArray(s))for(let a of s){let c={check:this.wrapValidationException(a,r),category:n};this.addEntry(i,c)}else if(typeof s=="function"){let a={check:this.wrapValidationException(s,r),category:n};this.addEntry(i,a)}}}wrapValidationException(e,r){return async(n,i,o)=>{try{await e.call(r,n,i,o)}catch(s){if(_o(s))throw s;console.error("An error occurred during validation:",s);let a=s instanceof Error?s.message:String(s);s instanceof Error&&s.stack&&console.error(s.stack),i("error","An error occurred during validation: "+a,{node:n})}}}addEntry(e,r){if(e==="AstNode"){this.entries.add("AstNode",r);return}for(let n of this.reflection.getAllSubTypes(e))this.entries.add(n,r)}getChecks(e,r){let n=ie(this.entries.get(e)).concat(this.entries.get("AstNode"));return r&&(n=n.filter(i=>r.includes(i.category))),n.map(i=>i.check)}};function ER(t,e){let r={unions:[],interfaces:[]};for(let n of t){let i=[];for(let a of n.attributes)i.push({name:a.name,optional:a.isOptional,astNodes:new Set([a]),type:No(a.type)});let o=new Set;for(let a of n.superTypes)a.ref&&o.add(Tn(a.ref));let s={name:n.name,declared:!0,abstract:!1,properties:i,superTypes:o,subTypes:new Set};r.interfaces.push(s)}for(let n of e){let i={name:n.name,declared:!0,type:No(n.type),superTypes:new Set,subTypes:new Set};r.unions.push(i)}return r}function No(t){if(wo(t))return{elementType:No(t.elementType)};if(Co(t))return{referenceType:No(t.referenceType)};if(Xr(t))return{types:t.types.map(No)};if(or(t)){let e;if(t.primitiveType)return e=t.primitiveType,{primitive:e};if(t.stringType)return e=t.stringType,{string:e};if(t.typeRef){let r=t.typeRef.ref,n=Dn(r);if(n)return xs(n)?{primitive:n}:{value:n}}}return{primitive:"unknown"}}function bs(t){return"referenceType"in t}function Rh(t){return"elementType"in t}function _R(t){return"types"in t}function xh(t){return"value"in t}function Q$(t){return"primitive"in t}function Z$(t){return"string"in t}function NR(t){let e=new Map,r=new Map;for(let n of t.interfaces){let i=new ys(n.name,n.declared,n.abstract);e.set(n.name,i)}for(let n of t.unions){let i=new hl(n.name,{declared:n.declared,dataType:n.dataType});r.set(n.name,i)}for(let n of t.interfaces){let i=e.get(n.name);for(let o of n.superTypes){let s=e.get(o)||r.get(o);s&&i.superTypes.add(s)}for(let o of n.subTypes){let s=e.get(o)||r.get(o);s&&i.subTypes.add(s)}for(let o of n.properties){let s=eI(o,e,r);i.properties.push(s)}}for(let n of t.unions){let i=r.get(n.name);i.type=hc(n.type,i,e,r)}return{interfaces:Array.from(e.values()),unions:Array.from(r.values())}}function eI(t,e,r){return{name:t.name,optional:t.optional,astNodes:t.astNodes,type:hc(t.type,void 0,e,r)}}function hc(t,e,r,n){if(Rh(t))return{elementType:hc(t.elementType,e,r,n)};if(bs(t))return{referenceType:hc(t.referenceType,void 0,r,n)};if(_R(t))return{types:t.types.map(i=>hc(i,e,r,n))};if(Z$(t))return{string:t.string};if(Q$(t))return{primitive:t.primitive,regex:t.regex};if(xh(t)){let i=r.get(t.value)||n.get(t.value);return i?(e&&e.subTypes.add(i),{value:i}):{primitive:"unknown"}}else throw new Error("Invalid property type")}function Sh(t,e){let r=gc(t),n=gc(e);for(let i of n)tI(r,i)||r.push(i);return r.length===1?r[0]:{types:r}}function tI(t,e){return t.some(r=>bh(r,e))}function bh(t,e){return Rh(t)&&Rh(e)?bh(t.elementType,e.elementType):bs(t)&&bs(e)?bh(t.referenceType,e.referenceType):xh(t)&&xh(e)?t.value===e.value:!1}function gc(t){return _R(t)?t.types.flatMap(e=>gc(e)):[t]}function $R(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarValidator,n={Action:[r.checkAssignmentReservedName],AbstractRule:r.checkRuleName,Assignment:[r.checkAssignmentWithFeatureName,r.checkAssignmentToFragmentRule,r.checkAssignmentTypes,r.checkAssignmentReservedName],ParserRule:[r.checkParserRuleDataType,r.checkRuleParametersUsed,r.checkParserRuleReservedName],TerminalRule:[r.checkTerminalRuleReturnType,r.checkHiddenTerminalRule,r.checkEmptyTerminalRule],InferredType:r.checkTypeReservedName,Keyword:r.checkKeyword,UnorderedGroup:r.checkUnorderedGroup,Grammar:[r.checkGrammarName,r.checkEntryGrammarRule,r.checkUniqueRuleName,r.checkUniqueTypeName,r.checkUniqueImportedRules,r.checkDuplicateImportedGrammar,r.checkGrammarHiddenTokens,r.checkGrammarForUnusedRules,r.checkGrammarTypeInfer,r.checkClashingTerminalNames],GrammarImport:r.checkPackageImport,CharacterRange:r.checkInvalidCharacterRange,Interface:[r.checkTypeReservedName,r.checkInterfacePropertyTypes],Type:[r.checkTypeReservedName],TypeAttribute:r.checkTypeReservedName,RuleCall:[r.checkUsedHiddenTerminalRule,r.checkUsedFragmentTerminalRule,r.checkRuleCallParameters],TerminalRuleCall:r.checkUsedHiddenTerminalRule,CrossReference:[r.checkCrossReferenceSyntax,r.checkCrossRefNameAssignment,r.checkCrossRefTerminalType,r.checkCrossRefType,r.checkCrossReferenceToTypeUnion],SimpleType:r.checkFragmentsInTypes,ReferenceType:r.checkReferenceTypeUnion,RegexToken:[r.checkInvalidRegexFlags,r.checkDirectlyUsedRegexFlags]};e.register(n,r)}var Ce;(function(t){t.GrammarNameUppercase="grammar-name-uppercase",t.RuleNameUppercase="rule-name-uppercase",t.HiddenGrammarTokens="hidden-grammar-tokens",t.UseRegexTokens="use-regex-tokens",t.EntryRuleTokenSyntax="entry-rule-token-syntax",t.CrossRefTokenSyntax="cross-ref-token-syntax",t.UnnecessaryFileExtension="unnecessary-file-extension",t.InvalidReturns="invalid-returns",t.InvalidInfers="invalid-infers",t.MissingInfer="missing-infer",t.MissingReturns="missing-returns",t.SuperfluousInfer="superfluous-infer",t.OptionalUnorderedGroup="optional-unordered-group"})(Ce=Ce||(Ce={}));var kl=class{constructor(e){this.references=e.references.References,this.documents=e.shared.workspace.LangiumDocuments}checkGrammarName(e,r){if(e.name){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Grammar name should start with an upper case letter.",{node:e,property:"name",data:Fr(Ce.GrammarNameUppercase)})}}checkEntryGrammarRule(e,r){if(e.isDeclared&&!e.name)return;let n=e.rules.filter(i=>K(i)&&i.entry);if(e.isDeclared&&n.length===0){let i=e.rules.find(o=>K(o)&&!Ur(o));i?r("error","The grammar is missing an entry parser rule. This rule can be an entry one.",{node:i,property:"name",data:Fr(Ce.EntryRuleTokenSyntax)}):r("error","This grammar is missing an entry parser rule.",{node:e,property:"name"})}else!e.isDeclared&&n.length>=1?n.forEach(i=>r("error","Cannot declare entry rules for unnamed grammars.",{node:i,property:"name"})):n.length>1?n.forEach(i=>r("error","The entry rule has to be unique.",{node:i,property:"name"})):n.length===1&&Ur(n[0])&&r("error","The entry rule cannot be a data type rule.",{node:n[0],property:"name"})}checkUniqueRuleName(e,r){let n=i=>ie(i.rules).filter(o=>!yc(o));this.checkUniqueName(e,r,n,"rule")}checkUniqueTypeName(e,r){let n=i=>ie(i.types).concat(i.interfaces);this.checkUniqueName(e,r,n,"type")}checkUniqueName(e,r,n,i){let o=new Me;n(e).forEach(c=>o.add(c.name,c));for(let[,c]of o.entriesGroupedByKey())c.length>1&&c.forEach(u=>{r("error",`A ${i}'s name has to be unique.`,{node:u,property:"name"})});let s=new Set,a=Tc(this.documents,e);for(let c of a)n(c).forEach(u=>s.add(u.name));for(let c of o.keys())s.has(c)&&o.get(c).forEach(l=>{r("error",`A ${i} with the name '${l.name}' already exists in an imported grammar.`,{node:l,property:"name"})})}checkDuplicateImportedGrammar(e,r){let n=new Me;for(let i of e.imports){let o=fi(this.documents,i);o&&n.add(o,i)}for(let[,i]of n.entriesGroupedByKey())i.length>1&&i.forEach((o,s)=>{s>0&&r("warning","The grammar is already being directly imported.",{node:o,tags:[Al.DiagnosticTag.Unnecessary]})})}checkUniqueImportedRules(e,r){let n=new Map;for(let o of e.imports){let s=Tc(this.documents,o);n.set(o,s)}let i=new Me;for(let o of e.imports){let s=n.get(o);for(let a of e.imports){if(o===a)continue;let c=n.get(a),u=this.getDuplicateExportedRules(s,c);for(let l of u)i.add(o,l)}}for(let o of e.imports){let s=i.get(o);s.length>0&&r("error","Some rules exported by this grammar are also included in other imports: "+ie(s).distinct().join(", "),{node:o,property:"path"})}}getDuplicateExportedRules(e,r){let i=e.filter(a=>!r.includes(a)).flatMap(a=>a.rules),o=r.flatMap(a=>a.rules),s=new Set;for(let a of i){let c=a.name;for(let u of o){let l=u.name;c===l&&s.add(u.name)}}return s}checkGrammarTypeInfer(e,r){var n,i,o;let s=new Set;for(let c of e.types)s.add(c.name);for(let c of e.interfaces)s.add(c.name);for(let c of Tc(this.documents,e))c.types.forEach(u=>s.add(u.name)),c.interfaces.forEach(u=>s.add(u.name));for(let c of e.rules.filter(K)){if(yc(c))continue;let u=Ur(c),l=!c.returnType&&!c.dataType,f=Dn(c);if(!u&&f&&s.has(f)===l){if((l||((n=c.returnType)===null||n===void 0?void 0:n.ref)!==void 0)&&c.inferredType===void 0)r("error",a(f,l),{node:c,property:"name",data:Fr(Ce.MissingReturns)});else if(l||((i=c.returnType)===null||i===void 0?void 0:i.ref)!==void 0){let m=Yr(c.inferredType.$cstNode,"infers");r("error",a(f,l),{node:c.inferredType,property:"name",data:{code:Ce.InvalidInfers,actionSegment:ir(m)}})}}else if(u&&l){let m=Yr(c.$cstNode,"infer");r("error","Data type rules cannot infer a type.",{node:c,property:"inferredType",data:{code:Ce.InvalidInfers,actionSegment:ir(m)}})}}for(let c of Ze(e).filter($e)){let u=this.getActionType(c);if(u){let l=!!c.inferredType,f=Dn(c);if(c.type&&f&&s.has(f)===l){let m=l?Yr(c.$cstNode,"infer"):Yr(c.$cstNode,"{");r("error",a(f,l),{node:c,property:"type",data:{code:l?Ce.SuperfluousInfer:Ce.MissingInfer,actionSegment:ir(m)}})}else if(u&&f&&s.has(f)&&l&&c.$cstNode){let m=Yt((o=c.inferredType)===null||o===void 0?void 0:o.$cstNode,"name"),T=Yr(c.$cstNode,"{");m&&T&&r("error",`${f} is a declared type and cannot be redefined.`,{node:c,property:"type",data:{code:Ce.SuperfluousInfer,actionRange:{start:T.range.end,end:m.range.start}}})}}}function a(c,u){return u?`The type '${c}' is already explicitly declared and cannot be inferred.`:`The type '${c}' is not explicitly declared and must be inferred.`}}getActionType(e){var r;if(e.type)return(r=e.type)===null||r===void 0?void 0:r.ref;if(e.inferredType)return e.inferredType}checkGrammarHiddenTokens(e,r){e.definesHiddenTokens&&r("error","Hidden terminals are declared at the terminal definition.",{node:e,property:"definesHiddenTokens",data:Fr(Ce.HiddenGrammarTokens)})}checkHiddenTerminalRule(e,r){e.hidden&&e.fragment&&r("error","Cannot use terminal fragments as hidden tokens.",{node:e,property:"hidden"})}checkEmptyTerminalRule(e,r){try{let n=Qr(e);new RegExp(n).test("")&&r("error","This terminal could match an empty string.",{node:e,property:"name"})}catch{}}checkInvalidRegexFlags(e,r){let n=e.regex;if(n){let i=n.lastIndexOf("/"),o=n.substring(i+1),s="gmy",c=s+"isu",u=new Set,l=new Set;for(let m=0;m<o.length;m++){let T=o.charAt(m);c.includes(T)?s.includes(T)&&l.add(T):u.add(T)}let f=this.getFlagRange(e);f&&(u.size>0?r("error",`'${Array.from(u).join("")}' ${u.size>1?"are":"is"} not valid regular expression flag${u.size>1?"s":""}.`,{node:e,range:f}):l.size>0&&r("warning",`'${Array.from(l).join("")}' regular expression flag${l.size>1?"s":""} will be ignored by Langium.`,{node:e,range:f}))}}checkDirectlyUsedRegexFlags(e,r){if(!we(e.$container)){let n=this.getFlagRange(e);n&&r("warning","Regular expression flags are only applied if the terminal is not a composition",{node:e,range:n})}}getFlagRange(e){let r=Yt(e.$cstNode,"regex");if(!r||!e.regex)return;let n=e.regex,i=n.lastIndexOf("/")+1;return{start:{line:r.range.end.line,character:r.range.end.character-n.length+i},end:r.range.end}}checkUsedHiddenTerminalRule(e,r){let n=Pe(e,i=>we(i)||K(i));if(n){if("hidden"in n&&n.hidden)return;let i=e.rule.ref;we(i)&&i.hidden&&r("error","Cannot use hidden terminal in non-hidden rule",{node:e,property:"rule"})}}checkUsedFragmentTerminalRule(e,r){let n=e.rule.ref;we(n)&&n.fragment&&Pe(e,K)&&r("error","Cannot use terminal fragments as part of parser rules.",{node:e,property:"rule"})}checkCrossReferenceSyntax(e,r){e.deprecatedSyntax&&r("error","'|' is deprecated. Please, use ':' instead.",{node:e,property:"deprecatedSyntax",data:Fr(Ce.CrossRefTokenSyntax)})}checkPackageImport(e,r){fi(this.documents,e)===void 0?r("error","Import cannot be resolved.",{node:e,property:"path"}):e.path.endsWith(".langium")&&r("warning","Imports do not need file extensions.",{node:e,property:"path",data:Fr(Ce.UnnecessaryFileExtension)})}checkInvalidCharacterRange(e,r){if(e.right){let n="Character ranges cannot use more than one character",i=!1;e.left.value.length>1&&(i=!0,r("error",n,{node:e.left,property:"value"})),e.right.value.length>1&&(i=!0,r("error",n,{node:e.right,property:"value"})),i||r("hint","Consider using regex instead of character ranges",{node:e,data:Fr(Ce.UseRegexTokens)})}}checkGrammarForUnusedRules(e,r){let n=Ss(e,!0);for(let i of e.rules)we(i)&&i.hidden||yc(i)||n.has(i)||r("hint","This rule is declared but never referenced.",{node:i,property:"name",tags:[Al.DiagnosticTag.Unnecessary]})}checkClashingTerminalNames(e,r){let n=new Me,i=new Set;for(let u of e.rules)we(u)&&u.name&&n.add(u.name,u),K(u)&&Ze(u).filter(pt).forEach(f=>i.add(f.value));let o=new Me,s=new Me;for(let u of e.imports){let l=Tc(this.documents,u);for(let f of l)for(let m of f.rules)we(m)&&m.name?o.add(m.name,u):K(m)&&m.name&&Ze(m).filter(pt).forEach(S=>s.add(S.value,u))}for(let u of n.values())if(i.has(u.name))r("error","Terminal name clashes with existing keyword.",{node:u,property:"name"});else if(s.has(u.name)){let l=s.get(u.name);r("error",`Terminal name clashes with imported keyword from "${l[0].path}".`,{node:u,property:"name"})}let a=new Me;for(let u of i)for(let l of o.get(u))a.add(l,u);for(let[u,l]of a.entriesGroupedByKey())l.length>0&&r("error",`Imported terminals (${l.join(", ")}) clash with locally defined keywords.`,{node:u,property:"path"});let c=new Me;for(let[u,l]of o.entriesGroupedByKey()){let f=s.get(u);f.length>0&&l.filter(m=>!f.includes(m)).forEach(m=>c.add(m,u))}for(let[u,l]of c.entriesGroupedByKey())l.length>0&&r("error",`Imported terminals (${l.join(", ")}) clash with imported keywords.`,{node:u,property:"path"})}checkRuleName(e,r){if(e.name&&!yc(e)){let n=e.name.substring(0,1);n.toUpperCase()!==n&&r("warning","Rule name should start with an upper case letter.",{node:e,property:"name",data:Fr(Ce.RuleNameUppercase)})}}checkTypeReservedName(e,r){this.checkReservedName(e,"name",r)}checkAssignmentReservedName(e,r){this.checkReservedName(e,"feature",r)}checkParserRuleReservedName(e,r){e.inferredType||this.checkReservedName(e,"name",r)}checkReservedName(e,r,n){let i=e[r];typeof i=="string"&&rI.has(i)&&n("error",`'${i}' is a reserved name of the JavaScript runtime.`,{node:e,property:r})}checkKeyword(e,r){Pe(e,K)&&(e.value.length===0?r("error","Keywords cannot be empty.",{node:e}):e.value.trim().length===0?r("error","Keywords cannot only consist of whitespace characters.",{node:e}):/\s/g.test(e.value)&&r("warning","Keywords should not contain whitespace characters.",{node:e}))}checkUnorderedGroup(e,r){e.elements.forEach(n=>{Jr(n.cardinality)&&r("error","Optional elements in Unordered groups are currently not supported",{node:n,data:Fr(Ce.OptionalUnorderedGroup)})})}checkRuleParametersUsed(e,r){let n=e.parameters;if(n.length>0){let i=Ze(e).filter(ds);for(let o of n)i.some(s=>s.parameter.ref===o)||r("hint",`Parameter '${o.name}' is unused.`,{node:o,tags:[Al.DiagnosticTag.Unnecessary]})}}checkParserRuleDataType(e,r){if(yc(e))return;let n=PR(e),i=Ur(e);!n&&i?r("error","This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.",{node:e,property:"name"}):n&&!i&&r("error","Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.",{node:e,property:e.dataType?"dataType":"returnType"})}checkAssignmentToFragmentRule(e,r){e.terminal&&Ie(e.terminal)&&K(e.terminal.rule.ref)&&e.terminal.rule.ref.fragment&&r("error",`Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`,{node:e,property:"terminal"})}checkAssignmentTypes(e,r){if(!e.terminal)return;let n;Ze(e.terminal).map(o=>Vt(o)?"ref":"other").find(o=>n?o!==n:(n=o,!1))&&r("error",this.createMixedTypeError(e.feature),{node:e,property:"terminal"})}checkInterfacePropertyTypes(e,r){for(let n of e.attributes)if(n.type){let i=No(n.type),o=gc(i),s=!1,a=!1;for(let c of o)bs(c)?s=!0:bs(c)||(a=!0);s&&a&&r("error",this.createMixedTypeError(n.name),{node:n,property:"type"})}}createMixedTypeError(e){return`Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.`}checkTerminalRuleReturnType(e,r){var n;!((n=e.type)===null||n===void 0)&&n.name&&!xs(e.type.name)&&r("error","Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.",{node:e.type,property:"name"})}checkRuleCallParameters(e,r){let n=e.rule.ref;if(K(n)){let i=n.parameters.length,o=e.arguments.length;i!==o&&r("error",`Rule '${n.name}' expects ${i} arguments, but got ${o}.`,{node:e})}else we(n)&&e.arguments.length>0&&r("error","Terminal rules do not accept any arguments",{node:e})}checkCrossRefNameAssignment(e,r){!e.terminal&&e.type.ref&&!vc(e.type.ref)&&r("error","Cannot infer terminal or data type rule for cross-reference.",{node:e,property:"type"})}checkCrossRefTerminalType(e,r){var n;let i=e.terminal;if(Ie(i)){let o=i.rule.ref;K(o)&&!Ur(o)?r("error","Parser rules cannot be used for cross-references.",{node:i,property:"rule"}):K(o)&&!DR(o)?r("error","Data type rules for cross-references must be of type string.",{node:i,property:"rule"}):we(o)&&(!((n=o.type)===null||n===void 0)&&n.name)&&o.type.name!=="string"&&r("error","Terminal rules for cross-references must be of type string.",{node:i,property:"rule"})}}checkCrossRefType(e,r){let n=this.checkReferenceToRuleButNotType(e?.type);n&&r("error",n,{node:e,property:"type"})}checkCrossReferenceToTypeUnion(e,r){if(Mt(e.type.ref)&&Xr(e.type.ref.type)){let n=IR(e.type.ref.type);n.length>0&&r("error",`Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length>1?"are":"is"} not ${n.length>1?"":"an "}AST node${n.length>1?"s":""}.`,{node:e,property:"type"})}}checkFragmentsInTypes(e,r){var n,i;K((n=e.typeRef)===null||n===void 0?void 0:n.ref)&&(!((i=e.typeRef)===null||i===void 0)&&i.ref.fragment)&&r("error","Cannot use rule fragments in types.",{node:e,property:"typeRef"})}checkReferenceTypeUnion(e,r){or(e.referenceType)||r("error","Only direct rule references are allowed in reference types.",{node:e,property:"referenceType"})}checkReferenceToRuleButNotType(e){if(e&&K(e.ref)&&!Ur(e.ref)&&(e.ref.returnType||e.ref.inferredType)){let r=Dn(e.ref);if(r)return`Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross-references.`}}checkAssignmentWithFeatureName(e,r){e.feature==="name"&&Vt(e.terminal)&&r("warning",'The "name" property is not recommended for cross-references.',{node:e,property:"feature"})}};function yc(t){return!t.definition||!t.definition.$cstNode||t.definition.$cstNode.length===0}var rI=new Set(["Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array","BigInt64Array","BigUint64Array","Map","Set","WeakMap","WeakSet","Error","AggregateError","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError","BigInt","RegExp","Number","Object","Function","Symbol","String","Math","NaN","Infinity","isFinite","isNaN","Buffer","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","globalThis","decodeURIComponent","decodeURI","encodeURIComponent","encodeURI","parseInt","parseFloat","Promise","Generator","GeneratorFunction","AsyncFunction","AsyncGenerator","AsyncGeneratorFunction","Reflect","Proxy","Date","Intl","eval","undefined"]);function IR(t){let e=[];return t.types.forEach(r=>{var n;or(r)&&(!((n=r.typeRef)===null||n===void 0)&&n.ref?Mt(r.typeRef.ref)&&(Xr(r.typeRef.ref.type)?e.push(...IR(r.typeRef.ref.type)):e.push(r.typeRef.ref.name)):r.stringType?e.push(`"${r.stringType}"`):r.primitiveType&&e.push(r.primitiveType))}),Array.from(new Set(e))}function Jr(t,e){return t==="?"||t==="*"||Ft(e)&&!!e.guardCondition}function OR(t){return t==="*"||t==="+"}function Ur(t){return LR(t,new Set)}function LR(t,e){if(e.has(t))return!0;e.add(t);for(let r of Ze(t))if(Ie(r)){if(!r.rule.ref||K(r.rule.ref)&&!LR(r.rule.ref,e))return!1}else{if(xe(r))return!1;if($e(r))return!1}return!!t.definition}function PR(t){var e;let r=(e=t.returnType)===null||e===void 0?void 0:e.ref;return t.dataType!==void 0||Mt(r)&&nI(r)}function nI(t){return Ch(t.type,new Set)}function Ch(t,e){if(e.has(t))return!0;if(e.add(t),wo(t))return!1;if(Co(t))return!1;if(Xr(t))return t.types.every(r=>Ch(r,e));if(or(t)){if(t.primitiveType!==void 0)return!0;if(t.stringType!==void 0)return!0;if(t.typeRef!==void 0){let r=t.typeRef.ref;return Mt(r)?Ch(r.type,e):!1}else return!1}else return!1}function DR(t){return Rc(t,new Set)}function Rc(t,e){var r,n;if(e.has(t))return!0;if(e.add(t),K(t)){if(t.dataType)return t.dataType==="string";if(!((r=t.returnType)===null||r===void 0)&&r.ref)return Rc(t.returnType.ref,e)}else{if(Mt(t))return Rc(t.type,e);if(wo(t))return!1;if(Co(t))return!1;if(Xr(t))return t.types.every(i=>Rc(i,e));if(or(t)){if(t.primitiveType==="string")return!0;if(t.stringType)return!0;if(!((n=t.typeRef)===null||n===void 0)&&n.ref)return Rc(t.typeRef.ref,e)}}return!1}function kh(t){let e=t.$container;if(Ft(e)){let r=e.elements,n=r.indexOf(t);for(let i=n-1;i>=0;i--){let o=r[i];if($e(o))return o;{let s=Ze(r[i]).find($e);if(s)return s}}}if(us(e))return kh(e)}function Tn(t){var e;if(K(t))return Ur(t)?t.name:(e=Cs(t))!==null&&e!==void 0?e:t.name;if(wr(t)||Mt(t)||ps(t))return t.name;if($e(t)){let r=As(t);if(r)return r}else if(fs(t))return t.name;throw new gl("Cannot get name of Unknown Type",t.$cstNode)}function Dn(t){if(t)try{return Tn(t)}catch{return}}function Cs(t){if(t.inferredType)return t.inferredType.name;if(t.dataType)return t.dataType;if(t.returnType){let e=t.returnType.ref;if(e){if(K(e))return e.name;if(wr(e)||Mt(e))return e.name}}}function As(t){var e;if(t.inferredType)return t.inferredType.name;if(!((e=t.type)===null||e===void 0)&&e.ref)return Tn(t.type.ref)}function $o(t){var e,r,n;return we(t)?(r=(e=t.type)===null||e===void 0?void 0:e.name)!==null&&r!==void 0?r:"string":Ur(t)?t.name:(n=Cs(t))!==null&&n!==void 0?n:t.name}function Qr(t){let e={s:!1,i:!1,u:!1},r=ks(t.definition,e),n=Object.entries(e).filter(([,i])=>i).map(([i])=>i).join("");return new RegExp(r,n)}var Eh=/[\s\S]/.source;function ks(t,e){if(Wv(t))return iI(t);if(zv(t))return oI(t);if(ul(t))return cI(t);if(ll(t)){let r=t.rule.ref;if(!r)throw new Error("Missing rule reference.");return di(ks(r.definition),{cardinality:t.cardinality,lookahead:t.lookahead})}else{if(qv(t))return aI(t);if(Jv(t))return sI(t);if(Gv(t)){let r=t.regex.lastIndexOf("/"),n=t.regex.substring(1,r),i=t.regex.substring(r+1);return e&&(e.i=i.includes("i"),e.s=i.includes("s"),e.u=i.includes("u")),di(n,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}else{if(Zv(t))return di(Eh,{cardinality:t.cardinality,lookahead:t.lookahead});throw new Error(`Invalid terminal element: ${t?.$type}`)}}}function iI(t){return di(t.elements.map(e=>ks(e)).join("|"),{cardinality:t.cardinality,lookahead:t.lookahead})}function oI(t){return di(t.elements.map(e=>ks(e)).join(""),{cardinality:t.cardinality,lookahead:t.lookahead})}function sI(t){return di(`${Eh}*?${ks(t.terminal)}`,{cardinality:t.cardinality,lookahead:t.lookahead})}function aI(t){return di(`(?!${ks(t.terminal)})${Eh}*?`,{cardinality:t.cardinality,lookahead:t.lookahead})}function cI(t){return t.right?di(`[${wh(t.left)}-${wh(t.right)}]`,{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1}):di(wh(t.left),{cardinality:t.cardinality,lookahead:t.lookahead,wrap:!1})}function wh(t){return ui(t.value)}function di(t,e){var r;return(e.wrap!==!1||e.lookahead)&&(t=`(${(r=e.lookahead)!==null&&r!==void 0?r:""}${t})`),e.cardinality?`${t}${e.cardinality}`:t}function _h(t){if(t.path===void 0||t.path.length===0)return;let e=ve.dirname(ne(t).uri),r=t.path;return r.endsWith(".langium")||(r+=".langium"),ve.resolvePath(e,r)}function fi(t,e){let r=_h(e);try{if(r){let i=t.getOrCreateDocument(r).parseResult.value;if(ls(i))return i}}catch{}}function Tc(t,e){if(al(e)){let r=fi(t,e);if(r){let n=Ah(t,r);return n.push(r),n}return[]}else return Ah(t,e)}function Ah(t,e,r=e,n=new Set,i=new Set){let o=ne(e);if(r!==e&&i.add(e),!n.has(o.uri)){n.add(o.uri);for(let s of e.imports){let a=fi(t,s);a&&Ah(t,a,r,n,i)}}return Array.from(i)}function ws(t){return xe(t)?[t]:Dr(t)||Ft(t)||Or(t)?t.elements.flatMap(e=>ws(e)):Ie(t)&&t.rule.ref?ws(t.rule.ref.definition):[]}var uI=["string","number","boolean","Date","bigint"];function xs(t){return uI.includes(t)}var Nh=class{constructor(e,r){this.context=e,this.root=r}getTypes(){let e={name:this.root.name,properties:this.root.properties,ruleCalls:this.root.ruleCalls,super:[]};return this.root.children.length===0?[{alt:e,next:[]}]:this.applyNext(this.root,{alt:e,next:this.root.children})}applyNext(e,r){let n=this.splitType(r.alt,r.next.length),i=[];for(let o=0;o<r.next.length;o++){let s=n[o],a=r.next[o];a.actionWithAssignment&&i.push({alt:MR(s),next:[]}),a.name!==void 0&&a.name!==s.name&&(a.actionWithAssignment?(s.properties=[],s.ruleCalls=[],s.super=[e.name],s.name=a.name):(s.super=[s.name,...s.ruleCalls],s.properties=[],s.ruleCalls=[],s.name=a.name)),s.properties.push(...a.properties),s.ruleCalls.push(...a.ruleCalls);let c={alt:s,next:a.children};c.next.length===0?(c.alt.super=c.alt.super.filter(u=>u!==c.alt.name),i.push(c)):i.push(...this.applyNext(e,c))}return GR(i)}splitType(e,r){let n=[];for(let i=0;i<r;i++)n.push(MR(e));return n}getSuperTypes(e){let r=new Set;return this.collectSuperTypes(e,e,r),Array.from(r)}collectSuperTypes(e,r,n){if(r.ruleCalls.length>0){for(let i of r.ruleCalls)n.add(i);return}for(let i of r.parents)e.name===void 0?this.collectSuperTypes(i,i,n):i.name!==void 0&&i.name!==e.name?n.add(i.name):this.collectSuperTypes(e,i,n);r.parents.length===0&&r.name&&n.add(r.name)}connect(e,r){return r.parents.push(e),e.children.push(r),r}merge(...e){if(e.length===1)return e[0];if(e.length===0)throw new Error("No parts to merge");let r=Io();r.parents=e;for(let n of e)n.children.push(r);return r}hasLeafNode(e){return this.partHasLeafNode(e)}partHasLeafNode(e,r){return e.children.some(n=>n!==r)?!0:e.name?!1:e.parents.some(n=>this.partHasLeafNode(n,e))}};function lI(t){return{name:t.name,children:[],parents:[],actionWithAssignment:t.actionWithAssignment,ruleCalls:[...t.ruleCalls],properties:t.properties.map(FR)}}function MR(t){return{name:t.name,super:t.super,ruleCalls:t.ruleCalls,properties:t.properties.map(e=>FR(e))}}function FR(t){return{name:t.name,optional:t.optional,type:t.type,astNodes:t.astNodes}}function UR(t,e,r){let n=[],i={fragments:new Map};for(let c of t)n.push(...qR(i,c));let o=gI(n),s=yI(o),a=TI(o,s,r);for(let c of e){let u=fI(c);a.unions.push({name:c.name,declared:!1,type:u,subTypes:new Set,superTypes:new Set,dataType:c.dataType})}return a}function fI(t){if(t.dataType&&t.dataType!=="string")return{primitive:t.dataType};let e=!1,r=()=>(e=!0,{primitive:"unknown"}),n=$h(t.definition,r);return e?{primitive:"string"}:n}function $h(t,e){var r,n,i;if(t.cardinality)return e();if(Dr(t))return{types:t.elements.map(o=>$h(o,e))};if(Ft(t)||Or(t))return t.elements.length!==1?e():$h(t.elements[0],e);if(Ie(t)){let o=(r=t.rule)===null||r===void 0?void 0:r.ref;return o?we(o)?{primitive:(i=(n=o.type)===null||n===void 0?void 0:n.name)!==null&&i!==void 0?i:"string",regex:Qr(o).toString()}:{value:o.name}:e()}else if(pt(t))return{string:t.value};return e()}function qR(t,e){let r=Io(e),n=new Nh(t,r);return e.definition&&Ih(n,n.root,e.definition),n.getTypes()}function Io(t){return{name:K(t)||$e(t)?Dn(t):t,properties:[],ruleCalls:[],children:[],parents:[],actionWithAssignment:!1}}function Ih(t,e,r){let n=Jr(r.cardinality,r);if(Dr(r)){let i=[];n&&i.push(t.connect(e,Io()));for(let o of r.elements){let s=t.connect(e,Io());i.push(Ih(t,s,o))}return t.merge(...i)}else if(Ft(r)||Or(r)){let i=t.connect(e,Io()),o;n&&(o=t.connect(e,Io()));for(let s of r.elements)i=Ih(t,i,s);return o?t.merge(o,i):i}else{if($e(r))return dI(t,e,r);xe(r)?pI(e,r):Ie(r)&&mI(t,e,r)}return e}function dI(t,e,r){var n;if(!t.hasLeafNode(e)){let o=lI(e);t.connect(e,o)}let i=t.connect(e,Io(r));if(r.type){let o=(n=r.type)===null||n===void 0?void 0:n.ref;o&&lc(o)&&(i.name=o.name)}return r.feature&&r.operator&&(i.actionWithAssignment=!0,i.properties.push({name:r.feature,optional:!1,type:Po(r.operator==="+=",!1,t.root.ruleCalls.length!==0?t.root.ruleCalls:t.getSuperTypes(i)),astNodes:new Set([r])})),i}function pI(t,e){let r={types:new Set,reference:!1};jR(e.terminal,r);let n=Po(e.operator==="+=",r.reference,e.operator==="?="?["boolean"]:Array.from(r.types));t.properties.push({name:e.feature,optional:Jr(e.cardinality),type:n,astNodes:new Set([e])})}function jR(t,e){if(Dr(t)||Or(t)||Ft(t))for(let r of t.elements)jR(r,e);else if(pt(t))e.types.add(`'${t.value}'`);else if(Ie(t)&&t.rule.ref)e.types.add($o(t.rule.ref));else if(Vt(t)&&t.type.ref){let r=Dn(t.type.ref);r&&e.types.add(r),e.reference=!0}}function mI(t,e,r){let n=r.rule.ref;if(K(n)&&n.fragment){let i=hI(n,t.context);Jr(r.cardinality)?e.properties.push(...i.map(o=>Object.assign(Object.assign({},o),{optional:!0}))):e.properties.push(...i)}else K(n)&&e.ruleCalls.push($o(n))}function hI(t,e){let r=e.fragments.get(t);if(r)return r;let n=[];e.fragments.set(t,n);let i=Dn(t),o=qR(e,t).filter(s=>s.alt.name===i);return n.push(...o.flatMap(s=>s.alt.properties)),n}function gI(t){let e=new Map,r=[],n=GR(t).map(i=>i.alt);for(let i of n){let o={name:i.name,properties:i.properties,superTypes:new Set(i.super),subTypes:new Set,declared:!1,abstract:!1};e.set(o.name,o),i.ruleCalls.length>0&&(r.push(i),i.ruleCalls.forEach(s=>{s!==o.name&&o.subTypes.add(s)}))}for(let i of r)for(let o of i.ruleCalls){let s=e.get(o);s&&s.name!==i.name&&s.superTypes.add(i.name)}return Array.from(e.values())}function GR(t){let e=t.reduce((n,i)=>n.add(i.alt.name,i),new Me),r=[];for(let[n,i]of e.entriesGroupedByKey()){let o=[],s=new Set,a={alt:{name:n,properties:o,ruleCalls:[],super:[]},next:[]};for(let c of i){let u=c.alt;a.alt.super.push(...u.super),a.next.push(...c.next);let l=u.properties;for(let f of l){let m=o.find(T=>T.name===f.name);m?(m.type=Sh(m.type,f.type),f.astNodes.forEach(T=>m.astNodes.add(T))):o.push(Object.assign({},f))}u.ruleCalls.forEach(f=>s.add(f))}for(let c of i){let u=c.alt;if(u.ruleCalls.length===0)for(let l of o)u.properties.find(f=>f.name===l.name)||(l.optional=!0)}a.alt.ruleCalls=Array.from(s),r.push(a)}return r}function yI(t){let e=new Map(t.map(i=>[i.name,i])),r=[],n=new Me;for(let i of t)for(let o of i.superTypes)n.add(o,i.name);for(let[i,o]of n.entriesGroupedByKey())if(!e.has(i)){let s={declared:!1,name:i,subTypes:new Set,superTypes:new Set,type:Po(!1,!1,o)};r.push(s)}return r}function TI(t,e,r){let n=new Me;for(let a of t)for(let c of a.superTypes)n.add(c,a.name);let i=new Set(r.interfaces.map(a=>a.name)),o={interfaces:[],unions:e},s=new Map(e.map(a=>[a.name,a]));for(let a of t){let c=new Set(n.get(a.name));if(a.properties.length===0&&c.size>0)if(i.has(a.name))a.abstract=!0,o.interfaces.push(a);else{let u=Po(!1,!1,Array.from(c)),l=s.get(a.name);if(l)l.type=Sh(l.type,u);else{let f={name:a.name,declared:!1,subTypes:c,superTypes:a.superTypes,type:u};o.unions.push(f),s.set(a.name,f)}}else o.interfaces.push(a)}for(let a of o.interfaces)a.superTypes=new Set([...a.superTypes].filter(c=>!s.has(c)));return o}function Po(t,e,r){if(t)return{elementType:Po(!1,e,r)};if(e)return{referenceType:Po(!1,!1,r)};if(r.length===1){let n=r[0];return n.startsWith("'")?{string:n.substring(1,n.length-1)}:xs(n)?{primitive:n}:{value:n}}else return{types:r.map(n=>Po(!1,!1,[n]))}}function HR(t,e){let r=KR(t,e),n=ER(r.interfaces,r.types),i=UR(r.parserRules,r.datatypeRules,n);return{astResources:r,inferred:i,declared:n}}function KR(t,e,r=new Set,n={parserRules:[],datatypeRules:[],interfaces:[],types:[]}){Array.isArray(t)||(t=[t]);for(let i of t){let o=ne(i);if(!r.has(o.uri)){r.add(o.uri);for(let s of i.rules)K(s)&&!s.fragment&&(Ur(s)?n.datatypeRules.push(s):n.parserRules.push(s));if(i.interfaces.forEach(s=>n.interfaces.push(s)),i.types.forEach(s=>n.types.push(s)),e){let s=i.imports.map(a=>fi(e,a)).filter(a=>a!==void 0);KR(s,e,r,n)}}}return n}function zR(t,e){let{inferred:r,declared:n,astResources:i}=HR(t,e);return{astResources:i,inferred:WR(n,r),declared:WR(r,n)}}function WR(t,e){var r,n;let i={interfaces:vR(BR(...t.interfaces,...(r=e?.interfaces)!==null&&r!==void 0?r:[])),unions:BR(...t.unions,...(n=e?.unions)!==null&&n!==void 0?n:[])},o=NR(i);return vI(o),o}function BR(...t){return Array.from(t.reduce((e,r)=>(e.set(r.name,r),e),new Map).values()).sort((e,r)=>e.name.localeCompare(r.name))}function vI(t){let e=xI(t),r=Array.from(e.values());bI(r),SI(t.interfaces),RI(r)}function RI(t){let e=new Set,r=n=>{if(!e.has(n)){e.add(n),n.typeNames.add(n.name);for(let i of n.subTypes)r(i),i.typeNames.forEach(o=>n.typeNames.add(o))}};t.forEach(r)}function xI({interfaces:t,unions:e}){let r=t.concat(e).reduce((i,o)=>(i.set(o.name,o),i),new Map),n=new Map;for(let i of e)n.set(i,Ph(i.type,new Set));for(let[i,o]of n)o&&r.delete(i.name);return r}function Ph(t,e){if(e.has(t))return!0;if(e.add(t),Dt(t))return t.types.every(r=>Ph(r,e));if(Lr(t)){let r=t.value;return hn(r)?Ph(r.type,e):!1}else return Mr(t)||In(t)}function bI(t){for(let e of t)for(let r of e.superTypes)r.subTypes.add(e)}function SI(t){var e;let r=t.reduce((s,a)=>(s.set(a.name,a),s),new Map);for(let s of t){let a=s.properties.flatMap(c=>RR(c.type));for(let c of a)(e=r.get(c))===null||e===void 0||e.containerTypes.add(s)}let n=new Set,i=t.filter(s=>s.subTypes.size===0),o=new Set(i);for(;i.length>0;){let s=i.shift();if(s)for(let a of s.superTypes)yn(a)&&(s.containerTypes.size===0?(n.add(a.name),a.containerTypes.clear()):n.has(a.name)||s.containerTypes.forEach(c=>a.containerTypes.add(c)),o.has(a)||(o.add(a),i.push(a)))}}var wI={languageId:"langium",fileExtensions:[".langium"],caseInsensitive:!1},CI={maxLookahead:3},VR={AstReflection:()=>new rc},XR={Grammar:()=>CR(),LanguageMetaData:()=>wI,parser:{ParserConfig:()=>CI}};var xc=class{constructor(e,r,n){var i;this.elements=e,this.outerScope=r,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1}getAllElements(){return this.outerScope?this.elements.concat(this.outerScope.getAllElements()):this.elements}getElement(e){let r=this.caseInsensitive?this.elements.find(n=>n.name.toLowerCase()===e.toLowerCase()):this.elements.find(n=>n.name===e);if(r)return r;if(this.outerScope)return this.outerScope.getElement(e)}},Es=class{constructor(e,r,n){var i;this.elements=new Map,this.caseInsensitive=(i=n?.caseInsensitive)!==null&&i!==void 0?i:!1;for(let o of e){let s=this.caseInsensitive?o.name.toLowerCase():o.name;this.elements.set(s,o)}this.outerScope=r}getElement(e){let r=this.caseInsensitive?e.toLowerCase():e,n=this.elements.get(r);if(n)return n;if(this.outerScope)return this.outerScope.getElement(e)}getAllElements(){let e=ie(this.elements.values());return this.outerScope&&(e=e.concat(this.outerScope.getAllElements())),e}},YR={getElement(){},getAllElements(){return cs}};var El=de(ti(),1);var _s=class{constructor(e){this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider}async computeExports(e,r=El.CancellationToken.None){return this.computeExportsForNode(e.parseResult.value,e,void 0,r)}async computeExportsForNode(e,r,n=Di,i=El.CancellationToken.None){let o=[];this.exportNode(e,o,r);for(let s of n(e))await et(i),this.exportNode(s,o,r);return o}exportNode(e,r,n){let i=this.nameProvider.getName(e);i&&r.push(this.descriptions.createDescription(e,i,n))}async computeLocalScopes(e,r=El.CancellationToken.None){let n=e.parseResult.value,i=new Me;for(let o of Ze(n))await et(r),this.processNode(o,e,i);return i}processNode(e,r,n){let i=e.$container;if(i){let o=this.nameProvider.getName(e);o&&n.add(i,this.descriptions.createDescription(e,o,r))}}};var _l=class{constructor(){this.toDispose=[],this.isDisposed=!1}onDispose(e){this.toDispose.push(e)}dispose(){this.throwIfDisposed(),this.clear(),this.isDisposed=!0,this.toDispose.forEach(e=>e.dispose())}throwIfDisposed(){if(this.isDisposed)throw new Error("This cache has already been disposed")}},Dh=class extends _l{constructor(){super(...arguments),this.cache=new Map}has(e){return this.throwIfDisposed(),this.cache.has(e)}set(e,r){this.throwIfDisposed(),this.cache.set(e,r)}get(e,r){if(this.throwIfDisposed(),this.cache.has(e))return this.cache.get(e);if(r){let n=r();return this.cache.set(e,n),n}else return}delete(e){return this.throwIfDisposed(),this.cache.delete(e)}clear(){this.throwIfDisposed(),this.cache.clear()}},Nl=class extends _l{constructor(e){super(),this.cache=new Map,this.converter=e??(r=>r)}has(e,r){return this.throwIfDisposed(),this.cacheForContext(e).has(r)}set(e,r,n){this.throwIfDisposed(),this.cacheForContext(e).set(r,n)}get(e,r,n){this.throwIfDisposed();let i=this.cacheForContext(e);if(i.has(r))return i.get(r);if(n){let o=n();return i.set(r,o),o}else return}delete(e,r){return this.throwIfDisposed(),this.cacheForContext(e).delete(r)}clear(e){if(this.throwIfDisposed(),e){let r=this.converter(e);this.cache.delete(r)}else this.cache.clear()}cacheForContext(e){let r=this.converter(e),n=this.cache.get(r);return n||(n=new Map,this.cache.set(r,n)),n}};var $l=class extends Dh{constructor(e){super(),this.onDispose(e.workspace.DocumentBuilder.onUpdate(()=>{this.clear()}))}};var Ns=class{constructor(e){this.reflection=e.shared.AstReflection,this.nameProvider=e.references.NameProvider,this.descriptions=e.workspace.AstNodeDescriptionProvider,this.indexManager=e.shared.workspace.IndexManager,this.globalScopeCache=new $l(e.shared)}getScope(e){let r=[],n=this.reflection.getReferenceType(e),i=ne(e.container).precomputedScopes;if(i){let s=e.container;do{let a=i.get(s);a.length>0&&r.push(ie(a).filter(c=>this.reflection.isSubtype(c.type,n))),s=s.$container}while(s)}let o=this.getGlobalScope(n,e);for(let s=r.length-1;s>=0;s--)o=this.createScope(r[s],o);return o}createScope(e,r,n){return new xc(ie(e),r,n)}createScopeForNodes(e,r,n){let i=ie(e).map(o=>{let s=this.nameProvider.getName(o);if(s)return this.descriptions.createDescription(o,s)}).nonNullable();return new xc(i,r,n)}getGlobalScope(e,r){return this.globalScopeCache.get(e,()=>new Es(this.indexManager.allElements(e)))}};var Il=class extends Ns{constructor(e){super(e),this.langiumDocuments=e.shared.workspace.LangiumDocuments}getScope(e){let r=this.reflection.getReferenceType(e);return r===So?this.getTypeScope(r,e):super.getScope(e)}getTypeScope(e,r){let n,i=ne(r.container).precomputedScopes,o=fl(r.container);if(i&&o){let a=i.get(o);a.length>0&&(n=ie(a).filter(c=>c.type===nc||c.type===ic))}let s=this.getGlobalScope(e,r);return n?this.createScope(n,s):s}getGlobalScope(e,r){let n=Pe(r.container,ls);if(!n)return YR;let i=new Set;this.gatherImports(n,i);let o=this.indexManager.allElements(e,i);return e===So&&(o=o.filter(s=>s.type===nc||s.type===ic)),new Es(o)}gatherImports(e,r){for(let n of e.imports){let i=_h(n);if(i&&!r.has(i.toString())&&(r.add(i.toString()),this.langiumDocuments.hasDocument(i))){let s=this.langiumDocuments.getOrCreateDocument(i).parseResult.value;ls(s)&&this.gatherImports(s,r)}}}},Pl=class extends _s{constructor(e){super(e),this.astNodeLocator=e.workspace.AstNodeLocator}exportNode(e,r,n){var i;if(super.exportNode(e,r,n),K(e)){if(!e.returnType&&!e.dataType){let o=(i=e.inferredType)!==null&&i!==void 0?i:e;r.push(this.createInterfaceDescription(o,o.name,n))}Ze(e).forEach(o=>{if($e(o)&&o.inferredType){let s=As(o);s&&r.push(this.createInterfaceDescription(o,s,n))}})}}processNode(e,r,n){ps(e)||(this.processTypeNode(e,r,n),this.processActionNode(e,r,n),super.processNode(e,r,n))}processTypeNode(e,r,n){var i;let o=e.$container;if(o&&K(e)&&!e.returnType&&!e.dataType){let s=(i=e.inferredType)!==null&&i!==void 0?i:e;n.add(o,this.createInterfaceDescription(s,s.name,r))}}processActionNode(e,r,n){let i=fl(e);if(i&&$e(e)&&e.inferredType){let o=As(e);o&&n.add(i,this.createInterfaceDescription(e,o,r))}}createInterfaceDescription(e,r,n=ne(e)){let i,o=()=>{var s;return i??(i=ir((s=this.nameProvider.getNameNode(e))!==null&&s!==void 0?s:e.$cstNode))};return{node:e,name:r,get nameSegment(){return o()},selectionSegment:ir(e.$cstNode),type:"Interface",documentUri:n.uri,path:this.astNodeLocator.getAstNodePath(e)}}};var qr=de(Ne(),1);var sr=de(Ne(),1);var Dl=class{constructor(e){this.validationRegistry=e.validation.ValidationRegistry,this.metadata=e.LanguageMetaData}async validateDocument(e,r={},n=sr.CancellationToken.None){let i=e.parseResult,o=[];if(await et(n),(!r.categories||r.categories.includes("built-in"))&&(this.processLexingErrors(i,o,r),r.stopAfterLexingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===vn.LexingError})||(this.processParsingErrors(i,o,r),r.stopAfterParsingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===vn.ParsingError}))||(this.processLinkingErrors(e,o,r),r.stopAfterLinkingErrors&&o.some(s=>{var a;return((a=s.data)===null||a===void 0?void 0:a.code)===vn.LinkingError}))))return o;try{o.push(...await this.validateAst(i.value,r,n))}catch(s){if(_o(s))throw s;console.error("An error occurred during validation:",s)}return await et(n),o}processLexingErrors(e,r,n){for(let i of e.lexerErrors){let o={severity:sr.DiagnosticSeverity.Error,range:{start:{line:i.line-1,character:i.column-1},end:{line:i.line-1,character:i.column+i.length-1}},message:i.message,data:Fr(vn.LexingError),source:this.getSource()};r.push(o)}}processParsingErrors(e,r,n){for(let i of e.parserErrors){let o;if(isNaN(i.token.startOffset)){if("previousToken"in i){let s=i.previousToken;if(isNaN(s.startOffset))o=sr.Range.create(0,0,0,0);else{let a=sr.Position.create(s.endLine-1,s.endColumn);o=sr.Range.create(a,a)}}}else o=tc(i.token);if(o){let s={severity:sr.DiagnosticSeverity.Error,range:o,message:i.message,data:Fr(vn.ParsingError),source:this.getSource()};r.push(s)}}}processLinkingErrors(e,r,n){for(let i of e.references){let o=i.error;if(o){let s={node:o.container,property:o.property,index:o.index,data:{code:vn.LinkingError,containerType:o.container.$type,property:o.property,refText:o.reference.$refText}};r.push(this.toDiagnostic("error",o.message,s))}}}async validateAst(e,r,n=sr.CancellationToken.None){let i=[],o=(s,a,c)=>{i.push(this.toDiagnostic(s,a,c))};return await Promise.all(si(e).map(async s=>{await et(n);let a=this.validationRegistry.getChecks(s.$type,r.categories);for(let c of a)await c(s,o,n)})),i}toDiagnostic(e,r,n){return{message:r,range:AI(n),severity:kI(e),code:n.code,codeDescription:n.codeDescription,tags:n.tags,relatedInformation:n.relatedInformation,data:n.data,source:this.getSource()}}getSource(){return this.metadata.languageId}};function AI(t){if(sr.Range.is(t.range))return t.range;let e;return typeof t.property=="string"?e=Yt(t.node.$cstNode,t.property,t.index):typeof t.keyword=="string"&&(e=Yr(t.node.$cstNode,t.keyword,t.index)),e??(e=t.node.$cstNode),e?e.range:{start:{line:0,character:0},end:{line:0,character:0}}}function kI(t){switch(t){case"error":return sr.DiagnosticSeverity.Error;case"warning":return sr.DiagnosticSeverity.Warning;case"info":return sr.DiagnosticSeverity.Information;case"hint":return sr.DiagnosticSeverity.Hint;default:throw new Error("Invalid diagnostic severity: "+t)}}var vn;(function(t){t.LexingError="lexing-error",t.ParsingError="parsing-error",t.LinkingError="linking-error"})(vn=vn||(vn={}));var Ol=class{constructor(e){this.reflection=e.shared.AstReflection,this.indexManager=e.shared.workspace.IndexManager}getCodeActions(e,r){let n=[],i=o=>o&&n.push(o);for(let o of r.context.diagnostics)this.createCodeActions(o,e,i);return n}createCodeActions(e,r,n){var i;switch((i=e.data)===null||i===void 0?void 0:i.code){case Ce.GrammarNameUppercase:case Ce.RuleNameUppercase:n(this.makeUpperCase(e,r));break;case Ce.HiddenGrammarTokens:n(this.fixHiddenTerminals(e,r));break;case Ce.UseRegexTokens:n(this.fixRegexTokens(e,r));break;case Ce.EntryRuleTokenSyntax:n(this.addEntryKeyword(e,r));break;case Ce.CrossRefTokenSyntax:n(this.fixCrossRefSyntax(e,r));break;case Ce.UnnecessaryFileExtension:n(this.fixUnnecessaryFileExtension(e,r));break;case Ce.MissingReturns:n(this.fixMissingReturns(e,r));break;case Ce.InvalidInfers:case Ce.InvalidReturns:n(this.fixInvalidReturnsInfers(e,r));break;case Ce.MissingInfer:n(this.fixMissingInfer(e,r));break;case Ce.SuperfluousInfer:n(this.fixSuperfluousInfer(e,r));break;case vn.LinkingError:{let o=e.data;o&&o.containerType==="RuleCall"&&o.property==="rule"&&n(this.addNewRule(e,o,r)),o&&this.lookInGlobalScope(e,o,r).forEach(n);break}}}fixMissingReturns(e,r){let n=r.textDocument.getText(e.range);if(n)return{title:`Add explicit return type for parser rule ${n}`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:`${n} returns ${n}`}]}}}}fixInvalidReturnsInfers(e,r){let n=e.data;if(n&&n.actionSegment){let i=r.textDocument.getText(n.actionSegment.range);return{title:`Correct ${i} usage`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionSegment.range,newText:i==="infers"?"returns":"infers"}]}}}}}fixMissingInfer(e,r){let n=e.data;if(n&&n.actionSegment)return{title:"Correct 'infer' usage",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:{start:n.actionSegment.range.end,end:n.actionSegment.range.end},newText:"infer "}]}}}}fixSuperfluousInfer(e,r){let n=e.data;if(n&&n.actionRange)return{title:"Remove the 'infer' keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],edit:{changes:{[r.textDocument.uri]:[{range:n.actionRange,newText:""}]}}}}fixUnnecessaryFileExtension(e,r){let n=Object.assign({},e.range.end);n.character-=1;let i=Object.assign({},n);return i.character-=8,{title:"Remove file extension",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:i,end:n},newText:""}]}}}}makeUpperCase(e,r){let n={start:e.range.start,end:{line:e.range.start.line,character:e.range.start.character+1}};return{title:"First letter to upper case",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:n,newText:r.textDocument.getText(n).toUpperCase()}]}}}}addEntryKeyword(e,r){return{title:"Add entry keyword",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:{start:e.range.start,end:e.range.start},newText:"entry "}]}}}}fixRegexTokens(e,r){let n=r.textDocument.offsetAt(e.range.start),i=r.parseResult.value.$cstNode;if(i){let o=Sr(i,n),s=Pe(o?.astNode,ul);if(s&&s.right&&s.$cstNode){let a=s.left.value,c=s.right.value;return{title:"Refactor into regular expression",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:s.$cstNode.range,newText:`/[${ui(a)}-${ui(c)}]/`}]}}}}}}fixCrossRefSyntax(e,r){return{title:"Replace '|' with ':'",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:[{range:e.range,newText:":"}]}}}}fixHiddenTerminals(e,r){let n=r.parseResult.value,i=n.hiddenTokens,o=[],s=Yt(n.$cstNode,"definesHiddenTokens");if(s){let a=s.range.start,c=s.offset,u=n.$cstNode.text.indexOf(")",c)+1;o.push({newText:"",range:{start:a,end:r.textDocument.positionAt(u)}})}for(let a of i){let c=a.ref;if(c&&we(c)&&!c.hidden&&c.$cstNode){let u=c.$cstNode.range.start;o.push({newText:"hidden ",range:{start:u,end:u}})}}return{title:"Fix hidden terminals",kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!0,edit:{changes:{[r.textDocument.uri]:o}}}}addNewRule(e,r,n){let i=n.textDocument.offsetAt(e.range.start),o=n.parseResult.value.$cstNode;if(o){let s=Sr(o,i),a=Pe(s?.astNode,K);if(a&&a.$cstNode)return{title:`Add new rule '${r.refText}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:a.$cstNode.range.end,end:a.$cstNode.range.end},newText:`

`+r.refText+`:
    /* TODO implement rule */ {infer `+r.refText+"};"}]}}}}}lookInGlobalScope(e,r,n){var i,o;let s={container:{$type:r.containerType},property:r.property,reference:{$refText:r.refText}},a=this.reflection.getReferenceType(s),c=this.indexManager.allElements(a).filter(m=>m.name===r.refText),u=[],l=-1,f=-1;for(let m of c){if(ve.equals(m.documentUri,n.uri))continue;let T=EI(n.uri,m.documentUri),S,C="",N=n.parseResult.value,A=N.imports.find(v=>v.path&&T<v.path);if(A)S=(i=A.$cstNode)===null||i===void 0?void 0:i.range.start;else if(N.imports.length>0){let v=N.imports[N.imports.length-1].$cstNode.range.end;v&&(S={line:v.line+1,character:0})}else N.rules.length>0&&(S=(o=N.rules[0].$cstNode)===null||o===void 0?void 0:o.range.start,C=`
`);S&&((l<0||T.length<f)&&(l=u.length,f=T.length),u.push({title:`Add import to '${T}'`,kind:qr.CodeActionKind.QuickFix,diagnostics:[e],isPreferred:!1,edit:{changes:{[n.textDocument.uri]:[{range:{start:S,end:S},newText:`import '${T}'
${C}`}]}}}))}return l>=0&&(u[l].isPreferred=!0),u}};function EI(t,e){let r=ve.dirname(t),n=ve.relative(r,e);return!n.startsWith("./")&&!n.startsWith("../")&&(n="./"+n),n.endsWith(".langium")&&(n=n.substring(0,n.length-8)),n}var ex=de(ho(),1);var Ps=de(Ne(),1);function Oh(t,e){let r={stacks:t,tokens:e};return _I(r),r.stacks.flat().forEach(i=>{i.property=void 0}),QR(r.stacks).map(i=>i[i.length-1])}function Lh(t){let{next:e,cardinalities:r,visited:n,plus:i}=t,o=[],s=e.feature;if(n.has(s))return[];n.add(s);let a,c=s;for(;c.$container;)if(Ft(c.$container)){a=c.$container;break}else if(us(c.$container))c=c.$container;else break;if(OR(c.cardinality)){let u=$s({next:{feature:c,type:e.type,new:!1},cardinalities:r,visited:n,plus:i});for(let l of u)i.add(l.feature);o.push(...u)}if(a){let u=a.elements.indexOf(c);u!==void 0&&u<a.elements.length-1&&o.push(...JR({feature:a,type:e.type,new:!1},u+1,r,n,i)),o.every(l=>Jr(l.feature.cardinality,l.feature)||Jr(r.get(l.feature))||i.has(l.feature))&&o.push(...Lh({next:{feature:a,type:e.type,new:!1},cardinalities:r,visited:n,plus:i}))}return o}function bc(t){return Et(t)&&(t={feature:t}),$s({next:t,cardinalities:new Map,visited:new Set,plus:new Set})}function $s(t){var e,r,n;let{next:i,cardinalities:o,visited:s,plus:a}=t;if(i===void 0)return[];let{feature:c,type:u}=i;if(Ft(c)){if(s.has(c))return[];s.add(c)}if(Ft(c))return JR(i,0,o,s,a).map(l=>Ll(l,c.cardinality,o));if(Dr(c)||Or(c))return c.elements.flatMap(l=>$s({next:{feature:l,new:!1,type:u},cardinalities:o,visited:s,plus:a})).map(l=>Ll(l,c.cardinality,o));if(xe(c)){let l={feature:c.terminal,new:!1,type:u,property:(e=i.property)!==null&&e!==void 0?e:c.feature};return $s({next:l,cardinalities:o,visited:s,plus:a}).map(f=>Ll(f,c.cardinality,o))}else{if($e(c))return Lh({next:{feature:c,new:!0,type:Tn(c),property:(r=i.property)!==null&&r!==void 0?r:c.feature},cardinalities:o,visited:s,plus:a});if(Ie(c)&&K(c.rule.ref)){let l=c.rule.ref,f={feature:l.definition,new:!0,type:l.fragment?void 0:(n=Cs(l))!==null&&n!==void 0?n:l.name,property:i.property};return $s({next:f,cardinalities:o,visited:s,plus:a}).map(m=>Ll(m,c.cardinality,o))}else return[i]}}function Ll(t,e,r){return r.set(t.feature,e),t}function JR(t,e,r,n,i){var o;let s=[],a;for(;e<t.feature.elements.length&&(a={feature:t.feature.elements[e++],new:!1,type:t.type},s.push(...$s({next:a,cardinalities:r,visited:n,plus:i})),!!Jr((o=a.feature.cardinality)!==null&&o!==void 0?o:r.get(a.feature),a.feature)););return s}function _I(t){for(let e of t.tokens){let r=QR(t.stacks,e);t.stacks=r}}function QR(t,e){let r=[];for(let n of t)r.push(...NI(n,e));return r}function NI(t,e){let r=new Map,n=new Set(t.map(o=>o.feature).filter($I)),i=[];for(;t.length>0;){let o=t.pop(),s=Lh({next:o,cardinalities:r,plus:n,visited:new Set}).filter(a=>e?Mh(a.feature,e):!0);for(let a of s)i.push([...t,a]);if(!s.every(a=>Jr(a.feature.cardinality,a.feature)||Jr(r.get(a.feature))))break}return i}function $I(t){if(t.cardinality==="+")return!0;let e=Pe(t,xe);return!!(e&&e.cardinality==="+")}function Mh(t,e){if(pt(t))return t.value===e.image;if(Ie(t))return II(t.rule.ref,e);if(Vt(t)){let r=Ml(t);if(r)return Mh(r,e)}return!1}function II(t,e){return K(t)?bc(t.definition).some(n=>Mh(n.feature,e)):we(t)?Qr(t).test(e.image):!1}function ZR(t){let e=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.triggerCharacters)!==null&&i!==void 0?i:[]}))),r=Array.from(new Set(t.flatMap(n=>{var i;return(i=n?.allCommitCharacters)!==null&&i!==void 0?i:[]})));return{triggerCharacters:e.length>0?e:void 0,allCommitCharacters:r.length>0?r:void 0}}var Is=class{constructor(e){this.scopeProvider=e.references.ScopeProvider,this.grammar=e.Grammar,this.completionParser=e.parser.CompletionParser,this.nameProvider=e.references.NameProvider,this.lexer=e.parser.Lexer,this.nodeKindProvider=e.shared.lsp.NodeKindProvider,this.fuzzyMatcher=e.shared.lsp.FuzzyMatcher,this.grammarConfig=e.parser.GrammarConfig}async getCompletion(e,r){let n=[],i=this.buildContexts(e,r.position),o=(c,u)=>{let l=this.fillCompletionItem(c,u);l&&n.push(l)},s=c=>pt(c.feature)?c.feature.value:c.feature,a=[];for(let c of i)if(await Promise.all(ie(c.features).distinct(s).exclude(a).map(u=>this.completionFor(c,u,o))),a.push(...c.features),!this.continueCompletion(n))break;return Ps.CompletionList.create(this.deduplicateItems(n),!0)}deduplicateItems(e){return ie(e).distinct(r=>`${r.kind}_${r.label}_${r.detail}`).toArray()}findFeaturesAt(e,r){let n=e.getText({start:Ps.Position.create(0,0),end:e.positionAt(r)}),i=this.completionParser.parse(n),o=i.tokens;if(i.tokenIndex===0){let c=Fl(this.grammar),u=bc({feature:c.definition,new:!0,type:Cs(c)});return o.length>0?(o.shift(),Oh(u.map(l=>[l]),o)):u}let s=[...o].splice(i.tokenIndex);return Oh([i.elementStack.map(c=>({feature:c}))],s)}*buildContexts(e,r){var n,i,o,s,a;let c=e.parseResult.value.$cstNode;if(!c)return;let u=e.textDocument,l=u.getText(),f=u.offsetAt(r),m={document:e,textDocument:u,offset:f,position:r},T=this.findDataTypeRuleStart(c,f);if(T){let[y,_]=T,D=(n=Sr(c,y))===null||n===void 0?void 0:n.astNode,X=this.findFeaturesAt(u,y);yield Object.assign(Object.assign({},m),{node:D,tokenOffset:y,tokenEndOffset:_,features:X})}let{nextTokenStart:S,nextTokenEnd:C,previousTokenStart:N,previousTokenEnd:A}=this.backtrackToAnyToken(l,f),v;if(N!==void 0&&A!==void 0&&A===f){v=(i=Sr(c,N))===null||i===void 0?void 0:i.astNode;let y=this.findFeaturesAt(u,N);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:N,tokenEndOffset:A,features:y})}if(v=(s=(o=Sr(c,S))===null||o===void 0?void 0:o.astNode)!==null&&s!==void 0?s:N===void 0||(a=Sr(c,N))===null||a===void 0?void 0:a.astNode,v){let y=this.findFeaturesAt(u,S);yield Object.assign(Object.assign({},m),{node:v,tokenOffset:S,tokenEndOffset:C,features:y})}else{let y=Fl(this.grammar),_=bc(y.definition);yield Object.assign(Object.assign({},m),{tokenOffset:S,tokenEndOffset:C,features:_})}}findDataTypeRuleStart(e,r){var n,i;let o=Pt(e,r,this.grammarConfig.nameRegexp),s=!!(!((n=Pe(o?.grammarSource,K))===null||n===void 0)&&n.dataType);if(s){for(;s;)o=o?.container,s=!!(!((i=Pe(o?.grammarSource,K))===null||i===void 0)&&i.dataType);if(o)return[o.offset,o.end]}}continueCompletion(e){return e.length===0}backtrackToAnyToken(e,r){let n=this.lexer.tokenize(e).tokens;if(n.length===0)return{nextTokenStart:r,nextTokenEnd:r};let i;for(let o of n){if(o.startOffset>=r)return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};if(o.endOffset>=r)return{nextTokenStart:o.startOffset,nextTokenEnd:o.endOffset+1,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0};i=o}return{nextTokenStart:r,nextTokenEnd:r,previousTokenStart:i?i.startOffset:void 0,previousTokenEnd:i?i.endOffset+1:void 0}}async completionForRule(e,r,n){if(K(r)){let i=bc(r.definition);await Promise.all(i.map(o=>this.completionFor(e,o,n)))}}completionFor(e,r,n){if(pt(r.feature))return this.completionForKeyword(e,r.feature,n);if(Vt(r.feature)&&e.node)return this.completionForCrossReference(e,r,n)}completionForCrossReference(e,r,n){let i=Pe(r.feature,xe),o=e.node;if(i&&o){if(r.type&&(r.new||o.$type!==r.type)&&(o={$type:r.type,$container:o,$containerProperty:r.property}),!e)return;let s={reference:{},container:o,property:i.feature};try{let a=this.scopeProvider.getScope(s),c=new Set;a.getAllElements().forEach(u=>{!c.has(u.name)&&this.filterCrossReference(u)&&(n(e,this.createReferenceCompletionItem(u)),c.add(u.name))})}catch(a){console.error(a)}}}createReferenceCompletionItem(e){return{nodeDescription:e,kind:this.nodeKindProvider.getCompletionItemKind(e),detail:e.type,sortText:"0"}}filterCrossReference(e){return!0}completionForKeyword(e,r,n){r.value.match(/[\w]/)&&n(e,{label:r.value,kind:Ps.CompletionItemKind.Keyword,detail:"Keyword",sortText:"1"})}fillCompletionItem(e,r){var n,i;let o;if(typeof r.label=="string")o=r.label;else if("node"in r){let u=this.nameProvider.getName(r.node);if(!u)return;o=u}else if("nodeDescription"in r)o=r.nodeDescription.name;else return;let s;typeof((n=r.textEdit)===null||n===void 0?void 0:n.newText)=="string"?s=r.textEdit.newText:typeof r.insertText=="string"?s=r.insertText:s=o;let a=(i=r.textEdit)!==null&&i!==void 0?i:this.buildCompletionTextEdit(e,o,s);return a?{additionalTextEdits:r.additionalTextEdits,command:r.command,commitCharacters:r.commitCharacters,data:r.data,detail:r.detail,documentation:r.documentation,filterText:r.filterText,insertText:r.insertText,insertTextFormat:r.insertTextFormat,insertTextMode:r.insertTextMode,kind:r.kind,labelDetails:r.labelDetails,preselect:r.preselect,sortText:r.sortText,tags:r.tags,textEditText:r.textEditText,textEdit:a,label:o}:void 0}buildCompletionTextEdit(e,r,n){let o=e.textDocument.getText().substring(e.tokenOffset,e.offset);if(this.fuzzyMatcher.match(o,r)){let s=e.textDocument.positionAt(e.tokenOffset),a=e.position;return{newText:n,range:{start:s,end:a}}}else return}};var Ul=class extends Is{constructor(e){super(e),this.documents=()=>e.shared.workspace.LangiumDocuments}completionFor(e,r,n){let i=Pe(r.feature,xe);if(i?.feature==="path")this.completeImportPath(e,n);else return super.completionFor(e,r,n)}completeImportPath(e,r){let i=e.textDocument.getText().substring(e.tokenOffset,e.offset),o=this.getAllFiles(e.document),s={start:e.position,end:e.position};if(i.length>0){let a=i.substring(1);o=o.filter(l=>l.startsWith(a));let c=e.textDocument.positionAt(e.tokenOffset+1),u=e.textDocument.positionAt(e.tokenEndOffset-1);s={start:c,end:u}}for(let a of o){let c=i.length>0?"":'"',u=`${c}${a}${c}`;r(e,{label:a,textEdit:{newText:u,range:s},kind:ex.CompletionItemKind.File,sortText:"0"})}}getAllFiles(e){let r=this.documents().all,n=e.uri.toString(),i=ve.dirname(e.uri).toString(),o=[];for(let s of r)if(!ve.equals(s.uri,n)){let a=s.uri.toString(),c=a.substring(0,a.length-ve.extname(s.uri).length),u=ve.relative(i,c);u.startsWith(".")||(u=`./${u}`),o.push(u)}return o}};var Sc=de(Ne(),1);var Ds=class{constructor(e){this.commentNames=e.parser.GrammarConfig.multilineCommentRules}getFoldingRanges(e){let r=[],n=i=>r.push(i);return this.collectFolding(e,n),r}collectFolding(e,r){var n;let i=(n=e.parseResult)===null||n===void 0?void 0:n.value;if(i){if(this.shouldProcessContent(i)){let o=Ze(i).iterator(),s;do if(s=o.next(),!s.done){let a=s.value;this.shouldProcess(a)&&this.collectObjectFolding(e,a,r),this.shouldProcessContent(a)||o.prune()}while(!s.done)}this.collectCommentFolding(e,i,r)}}shouldProcess(e){return!0}shouldProcessContent(e){return!0}collectObjectFolding(e,r,n){let i=r.$cstNode;if(i){let o=this.toFoldingRange(e,i);o&&n(o)}}collectCommentFolding(e,r,n){let i=r.$cstNode;if(i){for(let o of sv(i))if(this.commentNames.includes(o.tokenType.name)){let s=this.toFoldingRange(e,o,Sc.FoldingRangeKind.Comment);s&&n(s)}}}toFoldingRange(e,r,n){let i=r.range,o=i.start,s=i.end;if(!(s.line-o.line<2))return this.includeLastFoldingLine(r,n)||(s=e.textDocument.positionAt(e.textDocument.offsetAt({line:s.line,character:0})-1)),Sc.FoldingRange.create(o.line,s.line,o.character,s.character,n)}includeLastFoldingLine(e,r){if(r===Sc.FoldingRangeKind.Comment)return!1;let n=e.text,i=n.charAt(n.length-1);return!(i==="}"||i===")"||i==="]")}};var ql=class extends Ds{shouldProcessContent(e){return!K(e)}};var jl=class{constructor(){this.collector=()=>{}}getNodeFormatter(e){return new Fh(e,this.collector)}formatDocument(e,r){let n=e.parseResult;return n.lexerErrors.length===0&&n.parserErrors.length===0?this.doDocumentFormat(e,r.options):[]}isFormatRangeErrorFree(e,r){let n=e.parseResult;return n.lexerErrors.length||n.parserErrors.length?Math.min(...n.lexerErrors.map(o=>{var s;return(s=o.line)!==null&&s!==void 0?s:Number.MAX_VALUE}),...n.parserErrors.map(o=>{var s;return(s=o.token.startLine)!==null&&s!==void 0?s:Number.MAX_VALUE}))>r.end.line:!0}formatDocumentRange(e,r){return this.isFormatRangeErrorFree(e,r.range)?this.doDocumentFormat(e,r.options,r.range):[]}formatDocumentOnType(e,r){let n={start:{character:0,line:r.position.line},end:r.position};return this.isFormatRangeErrorFree(e,n)?this.doDocumentFormat(e,r.options,n):[]}get formatOnTypeOptions(){}doDocumentFormat(e,r,n){let i=new Map,o=(a,c,u)=>{var l,f;let m=this.nodeModeToKey(a,c),T=i.get(m),S=(l=u.options.priority)!==null&&l!==void 0?l:0,C=(f=T?.options.priority)!==null&&f!==void 0?f:0;(!T||C<=S)&&i.set(m,u)};this.collector=o,this.iterateAstFormatting(e,n);let s=this.iterateCstFormatting(e,i,r,n);return this.avoidOverlappingEdits(e.textDocument,s)}avoidOverlappingEdits(e,r){let n=[];for(let i of r){let o=n[n.length-1];if(o){let s=e.offsetAt(i.range.start),a=e.offsetAt(o.range.end);s<a&&n.pop()}n.push(i)}return n}iterateAstFormatting(e,r){let n=e.parseResult.value;this.format(n);let i=Ze(n).iterator(),o;do if(o=i.next(),!o.done){let s=o.value;this.insideRange(s.$cstNode.range,r)?this.format(s):i.prune()}while(!o.done)}nodeModeToKey(e,r){return`${e.offset}:${e.end}:${r}`}insideRange(e,r){return!r||e.start.line<=r.start.line&&e.end.line>=r.end.line||e.start.line>=r.start.line&&e.end.line<=r.end.line||e.start.line<=r.end.line&&e.end.line>=r.end.line}isNecessary(e,r){return r.getText(e.range)!==e.newText}iterateCstFormatting(e,r,n,i){let o={indentation:0,options:n,document:e.textDocument},s=[],c=this.iterateCstTree(e,o).iterator(),u,l;do if(l=c.next(),!l.done){let f=l.value,m=xo(f),T=this.nodeModeToKey(f,"prepend"),S=r.get(T);if(r.delete(T),S){let A=this.createTextEdit(u,f,S,o);for(let v of A)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}let C=this.nodeModeToKey(f,"append"),N=r.get(C);if(r.delete(C),N){let A=uv(f);if(A){let v=this.createTextEdit(f,A,N,o);for(let y of v)y&&this.insideRange(y.range,i)&&this.isNecessary(y,e.textDocument)&&s.push(y)}}if(!S&&f.hidden){let A=this.createHiddenTextEdits(u,f,void 0,o);for(let v of A)v&&this.insideRange(v.range,i)&&this.isNecessary(v,e.textDocument)&&s.push(v)}m&&(u=f)}while(!l.done);return s}createHiddenTextEdits(e,r,n,i){var o;let s=r.range.start.line;if(e&&e.range.end.line===s)return[];let a=[],c={start:{character:0,line:s},end:r.range.start},u=i.document.getText(c),l=this.findFittingMove(c,(o=n?.moves)!==null&&o!==void 0?o:[],i),f=this.getExistingIndentationCharacterCount(u,i),T=this.getIndentationCharacterCount(i,l)-f;if(T===0)return[];let S="";T>0&&(S=(i.options.insertSpaces?" ":"	").repeat(T));let C=r.text.split(`
`);C[0]=u+C[0];for(let N=0;N<C.length;N++){let A=s+N,v={character:0,line:A};if(T>0)a.push({newText:S,range:{start:v,end:v}});else{let y=C[N],_=0;for(;_<y.length;_++){let D=y.charAt(_);if(D!==" "&&D!=="	")break}a.push({newText:"",range:{start:v,end:{line:A,character:Math.min(_,Math.abs(T))}}})}}return a}getExistingIndentationCharacterCount(e,r){let n=" ".repeat(r.options.tabSize);return(r.options.insertSpaces?e.replaceAll("	",n):e.replaceAll(n,"	")).length}getIndentationCharacterCount(e,r){let n=e.indentation;return r&&r.tabs&&(n+=r.tabs),(e.options.insertSpaces?e.options.tabSize:1)*n}createTextEdit(e,r,n,i){var o;if(r.hidden)return this.createHiddenTextEdits(e,r,n,i);let s={start:(o=e?.range.end)!==null&&o!==void 0?o:{character:0,line:0},end:r.range.start},a=this.findFittingMove(s,n.moves,i);if(!a)return[];let c=a.characters,u=a.lines,l=a.tabs,f=i.indentation;i.indentation+=l??0;let m=[];return c!==void 0?m.push(this.createSpaceTextEdit(s,c,n.options)):u!==void 0?m.push(this.createLineTextEdit(s,u,i,n.options)):l!==void 0&&m.push(this.createTabTextEdit(s,!!e,i)),xo(r)&&(i.indentation=f),m}createSpaceTextEdit(e,r,n){if(e.start.line===e.end.line){let o=e.end.character-e.start.character;r=this.fitIntoOptions(r,o,n)}return{newText:" ".repeat(r),range:e}}createLineTextEdit(e,r,n,i){let o=e.end.line-e.start.line;r=this.fitIntoOptions(r,o,i);let a=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation);return{newText:`${`
`.repeat(r)}${a}`,range:e}}createTabTextEdit(e,r,n){let o=(n.options.insertSpaces?" ".repeat(n.options.tabSize):"	").repeat(n.indentation),s=r?1:0,a=Math.max(e.end.line-e.start.line,s);return{newText:`${`
`.repeat(a)}${o}`,range:e}}fitIntoOptions(e,r,n){return n.allowMore?e=Math.max(r,e):n.allowLess&&(e=Math.min(r,e)),e}findFittingMove(e,r,n){if(r.length===0)return;if(r.length===1)return r[0];let i=e.end.line-e.start.line;for(let o of r){if(o.lines!==void 0&&i<=o.lines)return o;if(o.lines===void 0&&i===0)return o}return r[r.length-1]}iterateCstTree(e,r){let i=e.parseResult.value.$cstNode;return i?new Vr(i,o=>this.iterateCst(o,r)):cs}iterateCst(e,r){if(!$n(e))return cs;let n=r.indentation;return new Pr(()=>({index:0}),i=>i.index<e.content.length?{done:!1,value:e.content[i.index++]}:(r.indentation=n,hr))}},Fh=class{constructor(e,r){this.astNode=e,this.collector=r}node(e){return new Rn(e.$cstNode?[e.$cstNode]:[],this.collector)}nodes(...e){let r=[];for(let n of e)n.$cstNode&&r.push(n.$cstNode);return new Rn(r,this.collector)}property(e,r){let n=Yt(this.astNode.$cstNode,e,r);return new Rn(n?[n]:[],this.collector)}properties(...e){let r=[];for(let n of e){let i=Oi(this.astNode.$cstNode,n);r.push(...i)}return new Rn(r,this.collector)}keyword(e,r){let n=Yr(this.astNode.$cstNode,e,r);return new Rn(n?[n]:[],this.collector)}keywords(...e){let r=[];for(let n of e){let i=Gl(this.astNode.$cstNode,n);r.push(...i)}return new Rn(r,this.collector)}cst(e){return new Rn([...e],this.collector)}interior(e,r){let n=e.nodes,i=r.nodes;if(n.length!==1||i.length!==1)return new Rn([],this.collector);let o=n[0],s=i[0];if(o.offset>s.offset){let a=o;o=s,s=a}return new Rn(lv(o,s),this.collector)}},Rn=class t{constructor(e,r){this.nodes=e,this.collector=r}prepend(e){for(let r of this.nodes)this.collector(r,"prepend",e);return this}append(e){for(let r of this.nodes)this.collector(r,"append",e);return this}surround(e){for(let r of this.nodes)this.collector(r,"prepend",e),this.collector(r,"append",e);return this}slice(e,r){return new t(this.nodes.slice(e,r),this.collector)}},ge;(function(t){function e(...l){return{options:{},moves:l.flatMap(f=>f.moves).sort(u)}}t.fit=e;function r(l){return i(0,l)}t.noSpace=r;function n(l){return i(1,l)}t.oneSpace=n;function i(l,f){return{options:f??{},moves:[{characters:l}]}}t.spaces=i;function o(l){return s(1,l)}t.newLine=o;function s(l,f){return{options:f??{},moves:[{lines:l}]}}t.newLines=s;function a(l){return{options:l??{},moves:[{tabs:1,lines:1}]}}t.indent=a;function c(l){return{options:l??{},moves:[{tabs:0}]}}t.noIndent=c;function u(l,f){var m,T,S,C,N,A;let v=(m=l.lines)!==null&&m!==void 0?m:0,y=(T=f.lines)!==null&&T!==void 0?T:0,_=(S=l.tabs)!==null&&S!==void 0?S:0,D=(C=f.tabs)!==null&&C!==void 0?C:0,X=(N=l.characters)!==null&&N!==void 0?N:0,ye=(A=f.characters)!==null&&A!==void 0?A:0;return v<y?-1:v>y?1:_<D?-1:_>D?1:X<ye?-1:X>ye?1:0}})(ge=ge||(ge={}));var Hl=class extends jl{format(e){if(Vt(e))this.getNodeFormatter(e).properties("type","terminal").surround(ge.noSpace());else if(K(e)){let r=this.getNodeFormatter(e);r.keywords("entry","fragment","returns").append(ge.oneSpace()),(e.inferredType||e.returnType||e.dataType)&&e.parameters.length===0?r.property("name").append(ge.oneSpace()):r.property("name").append(ge.noSpace()),r.properties("parameters").append(ge.noSpace()),r.keywords(",").append(ge.oneSpace()),r.keywords("<").append(ge.noSpace());let n=r.keyword(";"),i=r.keyword(":");i.prepend(ge.noSpace()),r.interior(i,n).prepend(ge.indent()),n.prepend(ge.fit(ge.noSpace(),ge.newLine())),r.node(e).prepend(ge.noIndent())}else if(we(e)){let r=this.getNodeFormatter(e);e.type&&(r.property("name").append(ge.oneSpace()),r.keyword("returns").append(ge.oneSpace())),r.keywords("hidden","terminal","fragment").append(ge.oneSpace()),r.keyword(":").prepend(ge.noSpace()),r.keyword(";").prepend(ge.fit(ge.noSpace(),ge.newLine())),r.node(e).prepend(ge.noIndent())}else if($e(e)){let r=this.getNodeFormatter(e);r.keyword("{").append(ge.noSpace()),r.keywords(".","+=","=").surround(ge.noSpace()),r.keyword("}").prepend(ge.noSpace())}else if(fs(e))this.getNodeFormatter(e).keywords("infer","infers").append(ge.oneSpace());else if(xe(e))this.getNodeFormatter(e).keywords("=","+=","?=").surround(ge.noSpace());else if(Ie(e)){let r=this.getNodeFormatter(e);r.keyword("<").surround(ge.noSpace()),r.keyword(",").append(ge.oneSpace()),r.properties("arguments").append(ge.noSpace())}us(e)&&this.getNodeFormatter(e).property("cardinality").prepend(ge.noSpace())}};var pi=de(Ne(),1);var oe=de(Ne(),1);var jh={[oe.SemanticTokenTypes.class]:0,[oe.SemanticTokenTypes.comment]:1,[oe.SemanticTokenTypes.enum]:2,[oe.SemanticTokenTypes.enumMember]:3,[oe.SemanticTokenTypes.event]:4,[oe.SemanticTokenTypes.function]:5,[oe.SemanticTokenTypes.interface]:6,[oe.SemanticTokenTypes.keyword]:7,[oe.SemanticTokenTypes.macro]:8,[oe.SemanticTokenTypes.method]:9,[oe.SemanticTokenTypes.modifier]:10,[oe.SemanticTokenTypes.namespace]:11,[oe.SemanticTokenTypes.number]:12,[oe.SemanticTokenTypes.operator]:13,[oe.SemanticTokenTypes.parameter]:14,[oe.SemanticTokenTypes.property]:15,[oe.SemanticTokenTypes.regexp]:16,[oe.SemanticTokenTypes.string]:17,[oe.SemanticTokenTypes.struct]:18,[oe.SemanticTokenTypes.type]:19,[oe.SemanticTokenTypes.typeParameter]:20,[oe.SemanticTokenTypes.variable]:21},tx={[oe.SemanticTokenModifiers.abstract]:1,[oe.SemanticTokenModifiers.async]:2,[oe.SemanticTokenModifiers.declaration]:4,[oe.SemanticTokenModifiers.defaultLibrary]:8,[oe.SemanticTokenModifiers.definition]:16,[oe.SemanticTokenModifiers.deprecated]:32,[oe.SemanticTokenModifiers.documentation]:64,[oe.SemanticTokenModifiers.modification]:128,[oe.SemanticTokenModifiers.readonly]:256,[oe.SemanticTokenModifiers.static]:512},rx={legend:{tokenTypes:Object.keys(jh),tokenModifiers:Object.keys(tx)},full:{delta:!0},range:!0},qh=class extends oe.SemanticTokensBuilder{constructor(){super(...arguments),this._tokens=[]}push(e,r,n,i,o){this._tokens.push({line:e,char:r,length:n,tokenType:i,tokenModifiers:o})}build(){return this.applyTokens(),super.build()}buildEdits(){return this.applyTokens(),super.buildEdits()}applyTokens(){for(let e of this._tokens.sort(this.compareTokens))super.push(e.line,e.char,e.length,e.tokenType,e.tokenModifiers);this._tokens=[]}compareTokens(e,r){return e.line===r.line?e.char-r.char:e.line-r.line}},Kl=class{constructor(e){this.tokensBuilders=new Map,e.shared.workspace.TextDocuments.onDidClose(r=>{this.tokensBuilders.delete(r.document.uri)}),e.shared.lsp.LanguageServer.onInitialize(r=>{var n;this.initialize((n=r.capabilities.textDocument)===null||n===void 0?void 0:n.semanticTokens)})}initialize(e){this.clientCapabilities=e}async semanticHighlight(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightRange(e,r,n=oe.CancellationToken.None){return this.currentRange=r.range,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.build()}async semanticHighlightDelta(e,r,n=oe.CancellationToken.None){return this.currentRange=void 0,this.currentDocument=e,this.currentTokensBuilder=this.getDocumentTokensBuilder(e),this.currentTokensBuilder.previousResult(r.previousResultId),await this.computeHighlighting(e,this.createAcceptor(),n),this.currentTokensBuilder.buildEdits()}createAcceptor(){return r=>{"line"in r?this.highlightToken({range:{start:{line:r.line,character:r.char},end:{line:r.line,character:r.char+r.length}},type:r.type,modifier:r.modifier}):"range"in r?this.highlightToken(r):"keyword"in r?this.highlightKeyword(r):"property"in r?this.highlightProperty(r):this.highlightNode({node:r.cst,type:r.type,modifier:r.modifier})}}getDocumentTokensBuilder(e){let r=this.tokensBuilders.get(e.uri.toString());if(r)return r;let n=new qh;return this.tokensBuilders.set(e.uri.toString(),n),n}async computeHighlighting(e,r,n){let i=e.parseResult.value,o=si(i,{range:this.currentRange}).iterator(),s;do if(s=o.next(),!s.done){await et(n);let a=s.value;this.highlightElement(a,r)==="prune"&&o.prune()}while(!s.done)}highlightToken(e){var r;let{range:n,type:i}=e,o=e.modifier;if(this.currentRange&&!ol(n,this.currentRange)||!this.currentDocument||!this.currentTokensBuilder)return;let s=jh[i],a=0;if(o!==void 0){typeof o=="string"&&(o=[o]);for(let l of o){let f=tx[l];a|=f}}let c=n.start.line,u=n.end.line;if(c===u){let l=n.start.character,f=n.end.character-l;this.currentTokensBuilder.push(c,l,f,s,a)}else if(!((r=this.clientCapabilities)===null||r===void 0)&&r.multilineTokenSupport){let l=n.start.character,f=this.currentDocument.textDocument.offsetAt(n.start),m=this.currentDocument.textDocument.offsetAt(n.end);this.currentTokensBuilder.push(c,l,m-f,s,a)}else{let l=n.start,f=this.currentDocument.textDocument.offsetAt({line:c+1,character:0});this.currentTokensBuilder.push(l.line,l.character,f-l.character-1,s,a);for(let m=c+1;m<u;m++){let T=f;f=this.currentDocument.textDocument.offsetAt({line:m+1,character:0}),this.currentTokensBuilder.push(m,0,f-T-1,s,a)}this.currentTokensBuilder.push(u,0,n.end.character,s,a)}}highlightProperty(e){let r=[];if(typeof e.index=="number"){let o=Yt(e.node.$cstNode,e.property,e.index);o&&r.push(o)}else r.push(...Oi(e.node.$cstNode,e.property));let{type:n,modifier:i}=e;for(let o of r)this.highlightNode({node:o,type:n,modifier:i})}highlightKeyword(e){let{node:r,keyword:n,type:i,index:o,modifier:s}=e,a=[];if(typeof o=="number"){let c=Yr(r.$cstNode,n,o);c&&a.push(c)}else a.push(...Gl(r.$cstNode,n));for(let c of a)this.highlightNode({node:c,type:i,modifier:s})}highlightNode(e){let{node:r,type:n,modifier:i}=e,o=r.range;this.highlightToken({range:o,type:n,modifier:i})}},Uh;(function(t){function e(n,i){let o=new Map;Object.entries(jh).forEach(([c,u])=>o.set(u,c));let s=0,a=0;return r(n.data,5).map(c=>{s+=c[0],c[0]!==0&&(a=0),a+=c[1];let u=c[2];return{offset:i.textDocument.offsetAt({line:s,character:a}),tokenType:o.get(c[3]),tokenModifiers:c[4],text:i.textDocument.getText({start:{line:s,character:a},end:{line:s,character:a+u}})}})}t.decode=e;function r(n,i){let o=[];for(let s=0;s<n.length;s+=i){let a=n.slice(s,s+i);o.push(a)}return o}})(Uh=Uh||(Uh={}));var Wl=class extends Kl{highlightElement(e,r){var n;xe(e)?r({node:e,property:"feature",type:pi.SemanticTokenTypes.property}):$e(e)?e.feature&&r({node:e,property:"feature",type:pi.SemanticTokenTypes.property}):ps(e)?r({node:e,property:"name",type:pi.SemanticTokenTypes.type}):or(e)?(e.primitiveType||e.typeRef)&&r({node:e,property:e.primitiveType?"primitiveType":"typeRef",type:pi.SemanticTokenTypes.type}):Av(e)?r({node:e,property:"name",type:pi.SemanticTokenTypes.parameter}):ds(e)?r({node:e,property:"parameter",type:pi.SemanticTokenTypes.parameter}):Ie(e)?!((n=e.rule.ref)===null||n===void 0)&&n.fragment&&r({node:e,property:"rule",type:pi.SemanticTokenTypes.type}):cl(e)&&r({node:e,property:"name",type:pi.SemanticTokenTypes.property})}};var Bl=class extends Ts{getName(e){return xe(e)?e.feature:super.getName(e)}getNameNode(e){return xe(e)?Yt(e.$cstNode,"feature"):super.getNameNode(e)}};var Os=class{constructor(e){this.nameProvider=e.references.NameProvider,this.index=e.shared.workspace.IndexManager,this.nodeLocator=e.workspace.AstNodeLocator}findDeclaration(e){if(e){let r=Ls(e),n=e.astNode;if(r&&n){let i=n[r.feature];if(ni(i))return i.ref;if(Array.isArray(i)){for(let o of i)if(ni(o)&&o.$refNode&&o.$refNode.offset<=e.offset&&o.$refNode.end>=e.end)return o.ref}}if(n){let i=this.nameProvider.getNameNode(n);if(i&&(i===e||av(e,i)))return n}}}findDeclarationNode(e){let r=this.findDeclaration(e);if(r?.$cstNode){let n=this.nameProvider.getNameNode(r);return n??r.$cstNode}}findReferences(e,r){let n=[];if(r.includeDeclaration){let o=this.getReferenceToSelf(e);o&&n.push(o)}let i=this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e));return r.documentUri&&(i=i.filter(o=>ve.equals(o.sourceUri,r.documentUri))),n.push(...i),ie(n)}getReferenceToSelf(e){let r=this.nameProvider.getNameNode(e);if(r){let n=ne(e),i=this.nodeLocator.getAstNodePath(e);return{sourceUri:n.uri,sourcePath:i,targetUri:n.uri,targetPath:i,segment:ir(r),local:!0}}}};var zl=class extends Os{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}findDeclaration(e){let r=e.astNode,n=Ls(e);if(n&&n.feature==="feature"){if(xe(r))return this.findAssignmentDeclaration(r);if($e(r))return this.findActionDeclaration(r)}return super.findDeclaration(e)}findReferences(e,r){var n;return cl(e)?this.findReferencesToTypeAttribute(e,(n=r.includeDeclaration)!==null&&n!==void 0?n:!1):super.findReferences(e,r)}findReferencesToTypeAttribute(e,r){let n=[],i=Pe(e,wr);if(i){if(r){let a=this.getReferenceToSelf(e);a&&n.push(a)}let o=dh(i,this,this.documents,this.nodeLocator),s=[];o.forEach(a=>{let c=this.findRulesWithReturnType(a);s.push(...c)}),s.forEach(a=>{let c=this.createReferencesToAttribute(a,e);n.push(...c)})}return ie(n)}createReferencesToAttribute(e,r){let n=[];if(K(e)){let i=ws(e.definition).find(o=>o.feature===r.name);if(i?.$cstNode){let o=this.nameProvider.getNameNode(i);o&&n.push({sourceUri:ne(i).uri,sourcePath:this.nodeLocator.getAstNodePath(i),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:ir(o),local:ve.equals(ne(i).uri,ne(r).uri)})}}else{if(e.feature===r.name){let o=Yt(e.$cstNode,"feature");o&&n.push({sourceUri:ne(e).uri,sourcePath:this.nodeLocator.getAstNodePath(e),targetUri:ne(r).uri,targetPath:this.nodeLocator.getAstNodePath(r),segment:ir(o),local:ve.equals(ne(e).uri,ne(r).uri)})}let i=Pe(e,K);n.push(...this.createReferencesToAttribute(i,r))}return n}findAssignmentDeclaration(e){var r;let n=Pe(e,K),i=kh(e);if(i){let o=this.findActionDeclaration(i,e.feature);if(o)return o}if(!((r=n?.returnType)===null||r===void 0)&&r.ref&&(wr(n.returnType.ref)||Mt(n.returnType.ref))){let o=uc(n.returnType.ref);for(let s of o){let a=s.attributes.find(c=>c.name===e.feature);if(a)return a}}return e}findActionDeclaration(e,r){var n;if(!((n=e.type)===null||n===void 0)&&n.ref){let i=r??e.feature,o=uc(e.type.ref);for(let s of o){let a=s.attributes.find(c=>c.name===i);if(a)return a}}}findRulesWithReturnType(e){let r=[];return this.index.findAllReferences(e,this.nodeLocator.getAstNodePath(e)).forEach(i=>{let o=this.documents.getOrCreateDocument(i.sourceUri),s=this.nodeLocator.getAstNode(o.parseResult.value,i.sourcePath);(K(s)||$e(s))&&r.push(s)}),r}};var wc=de(Ne(),1);var nx=de(Ne(),1);var Vl=class{constructor(e){this.grammarConfig=e.parser.GrammarConfig,this.nameProvider=e.references.NameProvider,this.documents=e.shared.workspace.LangiumDocuments,this.references=e.references.References}prepareCallHierarchy(e,r){let n=e.parseResult.value,i=Pt(n.$cstNode,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclarationNode(i);if(o)return this.getCallHierarchyItems(o.astNode,e)}getCallHierarchyItems(e,r){let n=this.nameProvider.getNameNode(e),i=this.nameProvider.getName(e);if(!(!n||!e.$cstNode||i===void 0))return[Object.assign({kind:nx.SymbolKind.Method,name:i,range:e.$cstNode.range,selectionRange:n.range,uri:r.uri.toString()},this.getCallHierarchyItem(e))]}getCallHierarchyItem(e){}incomingCalls(e){let r=this.documents.getOrCreateDocument(Jt.parse(e.item.uri)),n=r.parseResult.value,i=Pt(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findReferences(i.astNode,{includeDeclaration:!1});return this.getIncomingCalls(i.astNode,o)}outgoingCalls(e){let r=this.documents.getOrCreateDocument(Jt.parse(e.item.uri)),n=r.parseResult.value,i=Pt(n.$cstNode,r.textDocument.offsetAt(e.item.range.start),this.grammarConfig.nameRegexp);if(i)return this.getOutgoingCalls(i.astNode)}};var ix=de(Ne(),1);var Ms=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getDefinition(e,r){let n=e.parseResult.value;if(n.$cstNode){let i=n.$cstNode,o=Pt(i,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(o)return this.collectLocationLinks(o,r)}}collectLocationLinks(e,r){var n;let i=this.findLink(e);if(i)return[ix.LocationLink.create(i.targetDocument.textDocument.uri,((n=i.target.astNode.$cstNode)!==null&&n!==void 0?n:i.target).range,i.target.range,i.source.range)]}findLink(e){let r=this.references.findDeclarationNode(e);if(r?.astNode){let n=ne(r.astNode);if(r&&n)return{source:e,target:r,targetDocument:n}}}};var ox=de(Ne(),1);var Xl=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}getDocumentHighlight(e,r){let n=e.parseResult.value.$cstNode;if(!n)return;let i=Pt(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);if(!i)return;let o=this.references.findDeclaration(i);if(o){let s=ve.equals(ne(o).uri,e.uri),a={documentUri:e.uri,includeDeclaration:s};return this.references.findReferences(o,a).map(u=>this.createDocumentHighlight(u)).toArray()}}createDocumentHighlight(e){return ox.DocumentHighlight.create(e.segment.range)}};var Yl=class{constructor(e){this.nameProvider=e.references.NameProvider,this.nodeKindProvider=e.shared.lsp.NodeKindProvider}getSymbols(e){return this.getSymbol(e,e.parseResult.value)}getSymbol(e,r){let n=r.$cstNode,i=this.nameProvider.getNameNode(r);if(i&&n){let o=this.nameProvider.getName(r);return[{kind:this.nodeKindProvider.getSymbolKind(r),name:o??i.text,range:n.range,selectionRange:i.range,children:this.getChildSymbols(e,r)}]}else return this.getChildSymbols(e,r)||[]}getChildSymbols(e,r){let n=[];for(let i of Di(r)){let o=this.getSymbol(e,i);n.push(...o)}if(n.length>0)return n}};var PI=de(Ne(),1);var Jl=class{match(e,r){if(e.length===0)return!0;r=r.toLowerCase();let n=!1,i,o=0,s=r.length;for(let a=0;a<s;a++){let c=r.charCodeAt(a),u=e.charCodeAt(o);if((c===u||this.toUpperCharCode(c)===this.toUpperCharCode(u))&&(n||(n=i===void 0||this.isWordTransition(i,c)),n&&o++,o===e.length))return!0;i=c}return!1}isWordTransition(e,r){return sx<=e&&e<=ax&&DI<=r&&r<=OI||e===cx&&r!==cx}toUpperCharCode(e){return sx<=e&&e<=ax?e-32:e}},sx="a".charCodeAt(0),ax="z".charCodeAt(0),DI="A".charCodeAt(0),OI="Z".charCodeAt(0),cx="_".charCodeAt(0);var Gh=class{constructor(e){this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}getHoverContent(e,r){var n,i;let o=(i=(n=e.parseResult)===null||n===void 0?void 0:n.value)===null||i===void 0?void 0:i.$cstNode;if(o){let s=e.textDocument.offsetAt(r.position),a=Pt(o,s,this.grammarConfig.nameRegexp);if(a&&a.offset+a.length>s){let c=this.references.findDeclaration(a);if(c)return this.getAstNodeHoverContent(c)}}}},Ql=class extends Gh{constructor(e){super(e),this.documentationProvider=e.documentation.DocumentationProvider}getAstNodeHoverContent(e){let r=this.documentationProvider.getDocumentation(e);if(r)return{contents:{kind:"markdown",value:r}}}};var LI=de(Ne(),1);var MI=de(Ne(),1);var Zr=de(Ne(),1);var He;(function(t){t[t.Changed=0]="Changed",t[t.Parsed=1]="Parsed",t[t.IndexedContent=2]="IndexedContent",t[t.ComputedScopes=3]="ComputedScopes",t[t.Linked=4]="Linked",t[t.IndexedReferences=5]="IndexedReferences",t[t.Validated=6]="Validated"})(He=He||(He={}));var Zl=class{constructor(e){this.serviceRegistry=e.ServiceRegistry,this.textDocuments=e.workspace.TextDocuments,this.fileSystemProvider=e.workspace.FileSystemProvider}fromTextDocument(e,r){return this.create(r??Jt.parse(e.uri),e)}fromString(e,r){return this.create(r,e)}fromModel(e,r){return this.create(r,{$model:e})}create(e,r){if(r??(r=this.textDocuments.get(e.toString())),r??(r=this.getContentFromFileSystem(e)),typeof r=="string"){let n=this.parse(e,r);return this.createLangiumDocument(n,e,void 0,r)}else if("$model"in r){let n={value:r.$model,parserErrors:[],lexerErrors:[]};return this.createLangiumDocument(n,e)}else{let n=this.parse(e,r.getText());return this.createLangiumDocument(n,e,r)}}createLangiumDocument(e,r,n,i){let o;if(n)o={parseResult:e,uri:r,state:He.Parsed,references:[],textDocument:n};else{let s=this.createTextDocumentGetter(r,i);o={parseResult:e,uri:r,state:He.Parsed,references:[],get textDocument(){return s()}}}return e.value.$document=o,o}update(e){let r=this.textDocuments.get(e.uri.toString()),n=r?r.getText():this.getContentFromFileSystem(e.uri);if(r)Object.defineProperty(e,"textDocument",{value:r});else{let i=this.createTextDocumentGetter(e.uri,n);Object.defineProperty(e,"textDocument",{get:i})}return e.parseResult=this.parse(e.uri,n),e.parseResult.value.$document=e,e}getContentFromFileSystem(e){return this.fileSystemProvider.readFileSync(e)}parse(e,r){return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r)}createTextDocumentGetter(e,r){let n=this.serviceRegistry,i;return()=>i??(i=ss.create(e.toString(),n.getServices(e).LanguageMetaData.languageId,0,r??""))}},ef=class{constructor(e){this.documentMap=new Map,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory}get all(){return ie(this.documentMap.values())}addDocument(e){let r=e.uri.toString();if(this.documentMap.has(r))throw new Error(`A document with the URI '${r}' is already present.`);this.documentMap.set(r,e)}getOrCreateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n||(n=this.langiumDocumentFactory.create(e),this.documentMap.set(r,n),n)}hasDocument(e){return this.documentMap.has(e.toString())}invalidateDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=He.Changed,n.precomputedScopes=void 0,n.references=[],n.diagnostics=void 0),n}deleteDocument(e){let r=e.toString(),n=this.documentMap.get(r);return n&&(n.state=He.Changed,this.documentMap.delete(r)),n}};var FI=de(Ne(),1);function ux(t){let e=[],r=[];t.forEach(i=>{i?.triggerCharacters&&e.push(...i.triggerCharacters),i?.retriggerCharacters&&r.push(...i.retriggerCharacters)});let n={triggerCharacters:e.length>0?Array.from(new Set(e)).sort():void 0,retriggerCharacters:r.length>0?Array.from(new Set(r)).sort():void 0};return n.triggerCharacters?n:void 0}var tf=class{constructor(e){this.onInitializeEmitter=new Zr.Emitter,this.onInitializedEmitter=new Zr.Emitter,this.services=e}get onInitialize(){return this.onInitializeEmitter.event}get onInitialized(){return this.onInitializedEmitter.event}async initialize(e){return this.eagerLoadServices(),this.onInitializeEmitter.fire(e),this.onInitializeEmitter.dispose(),this.buildInitializeResult(e)}eagerLoadServices(){sl(this.services),this.services.ServiceRegistry.all.forEach(e=>sl(e))}hasService(e){return this.services.ServiceRegistry.all.some(r=>e(r)!==void 0)}buildInitializeResult(e){var r;let n=this.services.ServiceRegistry.all,i=this.hasService(w=>w.lsp.Formatter),o=n.map(w=>{var q;return(q=w.lsp.Formatter)===null||q===void 0?void 0:q.formatOnTypeOptions}).find(w=>!!w),s=this.hasService(w=>w.lsp.CodeActionProvider),a=this.hasService(w=>w.lsp.SemanticTokenProvider),c=(r=this.services.lsp.ExecuteCommandHandler)===null||r===void 0?void 0:r.commands,u=this.hasService(w=>w.lsp.DocumentLinkProvider),l=ux(n.map(w=>{var q;return(q=w.lsp.SignatureHelp)===null||q===void 0?void 0:q.signatureHelpOptions})),f=this.hasService(w=>w.lsp.TypeProvider),m=this.hasService(w=>w.lsp.ImplementationProvider),T=this.hasService(w=>w.lsp.CompletionProvider),S=ZR(n.map(w=>{var q;return(q=w.lsp.CompletionProvider)===null||q===void 0?void 0:q.completionOptions})),C=this.hasService(w=>w.lsp.ReferencesProvider),N=this.hasService(w=>w.lsp.DocumentSymbolProvider),A=this.hasService(w=>w.lsp.DefinitionProvider),v=this.hasService(w=>w.lsp.DocumentHighlightProvider),y=this.hasService(w=>w.lsp.FoldingRangeProvider),_=this.hasService(w=>w.lsp.HoverProvider),D=this.hasService(w=>w.lsp.RenameProvider),X=this.hasService(w=>w.lsp.CallHierarchyProvider),ye=this.hasService(w=>w.lsp.CodeLensProvider),Ee=this.hasService(w=>w.lsp.DeclarationProvider),Ht=this.hasService(w=>w.lsp.InlayHintProvider),Rt=this.services.lsp.WorkspaceSymbolProvider;return{capabilities:{workspace:{workspaceFolders:{supported:!0}},executeCommandProvider:c&&{commands:c},textDocumentSync:Zr.TextDocumentSyncKind.Incremental,completionProvider:T?S:void 0,referencesProvider:C,documentSymbolProvider:N,definitionProvider:A,typeDefinitionProvider:f,documentHighlightProvider:v,codeActionProvider:s,documentFormattingProvider:i,documentRangeFormattingProvider:i,documentOnTypeFormattingProvider:o,foldingRangeProvider:y,hoverProvider:_,renameProvider:D?{prepareProvider:!0}:void 0,semanticTokensProvider:a?rx:void 0,signatureHelpProvider:l,implementationProvider:m,callHierarchyProvider:X?{}:void 0,documentLinkProvider:u?{resolveProvider:!1}:void 0,codeLensProvider:ye?{resolveProvider:!1}:void 0,declarationProvider:Ee,inlayHintProvider:Ht?{resolveProvider:!1}:void 0,workspaceSymbolProvider:Rt?{resolveProvider:!!Rt.resolveSymbol}:void 0}}}async initialized(e){this.onInitializedEmitter.fire(e),this.onInitializedEmitter.dispose()}};function fx(t){let e=t.lsp.Connection;if(!e)throw new Error("Starting a language server requires the languageServer.Connection service to be set.");UI(e,t),qI(e,t),jI(e,t),GI(e,t),KI(e,t),WI(e,t),BI(e,t),zI(e,t),XI(e,t),JI(e,t),QI(e,t),HI(e,t),ZI(e,t),YI(e,t),eP(e,t),tP(e,t),nP(e,t),oP(e,t),cP(e,t),sP(e,t),iP(e,t),rP(e,t),VI(e,t),aP(e,t),e.onInitialize(n=>t.lsp.LanguageServer.initialize(n)),e.onInitialized(n=>t.lsp.LanguageServer.initialized(n)),t.workspace.TextDocuments.listen(e),e.listen()}function UI(t,e){let r=e.workspace.DocumentBuilder,n=e.workspace.MutexLock;function i(s,a){n.lock(c=>r.update(s,a,c))}e.workspace.TextDocuments.onDidChangeContent(s=>{i([Jt.parse(s.document.uri)],[])}),t.onDidChangeWatchedFiles(s=>{let a=[],c=[];for(let u of s.changes){let l=Jt.parse(u.uri);u.type===Zr.FileChangeType.Deleted?c.push(l):a.push(l)}i(a,c)})}function qI(t,e){e.workspace.DocumentBuilder.onBuildPhase(He.Validated,async(n,i)=>{for(let o of n)if(o.diagnostics&&t.sendDiagnostics({uri:o.uri.toString(),diagnostics:o.diagnostics}),i.isCancellationRequested)return})}function jI(t,e){t.onCompletion(ar((r,n,i,o)=>{var s;return(s=r.lsp.CompletionProvider)===null||s===void 0?void 0:s.getCompletion(n,i,o)},e))}function GI(t,e){t.onReferences(ar((r,n,i,o)=>{var s;return(s=r.lsp.ReferencesProvider)===null||s===void 0?void 0:s.findReferences(n,i,o)},e))}function HI(t,e){t.onCodeAction(ar((r,n,i,o)=>{var s;return(s=r.lsp.CodeActionProvider)===null||s===void 0?void 0:s.getCodeActions(n,i,o)},e))}function KI(t,e){t.onDocumentSymbol(ar((r,n,i,o)=>{var s;return(s=r.lsp.DocumentSymbolProvider)===null||s===void 0?void 0:s.getSymbols(n,i,o)},e))}function WI(t,e){t.onDefinition(ar((r,n,i,o)=>{var s;return(s=r.lsp.DefinitionProvider)===null||s===void 0?void 0:s.getDefinition(n,i,o)},e))}function BI(t,e){t.onTypeDefinition(ar((r,n,i,o)=>{var s;return(s=r.lsp.TypeProvider)===null||s===void 0?void 0:s.getTypeDefinition(n,i,o)},e))}function zI(t,e){t.onImplementation(ar((r,n,i,o)=>{var s;return(s=r.lsp.ImplementationProvider)===null||s===void 0?void 0:s.getImplementation(n,i,o)},e))}function VI(t,e){t.onDeclaration(ar((r,n,i,o)=>{var s;return(s=r.lsp.DeclarationProvider)===null||s===void 0?void 0:s.getDeclaration(n,i,o)},e))}function XI(t,e){t.onDocumentHighlight(ar((r,n,i,o)=>{var s;return(s=r.lsp.DocumentHighlightProvider)===null||s===void 0?void 0:s.getDocumentHighlight(n,i,o)},e))}function YI(t,e){t.onHover(ar((r,n,i,o)=>{var s;return(s=r.lsp.HoverProvider)===null||s===void 0?void 0:s.getHoverContent(n,i,o)},e))}function JI(t,e){t.onFoldingRanges(ar((r,n,i,o)=>{var s;return(s=r.lsp.FoldingRangeProvider)===null||s===void 0?void 0:s.getFoldingRanges(n,i,o)},e))}function QI(t,e){t.onDocumentFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocument(n,i,o)},e)),t.onDocumentRangeFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentRange(n,i,o)},e)),t.onDocumentOnTypeFormatting(ar((r,n,i,o)=>{var s;return(s=r.lsp.Formatter)===null||s===void 0?void 0:s.formatDocumentOnType(n,i,o)},e))}function ZI(t,e){t.onRenameRequest(ar((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.rename(n,i,o)},e)),t.onPrepareRename(ar((r,n,i,o)=>{var s;return(s=r.lsp.RenameProvider)===null||s===void 0?void 0:s.prepareRename(n,i,o)},e))}function eP(t,e){t.languages.inlayHint.on(Fi((r,n,i,o)=>{var s;return(s=r.lsp.InlayHintProvider)===null||s===void 0?void 0:s.getInlayHints(n,i,o)},e))}function tP(t,e){let r={data:[]};t.languages.semanticTokens.on(Fi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlight(i,o,s):r,e)),t.languages.semanticTokens.onDelta(Fi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightDelta(i,o,s):r,e)),t.languages.semanticTokens.onRange(Fi((n,i,o,s)=>n.lsp.SemanticTokenProvider?n.lsp.SemanticTokenProvider.semanticHighlightRange(i,o,s):r,e))}function rP(t,e){t.onDidChangeConfiguration(r=>{r.settings&&e.workspace.ConfigurationProvider.updateConfiguration(r)})}function nP(t,e){let r=e.lsp.ExecuteCommandHandler;r&&t.onExecuteCommand(async(n,i)=>{var o;try{return await r.executeCommand(n.command,(o=n.arguments)!==null&&o!==void 0?o:[],i)}catch(s){return Fs(s)}})}function iP(t,e){t.onDocumentLinks(Fi((r,n,i,o)=>{var s;return(s=r.lsp.DocumentLinkProvider)===null||s===void 0?void 0:s.getDocumentLinks(n,i,o)},e))}function oP(t,e){t.onSignatureHelp(Fi((r,n,i,o)=>{var s;return(s=r.lsp.SignatureHelp)===null||s===void 0?void 0:s.provideSignatureHelp(n,i,o)},e))}function sP(t,e){t.onCodeLens(Fi((r,n,i,o)=>{var s;return(s=r.lsp.CodeLensProvider)===null||s===void 0?void 0:s.provideCodeLens(n,i,o)},e))}function aP(t,e){var r;let n=e.lsp.WorkspaceSymbolProvider;if(n){t.onWorkspaceSymbol(async(o,s)=>{try{return await n.getSymbols(o,s)}catch(a){return Fs(a)}});let i=(r=n.resolveSymbol)===null||r===void 0?void 0:r.bind(n);i&&t.onWorkspaceSymbolResolve(async(o,s)=>{try{return await i(o,s)}catch(a){return Fs(a)}})}}function cP(t,e){t.languages.callHierarchy.onPrepare(Fi((r,n,i,o)=>{var s;return r.lsp.CallHierarchyProvider&&(s=r.lsp.CallHierarchyProvider.prepareCallHierarchy(n,i,o))!==null&&s!==void 0?s:null},e)),t.languages.callHierarchy.onIncomingCalls(lx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.incomingCalls(n,i))!==null&&o!==void 0?o:null},e)),t.languages.callHierarchy.onOutgoingCalls(lx((r,n,i)=>{var o;return r.lsp.CallHierarchyProvider&&(o=r.lsp.CallHierarchyProvider.outgoingCalls(n,i))!==null&&o!==void 0?o:null},e))}function lx(t,e){let r=e.ServiceRegistry;return async(n,i)=>{let o=Jt.parse(n.item.uri),s=r.getServices(o);if(!s){let a=`Could not find service instance for uri: '${o.toString()}'`;throw console.error(a),new Error(a)}try{return await t(s,n,i)}catch(a){return Fs(a)}}}function Fi(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Jt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)throw console.error(`Could not find service instance for uri: '${s.toString()}'`),new Error;let c=r.getOrCreateDocument(s);if(!c)throw new Error;try{return await t(a,c,i,o)}catch(u){return Fs(u)}}}function ar(t,e){let r=e.workspace.LangiumDocuments,n=e.ServiceRegistry;return async(i,o)=>{let s=Jt.parse(i.textDocument.uri),a=n.getServices(s);if(!a)return console.error(`Could not find service instance for uri: '${s.toString()}'`),null;let c=r.getOrCreateDocument(s);if(!c)return null;try{return await t(a,c,i,o)}catch(u){return Fs(u)}}}function Fs(t){if(_o(t))return new Zr.ResponseError(Zr.LSPErrorCodes.RequestCancelled,"The request has been cancelled.");if(t instanceof Zr.ResponseError)return t;throw t}var nf=de(Ne(),1),rf=class{getSymbolKind(){return nf.SymbolKind.Field}getCompletionItemKind(){return nf.CompletionItemKind.Reference}};var dx=de(Ne(),1);var of=class{constructor(e){this.nameProvider=e.references.NameProvider,this.references=e.references.References,this.grammarConfig=e.parser.GrammarConfig}findReferences(e,r){let n=e.parseResult.value.$cstNode;if(!n)return[];let i=Pt(n,e.textDocument.offsetAt(r.position),this.grammarConfig.nameRegexp);return i?this.getReferences(i,r,e):[]}getReferences(e,r,n){let i=[],o=this.references.findDeclaration(e);if(o){let s={includeDeclaration:r.context.includeDeclaration};this.references.findReferences(o,s).forEach(a=>{i.push(dx.Location.create(a.sourceUri.toString(),a.segment.range))})}return i}};var px=de(Ne(),1);var sf=class{constructor(e){this.references=e.references.References,this.nameProvider=e.references.NameProvider,this.grammarConfig=e.parser.GrammarConfig}async rename(e,r){let n={},i=e.parseResult.value.$cstNode;if(!i)return;let o=e.textDocument.offsetAt(r.position),s=Pt(i,o,this.grammarConfig.nameRegexp);if(!s)return;let a=this.references.findDeclaration(s);if(!a)return;let c={onlyLocal:!1,includeDeclaration:!0};return this.references.findReferences(a,c).forEach(l=>{let f=px.TextEdit.replace(l.segment.range,r.newName),m=l.sourceUri.toString();n[m]?n[m].push(f):n[m]=[f]}),{changes:n}}prepareRename(e,r){return this.renameNodeRange(e,r.position)}renameNodeRange(e,r){let n=e.parseResult.value.$cstNode,i=e.textDocument.offsetAt(r);if(n&&i){let o=Pt(n,i,this.grammarConfig.nameRegexp);if(!o)return;if(this.references.findDeclaration(o)||this.isNameNode(o))return o.range}}isNameNode(e){return e?.astNode&&lc(e.astNode)&&e===this.nameProvider.getNameNode(e.astNode)}};var uP=de(Ne(),1);var mx=de(Ne(),1);var af=class{constructor(e){this.indexManager=e.workspace.IndexManager,this.nodeKindProvider=e.lsp.NodeKindProvider,this.fuzzyMatcher=e.lsp.FuzzyMatcher}async getSymbols(e,r=mx.CancellationToken.None){let n=[],i=e.query.toLowerCase();for(let o of this.indexManager.allElements())if(await et(r),this.fuzzyMatcher.match(i,o.name)){let s=this.getWorkspaceSymbol(o);s&&n.push(s)}return n}getWorkspaceSymbol(e){let r=e.nameSegment;if(r)return{kind:this.nodeKindProvider.getSymbolKind(e),name:e.name,location:{range:r.range,uri:e.documentUri.toString()}}}};var cf=class extends Ms{constructor(e){super(e),this.documents=e.shared.workspace.LangiumDocuments}collectLocationLinks(e,r){var n,i,o,s,a,c;let u="path";if(al(e.astNode)&&((n=Ls(e))===null||n===void 0?void 0:n.feature)===u){let l=fi(this.documents,e.astNode);if(l?.$document){let f=(i=this.findTargetObject(l))!==null&&i!==void 0?i:l,m=(s=(o=this.nameProvider.getNameNode(f))===null||o===void 0?void 0:o.range)!==null&&s!==void 0?s:wc.Range.create(0,0,0,0),T=(c=(a=f.$cstNode)===null||a===void 0?void 0:a.range)!==null&&c!==void 0?c:wc.Range.create(0,0,0,0);return[wc.LocationLink.create(l.$document.uri.toString(),T,m,e.range)]}return}return super.collectLocationLinks(e,r)}findTargetObject(e){return e.isDeclared?e:Di(e).head()}};var Hh=de(Ne(),1);var uf=class extends Vl{getIncomingCalls(e,r){if(!K(e))return;let n=new Map;if(r.forEach(i=>{let s=this.documents.getOrCreateDocument(i.sourceUri).parseResult.value;if(!s.$cstNode)return;let a=Sr(s.$cstNode,i.segment.offset);if(!a)return;let c=Pe(a.astNode,K);if(!c||!c.$cstNode)return;let u=this.nameProvider.getNameNode(c);if(!u)return;let l=i.sourceUri.toString(),f=l+"@"+u.text;n.has(f)?n.set(f,{parserRule:c.$cstNode,nameNode:u,targetNodes:[...n.get(f).targetNodes,a],docUri:l}):n.set(f,{parserRule:c.$cstNode,nameNode:u,targetNodes:[a],docUri:l})}),n.size!==0)return Array.from(n.values()).map(i=>({from:{kind:Hh.SymbolKind.Method,name:i.nameNode.text,range:i.parserRule.range,selectionRange:i.nameNode.range,uri:i.docUri},fromRanges:i.targetNodes.map(o=>o.range)}))}getOutgoingCalls(e){if(!K(e))return;let r=Ze(e).filter(Ie).toArray(),n=new Map;if(r.forEach(i=>{var o;let s=i.$cstNode;if(!s)return;let a=(o=i.rule.ref)===null||o===void 0?void 0:o.$cstNode;if(!a)return;let c=this.nameProvider.getNameNode(a.astNode);if(!c)return;let u=ne(a.astNode).uri.toString(),l=u+"@"+c.text;n.has(l)?n.set(l,{refCstNode:a,to:c,from:[...n.get(l).from,s.range],docUri:u}):n.set(l,{refCstNode:a,to:c,from:[s.range],docUri:u})}),n.size!==0)return Array.from(n.values()).map(i=>({to:{kind:Hh.SymbolKind.Method,name:i.to.text,range:i.refCstNode.range,selectionRange:i.to.range,uri:i.docUri},fromRanges:i.from}))}};var lf=class{constructor(e){this.documents=e.shared.workspace.LangiumDocuments}collectValidationResources(e){let r=zR(e,this.documents);return{typeToValidationInfo:this.collectValidationInfo(r),typeToSuperProperties:this.collectSuperProperties(r)}}collectValidationInfo({astResources:e,inferred:r,declared:n}){let i=new Map,o=lP(e);for(let a of vl(r))i.set(a.name,{inferred:a,inferredNodes:o.get(a.name)});let s=ie(e.interfaces).concat(e.types).reduce((a,c)=>a.set(c.name,c),new Map);for(let a of vl(n)){let c=s.get(a.name);if(c){let u=i.get(a.name);i.set(a.name,Object.assign(Object.assign({},u??{}),{declared:a,declaredNode:c}))}}return i}collectSuperProperties({inferred:e,declared:r}){let n=new Map,i=ph(e,r),o=new Map(i.map(s=>[s.name,s]));for(let s of ph(e,r))n.set(s.name,this.addSuperProperties(s,o,new Set));return n}addSuperProperties(e,r,n){if(n.has(e.name))return[];n.add(e.name);let i=[...e.properties];for(let o of e.superTypes){let s=r.get(o.name);s&&i.push(...this.addSuperProperties(s,r,n))}return i}};function lP({parserRules:t,datatypeRules:e}){let r=new Me;ie(t).concat(e).forEach(i=>r.add($o(i),i));function n(i){if($e(i)){let o=As(i);o&&r.add(o,i)}(Dr(i)||Ft(i)||Or(i))&&i.elements.forEach(o=>n(o))}return t.forEach(i=>n(i.definition)),r}function hx(t){return t&&"declared"in t}function gx(t){return t&&"inferred"in t}function yx(t){return t&&"inferred"in t&&"declared"in t}function vx(t){let e=t.validation.ValidationRegistry,r=t.validation.LangiumGrammarTypesValidator,n={Action:[r.checkActionIsNotUnionType],Grammar:[r.checkDeclaredTypesConsistency,r.checkDeclaredAndInferredTypesConsistency],Interface:[r.checkCyclicInterface],Type:[r.checkCyclicType]};e.register(n,r)}var ff=class{checkCyclicType(e,r){Ui(e,new Set)&&r("error",`Type alias '${e.name}' circularly references itself.`,{node:e,property:"name"})}checkCyclicInterface(e,r){Ui(e,new Set)&&r("error",`Type '${e.name}' recursively references itself as a base type.`,{node:e,property:"name"})}checkDeclaredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i){for(let o of i.typeToValidationInfo.values())if(hx(o)&&yn(o.declared)&&wr(o.declaredNode)){let s=o;dP(s,r),pP(s,r)}}}checkDeclaredAndInferredTypesConsistency(e,r){var n;let i=(n=e.$document)===null||n===void 0?void 0:n.validationResources;if(i)for(let o of i.typeToValidationInfo.values())gx(o)&&o.inferred instanceof ys&&fP(o.inferred,r),yx(o)&&gP(o,i,r)}checkActionIsNotUnionType(e,r){Mt(e.type)&&r("error","Actions cannot create union types.",{node:e,property:"type"})}};function Ui(t,e){var r;if(e.has(t))return!0;if(e.add(t),Mt(t))return Ui(t.type,e);if(wr(t))return t.superTypes.some(n=>n.ref&&Ui(n.ref,new Set(e)));if(or(t)){if(!((r=t.typeRef)===null||r===void 0)&&r.ref)return Ui(t.typeRef.ref,e)}else{if(Co(t))return Ui(t.referenceType,e);if(wo(t))return Ui(t.elementType,e);if(Xr(t))return t.types.some(n=>Ui(n,new Set(e)))}return!1}function fP(t,e){t.properties.forEach(r=>{var n;let i=lh(r.type);if(i.length>1){let o=a=>ai(a)?"ref":"other",s=o(i[0]);if(i.slice(1).some(a=>o(a)!==s)){let a=(n=r.astNodes.values().next())===null||n===void 0?void 0:n.value;a&&e("error",`Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`,{node:a})}}})}function dP({declared:t,declaredNode:e},r){Array.from(t.superTypes).forEach((n,i)=>{n&&(hn(n)&&r("error","Interfaces cannot extend union types.",{node:e,property:"superTypes",index:i}),n.declared||r("error","Extending an inferred type is discouraged.",{node:e,property:"superTypes",index:i}))})}function pP({declared:t,declaredNode:e},r){let n=t.properties.reduce((s,a)=>s.add(a.name,a),new Me);for(let[s,a]of n.entriesGroupedByKey())if(a.length>1)for(let c of a)r("error",`Cannot have two properties with the same name '${s}'.`,{node:Array.from(c.astNodes)[0],property:"name"});let i=Array.from(t.superTypes);for(let s=0;s<i.length;s++)for(let a=s+1;a<i.length;a++){let c=i[s],u=i[a],l=yn(c)?c.superProperties:[],f=yn(u)?u.superProperties:[],m=mP(l,f);m.length>0&&r("error",`Cannot simultaneously inherit from '${c}' and '${u}'. Their ${m.map(T=>"'"+T+"'").join(", ")} properties are not identical.`,{node:e,property:"name"})}let o=new Set;for(let s of i){let a=yn(s)?s.superProperties:[];for(let c of a)o.add(c.name)}for(let s of t.properties)if(o.has(s.name)){let a=e.attributes.find(c=>c.name===s.name);a&&r("error",`Cannot redeclare property '${s.name}'. It is already inherited from another interface.`,{node:a,property:"name"})}}function mP(t,e){let r=[];for(let n of t){let i=e.find(o=>o.name===n.name);i&&!hP(n,i)&&r.push(n.name)}return r}function hP(t,e){return cc(t.type,e.type)&&cc(e.type,t.type)}function gP(t,e,r){let{inferred:n,declared:i,declaredNode:o,inferredNodes:s}=t,a=i.name,c=f=>m=>s.forEach(T=>r("error",`${m}${f?` ${f}`:""}.`,T?.inferredType?{node:T?.inferredType,property:"name"}:{node:T,property:$e(T)?"type":"name"})),u=(f,m)=>f.forEach(T=>r("error",m,{node:T,property:xe(T)||$e(T)?"feature":"name"})),l=f=>{s.forEach(m=>{K(m)&&ws(m.definition).find(S=>S.feature===f)===void 0&&r("error",`Property '${f}' is missing in a rule '${m.name}', but is required in type '${a}'.`,{node:m,property:"parameters"})})};if(hn(n)&&hn(i))yP(n.type,i.type,c(`in a rule that returns type '${a}'`));else if(yn(n)&&yn(i))TP(n,i,e,c(`in a rule that returns type '${a}'`),u,l);else{let f=`Inferred and declared versions of type '${a}' both have to be interfaces or unions.`;c()(f),r("error",f,{node:o,property:"name"})}}function yP(t,e,r){cc(t,e)||r(`Cannot assign type '${gn(t,"DeclaredType")}' to '${gn(e,"DeclaredType")}'`)}function Tx(t){return t.optional||yl(t.type)}function TP(t,e,r,n,i,o){let s=new Set(t.properties.map(f=>f.name)),a=new Map(t.allProperties.map(f=>[f.name,f])),c=new Map(e.superProperties.map(f=>[f.name,f])),u=f=>{if(Dt(f))return{types:f.types.map(m=>u(m))};if(ai(f))return{referenceType:u(f.referenceType)};if(ci(f))return{elementType:u(f.elementType)};if(Lr(f)){let m=r.typeToValidationInfo.get(f.value.name);return m?{value:"declared"in m?m.declared:m.inferred}:f}return f};for(let[f,m]of a.entries()){let T=c.get(f);if(T){let S=gn(m.type,"DeclaredType"),C=gn(T.type,"DeclaredType");if(!cc(u(m.type),T.type)&&C!=="unknown"){let A=`The assigned type '${S}' is not compatible with the declared property '${f}' of type '${C}'.`;i(m.astNodes,A)}m.optional&&!Tx(T)&&o(f)}else s.has(f)&&i(m.astNodes,`A property '${f}' is not expected.`)}let l=new Set;for(let[f,m]of c.entries())!a.get(f)&&!Tx(m)&&l.add(f);if(l.size>0){let f=l.size>1?"Properties":"A property",m=l.size>1?"are expected":"is expected",T=Array.from(l).map(S=>`'${S}'`).sort().join(", ");n(`${f} ${T} ${m}.`)}}var vP={validation:{LangiumGrammarValidator:t=>new kl(t),ValidationResourcesCollector:t=>new lf(t),LangiumGrammarTypesValidator:()=>new ff},lsp:{FoldingRangeProvider:t=>new ql(t),CodeActionProvider:t=>new Ol(t),SemanticTokenProvider:t=>new Wl(t),Formatter:()=>new Hl,DefinitionProvider:t=>new cf(t),CallHierarchyProvider:t=>new uf(t),CompletionProvider:t=>new Ul(t)},references:{ScopeComputation:t=>new Pl(t),ScopeProvider:t=>new Il(t),References:t=>new zl(t),NameProvider:()=>new Bl}};function Rx(t,e){let r=bo(Ac(t),VR,e),n=bo(Cc({shared:r}),XR,vP);return RP(r,n),r.ServiceRegistry.register(n),$R(n),vx(n),{shared:r,grammar:n}}function RP(t,e){t.workspace.DocumentBuilder.onBuildPhase(He.IndexedReferences,async(n,i)=>{for(let o of n){await et(i);let s=e.validation.ValidationResourcesCollector,a=o.parseResult.value;o.validationResources=s.collectValidationResources(a)}})}var Kh=class{readFile(){throw new Error("Method not implemented.")}readFileSync(){throw new Error("Method not implemented.")}async readDirectory(){return[]}},df={fileSystemProvider:()=>new Kh};function Fl(t){return t.rules.find(e=>K(e)&&e.entry)}function xP(t){return t.rules.filter(e=>we(e)&&e.hidden)}function Ss(t,e){let r=new Set,n=Fl(t);if(!n)return new Set(t.rules);let i=[n].concat(xP(t));for(let s of i)xx(s,r,e);let o=new Set;for(let s of t.rules)(r.has(s.name)||we(s)&&s.hidden)&&o.add(s);return o}function xx(t,e,r){e.add(t.name),Ze(t).forEach(n=>{if(Ie(n)||r&&ll(n)){let i=n.rule.ref;i&&!e.has(i.name)&&xx(i,e,r)}})}function Ml(t){if(t.terminal)return t.terminal;if(t.type.ref){let e=vc(t.type.ref);return e?.terminal}}function bx(t){return t.hidden&&!Qr(t).test(" ")}function Oi(t,e){return!t||!e?[]:Wh(t,e,t.astNode,!0)}function Yt(t,e,r){if(!t||!e)return;let n=Wh(t,e,t.astNode,!0);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function Wh(t,e,r,n){if(!n){let i=Pe(t.grammarSource,xe);if(i&&i.feature===e)return[t]}return $n(t)&&t.astNode===r?t.content.flatMap(i=>Wh(i,e,r,!1)):[]}function Gl(t,e){return t?Sx(t,e,t?.astNode):[]}function Yr(t,e,r){if(!t)return;let n=Sx(t,e,t?.astNode);if(n.length!==0)return r!==void 0?r=Math.max(0,Math.min(r,n.length-1)):r=0,n[r]}function Sx(t,e,r){if(t.astNode!==r)return[];if(pt(t.grammarSource)&&t.grammarSource.value===e)return[t];let n=Ym(t).iterator(),i,o=[];do if(i=n.next(),!i.done){let s=i.value;s.astNode===r?pt(s.grammarSource)&&s.grammarSource.value===e&&o.push(s):n.prune()}while(!i.done);return o}function Ls(t){var e;let r=t.astNode;for(;r===((e=t.container)===null||e===void 0?void 0:e.astNode);){let n=Pe(t.grammarSource,xe);if(n)return n;t=t.container}}function vc(t){return fs(t)&&(t=t.$container),wx(t,new Map)}function wx(t,e){var r;function n(i,o){let s;return Pe(i,xe)||(s=wx(o,e)),e.set(t,s),s}if(e.has(t))return e.get(t);e.set(t,void 0);for(let i of Ze(t)){if(xe(i)&&i.feature.toLowerCase()==="name")return e.set(t,i),i;if(Ie(i)&&K(i.rule.ref))return n(i,i.rule.ref);if(or(i)&&(!((r=i.typeRef)===null||r===void 0)&&r.ref))return n(i,i.typeRef.ref)}}function Sl(t){var e;let r=Rx(df).grammar,n=r.serializer.JsonSerializer.deserialize(t);return r.shared.workspace.LangiumDocumentFactory.fromModel(n,Jt.parse(`memory://${(e=n.name)!==null&&e!==void 0?e:"grammar"}.langium`)),n}function Cx(t){let e=[],r=t.Grammar;for(let n of r.rules)we(n)&&bx(n)&&xR(Qr(n))&&e.push(n.name);return{multilineCommentRules:e,nameRegexp:Jm}}var bP=typeof global=="object"&&global&&global.Object===Object&&global,pf=bP;var SP=typeof self=="object"&&self&&self.Object===Object&&self,wP=pf||SP||Function("return this")(),_t=wP;var CP=_t.Symbol,Ut=CP;var Ax=Object.prototype,AP=Ax.hasOwnProperty,kP=Ax.toString,kc=Ut?Ut.toStringTag:void 0;function EP(t){var e=AP.call(t,kc),r=t[kc];try{t[kc]=void 0;var n=!0}catch{}var i=kP.call(t);return n&&(e?t[kc]=r:delete t[kc]),i}var kx=EP;var _P=Object.prototype,NP=_P.toString;function $P(t){return NP.call(t)}var Ex=$P;var IP="[object Null]",PP="[object Undefined]",_x=Ut?Ut.toStringTag:void 0;function DP(t){return t==null?t===void 0?PP:IP:_x&&_x in Object(t)?kx(t):Ex(t)}var gr=DP;function OP(t){return t!=null&&typeof t=="object"}var yt=OP;var LP="[object Symbol]";function MP(t){return typeof t=="symbol"||yt(t)&&gr(t)==LP}var On=MP;function FP(t,e){for(var r=-1,n=t==null?0:t.length,i=Array(n);++r<n;)i[r]=e(t[r],r,t);return i}var Ln=FP;var UP=Array.isArray,z=UP;var qP=1/0,Nx=Ut?Ut.prototype:void 0,$x=Nx?Nx.toString:void 0;function Ix(t){if(typeof t=="string")return t;if(z(t))return Ln(t,Ix)+"";if(On(t))return $x?$x.call(t):"";var e=t+"";return e=="0"&&1/t==-qP?"-0":e}var Px=Ix;var jP=/\s/;function GP(t){for(var e=t.length;e--&&jP.test(t.charAt(e)););return e}var Dx=GP;var HP=/^\s+/;function KP(t){return t&&t.slice(0,Dx(t)+1).replace(HP,"")}var Ox=KP;function WP(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var at=WP;var Lx=0/0,BP=/^[-+]0x[0-9a-f]+$/i,zP=/^0b[01]+$/i,VP=/^0o[0-7]+$/i,XP=parseInt;function YP(t){if(typeof t=="number")return t;if(On(t))return Lx;if(at(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=at(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=Ox(t);var r=zP.test(t);return r||VP.test(t)?XP(t.slice(2),r?2:8):BP.test(t)?Lx:+t}var Mx=YP;var Fx=1/0,JP=17976931348623157e292;function QP(t){if(!t)return t===0?t:0;if(t=Mx(t),t===Fx||t===-Fx){var e=t<0?-1:1;return e*JP}return t===t?t:0}var Ux=QP;function ZP(t){var e=Ux(t),r=e%1;return e===e?r?e-r:e:0}var Mn=ZP;function eD(t){return t}var Cr=eD;var tD="[object AsyncFunction]",rD="[object Function]",nD="[object GeneratorFunction]",iD="[object Proxy]";function oD(t){if(!at(t))return!1;var e=gr(t);return e==rD||e==nD||e==tD||e==iD}var yr=oD;var sD=_t["__core-js_shared__"],mf=sD;var qx=function(){var t=/[^.]+$/.exec(mf&&mf.keys&&mf.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();function aD(t){return!!qx&&qx in t}var jx=aD;var cD=Function.prototype,uD=cD.toString;function lD(t){if(t!=null){try{return uD.call(t)}catch{}try{return t+""}catch{}}return""}var mi=lD;var fD=/[\\^$.*+?()[\]{}|]/g,dD=/^\[object .+?Constructor\]$/,pD=Function.prototype,mD=Object.prototype,hD=pD.toString,gD=mD.hasOwnProperty,yD=RegExp("^"+hD.call(gD).replace(fD,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");function TD(t){if(!at(t)||jx(t))return!1;var e=yr(t)?yD:dD;return e.test(mi(t))}var Gx=TD;function vD(t,e){return t?.[e]}var Hx=vD;function RD(t,e){var r=Hx(t,e);return Gx(r)?r:void 0}var Ar=RD;var xD=Ar(_t,"WeakMap"),hf=xD;var Kx=Object.create,bD=function(){function t(){}return function(e){if(!at(e))return{};if(Kx)return Kx(e);t.prototype=e;var r=new t;return t.prototype=void 0,r}}(),Wx=bD;function SD(t,e,r){switch(r.length){case 0:return t.call(e);case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2])}return t.apply(e,r)}var Bx=SD;function wD(){}var ct=wD;function CD(t,e){var r=-1,n=t.length;for(e||(e=Array(n));++r<n;)e[r]=t[r];return e}var zx=CD;var AD=800,kD=16,ED=Date.now;function _D(t){var e=0,r=0;return function(){var n=ED(),i=kD-(n-r);if(r=n,i>0){if(++e>=AD)return arguments[0]}else e=0;return t.apply(void 0,arguments)}}var Vx=_D;function ND(t){return function(){return t}}var Xx=ND;var $D=function(){try{var t=Ar(Object,"defineProperty");return t({},"",{}),t}catch{}}(),Us=$D;var ID=Us?function(t,e){return Us(t,"toString",{configurable:!0,enumerable:!1,value:Xx(e),writable:!0})}:Cr,Yx=ID;var PD=Vx(Yx),Jx=PD;function DD(t,e){for(var r=-1,n=t==null?0:t.length;++r<n&&e(t[r],r,t)!==!1;);return t}var gf=DD;function OD(t,e,r,n){for(var i=t.length,o=r+(n?1:-1);n?o--:++o<i;)if(e(t[o],o,t))return o;return-1}var yf=OD;function LD(t){return t!==t}var Qx=LD;function MD(t,e,r){for(var n=r-1,i=t.length;++n<i;)if(t[n]===e)return n;return-1}var Zx=MD;function FD(t,e,r){return e===e?Zx(t,e,r):yf(t,Qx,r)}var qs=FD;function UD(t,e){var r=t==null?0:t.length;return!!r&&qs(t,e,0)>-1}var Tf=UD;var qD=9007199254740991,jD=/^(?:0|[1-9]\d*)$/;function GD(t,e){var r=typeof t;return e=e??qD,!!e&&(r=="number"||r!="symbol"&&jD.test(t))&&t>-1&&t%1==0&&t<e}var qi=GD;function HD(t,e,r){e=="__proto__"&&Us?Us(t,e,{configurable:!0,enumerable:!0,value:r,writable:!0}):t[e]=r}var js=HD;function KD(t,e){return t===e||t!==t&&e!==e}var Fn=KD;var WD=Object.prototype,BD=WD.hasOwnProperty;function zD(t,e,r){var n=t[e];(!(BD.call(t,e)&&Fn(n,r))||r===void 0&&!(e in t))&&js(t,e,r)}var ji=zD;function VD(t,e,r,n){var i=!r;r||(r={});for(var o=-1,s=e.length;++o<s;){var a=e[o],c=n?n(r[a],t[a],a,r,t):void 0;c===void 0&&(c=t[a]),i?js(r,a,c):ji(r,a,c)}return r}var Un=VD;var eb=Math.max;function XD(t,e,r){return e=eb(e===void 0?t.length-1:e,0),function(){for(var n=arguments,i=-1,o=eb(n.length-e,0),s=Array(o);++i<o;)s[i]=n[e+i];i=-1;for(var a=Array(e+1);++i<e;)a[i]=n[i];return a[e]=r(s),Bx(t,this,a)}}var tb=XD;function YD(t,e){return Jx(tb(t,e,Cr),t+"")}var Gs=YD;var JD=9007199254740991;function QD(t){return typeof t=="number"&&t>-1&&t%1==0&&t<=JD}var Hs=QD;function ZD(t){return t!=null&&Hs(t.length)&&!yr(t)}var Nt=ZD;function e0(t,e,r){if(!at(r))return!1;var n=typeof e;return(n=="number"?Nt(r)&&qi(e,r.length):n=="string"&&e in r)?Fn(r[e],t):!1}var Gi=e0;function t0(t){return Gs(function(e,r){var n=-1,i=r.length,o=i>1?r[i-1]:void 0,s=i>2?r[2]:void 0;for(o=t.length>3&&typeof o=="function"?(i--,o):void 0,s&&Gi(r[0],r[1],s)&&(o=i<3?void 0:o,i=1),e=Object(e);++n<i;){var a=r[n];a&&t(e,a,n,o)}return e})}var rb=t0;var r0=Object.prototype;function n0(t){var e=t&&t.constructor,r=typeof e=="function"&&e.prototype||r0;return t===r}var qn=n0;function i0(t,e){for(var r=-1,n=Array(t);++r<t;)n[r]=e(r);return n}var nb=i0;var o0="[object Arguments]";function s0(t){return yt(t)&&gr(t)==o0}var Bh=s0;var ib=Object.prototype,a0=ib.hasOwnProperty,c0=ib.propertyIsEnumerable,u0=Bh(function(){return arguments}())?Bh:function(t){return yt(t)&&a0.call(t,"callee")&&!c0.call(t,"callee")},Hi=u0;function l0(){return!1}var ob=l0;var cb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,sb=cb&&typeof module=="object"&&module&&!module.nodeType&&module,f0=sb&&sb.exports===cb,ab=f0?_t.Buffer:void 0,d0=ab?ab.isBuffer:void 0,p0=d0||ob,hi=p0;var m0="[object Arguments]",h0="[object Array]",g0="[object Boolean]",y0="[object Date]",T0="[object Error]",v0="[object Function]",R0="[object Map]",x0="[object Number]",b0="[object Object]",S0="[object RegExp]",w0="[object Set]",C0="[object String]",A0="[object WeakMap]",k0="[object ArrayBuffer]",E0="[object DataView]",_0="[object Float32Array]",N0="[object Float64Array]",$0="[object Int8Array]",I0="[object Int16Array]",P0="[object Int32Array]",D0="[object Uint8Array]",O0="[object Uint8ClampedArray]",L0="[object Uint16Array]",M0="[object Uint32Array]",Je={};Je[_0]=Je[N0]=Je[$0]=Je[I0]=Je[P0]=Je[D0]=Je[O0]=Je[L0]=Je[M0]=!0;Je[m0]=Je[h0]=Je[k0]=Je[g0]=Je[E0]=Je[y0]=Je[T0]=Je[v0]=Je[R0]=Je[x0]=Je[b0]=Je[S0]=Je[w0]=Je[C0]=Je[A0]=!1;function F0(t){return yt(t)&&Hs(t.length)&&!!Je[gr(t)]}var ub=F0;function U0(t){return function(e){return t(e)}}var jn=U0;var lb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,Ec=lb&&typeof module=="object"&&module&&!module.nodeType&&module,q0=Ec&&Ec.exports===lb,zh=q0&&pf.process,j0=function(){try{var t=Ec&&Ec.require&&Ec.require("util").types;return t||zh&&zh.binding&&zh.binding("util")}catch{}}(),en=j0;var fb=en&&en.isTypedArray,G0=fb?jn(fb):ub,Ks=G0;var H0=Object.prototype,K0=H0.hasOwnProperty;function W0(t,e){var r=z(t),n=!r&&Hi(t),i=!r&&!n&&hi(t),o=!r&&!n&&!i&&Ks(t),s=r||n||i||o,a=s?nb(t.length,String):[],c=a.length;for(var u in t)(e||K0.call(t,u))&&!(s&&(u=="length"||i&&(u=="offset"||u=="parent")||o&&(u=="buffer"||u=="byteLength"||u=="byteOffset")||qi(u,c)))&&a.push(u);return a}var vf=W0;function B0(t,e){return function(r){return t(e(r))}}var Rf=B0;var z0=Rf(Object.keys,Object),db=z0;var V0=Object.prototype,X0=V0.hasOwnProperty;function Y0(t){if(!qn(t))return db(t);var e=[];for(var r in Object(t))X0.call(t,r)&&r!="constructor"&&e.push(r);return e}var xf=Y0;function J0(t){return Nt(t)?vf(t):xf(t)}var Ke=J0;var Q0=Object.prototype,Z0=Q0.hasOwnProperty,eO=rb(function(t,e){if(qn(e)||Nt(e)){Un(e,Ke(e),t);return}for(var r in e)Z0.call(e,r)&&ji(t,r,e[r])}),Qt=eO;function tO(t){var e=[];if(t!=null)for(var r in Object(t))e.push(r);return e}var pb=tO;var rO=Object.prototype,nO=rO.hasOwnProperty;function iO(t){if(!at(t))return pb(t);var e=qn(t),r=[];for(var n in t)n=="constructor"&&(e||!nO.call(t,n))||r.push(n);return r}var mb=iO;function oO(t){return Nt(t)?vf(t,!0):mb(t)}var Ki=oO;var sO=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,aO=/^\w*$/;function cO(t,e){if(z(t))return!1;var r=typeof t;return r=="number"||r=="symbol"||r=="boolean"||t==null||On(t)?!0:aO.test(t)||!sO.test(t)||e!=null&&t in Object(e)}var Ws=cO;var uO=Ar(Object,"create"),gi=uO;function lO(){this.__data__=gi?gi(null):{},this.size=0}var hb=lO;function fO(t){var e=this.has(t)&&delete this.__data__[t];return this.size-=e?1:0,e}var gb=fO;var dO="__lodash_hash_undefined__",pO=Object.prototype,mO=pO.hasOwnProperty;function hO(t){var e=this.__data__;if(gi){var r=e[t];return r===dO?void 0:r}return mO.call(e,t)?e[t]:void 0}var yb=hO;var gO=Object.prototype,yO=gO.hasOwnProperty;function TO(t){var e=this.__data__;return gi?e[t]!==void 0:yO.call(e,t)}var Tb=TO;var vO="__lodash_hash_undefined__";function RO(t,e){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=gi&&e===void 0?vO:e,this}var vb=RO;function Bs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Bs.prototype.clear=hb;Bs.prototype.delete=gb;Bs.prototype.get=yb;Bs.prototype.has=Tb;Bs.prototype.set=vb;var Vh=Bs;function xO(){this.__data__=[],this.size=0}var Rb=xO;function bO(t,e){for(var r=t.length;r--;)if(Fn(t[r][0],e))return r;return-1}var Wi=bO;var SO=Array.prototype,wO=SO.splice;function CO(t){var e=this.__data__,r=Wi(e,t);if(r<0)return!1;var n=e.length-1;return r==n?e.pop():wO.call(e,r,1),--this.size,!0}var xb=CO;function AO(t){var e=this.__data__,r=Wi(e,t);return r<0?void 0:e[r][1]}var bb=AO;function kO(t){return Wi(this.__data__,t)>-1}var Sb=kO;function EO(t,e){var r=this.__data__,n=Wi(r,t);return n<0?(++this.size,r.push([t,e])):r[n][1]=e,this}var wb=EO;function zs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}zs.prototype.clear=Rb;zs.prototype.delete=xb;zs.prototype.get=bb;zs.prototype.has=Sb;zs.prototype.set=wb;var Bi=zs;var _O=Ar(_t,"Map"),zi=_O;function NO(){this.size=0,this.__data__={hash:new Vh,map:new(zi||Bi),string:new Vh}}var Cb=NO;function $O(t){var e=typeof t;return e=="string"||e=="number"||e=="symbol"||e=="boolean"?t!=="__proto__":t===null}var Ab=$O;function IO(t,e){var r=t.__data__;return Ab(e)?r[typeof e=="string"?"string":"hash"]:r.map}var Vi=IO;function PO(t){var e=Vi(this,t).delete(t);return this.size-=e?1:0,e}var kb=PO;function DO(t){return Vi(this,t).get(t)}var Eb=DO;function OO(t){return Vi(this,t).has(t)}var _b=OO;function LO(t,e){var r=Vi(this,t),n=r.size;return r.set(t,e),this.size+=r.size==n?0:1,this}var Nb=LO;function Vs(t){var e=-1,r=t==null?0:t.length;for(this.clear();++e<r;){var n=t[e];this.set(n[0],n[1])}}Vs.prototype.clear=Cb;Vs.prototype.delete=kb;Vs.prototype.get=Eb;Vs.prototype.has=_b;Vs.prototype.set=Nb;var Do=Vs;var MO="Expected a function";function Xh(t,e){if(typeof t!="function"||e!=null&&typeof e!="function")throw new TypeError(MO);var r=function(){var n=arguments,i=e?e.apply(this,n):n[0],o=r.cache;if(o.has(i))return o.get(i);var s=t.apply(this,n);return r.cache=o.set(i,s)||o,s};return r.cache=new(Xh.Cache||Do),r}Xh.Cache=Do;var $b=Xh;var FO=500;function UO(t){var e=$b(t,function(n){return r.size===FO&&r.clear(),n}),r=e.cache;return e}var Ib=UO;var qO=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,jO=/\\(\\)?/g,GO=Ib(function(t){var e=[];return t.charCodeAt(0)===46&&e.push(""),t.replace(qO,function(r,n,i,o){e.push(i?o.replace(jO,"$1"):n||r)}),e}),Pb=GO;function HO(t){return t==null?"":Px(t)}var Db=HO;function KO(t,e){return z(t)?t:Ws(t,e)?[t]:Pb(Db(t))}var Xi=KO;var WO=1/0;function BO(t){if(typeof t=="string"||On(t))return t;var e=t+"";return e=="0"&&1/t==-WO?"-0":e}var Gn=BO;function zO(t,e){e=Xi(e,t);for(var r=0,n=e.length;t!=null&&r<n;)t=t[Gn(e[r++])];return r&&r==n?t:void 0}var Xs=zO;function VO(t,e,r){var n=t==null?void 0:Xs(t,e);return n===void 0?r:n}var Ob=VO;function XO(t,e){for(var r=-1,n=e.length,i=t.length;++r<n;)t[i+r]=e[r];return t}var Ys=XO;var Lb=Ut?Ut.isConcatSpreadable:void 0;function YO(t){return z(t)||Hi(t)||!!(Lb&&t&&t[Lb])}var Mb=YO;function Fb(t,e,r,n,i){var o=-1,s=t.length;for(r||(r=Mb),i||(i=[]);++o<s;){var a=t[o];e>0&&r(a)?e>1?Fb(a,e-1,r,n,i):Ys(i,a):n||(i[i.length]=a)}return i}var Js=Fb;function JO(t){var e=t==null?0:t.length;return e?Js(t,1):[]}var Tt=JO;var QO=Rf(Object.getPrototypeOf,Object),bf=QO;function ZO(t,e,r){var n=-1,i=t.length;e<0&&(e=-e>i?0:i+e),r=r>i?i:r,r<0&&(r+=i),i=e>r?0:r-e>>>0,e>>>=0;for(var o=Array(i);++n<i;)o[n]=t[n+e];return o}var Sf=ZO;function eL(t,e,r,n){var i=-1,o=t==null?0:t.length;for(n&&o&&(r=t[++i]);++i<o;)r=e(r,t[i],i,t);return r}var Ub=eL;function tL(){this.__data__=new Bi,this.size=0}var qb=tL;function rL(t){var e=this.__data__,r=e.delete(t);return this.size=e.size,r}var jb=rL;function nL(t){return this.__data__.get(t)}var Gb=nL;function iL(t){return this.__data__.has(t)}var Hb=iL;var oL=200;function sL(t,e){var r=this.__data__;if(r instanceof Bi){var n=r.__data__;if(!zi||n.length<oL-1)return n.push([t,e]),this.size=++r.size,this;r=this.__data__=new Do(n)}return r.set(t,e),this.size=r.size,this}var Kb=sL;function Qs(t){var e=this.__data__=new Bi(t);this.size=e.size}Qs.prototype.clear=qb;Qs.prototype.delete=jb;Qs.prototype.get=Gb;Qs.prototype.has=Hb;Qs.prototype.set=Kb;var Yi=Qs;function aL(t,e){return t&&Un(e,Ke(e),t)}var Wb=aL;function cL(t,e){return t&&Un(e,Ki(e),t)}var Bb=cL;var Yb=typeof exports=="object"&&exports&&!exports.nodeType&&exports,zb=Yb&&typeof module=="object"&&module&&!module.nodeType&&module,uL=zb&&zb.exports===Yb,Vb=uL?_t.Buffer:void 0,Xb=Vb?Vb.allocUnsafe:void 0;function lL(t,e){if(e)return t.slice();var r=t.length,n=Xb?Xb(r):new t.constructor(r);return t.copy(n),n}var Jb=lL;function fL(t,e){for(var r=-1,n=t==null?0:t.length,i=0,o=[];++r<n;){var s=t[r];e(s,r,t)&&(o[i++]=s)}return o}var Zs=fL;function dL(){return[]}var wf=dL;var pL=Object.prototype,mL=pL.propertyIsEnumerable,Qb=Object.getOwnPropertySymbols,hL=Qb?function(t){return t==null?[]:(t=Object(t),Zs(Qb(t),function(e){return mL.call(t,e)}))}:wf,ea=hL;function gL(t,e){return Un(t,ea(t),e)}var Zb=gL;var yL=Object.getOwnPropertySymbols,TL=yL?function(t){for(var e=[];t;)Ys(e,ea(t)),t=bf(t);return e}:wf,Cf=TL;function vL(t,e){return Un(t,Cf(t),e)}var eS=vL;function RL(t,e,r){var n=e(t);return z(t)?n:Ys(n,r(t))}var Af=RL;function xL(t){return Af(t,Ke,ea)}var _c=xL;function bL(t){return Af(t,Ki,Cf)}var kf=bL;var SL=Ar(_t,"DataView"),Ef=SL;var wL=Ar(_t,"Promise"),_f=wL;var CL=Ar(_t,"Set"),Ji=CL;var tS="[object Map]",AL="[object Object]",rS="[object Promise]",nS="[object Set]",iS="[object WeakMap]",oS="[object DataView]",kL=mi(Ef),EL=mi(zi),_L=mi(_f),NL=mi(Ji),$L=mi(hf),Oo=gr;(Ef&&Oo(new Ef(new ArrayBuffer(1)))!=oS||zi&&Oo(new zi)!=tS||_f&&Oo(_f.resolve())!=rS||Ji&&Oo(new Ji)!=nS||hf&&Oo(new hf)!=iS)&&(Oo=function(t){var e=gr(t),r=e==AL?t.constructor:void 0,n=r?mi(r):"";if(n)switch(n){case kL:return oS;case EL:return tS;case _L:return rS;case NL:return nS;case $L:return iS}return e});var xn=Oo;var IL=Object.prototype,PL=IL.hasOwnProperty;function DL(t){var e=t.length,r=new t.constructor(e);return e&&typeof t[0]=="string"&&PL.call(t,"index")&&(r.index=t.index,r.input=t.input),r}var sS=DL;var OL=_t.Uint8Array,ta=OL;function LL(t){var e=new t.constructor(t.byteLength);return new ta(e).set(new ta(t)),e}var ra=LL;function ML(t,e){var r=e?ra(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.byteLength)}var aS=ML;var FL=/\w*$/;function UL(t){var e=new t.constructor(t.source,FL.exec(t));return e.lastIndex=t.lastIndex,e}var cS=UL;var uS=Ut?Ut.prototype:void 0,lS=uS?uS.valueOf:void 0;function qL(t){return lS?Object(lS.call(t)):{}}var fS=qL;function jL(t,e){var r=e?ra(t.buffer):t.buffer;return new t.constructor(r,t.byteOffset,t.length)}var dS=jL;var GL="[object Boolean]",HL="[object Date]",KL="[object Map]",WL="[object Number]",BL="[object RegExp]",zL="[object Set]",VL="[object String]",XL="[object Symbol]",YL="[object ArrayBuffer]",JL="[object DataView]",QL="[object Float32Array]",ZL="[object Float64Array]",eM="[object Int8Array]",tM="[object Int16Array]",rM="[object Int32Array]",nM="[object Uint8Array]",iM="[object Uint8ClampedArray]",oM="[object Uint16Array]",sM="[object Uint32Array]";function aM(t,e,r){var n=t.constructor;switch(e){case YL:return ra(t);case GL:case HL:return new n(+t);case JL:return aS(t,r);case QL:case ZL:case eM:case tM:case rM:case nM:case iM:case oM:case sM:return dS(t,r);case KL:return new n;case WL:case VL:return new n(t);case BL:return cS(t);case zL:return new n;case XL:return fS(t)}}var pS=aM;function cM(t){return typeof t.constructor=="function"&&!qn(t)?Wx(bf(t)):{}}var mS=cM;var uM="[object Map]";function lM(t){return yt(t)&&xn(t)==uM}var hS=lM;var gS=en&&en.isMap,fM=gS?jn(gS):hS,yS=fM;var dM="[object Set]";function pM(t){return yt(t)&&xn(t)==dM}var TS=pM;var vS=en&&en.isSet,mM=vS?jn(vS):TS,RS=mM;var hM=1,gM=2,yM=4,xS="[object Arguments]",TM="[object Array]",vM="[object Boolean]",RM="[object Date]",xM="[object Error]",bS="[object Function]",bM="[object GeneratorFunction]",SM="[object Map]",wM="[object Number]",SS="[object Object]",CM="[object RegExp]",AM="[object Set]",kM="[object String]",EM="[object Symbol]",_M="[object WeakMap]",NM="[object ArrayBuffer]",$M="[object DataView]",IM="[object Float32Array]",PM="[object Float64Array]",DM="[object Int8Array]",OM="[object Int16Array]",LM="[object Int32Array]",MM="[object Uint8Array]",FM="[object Uint8ClampedArray]",UM="[object Uint16Array]",qM="[object Uint32Array]",We={};We[xS]=We[TM]=We[NM]=We[$M]=We[vM]=We[RM]=We[IM]=We[PM]=We[DM]=We[OM]=We[LM]=We[SM]=We[wM]=We[SS]=We[CM]=We[AM]=We[kM]=We[EM]=We[MM]=We[FM]=We[UM]=We[qM]=!0;We[xM]=We[bS]=We[_M]=!1;function Nf(t,e,r,n,i,o){var s,a=e&hM,c=e&gM,u=e&yM;if(r&&(s=i?r(t,n,i,o):r(t)),s!==void 0)return s;if(!at(t))return t;var l=z(t);if(l){if(s=sS(t),!a)return zx(t,s)}else{var f=xn(t),m=f==bS||f==bM;if(hi(t))return Jb(t,a);if(f==SS||f==xS||m&&!i){if(s=c||m?{}:mS(t),!a)return c?eS(t,Bb(s,t)):Zb(t,Wb(s,t))}else{if(!We[f])return i?t:{};s=pS(t,f,a)}}o||(o=new Yi);var T=o.get(t);if(T)return T;o.set(t,s),RS(t)?t.forEach(function(N){s.add(Nf(N,e,r,N,t,o))}):yS(t)&&t.forEach(function(N,A){s.set(A,Nf(N,e,r,A,t,o))});var S=u?c?kf:_c:c?Ki:Ke,C=l?void 0:S(t);return gf(C||t,function(N,A){C&&(A=N,N=t[A]),ji(s,A,Nf(N,e,r,A,t,o))}),s}var wS=Nf;var jM=4;function GM(t){return wS(t,jM)}var Be=GM;function HM(t){for(var e=-1,r=t==null?0:t.length,n=0,i=[];++e<r;){var o=t[e];o&&(i[n++]=o)}return i}var Hn=HM;var KM="__lodash_hash_undefined__";function WM(t){return this.__data__.set(t,KM),this}var CS=WM;function BM(t){return this.__data__.has(t)}var AS=BM;function $f(t){var e=-1,r=t==null?0:t.length;for(this.__data__=new Do;++e<r;)this.add(t[e])}$f.prototype.add=$f.prototype.push=CS;$f.prototype.has=AS;var na=$f;function zM(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(e(t[r],r,t))return!0;return!1}var If=zM;function VM(t,e){return t.has(e)}var ia=VM;var XM=1,YM=2;function JM(t,e,r,n,i,o){var s=r&XM,a=t.length,c=e.length;if(a!=c&&!(s&&c>a))return!1;var u=o.get(t),l=o.get(e);if(u&&l)return u==e&&l==t;var f=-1,m=!0,T=r&YM?new na:void 0;for(o.set(t,e),o.set(e,t);++f<a;){var S=t[f],C=e[f];if(n)var N=s?n(C,S,f,e,t,o):n(S,C,f,t,e,o);if(N!==void 0){if(N)continue;m=!1;break}if(T){if(!If(e,function(A,v){if(!ia(T,v)&&(S===A||i(S,A,r,n,o)))return T.push(v)})){m=!1;break}}else if(!(S===C||i(S,C,r,n,o))){m=!1;break}}return o.delete(t),o.delete(e),m}var Pf=JM;function QM(t){var e=-1,r=Array(t.size);return t.forEach(function(n,i){r[++e]=[i,n]}),r}var kS=QM;function ZM(t){var e=-1,r=Array(t.size);return t.forEach(function(n){r[++e]=n}),r}var oa=ZM;var eF=1,tF=2,rF="[object Boolean]",nF="[object Date]",iF="[object Error]",oF="[object Map]",sF="[object Number]",aF="[object RegExp]",cF="[object Set]",uF="[object String]",lF="[object Symbol]",fF="[object ArrayBuffer]",dF="[object DataView]",ES=Ut?Ut.prototype:void 0,Yh=ES?ES.valueOf:void 0;function pF(t,e,r,n,i,o,s){switch(r){case dF:if(t.byteLength!=e.byteLength||t.byteOffset!=e.byteOffset)return!1;t=t.buffer,e=e.buffer;case fF:return!(t.byteLength!=e.byteLength||!o(new ta(t),new ta(e)));case rF:case nF:case sF:return Fn(+t,+e);case iF:return t.name==e.name&&t.message==e.message;case aF:case uF:return t==e+"";case oF:var a=kS;case cF:var c=n&eF;if(a||(a=oa),t.size!=e.size&&!c)return!1;var u=s.get(t);if(u)return u==e;n|=tF,s.set(t,e);var l=Pf(a(t),a(e),n,i,o,s);return s.delete(t),l;case lF:if(Yh)return Yh.call(t)==Yh.call(e)}return!1}var _S=pF;var mF=1,hF=Object.prototype,gF=hF.hasOwnProperty;function yF(t,e,r,n,i,o){var s=r&mF,a=_c(t),c=a.length,u=_c(e),l=u.length;if(c!=l&&!s)return!1;for(var f=c;f--;){var m=a[f];if(!(s?m in e:gF.call(e,m)))return!1}var T=o.get(t),S=o.get(e);if(T&&S)return T==e&&S==t;var C=!0;o.set(t,e),o.set(e,t);for(var N=s;++f<c;){m=a[f];var A=t[m],v=e[m];if(n)var y=s?n(v,A,m,e,t,o):n(A,v,m,t,e,o);if(!(y===void 0?A===v||i(A,v,r,n,o):y)){C=!1;break}N||(N=m=="constructor")}if(C&&!N){var _=t.constructor,D=e.constructor;_!=D&&"constructor"in t&&"constructor"in e&&!(typeof _=="function"&&_ instanceof _&&typeof D=="function"&&D instanceof D)&&(C=!1)}return o.delete(t),o.delete(e),C}var NS=yF;var TF=1,$S="[object Arguments]",IS="[object Array]",Df="[object Object]",vF=Object.prototype,PS=vF.hasOwnProperty;function RF(t,e,r,n,i,o){var s=z(t),a=z(e),c=s?IS:xn(t),u=a?IS:xn(e);c=c==$S?Df:c,u=u==$S?Df:u;var l=c==Df,f=u==Df,m=c==u;if(m&&hi(t)){if(!hi(e))return!1;s=!0,l=!1}if(m&&!l)return o||(o=new Yi),s||Ks(t)?Pf(t,e,r,n,i,o):_S(t,e,c,r,n,i,o);if(!(r&TF)){var T=l&&PS.call(t,"__wrapped__"),S=f&&PS.call(e,"__wrapped__");if(T||S){var C=T?t.value():t,N=S?e.value():e;return o||(o=new Yi),i(C,N,r,n,o)}}return m?(o||(o=new Yi),NS(t,e,r,n,i,o)):!1}var DS=RF;function OS(t,e,r,n,i){return t===e?!0:t==null||e==null||!yt(t)&&!yt(e)?t!==t&&e!==e:DS(t,e,r,n,OS,i)}var Of=OS;var xF=1,bF=2;function SF(t,e,r,n){var i=r.length,o=i,s=!n;if(t==null)return!o;for(t=Object(t);i--;){var a=r[i];if(s&&a[2]?a[1]!==t[a[0]]:!(a[0]in t))return!1}for(;++i<o;){a=r[i];var c=a[0],u=t[c],l=a[1];if(s&&a[2]){if(u===void 0&&!(c in t))return!1}else{var f=new Yi;if(n)var m=n(u,l,c,t,e,f);if(!(m===void 0?Of(l,u,xF|bF,n,f):m))return!1}}return!0}var LS=SF;function wF(t){return t===t&&!at(t)}var Lf=wF;function CF(t){for(var e=Ke(t),r=e.length;r--;){var n=e[r],i=t[n];e[r]=[n,i,Lf(i)]}return e}var MS=CF;function AF(t,e){return function(r){return r==null?!1:r[t]===e&&(e!==void 0||t in Object(r))}}var Mf=AF;function kF(t){var e=MS(t);return e.length==1&&e[0][2]?Mf(e[0][0],e[0][1]):function(r){return r===t||LS(r,t,e)}}var FS=kF;function EF(t,e){return t!=null&&e in Object(t)}var US=EF;function _F(t,e,r){e=Xi(e,t);for(var n=-1,i=e.length,o=!1;++n<i;){var s=Gn(e[n]);if(!(o=t!=null&&r(t,s)))break;t=t[s]}return o||++n!=i?o:(i=t==null?0:t.length,!!i&&Hs(i)&&qi(s,i)&&(z(t)||Hi(t)))}var Ff=_F;function NF(t,e){return t!=null&&Ff(t,e,US)}var qS=NF;var $F=1,IF=2;function PF(t,e){return Ws(t)&&Lf(e)?Mf(Gn(t),e):function(r){var n=Ob(r,t);return n===void 0&&n===e?qS(r,t):Of(e,n,$F|IF)}}var jS=PF;function DF(t){return function(e){return e?.[t]}}var GS=DF;function OF(t){return function(e){return Xs(e,t)}}var HS=OF;function LF(t){return Ws(t)?GS(Gn(t)):HS(t)}var KS=LF;function MF(t){return typeof t=="function"?t:t==null?Cr:typeof t=="object"?z(t)?jS(t[0],t[1]):FS(t):KS(t)}var mt=MF;function FF(t,e,r,n){for(var i=-1,o=t==null?0:t.length;++i<o;){var s=t[i];e(n,s,r(s),t)}return n}var WS=FF;function UF(t){return function(e,r,n){for(var i=-1,o=Object(e),s=n(e),a=s.length;a--;){var c=s[t?a:++i];if(r(o[c],c,o)===!1)break}return e}}var BS=UF;var qF=BS(),zS=qF;function jF(t,e){return t&&zS(t,e,Ke)}var VS=jF;function GF(t,e){return function(r,n){if(r==null)return r;if(!Nt(r))return t(r,n);for(var i=r.length,o=e?i:-1,s=Object(r);(e?o--:++o<i)&&n(s[o],o,s)!==!1;);return r}}var XS=GF;var HF=XS(VS),kr=HF;function KF(t,e,r,n){return kr(t,function(i,o,s){e(n,i,r(i),s)}),n}var YS=KF;function WF(t,e){return function(r,n){var i=z(r)?WS:YS,o=e?e():{};return i(r,t,mt(n,2),o)}}var JS=WF;var QS=Object.prototype,BF=QS.hasOwnProperty,zF=Gs(function(t,e){t=Object(t);var r=-1,n=e.length,i=n>2?e[2]:void 0;for(i&&Gi(e[0],e[1],i)&&(n=1);++r<n;)for(var o=e[r],s=Ki(o),a=-1,c=s.length;++a<c;){var u=s[a],l=t[u];(l===void 0||Fn(l,QS[u])&&!BF.call(t,u))&&(t[u]=o[u])}return t}),sa=zF;function VF(t){return yt(t)&&Nt(t)}var Jh=VF;function XF(t,e,r){for(var n=-1,i=t==null?0:t.length;++n<i;)if(r(e,t[n]))return!0;return!1}var Uf=XF;var YF=200;function JF(t,e,r,n){var i=-1,o=Tf,s=!0,a=t.length,c=[],u=e.length;if(!a)return c;r&&(e=Ln(e,jn(r))),n?(o=Uf,s=!1):e.length>=YF&&(o=ia,s=!1,e=new na(e));e:for(;++i<a;){var l=t[i],f=r==null?l:r(l);if(l=n||l!==0?l:0,s&&f===f){for(var m=u;m--;)if(e[m]===f)continue e;c.push(l)}else o(e,f,n)||c.push(l)}return c}var ZS=JF;var QF=Gs(function(t,e){return Jh(t)?ZS(t,Js(e,1,Jh,!0)):[]}),Qi=QF;function ZF(t){var e=t==null?0:t.length;return e?t[e-1]:void 0}var Kn=ZF;function e1(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Mn(e),Sf(t,e<0?0:e,n)):[]}var vt=e1;function t1(t,e,r){var n=t==null?0:t.length;return n?(e=r||e===void 0?1:Mn(e),e=n-e,Sf(t,0,e<0?0:e)):[]}var yi=t1;function r1(t){return typeof t=="function"?t:Cr}var ew=r1;function n1(t,e){var r=z(t)?gf:kr;return r(t,ew(e))}var G=n1;function i1(t,e){for(var r=-1,n=t==null?0:t.length;++r<n;)if(!e(t[r],r,t))return!1;return!0}var tw=i1;function o1(t,e){var r=!0;return kr(t,function(n,i,o){return r=!!e(n,i,o),r}),r}var rw=o1;function s1(t,e,r){var n=z(t)?tw:rw;return r&&Gi(t,e,r)&&(e=void 0),n(t,mt(e,3))}var cr=s1;function a1(t,e){var r=[];return kr(t,function(n,i,o){e(n,i,o)&&r.push(n)}),r}var qf=a1;function c1(t,e){var r=z(t)?Zs:qf;return r(t,mt(e,3))}var qt=c1;function u1(t){return function(e,r,n){var i=Object(e);if(!Nt(e)){var o=mt(r,3);e=Ke(e),r=function(a){return o(i[a],a,i)}}var s=t(e,r,n);return s>-1?i[o?e[s]:s]:void 0}}var nw=u1;var l1=Math.max;function f1(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Mn(r);return i<0&&(i=l1(n+i,0)),yf(t,mt(e,3),i)}var iw=f1;var d1=nw(iw),Wn=d1;function p1(t){return t&&t.length?t[0]:void 0}var jt=p1;function m1(t,e){var r=-1,n=Nt(t)?Array(t.length):[];return kr(t,function(i,o,s){n[++r]=e(i,o,s)}),n}var ow=m1;function h1(t,e){var r=z(t)?Ln:ow;return r(t,mt(e,3))}var L=h1;function g1(t,e){return Js(L(t,e),1)}var Zt=g1;var y1=Object.prototype,T1=y1.hasOwnProperty,v1=JS(function(t,e,r){T1.call(t,r)?t[r].push(e):js(t,r,[e])}),Qh=v1;var R1=Object.prototype,x1=R1.hasOwnProperty;function b1(t,e){return t!=null&&x1.call(t,e)}var sw=b1;function S1(t,e){return t!=null&&Ff(t,e,sw)}var W=S1;var w1="[object String]";function C1(t){return typeof t=="string"||!z(t)&&yt(t)&&gr(t)==w1}var Ot=C1;function A1(t,e){return Ln(e,function(r){return t[r]})}var aw=A1;function k1(t){return t==null?[]:aw(t,Ke(t))}var De=k1;var E1=Math.max;function _1(t,e,r,n){t=Nt(t)?t:De(t),r=r&&!n?Mn(r):0;var i=t.length;return r<0&&(r=E1(i+r,0)),Ot(t)?r<=i&&t.indexOf(e,r)>-1:!!i&&qs(t,e,r)>-1}var tt=_1;var N1=Math.max;function $1(t,e,r){var n=t==null?0:t.length;if(!n)return-1;var i=r==null?0:Mn(r);return i<0&&(i=N1(n+i,0)),qs(t,e,i)}var jf=$1;var I1="[object Map]",P1="[object Set]",D1=Object.prototype,O1=D1.hasOwnProperty;function L1(t){if(t==null)return!0;if(Nt(t)&&(z(t)||typeof t=="string"||typeof t.splice=="function"||hi(t)||Ks(t)||Hi(t)))return!t.length;var e=xn(t);if(e==I1||e==P1)return!t.size;if(qn(t))return!xf(t).length;for(var r in t)if(O1.call(t,r))return!1;return!0}var se=L1;var M1="[object RegExp]";function F1(t){return yt(t)&&gr(t)==M1}var cw=F1;var uw=en&&en.isRegExp,U1=uw?jn(uw):cw,tn=U1;function q1(t){return t===void 0}var ur=q1;function j1(t,e){return t<e}var lw=j1;function G1(t,e,r){for(var n=-1,i=t.length;++n<i;){var o=t[n],s=e(o);if(s!=null&&(a===void 0?s===s&&!On(s):r(s,a)))var a=s,c=o}return c}var fw=G1;function H1(t){return t&&t.length?fw(t,Cr,lw):void 0}var dw=H1;var K1="Expected a function";function W1(t){if(typeof t!="function")throw new TypeError(K1);return function(){var e=arguments;switch(e.length){case 0:return!t.call(this);case 1:return!t.call(this,e[0]);case 2:return!t.call(this,e[0],e[1]);case 3:return!t.call(this,e[0],e[1],e[2])}return!t.apply(this,e)}}var pw=W1;function B1(t,e,r,n){if(!at(t))return t;e=Xi(e,t);for(var i=-1,o=e.length,s=o-1,a=t;a!=null&&++i<o;){var c=Gn(e[i]),u=r;if(c==="__proto__"||c==="constructor"||c==="prototype")return t;if(i!=s){var l=a[c];u=n?n(l,c,a):void 0,u===void 0&&(u=at(l)?l:qi(e[i+1])?[]:{})}ji(a,c,u),a=a[c]}return t}var mw=B1;function z1(t,e,r){for(var n=-1,i=e.length,o={};++n<i;){var s=e[n],a=Xs(t,s);r(a,s)&&mw(o,Xi(s,t),a)}return o}var hw=z1;function V1(t,e){if(t==null)return{};var r=Ln(kf(t),function(n){return[n]});return e=mt(e),hw(t,r,function(n,i){return e(n,i[0])})}var Er=V1;function X1(t,e,r,n,i){return i(t,function(o,s,a){r=n?(n=!1,o):e(r,o,s,a)}),r}var gw=X1;function Y1(t,e,r){var n=z(t)?Ub:gw,i=arguments.length<3;return n(t,mt(e,4),r,i,kr)}var ut=Y1;function J1(t,e){var r=z(t)?Zs:qf;return r(t,pw(mt(e,3)))}var Zi=J1;function Q1(t,e){var r;return kr(t,function(n,i,o){return r=e(n,i,o),!r}),!!r}var yw=Q1;function Z1(t,e,r){var n=z(t)?If:yw;return r&&Gi(t,e,r)&&(e=void 0),n(t,mt(e,3))}var Nc=Z1;var eU=1/0,tU=Ji&&1/oa(new Ji([,-0]))[1]==eU?function(t){return new Ji(t)}:ct,Tw=tU;var rU=200;function nU(t,e,r){var n=-1,i=Tf,o=t.length,s=!0,a=[],c=a;if(r)s=!1,i=Uf;else if(o>=rU){var u=e?null:Tw(t);if(u)return oa(u);s=!1,i=ia,c=new na}else c=e?[]:a;e:for(;++n<o;){var l=t[n],f=e?e(l):l;if(l=r||l!==0?l:0,s&&f===f){for(var m=c.length;m--;)if(c[m]===f)continue e;e&&c.push(f),a.push(l)}else i(c,f,r)||(c!==a&&c.push(f),a.push(l))}return a}var Gf=nU;function iU(t){return t&&t.length?Gf(t):[]}var aa=iU;function oU(t,e){return t&&t.length?Gf(t,mt(e,2)):[]}var vw=oU;function ca(t){console&&console.error&&console.error(`Error: ${t}`)}function $c(t){console&&console.warn&&console.warn(`Warning: ${t}`)}function Ic(t){let e=new Date().getTime(),r=t();return{time:new Date().getTime()-e,value:r}}function Pc(t){function e(){}e.prototype=t;let r=new e;function n(){return typeof r.bar}return n(),n(),t;(0,eval)(t)}function sU(t){return aU(t)?t.LABEL:t.name}function aU(t){return Ot(t.LABEL)&&t.LABEL!==""}var jr=class{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){this._definition=e}accept(e){e.visit(this),G(this.definition,r=>{r.accept(e)})}},Ae=class extends jr{constructor(e){super([]),this.idx=1,Qt(this,Er(e,r=>r!==void 0))}set definition(e){}get definition(){return this.referencedRule!==void 0?this.referencedRule.definition:[]}accept(e){e.visit(this)}},Tr=class extends jr{constructor(e){super(e.definition),this.orgText="",Qt(this,Er(e,r=>r!==void 0))}},ze=class extends jr{constructor(e){super(e.definition),this.ignoreAmbiguities=!1,Qt(this,Er(e,r=>r!==void 0))}},ke=class extends jr{constructor(e){super(e.definition),this.idx=1,Qt(this,Er(e,r=>r!==void 0))}},Ve=class extends jr{constructor(e){super(e.definition),this.idx=1,Qt(this,Er(e,r=>r!==void 0))}},Xe=class extends jr{constructor(e){super(e.definition),this.idx=1,Qt(this,Er(e,r=>r!==void 0))}},pe=class extends jr{constructor(e){super(e.definition),this.idx=1,Qt(this,Er(e,r=>r!==void 0))}},Fe=class extends jr{constructor(e){super(e.definition),this.idx=1,Qt(this,Er(e,r=>r!==void 0))}},Ue=class extends jr{get definition(){return this._definition}set definition(e){this._definition=e}constructor(e){super(e.definition),this.idx=1,this.ignoreAmbiguities=!1,this.hasPredicates=!1,Qt(this,Er(e,r=>r!==void 0))}},ae=class{constructor(e){this.idx=1,Qt(this,Er(e,r=>r!==void 0))}accept(e){e.visit(this)}};function Hf(t){return L(t,ua)}function ua(t){function e(r){return L(r,ua)}if(t instanceof Ae){let r={type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};return Ot(t.label)&&(r.label=t.label),r}else{if(t instanceof ze)return{type:"Alternative",definition:e(t.definition)};if(t instanceof ke)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof Ve)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof Xe)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:ua(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof Fe)return{type:"RepetitionWithSeparator",idx:t.idx,separator:ua(new ae({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof pe)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};if(t instanceof Ue)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};if(t instanceof ae){let r={type:"Terminal",name:t.terminalType.name,label:sU(t.terminalType),idx:t.idx};Ot(t.label)&&(r.terminalLabel=t.label);let n=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(r.pattern=tn(n)?n.source:n),r}else{if(t instanceof Tr)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};throw Error("non exhaustive match")}}}var vr=class{visit(e){let r=e;switch(r.constructor){case Ae:return this.visitNonTerminal(r);case ze:return this.visitAlternative(r);case ke:return this.visitOption(r);case Ve:return this.visitRepetitionMandatory(r);case Xe:return this.visitRepetitionMandatoryWithSeparator(r);case Fe:return this.visitRepetitionWithSeparator(r);case pe:return this.visitRepetition(r);case Ue:return this.visitAlternation(r);case ae:return this.visitTerminal(r);case Tr:return this.visitRule(r);default:throw Error("non exhaustive match")}}visitNonTerminal(e){}visitAlternative(e){}visitOption(e){}visitRepetition(e){}visitRepetitionMandatory(e){}visitRepetitionMandatoryWithSeparator(e){}visitRepetitionWithSeparator(e){}visitAlternation(e){}visitTerminal(e){}visitRule(e){}};function Zh(t){return t instanceof ze||t instanceof ke||t instanceof pe||t instanceof Ve||t instanceof Xe||t instanceof Fe||t instanceof ae||t instanceof Tr}function Lo(t,e=[]){return t instanceof ke||t instanceof pe||t instanceof Fe?!0:t instanceof Ue?Nc(t.definition,n=>Lo(n,e)):t instanceof Ae&&tt(e,t)?!1:t instanceof jr?(t instanceof Ae&&e.push(t),cr(t.definition,n=>Lo(n,e))):!1}function eg(t){return t instanceof Ue}function _r(t){if(t instanceof Ae)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Ue)return"OR";if(t instanceof Ve)return"AT_LEAST_ONE";if(t instanceof Xe)return"AT_LEAST_ONE_SEP";if(t instanceof Fe)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}var Ti=class{walk(e,r=[]){G(e.definition,(n,i)=>{let o=vt(e.definition,i+1);if(n instanceof Ae)this.walkProdRef(n,o,r);else if(n instanceof ae)this.walkTerminal(n,o,r);else if(n instanceof ze)this.walkFlat(n,o,r);else if(n instanceof ke)this.walkOption(n,o,r);else if(n instanceof Ve)this.walkAtLeastOne(n,o,r);else if(n instanceof Xe)this.walkAtLeastOneSep(n,o,r);else if(n instanceof Fe)this.walkManySep(n,o,r);else if(n instanceof pe)this.walkMany(n,o,r);else if(n instanceof Ue)this.walkOr(n,o,r);else throw Error("non exhaustive match")})}walkTerminal(e,r,n){}walkProdRef(e,r,n){}walkFlat(e,r,n){let i=r.concat(n);this.walk(e,i)}walkOption(e,r,n){let i=r.concat(n);this.walk(e,i)}walkAtLeastOne(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkAtLeastOneSep(e,r,n){let i=Rw(e,r,n);this.walk(e,i)}walkMany(e,r,n){let i=[new ke({definition:e.definition})].concat(r,n);this.walk(e,i)}walkManySep(e,r,n){let i=Rw(e,r,n);this.walk(e,i)}walkOr(e,r,n){let i=r.concat(n);G(e.definition,o=>{let s=new ze({definition:[o]});this.walk(s,i)})}};function Rw(t,e,r){return[new ke({definition:[new ae({terminalType:t.separator})].concat(t.definition)})].concat(e,r)}function Mo(t){if(t instanceof Ae)return Mo(t.referencedRule);if(t instanceof ae)return lU(t);if(Zh(t))return cU(t);if(eg(t))return uU(t);throw Error("non exhaustive match")}function cU(t){let e=[],r=t.definition,n=0,i=r.length>n,o,s=!0;for(;i&&s;)o=r[n],s=Lo(o),e=e.concat(Mo(o)),n=n+1,i=r.length>n;return aa(e)}function uU(t){let e=L(t.definition,r=>Mo(r));return aa(Tt(e))}function lU(t){return[t.terminalType]}var Kf="_~IN~_";var tg=class extends Ti{constructor(e){super(),this.topProd=e,this.follows={}}startWalking(){return this.walk(this.topProd),this.follows}walkTerminal(e,r,n){}walkProdRef(e,r,n){let i=fU(e.referencedRule,e.idx)+this.topProd.name,o=r.concat(n),s=new ze({definition:o}),a=Mo(s);this.follows[i]=a}};function xw(t){let e={};return G(t,r=>{let n=new tg(r).startWalking();Qt(e,n)}),e}function fU(t,e){return t.name+e+Kf}var Wf={},dU=new Eo;function la(t){let e=t.toString();if(Wf.hasOwnProperty(e))return Wf[e];{let r=dU.pattern(e);return Wf[e]=r,r}}function bw(){Wf={}}var ww="Complement Sets are not supported for first char optimization",Dc=`Unable to use "first char" lexer optimizations:
`;function Cw(t,e=!1){try{let r=la(t);return rg(r.value,{},r.flags.ignoreCase)}catch(r){if(r.message===ww)e&&$c(`${Dc}	Unable to optimize: < ${t.toString()} >
	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`);else{let n="";e&&(n=`
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`),ca(`${Dc}
	Failed parsing: < ${t.toString()} >
	Using the @chevrotain/regexp-to-ast library
	Please open an issue at: https://github.com/chevrotain/chevrotain/issues`+n)}}return[]}function rg(t,e,r){switch(t.type){case"Disjunction":for(let i=0;i<t.value.length;i++)rg(t.value[i],e,r);break;case"Alternative":let n=t.value;for(let i=0;i<n.length;i++){let o=n[i];switch(o.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}let s=o;switch(s.type){case"Character":Bf(s.value,e,r);break;case"Set":if(s.complement===!0)throw Error(ww);G(s.value,c=>{if(typeof c=="number")Bf(c,e,r);else{let u=c;if(r===!0)for(let l=u.from;l<=u.to;l++)Bf(l,e,r);else{for(let l=u.from;l<=u.to&&l<fa;l++)Bf(l,e,r);if(u.to>=fa){let l=u.from>=fa?u.from:fa,f=u.to,m=Bn(l),T=Bn(f);for(let S=m;S<=T;S++)e[S]=S}}}});break;case"Group":rg(s.value,e,r);break;default:throw Error("Non Exhaustive Match")}let a=s.quantifier!==void 0&&s.quantifier.atLeast===0;if(s.type==="Group"&&ng(s)===!1||s.type!=="Group"&&a===!1)break}break;default:throw Error("non exhaustive match!")}return De(e)}function Bf(t,e,r){let n=Bn(t);e[n]=n,r===!0&&pU(t,e)}function pU(t,e){let r=String.fromCharCode(t),n=r.toUpperCase();if(n!==r){let i=Bn(n.charCodeAt(0));e[i]=i}else{let i=r.toLowerCase();if(i!==r){let o=Bn(i.charCodeAt(0));e[o]=o}}}function Sw(t,e){return Wn(t.value,r=>{if(typeof r=="number")return tt(e,r);{let n=r;return Wn(e,i=>n.from<=i&&i<=n.to)!==void 0}})}function ng(t){let e=t.quantifier;return e&&e.atLeast===0?!0:t.value?z(t.value)?cr(t.value,ng):ng(t.value):!1}var ig=class extends Pn{constructor(e){super(),this.targetCharCodes=e,this.found=!1}visitChildren(e){if(this.found!==!0){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}super.visitChildren(e)}}visitCharacter(e){tt(this.targetCharCodes,e.value)&&(this.found=!0)}visitSet(e){e.complement?Sw(e,this.targetCharCodes)===void 0&&(this.found=!0):Sw(e,this.targetCharCodes)!==void 0&&(this.found=!0)}};function zf(t,e){if(e instanceof RegExp){let r=la(e),n=new ig(t);return n.visit(r),n.found}else return Wn(e,r=>tt(t,r.charCodeAt(0)))!==void 0}var Fo="PATTERN",da="defaultMode",Vf="modes",sg=typeof new RegExp("(?:)").sticky=="boolean";function Ew(t,e){e=sa(e,{useSticky:sg,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r",`
`],tracer:(v,y)=>y()});let r=e.tracer;r("initCharCodeToOptimizedIndexMap",()=>{$U()});let n;r("Reject Lexer.NA",()=>{n=Zi(t,v=>v[Fo]===ht.NA)});let i=!1,o;r("Transform Patterns",()=>{i=!1,o=L(n,v=>{let y=v[Fo];if(tn(y)){let _=y.source;return _.length===1&&_!=="^"&&_!=="$"&&_!=="."&&!y.ignoreCase?_:_.length===2&&_[0]==="\\"&&!tt(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],_[1])?_[1]:e.useSticky?kw(y):Aw(y)}else{if(yr(y))return i=!0,{exec:y};if(typeof y=="object")return i=!0,y;if(typeof y=="string"){if(y.length===1)return y;{let _=y.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),D=new RegExp(_);return e.useSticky?kw(D):Aw(D)}}else throw Error("non exhaustive match")}})});let s,a,c,u,l;r("misc mapping",()=>{s=L(n,v=>v.tokenTypeIdx),a=L(n,v=>{let y=v.GROUP;if(y!==ht.SKIPPED){if(Ot(y))return y;if(ur(y))return!1;throw Error("non exhaustive match")}}),c=L(n,v=>{let y=v.LONGER_ALT;if(y)return z(y)?L(y,D=>jf(n,D)):[jf(n,y)]}),u=L(n,v=>v.PUSH_MODE),l=L(n,v=>W(v,"POP_MODE"))});let f;r("Line Terminator Handling",()=>{let v=Lw(e.lineTerminatorCharacters);f=L(n,y=>!1),e.positionTracking!=="onlyOffset"&&(f=L(n,y=>W(y,"LINE_BREAKS")?!!y.LINE_BREAKS:Ow(y,v)===!1&&zf(v,y.PATTERN)))});let m,T,S,C;r("Misc Mapping #2",()=>{m=L(n,Pw),T=L(o,_U),S=ut(n,(v,y)=>{let _=y.GROUP;return Ot(_)&&_!==ht.SKIPPED&&(v[_]=[]),v},{}),C=L(o,(v,y)=>({pattern:o[y],longerAlt:c[y],canLineTerminator:f[y],isCustom:m[y],short:T[y],group:a[y],push:u[y],pop:l[y],tokenTypeIdx:s[y],tokenType:n[y]}))});let N=!0,A=[];return e.safeMode||r("First Char Optimization",()=>{A=ut(n,(v,y,_)=>{if(typeof y.PATTERN=="string"){let D=y.PATTERN.charCodeAt(0),X=Bn(D);og(v,X,C[_])}else if(z(y.START_CHARS_HINT)){let D;G(y.START_CHARS_HINT,X=>{let ye=typeof X=="string"?X.charCodeAt(0):X,Ee=Bn(ye);D!==Ee&&(D=Ee,og(v,Ee,C[_]))})}else if(tn(y.PATTERN))if(y.PATTERN.unicode)N=!1,e.ensureOptimizations&&ca(`${Dc}	Unable to analyze < ${y.PATTERN.toString()} > pattern.
	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`);else{let D=Cw(y.PATTERN,e.ensureOptimizations);se(D)&&(N=!1),G(D,X=>{og(v,X,C[_])})}else e.ensureOptimizations&&ca(`${Dc}	TokenType: <${y.name}> is using a custom token pattern without providing <start_chars_hint> parameter.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`),N=!1;return v},[])}),{emptyGroups:S,patternIdxToConfig:C,charCodeToPatternIdxToConfig:A,hasCustom:i,canBeOptimized:N}}function _w(t,e){let r=[],n=hU(t);r=r.concat(n.errors);let i=gU(n.valid),o=i.valid;return r=r.concat(i.errors),r=r.concat(mU(o)),r=r.concat(wU(o)),r=r.concat(CU(o,e)),r=r.concat(AU(o)),r}function mU(t){let e=[],r=qt(t,n=>tn(n[Fo]));return e=e.concat(TU(r)),e=e.concat(xU(r)),e=e.concat(bU(r)),e=e.concat(SU(r)),e=e.concat(vU(r)),e}function hU(t){let e=qt(t,i=>!W(i,Fo)),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- missing static 'PATTERN' property",type:rt.MISSING_PATTERN,tokenTypes:[i]})),n=Qi(t,e);return{errors:r,valid:n}}function gU(t){let e=qt(t,i=>{let o=i[Fo];return!tn(o)&&!yr(o)&&!W(o,"exec")&&!Ot(o)}),r=L(e,i=>({message:"Token Type: ->"+i.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:rt.INVALID_PATTERN,tokenTypes:[i]})),n=Qi(t,e);return{errors:r,valid:n}}var yU=/[^\\][$]/;function TU(t){class e extends Pn{constructor(){super(...arguments),this.found=!1}visitEndAnchor(o){this.found=!0}}let r=qt(t,i=>{let o=i.PATTERN;try{let s=la(o),a=new e;return a.visit(s),a.found}catch{return yU.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:rt.EOI_ANCHOR_FOUND,tokenTypes:[i]}))}function vU(t){let e=qt(t,n=>n.PATTERN.test(""));return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' must not match an empty string",type:rt.EMPTY_MATCH_PATTERN,tokenTypes:[n]}))}var RU=/[^\\[][\^]|^\^/;function xU(t){class e extends Pn{constructor(){super(...arguments),this.found=!1}visitStartAnchor(o){this.found=!0}}let r=qt(t,i=>{let o=i.PATTERN;try{let s=la(o),a=new e;return a.visit(s),a.found}catch{return RU.test(o.source)}});return L(r,i=>({message:`Unexpected RegExp Anchor Error:
	Token Type: ->`+i.name+`<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`,type:rt.SOI_ANCHOR_FOUND,tokenTypes:[i]}))}function bU(t){let e=qt(t,n=>{let i=n[Fo];return i instanceof RegExp&&(i.multiline||i.global)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:rt.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[n]}))}function SU(t){let e=[],r=L(t,o=>ut(t,(s,a)=>(o.PATTERN.source===a.PATTERN.source&&!tt(e,a)&&a.PATTERN!==ht.NA&&(e.push(a),s.push(a)),s),[]));r=Hn(r);let n=qt(r,o=>o.length>1);return L(n,o=>{let s=L(o,c=>c.name);return{message:`The same RegExp pattern ->${jt(o).PATTERN}<-has been used in all of the following Token Types: ${s.join(", ")} <-`,type:rt.DUPLICATE_PATTERNS_FOUND,tokenTypes:o}})}function wU(t){let e=qt(t,n=>{if(!W(n,"GROUP"))return!1;let i=n.GROUP;return i!==ht.SKIPPED&&i!==ht.NA&&!Ot(i)});return L(e,n=>({message:"Token Type: ->"+n.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:rt.INVALID_GROUP_TYPE_FOUND,tokenTypes:[n]}))}function CU(t,e){let r=qt(t,i=>i.PUSH_MODE!==void 0&&!tt(e,i.PUSH_MODE));return L(r,i=>({message:`Token Type: ->${i.name}<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->${i.PUSH_MODE}<-which does not exist`,type:rt.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[i]}))}function AU(t){let e=[],r=ut(t,(n,i,o)=>{let s=i.PATTERN;return s===ht.NA||(Ot(s)?n.push({str:s,idx:o,tokenType:i}):tn(s)&&EU(s)&&n.push({str:s.source,idx:o,tokenType:i})),n},[]);return G(t,(n,i)=>{G(r,({str:o,idx:s,tokenType:a})=>{if(i<s&&kU(o,n.PATTERN)){let c=`Token: ->${a.name}<- can never be matched.
Because it appears AFTER the Token Type ->${n.name}<-in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`;e.push({message:c,type:rt.UNREACHABLE_PATTERN,tokenTypes:[n,a]})}})}),e}function kU(t,e){if(tn(e)){let r=e.exec(t);return r!==null&&r.index===0}else{if(yr(e))return e(t,0,[],{});if(W(e,"exec"))return e.exec(t,0,[],{});if(typeof e=="string")return e===t;throw Error("non exhaustive match")}}function EU(t){return Wn([".","\\","[","]","|","^","$","(",")","?","*","+","{"],r=>t.source.indexOf(r)!==-1)===void 0}function Aw(t){let e=t.ignoreCase?"i":"";return new RegExp(`^(?:${t.source})`,e)}function kw(t){let e=t.ignoreCase?"iy":"y";return new RegExp(`${t.source}`,e)}function Nw(t,e,r){let n=[];return W(t,da)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+da+`> property in its definition
`,type:rt.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),W(t,Vf)||n.push({message:"A MultiMode Lexer cannot be initialized without a <"+Vf+`> property in its definition
`,type:rt.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),W(t,Vf)&&W(t,da)&&!W(t.modes,t.defaultMode)&&n.push({message:`A MultiMode Lexer cannot be initialized with a ${da}: <${t.defaultMode}>which does not exist
`,type:rt.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),W(t,Vf)&&G(t.modes,(i,o)=>{G(i,(s,a)=>{if(ur(s))n.push({message:`A Lexer cannot be initialized using an undefined Token Type. Mode:<${o}> at index: <${a}>
`,type:rt.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED});else if(W(s,"LONGER_ALT")){let c=z(s.LONGER_ALT)?s.LONGER_ALT:[s.LONGER_ALT];G(c,u=>{!ur(u)&&!tt(i,u)&&n.push({message:`A MultiMode Lexer cannot be initialized with a longer_alt <${u.name}> on token <${s.name}> outside of mode <${o}>
`,type:rt.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE})})}})}),n}function $w(t,e,r){let n=[],i=!1,o=Hn(Tt(De(t.modes))),s=Zi(o,c=>c[Fo]===ht.NA),a=Lw(r);return e&&G(s,c=>{let u=Ow(c,a);if(u!==!1){let f={message:NU(c,u),type:u.issue,tokenType:c};n.push(f)}else W(c,"LINE_BREAKS")?c.LINE_BREAKS===!0&&(i=!0):zf(a,c.PATTERN)&&(i=!0)}),e&&!i&&n.push({message:`Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`,type:rt.NO_LINE_BREAKS_FLAGS}),n}function Iw(t){let e={},r=Ke(t);return G(r,n=>{let i=t[n];if(z(i))e[n]=[];else throw Error("non exhaustive match")}),e}function Pw(t){let e=t.PATTERN;if(tn(e))return!1;if(yr(e))return!0;if(W(e,"exec"))return!0;if(Ot(e))return!1;throw Error("non exhaustive match")}function _U(t){return Ot(t)&&t.length===1?t.charCodeAt(0):!1}var Dw={test:function(t){let e=t.length;for(let r=this.lastIndex;r<e;r++){let n=t.charCodeAt(r);if(n===10)return this.lastIndex=r+1,!0;if(n===13)return t.charCodeAt(r+1)===10?this.lastIndex=r+2:this.lastIndex=r+1,!0}return!1},lastIndex:0};function Ow(t,e){if(W(t,"LINE_BREAKS"))return!1;if(tn(t.PATTERN)){try{zf(e,t.PATTERN)}catch(r){return{issue:rt.IDENTIFY_TERMINATOR,errMsg:r.message}}return!1}else{if(Ot(t.PATTERN))return!1;if(Pw(t))return{issue:rt.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}}function NU(t,e){if(e.issue===rt.IDENTIFY_TERMINATOR)return`Warning: unable to identify line terminator usage in pattern.
	The problem is in the <${t.name}> Token Type
	 Root cause: ${e.errMsg}.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR`;if(e.issue===rt.CUSTOM_LINE_BREAK)return`Warning: A Custom Token Pattern should specify the <line_breaks> option.
	The problem is in the <${t.name}> Token Type
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK`;throw Error("non exhaustive match")}function Lw(t){return L(t,r=>Ot(r)?r.charCodeAt(0):r)}function og(t,e,r){t[e]===void 0?t[e]=[r]:t[e].push(r)}var fa=256,Xf=[];function Bn(t){return t<fa?t:Xf[t]}function $U(){if(se(Xf)){Xf=new Array(65536);for(let t=0;t<65536;t++)Xf[t]=t>255?255+~~(t/255):t}}function vi(t,e){let r=t.tokenTypeIdx;return r===e.tokenTypeIdx?!0:e.isParent===!0&&e.categoryMatchesMap[r]===!0}function pa(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}var Mw=1,Uw={};function Ri(t){let e=IU(t);PU(e),OU(e),DU(e),G(e,r=>{r.isParent=r.categoryMatches.length>0})}function IU(t){let e=Be(t),r=t,n=!0;for(;n;){r=Hn(Tt(L(r,o=>o.CATEGORIES)));let i=Qi(r,e);e=e.concat(i),se(i)?n=!1:r=i}return e}function PU(t){G(t,e=>{ag(e)||(Uw[Mw]=e,e.tokenTypeIdx=Mw++),Fw(e)&&!z(e.CATEGORIES)&&(e.CATEGORIES=[e.CATEGORIES]),Fw(e)||(e.CATEGORIES=[]),LU(e)||(e.categoryMatches=[]),MU(e)||(e.categoryMatchesMap={})})}function DU(t){G(t,e=>{e.categoryMatches=[],G(e.categoryMatchesMap,(r,n)=>{e.categoryMatches.push(Uw[n].tokenTypeIdx)})})}function OU(t){G(t,e=>{qw([],e)})}function qw(t,e){G(t,r=>{e.categoryMatchesMap[r.tokenTypeIdx]=!0}),G(e.CATEGORIES,r=>{let n=t.concat(e);tt(n,r)||qw(n,r)})}function ag(t){return W(t,"tokenTypeIdx")}function Fw(t){return W(t,"CATEGORIES")}function LU(t){return W(t,"categoryMatches")}function MU(t){return W(t,"categoryMatchesMap")}function jw(t){return W(t,"tokenTypeIdx")}var cg={buildUnableToPopLexerModeMessage(t){return`Unable to pop Lexer Mode after encountering Token ->${t.image}<- The Mode Stack is empty`},buildUnexpectedCharactersMessage(t,e,r,n,i){return`unexpected character: ->${t.charAt(e)}<- at offset: ${e}, skipped ${r} characters.`}};var rt;(function(t){t[t.MISSING_PATTERN=0]="MISSING_PATTERN",t[t.INVALID_PATTERN=1]="INVALID_PATTERN",t[t.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",t[t.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",t[t.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",t[t.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",t[t.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",t[t.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",t[t.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",t[t.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",t[t.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",t[t.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",t[t.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK",t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE=17]="MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE"})(rt||(rt={}));var Oc={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:[`
`,"\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:cg,traceInitPerf:!1,skipValidations:!1,recoveryEnabled:!0};Object.freeze(Oc);var ht=class{constructor(e,r=Oc){if(this.lexerDefinition=e,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},this.TRACE_INIT=(i,o)=>{if(this.traceInitPerf===!0){this.traceInitIndent++;let s=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${s}--> <${i}>`);let{time:a,value:c}=Ic(o),u=a>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&u(`${s}<-- <${i}> time: ${a}ms`),this.traceInitIndent--,c}else return o()},typeof r=="boolean")throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`);this.config=Qt({},Oc,r);let n=this.config.traceInitPerf;n===!0?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):typeof n=="number"&&(this.traceInitMaxIdent=n,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",()=>{let i,o=!0;this.TRACE_INIT("Lexer Config handling",()=>{if(this.config.lineTerminatorsPattern===Oc.lineTerminatorsPattern)this.config.lineTerminatorsPattern=Dw;else if(this.config.lineTerminatorCharacters===Oc.lineTerminatorCharacters)throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`);if(r.safeMode&&r.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');this.trackStartLines=/full|onlyStart/i.test(this.config.positionTracking),this.trackEndLines=/full/i.test(this.config.positionTracking),z(e)?i={modes:{defaultMode:Be(e)},defaultMode:da}:(o=!1,i=Be(e))}),this.config.skipValidations===!1&&(this.TRACE_INIT("performRuntimeChecks",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(Nw(i,this.trackStartLines,this.config.lineTerminatorCharacters))}),this.TRACE_INIT("performWarningRuntimeChecks",()=>{this.lexerDefinitionWarning=this.lexerDefinitionWarning.concat($w(i,this.trackStartLines,this.config.lineTerminatorCharacters))})),i.modes=i.modes?i.modes:{},G(i.modes,(a,c)=>{i.modes[c]=Zi(a,u=>ur(u))});let s=Ke(i.modes);if(G(i.modes,(a,c)=>{this.TRACE_INIT(`Mode: <${c}> processing`,()=>{if(this.modes.push(c),this.config.skipValidations===!1&&this.TRACE_INIT("validatePatterns",()=>{this.lexerDefinitionErrors=this.lexerDefinitionErrors.concat(_w(a,s))}),se(this.lexerDefinitionErrors)){Ri(a);let u;this.TRACE_INIT("analyzeTokenTypes",()=>{u=Ew(a,{lineTerminatorCharacters:this.config.lineTerminatorCharacters,positionTracking:r.positionTracking,ensureOptimizations:r.ensureOptimizations,safeMode:r.safeMode,tracer:this.TRACE_INIT})}),this.patternIdxToConfig[c]=u.patternIdxToConfig,this.charCodeToPatternIdxToConfig[c]=u.charCodeToPatternIdxToConfig,this.emptyGroups=Qt({},this.emptyGroups,u.emptyGroups),this.hasCustom=u.hasCustom||this.hasCustom,this.canModeBeOptimized[c]=u.canBeOptimized}})}),this.defaultMode=i.defaultMode,!se(this.lexerDefinitionErrors)&&!this.config.deferDefinitionErrorsHandling){let c=L(this.lexerDefinitionErrors,u=>u.message).join(`-----------------------
`);throw new Error(`Errors detected in definition of Lexer:
`+c)}G(this.lexerDefinitionWarning,a=>{$c(a.message)}),this.TRACE_INIT("Choosing sub-methods implementations",()=>{if(sg?(this.chopInput=Cr,this.match=this.matchWithTest):(this.updateLastIndex=ct,this.match=this.matchWithExec),o&&(this.handleModes=ct),this.trackStartLines===!1&&(this.computeNewColumn=Cr),this.trackEndLines===!1&&(this.updateTokenEndLineColumnLocation=ct),/full/i.test(this.config.positionTracking))this.createTokenInstance=this.createFullToken;else if(/onlyStart/i.test(this.config.positionTracking))this.createTokenInstance=this.createStartOnlyToken;else if(/onlyOffset/i.test(this.config.positionTracking))this.createTokenInstance=this.createOffsetOnlyToken;else throw Error(`Invalid <positionTracking> config option: "${this.config.positionTracking}"`);this.hasCustom?(this.addToken=this.addTokenUsingPush,this.handlePayload=this.handlePayloadWithCustom):(this.addToken=this.addTokenUsingMemberAccess,this.handlePayload=this.handlePayloadNoCustom)}),this.TRACE_INIT("Failed Optimization Warnings",()=>{let a=ut(this.canModeBeOptimized,(c,u,l)=>(u===!1&&c.push(l),c),[]);if(r.ensureOptimizations&&!se(a))throw Error(`Lexer Modes: < ${a.join(", ")} > cannot be optimized.
	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)}),this.TRACE_INIT("clearRegExpParserCache",()=>{bw()}),this.TRACE_INIT("toFastProperties",()=>{Pc(this)})})}tokenize(e,r=this.defaultMode){if(!se(this.lexerDefinitionErrors)){let i=L(this.lexerDefinitionErrors,o=>o.message).join(`-----------------------
`);throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+i)}return this.tokenizeInternal(e,r)}tokenizeInternal(e,r){let n,i,o,s,a,c,u,l,f,m,T,S,C,N,A,v,y=e,_=y.length,D=0,X=0,ye=this.hasCustom?0:Math.floor(e.length/10),Ee=new Array(ye),Ht=[],Rt=this.trackStartLines?1:void 0,M=this.trackStartLines?1:void 0,w=Iw(this.emptyGroups),q=this.trackStartLines,H=this.config.lineTerminatorsPattern,ce=0,ee=[],Q=[],xt=[],lt=[];Object.freeze(lt);let me;function Nr(){return ee}function Xn(bt){let er=Bn(bt),wn=Q[er];return wn===void 0?lt:wn}let _a=bt=>{if(xt.length===1&&bt.tokenType.PUSH_MODE===void 0){let er=this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(bt);Ht.push({offset:bt.startOffset,line:bt.startLine,column:bt.startColumn,length:bt.image.length,message:er})}else{xt.pop();let er=Kn(xt);ee=this.patternIdxToConfig[er],Q=this.charCodeToPatternIdxToConfig[er],ce=ee.length;let wn=this.canModeBeOptimized[er]&&this.config.safeMode===!1;Q&&wn?me=Xn:me=Nr}};function no(bt){xt.push(bt),Q=this.charCodeToPatternIdxToConfig[bt],ee=this.patternIdxToConfig[bt],ce=ee.length,ce=ee.length;let er=this.canModeBeOptimized[bt]&&this.config.safeMode===!1;Q&&er?me=Xn:me=Nr}no.call(this,r);let lr,Ko=this.config.recoveryEnabled;for(;D<_;){c=null;let bt=y.charCodeAt(D),er=me(bt),wn=er.length;for(n=0;n<wn;n++){lr=er[n];let Kt=lr.pattern;u=null;let ft=lr.short;if(ft!==!1?bt===ft&&(c=Kt):lr.isCustom===!0?(v=Kt.exec(y,D,Ee,w),v!==null?(c=v[0],v.payload!==void 0&&(u=v.payload)):c=null):(this.updateLastIndex(Kt,D),c=this.match(Kt,e,D)),c!==null){if(a=lr.longerAlt,a!==void 0){let Hr=a.length;for(o=0;o<Hr;o++){let $r=ee[a[o]],xr=$r.pattern;if(l=null,$r.isCustom===!0?(v=xr.exec(y,D,Ee,w),v!==null?(s=v[0],v.payload!==void 0&&(l=v.payload)):s=null):(this.updateLastIndex(xr,D),s=this.match(xr,e,D)),s&&s.length>c.length){c=s,u=l,lr=$r;break}}}break}}if(c!==null){if(f=c.length,m=lr.group,m!==void 0&&(T=lr.tokenTypeIdx,S=this.createTokenInstance(c,D,T,lr.tokenType,Rt,M,f),this.handlePayload(S,u),m===!1?X=this.addToken(Ee,X,S):w[m].push(S)),e=this.chopInput(e,f),D=D+f,M=this.computeNewColumn(M,f),q===!0&&lr.canLineTerminator===!0){let Kt=0,ft,Hr;H.lastIndex=0;do ft=H.test(c),ft===!0&&(Hr=H.lastIndex-1,Kt++);while(ft===!0);Kt!==0&&(Rt=Rt+Kt,M=f-Hr,this.updateTokenEndLineColumnLocation(S,m,Hr,Kt,Rt,M,f))}this.handleModes(lr,_a,no,S)}else{let Kt=D,ft=Rt,Hr=M,$r=Ko===!1;for(;$r===!1&&D<_;)for(e=this.chopInput(e,1),D++,i=0;i<ce;i++){let xr=ee[i],io=xr.pattern,Ci=xr.short;if(Ci!==!1?y.charCodeAt(D)===Ci&&($r=!0):xr.isCustom===!0?$r=io.exec(y,D,Ee,w)!==null:(this.updateLastIndex(io,D),$r=io.exec(e)!==null),$r===!0)break}if(C=D-Kt,M=this.computeNewColumn(M,C),A=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(y,Kt,C,ft,Hr),Ht.push({offset:Kt,line:ft,column:Hr,length:C,message:A}),Ko===!1)break}}return this.hasCustom||(Ee.length=X),{tokens:Ee,groups:w,errors:Ht}}handleModes(e,r,n,i){if(e.pop===!0){let o=e.push;r(i),o!==void 0&&n.call(this,o)}else e.push!==void 0&&n.call(this,e.push)}chopInput(e,r){return e.substring(r)}updateLastIndex(e,r){e.lastIndex=r}updateTokenEndLineColumnLocation(e,r,n,i,o,s,a){let c,u;r!==void 0&&(c=n===a-1,u=c?-1:0,i===1&&c===!0||(e.endLine=o+u,e.endColumn=s-1+-u))}computeNewColumn(e,r){return e+r}createOffsetOnlyToken(e,r,n,i){return{image:e,startOffset:r,tokenTypeIdx:n,tokenType:i}}createStartOnlyToken(e,r,n,i,o,s){return{image:e,startOffset:r,startLine:o,startColumn:s,tokenTypeIdx:n,tokenType:i}}createFullToken(e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:r+a-1,startLine:o,endLine:o,startColumn:s,endColumn:s+a-1,tokenTypeIdx:n,tokenType:i}}addTokenUsingPush(e,r,n){return e.push(n),r}addTokenUsingMemberAccess(e,r,n){return e[r]=n,r++,r}handlePayloadNoCustom(e,r){}handlePayloadWithCustom(e,r){r!==null&&(e.payload=r)}matchWithTest(e,r,n){return e.test(r)===!0?r.substring(n,e.lastIndex):null}matchWithExec(e,r){let n=e.exec(r);return n!==null?n[0]:null}};ht.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.";ht.NA=/NOT_APPLICABLE/;function xi(t){return ug(t)?t.LABEL:t.name}function ug(t){return Ot(t.LABEL)&&t.LABEL!==""}var FU="parent",Gw="categories",Hw="label",Kw="group",Ww="push_mode",Bw="pop_mode",zw="longer_alt",Vw="line_breaks",Xw="start_chars_hint";function Yf(t){return UU(t)}function UU(t){let e=t.pattern,r={};if(r.name=t.name,ur(e)||(r.PATTERN=e),W(t,FU))throw`The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`;return W(t,Gw)&&(r.CATEGORIES=t[Gw]),Ri([r]),W(t,Hw)&&(r.LABEL=t[Hw]),W(t,Kw)&&(r.GROUP=t[Kw]),W(t,Bw)&&(r.POP_MODE=t[Bw]),W(t,Ww)&&(r.PUSH_MODE=t[Ww]),W(t,zw)&&(r.LONGER_ALT=t[zw]),W(t,Vw)&&(r.LINE_BREAKS=t[Vw]),W(t,Xw)&&(r.START_CHARS_HINT=t[Xw]),r}var bn=Yf({name:"EOF",pattern:ht.NA});Ri([bn]);function Uo(t,e,r,n,i,o,s,a){return{image:e,startOffset:r,endOffset:n,startLine:i,endLine:o,startColumn:s,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function Lc(t,e){return vi(t,e)}var bi={buildMismatchTokenMessage({expected:t,actual:e,previous:r,ruleName:n}){return`Expecting ${ug(t)?`--> ${xi(t)} <--`:`token of type --> ${t.name} <--`} but found --> '${e.image}' <--`},buildNotAllInputParsedMessage({firstRedundant:t,ruleName:e}){return"Redundant input, expecting EOF but found: "+t.image},buildNoViableAltMessage({expectedPathsPerAlt:t,actual:e,previous:r,customUserDescription:n,ruleName:i}){let o="Expecting: ",a=`
but found: '`+jt(e).image+"'";if(n)return o+n+a;{let c=ut(t,(m,T)=>m.concat(T),[]),u=L(c,m=>`[${L(m,T=>xi(T)).join(", ")}]`),f=`one of these possible Token sequences:
${L(u,(m,T)=>`  ${T+1}. ${m}`).join(`
`)}`;return o+f+a}},buildEarlyExitMessage({expectedIterationPaths:t,actual:e,customUserDescription:r,ruleName:n}){let i="Expecting: ",s=`
but found: '`+jt(e).image+"'";if(r)return i+r+s;{let c=`expecting at least one iteration which starts with one of these possible Token sequences::
  <${L(t,u=>`[${L(u,l=>xi(l)).join(",")}]`).join(" ,")}>`;return i+c+s}}};Object.freeze(bi);var Yw={buildRuleNotFoundError(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+`<-
inside top level rule: ->`+t.name+"<-"}},Sn={buildDuplicateFoundError(t,e){function r(l){return l instanceof ae?l.terminalType.name:l instanceof Ae?l.nonTerminalName:""}let n=t.name,i=jt(e),o=i.idx,s=_r(i),a=r(i),c=o>0,u=`->${s}${c?o:""}<- ${a?`with argument: ->${a}<-`:""}
                  appears more than once (${e.length} times) in the top level rule: ->${n}<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `;return u=u.replace(/[ \t]+/g," "),u=u.replace(/\s\s+/g,`
`),u},buildNamespaceConflictError(t){return`Namespace conflict found in grammar.
The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <${t.name}>.
To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`},buildAlternationPrefixAmbiguityError(t){let e=L(t.prefixPath,i=>xi(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx;return`Ambiguous alternatives: <${t.ambiguityIndices.join(" ,")}> due to common lookahead prefix
in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`},buildAlternationAmbiguityError(t){let e=L(t.prefixPath,i=>xi(i)).join(", "),r=t.alternation.idx===0?"":t.alternation.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(" ,")}> in <OR${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n},buildEmptyRepetitionError(t){let e=_r(t.repetition);return t.repetition.idx!==0&&(e+=t.repetition.idx),`The repetition <${e}> within Rule <${t.topLevelRule.name}> can never consume any tokens.
This could lead to an infinite loop.`},buildTokenNameError(t){return"deprecated"},buildEmptyAlternationError(t){return`Ambiguous empty alternative: <${t.emptyChoiceIdx+1}> in <OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
Only the last alternative may be an empty alternative.`},buildTooManyAlternativesError(t){return`An Alternation cannot have more than 256 alternatives:
<OR${t.alternation.idx}> inside <${t.topLevelRule.name}> Rule.
 has ${t.alternation.definition.length+1} alternatives.`},buildLeftRecursionError(t){let e=t.topLevelRule.name,r=L(t.leftRecursionPath,o=>o.name),n=`${e} --> ${r.concat([e]).join(" --> ")}`;return`Left Recursion found in grammar.
rule: <${e}> can be invoked from itself (directly or indirectly)
without consuming any Tokens. The grammar path that causes this is: 
 ${n}
 To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`},buildInvalidRuleNameError(t){return"deprecated"},buildDuplicateRuleNameError(t){let e;return t.topLevelRule instanceof Tr?e=t.topLevelRule.name:e=t.topLevelRule,`Duplicate definition, rule: ->${e}<- is already defined in the grammar: ->${t.grammarName}<-`}};function Jw(t,e){let r=new lg(t,e);return r.resolveRefs(),r.errors}var lg=class extends vr{constructor(e,r){super(),this.nameToTopRule=e,this.errMsgProvider=r,this.errors=[]}resolveRefs(){G(De(this.nameToTopRule),e=>{this.currTopLevel=e,e.accept(this)})}visitNonTerminal(e){let r=this.nameToTopRule[e.nonTerminalName];if(r)e.referencedRule=r;else{let n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,e);this.errors.push({message:n,type:Lt.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:e.nonTerminalName})}}};var fg=class extends Ti{constructor(e,r){super(),this.topProd=e,this.path=r,this.possibleTokTypes=[],this.nextProductionName="",this.nextProductionOccurrence=0,this.found=!1,this.isAtEndOfPath=!1}startWalking(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=Be(this.path.ruleStack).reverse(),this.occurrenceStack=Be(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes}walk(e,r=[]){this.found||super.walk(e,r)}walkProdRef(e,r,n){if(e.referencedRule.name===this.nextProductionName&&e.idx===this.nextProductionOccurrence){let i=r.concat(n);this.updateExpectedNext(),this.walk(e.referencedRule,i)}}updateExpectedNext(){se(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())}},Jf=class extends fg{constructor(e,r){super(e,r),this.path=r,this.nextTerminalName="",this.nextTerminalOccurrence=0,this.nextTerminalName=this.path.lastTok.name,this.nextTerminalOccurrence=this.path.lastTokOccurrence}walkTerminal(e,r,n){if(this.isAtEndOfPath&&e.terminalType.name===this.nextTerminalName&&e.idx===this.nextTerminalOccurrence&&!this.found){let i=r.concat(n),o=new ze({definition:i});this.possibleTokTypes=Mo(o),this.found=!0}}},ma=class extends Ti{constructor(e,r){super(),this.topRule=e,this.occurrence=r,this.result={token:void 0,occurrence:void 0,isEndOfRule:void 0}}startWalking(){return this.walk(this.topRule),this.result}},Qf=class extends ma{walkMany(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkMany(e,r,n)}},Mc=class extends ma{walkManySep(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkManySep(e,r,n)}},Zf=class extends ma{walkAtLeastOne(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOne(e,r,n)}},Fc=class extends ma{walkAtLeastOneSep(e,r,n){if(e.idx===this.occurrence){let i=jt(r.concat(n));this.result.isEndOfRule=i===void 0,i instanceof ae&&(this.result.token=i.terminalType,this.result.occurrence=i.idx)}else super.walkAtLeastOneSep(e,r,n)}};function ed(t,e,r=[]){r=Be(r);let n=[],i=0;function o(a){return a.concat(vt(t,i+1))}function s(a){let c=ed(o(a),e,r);return n.concat(c)}for(;r.length<e&&i<t.length;){let a=t[i];if(a instanceof ze)return s(a.definition);if(a instanceof Ae)return s(a.definition);if(a instanceof ke)n=s(a.definition);else if(a instanceof Ve){let c=a.definition.concat([new pe({definition:a.definition})]);return s(c)}else if(a instanceof Xe){let c=[new ze({definition:a.definition}),new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})];return s(c)}else if(a instanceof Fe){let c=a.definition.concat([new pe({definition:[new ae({terminalType:a.separator})].concat(a.definition)})]);n=s(c)}else if(a instanceof pe){let c=a.definition.concat([new pe({definition:a.definition})]);n=s(c)}else{if(a instanceof Ue)return G(a.definition,c=>{se(c.definition)===!1&&(n=s(c.definition))}),n;if(a instanceof ae)r.push(a.terminalType);else throw Error("non exhaustive match")}i++}return n.push({partialPath:r,suffixDef:vt(t,i)}),n}function td(t,e,r,n){let i="EXIT_NONE_TERMINAL",o=[i],s="EXIT_ALTERNATIVE",a=!1,c=e.length,u=c-n-1,l=[],f=[];for(f.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!se(f);){let m=f.pop();if(m===s){a&&Kn(f).idx<=u&&f.pop();continue}let T=m.def,S=m.idx,C=m.ruleStack,N=m.occurrenceStack;if(se(T))continue;let A=T[0];if(A===i){let v={idx:S,def:vt(T),ruleStack:yi(C),occurrenceStack:yi(N)};f.push(v)}else if(A instanceof ae)if(S<c-1){let v=S+1,y=e[v];if(r(y,A.terminalType)){let _={idx:v,def:vt(T),ruleStack:C,occurrenceStack:N};f.push(_)}}else if(S===c-1)l.push({nextTokenType:A.terminalType,nextTokenOccurrence:A.idx,ruleStack:C,occurrenceStack:N}),a=!0;else throw Error("non exhaustive match");else if(A instanceof Ae){let v=Be(C);v.push(A.nonTerminalName);let y=Be(N);y.push(A.idx);let _={idx:S,def:A.definition.concat(o,vt(T)),ruleStack:v,occurrenceStack:y};f.push(_)}else if(A instanceof ke){let v={idx:S,def:vt(T),ruleStack:C,occurrenceStack:N};f.push(v),f.push(s);let y={idx:S,def:A.definition.concat(vt(T)),ruleStack:C,occurrenceStack:N};f.push(y)}else if(A instanceof Ve){let v=new pe({definition:A.definition,idx:A.idx}),y=A.definition.concat([v],vt(T)),_={idx:S,def:y,ruleStack:C,occurrenceStack:N};f.push(_)}else if(A instanceof Xe){let v=new ae({terminalType:A.separator}),y=new pe({definition:[v].concat(A.definition),idx:A.idx}),_=A.definition.concat([y],vt(T)),D={idx:S,def:_,ruleStack:C,occurrenceStack:N};f.push(D)}else if(A instanceof Fe){let v={idx:S,def:vt(T),ruleStack:C,occurrenceStack:N};f.push(v),f.push(s);let y=new ae({terminalType:A.separator}),_=new pe({definition:[y].concat(A.definition),idx:A.idx}),D=A.definition.concat([_],vt(T)),X={idx:S,def:D,ruleStack:C,occurrenceStack:N};f.push(X)}else if(A instanceof pe){let v={idx:S,def:vt(T),ruleStack:C,occurrenceStack:N};f.push(v),f.push(s);let y=new pe({definition:A.definition,idx:A.idx}),_=A.definition.concat([y],vt(T)),D={idx:S,def:_,ruleStack:C,occurrenceStack:N};f.push(D)}else if(A instanceof Ue)for(let v=A.definition.length-1;v>=0;v--){let y=A.definition[v],_={idx:S,def:y.definition.concat(vt(T)),ruleStack:C,occurrenceStack:N};f.push(_),f.push(s)}else if(A instanceof ze)f.push({idx:S,def:A.definition.concat(vt(T)),ruleStack:C,occurrenceStack:N});else if(A instanceof Tr)f.push(qU(A,S,C,N));else throw Error("non exhaustive match")}return l}function qU(t,e,r,n){let i=Be(r);i.push(t.name);let o=Be(n);return o.push(1),{idx:e,def:t.definition,ruleStack:i,occurrenceStack:o}}var nt;(function(t){t[t.OPTION=0]="OPTION",t[t.REPETITION=1]="REPETITION",t[t.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",t[t.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",t[t.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",t[t.ALTERNATION=5]="ALTERNATION"})(nt||(nt={}));function Uc(t){if(t instanceof ke||t==="Option")return nt.OPTION;if(t instanceof pe||t==="Repetition")return nt.REPETITION;if(t instanceof Ve||t==="RepetitionMandatory")return nt.REPETITION_MANDATORY;if(t instanceof Xe||t==="RepetitionMandatoryWithSeparator")return nt.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof Fe||t==="RepetitionWithSeparator")return nt.REPETITION_WITH_SEPARATOR;if(t instanceof Ue||t==="Alternation")return nt.ALTERNATION;throw Error("non exhaustive match")}function nd(t){let{occurrence:e,rule:r,prodType:n,maxLookahead:i}=t,o=Uc(n);return o===nt.ALTERNATION?ha(e,r,i):ga(e,r,o,i)}function Zw(t,e,r,n,i,o){let s=ha(t,e,r),a=oC(s)?pa:vi;return o(s,n,a,i)}function eC(t,e,r,n,i,o){let s=ga(t,e,i,r),a=oC(s)?pa:vi;return o(s[0],a,n)}function tC(t,e,r,n){let i=t.length,o=cr(t,s=>cr(s,a=>a.length===1));if(e)return function(s){let a=L(s,c=>c.GATE);for(let c=0;c<i;c++){let u=t[c],l=u.length,f=a[c];if(!(f!==void 0&&f.call(this)===!1))e:for(let m=0;m<l;m++){let T=u[m],S=T.length;for(let C=0;C<S;C++){let N=this.LA(C+1);if(r(N,T[C])===!1)continue e}return c}}};if(o&&!n){let s=L(t,c=>Tt(c)),a=ut(s,(c,u,l)=>(G(u,f=>{W(c,f.tokenTypeIdx)||(c[f.tokenTypeIdx]=l),G(f.categoryMatches,m=>{W(c,m)||(c[m]=l)})}),c),{});return function(){let c=this.LA(1);return a[c.tokenTypeIdx]}}else return function(){for(let s=0;s<i;s++){let a=t[s],c=a.length;e:for(let u=0;u<c;u++){let l=a[u],f=l.length;for(let m=0;m<f;m++){let T=this.LA(m+1);if(r(T,l[m])===!1)continue e}return s}}}}function rC(t,e,r){let n=cr(t,o=>o.length===1),i=t.length;if(n&&!r){let o=Tt(t);if(o.length===1&&se(o[0].categoryMatches)){let a=o[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===a}}else{let s=ut(o,(a,c,u)=>(a[c.tokenTypeIdx]=!0,G(c.categoryMatches,l=>{a[l]=!0}),a),[]);return function(){let a=this.LA(1);return s[a.tokenTypeIdx]===!0}}}else return function(){e:for(let o=0;o<i;o++){let s=t[o],a=s.length;for(let c=0;c<a;c++){let u=this.LA(c+1);if(e(u,s[c])===!1)continue e}return!0}return!1}}var pg=class extends Ti{constructor(e,r,n){super(),this.topProd=e,this.targetOccurrence=r,this.targetProdType=n}startWalking(){return this.walk(this.topProd),this.restDef}checkIsTarget(e,r,n,i){return e.idx===this.targetOccurrence&&this.targetProdType===r?(this.restDef=n.concat(i),!0):!1}walkOption(e,r,n){this.checkIsTarget(e,nt.OPTION,r,n)||super.walkOption(e,r,n)}walkAtLeastOne(e,r,n){this.checkIsTarget(e,nt.REPETITION_MANDATORY,r,n)||super.walkOption(e,r,n)}walkAtLeastOneSep(e,r,n){this.checkIsTarget(e,nt.REPETITION_MANDATORY_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}walkMany(e,r,n){this.checkIsTarget(e,nt.REPETITION,r,n)||super.walkOption(e,r,n)}walkManySep(e,r,n){this.checkIsTarget(e,nt.REPETITION_WITH_SEPARATOR,r,n)||super.walkOption(e,r,n)}},rd=class extends vr{constructor(e,r,n){super(),this.targetOccurrence=e,this.targetProdType=r,this.targetRef=n,this.result=[]}checkIsTarget(e,r){e.idx===this.targetOccurrence&&this.targetProdType===r&&(this.targetRef===void 0||e===this.targetRef)&&(this.result=e.definition)}visitOption(e){this.checkIsTarget(e,nt.OPTION)}visitRepetition(e){this.checkIsTarget(e,nt.REPETITION)}visitRepetitionMandatory(e){this.checkIsTarget(e,nt.REPETITION_MANDATORY)}visitRepetitionMandatoryWithSeparator(e){this.checkIsTarget(e,nt.REPETITION_MANDATORY_WITH_SEPARATOR)}visitRepetitionWithSeparator(e){this.checkIsTarget(e,nt.REPETITION_WITH_SEPARATOR)}visitAlternation(e){this.checkIsTarget(e,nt.ALTERNATION)}};function Qw(t){let e=new Array(t);for(let r=0;r<t;r++)e[r]=[];return e}function dg(t){let e=[""];for(let r=0;r<t.length;r++){let n=t[r],i=[];for(let o=0;o<e.length;o++){let s=e[o];i.push(s+"_"+n.tokenTypeIdx);for(let a=0;a<n.categoryMatches.length;a++){let c="_"+n.categoryMatches[a];i.push(s+c)}}e=i}return e}function jU(t,e,r){for(let n=0;n<t.length;n++){if(n===r)continue;let i=t[n];for(let o=0;o<e.length;o++){let s=e[o];if(i[s]===!0)return!1}}return!0}function nC(t,e){let r=L(t,s=>ed([s],1)),n=Qw(r.length),i=L(r,s=>{let a={};return G(s,c=>{let u=dg(c.partialPath);G(u,l=>{a[l]=!0})}),a}),o=r;for(let s=1;s<=e;s++){let a=o;o=Qw(a.length);for(let c=0;c<a.length;c++){let u=a[c];for(let l=0;l<u.length;l++){let f=u[l].partialPath,m=u[l].suffixDef,T=dg(f);if(jU(i,T,c)||se(m)||f.length===e){let C=n[c];if(id(C,f)===!1){C.push(f);for(let N=0;N<T.length;N++){let A=T[N];i[c][A]=!0}}}else{let C=ed(m,s+1,f);o[c]=o[c].concat(C),G(C,N=>{let A=dg(N.partialPath);G(A,v=>{i[c][v]=!0})})}}}}return n}function ha(t,e,r,n){let i=new rd(t,nt.ALTERNATION,n);return e.accept(i),nC(i.result,r)}function ga(t,e,r,n){let i=new rd(t,r);e.accept(i);let o=i.result,a=new pg(e,t,r).startWalking(),c=new ze({definition:o}),u=new ze({definition:a});return nC([c,u],n)}function id(t,e){e:for(let r=0;r<t.length;r++){let n=t[r];if(n.length===e.length){for(let i=0;i<n.length;i++){let o=e[i],s=n[i];if((o===s||s.categoryMatchesMap[o.tokenTypeIdx]!==void 0)===!1)continue e}return!0}}return!1}function iC(t,e){return t.length<e.length&&cr(t,(r,n)=>{let i=e[n];return r===i||i.categoryMatchesMap[r.tokenTypeIdx]})}function oC(t){return cr(t,e=>cr(e,r=>cr(r,n=>se(n.categoryMatches))))}function sC(t){let e=t.lookaheadStrategy.validate({rules:t.rules,tokenTypes:t.tokenTypes,grammarName:t.grammarName});return L(e,r=>Object.assign({type:Lt.CUSTOM_LOOKAHEAD_VALIDATION},r))}function aC(t,e,r,n){let i=Zt(t,c=>GU(c,r)),o=VU(t,e,r),s=Zt(t,c=>WU(c,r)),a=Zt(t,c=>KU(c,t,n,r));return i.concat(o,s,a)}function GU(t,e){let r=new mg;t.accept(r);let n=r.allProductions,i=Qh(n,HU),o=Er(i,a=>a.length>1);return L(De(o),a=>{let c=jt(a),u=e.buildDuplicateFoundError(t,a),l=_r(c),f={message:u,type:Lt.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:l,occurrence:c.idx},m=cC(c);return m&&(f.parameter=m),f})}function HU(t){return`${_r(t)}_#_${t.idx}_#_${cC(t)}`}function cC(t){return t instanceof ae?t.terminalType.name:t instanceof Ae?t.nonTerminalName:""}var mg=class extends vr{constructor(){super(...arguments),this.allProductions=[]}visitNonTerminal(e){this.allProductions.push(e)}visitOption(e){this.allProductions.push(e)}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}visitAlternation(e){this.allProductions.push(e)}visitTerminal(e){this.allProductions.push(e)}};function KU(t,e,r,n){let i=[];if(ut(e,(s,a)=>a.name===t.name?s+1:s,0)>1){let s=n.buildDuplicateRuleNameError({topLevelRule:t,grammarName:r});i.push({message:s,type:Lt.DUPLICATE_RULE_NAME,ruleName:t.name})}return i}function uC(t,e,r){let n=[],i;return tt(e,t)||(i=`Invalid rule override, rule: ->${t}<- cannot be overridden in the grammar: ->${r}<-as it is not defined in any of the super grammars `,n.push({message:i,type:Lt.INVALID_RULE_OVERRIDE,ruleName:t})),n}function gg(t,e,r,n=[]){let i=[],o=od(e.definition);if(se(o))return[];{let s=t.name;tt(o,t)&&i.push({message:r.buildLeftRecursionError({topLevelRule:t,leftRecursionPath:n}),type:Lt.LEFT_RECURSION,ruleName:s});let c=Qi(o,n.concat([t])),u=Zt(c,l=>{let f=Be(n);return f.push(l),gg(t,l,r,f)});return i.concat(u)}}function od(t){let e=[];if(se(t))return e;let r=jt(t);if(r instanceof Ae)e.push(r.referencedRule);else if(r instanceof ze||r instanceof ke||r instanceof Ve||r instanceof Xe||r instanceof Fe||r instanceof pe)e=e.concat(od(r.definition));else if(r instanceof Ue)e=Tt(L(r.definition,o=>od(o.definition)));else if(!(r instanceof ae))throw Error("non exhaustive match");let n=Lo(r),i=t.length>1;if(n&&i){let o=vt(t);return e.concat(od(o))}else return e}var qc=class extends vr{constructor(){super(...arguments),this.alternations=[]}visitAlternation(e){this.alternations.push(e)}};function lC(t,e){let r=new qc;t.accept(r);let n=r.alternations;return Zt(n,o=>{let s=yi(o.definition);return Zt(s,(a,c)=>{let u=td([a],[],vi,1);return se(u)?[{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:o,emptyChoiceIdx:c}),type:Lt.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:o.idx,alternative:c+1}]:[]})})}function fC(t,e,r){let n=new qc;t.accept(n);let i=n.alternations;return i=Zi(i,s=>s.ignoreAmbiguities===!0),Zt(i,s=>{let a=s.idx,c=s.maxLookahead||e,u=ha(a,t,c,s),l=BU(u,s,t,r),f=zU(u,s,t,r);return l.concat(f)})}var hg=class extends vr{constructor(){super(...arguments),this.allProductions=[]}visitRepetitionWithSeparator(e){this.allProductions.push(e)}visitRepetitionMandatory(e){this.allProductions.push(e)}visitRepetitionMandatoryWithSeparator(e){this.allProductions.push(e)}visitRepetition(e){this.allProductions.push(e)}};function WU(t,e){let r=new qc;t.accept(r);let n=r.alternations;return Zt(n,o=>o.definition.length>255?[{message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:o}),type:Lt.TOO_MANY_ALTS,ruleName:t.name,occurrence:o.idx}]:[])}function dC(t,e,r){let n=[];return G(t,i=>{let o=new hg;i.accept(o);let s=o.allProductions;G(s,a=>{let c=Uc(a),u=a.maxLookahead||e,l=a.idx,m=ga(l,i,c,u)[0];if(se(Tt(m))){let T=r.buildEmptyRepetitionError({topLevelRule:i,repetition:a});n.push({message:T,type:Lt.NO_NON_EMPTY_LOOKAHEAD,ruleName:i.name})}})}),n}function BU(t,e,r,n){let i=[],o=ut(t,(a,c,u)=>(e.definition[u].ignoreAmbiguities===!0||G(c,l=>{let f=[u];G(t,(m,T)=>{u!==T&&id(m,l)&&e.definition[T].ignoreAmbiguities!==!0&&f.push(T)}),f.length>1&&!id(i,l)&&(i.push(l),a.push({alts:f,path:l}))}),a),[]);return L(o,a=>{let c=L(a.alts,l=>l+1);return{message:n.buildAlternationAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:c,prefixPath:a.path}),type:Lt.AMBIGUOUS_ALTS,ruleName:r.name,occurrence:e.idx,alternatives:a.alts}})}function zU(t,e,r,n){let i=ut(t,(s,a,c)=>{let u=L(a,l=>({idx:c,path:l}));return s.concat(u)},[]);return Hn(Zt(i,s=>{if(e.definition[s.idx].ignoreAmbiguities===!0)return[];let c=s.idx,u=s.path,l=qt(i,m=>e.definition[m.idx].ignoreAmbiguities!==!0&&m.idx<c&&iC(m.path,u));return L(l,m=>{let T=[m.idx+1,c+1],S=e.idx===0?"":e.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:r,alternation:e,ambiguityIndices:T,prefixPath:m.path}),type:Lt.AMBIGUOUS_PREFIX_ALTS,ruleName:r.name,occurrence:S,alternatives:T}})}))}function VU(t,e,r){let n=[],i=L(e,o=>o.name);return G(t,o=>{let s=o.name;if(tt(i,s)){let a=r.buildNamespaceConflictError(o);n.push({message:a,type:Lt.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:s})}}),n}function pC(t){let e=sa(t,{errMsgProvider:Yw}),r={};return G(t.rules,n=>{r[n.name]=n}),Jw(r,e.errMsgProvider)}function mC(t){return t=sa(t,{errMsgProvider:Sn}),aC(t.rules,t.tokenTypes,t.errMsgProvider,t.grammarName)}var hC="MismatchedTokenException",gC="NoViableAltException",yC="EarlyExitException",TC="NotAllInputParsedException",vC=[hC,gC,yC,TC];Object.freeze(vC);function eo(t){return tt(vC,t.name)}var ya=class extends Error{constructor(e,r){super(e),this.token=r,this.resyncedTokens=[],Object.setPrototypeOf(this,new.target.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},qo=class extends ya{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=hC}},jc=class extends ya{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=gC}},Gc=class extends ya{constructor(e,r){super(e,r),this.name=TC}},Hc=class extends ya{constructor(e,r,n){super(e,r),this.previousToken=n,this.name=yC}};var yg={},vg="InRuleRecoveryException",Tg=class extends Error{constructor(e){super(e),this.name=vg}},sd=class{initRecoverable(e){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=W(e,"recoveryEnabled")?e.recoveryEnabled:Rr.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=XU)}getTokenToInsert(e){let r=Uo(e,"",NaN,NaN,NaN,NaN,NaN,NaN);return r.isInsertedInRecovery=!0,r}canTokenTypeBeInsertedInRecovery(e){return!0}canTokenTypeBeDeletedInRecovery(e){return!0}tryInRepetitionRecovery(e,r,n,i){let o=this.findReSyncTokenType(),s=this.exportLexerState(),a=[],c=!1,u=this.LA(1),l=this.LA(1),f=()=>{let m=this.LA(0),T=this.errorMessageProvider.buildMismatchTokenMessage({expected:i,actual:u,previous:m,ruleName:this.getCurrRuleFullName()}),S=new qo(T,u,this.LA(0));S.resyncedTokens=yi(a),this.SAVE_ERROR(S)};for(;!c;)if(this.tokenMatcher(l,i)){f();return}else if(n.call(this)){f(),e.apply(this,r);return}else this.tokenMatcher(l,o)?c=!0:(l=this.SKIP_TOKEN(),this.addToResyncTokens(l,a));this.importLexerState(s)}shouldInRepetitionRecoveryBeTried(e,r,n){return!(n===!1||this.tokenMatcher(this.LA(1),e)||this.isBackTracking()||this.canPerformInRuleRecovery(e,this.getFollowsForInRuleRecovery(e,r)))}getFollowsForInRuleRecovery(e,r){let n=this.getCurrentGrammarPath(e,r);return this.getNextPossibleTokenTypes(n)}tryInRuleRecovery(e,r){if(this.canRecoverWithSingleTokenInsertion(e,r))return this.getTokenToInsert(e);if(this.canRecoverWithSingleTokenDeletion(e)){let n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new Tg("sad sad panda")}canPerformInRuleRecovery(e,r){return this.canRecoverWithSingleTokenInsertion(e,r)||this.canRecoverWithSingleTokenDeletion(e)}canRecoverWithSingleTokenInsertion(e,r){if(!this.canTokenTypeBeInsertedInRecovery(e)||se(r))return!1;let n=this.LA(1);return Wn(r,o=>this.tokenMatcher(n,o))!==void 0}canRecoverWithSingleTokenDeletion(e){return this.canTokenTypeBeDeletedInRecovery(e)?this.tokenMatcher(this.LA(2),e):!1}isInCurrentRuleReSyncSet(e){let r=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(r);return tt(n,e)}findReSyncTokenType(){let e=this.flattenFollowSet(),r=this.LA(1),n=2;for(;;){let i=Wn(e,o=>Lc(r,o));if(i!==void 0)return i;r=this.LA(n),n++}}getCurrFollowKey(){if(this.RULE_STACK.length===1)return yg;let e=this.getLastExplicitRuleShortName(),r=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(e),idxInCallingRule:r,inRule:this.shortRuleNameToFullName(n)}}buildFullFollowKeyStack(){let e=this.RULE_STACK,r=this.RULE_OCCURRENCE_STACK;return L(e,(n,i)=>i===0?yg:{ruleName:this.shortRuleNameToFullName(n),idxInCallingRule:r[i],inRule:this.shortRuleNameToFullName(e[i-1])})}flattenFollowSet(){let e=L(this.buildFullFollowKeyStack(),r=>this.getFollowSetFromFollowKey(r));return Tt(e)}getFollowSetFromFollowKey(e){if(e===yg)return[bn];let r=e.ruleName+e.idxInCallingRule+Kf+e.inRule;return this.resyncFollows[r]}addToResyncTokens(e,r){return this.tokenMatcher(e,bn)||r.push(e),r}reSyncTo(e){let r=[],n=this.LA(1);for(;this.tokenMatcher(n,e)===!1;)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,r);return yi(r)}attemptInRepetitionRecovery(e,r,n,i,o,s,a){}getCurrentGrammarPath(e,r){let n=this.getHumanReadableRuleStack(),i=Be(this.RULE_OCCURRENCE_STACK);return{ruleStack:n,occurrenceStack:i,lastTok:e,lastTokOccurrence:r}}getHumanReadableRuleStack(){return L(this.RULE_STACK,e=>this.shortRuleNameToFullName(e))}};function XU(t,e,r,n,i,o,s){let a=this.getKeyForAutomaticLookahead(n,i),c=this.firstAfterRepMap[a];if(c===void 0){let m=this.getCurrRuleFullName(),T=this.getGAstProductions()[m];c=new o(T,i).startWalking(),this.firstAfterRepMap[a]=c}let u=c.token,l=c.occurrence,f=c.isEndOfRule;this.RULE_STACK.length===1&&f&&u===void 0&&(u=bn,l=1),!(u===void 0||l===void 0)&&this.shouldInRepetitionRecoveryBeTried(u,l,s)&&this.tryInRepetitionRecovery(t,e,r,u)}function ad(t,e,r){return r|e|t}var une=32-8;var Si=class{constructor(e){var r;this.maxLookahead=(r=e?.maxLookahead)!==null&&r!==void 0?r:Rr.maxLookahead}validate(e){let r=this.validateNoLeftRecursion(e.rules);if(se(r)){let n=this.validateEmptyOrAlternatives(e.rules),i=this.validateAmbiguousAlternationAlternatives(e.rules,this.maxLookahead),o=this.validateSomeNonEmptyLookaheadPath(e.rules,this.maxLookahead);return[...r,...n,...i,...o]}return r}validateNoLeftRecursion(e){return Zt(e,r=>gg(r,r,Sn))}validateEmptyOrAlternatives(e){return Zt(e,r=>lC(r,Sn))}validateAmbiguousAlternationAlternatives(e,r){return Zt(e,n=>fC(n,r,Sn))}validateSomeNonEmptyLookaheadPath(e,r){return dC(e,r,Sn)}buildLookaheadForAlternation(e){return Zw(e.prodOccurrence,e.rule,e.maxLookahead,e.hasPredicates,e.dynamicTokensEnabled,tC)}buildLookaheadForOptional(e){return eC(e.prodOccurrence,e.rule,e.maxLookahead,e.dynamicTokensEnabled,Uc(e.prodType),rC)}};var ud=class{initLooksAhead(e){this.dynamicTokensEnabled=W(e,"dynamicTokensEnabled")?e.dynamicTokensEnabled:Rr.dynamicTokensEnabled,this.maxLookahead=W(e,"maxLookahead")?e.maxLookahead:Rr.maxLookahead,this.lookaheadStrategy=W(e,"lookaheadStrategy")?e.lookaheadStrategy:new Si({maxLookahead:this.maxLookahead}),this.lookAheadFuncsCache=new Map}preComputeLookaheadFunctions(e){G(e,r=>{this.TRACE_INIT(`${r.name} Rule Lookahead`,()=>{let{alternation:n,repetition:i,option:o,repetitionMandatory:s,repetitionMandatoryWithSeparator:a,repetitionWithSeparator:c}=YU(r);G(n,u=>{let l=u.idx===0?"":u.idx;this.TRACE_INIT(`${_r(u)}${l}`,()=>{let f=this.lookaheadStrategy.buildLookaheadForAlternation({prodOccurrence:u.idx,rule:r,maxLookahead:u.maxLookahead||this.maxLookahead,hasPredicates:u.hasPredicates,dynamicTokensEnabled:this.dynamicTokensEnabled}),m=ad(this.fullRuleNameToShort[r.name],256,u.idx);this.setLaFuncCache(m,f)})}),G(i,u=>{this.computeLookaheadFunc(r,u.idx,768,"Repetition",u.maxLookahead,_r(u))}),G(o,u=>{this.computeLookaheadFunc(r,u.idx,512,"Option",u.maxLookahead,_r(u))}),G(s,u=>{this.computeLookaheadFunc(r,u.idx,1024,"RepetitionMandatory",u.maxLookahead,_r(u))}),G(a,u=>{this.computeLookaheadFunc(r,u.idx,1536,"RepetitionMandatoryWithSeparator",u.maxLookahead,_r(u))}),G(c,u=>{this.computeLookaheadFunc(r,u.idx,1280,"RepetitionWithSeparator",u.maxLookahead,_r(u))})})})}computeLookaheadFunc(e,r,n,i,o,s){this.TRACE_INIT(`${s}${r===0?"":r}`,()=>{let a=this.lookaheadStrategy.buildLookaheadForOptional({prodOccurrence:r,rule:e,maxLookahead:o||this.maxLookahead,dynamicTokensEnabled:this.dynamicTokensEnabled,prodType:i}),c=ad(this.fullRuleNameToShort[e.name],n,r);this.setLaFuncCache(c,a)})}getKeyForAutomaticLookahead(e,r){let n=this.getLastExplicitRuleShortName();return ad(n,e,r)}getLaFuncFromCache(e){return this.lookAheadFuncsCache.get(e)}setLaFuncCache(e,r){this.lookAheadFuncsCache.set(e,r)}},Rg=class extends vr{constructor(){super(...arguments),this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}reset(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}}visitOption(e){this.dslMethods.option.push(e)}visitRepetitionWithSeparator(e){this.dslMethods.repetitionWithSeparator.push(e)}visitRepetitionMandatory(e){this.dslMethods.repetitionMandatory.push(e)}visitRepetitionMandatoryWithSeparator(e){this.dslMethods.repetitionMandatoryWithSeparator.push(e)}visitRepetition(e){this.dslMethods.repetition.push(e)}visitAlternation(e){this.dslMethods.alternation.push(e)}},cd=new Rg;function YU(t){cd.reset(),t.accept(cd);let e=cd.dslMethods;return cd.reset(),e}function Sg(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset)}function wg(t,e){isNaN(t.startOffset)===!0?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}function RC(t,e,r){t.children[r]===void 0?t.children[r]=[e]:t.children[r].push(e)}function xC(t,e,r){t.children[e]===void 0?t.children[e]=[r]:t.children[e].push(r)}var JU="name";function Cg(t,e){Object.defineProperty(t,JU,{enumerable:!1,configurable:!0,writable:!1,value:e})}function QU(t,e){let r=Ke(t),n=r.length;for(let i=0;i<n;i++){let o=r[i],s=t[o],a=s.length;for(let c=0;c<a;c++){let u=s[c];u.tokenTypeIdx===void 0&&this[u.name](u.children,e)}}}function bC(t,e){let r=function(){};Cg(r,t+"BaseSemantics");let n={visit:function(i,o){if(z(i)&&(i=i[0]),!ur(i))return this[i.name](i.children,o)},validateVisitor:function(){let i=ZU(this,e);if(!se(i)){let o=L(i,s=>s.msg);throw Error(`Errors Detected in CST Visitor <${this.constructor.name}>:
	${o.join(`

`).replace(/\n/g,`
	`)}`)}}};return r.prototype=n,r.prototype.constructor=r,r._RULE_NAMES=e,r}function SC(t,e,r){let n=function(){};Cg(n,t+"BaseSemanticsWithDefaults");let i=Object.create(r.prototype);return G(e,o=>{i[o]=QU}),n.prototype=i,n.prototype.constructor=n,n}var Ag;(function(t){t[t.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",t[t.MISSING_METHOD=1]="MISSING_METHOD"})(Ag||(Ag={}));function ZU(t,e){return eq(t,e)}function eq(t,e){let r=qt(e,i=>yr(t[i])===!1),n=L(r,i=>({msg:`Missing visitor method: <${i}> on ${t.constructor.name} CST Visitor.`,type:Ag.MISSING_METHOD,methodName:i}));return Hn(n)}var pd=class{initTreeBuilder(e){if(this.CST_STACK=[],this.outputCst=e.outputCst,this.nodeLocationTracking=W(e,"nodeLocationTracking")?e.nodeLocationTracking:Rr.nodeLocationTracking,!this.outputCst)this.cstInvocationStateUpdate=ct,this.cstFinallyStateUpdate=ct,this.cstPostTerminal=ct,this.cstPostNonTerminal=ct,this.cstPostRule=ct;else if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=wg,this.setNodeLocationFromNode=wg,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=Sg,this.setNodeLocationFromNode=Sg,this.cstPostRule=ct,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=ct,this.setNodeLocationFromNode=ct,this.cstPostRule=ct,this.setInitialNodeLocation=ct;else throw Error(`Invalid <nodeLocationTracking> config option: "${e.nodeLocationTracking}"`)}setInitialNodeLocationOnlyOffsetRecovery(e){e.location={startOffset:NaN,endOffset:NaN}}setInitialNodeLocationOnlyOffsetRegular(e){e.location={startOffset:this.LA(1).startOffset,endOffset:NaN}}setInitialNodeLocationFullRecovery(e){e.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}}setInitialNodeLocationFullRegular(e){let r=this.LA(1);e.location={startOffset:r.startOffset,startLine:r.startLine,startColumn:r.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}}cstInvocationStateUpdate(e){let r={name:e,children:Object.create(null)};this.setInitialNodeLocation(r),this.CST_STACK.push(r)}cstFinallyStateUpdate(){this.CST_STACK.pop()}cstPostRuleFull(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?(n.endOffset=r.endOffset,n.endLine=r.endLine,n.endColumn=r.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)}cstPostRuleOnlyOffset(e){let r=this.LA(0),n=e.location;n.startOffset<=r.startOffset?n.endOffset=r.endOffset:n.startOffset=NaN}cstPostTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];RC(n,r,e),this.setNodeLocationFromToken(n.location,r)}cstPostNonTerminal(e,r){let n=this.CST_STACK[this.CST_STACK.length-1];xC(n,r,e),this.setNodeLocationFromNode(n.location,e.location)}getBaseCstVisitorConstructor(){if(ur(this.baseCstVisitorConstructor)){let e=bC(this.className,Ke(this.gastProductionsCache));return this.baseCstVisitorConstructor=e,e}return this.baseCstVisitorConstructor}getBaseCstVisitorConstructorWithDefaults(){if(ur(this.baseCstVisitorWithDefaultsConstructor)){let e=SC(this.className,Ke(this.gastProductionsCache),this.getBaseCstVisitorConstructor());return this.baseCstVisitorWithDefaultsConstructor=e,e}return this.baseCstVisitorWithDefaultsConstructor}getLastExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-1]}getPreviousExplicitRuleShortName(){let e=this.RULE_STACK;return e[e.length-2]}getLastExplicitRuleOccurrenceIndex(){let e=this.RULE_OCCURRENCE_STACK;return e[e.length-1]}};var md=class{initLexerAdapter(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1}set input(e){if(this.selfAnalysisDone!==!0)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=e,this.tokVectorLength=e.length}get input(){return this.tokVector}SKIP_TOKEN(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):Ta}LA(e){let r=this.currIdx+e;return r<0||this.tokVectorLength<=r?Ta:this.tokVector[r]}consumeToken(){this.currIdx++}exportLexerState(){return this.currIdx}importLexerState(e){this.currIdx=e}resetLexerState(){this.currIdx=-1}moveToTerminatedState(){this.currIdx=this.tokVector.length-1}getLexerPosition(){return this.exportLexerState()}};var hd=class{ACTION(e){return e.call(this)}consume(e,r,n){return this.consumeInternal(r,e,n)}subrule(e,r,n){return this.subruleInternal(r,e,n)}option(e,r){return this.optionInternal(r,e)}or(e,r){return this.orInternal(r,e)}many(e,r){return this.manyInternal(e,r)}atLeastOne(e,r){return this.atLeastOneInternal(e,r)}CONSUME(e,r){return this.consumeInternal(e,0,r)}CONSUME1(e,r){return this.consumeInternal(e,1,r)}CONSUME2(e,r){return this.consumeInternal(e,2,r)}CONSUME3(e,r){return this.consumeInternal(e,3,r)}CONSUME4(e,r){return this.consumeInternal(e,4,r)}CONSUME5(e,r){return this.consumeInternal(e,5,r)}CONSUME6(e,r){return this.consumeInternal(e,6,r)}CONSUME7(e,r){return this.consumeInternal(e,7,r)}CONSUME8(e,r){return this.consumeInternal(e,8,r)}CONSUME9(e,r){return this.consumeInternal(e,9,r)}SUBRULE(e,r){return this.subruleInternal(e,0,r)}SUBRULE1(e,r){return this.subruleInternal(e,1,r)}SUBRULE2(e,r){return this.subruleInternal(e,2,r)}SUBRULE3(e,r){return this.subruleInternal(e,3,r)}SUBRULE4(e,r){return this.subruleInternal(e,4,r)}SUBRULE5(e,r){return this.subruleInternal(e,5,r)}SUBRULE6(e,r){return this.subruleInternal(e,6,r)}SUBRULE7(e,r){return this.subruleInternal(e,7,r)}SUBRULE8(e,r){return this.subruleInternal(e,8,r)}SUBRULE9(e,r){return this.subruleInternal(e,9,r)}OPTION(e){return this.optionInternal(e,0)}OPTION1(e){return this.optionInternal(e,1)}OPTION2(e){return this.optionInternal(e,2)}OPTION3(e){return this.optionInternal(e,3)}OPTION4(e){return this.optionInternal(e,4)}OPTION5(e){return this.optionInternal(e,5)}OPTION6(e){return this.optionInternal(e,6)}OPTION7(e){return this.optionInternal(e,7)}OPTION8(e){return this.optionInternal(e,8)}OPTION9(e){return this.optionInternal(e,9)}OR(e){return this.orInternal(e,0)}OR1(e){return this.orInternal(e,1)}OR2(e){return this.orInternal(e,2)}OR3(e){return this.orInternal(e,3)}OR4(e){return this.orInternal(e,4)}OR5(e){return this.orInternal(e,5)}OR6(e){return this.orInternal(e,6)}OR7(e){return this.orInternal(e,7)}OR8(e){return this.orInternal(e,8)}OR9(e){return this.orInternal(e,9)}MANY(e){this.manyInternal(0,e)}MANY1(e){this.manyInternal(1,e)}MANY2(e){this.manyInternal(2,e)}MANY3(e){this.manyInternal(3,e)}MANY4(e){this.manyInternal(4,e)}MANY5(e){this.manyInternal(5,e)}MANY6(e){this.manyInternal(6,e)}MANY7(e){this.manyInternal(7,e)}MANY8(e){this.manyInternal(8,e)}MANY9(e){this.manyInternal(9,e)}MANY_SEP(e){this.manySepFirstInternal(0,e)}MANY_SEP1(e){this.manySepFirstInternal(1,e)}MANY_SEP2(e){this.manySepFirstInternal(2,e)}MANY_SEP3(e){this.manySepFirstInternal(3,e)}MANY_SEP4(e){this.manySepFirstInternal(4,e)}MANY_SEP5(e){this.manySepFirstInternal(5,e)}MANY_SEP6(e){this.manySepFirstInternal(6,e)}MANY_SEP7(e){this.manySepFirstInternal(7,e)}MANY_SEP8(e){this.manySepFirstInternal(8,e)}MANY_SEP9(e){this.manySepFirstInternal(9,e)}AT_LEAST_ONE(e){this.atLeastOneInternal(0,e)}AT_LEAST_ONE1(e){return this.atLeastOneInternal(1,e)}AT_LEAST_ONE2(e){this.atLeastOneInternal(2,e)}AT_LEAST_ONE3(e){this.atLeastOneInternal(3,e)}AT_LEAST_ONE4(e){this.atLeastOneInternal(4,e)}AT_LEAST_ONE5(e){this.atLeastOneInternal(5,e)}AT_LEAST_ONE6(e){this.atLeastOneInternal(6,e)}AT_LEAST_ONE7(e){this.atLeastOneInternal(7,e)}AT_LEAST_ONE8(e){this.atLeastOneInternal(8,e)}AT_LEAST_ONE9(e){this.atLeastOneInternal(9,e)}AT_LEAST_ONE_SEP(e){this.atLeastOneSepFirstInternal(0,e)}AT_LEAST_ONE_SEP1(e){this.atLeastOneSepFirstInternal(1,e)}AT_LEAST_ONE_SEP2(e){this.atLeastOneSepFirstInternal(2,e)}AT_LEAST_ONE_SEP3(e){this.atLeastOneSepFirstInternal(3,e)}AT_LEAST_ONE_SEP4(e){this.atLeastOneSepFirstInternal(4,e)}AT_LEAST_ONE_SEP5(e){this.atLeastOneSepFirstInternal(5,e)}AT_LEAST_ONE_SEP6(e){this.atLeastOneSepFirstInternal(6,e)}AT_LEAST_ONE_SEP7(e){this.atLeastOneSepFirstInternal(7,e)}AT_LEAST_ONE_SEP8(e){this.atLeastOneSepFirstInternal(8,e)}AT_LEAST_ONE_SEP9(e){this.atLeastOneSepFirstInternal(9,e)}RULE(e,r,n=va){if(tt(this.definedRulesNames,e)){let s={message:Sn.buildDuplicateRuleNameError({topLevelRule:e,grammarName:this.className}),type:Lt.DUPLICATE_RULE_NAME,ruleName:e};this.definitionErrors.push(s)}this.definedRulesNames.push(e);let i=this.defineRule(e,r,n);return this[e]=i,i}OVERRIDE_RULE(e,r,n=va){let i=uC(e,this.definedRulesNames,this.className);this.definitionErrors=this.definitionErrors.concat(i);let o=this.defineRule(e,r,n);return this[e]=o,o}BACKTRACK(e,r){return function(){this.isBackTrackingStack.push(1);let n=this.saveRecogState();try{return e.apply(this,r),!0}catch(i){if(eo(i))return!1;throw i}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}}getGAstProductions(){return this.gastProductionsCache}getSerializedGastProductions(){return Hf(De(this.gastProductionsCache))}};var gd=class{initRecognizerEngine(e,r){if(this.className=this.constructor.name,this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=pa,this.subruleIdx=0,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},W(r,"serializedGrammar"))throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`);if(z(e)){if(se(e))throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`);if(typeof e[0].startOffset=="number")throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)}if(z(e))this.tokensMap=ut(e,(o,s)=>(o[s.name]=s,o),{});else if(W(e,"modes")&&cr(Tt(De(e.modes)),jw)){let o=Tt(De(e.modes)),s=aa(o);this.tokensMap=ut(s,(a,c)=>(a[c.name]=c,a),{})}else if(at(e))this.tokensMap=Be(e);else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=bn;let n=W(e,"modes")?Tt(De(e.modes)):De(e),i=cr(n,o=>se(o.categoryMatches));this.tokenMatcher=i?pa:vi,Ri(De(this.tokensMap))}defineRule(e,r,n){if(this.selfAnalysisDone)throw Error(`Grammar rule <${e}> may not be defined after the 'performSelfAnalysis' method has been called'
Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.`);let i=W(n,"resyncEnabled")?n.resyncEnabled:va.resyncEnabled,o=W(n,"recoveryValueFunc")?n.recoveryValueFunc:va.recoveryValueFunc,s=this.ruleShortNameIdx<<4+8;this.ruleShortNameIdx++,this.shortRuleNameToFull[s]=e,this.fullRuleNameToShort[e]=s;let a;return this.outputCst===!0?a=function(...l){try{this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,l);let f=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(f),f}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}}:a=function(...l){try{return this.ruleInvocationStateUpdate(s,e,this.subruleIdx),r.apply(this,l)}catch(f){return this.invokeRuleCatch(f,i,o)}finally{this.ruleFinallyStateUpdate()}},Object.assign(a,{ruleName:e,originalGrammarAction:r})}invokeRuleCatch(e,r,n){let i=this.RULE_STACK.length===1,o=r&&!this.isBackTracking()&&this.recoveryEnabled;if(eo(e)){let s=e;if(o){let a=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(a))if(s.resyncedTokens=this.reSyncTo(a),this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];return c.recoveredNode=!0,c}else return n(e);else{if(this.outputCst){let c=this.CST_STACK[this.CST_STACK.length-1];c.recoveredNode=!0,s.partialCstResult=c}throw s}}else{if(i)return this.moveToTerminatedState(),n(e);throw s}}else throw e}optionInternal(e,r){let n=this.getKeyForAutomaticLookahead(512,r);return this.optionInternalLogic(e,r,n)}optionInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof e!="function"){o=e.DEF;let s=e.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=e;if(i.call(this)===!0)return o.call(this)}atLeastOneInternal(e,r){let n=this.getKeyForAutomaticLookahead(1024,e);return this.atLeastOneInternalLogic(e,r,n)}atLeastOneInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let s=r.GATE;if(s!==void 0){let a=i;i=()=>s.call(this)&&a.call(this)}}else o=r;if(i.call(this)===!0){let s=this.doSingleRepetition(o);for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o)}else throw this.raiseEarlyExitException(e,nt.REPETITION_MANDATORY,r.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[e,r],i,1024,e,Zf)}atLeastOneSepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1536,e);this.atLeastOneSepFirstInternalLogic(e,r,n)}atLeastOneSepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Fc],a,1536,e,Fc)}else throw this.raiseEarlyExitException(e,nt.REPETITION_MANDATORY_WITH_SEPARATOR,r.ERR_MSG)}manyInternal(e,r){let n=this.getKeyForAutomaticLookahead(768,e);return this.manyInternalLogic(e,r,n)}manyInternalLogic(e,r,n){let i=this.getLaFuncFromCache(n),o;if(typeof r!="function"){o=r.DEF;let a=r.GATE;if(a!==void 0){let c=i;i=()=>a.call(this)&&c.call(this)}}else o=r;let s=!0;for(;i.call(this)===!0&&s===!0;)s=this.doSingleRepetition(o);this.attemptInRepetitionRecovery(this.manyInternal,[e,r],i,768,e,Qf,s)}manySepFirstInternal(e,r){let n=this.getKeyForAutomaticLookahead(1280,e);this.manySepFirstInternalLogic(e,r,n)}manySepFirstInternalLogic(e,r,n){let i=r.DEF,o=r.SEP;if(this.getLaFuncFromCache(n).call(this)===!0){i.call(this);let a=()=>this.tokenMatcher(this.LA(1),o);for(;this.tokenMatcher(this.LA(1),o)===!0;)this.CONSUME(o),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,o,a,i,Mc],a,1280,e,Mc)}}repetitionSepSecondInternal(e,r,n,i,o){for(;n();)this.CONSUME(r),i.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[e,r,n,i,o],n,1536,e,o)}doSingleRepetition(e){let r=this.getLexerPosition();return e.call(this),this.getLexerPosition()>r}orInternal(e,r){let n=this.getKeyForAutomaticLookahead(256,r),i=z(e)?e:e.DEF,s=this.getLaFuncFromCache(n).call(this,i);if(s!==void 0)return i[s].ALT.call(this);this.raiseNoAltException(r,e.ERR_MSG)}ruleFinallyStateUpdate(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),this.RULE_STACK.length===0&&this.isAtEndOfInput()===!1){let e=this.LA(1),r=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:e,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new Gc(r,e))}}subruleInternal(e,r,n){let i;try{let o=n!==void 0?n.ARGS:void 0;return this.subruleIdx=r,i=e.apply(this,o),this.cstPostNonTerminal(i,n!==void 0&&n.LABEL!==void 0?n.LABEL:e.ruleName),i}catch(o){throw this.subruleInternalError(o,n,e.ruleName)}}subruleInternalError(e,r,n){throw eo(e)&&e.partialCstResult!==void 0&&(this.cstPostNonTerminal(e.partialCstResult,r!==void 0&&r.LABEL!==void 0?r.LABEL:n),delete e.partialCstResult),e}consumeInternal(e,r,n){let i;try{let o=this.LA(1);this.tokenMatcher(o,e)===!0?(this.consumeToken(),i=o):this.consumeInternalError(e,o,n)}catch(o){i=this.consumeInternalRecovery(e,r,o)}return this.cstPostTerminal(n!==void 0&&n.LABEL!==void 0?n.LABEL:e.name,i),i}consumeInternalError(e,r,n){let i,o=this.LA(0);throw n!==void 0&&n.ERR_MSG?i=n.ERR_MSG:i=this.errorMessageProvider.buildMismatchTokenMessage({expected:e,actual:r,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new qo(i,r,o))}consumeInternalRecovery(e,r,n){if(this.recoveryEnabled&&n.name==="MismatchedTokenException"&&!this.isBackTracking()){let i=this.getFollowsForInRuleRecovery(e,r);try{return this.tryInRuleRecovery(e,i)}catch(o){throw o.name===vg?n:o}}else throw n}saveRecogState(){let e=this.errors,r=Be(this.RULE_STACK);return{errors:e,lexerState:this.exportLexerState(),RULE_STACK:r,CST_STACK:this.CST_STACK}}reloadRecogState(e){this.errors=e.errors,this.importLexerState(e.lexerState),this.RULE_STACK=e.RULE_STACK}ruleInvocationStateUpdate(e,r,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(e),this.cstInvocationStateUpdate(r)}isBackTracking(){return this.isBackTrackingStack.length!==0}getCurrRuleFullName(){let e=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[e]}shortRuleNameToFullName(e){return this.shortRuleNameToFull[e]}isAtEndOfInput(){return this.tokenMatcher(this.LA(1),bn)}reset(){this.resetLexerState(),this.subruleIdx=0,this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]}};var yd=class{initErrorHandler(e){this._errors=[],this.errorMessageProvider=W(e,"errorMessageProvider")?e.errorMessageProvider:Rr.errorMessageProvider}SAVE_ERROR(e){if(eo(e))return e.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:Be(this.RULE_OCCURRENCE_STACK)},this._errors.push(e),e;throw Error("Trying to save an Error which is not a RecognitionException")}get errors(){return Be(this._errors)}set errors(e){this._errors=e}raiseEarlyExitException(e,r,n){let i=this.getCurrRuleFullName(),o=this.getGAstProductions()[i],a=ga(e,o,r,this.maxLookahead)[0],c=[];for(let l=1;l<=this.maxLookahead;l++)c.push(this.LA(l));let u=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:a,actual:c,previous:this.LA(0),customUserDescription:n,ruleName:i});throw this.SAVE_ERROR(new Hc(u,this.LA(1),this.LA(0)))}raiseNoAltException(e,r){let n=this.getCurrRuleFullName(),i=this.getGAstProductions()[n],o=ha(e,i,this.maxLookahead),s=[];for(let u=1;u<=this.maxLookahead;u++)s.push(this.LA(u));let a=this.LA(0),c=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:o,actual:s,previous:a,customUserDescription:r,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new jc(c,this.LA(1),a))}};var Td=class{initContentAssist(){}computeContentAssist(e,r){let n=this.gastProductionsCache[e];if(ur(n))throw Error(`Rule ->${e}<- does not exist in this grammar.`);return td([n],r,this.tokenMatcher,this.maxLookahead)}getNextPossibleTokenTypes(e){let r=jt(e.ruleStack),i=this.getGAstProductions()[r];return new Jf(i,e).startWalking()}};var xd={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(xd);var wC=!0,CC=Math.pow(2,8)-1,kC=Yf({name:"RECORDING_PHASE_TOKEN",pattern:ht.NA});Ri([kC]);var EC=Uo(kC,`This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,-1,-1,-1,-1,-1,-1);Object.freeze(EC);var rq={name:`This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`,children:{}},vd=class{initGastRecorder(e){this.recordingProdStack=[],this.RECORDING_PHASE=!1}enableRecording(){this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",()=>{for(let e=0;e<10;e++){let r=e>0?e:"";this[`CONSUME${r}`]=function(n,i){return this.consumeInternalRecord(n,e,i)},this[`SUBRULE${r}`]=function(n,i){return this.subruleInternalRecord(n,e,i)},this[`OPTION${r}`]=function(n){return this.optionInternalRecord(n,e)},this[`OR${r}`]=function(n){return this.orInternalRecord(n,e)},this[`MANY${r}`]=function(n){this.manyInternalRecord(e,n)},this[`MANY_SEP${r}`]=function(n){this.manySepFirstInternalRecord(e,n)},this[`AT_LEAST_ONE${r}`]=function(n){this.atLeastOneInternalRecord(e,n)},this[`AT_LEAST_ONE_SEP${r}`]=function(n){this.atLeastOneSepFirstInternalRecord(e,n)}}this.consume=function(e,r,n){return this.consumeInternalRecord(r,e,n)},this.subrule=function(e,r,n){return this.subruleInternalRecord(r,e,n)},this.option=function(e,r){return this.optionInternalRecord(r,e)},this.or=function(e,r){return this.orInternalRecord(r,e)},this.many=function(e,r){this.manyInternalRecord(e,r)},this.atLeastOne=function(e,r){this.atLeastOneInternalRecord(e,r)},this.ACTION=this.ACTION_RECORD,this.BACKTRACK=this.BACKTRACK_RECORD,this.LA=this.LA_RECORD})}disableRecording(){this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",()=>{let e=this;for(let r=0;r<10;r++){let n=r>0?r:"";delete e[`CONSUME${n}`],delete e[`SUBRULE${n}`],delete e[`OPTION${n}`],delete e[`OR${n}`],delete e[`MANY${n}`],delete e[`MANY_SEP${n}`],delete e[`AT_LEAST_ONE${n}`],delete e[`AT_LEAST_ONE_SEP${n}`]}delete e.consume,delete e.subrule,delete e.option,delete e.or,delete e.many,delete e.atLeastOne,delete e.ACTION,delete e.BACKTRACK,delete e.LA})}ACTION_RECORD(e){}BACKTRACK_RECORD(e,r){return()=>!0}LA_RECORD(e){return Ta}topLevelRuleRecord(e,r){try{let n=new Tr({definition:[],name:e});return n.name=e,this.recordingProdStack.push(n),r.call(this),this.recordingProdStack.pop(),n}catch(n){if(n.KNOWN_RECORDER_ERROR!==!0)try{n.message=n.message+`
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`}catch{throw n}throw n}}optionInternalRecord(e,r){return Wc.call(this,ke,e,r)}atLeastOneInternalRecord(e,r){Wc.call(this,Ve,r,e)}atLeastOneSepFirstInternalRecord(e,r){Wc.call(this,Xe,r,e,wC)}manyInternalRecord(e,r){Wc.call(this,pe,r,e)}manySepFirstInternalRecord(e,r){Wc.call(this,Fe,r,e,wC)}orInternalRecord(e,r){return nq.call(this,e,r)}subruleInternalRecord(e,r,n){if(Rd(r),!e||W(e,"ruleName")===!1){let a=new Error(`<SUBRULE${AC(r)}> argument is invalid expecting a Parser method reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw a.KNOWN_RECORDER_ERROR=!0,a}let i=Kn(this.recordingProdStack),o=e.ruleName,s=new Ae({idx:r,nonTerminalName:o,label:n?.LABEL,referencedRule:void 0});return i.definition.push(s),this.outputCst?rq:xd}consumeInternalRecord(e,r,n){if(Rd(r),!ag(e)){let s=new Error(`<CONSUME${AC(r)}> argument is invalid expecting a TokenType reference but got: <${JSON.stringify(e)}>
 inside top level rule: <${this.recordingProdStack[0].name}>`);throw s.KNOWN_RECORDER_ERROR=!0,s}let i=Kn(this.recordingProdStack),o=new ae({idx:r,terminalType:e,label:n?.LABEL});return i.definition.push(o),EC}};function Wc(t,e,r,n=!1){Rd(r);let i=Kn(this.recordingProdStack),o=yr(e)?e:e.DEF,s=new t({definition:[],idx:r});return n&&(s.separator=e.SEP),W(e,"MAX_LOOKAHEAD")&&(s.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(s),o.call(this),i.definition.push(s),this.recordingProdStack.pop(),xd}function nq(t,e){Rd(e);let r=Kn(this.recordingProdStack),n=z(t)===!1,i=n===!1?t:t.DEF,o=new Ue({definition:[],idx:e,ignoreAmbiguities:n&&t.IGNORE_AMBIGUITIES===!0});W(t,"MAX_LOOKAHEAD")&&(o.maxLookahead=t.MAX_LOOKAHEAD);let s=Nc(i,a=>yr(a.GATE));return o.hasPredicates=s,r.definition.push(o),G(i,a=>{let c=new ze({definition:[]});o.definition.push(c),W(a,"IGNORE_AMBIGUITIES")?c.ignoreAmbiguities=a.IGNORE_AMBIGUITIES:W(a,"GATE")&&(c.ignoreAmbiguities=!0),this.recordingProdStack.push(c),a.ALT.call(this),this.recordingProdStack.pop()}),xd}function AC(t){return t===0?"":`${t}`}function Rd(t){if(t<0||t>CC){let e=new Error(`Invalid DSL Method idx value: <${t}>
	Idx value must be a none negative value smaller than ${CC+1}`);throw e.KNOWN_RECORDER_ERROR=!0,e}}var bd=class{initPerformanceTracer(e){if(W(e,"traceInitPerf")){let r=e.traceInitPerf,n=typeof r=="number";this.traceInitMaxIdent=n?r:1/0,this.traceInitPerf=n?r>0:r}else this.traceInitMaxIdent=0,this.traceInitPerf=Rr.traceInitPerf;this.traceInitIndent=-1}TRACE_INIT(e,r){if(this.traceInitPerf===!0){this.traceInitIndent++;let n=new Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(`${n}--> <${e}>`);let{time:i,value:o}=Ic(r),s=i>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&s(`${n}<-- <${e}> time: ${i}ms`),this.traceInitIndent--,o}else return r()}};function _C(t,e){e.forEach(r=>{let n=r.prototype;Object.getOwnPropertyNames(n).forEach(i=>{if(i==="constructor")return;let o=Object.getOwnPropertyDescriptor(n,i);o&&(o.get||o.set)?Object.defineProperty(t.prototype,i,o):t.prototype[i]=r.prototype[i]})})}var Ta=Uo(bn,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(Ta);var Rr=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:bi,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),va=Object.freeze({recoveryValueFunc:()=>{},resyncEnabled:!0}),Lt;(function(t){t[t.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",t[t.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",t[t.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",t[t.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",t[t.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",t[t.LEFT_RECURSION=5]="LEFT_RECURSION",t[t.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",t[t.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",t[t.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",t[t.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",t[t.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",t[t.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",t[t.TOO_MANY_ALTS=12]="TOO_MANY_ALTS",t[t.CUSTOM_LOOKAHEAD_VALIDATION=13]="CUSTOM_LOOKAHEAD_VALIDATION"})(Lt||(Lt={}));function Sd(t=void 0){return function(){return t}}var Bc=class t{static performSelfAnalysis(e){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")}performSelfAnalysis(){this.TRACE_INIT("performSelfAnalysis",()=>{let e;this.selfAnalysisDone=!0;let r=this.className;this.TRACE_INIT("toFastProps",()=>{Pc(this)}),this.TRACE_INIT("Grammar Recording",()=>{try{this.enableRecording(),G(this.definedRulesNames,i=>{let s=this[i].originalGrammarAction,a;this.TRACE_INIT(`${i} Rule`,()=>{a=this.topLevelRuleRecord(i,s)}),this.gastProductionsCache[i]=a})}finally{this.disableRecording()}});let n=[];if(this.TRACE_INIT("Grammar Resolving",()=>{n=pC({rules:De(this.gastProductionsCache)}),this.definitionErrors=this.definitionErrors.concat(n)}),this.TRACE_INIT("Grammar Validations",()=>{if(se(n)&&this.skipValidations===!1){let i=mC({rules:De(this.gastProductionsCache),tokenTypes:De(this.tokensMap),errMsgProvider:Sn,grammarName:r}),o=sC({lookaheadStrategy:this.lookaheadStrategy,rules:De(this.gastProductionsCache),tokenTypes:De(this.tokensMap),grammarName:r});this.definitionErrors=this.definitionErrors.concat(i,o)}}),se(this.definitionErrors)&&(this.recoveryEnabled&&this.TRACE_INIT("computeAllProdsFollows",()=>{let i=xw(De(this.gastProductionsCache));this.resyncFollows=i}),this.TRACE_INIT("ComputeLookaheadFunctions",()=>{var i,o;(o=(i=this.lookaheadStrategy).initialize)===null||o===void 0||o.call(i,{rules:De(this.gastProductionsCache)}),this.preComputeLookaheadFunctions(De(this.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!se(this.definitionErrors))throw e=L(this.definitionErrors,i=>i.message),new Error(`Parser Definition Errors detected:
 ${e.join(`
-------------------------------
`)}`)})}constructor(e,r){this.definitionErrors=[],this.selfAnalysisDone=!1;let n=this;if(n.initErrorHandler(r),n.initLexerAdapter(),n.initLooksAhead(r),n.initRecognizerEngine(e,r),n.initRecoverable(r),n.initTreeBuilder(r),n.initContentAssist(),n.initGastRecorder(r),n.initPerformanceTracer(r),W(r,"ignoredIssues"))throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`);this.skipValidations=W(r,"skipValidations")?r.skipValidations:Rr.skipValidations}};Bc.DEFER_DEFINITION_ERRORS_HANDLING=!1;_C(Bc,[sd,ud,pd,md,gd,hd,yd,Td,vd,bd]);var zc=class extends Bc{constructor(e,r=Rr){let n=Be(r);n.outputCst=!1,super(e,n)}};function jo(t,e,r){return`${t.name}_${e}_${r}`}var to=1,oq=2,NC=4,$C=5;var ba=7,sq=8,aq=9,cq=10,uq=11,IC=12,Vc=class{constructor(e){this.target=e}isEpsilon(){return!1}},Ra=class extends Vc{constructor(e,r){super(e),this.tokenType=r}},Xc=class extends Vc{constructor(e){super(e)}isEpsilon(){return!0}},xa=class extends Vc{constructor(e,r,n){super(e),this.rule=r,this.followState=n}isEpsilon(){return!0}};function PC(t){let e={decisionMap:{},decisionStates:[],ruleToStartState:new Map,ruleToStopState:new Map,states:[]};lq(e,t);let r=t.length;for(let n=0;n<r;n++){let i=t[n],o=Go(e,i,i);o!==void 0&&xq(e,i,o)}return e}function lq(t,e){let r=e.length;for(let n=0;n<r;n++){let i=e[n],o=Gt(t,i,void 0,{type:oq}),s=Gt(t,i,void 0,{type:ba});o.stop=s,t.ruleToStartState.set(i,o),t.ruleToStopState.set(i,s)}}function DC(t,e,r){return r instanceof ae?Eg(t,e,r.terminalType,r):r instanceof Ae?Rq(t,e,r):r instanceof Ue?hq(t,e,r):r instanceof ke?gq(t,e,r):r instanceof pe?fq(t,e,r):r instanceof Fe?dq(t,e,r):r instanceof Ve?pq(t,e,r):r instanceof Xe?mq(t,e,r):Go(t,e,r)}function fq(t,e,r){let n=Gt(t,e,r,{type:$C});ro(t,n);let i=Sa(t,e,n,r,Go(t,e,r));return LC(t,e,r,i)}function dq(t,e,r){let n=Gt(t,e,r,{type:$C});ro(t,n);let i=Sa(t,e,n,r,Go(t,e,r)),o=Eg(t,e,r.separator,r);return LC(t,e,r,i,o)}function pq(t,e,r){let n=Gt(t,e,r,{type:NC});ro(t,n);let i=Sa(t,e,n,r,Go(t,e,r));return OC(t,e,r,i)}function mq(t,e,r){let n=Gt(t,e,r,{type:NC});ro(t,n);let i=Sa(t,e,n,r,Go(t,e,r)),o=Eg(t,e,r.separator,r);return OC(t,e,r,i,o)}function hq(t,e,r){let n=Gt(t,e,r,{type:to});ro(t,n);let i=L(r.definition,s=>DC(t,e,s));return Sa(t,e,n,r,...i)}function gq(t,e,r){let n=Gt(t,e,r,{type:to});ro(t,n);let i=Sa(t,e,n,r,Go(t,e,r));return yq(t,e,r,i)}function Go(t,e,r){let n=qt(L(r.definition,i=>DC(t,e,i)),i=>i!==void 0);return n.length===1?n[0]:n.length===0?void 0:vq(t,n)}function OC(t,e,r,n,i){let o=n.left,s=n.right,a=Gt(t,e,r,{type:uq});ro(t,a);let c=Gt(t,e,r,{type:IC});return o.loopback=a,c.loopback=a,t.decisionMap[jo(e,i?"RepetitionMandatoryWithSeparator":"RepetitionMandatory",r.idx)]=a,$t(s,a),i===void 0?($t(a,o),$t(a,c)):($t(a,c),$t(a,i.left),$t(i.right,o)),{left:o,right:c}}function LC(t,e,r,n,i){let o=n.left,s=n.right,a=Gt(t,e,r,{type:cq});ro(t,a);let c=Gt(t,e,r,{type:IC}),u=Gt(t,e,r,{type:aq});return a.loopback=u,c.loopback=u,$t(a,o),$t(a,c),$t(s,u),i!==void 0?($t(u,c),$t(u,i.left),$t(i.right,o)):$t(u,a),t.decisionMap[jo(e,i?"RepetitionWithSeparator":"Repetition",r.idx)]=a,{left:a,right:c}}function yq(t,e,r,n){let i=n.left,o=n.right;return $t(i,o),t.decisionMap[jo(e,"Option",r.idx)]=i,n}function ro(t,e){return t.decisionStates.push(e),e.decision=t.decisionStates.length-1,e.decision}function Sa(t,e,r,n,...i){let o=Gt(t,e,n,{type:sq,start:r});r.end=o;for(let a of i)a!==void 0?($t(r,a.left),$t(a.right,o)):$t(r,o);let s={left:r,right:o};return t.decisionMap[jo(e,Tq(n),n.idx)]=r,s}function Tq(t){if(t instanceof Ue)return"Alternation";if(t instanceof ke)return"Option";if(t instanceof pe)return"Repetition";if(t instanceof Fe)return"RepetitionWithSeparator";if(t instanceof Ve)return"RepetitionMandatory";if(t instanceof Xe)return"RepetitionMandatoryWithSeparator";throw new Error("Invalid production type encountered")}function vq(t,e){let r=e.length;for(let o=0;o<r-1;o++){let s=e[o],a;s.left.transitions.length===1&&(a=s.left.transitions[0]);let c=a instanceof xa,u=a,l=e[o+1].left;s.left.type===to&&s.right.type===to&&a!==void 0&&(c&&u.followState===s.right||a.target===s.right)?(c?u.followState=l:a.target=l,bq(t,s.right)):$t(s.right,l)}let n=e[0],i=e[r-1];return{left:n.left,right:i.right}}function Eg(t,e,r,n){let i=Gt(t,e,n,{type:to}),o=Gt(t,e,n,{type:to});return _g(i,new Ra(o,r)),{left:i,right:o}}function Rq(t,e,r){let n=r.referencedRule,i=t.ruleToStartState.get(n),o=Gt(t,e,r,{type:to}),s=Gt(t,e,r,{type:to}),a=new xa(i,n,s);return _g(o,a),{left:o,right:s}}function xq(t,e,r){let n=t.ruleToStartState.get(e);$t(n,r.left);let i=t.ruleToStopState.get(e);return $t(r.right,i),{left:n,right:i}}function $t(t,e){let r=new Xc(e);_g(t,r)}function Gt(t,e,r,n){let i=Object.assign({atn:t,production:r,epsilonOnlyTransitions:!1,rule:e,transitions:[],nextTokenWithinRule:[],stateNumber:t.states.length},n);return t.states.push(i),i}function _g(t,e){t.transitions.length===0&&(t.epsilonOnlyTransitions=e.isEpsilon()),t.transitions.push(e)}function bq(t,e){t.states.splice(t.states.indexOf(e),1)}var Yc={},wa=class{constructor(){this.map={},this.configs=[]}get size(){return this.configs.length}finalize(){this.map={}}add(e){let r=Ng(e);r in this.map||(this.map[r]=this.configs.length,this.configs.push(e))}get elements(){return this.configs}get alts(){return L(this.configs,e=>e.alt)}get key(){let e="";for(let r in this.map)e+=r+":";return e}};function Ng(t,e=!0){return`${e?`a${t.alt}`:""}s${t.state.stateNumber}:${t.stack.map(r=>r.stateNumber.toString()).join("_")}`}function Sq(t,e){let r={};return n=>{let i=n.toString(),o=r[i];return o!==void 0||(o={atnStartState:t,decision:e,states:{}},r[i]=o),o}}var wd=class{constructor(){this.predicates=[]}is(e){return e>=this.predicates.length||this.predicates[e]}set(e,r){this.predicates[e]=r}toString(){let e="",r=this.predicates.length;for(let n=0;n<r;n++)e+=this.predicates[n]===!0?"1":"0";return e}},MC=new wd,Jc=class extends Si{constructor(e){var r;super(),this.logging=(r=e?.logging)!==null&&r!==void 0?r:n=>console.log(n)}initialize(e){this.atn=PC(e.rules),this.dfas=wq(this.atn)}validateAmbiguousAlternationAlternatives(){return[]}validateEmptyOrAlternatives(){return[]}buildLookaheadForAlternation(e){let{prodOccurrence:r,rule:n,hasPredicates:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=jo(n,"Alternation",r),l=this.atn.decisionMap[c].decision,f=L(nd({maxLookahead:1,occurrence:r,prodType:"Alternation",rule:n}),m=>L(m,T=>T[0]));if(FC(f,!1)&&!o){let m=ut(f,(T,S,C)=>(G(S,N=>{N&&(T[N.tokenTypeIdx]=C,G(N.categoryMatches,A=>{T[A]=C}))}),T),{});return i?function(T){var S;let C=this.LA(1),N=m[C.tokenTypeIdx];if(T!==void 0&&N!==void 0){let A=(S=T[N])===null||S===void 0?void 0:S.GATE;if(A!==void 0&&A.call(this)===!1)return}return N}:function(){let T=this.LA(1);return m[T.tokenTypeIdx]}}else return i?function(m){let T=new wd,S=m===void 0?0:m.length;for(let N=0;N<S;N++){let A=m?.[N].GATE;T.set(N,A===void 0||A.call(this))}let C=$g.call(this,s,l,T,a);return typeof C=="number"?C:void 0}:function(){let m=$g.call(this,s,l,MC,a);return typeof m=="number"?m:void 0}}buildLookaheadForOptional(e){let{prodOccurrence:r,rule:n,prodType:i,dynamicTokensEnabled:o}=e,s=this.dfas,a=this.logging,c=jo(n,i,r),l=this.atn.decisionMap[c].decision,f=L(nd({maxLookahead:1,occurrence:r,prodType:i,rule:n}),m=>L(m,T=>T[0]));if(FC(f)&&f[0][0]&&!o){let m=f[0],T=Tt(m);if(T.length===1&&se(T[0].categoryMatches)){let C=T[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===C}}else{let S=ut(T,(C,N)=>(N!==void 0&&(C[N.tokenTypeIdx]=!0,G(N.categoryMatches,A=>{C[A]=!0})),C),{});return function(){let C=this.LA(1);return S[C.tokenTypeIdx]===!0}}}return function(){let m=$g.call(this,s,l,MC,a);return typeof m=="object"?!1:m===0}}};function FC(t,e=!0){let r=new Set;for(let n of t){let i=new Set;for(let o of n){if(o===void 0){if(e)break;return!1}let s=[o.tokenTypeIdx].concat(o.categoryMatches);for(let a of s)if(r.has(a)){if(!i.has(a))return!1}else r.add(a),i.add(a)}}return!0}function wq(t){let e=t.decisionStates.length,r=Array(e);for(let n=0;n<e;n++)r[n]=Sq(t.decisionStates[n],n);return r}function $g(t,e,r,n){let i=t[e](r),o=i.start;if(o===void 0){let a=Oq(i.atnStartState);o=jC(i,qC(a)),i.start=o}return Cq.apply(this,[i,o,r,n])}function Cq(t,e,r,n){let i=e,o=1,s=[],a=this.LA(o++);for(;;){let c=$q(i,a);if(c===void 0&&(c=Aq.apply(this,[t,i,a,o,r,n])),c===Yc)return Nq(s,i,a);if(c.isAcceptState===!0)return c.prediction;i=c,s.push(a),a=this.LA(o++)}}function Aq(t,e,r,n,i,o){let s=Iq(e.configs,r,i);if(s.size===0)return UC(t,e,r,Yc),Yc;let a=qC(s),c=Dq(s,i);if(c!==void 0)a.isAcceptState=!0,a.prediction=c,a.configs.uniqueAlt=c;else if(Uq(s)){let u=dw(s.alts);a.isAcceptState=!0,a.prediction=u,a.configs.uniqueAlt=u,kq.apply(this,[t,n,s.alts,o])}return a=UC(t,e,r,a),a}function kq(t,e,r,n){let i=[];for(let u=1;u<=e;u++)i.push(this.LA(u).tokenType);let o=t.atnStartState,s=o.rule,a=o.production,c=Eq({topLevelRule:s,ambiguityIndices:r,production:a,prefixPath:i});n(c)}function Eq(t){let e=L(t.prefixPath,i=>xi(i)).join(", "),r=t.production.idx===0?"":t.production.idx,n=`Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${_q(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`;return n=n+`See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`,n}function _q(t){if(t instanceof Ae)return"SUBRULE";if(t instanceof ke)return"OPTION";if(t instanceof Ue)return"OR";if(t instanceof Ve)return"AT_LEAST_ONE";if(t instanceof Xe)return"AT_LEAST_ONE_SEP";if(t instanceof Fe)return"MANY_SEP";if(t instanceof pe)return"MANY";if(t instanceof ae)return"CONSUME";throw Error("non exhaustive match")}function Nq(t,e,r){let n=Zt(e.configs.elements,o=>o.state.transitions),i=vw(n.filter(o=>o instanceof Ra).map(o=>o.tokenType),o=>o.tokenTypeIdx);return{actualToken:r,possibleTokenTypes:i,tokenPath:t}}function $q(t,e){return t.edges[e.tokenTypeIdx]}function Iq(t,e,r){let n=new wa,i=[];for(let s of t.elements){if(r.is(s.alt)===!1)continue;if(s.state.type===ba){i.push(s);continue}let a=s.state.transitions.length;for(let c=0;c<a;c++){let u=s.state.transitions[c],l=Pq(u,e);l!==void 0&&n.add({state:l,alt:s.alt,stack:s.stack})}}let o;if(i.length===0&&n.size===1&&(o=n),o===void 0){o=new wa;for(let s of n.elements)Cd(s,o)}if(i.length>0&&!Mq(o))for(let s of i)o.add(s);return o}function Pq(t,e){if(t instanceof Ra&&Lc(e,t.tokenType))return t.target}function Dq(t,e){let r;for(let n of t.elements)if(e.is(n.alt)===!0){if(r===void 0)r=n.alt;else if(r!==n.alt)return}return r}function qC(t){return{configs:t,edges:{},isAcceptState:!1,prediction:-1}}function UC(t,e,r,n){return n=jC(t,n),e.edges[r.tokenTypeIdx]=n,n}function jC(t,e){if(e===Yc)return e;let r=e.configs.key,n=t.states[r];return n!==void 0?n:(e.configs.finalize(),t.states[r]=e,e)}function Oq(t){let e=new wa,r=t.transitions.length;for(let n=0;n<r;n++){let o={state:t.transitions[n].target,alt:n,stack:[]};Cd(o,e)}return e}function Cd(t,e){let r=t.state;if(r.type===ba){if(t.stack.length>0){let i=[...t.stack],s={state:i.pop(),alt:t.alt,stack:i};Cd(s,e)}else e.add(t);return}r.epsilonOnlyTransitions||e.add(t);let n=r.transitions.length;for(let i=0;i<n;i++){let o=r.transitions[i],s=Lq(t,o);s!==void 0&&Cd(s,e)}}function Lq(t,e){if(e instanceof Xc)return{state:e.target,alt:t.alt,stack:t.stack};if(e instanceof xa){let r=[...t.stack,e.followState];return{state:e.target,alt:t.alt,stack:r}}}function Mq(t){for(let e of t.elements)if(e.state.type===ba)return!0;return!1}function Fq(t){for(let e of t.elements)if(e.state.type!==ba)return!1;return!0}function Uq(t){if(Fq(t))return!0;let e=qq(t.elements);return jq(e)&&!Gq(e)}function qq(t){let e=new Map;for(let r of t){let n=Ng(r,!1),i=e.get(n);i===void 0&&(i={},e.set(n,i)),i[r.alt]=!0}return e}function jq(t){for(let e of Array.from(t.values()))if(Object.keys(e).length>1)return!0;return!1}function Gq(t){for(let e of Array.from(t.values()))if(Object.keys(e).length===1)return!0;return!1}var Ig=de(ho(),1);var Ad=class{constructor(){this.nodeStack=[]}get current(){return this.nodeStack[this.nodeStack.length-1]}buildRootNode(e){return this.rootNode=new Dg(e),this.nodeStack=[this.rootNode],this.rootNode}buildCompositeNode(e){let r=new _d;return r.grammarSource=e,r.root=this.rootNode,this.current.content.push(r),this.nodeStack.push(r),r}buildLeafNode(e,r){let n=new Ed(e.startOffset,e.image.length,tc(e),e.tokenType,!1);return n.grammarSource=r,n.root=this.rootNode,this.current.content.push(n),n}removeNode(e){let r=e.container;if(r){let n=r.content.indexOf(e);n>=0&&r.content.splice(n,1)}}construct(e){let r=this.current;typeof e.$type=="string"&&(this.current.astNode=e),e.$cstNode=r;let n=this.nodeStack.pop();n?.content.length===0&&this.removeNode(n)}addHiddenTokens(e){for(let r of e){let n=new Ed(r.startOffset,r.image.length,tc(r),r.tokenType,!0);n.root=this.rootNode,this.addHiddenToken(this.rootNode,n)}}addHiddenToken(e,r){let{offset:n,end:i}=r;for(let o=0;o<e.content.length;o++){let s=e.content[o],{offset:a,end:c}=s;if($n(s)&&n>a&&i<c){this.addHiddenToken(s,r);return}else if(i<=a){e.content.splice(o,0,r);return}}e.content.push(r)}},kd=class{get parent(){return this.container}get feature(){return this.grammarSource}get hidden(){return!1}get astNode(){var e,r;let n=typeof((e=this._astNode)===null||e===void 0?void 0:e.$type)=="string"?this._astNode:(r=this.container)===null||r===void 0?void 0:r.astNode;if(!n)throw new Error("This node has no associated AST element");return n}set astNode(e){this._astNode=e}get element(){return this.astNode}get text(){return this.root.fullText.substring(this.offset,this.end)}},Ed=class extends kd{get offset(){return this._offset}get length(){return this._length}get end(){return this._offset+this._length}get hidden(){return this._hidden}get tokenType(){return this._tokenType}get range(){return this._range}constructor(e,r,n,i,o=!1){super(),this._hidden=o,this._offset=e,this._tokenType=i,this._length=r,this._range=n}},_d=class extends kd{constructor(){super(...arguments),this.content=new Pg(this)}get children(){return this.content}get offset(){var e,r;return(r=(e=this.firstNonHiddenNode)===null||e===void 0?void 0:e.offset)!==null&&r!==void 0?r:0}get length(){return this.end-this.offset}get end(){var e,r;return(r=(e=this.lastNonHiddenNode)===null||e===void 0?void 0:e.end)!==null&&r!==void 0?r:0}get range(){let e=this.firstNonHiddenNode,r=this.lastNonHiddenNode;if(e&&r){if(this._rangeCache===void 0){let{range:n}=e,{range:i}=r;this._rangeCache={start:n.start,end:i.end.line<n.start.line?n.start:i.end}}return this._rangeCache}else return{start:Ig.Position.create(0,0),end:Ig.Position.create(0,0)}}get firstNonHiddenNode(){for(let e of this.content)if(!e.hidden)return e;return this.content[0]}get lastNonHiddenNode(){for(let e=this.content.length-1;e>=0;e--){let r=this.content[e];if(!r.hidden)return r}return this.content[this.content.length-1]}},Pg=class t extends Array{constructor(e){super(),this.parent=e,Object.setPrototypeOf(this,t.prototype)}push(...e){return this.addParents(e),super.push(...e)}unshift(...e){return this.addParents(e),super.unshift(...e)}splice(e,r,...n){return this.addParents(n),super.splice(e,r,...n)}addParents(e){for(let r of e)r.container=this.parent}},Dg=class extends _d{get text(){return this._text.substring(this.offset,this.end)}get fullText(){return this._text}constructor(e){super(),this._text="",this._text=e??""}};var Lg=Symbol("Datatype");function Og(t){return t.$type===Lg}var GC="\u200B",HC=t=>t.endsWith(GC)?t:t+GC,Nd=class{constructor(e){this._unorderedGroups=new Map,this.lexer=e.parser.Lexer;let r=this.lexer.definition;this.wrapper=new Fg(r,Object.assign(Object.assign({},e.parser.ParserConfig),{errorMessageProvider:e.parser.ParserErrorMessageProvider}))}alternatives(e,r){this.wrapper.wrapOr(e,r)}optional(e,r){this.wrapper.wrapOption(e,r)}many(e,r){this.wrapper.wrapMany(e,r)}atLeastOne(e,r){this.wrapper.wrapAtLeastOne(e,r)}isRecording(){return this.wrapper.IS_RECORDING}get unorderedGroups(){return this._unorderedGroups}getRuleStack(){return this.wrapper.RULE_STACK}finalize(){this.wrapper.wrapSelfAnalysis()}},$d=class extends Nd{get current(){return this.stack[this.stack.length-1]}constructor(e){super(e),this.nodeBuilder=new Ad,this.stack=[],this.assignmentMap=new Map,this.linker=e.references.Linker,this.converter=e.parser.ValueConverter,this.astReflection=e.shared.AstReflection}rule(e,r){let n=e.fragment?void 0:Ur(e)?Lg:Tn(e),i=this.wrapper.DEFINE_RULE(HC(e.name),this.startImplementation(n,r).bind(this));return e.entry&&(this.mainRule=i),i}parse(e){this.nodeBuilder.buildRootNode(e);let r=this.lexer.tokenize(e);this.wrapper.input=r.tokens;let n=this.mainRule.call(this.wrapper,{});return this.nodeBuilder.addHiddenTokens(r.hidden),this.unorderedGroups.clear(),{value:n,lexerErrors:r.errors,parserErrors:this.wrapper.errors}}startImplementation(e,r){return n=>{if(!this.isRecording()){let o={$type:e};this.stack.push(o),e===Lg&&(o.value="")}let i;try{i=r(n)}catch{i=void 0}return!this.isRecording()&&i===void 0&&(i=this.construct()),i}}consume(e,r,n){let i=this.wrapper.wrapConsume(e,r);if(!this.isRecording()&&!i.isInsertedInRecovery){let o=this.nodeBuilder.buildLeafNode(i,n),{assignment:s,isCrossRef:a}=this.getAssignment(n),c=this.current;if(s){let u=pt(n)?i.image:this.converter.convert(i.image,o);this.assign(s.operator,s.feature,u,o,a)}else if(Og(c)){let u=i.image;pt(n)||(u=this.converter.convert(u,o).toString()),c.value+=u}}}subrule(e,r,n,i){let o;this.isRecording()||(o=this.nodeBuilder.buildCompositeNode(n));let s=this.wrapper.wrapSubrule(e,r,i);!this.isRecording()&&o&&o.length>0&&this.performSubruleAssignment(s,n,o)}performSubruleAssignment(e,r,n){let{assignment:i,isCrossRef:o}=this.getAssignment(r);if(i)this.assign(i.operator,i.feature,e,n,o);else if(!i){let s=this.current;if(Og(s))s.value+=e.toString();else{let a=e.$type,c=this.assignWithoutOverride(e,s);a&&(c.$type=a);let u=c;this.stack.pop(),this.stack.push(u)}}}action(e,r){if(!this.isRecording()){let n=this.current;if(!n.$cstNode&&r.feature&&r.operator){n=this.construct(!1);let o=n.$cstNode.feature;this.nodeBuilder.buildCompositeNode(o)}let i={$type:e};this.stack.pop(),this.stack.push(i),r.feature&&r.operator&&this.assign(r.operator,r.feature,n,n.$cstNode,!1)}}construct(e=!0){if(this.isRecording())return;let r=this.current;return eR(r),this.nodeBuilder.construct(r),e&&this.stack.pop(),Og(r)?this.converter.convert(r.value,r.$cstNode):(this.assignMandatoryProperties(r),r)}assignMandatoryProperties(e){let r=this.astReflection.getTypeMetaData(e.$type);for(let n of r.mandatory){let i=e[n.name];n.type==="array"&&!Array.isArray(i)?e[n.name]=[]:n.type==="boolean"&&i===void 0&&(e[n.name]=!1)}}getAssignment(e){if(!this.assignmentMap.has(e)){let r=Pe(e,xe);this.assignmentMap.set(e,{assignment:r,isCrossRef:r?Vt(r.terminal):!1})}return this.assignmentMap.get(e)}assign(e,r,n,i,o){let s=this.current,a;switch(o&&typeof n=="string"?a=this.linker.buildReference(s,r,i,n):a=n,e){case"=":{s[r]=a;break}case"?=":{s[r]=!0;break}case"+=":Array.isArray(s[r])||(s[r]=[]),s[r].push(a)}}assignWithoutOverride(e,r){for(let[n,i]of Object.entries(r)){let o=e[n];o===void 0?e[n]=i:Array.isArray(o)&&Array.isArray(i)&&(i.push(...o),e[n]=i)}return e}get definitionErrors(){return this.wrapper.definitionErrors}},Mg=class{buildMismatchTokenMessage(e){return bi.buildMismatchTokenMessage(e)}buildNotAllInputParsedMessage(e){return bi.buildNotAllInputParsedMessage(e)}buildNoViableAltMessage(e){return bi.buildNoViableAltMessage(e)}buildEarlyExitMessage(e){return bi.buildEarlyExitMessage(e)}},Qc=class extends Mg{buildMismatchTokenMessage({expected:e,actual:r}){return`Expecting ${e.LABEL?"`"+e.LABEL+"`":e.name.endsWith(":KW")?`keyword '${e.name.substring(0,e.name.length-3)}'`:`token of type '${e.name}'`} but found \`${r.image}\`.`}buildNotAllInputParsedMessage({firstRedundant:e}){return`Expecting end of file but found \`${e.image}\`.`}},Id=class extends Nd{constructor(){super(...arguments),this.tokens=[],this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}action(){}construct(){}parse(e){this.resetState();let r=this.lexer.tokenize(e);return this.tokens=r.tokens,this.wrapper.input=[...this.tokens],this.mainRule.call(this.wrapper,{}),this.unorderedGroups.clear(),{tokens:this.tokens,elementStack:[...this.lastElementStack],tokenIndex:this.nextTokenIndex}}rule(e,r){let n=this.wrapper.DEFINE_RULE(HC(e.name),this.startImplementation(r).bind(this));return e.entry&&(this.mainRule=n),n}resetState(){this.elementStack=[],this.lastElementStack=[],this.nextTokenIndex=0,this.stackSize=0}startImplementation(e){return r=>{let n=this.keepStackSize();try{e(r)}finally{this.resetStackSize(n)}}}removeUnexpectedElements(){this.elementStack.splice(this.stackSize)}keepStackSize(){let e=this.elementStack.length;return this.stackSize=e,e}resetStackSize(e){this.removeUnexpectedElements(),this.stackSize=e}consume(e,r,n){this.wrapper.wrapConsume(e,r),this.isRecording()||(this.lastElementStack=[...this.elementStack,n],this.nextTokenIndex=this.currIdx+1)}subrule(e,r,n,i){this.before(n),this.wrapper.wrapSubrule(e,r,i),this.after(n)}before(e){this.isRecording()||this.elementStack.push(e)}after(e){if(!this.isRecording()){let r=this.elementStack.lastIndexOf(e);r>=0&&this.elementStack.splice(r)}}get currIdx(){return this.wrapper.currIdx}},Hq={recoveryEnabled:!0,nodeLocationTracking:"full",skipValidations:!0,errorMessageProvider:new Qc},Fg=class extends zc{constructor(e,r){let n=r&&"maxLookahead"in r;super(e,Object.assign(Object.assign(Object.assign({},Hq),{lookaheadStrategy:n?new Si({maxLookahead:r.maxLookahead}):new Jc}),r))}get IS_RECORDING(){return this.RECORDING_PHASE}DEFINE_RULE(e,r){return this.RULE(e,r)}wrapSelfAnalysis(){this.performSelfAnalysis()}wrapConsume(e,r){return this.consume(e,r)}wrapSubrule(e,r,n){return this.subrule(e,r,{ARGS:[n]})}wrapOr(e,r){this.or(e,r)}wrapOption(e,r){this.option(e,r)}wrapMany(e,r){this.many(e,r)}wrapAtLeastOne(e,r){this.atLeastOne(e,r)}};var Zc=class extends Error{constructor(e,r){super(e?`${r} at ${e.range.start.line}:${e.range.start.character}`:r)}};function Pd(t){throw new Error("Error! The input value was not handled.")}function Od(t,e,r){return Kq({parser:e,tokens:r,rules:new Map,ruleNames:new Map},t),e}function Kq(t,e){let r=Ss(e,!1),n=ie(e.rules).filter(K).filter(i=>r.has(i));for(let i of n){let o=Object.assign(Object.assign({},t),{consume:1,optional:1,subrule:1,many:1,or:1});o.rules.set(i.name,t.parser.rule(i,Ho(o,i.definition)))}}function Ho(t,e,r=!1){let n;if(pt(e))n=Jq(t,e);else if($e(e))n=Wq(t,e);else if(xe(e))n=Ho(t,e.terminal);else if(Vt(e))n=KC(t,e);else if(Ie(e))n=Bq(t,e);else if(Dr(e))n=Vq(t,e);else if(Or(e))n=Xq(t,e);else if(Ft(e))n=Yq(t,e);else throw new Zc(e.$cstNode,`Unexpected element type: ${e.$type}`);return WC(t,r?void 0:Dd(e),n,e.cardinality)}function Wq(t,e){let r=Tn(e);return()=>t.parser.action(r,e)}function Bq(t,e){let r=e.rule.ref;if(K(r)){let n=t.subrule++,i=e.arguments.length>0?zq(r,e.arguments):()=>({});return o=>t.parser.subrule(n,BC(t,r),e,i(o))}else if(we(r)){let n=t.consume++,i=Ug(t,r.name);return()=>t.parser.consume(n,i,e)}else if(r)Pd(r);else throw new Zc(e.$cstNode,`Undefined rule type: ${e.$type}`)}function zq(t,e){let r=e.map(n=>wi(n.value));return n=>{let i={};for(let o=0;o<r.length;o++){let s=t.parameters[o],a=r[o];i[s.name]=a(n)}return i}}function wi(t){if(vv(t)){let e=wi(t.left),r=wi(t.right);return n=>e(n)||r(n)}else if(yv(t)){let e=wi(t.left),r=wi(t.right);return n=>e(n)&&r(n)}else if(wv(t)){let e=wi(t.value);return r=>!e(r)}else if(ds(t)){let e=t.parameter.ref.name;return r=>r!==void 0&&r[e]===!0}else if(bv(t)){let e=!!t.true;return()=>e}Pd(t)}function Vq(t,e){if(e.elements.length===1)return Ho(t,e.elements[0]);{let r=[];for(let i of e.elements){let o={ALT:Ho(t,i,!0)},s=Dd(i);s&&(o.GATE=wi(s)),r.push(o)}let n=t.or++;return i=>t.parser.alternatives(n,r.map(o=>{let s={ALT:()=>o.ALT(i)},a=o.GATE;return a&&(s.GATE=()=>a(i)),s}))}}function Xq(t,e){if(e.elements.length===1)return Ho(t,e.elements[0]);let r=[];for(let a of e.elements){let c={ALT:Ho(t,a,!0)},u=Dd(a);u&&(c.GATE=wi(u)),r.push(c)}let n=t.or++,i=(a,c)=>{let u=c.getRuleStack().join("-");return`uGroup_${a}_${u}`},o=a=>t.parser.alternatives(n,r.map((c,u)=>{let l={ALT:()=>!0},f=t.parser;l.ALT=()=>{if(c.ALT(a),!f.isRecording()){let T=i(n,f);f.unorderedGroups.get(T)||f.unorderedGroups.set(T,[]);let S=f.unorderedGroups.get(T);typeof S?.[u]>"u"&&(S[u]=!0)}};let m=c.GATE;return m?l.GATE=()=>m(a):l.GATE=()=>{let T=f.unorderedGroups.get(i(n,f));return!T?.[u]},l})),s=WC(t,Dd(e),o,"*");return a=>{s(a),t.parser.isRecording()||t.parser.unorderedGroups.delete(i(n,t.parser))}}function Yq(t,e){let r=e.elements.map(n=>Ho(t,n));return n=>r.forEach(i=>i(n))}function Dd(t){if(Ft(t))return t.guardCondition}function KC(t,e,r=e.terminal){if(r)if(Ie(r)&&K(r.rule.ref)){let n=t.subrule++;return i=>t.parser.subrule(n,BC(t,r.rule.ref),e,i)}else if(Ie(r)&&we(r.rule.ref)){let n=t.consume++,i=Ug(t,r.rule.ref.name);return()=>t.parser.consume(n,i,e)}else if(pt(r)){let n=t.consume++,i=Ug(t,r.value);return()=>t.parser.consume(n,i,e)}else throw new Error("Could not build cross reference parser");else{if(!e.type.ref)throw new Error("Could not resolve reference to type: "+e.type.$refText);let n=vc(e.type.ref),i=n?.terminal;if(!i)throw new Error("Could not find name assignment for type: "+Tn(e.type.ref));return KC(t,e,i)}}function Jq(t,e){let r=t.consume++,n=t.tokens[e.value];if(!n)throw new Error("Could not find token for keyword: "+e.value);return()=>t.parser.consume(r,n,e)}function WC(t,e,r,n){let i=e&&wi(e);if(!n)if(i){let o=t.or++;return s=>t.parser.alternatives(o,[{ALT:()=>r(s),GATE:()=>i(s)},{ALT:Sd(),GATE:()=>!i(s)}])}else return r;if(n==="*"){let o=t.many++;return s=>t.parser.many(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else if(n==="+"){let o=t.many++;if(i){let s=t.or++;return a=>t.parser.alternatives(s,[{ALT:()=>t.parser.atLeastOne(o,{DEF:()=>r(a)}),GATE:()=>i(a)},{ALT:Sd(),GATE:()=>!i(a)}])}else return s=>t.parser.atLeastOne(o,{DEF:()=>r(s)})}else if(n==="?"){let o=t.optional++;return s=>t.parser.optional(o,{DEF:()=>r(s),GATE:i?()=>i(s):void 0})}else Pd(n)}function BC(t,e){let r=Qq(t,e),n=t.rules.get(r);if(!n)throw new Error(`Rule "${r}" not found."`);return n}function Qq(t,e){if(K(e))return e.name;if(t.ruleNames.has(e))return t.ruleNames.get(e);{let r=e,n=r.$container,i=e.$type;for(;!K(n);)(Ft(n)||Dr(n)||Or(n))&&(i=n.elements.indexOf(r).toString()+":"+i),r=n,n=n.$container;return i=n.name+":"+i,t.ruleNames.set(e,i),i}}function Ug(t,e){let r=t.tokens[e];if(!r)throw new Error(`Token "${e}" not found."`);return r}function zC(t){let e=t.Grammar,r=t.parser.Lexer,n=new Id(t);return Od(e,n,r.definition),n.finalize(),n}function VC(t){let e=Zq(t);return e.finalize(),e}function Zq(t){let e=t.Grammar,r=t.parser.Lexer,n=new $d(t);return Od(e,n,r.definition)}var Ld=class{buildTokens(e,r){let n=ie(Ss(e,!1)),i=this.buildTerminalTokens(n),o=this.buildKeywordTokens(n,i,r);return i.forEach(s=>{let a=s.PATTERN;typeof a=="object"&&a&&"test"in a&&Th(a)?o.unshift(s):o.push(s)}),o}buildTerminalTokens(e){return e.filter(we).filter(r=>!r.fragment).map(r=>this.buildTerminalToken(r)).toArray()}buildTerminalToken(e){let r=Qr(e),n=r.flags.includes("u")?this.regexPatternFunction(r):r,i={name:e.name,PATTERN:n,LINE_BREAKS:!0};return e.hidden&&(i.GROUP=Th(r)?ht.SKIPPED:"hidden"),i}regexPatternFunction(e){let r=new RegExp(e,e.flags+"y");return(n,i)=>(r.lastIndex=i,r.exec(n))}buildKeywordTokens(e,r,n){return e.filter(K).flatMap(i=>Ze(i).filter(pt)).distinct(i=>i.value).toArray().sort((i,o)=>o.value.length-i.value.length).map(i=>this.buildKeywordToken(i,r,!!n?.caseInsensitive))}buildKeywordToken(e,r,n){return{name:e.value,PATTERN:this.buildKeywordPattern(e,n),LONGER_ALT:this.findLongerAlt(e,r)}}buildKeywordPattern(e,r){return r?new RegExp(bR(e.value)):e.value}findLongerAlt(e,r){return r.reduce((n,i)=>{let o=i?.PATTERN;return o?.source&&SR("^"+o.source+"$",e.value)&&n.push(i),n},[])}};var Md=class{convert(e,r){let n=r.grammarSource;if(Vt(n)&&(n=Ml(n)),Ie(n)){let i=n.rule.ref;if(!i)throw new Error("This cst node was not parsed by a rule.");return this.runConverter(i,e,r)}return e}runConverter(e,r,n){var i;switch(e.name.toUpperCase()){case"INT":return nj(r);case"STRING":return ej(r);case"ID":return rj(r)}switch((i=$o(e))===null||i===void 0?void 0:i.toLowerCase()){case"number":return sj(r);case"boolean":return aj(r);case"bigint":return ij(r);case"date":return oj(r);default:return r}}};function ej(t){let e="";for(let r=1;r<t.length-1;r++){let n=t.charAt(r);if(n==="\\"){let i=t.charAt(++r);e+=tj(i)}else e+=n}return e}function tj(t){switch(t){case"b":return"\b";case"f":return"\f";case"n":return`
`;case"r":return"\r";case"t":return"	";case"v":return"\v";case"0":return"\0";default:return t}}function rj(t){return t.charAt(0)==="^"?t.substring(1):t}function nj(t){return parseInt(t)}function ij(t){return BigInt(t)}function oj(t){return new Date(t)}function sj(t){return Number(t)}function aj(t){return t.toLowerCase()==="true"}var XC=de(Ne(),1);var Fd=class{constructor(e){this.reflection=e.shared.AstReflection,this.langiumDocuments=()=>e.shared.workspace.LangiumDocuments,this.scopeProvider=e.references.ScopeProvider,this.astNodeLocator=e.workspace.AstNodeLocator}async link(e,r=XC.CancellationToken.None){for(let n of si(e.parseResult.value))await et(r),dl(n).forEach(i=>this.doLink(i,e))}doLink(e,r){let n=e.reference;if(n._ref===void 0)try{let i=this.getCandidate(e);if(as(i))n._ref=i;else if(n._nodeDescription=i,this.langiumDocuments().hasDocument(i.documentUri)){let o=this.loadAstNode(i);n._ref=o??this.createLinkingError(e,i)}}catch(i){n._ref=Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${n.$refText}': ${i}`})}r.references.push(n)}unlink(e){for(let r of e.references)delete r._ref,delete r._nodeDescription;e.references=[]}getCandidate(e){let n=this.scopeProvider.getScope(e).getElement(e.reference.$refText);return n??this.createLinkingError(e)}buildReference(e,r,n,i){let o=this,s={$refNode:n,$refText:i,get ref(){var a;if(Et(this._ref))return this._ref;if(rv(this._nodeDescription)){let c=o.loadAstNode(this._nodeDescription);this._ref=c??o.createLinkingError({reference:s,container:e,property:r},this._nodeDescription)}else if(this._ref===void 0){let c=o.getLinkedNode({reference:s,container:e,property:r});if(c.error&&ne(e).state<He.ComputedScopes)return;this._ref=(a=c.node)!==null&&a!==void 0?a:c.error,this._nodeDescription=c.descr}return Et(this._ref)?this._ref:void 0},get $nodeDescription(){return this._nodeDescription},get error(){return as(this._ref)?this._ref:void 0}};return s}getLinkedNode(e){try{let r=this.getCandidate(e);if(as(r))return{error:r};let n=this.loadAstNode(r);return n?{node:n,descr:r}:{descr:r,error:this.createLinkingError(e,r)}}catch(r){return{error:Object.assign(Object.assign({},e),{message:`An error occurred while resolving reference to '${e.reference.$refText}': ${r}`})}}}loadAstNode(e){if(e.node)return e.node;let r=this.langiumDocuments().getOrCreateDocument(e.documentUri);return this.astNodeLocator.getAstNode(r.parseResult.value,e.path)}createLinkingError(e,r){let n=ne(e.container);n.state<He.ComputedScopes&&console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`);let i=this.reflection.getReferenceType(e);return Object.assign(Object.assign({},e),{message:`Could not resolve reference to ${i} named '${e.reference.$refText}'.`,targetDescription:r})}};function JC(t){return typeof t.$comment=="string"}function YC(t){return typeof t=="object"&&!!t&&("$ref"in t||"$error"in t)}var Ud=class{constructor(e){this.ignoreProperties=new Set(["$container","$containerProperty","$containerIndex","$document","$cstNode"]),this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider,this.commentProvider=e.documentation.CommentProvider}serialize(e,r){let n=r?.replacer,i=(s,a)=>this.replacer(s,a,r);return JSON.stringify(e,n?(s,a)=>n(s,a,i):i,r?.space)}deserialize(e){let r=JSON.parse(e);return this.linkNode(r,r),r}replacer(e,r,{refText:n,sourceText:i,textRegions:o,comments:s}={}){var a,c,u;if(!this.ignoreProperties.has(e))if(ni(r)){let l=r.ref,f=n?r.$refText:void 0;return l?{$refText:f,$ref:"#"+(l&&this.astNodeLocator.getAstNodePath(l))}:{$refText:f,$error:(c=(a=r.error)===null||a===void 0?void 0:a.message)!==null&&c!==void 0?c:"Could not resolve reference"}}else{let l;if(o&&Et(r)&&(l=this.addAstNodeRegionWithAssignmentsTo(Object.assign({},r)),(!e||r.$document)&&l?.$textRegion))try{l.$textRegion.documentURI=ne(r).uri.toString()}catch{}return i&&!e&&Et(r)&&(l??(l=Object.assign({},r)),l.$sourceText=(u=r.$cstNode)===null||u===void 0?void 0:u.text),s&&Et(r)&&(l??(l=Object.assign({},r)),l.$comment=this.commentProvider.getComment(r)),l??r}}addAstNodeRegionWithAssignmentsTo(e){let r=n=>({offset:n.offset,end:n.end,length:n.length,range:n.range});if(e.$cstNode){let n=e.$textRegion=r(e.$cstNode),i=n.assignments={};return Object.keys(e).filter(o=>!o.startsWith("$")).forEach(o=>{let s=Oi(e.$cstNode,o).map(r);s.length!==0&&(i[o]=s)}),e}}linkNode(e,r,n,i,o){for(let[a,c]of Object.entries(e))if(Array.isArray(c))for(let u=0;u<c.length;u++){let l=c[u];YC(l)?c[u]=this.reviveReference(e,a,r,l):Et(l)&&this.linkNode(l,r,e,a,u)}else YC(c)?e[a]=this.reviveReference(e,a,r,c):Et(c)&&this.linkNode(c,r,e,a);let s=e;s.$container=n,s.$containerProperty=i,s.$containerIndex=o}reviveReference(e,r,n,i){let o=i.$refText;if(i.$ref){let s=this.getRefNode(n,i.$ref);return o||(o=this.nameProvider.getName(s)),{$refText:o??"",ref:s}}else if(i.$error){let s={$refText:o??""};return s.error={container:e,property:r,message:i.$error,reference:s},s}else return}getRefNode(e,r){return this.astNodeLocator.getAstNode(e,r.substring(1))}};var qd=class{register(e){if(!this.singleton&&!this.map){this.singleton=e;return}if(!this.map&&(this.map={},this.singleton)){for(let r of this.singleton.LanguageMetaData.fileExtensions)this.map[r]=this.singleton;this.singleton=void 0}for(let r of e.LanguageMetaData.fileExtensions)this.map[r]!==void 0&&this.map[r]!==e&&console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`),this.map[r]=e}getServices(e){if(this.singleton!==void 0)return this.singleton;if(this.map===void 0)throw new Error("The service registry is empty. Use `register` to register the services of a language.");let r=ve.extname(e),n=this.map[r];if(!n)throw new Error(`The service registry contains no services for the extension '${r}'.`);return n}get all(){return this.singleton!==void 0?[this.singleton]:this.map!==void 0?Object.values(this.map):[]}};var QC=de(Ne(),1);var jd=class{constructor(e){this.astNodeLocator=e.workspace.AstNodeLocator,this.nameProvider=e.references.NameProvider}createDescription(e,r,n=ne(e)){r??(r=this.nameProvider.getName(e));let i=this.astNodeLocator.getAstNodePath(e);if(!r)throw new Error(`Node at path ${i} has no name.`);let o,s=()=>{var a;return o??(o=ir((a=this.nameProvider.getNameNode(e))!==null&&a!==void 0?a:e.$cstNode))};return{node:e,name:r,get nameSegment(){return s()},selectionSegment:ir(e.$cstNode),type:e.$type,documentUri:n.uri,path:i}}},Gd=class{constructor(e){this.nodeLocator=e.workspace.AstNodeLocator}async createDescriptions(e,r=QC.CancellationToken.None){let n=[],i=e.parseResult.value;for(let o of si(i))await et(r),dl(o).filter(s=>!as(s)).forEach(s=>{let a=this.createDescription(s);a&&n.push(a)});return n}createDescription(e){let r=e.reference.$nodeDescription,n=e.reference.$refNode;if(!r||!n)return;let i=ne(e.container).uri;return{sourceUri:i,sourcePath:this.nodeLocator.getAstNodePath(e.container),targetUri:r.documentUri,targetPath:r.path,segment:ir(n),local:ve.equals(r.documentUri,i)}}};var Hd=class{constructor(){this.segmentSeparator="/",this.indexSeparator="@"}getAstNodePath(e){if(e.$container){let r=this.getAstNodePath(e.$container),n=this.getPathSegment(e);return r+this.segmentSeparator+n}return""}getPathSegment({$containerProperty:e,$containerIndex:r}){if(!e)throw new Error("Missing '$containerProperty' in AST node.");return r!==void 0?e+this.indexSeparator+r:e}getAstNode(e,r){return r.split(this.segmentSeparator).reduce((i,o)=>{if(!i||o.length===0)return i;let s=o.indexOf(this.indexSeparator);if(s>0){let a=o.substring(0,s),c=parseInt(o.substring(s+1)),u=i[a];return u?.[c]}return i[o]},e)}};var ZC=de(kt(),1),Kd=class{constructor(e){this.settings={},this.workspaceConfig=!1,this.initialized=!1,this.serviceRegistry=e.ServiceRegistry,this.connection=e.lsp.Connection,e.lsp.LanguageServer.onInitialize(r=>{var n,i;this.workspaceConfig=(i=(n=r.capabilities.workspace)===null||n===void 0?void 0:n.configuration)!==null&&i!==void 0?i:!1}),e.lsp.LanguageServer.onInitialized(r=>{var n;let i=this.serviceRegistry.all;(n=e.lsp.Connection)===null||n===void 0||n.client.register(ZC.DidChangeConfigurationNotification.type,{section:i.map(o=>this.toSectionName(o.LanguageMetaData.languageId))})})}async initialize(){if(this.workspaceConfig&&this.connection){let r=this.serviceRegistry.all.map(i=>({section:this.toSectionName(i.LanguageMetaData.languageId)})),n=await this.connection.workspace.getConfiguration(r);r.forEach((i,o)=>{this.updateSectionConfiguration(i.section,n[o])})}this.initialized=!0}updateConfiguration(e){e.settings&&Object.keys(e.settings).forEach(r=>{this.updateSectionConfiguration(r,e.settings[r])})}updateSectionConfiguration(e,r){this.settings[e]=r}async getConfiguration(e,r){this.initialized||await this.initialize();let n=this.toSectionName(e);if(this.settings[n])return this.settings[n][r]}toSectionName(e){return`${e}`}};var Ca=de(Ne(),1);var Wd=class{constructor(e){this.updateBuildOptions={validation:{categories:["built-in","fast"]}},this.updateListeners=[],this.buildPhaseListeners=new Me,this.buildState=new Map,this.langiumDocuments=e.workspace.LangiumDocuments,this.langiumDocumentFactory=e.workspace.LangiumDocumentFactory,this.indexManager=e.workspace.IndexManager,this.serviceRegistry=e.ServiceRegistry}async build(e,r={},n=Ca.CancellationToken.None){var i,o;for(let s of e){let a=s.uri.toString();if(s.state===He.Validated){if(typeof r.validation=="boolean"&&r.validation)s.state=He.IndexedReferences,s.diagnostics=void 0,this.buildState.delete(a);else if(typeof r.validation=="object"){let c=this.buildState.get(a),u=(i=c?.result)===null||i===void 0?void 0:i.validationChecks;if(u){let f=((o=r.validation.categories)!==null&&o!==void 0?o:Rs.all).filter(m=>!u.includes(m));f.length>0&&(this.buildState.set(a,{completed:!1,options:{validation:Object.assign(Object.assign({},r.validation),{categories:f})},result:c.result}),s.state=He.IndexedReferences)}}}else this.buildState.delete(a)}await this.buildDocuments(e,r,n)}async update(e,r,n=Ca.CancellationToken.None){for(let s of r)this.langiumDocuments.deleteDocument(s),this.buildState.delete(s.toString());this.indexManager.remove(r);for(let s of e)this.langiumDocuments.invalidateDocument(s)||this.langiumDocuments.getOrCreateDocument(s),this.buildState.delete(s.toString());let i=ie(e).concat(r).map(s=>s.toString()).toSet();this.langiumDocuments.all.filter(s=>!i.has(s.uri.toString())&&this.shouldRelink(s,i)).forEach(s=>{this.serviceRegistry.getServices(s.uri).references.Linker.unlink(s),s.state=Math.min(s.state,He.ComputedScopes),s.diagnostics=void 0});for(let s of this.updateListeners)s(e,r);await et(n);let o=this.langiumDocuments.all.filter(s=>{var a;return s.state<He.Linked||!(!((a=this.buildState.get(s.uri.toString()))===null||a===void 0)&&a.completed)}).toArray();await this.buildDocuments(o,this.updateBuildOptions,n)}shouldRelink(e,r){return e.references.some(n=>n.error!==void 0)?!0:this.indexManager.isAffected(e,r)}onUpdate(e){return this.updateListeners.push(e),Ca.Disposable.create(()=>{let r=this.updateListeners.indexOf(e);r>=0&&this.updateListeners.splice(r,1)})}async buildDocuments(e,r,n){this.prepareBuild(e,r),await this.runCancelable(e,He.Parsed,n,o=>{this.langiumDocumentFactory.update(o)}),await this.runCancelable(e,He.IndexedContent,n,o=>this.indexManager.updateContent(o,n)),await this.runCancelable(e,He.ComputedScopes,n,async o=>{let s=this.serviceRegistry.getServices(o.uri).references.ScopeComputation;o.precomputedScopes=await s.computeLocalScopes(o,n)}),await this.runCancelable(e,He.Linked,n,o=>this.serviceRegistry.getServices(o.uri).references.Linker.link(o,n)),await this.runCancelable(e,He.IndexedReferences,n,o=>this.indexManager.updateReferences(o,n));let i=e.filter(o=>this.shouldValidate(o));await this.runCancelable(i,He.Validated,n,o=>this.validate(o,n));for(let o of e){let s=this.buildState.get(o.uri.toString());s&&(s.completed=!0)}}prepareBuild(e,r){for(let n of e){let i=n.uri.toString(),o=this.buildState.get(i);(!o||o.completed)&&this.buildState.set(i,{completed:!1,options:r,result:o?.result})}}async runCancelable(e,r,n,i){let o=e.filter(s=>s.state<r);for(let s of o)await et(n),await i(s),s.state=r;await this.notifyBuildPhase(o,r,n)}onBuildPhase(e,r){return this.buildPhaseListeners.add(e,r),Ca.Disposable.create(()=>{this.buildPhaseListeners.delete(e,r)})}async notifyBuildPhase(e,r,n){if(e.length===0)return;let i=this.buildPhaseListeners.get(r);for(let o of i)await et(n),await o(e,n)}shouldValidate(e){return!!this.getBuildOptions(e).validation}async validate(e,r){var n,i;let o=this.serviceRegistry.getServices(e.uri).validation.DocumentValidator,s=this.getBuildOptions(e).validation,a=typeof s=="object"?s:void 0,c=await o.validateDocument(e,a,r);e.diagnostics?e.diagnostics.push(...c):e.diagnostics=c;let u=this.buildState.get(e.uri.toString());if(u){(n=u.result)!==null&&n!==void 0||(u.result={});let l=(i=a?.categories)!==null&&i!==void 0?i:Rs.all;u.result.validationChecks?u.result.validationChecks.push(...l):u.result.validationChecks=[...l]}}getBuildOptions(e){var r,n;return(n=(r=this.buildState.get(e.uri.toString()))===null||r===void 0?void 0:r.options)!==null&&n!==void 0?n:{}}};var qg=de(Ne(),1);var Bd=class{constructor(e){this.simpleIndex=new Map,this.simpleTypeIndex=new Nl,this.referenceIndex=new Map,this.documents=e.workspace.LangiumDocuments,this.serviceRegistry=e.ServiceRegistry,this.astReflection=e.AstReflection}findAllReferences(e,r){let n=ne(e).uri,i=[];return this.referenceIndex.forEach(o=>{o.forEach(s=>{ve.equals(s.targetUri,n)&&s.targetPath===r&&i.push(s)})}),ie(i)}allElements(e,r){let n=ie(this.simpleIndex.keys());return r&&(n=n.filter(i=>!r||r.has(i))),n.map(i=>this.getFileDescriptions(i,e)).flat()}getFileDescriptions(e,r){var n;return r?this.simpleTypeIndex.get(e,r,()=>{var o;return((o=this.simpleIndex.get(e))!==null&&o!==void 0?o:[]).filter(a=>this.astReflection.isSubtype(a.type,r))}):(n=this.simpleIndex.get(e))!==null&&n!==void 0?n:[]}remove(e){for(let r of e){let n=r.toString();this.simpleIndex.delete(n),this.simpleTypeIndex.clear(n),this.referenceIndex.delete(n)}}async updateContent(e,r=qg.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e,r);for(let s of i)s.node=void 0;let o=e.uri.toString();this.simpleIndex.set(o,i),this.simpleTypeIndex.clear(o)}async updateReferences(e,r=qg.CancellationToken.None){let i=await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e,r);this.referenceIndex.set(e.uri.toString(),i)}isAffected(e,r){let n=this.referenceIndex.get(e.uri.toString());return n?n.some(i=>!i.local&&r.has(i.targetUri.toString())):!1}};var eA=de(Ne(),1);var zd=class{constructor(e){this.initialBuildOptions={},this.serviceRegistry=e.ServiceRegistry,this.langiumDocuments=e.workspace.LangiumDocuments,this.documentBuilder=e.workspace.DocumentBuilder,this.fileSystemProvider=e.workspace.FileSystemProvider,this.mutex=e.workspace.MutexLock,e.lsp.LanguageServer.onInitialize(r=>{var n;this.folders=(n=r.workspaceFolders)!==null&&n!==void 0?n:void 0}),e.lsp.LanguageServer.onInitialized(r=>{this.mutex.lock(n=>{var i;return this.initializeWorkspace((i=this.folders)!==null&&i!==void 0?i:[],n)})})}async initializeWorkspace(e,r=eA.CancellationToken.None){let n=this.serviceRegistry.all.flatMap(s=>s.LanguageMetaData.fileExtensions),i=[],o=s=>{i.push(s),this.langiumDocuments.hasDocument(s.uri)||this.langiumDocuments.addDocument(s)};await this.loadAdditionalDocuments(e,o),await Promise.all(e.map(s=>[s,this.getRootFolder(s)]).map(async s=>this.traverseFolder(...s,n,o))),await et(r),await this.documentBuilder.build(i,this.initialBuildOptions,r)}loadAdditionalDocuments(e,r){return Promise.resolve()}getRootFolder(e){return Jt.parse(e.uri)}async traverseFolder(e,r,n,i){let o=await this.fileSystemProvider.readDirectory(r);await Promise.all(o.map(async s=>{if(this.includeEntry(e,s,n)){if(s.isDirectory)await this.traverseFolder(e,s.uri,n,i);else if(s.isFile){let a=this.langiumDocuments.getOrCreateDocument(s.uri);i(a)}}}))}includeEntry(e,r,n){let i=ve.basename(r.uri);if(i.startsWith("."))return!1;if(r.isDirectory)return i!=="node_modules"&&i!=="out";if(r.isFile){let o=ve.extname(r.uri);return n.includes(o)}return!1}};var Vd=class{constructor(e){let r=e.parser.TokenBuilder.buildTokens(e.Grammar,{caseInsensitive:e.LanguageMetaData.caseInsensitive});this.tokenTypes=this.toTokenTypeDictionary(r);let n=tA(r)?Object.values(r):r;this.chevrotainLexer=new ht(n,{positionTracking:"full"})}get definition(){return this.tokenTypes}tokenize(e){var r;let n=this.chevrotainLexer.tokenize(e);return{tokens:n.tokens,errors:n.errors,hidden:(r=n.groups.hidden)!==null&&r!==void 0?r:[]}}toTokenTypeDictionary(e){if(tA(e))return e;let r=rA(e)?Object.values(e.modes).flat():e,n={};return r.forEach(i=>n[i.name]=i),n}};function cj(t){return Array.isArray(t)&&(t.length===0||"name"in t[0])}function rA(t){return t&&"modes"in t&&"defaultMode"in t}function tA(t){return!cj(t)&&!rA(t)}var be=de(Ne(),1);function oA(t,e,r){let n,i;typeof t=="string"?(i=e,n=r):(i=t.range.start,n=e),i||(i=be.Position.create(0,0));let o=aA(t),s=Hg(n),a=lj({lines:o,position:i,options:s});return hj({index:0,tokens:a,position:i})}function sA(t,e){let r=Hg(e),n=aA(t);if(n.length===0)return!1;let i=n[0],o=n[n.length-1],s=r.start,a=r.end;return!!s?.exec(i)&&!!a?.exec(o)}function aA(t){let e="";return typeof t=="string"?e=t:e=t.text,e.split(oc)}var nA=/\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy,uj=/\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu;function lj(t){var e,r,n;let i=[],o=t.position.line,s=t.position.character;for(let a=0;a<t.lines.length;a++){let c=a===0,u=a===t.lines.length-1,l=t.lines[a],f=0;if(c&&t.options.start){let T=(e=t.options.start)===null||e===void 0?void 0:e.exec(l);T&&(f=T.index+T[0].length)}else{let T=(r=t.options.line)===null||r===void 0?void 0:r.exec(l);T&&(f=T.index+T[0].length)}if(u){let T=(n=t.options.end)===null||n===void 0?void 0:n.exec(l);T&&(l=l.substring(0,T.index))}if(l=l.substring(0,mj(l)),Gg(l,0)>=l.length){if(i.length>0){let T=be.Position.create(o,s);i.push({type:"break",content:"",range:be.Range.create(T,T)})}}else{nA.lastIndex=f;let T=nA.exec(l);if(T){let S=T[0],C=T[1],N=be.Position.create(o,s+f),A=be.Position.create(o,s+f+S.length);i.push({type:"tag",content:C,range:be.Range.create(N,A)}),f+=S.length,f=Gg(l,f)}if(f<l.length){let S=l.substring(f),C=Array.from(S.matchAll(uj));i.push(...fj(C,S,o,s+f))}}o++,s=0}return i.length>0&&i[i.length-1].type==="break"?i.slice(0,-1):i}function fj(t,e,r,n){let i=[];if(t.length===0){let o=be.Position.create(r,n),s=be.Position.create(r,n+e.length);i.push({type:"text",content:e,range:be.Range.create(o,s)})}else{let o=0;for(let a of t){let c=a.index,u=e.substring(o,c);u.length>0&&i.push({type:"text",content:e.substring(o,c),range:be.Range.create(be.Position.create(r,o+n),be.Position.create(r,c+n))});let l=u.length+1,f=a[1];if(i.push({type:"inline-tag",content:f,range:be.Range.create(be.Position.create(r,o+l+n),be.Position.create(r,o+l+f.length+n))}),l+=f.length,a.length===4){l+=a[2].length;let m=a[3];i.push({type:"text",content:m,range:be.Range.create(be.Position.create(r,o+l+n),be.Position.create(r,o+l+m.length+n))})}else i.push({type:"text",content:"",range:be.Range.create(be.Position.create(r,o+l+n),be.Position.create(r,o+l+n))});o=c+a[0].length}let s=e.substring(o);s.length>0&&i.push({type:"text",content:s,range:be.Range.create(be.Position.create(r,o+n),be.Position.create(r,o+n+s.length))})}return i}var dj=/\S/,pj=/\s*$/;function Gg(t,e){let r=t.substring(e).match(dj);return r?e+r.index:t.length}function mj(t){let e=t.match(pj);if(e&&typeof e.index=="number")return e.index}function hj(t){var e,r,n,i;let o=be.Position.create(t.position.line,t.position.character);if(t.tokens.length===0)return new Xd([],be.Range.create(o,o));let s=[];for(;t.index<t.tokens.length;){let u=gj(t,s[s.length-1]);u&&s.push(u)}let a=(r=(e=s[0])===null||e===void 0?void 0:e.range.start)!==null&&r!==void 0?r:o,c=(i=(n=s[s.length-1])===null||n===void 0?void 0:n.range.end)!==null&&i!==void 0?i:o;return new Xd(s,be.Range.create(a,c))}function gj(t,e){let r=t.tokens[t.index];if(r.type==="tag")return uA(t,!1);if(r.type==="text"||r.type==="inline-tag")return cA(t);yj(r,e),t.index++}function yj(t,e){if(e){let r=new Yd("",t.range);"inlines"in e?e.inlines.push(r):e.content.inlines.push(r)}}function cA(t){let e=t.tokens[t.index],r=e,n=e,i=[];for(;e&&e.type!=="break"&&e.type!=="tag";)i.push(Tj(t)),n=e,e=t.tokens[t.index];return new tu(i,be.Range.create(r.range.start,n.range.end))}function Tj(t){return t.tokens[t.index].type==="inline-tag"?uA(t,!0):lA(t)}function uA(t,e){let r=t.tokens[t.index++],n=r.content.substring(1),i=t.tokens[t.index];if(i?.type==="text")if(e){let o=lA(t);return new eu(n,new tu([o],o.range),e,be.Range.create(r.range.start,o.range.end))}else{let o=cA(t);return new eu(n,o,e,be.Range.create(r.range.start,o.range.end))}else{let o=r.range;return new eu(n,new tu([],o),e,o)}}function lA(t){let e=t.tokens[t.index++];return new Yd(e.content,e.range)}function Hg(t){if(!t)return Hg({start:"/**",end:"*/",line:"*"});let{start:e,end:r,line:n}=t;return{start:jg(e,!0),end:jg(r,!1),line:jg(n,!0)}}function jg(t,e){if(typeof t=="string"||typeof t=="object"){let r=typeof t=="string"?ui(t):t.source;return e?new RegExp(`^\\s*${r}`):new RegExp(`\\s*${r}\\s*$`)}else return t}var Xd=class{constructor(e,r){this.elements=e,this.range=r}getTag(e){return this.getAllTags().find(r=>r.name===e)}getTags(e){return this.getAllTags().filter(r=>r.name===e)}getAllTags(){return this.elements.filter(e=>"name"in e)}toString(){let e="";for(let r of this.elements)if(e.length===0)e=r.toString();else{let n=r.toString();e+=iA(e)+n}return e.trim()}toMarkdown(e){let r="";for(let n of this.elements)if(r.length===0)r=n.toMarkdown(e);else{let i=n.toMarkdown(e);r+=iA(r)+i}return r.trim()}},eu=class{constructor(e,r,n,i){this.name=e,this.content=r,this.inline=n,this.range=i}toString(){let e=`@${this.name}`,r=this.content.toString();return this.content.inlines.length===1?e=`${e} ${r}`:this.content.inlines.length>1&&(e=`${e}
${r}`),this.inline?`{${e}}`:e}toMarkdown(e){let r=this.content.toMarkdown(e);if(this.inline){let o=vj(this.name,r,e??{});if(typeof o=="string")return o}let n="";e?.tag==="italic"||e?.tag===void 0?n="*":e?.tag==="bold"?n="**":e?.tag==="bold-italic"&&(n="***");let i=`${n}@${this.name}${n}`;return this.content.inlines.length===1?i=`${i} \u2014 ${r}`:this.content.inlines.length>1&&(i=`${i}
${r}`),this.inline?`{${i}}`:i}};function vj(t,e,r){var n,i;if(t==="linkplain"||t==="linkcode"||t==="link"){let o=e.indexOf(" "),s=e;if(o>0){let c=Gg(e,o);s=e.substring(c),e=e.substring(0,o)}return(t==="linkcode"||t==="link"&&r.link==="code")&&(s=`\`${s}\``),(i=(n=r.renderLink)===null||n===void 0?void 0:n.call(r,e,s))!==null&&i!==void 0?i:Rj(e,s)}}function Rj(t,e){try{return Jt.parse(t,!0),`[${e}](${t})`}catch{return t}}var tu=class{constructor(e,r){this.inlines=e,this.range=r}toString(){let e="";for(let r=0;r<this.inlines.length;r++){let n=this.inlines[r],i=this.inlines[r+1];e+=n.toString(),i&&i.range.start.line>n.range.start.line&&(e+=`
`)}return e}toMarkdown(e){let r="";for(let n=0;n<this.inlines.length;n++){let i=this.inlines[n],o=this.inlines[n+1];r+=i.toMarkdown(e),o&&o.range.start.line>i.range.start.line&&(r+=`
`)}return r}},Yd=class{constructor(e,r){this.text=e,this.range=r}toString(){return this.text}toMarkdown(){return this.text}};function iA(t){return t.endsWith(`
`)?`
`:`

`}var Jd=class{constructor(e){this.indexManager=e.shared.workspace.IndexManager,this.commentProvider=e.documentation.CommentProvider}getDocumentation(e){let r=this.commentProvider.getComment(e);if(r&&sA(r))return oA(r).toMarkdown({renderLink:(i,o)=>this.documentationLinkRenderer(e,i,o)})}documentationLinkRenderer(e,r,n){var i;let o=(i=this.findNameInPrecomputedScopes(e,r))!==null&&i!==void 0?i:this.findNameInGlobalScope(e,r);if(o&&o.nameSegment){let s=o.nameSegment.range.start.line+1,a=o.nameSegment.range.start.character+1,c=o.documentUri.with({fragment:`L${s},${a}`});return`[${n}](${c.toString()})`}else return}findNameInPrecomputedScopes(e,r){let i=ne(e).precomputedScopes;if(!i)return;let o=e;do{let a=i.get(o).find(c=>c.name===r);if(a)return a;o=o.$container}while(o)}findNameInGlobalScope(e,r){return this.indexManager.allElements().find(i=>i.name===r)}};var Qd=class{constructor(e){this.grammarConfig=()=>e.parser.GrammarConfig}getComment(e){var r;return JC(e)?e.$comment:(r=cv(e.$cstNode,this.grammarConfig().multilineCommentRules))===null||r===void 0?void 0:r.text}};function Cc(t){return{documentation:{CommentProvider:e=>new Qd(e),DocumentationProvider:e=>new Jd(e)},parser:{GrammarConfig:e=>Cx(e),LangiumParser:e=>VC(e),CompletionParser:e=>zC(e),ValueConverter:()=>new Md,TokenBuilder:()=>new Ld,Lexer:e=>new Vd(e),ParserErrorMessageProvider:()=>new Qc},lsp:{CompletionProvider:e=>new Is(e),DocumentSymbolProvider:e=>new Yl(e),HoverProvider:e=>new Ql(e),FoldingRangeProvider:e=>new Ds(e),ReferencesProvider:e=>new of(e),DefinitionProvider:e=>new Ms(e),DocumentHighlightProvider:e=>new Xl(e),RenameProvider:e=>new sf(e)},workspace:{AstNodeLocator:()=>new Hd,AstNodeDescriptionProvider:e=>new jd(e),ReferenceDescriptionProvider:e=>new Gd(e)},references:{Linker:e=>new Fd(e),NameProvider:()=>new Ts,ScopeProvider:e=>new Ns(e),ScopeComputation:e=>new _s(e),References:e=>new Os(e)},serializer:{JsonSerializer:e=>new Ud(e)},validation:{DocumentValidator:e=>new Dl(e),ValidationRegistry:e=>new Cl(e)},shared:()=>t.shared}}function Ac(t){return{ServiceRegistry:()=>new qd,lsp:{Connection:()=>t.connection,LanguageServer:e=>new tf(e),WorkspaceSymbolProvider:e=>new af(e),NodeKindProvider:()=>new rf,FuzzyMatcher:()=>new Jl},workspace:{LangiumDocuments:e=>new ef(e),LangiumDocumentFactory:e=>new Zl(e),DocumentBuilder:e=>new Wd(e),TextDocuments:()=>new fA.TextDocuments(ss),IndexManager:e=>new Bd(e),WorkspaceManager:e=>new zd(e),FileSystemProvider:e=>t.fileSystemProvider(e),MutexLock:()=>new wl,ConfigurationProvider:e=>new Kd(e)}}}var Ea=de(CA(),1);var Dj="Statment";var Oj="Type";var Lj="Unit";var Mj="Affectation";var AA="ConditionnalStructure";var kA="Expr";var Fj="Rbreturn";var EA="RobotInstruction";var Uj="StatementBlock";var qj="Throw";var jj="VariableDefinition";var Gj="Boolean";var Hj="Number_";var Kj="Void";var Wj="CM";var Bj="KM";var zj="MM";var Vj="For";var Xj="Ifz";var Yj="RbLoop";var _A="BinaryExpr";var NA="ConstantExpr";var Jj="FunctionCall";var $A="UnaryExpr";var Qj="Variable";var Zj="Forward";var eG="Rotate";var tG="Addition";var rG="And";var nG="Division";var iG="Equals";var oG="LessThan";var sG="MoreThan";var aG="Multiplication";var cG="Or";var uG="Soustraction";var lG="ConstBoolean";var fG="ConstNumber";var dG="ConstString";var IA="UnaryRightExpr";var pG="Not";var ru=class extends Ro{getAllTypes(){return["Addition","Affectation","And","BinaryExpr","Boolean","CM","ConditionnalStructure","ConstBoolean","ConstNumber","ConstString","ConstantExpr","Division","Equals","Expr","For","Forward","FunctionCall","FunctionCallParameters","FunctionDefinitionParameters","Function_","Ifz","KM","LessThan","MM","MoreThan","Multiplication","Not","Number_","Or","Program","RbLoop","Rbreturn","RobotInstruction","Rotate","Soustraction","StatementBlock","Statment","Throw","Type","UnaryExpr","UnaryRightExpr","Unit","Variable","VariableDefinition","Void"]}computeIsSubtype(e,r){switch(e){case tG:case rG:case nG:case iG:case oG:case sG:case aG:case cG:case uG:return this.isSubtype(_A,r);case Mj:case AA:case kA:case Fj:case EA:case Uj:case qj:case jj:return this.isSubtype(Dj,r);case _A:case NA:case Jj:case $A:case Qj:return this.isSubtype(kA,r);case Gj:case Hj:case Kj:return this.isSubtype(Oj,r);case Wj:case Bj:case zj:return this.isSubtype(Lj,r);case lG:case fG:case dG:return this.isSubtype(NA,r);case Vj:case Xj:case Yj:return this.isSubtype(AA,r);case Zj:case eG:return this.isSubtype(EA,r);case pG:return this.isSubtype(IA,r);case IA:return this.isSubtype($A,r);default:return!1}}getReferenceType(e){let r=`${e.container.$type}:${e.property}`;switch(r){default:throw new Error(`${r} is not a valid reference id.`)}}getTypeMetaData(e){switch(e){case"FunctionCallParameters":return{name:"FunctionCallParameters",mandatory:[{name:"expr",type:"array"}]};case"FunctionDefinitionParameters":return{name:"FunctionDefinitionParameters",mandatory:[{name:"variabledefinition",type:"array"}]};case"Program":return{name:"Program",mandatory:[{name:"function",type:"array"}]};case"StatementBlock":return{name:"StatementBlock",mandatory:[{name:"statments",type:"array"}]};case"Ifz":return{name:"Ifz",mandatory:[{name:"Elsez",type:"array"}]};case"ConstBoolean":return{name:"ConstBoolean",mandatory:[{name:"Value",type:"boolean"}]};default:return{name:e,mandatory:[]}}}},xue=new ru;var tp,PA=()=>tp??(tp=Sl(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "MyDsl",
  "imports": [],
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Program",
      "entry": true,
      "returnType": {
        "$ref": "#/interfaces@0"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "function",
        "operator": "+=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@22"
          },
          "arguments": []
        },
        "cardinality": "*"
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type",
      "returnType": {
        "$ref": "#/interfaces@4"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@37"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Statment",
      "returnType": {
        "$ref": "#/interfaces@3"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@7"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@9"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@10"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@11"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@12"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@13"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@14"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@15"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@16"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@17"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@5"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@18"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@19"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@20"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@21"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@23"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@24"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@25"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@26"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@27"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@29"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@28"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@30"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@40"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@41"
                },
                "arguments": []
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Expr",
      "returnType": {
        "$ref": "#/interfaces@7"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@7"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@9"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@10"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@11"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@12"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@13"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@14"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@15"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@16"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@24"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Unit",
      "returnType": {
        "$ref": "#/interfaces@8"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@34"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "StatementBlock",
      "returnType": {
        "$ref": "#/interfaces@2"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "statments",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@2"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EString",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@44"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@42"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ConstString",
      "returnType": {
        "$ref": "#/interfaces@44"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "Value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@44"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FunctionDefinitionParameters",
      "returnType": {
        "$ref": "#/interfaces@5"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "variabledefinition",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@21"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ",",
            "cardinality": "?"
          }
        ],
        "cardinality": "*"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "And",
      "returnType": {
        "$ref": "#/interfaces@9"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "Left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "and"
          },
          {
            "$type": "Assignment",
            "feature": "Right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Or",
      "returnType": {
        "$ref": "#/interfaces@11"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "Left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "or"
          },
          {
            "$type": "Assignment",
            "feature": "Right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Multiplication",
      "returnType": {
        "$ref": "#/interfaces@12"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "Left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "*"
          },
          {
            "$type": "Assignment",
            "feature": "Right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Addition",
      "returnType": {
        "$ref": "#/interfaces@13"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "Left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "+"
          },
          {
            "$type": "Assignment",
            "feature": "Right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Division",
      "returnType": {
        "$ref": "#/interfaces@14"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "Left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "/"
          },
          {
            "$type": "Assignment",
            "feature": "Right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Soustraction",
      "returnType": {
        "$ref": "#/interfaces@15"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "Left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "-"
          },
          {
            "$type": "Assignment",
            "feature": "Right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Not",
      "returnType": {
        "$ref": "#/interfaces@16"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "not"
          },
          {
            "$type": "Assignment",
            "feature": "right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ConstNumber",
      "returnType": {
        "$ref": "#/interfaces@19"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "Value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@31"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ConstBoolean",
      "returnType": {
        "$ref": "#/interfaces@21"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "Value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@32"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Forward",
      "returnType": {
        "$ref": "#/interfaces@22"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Forward"
          },
          {
            "$type": "Assignment",
            "feature": "Value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "unit",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Rotate",
      "returnType": {
        "$ref": "#/interfaces@24"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Rotate"
          },
          {
            "$type": "Assignment",
            "feature": "Value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Affectation",
      "returnType": {
        "$ref": "#/interfaces@25"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "variable",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@40"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "Right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "VariableDefinition",
      "returnType": {
        "$ref": "#/interfaces@6"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "variable",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@40"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "="
              },
              {
                "$type": "Assignment",
                "feature": "left",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@3"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Function_",
      "returnType": {
        "$ref": "#/interfaces@1"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "FunctionName",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@6"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "functiondefinitionparameters",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@8"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Assignment",
            "feature": "Body",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FunctionCall",
      "returnType": {
        "$ref": "#/interfaces@27"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "functionName",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@6"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "functionparameters",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@36"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LessThan",
      "returnType": {
        "$ref": "#/interfaces@29"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "Left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "<"
          },
          {
            "$type": "Assignment",
            "feature": "Right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Equals",
      "returnType": {
        "$ref": "#/interfaces@30"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "Left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "=="
          },
          {
            "$type": "Assignment",
            "feature": "Right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "MoreThan",
      "returnType": {
        "$ref": "#/interfaces@31"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "Left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ">"
          },
          {
            "$type": "Assignment",
            "feature": "Right",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RbLoop",
      "returnType": {
        "$ref": "#/interfaces@32"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "while("
          },
          {
            "$type": "Assignment",
            "feature": "Condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Assignment",
            "feature": "Body",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "For",
      "returnType": {
        "$ref": "#/interfaces@33"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "for("
          },
          {
            "$type": "Assignment",
            "feature": "Initialization",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@21"
                  },
                  "arguments": []
                },
                {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@40"
                  },
                  "arguments": []
                }
              ]
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          },
          {
            "$type": "Assignment",
            "feature": "Condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          },
          {
            "$type": "Assignment",
            "feature": "Increment",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@20"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Assignment",
            "feature": "Body",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Ifz",
      "returnType": {
        "$ref": "#/interfaces@35"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "if("
          },
          {
            "$type": "Assignment",
            "feature": "Condition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          },
          {
            "$type": "Assignment",
            "feature": "Body",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@5"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "else"
              },
              {
                "$type": "Assignment",
                "feature": "Elsez",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@5"
                  },
                  "arguments": []
                },
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Rbreturn",
      "returnType": {
        "$ref": "#/interfaces@36"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "return"
          },
          {
            "$type": "Assignment",
            "feature": "returnedExpr",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EInt",
      "dataType": "number",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "-",
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "EBoolean",
      "dataType": "boolean",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "true"
          },
          {
            "$type": "Keyword",
            "value": "false"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "MM",
      "returnType": {
        "$ref": "#/interfaces@37"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@37"
            }
          },
          {
            "$type": "Keyword",
            "value": "MM"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CM",
      "returnType": {
        "$ref": "#/interfaces@38"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@38"
            }
          },
          {
            "$type": "Keyword",
            "value": "CM"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "KM",
      "returnType": {
        "$ref": "#/interfaces@39"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@39"
            }
          },
          {
            "$type": "Keyword",
            "value": "KM"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FunctionCallParameters",
      "returnType": {
        "$ref": "#/interfaces@28"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "expr",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ",",
            "cardinality": "?"
          }
        ],
        "cardinality": "*"
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Number_",
      "returnType": {
        "$ref": "#/interfaces@40"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@40"
            }
          },
          {
            "$type": "Keyword",
            "value": "Number"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Boolean",
      "returnType": {
        "$ref": "#/interfaces@41"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@41"
            }
          },
          {
            "$type": "Keyword",
            "value": "Boolean"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Void",
      "returnType": {
        "$ref": "#/interfaces@42"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "type": {
              "$ref": "#/interfaces@42"
            }
          },
          {
            "$type": "Keyword",
            "value": "Void"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Variable",
      "returnType": {
        "$ref": "#/interfaces@26"
      },
      "definition": {
        "$type": "Assignment",
        "feature": "Name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@6"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Throw",
      "returnType": {
        "$ref": "#/interfaces@43"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Throw"
          },
          {
            "$type": "Assignment",
            "feature": "err",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@7"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "^"
            },
            "cardinality": "?"
          },
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "a"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "z"
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "A"
                    },
                    "right": {
                      "$type": "Keyword",
                      "value": "Z"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "_"
                }
              }
            ]
          },
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalAlternatives",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "a"
                        },
                        "right": {
                          "$type": "Keyword",
                          "value": "z"
                        }
                      },
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "A"
                        },
                        "right": {
                          "$type": "Keyword",
                          "value": "Z"
                        }
                      }
                    ]
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "_"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "0"
                },
                "right": {
                  "$type": "Keyword",
                  "value": "9"
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "INT",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "CharacterRange",
        "left": {
          "$type": "Keyword",
          "value": "0"
        },
        "right": {
          "$type": "Keyword",
          "value": "9"
        },
        "cardinality": "+"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\""
                }
              },
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalGroup",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\"
                        }
                      },
                      {
                        "$type": "Wildcard"
                      }
                    ]
                  },
                  {
                    "$type": "NegatedToken",
                    "terminal": {
                      "$type": "TerminalAlternatives",
                      "elements": [
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\\\"
                          }
                        },
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\""
                          }
                        }
                      ]
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\""
                }
              }
            ]
          },
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "'"
                }
              },
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "TerminalGroup",
                    "elements": [
                      {
                        "$type": "CharacterRange",
                        "left": {
                          "$type": "Keyword",
                          "value": "\\\\"
                        }
                      },
                      {
                        "$type": "Wildcard"
                      }
                    ]
                  },
                  {
                    "$type": "NegatedToken",
                    "terminal": {
                      "$type": "TerminalAlternatives",
                      "elements": [
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "\\\\"
                          }
                        },
                        {
                          "$type": "CharacterRange",
                          "left": {
                            "$type": "Keyword",
                            "value": "'"
                          }
                        }
                      ]
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "'"
                }
              }
            ]
          }
        ]
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "/*"
            }
          },
          {
            "$type": "UntilToken",
            "terminal": {
              "$type": "CharacterRange",
              "left": {
                "$type": "Keyword",
                "value": "*/"
              }
            }
          }
        ]
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalGroup",
        "elements": [
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "//"
            }
          },
          {
            "$type": "NegatedToken",
            "terminal": {
              "$type": "TerminalAlternatives",
              "elements": [
                {
                  "$type": "CharacterRange",
                  "left": {
                    "$type": "Keyword",
                    "value": "\\n"
                  }
                },
                {
                  "$type": "CharacterRange",
                  "left": {
                    "$type": "Keyword",
                    "value": "\\r"
                  }
                }
              ]
            }
          },
          {
            "$type": "TerminalGroup",
            "elements": [
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\r"
                },
                "cardinality": "?"
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\n"
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "TerminalAlternatives",
        "elements": [
          {
            "$type": "TerminalAlternatives",
            "elements": [
              {
                "$type": "TerminalAlternatives",
                "elements": [
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": " "
                    }
                  },
                  {
                    "$type": "CharacterRange",
                    "left": {
                      "$type": "Keyword",
                      "value": "\\t"
                    }
                  }
                ]
              },
              {
                "$type": "CharacterRange",
                "left": {
                  "$type": "Keyword",
                  "value": "\\r"
                }
              }
            ]
          },
          {
            "$type": "CharacterRange",
            "left": {
              "$type": "Keyword",
              "value": "\\n"
            }
          }
        ],
        "cardinality": "+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "ANY_OTHER",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "Wildcard"
      },
      "fragment": false,
      "hidden": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "interfaces": [
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "function",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@1"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Program",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Body",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@2"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "FunctionName",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "type",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@4"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "functiondefinitionparameters",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@5"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Function_",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "statments",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@3"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "StatementBlock",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Statment",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "Type",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "variabledefinition",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@6"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "FunctionDefinitionParameters",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "type",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@4"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "left",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@7"
            }
          }
        },
        {
          "$type": "TypeAttribute",
          "name": "variable",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@26"
            }
          },
          "isOptional": false
        }
      ],
      "name": "VariableDefinition",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Expr",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Unit",
      "attributes": [],
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "And",
      "superTypes": [
        {
          "$ref": "#/interfaces@10"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Left",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@7"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "Right",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@7"
            }
          },
          "isOptional": false
        }
      ],
      "name": "BinaryExpr",
      "superTypes": [
        {
          "$ref": "#/interfaces@7"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "Or",
      "superTypes": [
        {
          "$ref": "#/interfaces@10"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Multiplication",
      "superTypes": [
        {
          "$ref": "#/interfaces@10"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Addition",
      "superTypes": [
        {
          "$ref": "#/interfaces@10"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Division",
      "superTypes": [
        {
          "$ref": "#/interfaces@10"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Soustraction",
      "superTypes": [
        {
          "$ref": "#/interfaces@10"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Not",
      "superTypes": [
        {
          "$ref": "#/interfaces@17"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "right",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@7"
            }
          },
          "isOptional": false
        }
      ],
      "name": "UnaryRightExpr",
      "superTypes": [
        {
          "$ref": "#/interfaces@18"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "UnaryExpr",
      "superTypes": [
        {
          "$ref": "#/interfaces@7"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Value",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "number"
          },
          "isOptional": false
        }
      ],
      "name": "ConstNumber",
      "superTypes": [
        {
          "$ref": "#/interfaces@20"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "ConstantExpr",
      "superTypes": [
        {
          "$ref": "#/interfaces@7"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Value",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "boolean"
          },
          "isOptional": false
        }
      ],
      "name": "ConstBoolean",
      "superTypes": [
        {
          "$ref": "#/interfaces@20"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Value",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@7"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "unit",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@8"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Forward",
      "superTypes": [
        {
          "$ref": "#/interfaces@23"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "RobotInstruction",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Value",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@7"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Rotate",
      "superTypes": [
        {
          "$ref": "#/interfaces@23"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Right",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@7"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "variable",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@26"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Affectation",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Name",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        }
      ],
      "name": "Variable",
      "superTypes": [
        {
          "$ref": "#/interfaces@7"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "functionparameters",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@28"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "functionName",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        }
      ],
      "name": "FunctionCall",
      "superTypes": [
        {
          "$ref": "#/interfaces@7"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "expr",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@7"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "FunctionCallParameters",
      "superTypes": []
    },
    {
      "$type": "Interface",
      "name": "LessThan",
      "superTypes": [
        {
          "$ref": "#/interfaces@10"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Equals",
      "superTypes": [
        {
          "$ref": "#/interfaces@10"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "MoreThan",
      "superTypes": [
        {
          "$ref": "#/interfaces@10"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "RbLoop",
      "superTypes": [
        {
          "$ref": "#/interfaces@34"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Increment",
          "type": {
            "$type": "UnionType",
            "types": [
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@25"
                }
              },
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@7"
                }
              }
            ]
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "Initialization",
          "type": {
            "$type": "UnionType",
            "types": [
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@6"
                }
              },
              {
                "$type": "SimpleType",
                "typeRef": {
                  "$ref": "#/interfaces@26"
                }
              }
            ]
          },
          "isOptional": false
        }
      ],
      "name": "For",
      "superTypes": [
        {
          "$ref": "#/interfaces@34"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Body",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@2"
            }
          },
          "isOptional": false
        },
        {
          "$type": "TypeAttribute",
          "name": "Condition",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@7"
            }
          },
          "isOptional": false
        }
      ],
      "name": "ConditionnalStructure",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Elsez",
          "type": {
            "$type": "ArrayType",
            "elementType": {
              "$type": "SimpleType",
              "typeRef": {
                "$ref": "#/interfaces@2"
              }
            }
          },
          "isOptional": false
        }
      ],
      "name": "Ifz",
      "superTypes": [
        {
          "$ref": "#/interfaces@34"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "returnedExpr",
          "isOptional": true,
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@7"
            }
          }
        }
      ],
      "name": "Rbreturn",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "name": "MM",
      "superTypes": [
        {
          "$ref": "#/interfaces@8"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "CM",
      "superTypes": [
        {
          "$ref": "#/interfaces@8"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "KM",
      "superTypes": [
        {
          "$ref": "#/interfaces@8"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Number_",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Boolean",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "name": "Void",
      "superTypes": [
        {
          "$ref": "#/interfaces@4"
        }
      ],
      "attributes": []
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "err",
          "type": {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/interfaces@44"
            }
          },
          "isOptional": false
        }
      ],
      "name": "Throw",
      "superTypes": [
        {
          "$ref": "#/interfaces@3"
        }
      ]
    },
    {
      "$type": "Interface",
      "attributes": [
        {
          "$type": "TypeAttribute",
          "name": "Value",
          "type": {
            "$type": "SimpleType",
            "primitiveType": "string"
          },
          "isOptional": false
        }
      ],
      "name": "ConstString",
      "superTypes": [
        {
          "$ref": "#/interfaces@20"
        }
      ]
    }
  ],
  "types": [],
  "usedGrammars": []
}`));var mG={languageId:"my-dsl",fileExtensions:[".rbtdsl"],caseInsensitive:!1},DA={AstReflection:()=>new ru},OA={Grammar:()=>PA(),LanguageMetaData:()=>mG,parser:{}};function LA(t){let e=t.validation.ValidationRegistry,r=t.validation.MyDslValidator,n={Function_:r.ensurefunctionName,Program:r.ensureMainFunctionExists,FunctionCall:r.ensurefunctionCalledExists};e.register(n,r)}var rp=class{ensurefunctionName(e,r){e.FunctionName.charAt(0).match(/[a-z]/)||r("warning","Function name should not becapitalized.",{node:e,property:"FunctionName"}),e.FunctionName.toLowerCase()=="main"&&!e.FunctionName.charAt(0).match(/[a-z]/)&&r("error",'Function main should be written like "main".',{node:e,property:"FunctionName"}),e.FunctionName.toLowerCase()=="setup"&&r("error","Function cant be named setup. it is a reserved word.",{node:e,property:"FunctionName"}),e.FunctionName.toLowerCase()=="loop"&&r("error","Function cant be named loop. it is a reserved word.",{node:e,property:"FunctionName"})}ensurefunctionCalledExists(e,r){for(let n of this.program.function)if(n.FunctionName===e.functionName)return;r("warning",'Function "'+e.functionName+'" does not exist.',{node:e,property:"functionName"})}ensureMainFunctionExists(e,r){this.program=e,e.function.find(n=>n.FunctionName=="main")||r("error","Your program does not contain any main() function.",{node:e,property:"function"})}};function MA(t){let e=t.validation.ValidationRegistry,r=new Jg;e.register(r.checks,r)}var Jg=class{constructor(){this.checks={Program:this.weaveProgram,Function_:this.weaveFunction_,StatementBlock:this.weaveStatmentBlock,Statment:this.weaveStatment,VariableDefinition:this.weaveVaribaleDefinition,ConstNumber:this.weaveConstNumber,ConstBoolean:this.weaveConstBoolean,Addition:this.weaveAddition,Multiplication:this.weaveMultiplication,Soustraction:this.weaveSoustraction,Division:this.weaveDivision,Variable:this.weaveVariable,FunctionCall:this.weaveFunctionCall,FunctionCallParameters:this.weaveFunctionCallParameters,Affectation:this.weaveAffectation,Or:this.weaveOr,And:this.weaveAnd,Not:this.weaveNot,Equals:this.weaveEquals,Ifz:this.weaveIf,RbLoop:this.weaveWhile,LessThan:this.weaveLessThan,MoreThan:this.weaveMoreThan,FunctionDefinitionParameters:this.weaveFunctionDefinitionParameters,Rbreturn:this.weaveReturn,For:this.weaveFor,Number_:this.weaveNumber,Boolean:this.weaveBoolean,Type:this.weaveType,Unit:this.weaveUnit,Forward:this.weaveForward,Rotate:this.weaveRotate,Throw:this.weaveThrow,ConstString:this.weaveConstString}}weaveProgram(e,r){e.accept=n=>n.visitProgram(e)}weaveFunction_(e,r){e.accept=n=>n.visitFunction_(e)}weaveStatmentBlock(e,r){e.accept=n=>n.visitStatmentBlock(e)}weaveStatment(e,r){e.accept=n=>n.visitStatment(e)}weaveExpr(e,r){e.accept=n=>n.visitExpr(e)}weaveVaribaleDefinition(e,r){e.accept=n=>n.visitVariableDefinition(e)}weaveConstNumber(e,r){e.accept=n=>n.visitConstNumber(e)}weaveAddition(e,r){e.accept=n=>n.visitAddition(e)}weaveSoustraction(e,r){e.accept=n=>n.visitSoustraction(e)}weaveMultiplication(e,r){e.accept=n=>n.visitMultiplication(e)}weaveDivision(e,r){e.accept=n=>n.visitDivision(e)}weaveVariable(e,r){e.accept=n=>n.visitVariable(e)}weaveFunctionCall(e,r){e.accept=n=>n.visitFunctionCall(e)}weaveFunctionCallParameters(e,r){e.accept=n=>n.visitFunctionCallParameters(e)}weaveAffectation(e,r){e.accept=n=>n.visitAffectation(e)}weaveConstBoolean(e,r){e.accept=n=>n.visitConstBoolean(e)}weaveOr(e,r){e.accept=n=>n.visitOr(e)}weaveAnd(e,r){e.accept=n=>n.visitAnd(e)}weaveNot(e,r){e.accept=n=>n.visitNot(e)}weaveEquals(e,r){e.accept=n=>n.visitEquals(e)}weaveIf(e,r){e.accept=n=>n.visitif(e)}weaveWhile(e,r){e.accept=n=>n.visitWhile(e)}weaveFor(e,r){e.accept=n=>n.visitFor(e)}weaveMoreThan(e,r){e.accept=n=>n.visitMoreThan(e)}weaveLessThan(e,r){e.accept=n=>n.visitLessThan(e)}weaveFunctionDefinitionParameters(e,r){e.accept=n=>n.visitFunctionDefinitionParameters(e)}weaveReturn(e,r){e.accept=n=>n.visitReturn(e)}weaveBoolean(e,r){e.accept=n=>n.visitBoolean(e)}weaveNumber(e,r){e.accept=n=>n.visitNumber(e)}weaveType(e,r){e.accept=n=>n.visitType(e)}weaveUnit(e,r){e.accept=n=>n.visitUnit(e)}weaveForward(e,r){e.accept=n=>n.visitForward(e)}weaveRotate(e,r){e.accept=n=>n.visitRotate(e)}weaveThrow(e,r){e.accept=n=>n.visitThrow(e)}weaveConstString(e,r){e.accept=n=>n.visitConstString(e)}};var hG={validation:{MyDslValidator:()=>new rp}};function FA(t){let e=bo(Ac(t),DA),r=bo(Cc({shared:e}),OA,hG);return e.ServiceRegistry.register(r),MA(r),LA(r),{shared:e,MyDsl:r}}var gG=new Ea.BrowserMessageReader(self),yG=new Ea.BrowserMessageWriter(self),TG=(0,Ea.createConnection)(gG,yG),{shared:vG}=FA(Object.assign({connection:TG},df));fx(vG);})();
/*! Bundled license information:

lodash-es/lodash.js:
  (**
   * @license
   * Lodash (Custom Build) <https://lodash.com/>
   * Build: `lodash modularize exports="es" -o ./`
   * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
   * Released under MIT license <https://lodash.com/license>
   * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
   * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   *)
*/
