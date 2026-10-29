(()=>{
'use strict';
const KEY='kodislovo:lesson-theme';
let selected='dark';
try{selected=localStorage.getItem(KEY)==='light'?'light':'dark'}catch(_){}
const frame=document.getElementById('syntaxConstructorFrame');
function syncFrame(){
 try {
  const doc=frame?.contentDocument;
  if(!doc)return;
  doc.documentElement.dataset.theme=selected;
 }catch(_){}
}
function setTheme(value){
 selected=value==='light'?'light':'dark';
 document.documentElement.dataset.theme=selected;
 try{localStorage.setItem(KEY,selected)}catch(_){}
 document.querySelectorAll('[data-switch-theme]').forEach(b=>{
  const active=b.dataset.switchTheme===selected;
  b.setAttribute('aria-pressed',String(active));
 });
 syncFrame();
}
function init(){
 const hero=document.querySelector('.hero');
 if(!hero)return;
 const group=document.createElement('div');
 group.className='lesson-theme-switch';
 group.setAttribute('role','group');
 group.setAttribute('aria-label','Тема оформления');
 group.innerHTML='<button type="button" data-switch-theme="light" aria-pressed="false">☀ Светлая</button><button type="button" data-switch-theme="dark" aria-pressed="false">☾ Тёмная</button>';
 hero.appendChild(group);
 group.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>setTheme(b.dataset.switchTheme)));
 frame?.addEventListener('load',syncFrame);
 setTheme(selected);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();