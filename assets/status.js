const API_URL = 'https://your-bot-host.example.com/api/status';
function set(v,id){var el=document.getElementById(id);if(el)el.textContent=v}
async function loadStatus(){
  try{
    const res=await fetch(API_URL,{cache:'no-store',mode:'cors'});
    const s=await res.json();
    set(s.online?'Online':'Offline','state');
    set(new Date(s.last_update).toLocaleString(),'updated');
    set((s.latency_ms||'—')+' ms','latency');
    set(s.uptime||'—','uptime');
    set((s.servers||'—')+' servers','servers');
    set((s.users||'—')+' users','users');
    set(s.version||'—','version');
    const st=document.getElementById('state');
    if(st){st.style.color=s.online?'#22c55e':'#ef4444'}
  }catch(e){
    set('Unavailable','state');
  }
}
document.addEventListener('DOMContentLoaded',()=>{
  loadStatus();
  var r=document.getElementById('refresh');
  if(r) r.addEventListener('click',loadStatus);
});
