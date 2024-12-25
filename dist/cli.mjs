#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import MagicString from 'magic-string';
import N$1 from 'tty';
import { cyan, magenta } from 'kolorist';

const V$2="known-flag",k$2="unknown-flag",C$1="argument",{stringify:h}=JSON,O$1=/\B([A-Z])/g,v$1=t=>t.replace(O$1,"-$1").toLowerCase(),{hasOwnProperty:D$1}=Object.prototype,w$2=(t,n)=>D$1.call(t,n),L$2=t=>Array.isArray(t),b$2=t=>typeof t=="function"?[t,!1]:L$2(t)?[t[0],!0]:b$2(t.type),d$2=(t,n)=>t===Boolean?n!=="false":n,m$1=(t,n)=>typeof n=="boolean"?n:t===Number&&n===""?Number.NaN:t(n),R$2=/[\s.:=]/,B=t=>{const n=`Flag name ${h(t)}`;if(t.length===0)throw new Error(`${n} cannot be empty`);if(t.length===1)throw new Error(`${n} must be longer than a character`);const r=t.match(R$2);if(r)throw new Error(`${n} cannot contain ${h(r?.[0])}`)},K$1=t=>{const n={},r=(e,o)=>{if(w$2(n,e))throw new Error(`Duplicate flags named ${h(e)}`);n[e]=o;};for(const e in t){if(!w$2(t,e))continue;B(e);const o=t[e],s=[[],...b$2(o),o];r(e,s);const i=v$1(e);if(e!==i&&r(i,s),"alias"in o&&typeof o.alias=="string"){const{alias:a}=o,l=`Flag alias ${h(a)} for flag ${h(e)}`;if(a.length===0)throw new Error(`${l} cannot be empty`);if(a.length>1)throw new Error(`${l} must be a single character`);r(a,s);}}return n},_$2=(t,n)=>{const r={};for(const e in t){if(!w$2(t,e))continue;const[o,,s,i]=n[e];if(o.length===0&&"default"in i){let{default:a}=i;typeof a=="function"&&(a=a()),r[e]=a;}else r[e]=s?o:o.pop();}return r},F$1="--",G$1=/[.:=]/,T$2=/^-{1,2}\w/,N=t=>{if(!T$2.test(t))return;const n=!t.startsWith(F$1);let r=t.slice(n?1:2),e;const o=r.match(G$1);if(o){const{index:s}=o;e=r.slice(s+1),r=r.slice(0,s);}return [r,e,n]},$$1=(t,{onFlag:n,onArgument:r})=>{let e;const o=(s,i)=>{if(typeof e!="function")return !0;e(s,i),e=void 0;};for(let s=0;s<t.length;s+=1){const i=t[s];if(i===F$1){o();const l=t.slice(s+1);r?.(l,[s],!0);break}const a=N(i);if(a){if(o(),!n)continue;const[l,f,g]=a;if(g)for(let c=0;c<l.length;c+=1){o();const u=c===l.length-1;e=n(l[c],u?f:void 0,[s,c+1,u]);}else e=n(l,f,[s]);}else o(i,[s])&&r?.([i],[s]);}o();},E=(t,n)=>{for(const[r,e,o]of n.reverse()){if(e){const s=t[r];let i=s.slice(0,e);if(o||(i+=s.slice(e+1)),i!=="-"){t[r]=i;continue}}t.splice(r,1);}},U$2=(t,n=process.argv.slice(2),{ignore:r}={})=>{const e=[],o=K$1(t),s={},i=[];return i[F$1]=[],$$1(n,{onFlag(a,l,f){const g=w$2(o,a);if(!r?.(g?V$2:k$2,a,l)){if(g){const[c,u]=o[a],y=d$2(u,l),p=(P,A)=>{e.push(f),A&&e.push(A),c.push(m$1(u,P||""));};return y===void 0?p:p(y)}w$2(s,a)||(s[a]=[]),s[a].push(l===void 0?!0:l),e.push(f);}},onArgument(a,l,f){r?.(C$1,n[l[0]])||(i.push(...a),f?(i[F$1]=a,n.splice(l[0])):e.push(l));}}),E(n,e),{flags:_$2(t,o),unknownFlags:s,_:i}};

