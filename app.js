const projects={medical:{label:'01 / APPLIED AI · INTERNSHIP',title:'Medical RAG & AI Agents',tags:['LlamaIndex','Weaviate','LangGraph','RAG'],intro:'During my AI internship at iCliniq / Orane Healthcare, I worked on retrieval and agent workflows for medical information applications.',heading:'What I contributed',points:['Built a medical RAG pipeline using LlamaIndex, Weaviate, and cross-encoder reranking for domain-specific information retrieval.','Developed shared LangGraph agent workflows and contributed functionality for medical Q&A, report analysis, drug information retrieval, and specialty classification.','Worked across an interconnected product suite, contributing to both shared infrastructure and individual features.'],note:'Company source code is not public. This overview describes my contributions without sharing proprietary implementation details or claiming clinical validation.'},cities:{label:'02 / QUARK LAB · MACHINE LEARNING',title:'Gun Violence Research',tags:['Python','GeoPandas','Spatial modeling','35 U.S. cities'],intro:'Research into how geographic, community, and built-environment factors relate to recorded gun violence. The work combines spatial features with machine-learning models to investigate patterns across urban areas.',heading:'The work',points:['Contributed to gun-violence research at Arizona State University’s Quark Lab, with study coverage across 35 U.S. cities.','Worked with geographic units and spatial features to investigate how patterns vary across urban environments.','Shared research progress and methods with lab teammates, using discussion and questions to refine the work.'],note:'The research project is complete. This overview does not imply a deployed prediction service, policy adoption, or independently validated real-world outcomes.'},housing:{label:'03 / QUARK LAB · RESEARCH',title:'Homelessness Prediction',tags:['OLS','GWR','Moran’s I','Spatial analysis'],intro:'An exploratory research project examining homelessness alongside community conditions and geographic differences.',heading:'The approach',points:['Analyzed data across 141 Continuums of Care to explore geographic variation.','Used ordinary least squares, geographically weighted regression, and spatial autocorrelation methods to study relationships.','Examined how associations can differ by place, rather than assuming one national relationship describes every community.'],note:'Completed exploratory research. Associations are not causal claims, and this project is not presented as a validated prediction product.'},twitter:{label:'04 / QUARK LAB · ONGOING RESEARCH',title:'Twitter Analysis for Gun-Violence Research',tags:['Llama','Qwen','RoBERTa','NLP'],intro:'An ongoing extension of the gun-violence project: extracting emotion and language features from geolocated tweets for use in gun-violence models. Tweet matching, labeling, and summarization are supporting steps toward that research goal.',heading:'What I’m building',points:['Developed a resumable analysis workflow with structured JSON outputs.','Worked with Llama, Qwen, and RoBERTa to explore language and emotion analysis.','Preparing tweet-derived features to complement geographic predictors; an improvement in prediction has not yet been established.'],note:'Work in progress. No improvement in predictive performance is claimed; evaluation and interpretation remain important next steps.'}};
projects.fitpanda={label:'05 / PERSONAL PROJECT · IN PROGRESS',title:'FitPanda',tags:['Flutter','Google ML Kit','Android'],intro:'A fitness app that connects exercise with earned screen time.',heading:'Implemented so far',points:['Push-up and squat counting and plank timing using Google ML Kit pose detection.','Landmark smoothing and confidence-based tracking checks.','An exercise-to-rewards-to-Android-unlock workflow.'],note:'In development. Real-device tracking accuracy, protection lifecycle behavior, connected account features, and release readiness still need validation. No camera accuracy or FPS claim is made.'};
const dialog=document.querySelector('#project-dialog');let trigger;
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{trigger=button;const p=projects[button.dataset.project];document.querySelector('#dialog-content').innerHTML=`<span class="eyebrow">${p.label}</span><h2 id="dialog-title">${p.title}</h2><div class="dialog-meta">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><p>${p.intro}</p>${p.media ? `<figure class="case-media"><img src="${p.media}" alt="${p.mediaCaption}"><figcaption>${p.mediaCaption}</figcaption></figure>` : ''}<h3>${p.heading}</h3><ul>${p.points.map(t=>`<li>${t}</li>`).join('')}</ul><p class="dialog-note">${p.note}</p>`;dialog.showModal();document.body.classList.add('no-scroll')}));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});dialog.addEventListener('close',()=>{document.body.classList.remove('no-scroll');trigger?.focus()});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});document.querySelectorAll('[data-project]').forEach(p=>p.hidden=button.dataset.filter!=='all'&&!p.dataset.category.split(' ').includes(button.dataset.filter))}));

