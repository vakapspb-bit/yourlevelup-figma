"use strict";
const data = JSON.parse(document.getElementById('lesson-data').textContent);
const q = document.getElementById('recall'); let round=0, selected=null, score=0;
let quiz = [];
function shuffled(list){const a=[...list];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function startQuiz(){round=0;score=0;quiz=shuffled(data.quiz).map(v=>({question:v[0],choices:shuffled(v[1].map((text,i)=>({text,correct:i===v[2]}))),why:v[3]}));renderQuiz();}
function renderQuiz(){selected=null;q.replaceChildren();
 const status=document.createElement('div');status.className='quiz-status';status.textContent='Вопрос '+(round+1)+' из '+quiz.length+' • Верных ответов: '+score;q.append(status);
 const title=document.createElement('h3');title.textContent=quiz[round].question;q.append(title);
 const opts=document.createElement('div');opts.className='quiz-options';
 quiz[round].choices.forEach((c,i)=>{const b=document.createElement('button');b.type='button';b.className='quiz-option';b.textContent=c.text;b.setAttribute('aria-pressed','false');b.addEventListener('click',()=>{selected=i;opts.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));check.disabled=false;});opts.append(b);});q.append(opts);
 const feedback=document.createElement('p');feedback.className='quiz-feedback';feedback.setAttribute('aria-live','polite');q.append(feedback);
 const bar=document.createElement('div');bar.className='quiz-bar';const check=document.createElement('button');check.type='button';check.className='button';check.textContent='Проверить';check.disabled=true;
 const next=document.createElement('button');next.type='button';next.className='button secondary';next.textContent=round===quiz.length-1?'Результат':'Следующий вопрос';next.hidden=true;
 check.addEventListener('click',()=>{if(selected===null)return;const ok=quiz[round].choices[selected].correct;if(ok)score++;feedback.textContent=(ok?'Верно. ':'Попробуй запомнить: ')+quiz[round].why;opts.querySelectorAll('button').forEach((b,i)=>{b.disabled=true;if(quiz[round].choices[i].correct)b.classList.add('correct');else if(i===selected)b.classList.add('wrong');});check.hidden=true;next.hidden=false;next.focus();});
 next.addEventListener('click',()=>{round++;if(round<quiz.length){renderQuiz();q.querySelector('h3').setAttribute('tabindex','-1');q.querySelector('h3').focus();}else{q.replaceChildren();const h=document.createElement('h3');h.textContent='Верных ответов: '+score+' из '+quiz.length;q.append(h);const p=document.createElement('p');p.textContent='Можно переходить к инструментам и практике.';q.append(p);const again=document.createElement('button');again.className='button';again.textContent='Повторить';again.onclick=startQuiz;q.append(again);}});bar.append(check,next);q.append(bar);
}
startQuiz();
const checks=[...document.querySelectorAll('#final-checks input')];function progress(){document.getElementById('progress').textContent='Проверено: '+checks.filter(x=>x.checked).length+' из '+checks.length;}checks.forEach(x=>x.addEventListener('change',progress));progress();
document.querySelectorAll('[data-demo-mode]').forEach(b=>b.addEventListener('click',()=>{const demo=document.getElementById('live-demo');document.querySelectorAll('[data-demo-mode]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));demo.className='live-demo '+b.dataset.demoMode;document.getElementById('demo-status').textContent=b.dataset.description;}));
const longer=document.getElementById('long-title');if(longer)longer.addEventListener('click',()=>{const isLong=longer.getAttribute('aria-pressed')!=='true';longer.setAttribute('aria-pressed',String(isLong));document.getElementById('auto-title').textContent=isLong?'Встреча клуба: создаём новый визуальный проект':'Встреча клуба';document.getElementById('demo-status').textContent=isLong?'Высота выросла вместе с текстом. Отступы сохранены.':'Короткое название: отступы те же.';});
document.querySelectorAll('[data-screen]').forEach(b=>b.addEventListener('click',()=>{const target=b.dataset.screen;document.querySelectorAll('.prototype-screen').forEach(s=>s.hidden=s.id!==target);document.getElementById('demo-status').textContent='Экран: '+({home:'Главная',event:'Встреча',about:'О клубе'})[target];}));
document.querySelectorAll('.course-menu').forEach(m=>{m.addEventListener('keydown',e=>{if(e.key==='Escape'){m.open=false;m.querySelector('summary').focus();}});document.addEventListener('click',e=>{if(!m.contains(e.target))m.open=false;});});
