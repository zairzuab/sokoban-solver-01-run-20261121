import fs from"node:fs";
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output",N=2e6;
function P(t){let s=t.replace(/\n/g,""),w=t.indexOf("\n"),a=new Uint8Array(s.length),g=[],b=[],p=0;for(let i=0;i<s.length;i++){let c=s[i];if(c=="#")a[i]=1;if(".*+".includes(c))g.push(i);if("$*".includes(c))b.push(i);if("@+".includes(c))p=i}return[w,a,g,b,p]}
function V(L){let[w,a,g]=L,E=[-1,1,-w,w],v=new Uint8Array(a.length),q=[...g];for(let i=0;i<q.length;i++){let x=q[i];v[x]=1;for(let d of E){let y=x-d;if(!a[y]&&!a[y-d]&&!v[y]){v[y]=1;q.push(y)}}}return v}
function S(L){let[w,a,g,b,p]=L,n=a.length;let v=V(L),E=[-1,1,-w,w];if(b.some(x=>!v[x]))return null;let K=(p,bs)=>{let k=p;for(let x of bs)k=k*n+x;return k},P=[p],Bs=[b],A=[-1],T=[""],C=[0],Mx=new Map([[K(p,b),0]]),Q=new Array(8e6),h=4e6,t=4e6;Q[t++]=0;let F=-1;while(h<t){let s=Q[h++];if(Mx.get(K(P[s],Bs[s]))!==s)continue;if(Bs[s].every(x=>g.includes(x))){F=s;break}let pl=P[s],bs=Bs[s],co=C[s];for(let k=0;k<4;k++){let d=E[k],q=pl+d;if(a[q])continue;let nb=bs,pu=0,mv="lrud"[k],at=bs.indexOf(q);if(at>=0){let tt=q+d;if(a[tt]||bs.includes(tt)||!v[tt])continue;nb=bs.slice();nb[at]=tt;nb.sort((x,y)=>x-y);pu=1}let kk=K(q,nb);if(Mx.has(kk)&&C[Mx.get(kk)]<=co+pu)continue;if(P.length>=N)return null;let ns=P.length;P.push(q);Bs.push(nb);A.push(s);T.push(mv);C.push(co+pu);Mx.set(kk,ns);if(pu)Q[t++]=ns;else Q[--h]=ns}}if(F<0)return null;let m="";for(let s=F;s>0;s=A[s])m=T[s]+m;return{moves:m,player:P[F]}}
function C(L){let[w,a,g,b,p]=L,n=a.length,c=new Int16Array(n),RB=[[],[],[],[]],RG=[[],[],[],[]];
for(let i=0;i<n;i++){let y=(i/w)|0;c[i]=((i%w-1)/7|0)*2+(y>8)}
for(let x of b)if(c[x]>=0)RB[c[x]].push(x);
for(let x of g)if(c[x]>=0)RG[c[x]].push(x);
let ok=b.length==g.length;for(let k=0;k<4;k++)if(RB[k].length!=RG[k].length)ok=false;
if(!ok){RB=[b];RG=[g]}
return{RB,RG}}
function G(L){let R=C(L),p=L[4],m="",RB=R.RB,RG=R.RG;for(let k=0;k<RB.length;k++){if(!RB[k].length)continue;let a=L[1].slice();for(let j in RB)if(j!=k)for(let x of RB[j])a[x]=1;let s=S([L[0],a,RG[k],RB[k],p]);if(!s)return null;m+=s.moves;p=s.player;RB[k]=RG[k]}return{moves:m}}
for(let d of fs.readdirSync(I)){let s=G(P(fs.readFileSync(I+"/"+d+"/level.txt","utf8")));fs.mkdirSync(O+"/"+d,{recursive:true});fs.writeFileSync(O+"/"+d+"/solution.txt",(s?s.moves:"")+"\n")}