// Keep all motion optional, short, and independent of the content's visibility.
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
const entranceFrames=[{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'translateY(0)'}];
const animateEntrance=(element,delay=0)=>{if(!motionPreference.matches)element.animate(entranceFrames,{duration:650,delay,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'})};
if('IntersectionObserver' in window){
 const reveal=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){animateEntrance(entry.target);reveal.unobserve(entry.target)}})},{threshold:.12});
 document.querySelectorAll('.intro-grid,.section-title,.project,.about-photo,.about-copy,.timeline article,.toolbox,footer h2,.footer-links').forEach(el=>reveal.observe(el));

}
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.project:not([hidden])').forEach((card,index)=>animateEntrance(card,index*65))}));
const progress=document.createElement('div');progress.className='reading-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
let scrollQueued=false;
const updateProgress=()=>{const total=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${total>0?Math.min(1,Math.max(0,scrollY/total)):0})`;scrollQueued=false};
addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateProgress)}},{passive:true});addEventListener('resize',updateProgress);updateProgress();
// A small portrait response on precise pointers; touch scrolling remains native.
const portrait=document.querySelector('.portrait-wrap');
if(portrait&&matchMedia('(hover:hover) and (pointer:fine)').matches){
 portrait.addEventListener('pointermove',event=>{if(motionPreference.matches)return;const rect=portrait.getBoundingClientRect();const x=(event.clientX-rect.left)/rect.width-.5;const y=(event.clientY-rect.top)/rect.height-.5;portrait.style.translate=`${x*8}px ${y*6}px`});
 portrait.addEventListener('pointerleave',()=>{portrait.style.translate='0px 0px'});
}
motionPreference.addEventListener('change',()=>{if(motionPreference.matches){document.getAnimations().forEach(animation=>animation.finish());if(portrait)portrait.style.translate='0px 0px'}});

// Brief greeting curtain, never blocks interaction or waits for remote assets.
const arrival=document.querySelector('.arrival');
const greeting=document.querySelector('.arrival-word');
let greetingTimers=[];
function playArrival(){
 if(!arrival||motionPreference.matches)return;
 greetingTimers.forEach(clearTimeout);greeting.textContent='Vinay.';
 arrival.style.animation='none';void arrival.offsetWidth;arrival.style.animation='';
 greetingTimers=[];
 document.querySelectorAll('.profile-copy,.profile-photo').forEach(el=>{el.style.animation='none';void el.offsetWidth;el.style.animation=''});
 document.querySelectorAll('.name-line').forEach((el,i)=>{el.animate([{opacity:0,transform:'translateY(55px)'},{opacity:1,transform:'translateY(0)'}],{duration:950,delay:650+i*130,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'})});
}
document.querySelector('.replay-intro')?.addEventListener('click',playArrival);
playArrival();


projects.cities.media='assets/gun-hexagon-map.png';
projects.cities.mediaCaption='Chicago hexagon prototype from the project presentation: landmarks per cell, not gun-violence counts.';
projects.housing.media='assets/homelessness-map.png';
projects.housing.mediaCaption='Original project map: 2021 homelessness counts and 2024 housing affordability. These measures describe different years.';
document.querySelectorAll('[data-open-project]').forEach(b=>b.addEventListener('click',()=>{const card=document.querySelector(`[data-project="${b.dataset.openProject}"]`);if(card){card.click();trigger=b}else{location.href=`portfolio.html?project=${encodeURIComponent(b.dataset.openProject)}`}}));
const photoDialog=document.querySelector('#photo-dialog');let photoTrigger;
document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>{photoTrigger=b;const img=photoDialog.querySelector('img');img.src=b.dataset.photo;img.alt=b.dataset.caption;photoDialog.querySelector('figcaption').textContent=b.dataset.caption;photoDialog.showModal();document.body.classList.add('no-scroll')}));
photoDialog.querySelector('.close-photo').addEventListener('click',()=>photoDialog.close());
photoDialog.addEventListener('close',()=>{document.body.classList.remove('no-scroll');photoTrigger?.focus()});

// Deep links from the home and experience pages retain shareable project context.
const requestedProject=new URLSearchParams(location.search).get("project");
if(requestedProject&&Object.hasOwn(projects,requestedProject))document.querySelector(`[data-project="${requestedProject}"]`)?.click();