var DD=Object.create;var m=Object.defineProperty,uD=Object.defineProperties,FD=Object.getOwnPropertyDescriptor,CD=Object.getOwnPropertyDescriptors,tD=Object.getOwnPropertyNames,I$1=Object.getOwnPropertySymbols,ED=Object.getPrototypeOf,L$1=Object.prototype.hasOwnProperty,eD=Object.prototype.propertyIsEnumerable;var W$1=(D,F,u)=>F in D?m(D,F,{enumerable:!0,configurable:!0,writable:!0,value:u}):D[F]=u,p=(D,F)=>{for(var u in F||(F={}))L$1.call(F,u)&&W$1(D,u,F[u]);if(I$1)for(var u of I$1(F))eD.call(F,u)&&W$1(D,u,F[u]);return D},c=(D,F)=>uD(D,CD(F)),nD=D=>m(D,"__esModule",{value:!0});var rD=(D,F)=>()=>(D&&(F=D(D=0)),F);var iD=(D,F)=>()=>(F||D((F={exports:{}}).exports,F),F.exports);var oD=(D,F,u,C)=>{if(F&&typeof F=="object"||typeof F=="function")for(let t of tD(F))!L$1.call(D,t)&&(t!=="default")&&m(D,t,{get:()=>F[t],enumerable:!(C=FD(F,t))||C.enumerable});return D},BD=(D,F)=>oD(nD(m(D!=null?DD(ED(D)):{},"default",{value:D,enumerable:!0})),D);var i=rD(()=>{});var $=iD((LD,N)=>{i();N.exports=function(){return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g};});i();i();i();var v=D=>{var u,C,t;let F=(u=process.stdout.columns)!=null?u:Number.POSITIVE_INFINITY;return typeof D=="function"&&(D=D(F)),D||(D={}),Array.isArray(D)?{columns:D,stdoutColumns:F}:{columns:(C=D.columns)!=null?C:[],stdoutColumns:(t=D.stdoutColumns)!=null?t:F}};i();i();i();i();i();function w$1({onlyFirst:D=!1}={}){let F=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");return new RegExp(F,D?void 0:"g")}function d$1(D){if(typeof D!="string")throw new TypeError(`Expected a \`string\`, got \`${typeof D}\``);return D.replace(w$1(),"")}i();function y$1(D){return Number.isInteger(D)?D>=4352&&(D<=4447||D===9001||D===9002||11904<=D&&D<=12871&&D!==12351||12880<=D&&D<=19903||19968<=D&&D<=42182||43360<=D&&D<=43388||44032<=D&&D<=55203||63744<=D&&D<=64255||65040<=D&&D<=65049||65072<=D&&D<=65131||65281<=D&&D<=65376||65504<=D&&D<=65510||110592<=D&&D<=110593||127488<=D&&D<=127569||131072<=D&&D<=262141):!1}var j=BD($());function g(D){if(typeof D!="string"||D.length===0||(D=d$1(D),D.length===0))return 0;D=D.replace((0, j.default)(),"  ");let F=0;for(let u=0;u<D.length;u++){let C=D.codePointAt(u);C<=31||C>=127&&C<=159||C>=768&&C<=879||(C>65535&&u++,F+=y$1(C)?2:1);}return F}var b$1=D=>Math.max(...D.split(`
`).map(g));var k$1=D=>{let F=[];for(let u of D){let{length:C}=u,t=C-F.length;for(let E=0;E<t;E+=1)F.push(0);for(let E=0;E<C;E+=1){let e=b$1(u[E]);e>F[E]&&(F[E]=e);}}return F};i();var _$1=/^\d+%$/,z$1={width:"auto",align:"left",contentWidth:0,paddingLeft:0,paddingRight:0,paddingTop:0,paddingBottom:0,horizontalPadding:0,paddingLeftString:"",paddingRightString:""},sD=(D,F)=>{var C;let u=[];for(let t=0;t<D.length;t+=1){let E=(C=F[t])!=null?C:"auto";if(typeof E=="number"||E==="auto"||E==="content-width"||typeof E=="string"&&_$1.test(E)){u.push(c(p({},z$1),{width:E,contentWidth:D[t]}));continue}if(E&&typeof E=="object"){let e=c(p(p({},z$1),E),{contentWidth:D[t]});e.horizontalPadding=e.paddingLeft+e.paddingRight,u.push(e);continue}throw new Error(`Invalid column width: ${JSON.stringify(E)}`)}return u};function aD(D,F){for(let u of D){let{width:C}=u;if(C==="content-width"&&(u.width=u.contentWidth),C==="auto"){let n=Math.min(20,u.contentWidth);u.width=n,u.autoOverflow=u.contentWidth-n;}if(typeof C=="string"&&_$1.test(C)){let n=Number.parseFloat(C.slice(0,-1))/100;u.width=Math.floor(F*n)-(u.paddingLeft+u.paddingRight);}let{horizontalPadding:t}=u,E=1,e=E+t;if(e>=F){let n=e-F,o=Math.ceil(u.paddingLeft/t*n),B=n-o;u.paddingLeft-=o,u.paddingRight-=B,u.horizontalPadding=u.paddingLeft+u.paddingRight;}u.paddingLeftString=u.paddingLeft?" ".repeat(u.paddingLeft):"",u.paddingRightString=u.paddingRight?" ".repeat(u.paddingRight):"";let r=F-u.horizontalPadding;u.width=Math.max(Math.min(u.width,r),E);}}var G=()=>Object.assign([],{columns:0});function lD(D,F){let u=[G()],[C]=u;for(let t of D){let E=t.width+t.horizontalPadding;C.columns+E>F&&(C=G(),u.push(C)),C.push(t),C.columns+=E;}for(let t of u){let E=t.reduce((s,l)=>s+l.width+l.horizontalPadding,0),e=F-E;if(e===0)continue;let r=t.filter(s=>"autoOverflow"in s),n=r.filter(s=>s.autoOverflow>0),o=n.reduce((s,l)=>s+l.autoOverflow,0),B=Math.min(o,e);for(let s of n){let l=Math.floor(s.autoOverflow/o*B);s.width+=l,e-=l;}let a=Math.floor(e/r.length);for(let s=0;s<r.length;s+=1){let l=r[s];s===r.length-1?l.width+=e:l.width+=a,e-=a;}}return u}function Z$1(D,F,u){let C=sD(u,F);return aD(C,D),lD(C,D)}i();i();i();var O=10,U$1=(D=0)=>F=>`[${F+D}m`,V$1=(D=0)=>F=>`[${38+D};5;${F}m`,Y=(D=0)=>(F,u,C)=>`[${38+D};2;${F};${u};${C}m`;function AD(){let D=new Map,F={modifier:{reset:[0,0],bold:[1,22],dim:[2,22],italic:[3,23],underline:[4,24],overline:[53,55],inverse:[7,27],hidden:[8,28],strikethrough:[9,29]},color:{black:[30,39],red:[31,39],green:[32,39],yellow:[33,39],blue:[34,39],magenta:[35,39],cyan:[36,39],white:[37,39],blackBright:[90,39],redBright:[91,39],greenBright:[92,39],yellowBright:[93,39],blueBright:[94,39],magentaBright:[95,39],cyanBright:[96,39],whiteBright:[97,39]},bgColor:{bgBlack:[40,49],bgRed:[41,49],bgGreen:[42,49],bgYellow:[43,49],bgBlue:[44,49],bgMagenta:[45,49],bgCyan:[46,49],bgWhite:[47,49],bgBlackBright:[100,49],bgRedBright:[101,49],bgGreenBright:[102,49],bgYellowBright:[103,49],bgBlueBright:[104,49],bgMagentaBright:[105,49],bgCyanBright:[106,49],bgWhiteBright:[107,49]}};F.color.gray=F.color.blackBright,F.bgColor.bgGray=F.bgColor.bgBlackBright,F.color.grey=F.color.blackBright,F.bgColor.bgGrey=F.bgColor.bgBlackBright;for(let[u,C]of Object.entries(F)){for(let[t,E]of Object.entries(C))F[t]={open:`[${E[0]}m`,close:`[${E[1]}m`},C[t]=F[t],D.set(E[0],E[1]);Object.defineProperty(F,u,{value:C,enumerable:!1});}return Object.defineProperty(F,"codes",{value:D,enumerable:!1}),F.color.close="[39m",F.bgColor.close="[49m",F.color.ansi=U$1(),F.color.ansi256=V$1(),F.color.ansi16m=Y(),F.bgColor.ansi=U$1(O),F.bgColor.ansi256=V$1(O),F.bgColor.ansi16m=Y(O),Object.defineProperties(F,{rgbToAnsi256:{value:(u,C,t)=>u===C&&C===t?u<8?16:u>248?231:Math.round((u-8)/247*24)+232:16+36*Math.round(u/255*5)+6*Math.round(C/255*5)+Math.round(t/255*5),enumerable:!1},hexToRgb:{value:u=>{let C=/(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(u.toString(16));if(!C)return [0,0,0];let{colorString:t}=C.groups;t.length===3&&(t=t.split("").map(e=>e+e).join(""));let E=Number.parseInt(t,16);return [E>>16&255,E>>8&255,E&255]},enumerable:!1},hexToAnsi256:{value:u=>F.rgbToAnsi256(...F.hexToRgb(u)),enumerable:!1},ansi256ToAnsi:{value:u=>{if(u<8)return 30+u;if(u<16)return 90+(u-8);let C,t,E;if(u>=232)C=((u-232)*10+8)/255,t=C,E=C;else {u-=16;let n=u%36;C=Math.floor(u/36)/5,t=Math.floor(n/6)/5,E=n%6/5;}let e=Math.max(C,t,E)*2;if(e===0)return 30;let r=30+(Math.round(E)<<2|Math.round(t)<<1|Math.round(C));return e===2&&(r+=60),r},enumerable:!1},rgbToAnsi:{value:(u,C,t)=>F.ansi256ToAnsi(F.rgbToAnsi256(u,C,t)),enumerable:!1},hexToAnsi:{value:u=>F.ansi256ToAnsi(F.hexToAnsi256(u)),enumerable:!1}}),F}var fD=AD(),K=fD;var x$1=new Set(["","\x9B"]),gD=39,R$1="\x07",q$1="[",pD="]",H$1="m",M$1=`${pD}8;;`,J$1=D=>`${x$1.values().next().value}${q$1}${D}${H$1}`,Q=D=>`${x$1.values().next().value}${M$1}${D}${R$1}`,hD=D=>D.split(" ").map(F=>g(F)),S$1=(D,F,u)=>{let C=[...F],t=!1,E=!1,e=g(d$1(D[D.length-1]));for(let[r,n]of C.entries()){let o=g(n);if(e+o<=u?D[D.length-1]+=n:(D.push(n),e=0),x$1.has(n)&&(t=!0,E=C.slice(r+1).join("").startsWith(M$1)),t){E?n===R$1&&(t=!1,E=!1):n===H$1&&(t=!1);continue}e+=o,e===u&&r<C.length-1&&(D.push(""),e=0);}!e&&D[D.length-1].length>0&&D.length>1&&(D[D.length-2]+=D.pop());},cD=D=>{let F=D.split(" "),u=F.length;for(;u>0&&!(g(F[u-1])>0);)u--;return u===F.length?D:F.slice(0,u).join(" ")+F.slice(u).join("")},dD=(D,F,u={})=>{if(u.trim!==!1&&D.trim()==="")return "";let C="",t,E,e=hD(D),r=[""];for(let[o,B]of D.split(" ").entries()){u.trim!==!1&&(r[r.length-1]=r[r.length-1].trimStart());let a=g(r[r.length-1]);if(o!==0&&(a>=F&&(u.wordWrap===!1||u.trim===!1)&&(r.push(""),a=0),(a>0||u.trim===!1)&&(r[r.length-1]+=" ",a++)),u.hard&&e[o]>F){let s=F-a,l=1+Math.floor((e[o]-s-1)/F);Math.floor((e[o]-1)/F)<l&&r.push(""),S$1(r,B,F);continue}if(a+e[o]>F&&a>0&&e[o]>0){if(u.wordWrap===!1&&a<F){S$1(r,B,F);continue}r.push("");}if(a+e[o]>F&&u.wordWrap===!1){S$1(r,B,F);continue}r[r.length-1]+=B;}u.trim!==!1&&(r=r.map(o=>cD(o)));let n=[...r.join(`
`)];for(let[o,B]of n.entries()){if(C+=B,x$1.has(B)){let{groups:s}=new RegExp(`(?:\\${q$1}(?<code>\\d+)m|\\${M$1}(?<uri>.*)${R$1})`).exec(n.slice(o).join(""))||{groups:{}};if(s.code!==void 0){let l=Number.parseFloat(s.code);t=l===gD?void 0:l;}else s.uri!==void 0&&(E=s.uri.length===0?void 0:s.uri);}let a=K.codes.get(Number(t));n[o+1]===`
`?(E&&(C+=Q("")),t&&a&&(C+=J$1(a))):B===`
`&&(t&&a&&(C+=J$1(t)),E&&(C+=Q(E)));}return C};function T$1(D,F,u){return String(D).normalize().replace(/\r\n/g,`
`).split(`
`).map(C=>dD(C,F,u)).join(`
`)}var X=D=>Array.from({length:D}).fill("");function P(D,F){let u=[],C=0;for(let t of D){let E=0,e=t.map(n=>{var a;let o=(a=F[C])!=null?a:"";C+=1,n.preprocess&&(o=n.preprocess(o)),b$1(o)>n.width&&(o=T$1(o,n.width,{hard:!0}));let B=o.split(`
`);if(n.postprocess){let{postprocess:s}=n;B=B.map((l,h)=>s.call(n,l,h));}return n.paddingTop&&B.unshift(...X(n.paddingTop)),n.paddingBottom&&B.push(...X(n.paddingBottom)),B.length>E&&(E=B.length),c(p({},n),{lines:B})}),r=[];for(let n=0;n<E;n+=1){let o=e.map(B=>{var h;let a=(h=B.lines[n])!=null?h:"",s=Number.isFinite(B.width)?" ".repeat(B.width-g(a)):"",l=B.paddingLeftString;return B.align==="right"&&(l+=s),l+=a,B.align==="left"&&(l+=s),l+B.paddingRightString}).join("");r.push(o);}u.push(r.join(`
`));}return u.join(`
`)}function mD(D,F){if(!D||D.length===0)return "";let u=k$1(D),C=u.length;if(C===0)return "";let{stdoutColumns:t,columns:E}=v(F);if(E.length>C)throw new Error(`${E.length} columns defined, but only ${C} columns found`);let e=Z$1(t,E,u);return D.map(r=>P(e,r)).join(`
`)}i();var bD=["<",">","=",">=","<="];function xD(D){if(!bD.includes(D))throw new TypeError(`Invalid breakpoint operator: ${D}`)}function wD(D){let F=Object.keys(D).map(u=>{let[C,t]=u.split(" ");xD(C);let E=Number.parseInt(t,10);if(Number.isNaN(E))throw new TypeError(`Invalid breakpoint value: ${t}`);let e=D[u];return {operator:C,breakpoint:E,value:e}}).sort((u,C)=>C.breakpoint-u.breakpoint);return u=>{var C;return (C=F.find(({operator:t,breakpoint:E})=>t==="="&&u===E||t===">"&&u>E||t==="<"&&u<E||t===">="&&u>=E||t==="<="&&u<=E))==null?void 0:C.value}}

const S=t=>t.replace(/[\W_]([a-z\d])?/gi,(e,r)=>r?r.toUpperCase():""),q=t=>t.replace(/\B([A-Z])/g,"-$1").toLowerCase(),I={"> 80":[{width:"content-width",paddingLeft:2,paddingRight:8},{width:"auto"}],"> 40":[{width:"auto",paddingLeft:2,paddingRight:8,preprocess:t=>t.trim()},{width:"100%",paddingLeft:2,paddingBottom:1}],"> 0":{stdoutColumns:1e3,columns:[{width:"content-width",paddingLeft:2,paddingRight:8},{width:"content-width"}]}};function D(t){let e=!1;return {type:"table",data:{tableData:Object.keys(t).sort((a,i)=>a.localeCompare(i)).map(a=>{const i=t[a],s="alias"in i;return s&&(e=!0),{name:a,flag:i,flagFormatted:`--${q(a)}`,aliasesEnabled:e,aliasFormatted:s?`-${i.alias}`:void 0}}).map(a=>(a.aliasesEnabled=e,[{type:"flagName",data:a},{type:"flagDescription",data:a}])),tableBreakpoints:I}}}const A=t=>!t||(t.version??(t.help?t.help.version:void 0)),C=t=>{const e="parent"in t&&t.parent?.name;return (e?`${e} `:"")+t.name};function R(t){const e=[];t.name&&e.push(C(t));const r=A(t)??("parent"in t&&A(t.parent));if(r&&e.push(`v${r}`),e.length!==0)return {id:"name",type:"text",data:`${e.join(" ")}
`}}function L(t){const{help:e}=t;if(!(!e||!e.description))return {id:"description",type:"text",data:`${e.description}
`}}function T(t){const e=t.help||{};if("usage"in e)return e.usage?{id:"usage",type:"section",data:{title:"Usage:",body:Array.isArray(e.usage)?e.usage.join(`
`):e.usage}}:void 0;if(t.name){const r=[],n=[C(t)];if(t.flags&&Object.keys(t.flags).length>0&&n.push("[flags...]"),t.parameters&&t.parameters.length>0){const{parameters:a}=t,i=a.indexOf("--"),s=i>-1&&a.slice(i+1).some(o=>o.startsWith("<"));n.push(a.map(o=>o!=="--"?o:s?"--":"[--]").join(" "));}if(n.length>1&&r.push(n.join(" ")),"commands"in t&&t.commands?.length&&r.push(`${t.name} <command>`),r.length>0)return {id:"usage",type:"section",data:{title:"Usage:",body:r.join(`
`)}}}}function _(t){return !("commands"in t)||!t.commands?.length?void 0:{id:"commands",type:"section",data:{title:"Commands:",body:{type:"table",data:{tableData:t.commands.map(n=>[n.options.name,n.options.help?n.options.help.description:""]),tableOptions:[{width:"content-width",paddingLeft:2,paddingRight:8}]}},indentBody:0}}}function k(t){if(!(!t.flags||Object.keys(t.flags).length===0))return {id:"flags",type:"section",data:{title:"Flags:",body:D(t.flags),indentBody:0}}}function F(t){const{help:e}=t;if(!e||!e.examples||e.examples.length===0)return;let{examples:r}=e;if(Array.isArray(r)&&(r=r.join(`
`)),r)return {id:"examples",type:"section",data:{title:"Examples:",body:r}}}function H(t){if(!("alias"in t)||!t.alias)return;const{alias:e}=t;return {id:"aliases",type:"section",data:{title:"Aliases:",body:Array.isArray(e)?e.join(", "):e}}}const U=t=>[R,L,T,_,k,F,H].map(e=>e(t)).filter(Boolean),J=N$1.WriteStream.prototype.hasColors();class M{text(e){return e}bold(e){return J?`\x1B[1m${e}\x1B[22m`:e.toLocaleUpperCase()}indentText({text:e,spaces:r}){return e.replace(/^/gm," ".repeat(r))}heading(e){return this.bold(e)}section({title:e,body:r,indentBody:n=2}){return `${(e?`${this.heading(e)}
`:"")+(r?this.indentText({text:this.render(r),spaces:n}):"")}
`}table({tableData:e,tableOptions:r,tableBreakpoints:n}){return mD(e.map(a=>a.map(i=>this.render(i))),n?wD(n):r)}flagParameter(e){return e===Boolean?"":e===String?"<string>":e===Number?"<number>":Array.isArray(e)?this.flagParameter(e[0]):"<value>"}flagOperator(e){return " "}flagName(e){const{flag:r,flagFormatted:n,aliasesEnabled:a,aliasFormatted:i}=e;let s="";if(i?s+=`${i}, `:a&&(s+="    "),s+=n,"placeholder"in r&&typeof r.placeholder=="string")s+=`${this.flagOperator(e)}${r.placeholder}`;else {const o=this.flagParameter("type"in r?r.type:r);o&&(s+=`${this.flagOperator(e)}${o}`);}return s}flagDefault(e){return JSON.stringify(e)}flagDescription({flag:e}){let r="description"in e?e.description??"":"";if("default"in e){let{default:n}=e;typeof n=="function"&&(n=n()),n&&(r+=` (default: ${this.flagDefault(n)})`);}return r}render(e){if(typeof e=="string")return e;if(Array.isArray(e))return e.map(r=>this.render(r)).join(`
`);if("type"in e&&this[e.type]){const r=this[e.type];if(typeof r=="function")return r.call(this,e.data)}throw new Error(`Invalid node type: ${JSON.stringify(e)}`)}}const y=/^[\w.-]+$/,{stringify:d}=JSON,V=/[|\\{}()[\]^$+*?.]/;function w(t){const e=[];let r,n;for(const a of t){if(n)throw new Error(`Invalid parameter: Spread parameter ${d(n)} must be last`);const i=a[0],s=a[a.length-1];let o;if(i==="<"&&s===">"&&(o=!0,r))throw new Error(`Invalid parameter: Required parameter ${d(a)} cannot come after optional parameter ${d(r)}`);if(i==="["&&s==="]"&&(o=!1,r=a),o===void 0)throw new Error(`Invalid parameter: ${d(a)}. Must be wrapped in <> (required parameter) or [] (optional parameter)`);let l=a.slice(1,-1);const f=l.slice(-3)==="...";f&&(n=a,l=l.slice(0,-3));const p=l.match(V);if(p)throw new Error(`Invalid parameter: ${d(a)}. Invalid character found ${d(p[0])}`);e.push({name:l,required:o,spread:f});}return e}function b(t,e,r,n){for(let a=0;a<e.length;a+=1){const{name:i,required:s,spread:o}=e[a],l=S(i);if(l in t)throw new Error(`Invalid parameter: ${d(i)} is used more than once.`);const f=o?r.slice(a):r[a];if(o&&(a=e.length),s&&(!f||o&&f.length===0))return console.error(`Error: Missing required parameter ${d(i)}
`),n(),process.exit(1);t[l]=f;}}function W(t){return t===void 0||t!==!1}function x(t,e,r,n){const a={...e.flags},i=e.version;i&&(a.version={type:Boolean,description:"Show version"});const{help:s}=e,o=W(s);o&&!("help"in a)&&(a.help={type:Boolean,alias:"h",description:"Show help"});const l=U$2(a,n,{ignore:e.ignoreArgv}),f=()=>{console.log(e.version);};if(i&&l.flags.version===!0)return f(),process.exit(0);const p=new M,O=o&&s?.render?s.render:c=>p.render(c),u=c=>{const m=U({...e,...c?{help:c}:{},flags:a});console.log(O(m,p));};if(o&&l.flags.help===!0)return u(),process.exit(0);if(e.parameters){let{parameters:c}=e,m=l._;const g=c.indexOf("--"),v=c.slice(g+1),h=Object.create(null);if(g>-1&&v.length>0){c=c.slice(0,g);const E=l._["--"];m=m.slice(0,-E.length||void 0),b(h,w(c),m,u),b(h,w(v),E,u);}else b(h,w(c),m,u);Object.assign(l._,h);}const $={...l,showVersion:f,showHelp:u};return typeof r=="function"&&r($),{command:t,...$}}function z(t,e){const r=new Map;for(const n of e){const a=[n.options.name],{alias:i}=n.options;i&&(Array.isArray(i)?a.push(...i):a.push(i));for(const s of a){if(r.has(s))throw new Error(`Duplicate command name found: ${d(s)}`);r.set(s,n);}}return r.get(t)}function Z(t,e,r=process.argv.slice(2)){if(!t)throw new Error("Options is required");if("name"in t&&(!t.name||!y.test(t.name)))throw new Error(`Invalid script name: ${d(t.name)}`);const n=r[0];if(t.commands&&y.test(n)){const a=z(n,t.commands);if(a)return x(a.options.name,{...a.options,parent:t},a.callback,r.slice(1))}return x(void 0,t,e,r)}

var name = "fix-verbatimModuleSyntax";
var version = "0.0.0-semantic-release";

const parseTsconfig = (tsconfigPath) => {
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (configFile.error) {
    throw new Error(ts.formatDiagnostic(configFile.error, ts.createCompilerHost({})));
  }
  const parsedCommandLine = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(tsconfigPath)
  );
  if (parsedCommandLine.errors.length > 0) {
    throw new Error(ts.formatDiagnostics(parsedCommandLine.errors, ts.createCompilerHost({})));
  }
  return parsedCommandLine;
};
const fixVerbatimModuleSyntax = (tsconfigPath) => {
  const resolvedTsconfigPath = ts.sys.resolvePath(tsconfigPath);
  if (!ts.sys.fileExists(resolvedTsconfigPath)) {
    throw new Error(`tsconfig not found: ${resolvedTsconfigPath}`);
  }
  const tsconfig = parseTsconfig(resolvedTsconfigPath);
  const options = {
    ...tsconfig?.options,
    skipLibCheck: true,
    module: ts.ModuleKind.Preserve,
    verbatimModuleSyntax: true
  };
  const program = ts.createProgram({
    rootNames: tsconfig.fileNames,
    options
  });
  const files = /* @__PURE__ */ new Map();
  const diagnostics = ts.getPreEmitDiagnostics(program);
  if (diagnostics.length === 0) {
    return files;
  }
  for (const {
    code,
    file,
    start,
    length
  } of diagnostics) {
    if (
      // Import verbatimModuleSyntax errors
      code === 1484 || code === 1205
    ) {
      const { text, fileName } = file;
      let found = files.get(fileName);
      if (!found) {
        found = {
          ms: new MagicString(text),
          importNames: []
        };
        files.set(fileName, found);
      }
      const importName = text.slice(start, start + length);
      found.importNames.push(importName);
      found.ms.appendLeft(start, "type ");
    }
  }
  return files;
};
(async () => {
  const argv = Z({
    name,
    version,
    parameters: ["[tsconfig path]"],
    flags: {
      dry: {
        type: Boolean,
        description: "Print changes without writing to disk"
      }
    }
  });
  const tsconfigPath = argv._.tsconfigPath ?? "tsconfig.json";
  const fixes = fixVerbatimModuleSyntax(tsconfigPath);
  const { dry } = argv.flags;
  const cwd = process.cwd();
  for (const [filePath, { ms, importNames }] of fixes) {
    if (!dry) {
      fs.writeFileSync(filePath, ms.toString());
    }
    console.log(cyan(path.relative(cwd, filePath)));
    console.log(
      "  ",
      dry ? "Should add type to:" : "Adding type to:",
      importNames.map(magenta).join(", ")
    );
    console.log();
  }
})().catch((error) => {
  process.exitCode = 1;
  console.error("Error:", error.message);
});
