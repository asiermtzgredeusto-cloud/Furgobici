// zonas.js · Días de zona. Se carga desde furgobici.html con <script src="zonas.js"></script> justo antes de </body>
(async()=>{
 let Z=[];try{Z=await rpc("zone_days",{})}catch(e){return}
 if(!Z||!Z.length)return;                       // sin zonas configuradas: todo abierto
 const DIAS=["domingo","lunes","martes","miércoles","jueves","viernes","sábado"],orig=window.slots;
 window.slots=async function(){
  const dv=$("#date").value,box=$("#slots");
  if(dv){const dow=new Date(dv+"T00:00").getDay(),town=$("#town").value;
   if(!Z.some(z=>z.dow==dow&&z.town==town)){hour=null;
    const hoy=Z.filter(z=>z.dow==dow).map(z=>z.town),dias=[...new Set(Z.filter(z=>z.town==town).map(z=>DIAS[z.dow]))];
    box.innerHTML=`<small>${dias.length?`En ${esc(town)} atendemos: ${dias.join(", ")}.`:`Por ahora no atendemos ${esc(town)}.`}${hoy.length?` Ese ${DIAS[dow]} vamos a: ${hoy.map(esc).join(", ")}.`:""}</small>`;return}}
  return orig();
 };
 $("#date").onchange=window.slots;$("#town").onchange=window.slots;window.slots();
})();
