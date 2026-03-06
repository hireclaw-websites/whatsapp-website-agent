const phone='15551234567';
const defaultText='Hi — I want to build a website in WhatsApp.';

document.querySelectorAll('.js-wa').forEach(link=>{
  const text=encodeURIComponent(link.dataset.text||defaultText);
  link.href=`https://wa.me/${phone}?text=${text}`;
  link.target='_blank';
  link.rel='noopener';
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add('in');
  });
},{threshold:.14});

document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const preview=document.getElementById('heroPreview');
const chat=[...document.querySelectorAll('#heroChat .msg')];
const els={
  kicker:document.getElementById('heroKicker'),
  title:document.getElementById('heroTitle'),
  text:document.getElementById('heroText'),
  button:document.getElementById('heroButton'),
  status:document.getElementById('heroStatus'),
  b1:document.getElementById('heroBlock1'),
  m1:document.getElementById('heroMeta1'),
  b2:document.getElementById('heroBlock2'),
  m2:document.getElementById('heroMeta2'),
  b3:document.getElementById('heroBlock3'),
  m3:document.getElementById('heroMeta3')
};

const states=[
  {accent:'#7b61ff',kicker:'DRAFT 01',title:'Night Cart Coffee',text:'Small-batch espresso for markets, late events, and office pop-ins.',button:'Chat to book',status:'structure built',blocks:[['Menu','Espresso • Oat latte • Cold brew'],['Events','Weddings • launches • markets'],['Location','Weekly route + live map']]},
  {accent:'#7b61ff',kicker:'DRAFT 02',title:'Night Cart Coffee',text:'One-page homepage drafted with hero, offer, and contact path.',button:'Preview CTA',status:'draft expanded',blocks:[['Hero','Offer + headline'],['About','What makes it distinct'],['Contact','Direct path to inquire']]},
  {accent:'#1f6fff',kicker:'EDIT APPLIED',title:'Night Cart Coffee',text:'Darker visual system added. Menu and map sections inserted.',button:'See menu',status:'style + sections updated',blocks:[['Menu','Signature drinks + prices'],['Map','Markets, route, and pop-ins'],['Hours','Late service schedule']]},
  {accent:'#25d366',kicker:'CTA UPDATED',title:'Night Cart Coffee',text:'WhatsApp is now the main action across the page.',button:'Open WhatsApp',status:'chat CTA wired',blocks:[['Bookings','Primary WhatsApp action'],['Events','Quick inquiry path'],['Reviews','Proof close to CTA']]},
  {accent:'#25d366',kicker:'READY TO PUBLISH',title:'Night Cart Coffee',text:'Mobile-ready draft complete with sections, action, and launch path.',button:'Publish site',status:'preview ready',blocks:[['Menu','Prices, drinks, and upsells'],['Map','Where to find the cart'],['Publish','Domain + launch setup']]}
];

let step=0;
const applyState=i=>{
  const s=states[i];
  preview.style.setProperty('--accent',s.accent);
  els.kicker.textContent=s.kicker;
  els.title.textContent=s.title;
  els.text.textContent=s.text;
  els.button.textContent=s.button;
  els.status.textContent=s.status;
  els.b1.textContent=s.blocks[0][0];
  els.m1.textContent=s.blocks[0][1];
  els.b2.textContent=s.blocks[1][0];
  els.m2.textContent=s.blocks[1][1];
  els.b3.textContent=s.blocks[2][0];
  els.m3.textContent=s.blocks[2][1];
  chat.forEach((msg,idx)=>msg.classList.toggle('is-on',idx<=i));
};

applyState(0);
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  setInterval(()=>{
    step=(step+1)%states.length;
    applyState(step);
  },2200);
}

document.querySelectorAll('.faq details').forEach(item=>{
  item.addEventListener('toggle',()=>{
    if(!item.open) return;
    document.querySelectorAll('.faq details').forEach(other=>{
      if(other!==item) other.open=false;
    });
  });
});