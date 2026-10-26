// LoTuz UI starter. All blank IPs are intentional; configure real servers in config.js.
const modes = [
  {key:"all",label:"Бүгд",count:25},
  {key:"5v5",label:"5v5",count:10},
  {key:"1v1",label:"1v1",count:3},
  {key:"2v2",label:"2v2",count:3},
  {key:"3v3",label:"3v3",count:3},
  {key:"4v4",label:"4v4",count:3},
  {key:"fun",label:"Fun 5v5",count:3}
];
const mapNames=["de_ancient","de_anubis","de_dust2","de_inferno","de_mirage","de_nuke","de_overpass","de_train","de_vertigo","cs_office","cs_italy","de_cache","de_cbble","de_tuscan","de_season","de_zoo","de_breach","de_edin","de_basalt","de_whistle","de_thera","de_mills"];
const serverDefinitions=[
  ...Array.from({length:10},(_,i)=>({id:i+1,mode:"5v5",map:mapNames[i%8],fun:false})),
  ...Array.from({length:3},(_,i)=>({id:11+i,mode:"1v1",map:["de_mirage","de_dust2","de_aim_map"][i],fun:false})),
  ...Array.from({length:3},(_,i)=>({id:14+i,mode:"2v2",map:["de_dust2","de_inferno","de_ancient"][i],fun:false})),
  ...Array.from({length:3},(_,i)=>({id:17+i,mode:"3v3",map:["de_anubis","de_mirage","de_nuke"][i],fun:false})),
  ...Array.from({length:3},(_,i)=>({id:20+i,mode:"4v4",map:["de_overpass","de_train","de_vertigo"][i],fun:false})),
  ...Array.from({length:3},(_,i)=>({id:23+i,mode:"fun",map:["de_dust2","de_mirage","de_ancient"][i],fun:true}))
];
const servers=serverDefinitions.map(s=>({...s,host:"",port:"27015",status:"offline"}));
const players=[
 {name:"Lotuz",elo:7240,wins:142,losses:58},{name:"NightOwl",elo:6815,wins:126,losses:64},
 {name:"N0va",elo:5900,wins:101,losses:55},{name:"Steppe",elo:4780,wins:83,losses:61},
 {name:"GhostMGL",elo:3990,wins:76,losses:69},{name:"Khan",elo:3180,wins:62,losses:60},
 {name:"Pixel",elo:2460,wins:49,losses:53},{name:"Tenger",elo:1680,wins:35,losses:44},{name:"Rookie",elo:1000,wins:0,losses:0}
];
const skins=[
 {name:"AK-47 | Neon Circuit",type:"Rifle",icon:"◈",rarity:"Custom concept"},
 {name:"AK-47 | Crimson Byte",type:"Rifle",icon:"◈",rarity:"Custom concept"},
 {name:"M4A1-S | Blue Phantom",type:"Rifle",icon:"◇",rarity:"Custom concept"},
 {name:"M4A4 | Arctic Pulse",type:"Rifle",icon:"◇",rarity:"Custom concept"},
 {name:"AWP | Night Signal",type:"Sniper",icon:"⌁",rarity:"Custom concept"},
 {name:"AWP | Solar Flare",type:"Sniper",icon:"⌁",rarity:"Custom concept"},
 {name:"Desert Eagle | Gold Rush",type:"Pistol",icon:"✦",rarity:"Custom concept"},
 {name:"Glock-18 | Cyber Bloom",type:"Pistol",icon:"✧",rarity:"Custom concept"},
 {name:"Karambit | Ice Shard",type:"Knife",icon:"⟋",rarity:"Custom concept"},
 {name:"Butterfly | Redline",type:"Knife",icon:"⟋",rarity:"Custom concept"},
 {name:"M9 Bayonet | Aurora",type:"Knife",icon:"⟋",rarity:"Custom concept"},
 {name:"Gloves | Neon Grid",type:"Gloves",icon:"✣",rarity:"Custom concept"}
];
let modeFilter="all",skinFilter="All",sortDown=true,selectedSkin=skins[0].name;
const $=s=>document.querySelector(s);
function toast(s){let el=$("#toast");el.textContent=s;el.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("show"),3200)}
function rank(elo){return elo>=7000?"GLOBAL":elo>=4500?"DIAMOND":elo>=2500?"GOLD":elo>=1000?"SILVER":"BRONZE"}
function renderFilters(){$("#modeFilters").innerHTML=modes.map(m=>`<button class="filter ${m.key===modeFilter?"active":""}" data-mode="${m.key}">${m.label} <span>${m.count}</span></button>`).join("");document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>{modeFilter=b.dataset.mode;renderFilters();renderServers()})}
function renderServers(){let q=$("#serverSearch").value.toLowerCase();let list=servers.filter(s=>(modeFilter==="all"||s.mode===modeFilter)&&(`lotuz ${String(s.id).padStart(2,"0")} ${s.mode} ${s.map}`.toLowerCase().includes(q)));$("#serverCount").textContent=list.length;$("#serverGrid").innerHTML=list.map(s=>{let addr=s.host?`${s.host}:${s.port}`:"IP тохируулаагүй";let configured=!!s.host;return `<article class="server-card"><div class="server-top"><div><div class="server-name">LoTuz #${String(s.id).padStart(2,"0")}</div><div class="server-map">${s.map}</div></div><span class="mode">${s.mode==="fun"?"FUN 5v5":s.mode}</span></div><div class="server-meta"><span class="status ${configured&&s.status==="online"?"online":""}">● ${configured&&s.status==="online"?"ONLINE (demo)": "OFFLINE / NOT CONFIGURED"}</span><span class="tiny-tag">${s.fun?"Fun mode":"Competitive"}</span><span class="tiny-tag">CS2</span></div><div class="ip-line">IP: ${addr}</div><div class="server-actions"><button class="join" data-join="${s.id}" ${!configured?"disabled":""}>CONNECT ↗</button><button data-copy="${s.id}" ${!configured?"disabled":""}>COPY IP</button><button data-ready="${s.id}">.r / READY</button></div></article>`}).join("")||'<p class="muted">Сервер олдсонгүй.</p>';
document.querySelectorAll("[data-join]").forEach(b=>b.onclick=()=>{let s=servers.find(x=>x.id===+b.dataset.join);if(s?.host)location.href=`steam://connect/${s.host}:${s.port}`});
document.querySelectorAll("[data-copy]").forEach(b=>b.onclick=async()=>{let s=servers.find(x=>x.id===+b.dataset.copy);try{await navigator.clipboard.writeText(`${s.host}:${s.port}`);toast("IP хууллаа")}catch{toast(`${s.host}:${s.port}`)}});
document.querySelectorAll("[data-ready]").forEach(b=>b.onclick=()=>toast("Тоглоом дотор .r командыг ажиллуулахын тулд серверийн plugin тохируулах шаардлагатай."))}
function renderPlayers(){let q=$("#playerSearch").value.toLowerCase();let list=players.filter(p=>p.name.toLowerCase().includes(q)).sort((a,b)=>sortDown?b.elo-a.elo:a.elo-b.elo);$("#leaderboard").innerHTML=list.map((p,i)=>`<tr><td>${i+1}</td><td><span class="player">${p.name}</span><span class="sub">LoTuz player · demo</span></td><td><span class="rank-pill ${p.elo>=7000?"rank-global":""}">${rank(p.elo)}</span></td><td>${p.wins}</td><td>${p.losses}</td><td class="right elo">${p.elo.toLocaleString()}</td></tr>`).join("")||'<tr><td colspan="6">Тоглогч олдсонгүй.</td></tr>'}
function renderSkins(){let cats=["All","Rifle","Sniper","Pistol","Knife","Gloves"];$("#skinCategories").innerHTML=cats.map(c=>`<button class="${skinFilter===c?"active":""}" data-skin-cat="${c}">${c}</button>`).join("");document.querySelectorAll("[data-skin-cat]").forEach(b=>b.onclick=()=>{skinFilter=b.dataset.skinCat;renderSkins()});let list=skins.filter(s=>skinFilter==="All"||s.type===skinFilter);$("#skinGrid").innerHTML=list.map(s=>`<button class="skin-item ${selectedSkin===s.name?"selected":""}" data-skin="${s.name}"><span class="skin-art">${s.icon}</span><strong>${s.name}</strong><small>${s.rarity}</small><span class="select-label">${selectedSkin===s.name?"✓ SELECTED":"SELECT SKIN"}</span></button>`).join("");document.querySelectorAll("[data-skin]").forEach(b=>b.onclick=()=>{selectedSkin=b.dataset.skin;renderSkins()})}
function renderMaps(){$("#mapPool").innerHTML=mapNames.map(m=>`<span class="map-chip">${m}</span>`).join("")}
function setupAdmin(){const select=$("#adminServer");select.innerHTML=servers.map(s=>`<option value="${s.id}">LoTuz #${String(s.id).padStart(2,"0")} — ${s.mode}</option>`).join("");$("#adminMap").innerHTML=mapNames.map(m=>`<option>${m}</option>`).join("");function load(){let s=servers.find(x=>x.id===+select.value);$("#adminMap").value=s.map;$("#adminIp").value=s.host;$("#adminPort").value=s.port;$("#adminStatus").value=s.status}select.onchange=load;load();$("#applyAdmin").onclick=()=>{let s=servers.find(x=>x.id===+select.value);let host=$("#adminIp").value.trim();if(host&&!/^[a-zA-Z0-9.-]+$/.test(host)){toast("IP эсвэл hostname буруу байна.");return}let port=+$("#adminPort").value||27015;if(port<1||port>65535){toast("Port 1–65535 хооронд байх ёстой.");return}s.host=host;s.port=String(port);s.map=$("#adminMap").value;s.status=$("#adminStatus").value;renderServers();toast("Зөвхөн энэ хуудсанд demo тохиргоо шинэчлэгдлээ.")};$("#exportConfig").onclick=()=>{let blob=new Blob([JSON.stringify({servers:servers.map(({id,mode,map,host,port,status,fun})=>({id,mode,map,host,port,status,fun}))},null,2)],{type:"application/json"});let a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="lotuz-demo-config.json";a.click();URL.revokeObjectURL(a.href)}}
$("#serverSearch").addEventListener("input",renderServers);$("#playerSearch").addEventListener("input",renderPlayers);$("#steamLogin").onclick=()=>toast("Steam OpenID backend холбогдоогүй. Steam нууц үгээ энэ сайтад бүү оруул.");$("#adminToggle").onclick=()=>{$("#admin").classList.toggle("hidden");if(!$("#admin").classList.contains("hidden"))$("#admin").scrollIntoView({behavior:"smooth"})};$("#closeAdmin").onclick=()=>$("#admin").classList.add("hidden");$("#saveSkin").onclick=()=>toast(`Сонгосон skin: ${selectedSkin}. Тоглоомд хэрэгжүүлэх server plugin хараахан холбогдоогүй.`);
renderFilters();renderServers();renderPlayers();renderSkins();renderMaps();setupAdmin();
