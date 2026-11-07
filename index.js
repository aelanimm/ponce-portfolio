import headerGif from './assets/header.gif';
import profileImage from './assets/images/profile.jpg';
import './scripts/cursor-trail.js';
import './scripts/portfolio-cursor.js';
import { initRisingInk } from './scripts/rising-ink.js';
import './design/flow-transition.css';
import './design/resume-doodles.css';
import './design/portfolio-cursor.css';

const bootScreen = document.querySelector('#boot-screen');
const bootMessage = document.querySelector('#boot-message');
const bootPercent = document.querySelector('#boot-percent');
const bootSteps = [
  [750, 'LOADING PORTFOLIO ASSETS...', '28%'],
  [1500, 'MOUNTING CREATIVE WORKSPACE...', '61%'],
  [2250, 'PREPARING AYLA_OS DESKTOP...', '86%']
];
bootSteps.forEach(([delay, message, percent]) => setTimeout(() => {
  if (!bootScreen?.isConnected) return;
  bootMessage.textContent = message;
  bootPercent.textContent = percent;
}, delay));
setTimeout(() => {
  if (!bootScreen) return;
  bootMessage.textContent = 'SYSTEM READY';
  bootPercent.textContent = '100%';
  bootScreen.classList.add('is-done');
  setTimeout(() => {
    bootScreen.setAttribute('aria-hidden','true');
    toast('Welcome to my portfolio');
  }, 450);
}, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 250 : 3000);

const sections = [
  {id:'about', label:'About', icon:'⌂', count:'01'},
  {id:'education', label:'Education', icon:'▤', count:'01'},
  {id:'skills', label:'Stack & Skills', icon:'✳', count:'12'},
  {id:'experience', label:'Experience', icon:'◷', count:'03'},
  {id:'projects', label:'Projects', icon:'▣', count:'04'},
  {id:'certifications', label:'Certifications', icon:'✦', count:'—'},
  {id:'contact', label:'Contact', icon:'✉', count:'04'}
];

const tabs = document.querySelector('.tabs');
const sidebar = document.querySelector('.sidebar');
const pageSlider = document.querySelector('#page-slider');
const coverScreen = document.querySelector('#cover-screen');
const desktop = document.querySelector('.desktop');
const taskbar = document.querySelector('.stack-taskbar');
let activeSection = null;
let transitionBusy = false;
const pause = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));
const hoverCardSelector = '.hero, .competency, .ready-card, .impact-card, .resume-item, .edu-card, .showcase-card, .skill-card, .role, .project, .cert, .contact-form-reference, .direct-card, .availability-card, .direct-row, .zine-three article, .zine-projects article, .profile, .memo';
function applyCardHover(root){root.querySelectorAll(hoverCardSelector).forEach(card=>card.classList.add('card-hover'));}
function applyButtonInvert(root){root.querySelectorAll('button:not(.tab):not(.folder), a.task-cta, a.open-link').forEach(button=>{button.classList.add('btn-invert');let color='white';if(button.matches('.task-cta,.send-message'))color='lime';else if(button.matches('.theme-button'))color='pink';else if(button.matches('.copy,.button:not(.secondary)'))color='yellow';button.classList.add(`btn-${color}`);});}
tabs.innerHTML = sections.map(s => `<button class="tab" data-section="${s.id}">${s.label}</button>`).join('');
sidebar.innerHTML = `<div class="profile" role="button" tabindex="0" aria-label="Click to open full resume" aria-haspopup="dialog"><div class="avatar-wrap"><img class="avatar" src="${profileImage}" alt="Ayla Isabel A. Ponce"><i class="beacon"></i></div><div><span class="hybrid">★ IT STUDENT</span><h2>Ayla Isabel A. Ponce</h2><p>4th year BS Information Technology student</p></div><div class="pills"><span class="pill">📍 San Jose del Monte, Bulacan</span><span class="pill">Open to internship</span></div><span class="profile-resume-hint">📄 &nbsp; View Full Resume <small>(Click)</small></span></div><div class="folders"><h3>WORKSPACE / DIRECTORY</h3><button class="folder folder-projects" data-section="projects"><span class="folder-label"><i class="folder-icon"></i>/Projects/Production</span><small>6</small></button><button class="folder folder-skills" data-section="skills"><span class="folder-label"><i class="folder-icon"></i>/Skills/Tech_Arsenal</span><small>16</small></button><button class="folder folder-experience" data-section="experience"><span class="folder-label"><i class="folder-icon"></i>/Career/Timeline.log</span><small>2021-now</small></button></div><div class="memo"><b>✎ DESK NOTE</b>“Build useful systems, make them clear, and keep learning.”</div>`;
sidebar.querySelectorAll('.folder-projects small, .folder-skills small').forEach(badge=>badge.remove());
applyButtonInvert(document);

const resumeModal = document.querySelector('#resume-modal');
applyCardHover(sidebar);
applyCardHover(tabs);
applyCardHover(resumeModal);
const resumeDoodles=document.createElement('div');
resumeDoodles.className='zine-doodles';
resumeDoodles.setAttribute('aria-hidden','true');
resumeDoodles.innerHTML='<span class="zine-doodle-float doodle-star doodle-ink">✧</span><span class="zine-doodle-float doodle-star doodle-pink">★</span><span class="zine-doodle-float doodle-note doodle-pink">𝄞</span><span class="zine-doodle-float doodle-note doodle-ink">♫</span><span class="zine-doodle-float doodle-note doodle-pink">♪</span><pre class="zine-doodle-float doodle-cat doodle-ink"> /&#92;_/&#92;&#10;( o.o )&#10; &gt; ^ &lt;</pre><span class="zine-doodle-float doodle-star doodle-pink">✦</span><span class="zine-doodle-float doodle-heart">♡</span><pre class="zine-doodle-float doodle-cat doodle-pink"> /&#92;_/&#92;&#10;( o.o )&#10; &gt; ^ &lt;</pre><span class="zine-doodle-float doodle-star doodle-ink">✧</span>';
resumeModal.querySelector('.zine-inner')?.prepend(resumeDoodles);
const profileCard = sidebar.querySelector('.profile');
const resumeClose = resumeModal.querySelector('.resume-close');
function openResume(){resumeModal.hidden=false;document.body.classList.add('resume-open');resumeClose.focus();}
function closeResume(){if(resumeModal.hidden)return;resumeModal.hidden=true;document.body.classList.remove('resume-open');profileCard.focus();}
profileCard.addEventListener('click',openResume);
profileCard.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openResume();}});
resumeClose.addEventListener('click',closeResume);
resumeModal.addEventListener('click',event=>{if(event.target===resumeModal)closeResume();});
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeResume();});

const views = {
about: `<div class="section about-home"><div class="hero"><div><span class="welcome-chip">★ &nbsp; INFORMATION TECHNOLOGY · STUDENT</span><h1>Building useful systems with a <em>creative perspective.</em></h1><p class="hero-copy">I’m Ayla Isabel A. Ponce, a 4th year BS Information Technology student seeking a DevOps internship or entry-level role. I plan system process flows in Figma, test features, and create visual content in Canva and Adobe Illustrator. I have experience with Java, Python, HTML, and CSS, and familiarity with GitHub Actions and AWS.</p><div class="hero-links"><button class="button" data-open="projects">Explore my projects &nbsp; →</button><button class="button secondary" data-open="contact">Contact me directly</button></div></div><div class="mascot-frame"><div class="mascot-screen"><img class="hero-mascot" src="${headerGif}" alt="Ayla's animated pink-haired mascot"></div></div></div><div class="competency-heading"><b>›_ CORE COMPETENCIES</b><span>01 // VALUE PROPOSITION</span></div><div class="competencies"><article class="competency"><i>✿</i><h3>QUALITY ASSURANCE</h3><p>Test features, catch issues early, and help ensure reliable releases.</p></article><article class="competency"><i>ϟ</i><h3>DEVOPS & CLOUD</h3><p>Familiar with GitHub Actions and AWS, with a growing interest in deployment workflows.</p></article><article class="competency"><i>◇</i><h3>UI & VISUAL CONTENT</h3><p>Plan process flows in Figma and create visual content with Canva and Adobe Illustrator.</p></article></div><div class="about-bottom"><div class="ready-card"><span class="ready-icon">✳</span><div><b>SEEKING — DEVOPS / ENTRY-LEVEL</b><p>Available for an internship or entry-level opportunity.</p></div><button class="button" data-open="contact">GET IN TOUCH</button></div><div class="impact-card"><b>✦ &nbsp; TOOLKIT</b><div class="focus-items"><span>Code<br><small>Java · Python</small></span><span>Web<br><small>HTML · CSS</small></span><span>Cloud<br><small>AWS · CI</small></span></div></div></div><div class="home-foot"><span>STI COLLEGE FAIRVIEW · BS INFORMATION TECHNOLOGY</span><b>STATUS // OPEN</b></div></div>`,
education: `<div class="section resume-view"><header class="resume-heading"><h2><i></i>Work History &amp; Education</h2><p>A verified chronological journey of leadership, learning, and project work.</p></header><div class="resume-timeline"><article class="resume-item"><div class="resume-meta"><span class="resume-date">2025 — Present</span><span>BYTES</span></div><div class="resume-detail"><h3>Multimedia Committee</h3><p>Created and posted social media content, pubmats, and other creative content for the BYTES organization.</p></div></article><article class="resume-item"><div class="resume-meta"><span class="resume-date plain">2024 — 2025</span><span>BYTES</span></div><div class="resume-detail"><h3>Vice President</h3><p>Helped plan booths and club events with officers and members.</p></div></article><article class="resume-item"><div class="resume-meta"><span class="resume-date green">2022 — 2026</span><span>Expected graduation: July 2027</span></div><div class="resume-detail"><h3>Bachelor of Science in Information Technology</h3><h4>STI College Fairview</h4><p>Coursework in Web Systems, Mobile Systems, Information Assurance, and Capstone Project, with hands-on practice building and testing software. Active member of BYTES, the IT student organization.</p></div></article></div></div>`,
skills: `<div class="section skills-view"><header class="skills-heading"><h2><i></i>Engineered Capabilities &amp; Toolchain</h2><p>Tools and practices from my studies, projects, and student leadership.</p></header><div class="skills-showcase"><article class="showcase-card"><div class="showcase-title"><i class="skill-icon purple">‹/›</i><div><h3>Web &amp; Application Development</h3><small>WEB FUNDAMENTALS // PROGRAMMING</small></div></div><div class="chip-list"><span>HTML / CSS</span><span>Java</span><span>Python</span></div></article><article class="showcase-card"><div class="showcase-title"><i class="skill-icon green">☷</i><div><h3>Cloud, CI &amp; Data Tools</h3><small>DEPLOYMENT // DATA INTEGRITY</small></div></div><div class="chip-list"><span>GitHub Actions</span><span>AWS</span><span>SAP</span><span>Quality Assurance</span></div></article><article class="showcase-card"><div class="showcase-title"><i class="skill-icon coral">✎</i><div><h3>Design &amp; Creative Software</h3><small>FIGMA // VISUAL CONTENT</small></div></div><div class="tool-tiles"><span>✿ &nbsp; Figma</span><span>▦ &nbsp; Canva</span><span>✧ &nbsp; Adobe Illustrator</span><span>⌘ &nbsp; UI flow planning</span></div></article><article class="showcase-card"><div class="showcase-title"><i class="skill-icon yellow">✣</i><div><h3>Working Principles</h3><small>COLLABORATION // PROCESS</small></div></div><ul class="principles"><li><b>Quality focused:</b> Testing features and catching issues before release.</li><li><b>Collaborative:</b> Planning events with officers and members in BYTES.</li><li><b>Creative communication:</b> Preparing social media and visual content for the organization.</li></ul></article></div></div>`,
experience: `<div class="section"><span class="eyebrow">ACTIVITY LOG / STUDENT LEADERSHIP</span><h2>Experience</h2><div class="timeline"><article class="role"><h3>Multimedia Committee</h3><div class="meta">BYTES · 2025 — PRESENT</div><ul><li>Create and post social media content, pubmats, and other creative content for the BYTES organization.</li></ul></article><article class="role"><h3>Vice President</h3><div class="meta">BYTES · 2024 — 2025</div><ul><li>Helped plan booths and club events with officers and members.</li></ul></article></div></div>`,
projects: `<div class="section"><span class="eyebrow">PORTFOLIO / SELECTED PROJECTS</span><h2>Projects</h2><div class="project-grid">${project('▣','Machete Barbershop: Reservation & Operations System','Developed an intuitive booking interface for non-technical users, contributing to a centralized operations platform replacing manual logbooks, spreadsheets, and social media messaging. Supports queue management, cashier process, and real-time financial logging.','2025–2026 · Capstone Project')}${project('✿','PawWiz: AI-Powered Cat Health Assistant','Placed 7th out of 125 participants. Designed UI assets and developed core modules, including pregnancy tracking and customized diet planning for neutered and pregnant cats.','2026 · Hackathon Project')}${project('✦','Aral Space: Quiz Creator & Spaced-Repetition Platform','Built a landing page to onboard users to a spaced-repetition study tool, with an interactive flashcard system and custom text highlighting to reinforce keyword retention.','2026 · Personal Project')}</div></div>`,
certifications: `<div class="section"><span class="eyebrow">CREDENTIALS / CERTIFICATES & EVENTS</span><h2>Certifications</h2><div class="cert-grid"><article class="cert"><div class="cert-badge">✦</div><p>2025 · ASEAN &amp; SAP</p><h3>ASEAN Data Science Explorers 2025: SAP Analytics Cloud</h3><p>Certificate of Participation, Enablement Session and SAP Analytics Cloud training.</p></article><article class="cert"><div class="cert-badge">✦</div><p>2026 · Coding.Kitty</p><h3>#hackthekitty Hackathon</h3><p>Certificate of Participation, World Cat Domination Day.</p></article></div></div>`,
contact: `<div class="section contact-view"><header class="contact-heading"><h2><i></i>Initiate Communication Session</h2><p>Have an opportunity, project, or question? Send me a message below.</p></header><div class="contact-layout"><form class="contact-form contact-form-reference" action="https://formspree.io/f/xdajljao" method="POST"><label for="name">YOUR NAME / COMPANY</label><input id="name" name="name" required placeholder="e.g. Alex Rivera / Company"><label for="email">EMAIL ADDRESS</label><input id="email" name="email" type="email" required placeholder="name@company.com"><label for="inquiry">INQUIRY TYPE</label><select id="inquiry" name="inquiry" required><option value="" disabled selected>Select a reason for reaching out</option><option>DevOps internship</option><option>Entry-level opportunity</option><option>Project collaboration</option><option>Other</option></select><label for="message">PROJECT NOTES / MESSAGE</label><textarea id="message" name="message" required placeholder="Tell me a little about what you have in mind..."></textarea><button class="send-message" type="submit">➤ &nbsp; Send message</button></form><div class="contact-aside"><article class="direct-card"><h3>Direct Contact Channels</h3><p>Feel free to reach out directly through email or professional networks.</p><div class="direct-row"><span>✉ &nbsp; <a href="mailto:aylaponce29@gmail.com">aylaponce29@gmail.com</a></span><button class="copy" data-copy="aylaponce29@gmail.com">Copy</button></div><div class="direct-row"><span>☎ &nbsp; <a href="tel:+639090631799">+63 909 063 1799</a></span><button class="copy" data-copy="+63 909 063 1799">Copy</button></div><div class="direct-row"><span>in &nbsp; <a href="https://www.linkedin.com/in/ayla-ponce-70b348375/" target="_blank" rel="noreferrer">LinkedIn</a></span><a class="open-link" href="https://www.linkedin.com/in/ayla-ponce-70b348375/" target="_blank" rel="noreferrer">Open</a></div><div class="direct-row"><span>⌘ &nbsp; <a href="https://github.com/aelanimm" target="_blank" rel="noreferrer">github.com/aelanimm</a></span><a class="open-link" href="https://github.com/aelanimm" target="_blank" rel="noreferrer">Open</a></div></article><article class="availability-card"><b>▦ &nbsp; AVAILABILITY</b><p>Based in San Jose del Monte City, Bulacan. Open to DevOps internships and entry-level opportunities.</p><span class="available-label"><i></i> AVAILABLE FOR OPPORTUNITIES</span></article></div></div></div>`
};
function meter(name,level){return `<div class="skill-row"><span>${name}</span><span class="mono">${level}%</span></div><div class="meter"><i style="width:${level}%"></i></div>`}
function project(icon,title,description,stack){return `<a class="project card-hover" href="#contact" data-open="contact" aria-label="Ask Ayla about ${title}"><div class="project-art">${icon}</div><div class="project-body"><h3>${title}</h3><p>${description}</p><div class="tags"><span class="tag">${stack}</span></div><div class="project-actions"><span>PORTFOLIO ITEM</span></div></div></a>`}
function setActiveSection(id){document.querySelectorAll('[data-section]').forEach(el=>el.classList.toggle('active',el.dataset.section===id));}
function preparePage(page,id){page.className='section-page';page.dataset.view=id;page.innerHTML=views[id];applyCardHover(page);applyButtonInvert(page);page.querySelectorAll('[data-open]').forEach(el=>el.addEventListener('click',event=>{if(el.tagName==='A')event.preventDefault();showSection(el.dataset.open)}));page.querySelectorAll('[data-copy]').forEach(el=>el.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(el.dataset.copy);toast(el.dataset.copy.includes('909')?'Phone number copied':'Email copied to clipboard')}catch{toast(el.dataset.copy)}}));if(id==='about'){const heading=page.querySelector('.about-home .hero h1');if(heading)initRisingInk(heading)}}
function renderSection(id){const page=document.createElement('div');preparePage(page,id);pageSlider.replaceChildren(page);setActiveSection(id);activeSection=id;}
document.querySelectorAll('.task-cta[data-open]').forEach(el=>el.addEventListener('click',event=>{event.preventDefault();showSection(el.dataset.open)}));
async function showSection(id,animate=true){if(!views[id]||id===activeSection||transitionBusy)return;if(!animate||!activeSection||window.matchMedia('(prefers-reduced-motion: reduce)').matches){renderSection(id);return}transitionBusy=true;pageSlider.classList.add('is-transitioning');const oldPage=pageSlider.querySelector('.section-page');const newPage=document.createElement('div');preparePage(newPage,id);const forward=sections.findIndex(section=>section.id===id)>sections.findIndex(section=>section.id===activeSection);oldPage.classList.add(forward?'flow-exit-left':'flow-exit-right');newPage.classList.add(forward?'flow-enter-right':'flow-enter-left');pageSlider.append(newPage);setActiveSection(id);activeSection=id;await pause(480);oldPage.remove();newPage.classList.remove('flow-enter-right','flow-enter-left');pageSlider.classList.remove('is-transitioning');transitionBusy=false;}
function toast(message){const t=document.querySelector('#toast');t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
function enterOS(section='about'){
  const isAlreadyOpen=document.body.classList.contains('os-open');
  document.body.classList.add('os-open');
  coverScreen.setAttribute('aria-hidden','true');
  if(!isAlreadyOpen)playTaskbarMotion('taskbar-drop');
  showSection(section,false);
}
let systemLoadBusy=false;
function openSystemWithLoader(section='about'){
  if(systemLoadBusy||document.body.classList.contains('os-open'))return;
  systemLoadBusy=true;
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const progress=bootScreen.querySelector('.boot-progress span');
  bootMessage.textContent='LOADING AYLA_OS...';
  bootPercent.textContent='00%';
  bootScreen.setAttribute('aria-hidden','false');
  bootScreen.classList.add('quick-boot');
  bootScreen.classList.remove('is-done');
  progress.style.animation='none';
  void progress.offsetWidth;
  progress.style.animation='';
  setTimeout(()=>{
    bootMessage.textContent='SYSTEM READY';
    bootPercent.textContent='100%';
    enterOS(section);
    bootScreen.classList.add('is-done');
    const finish=()=>{
      bootScreen.setAttribute('aria-hidden','true');
      bootScreen.classList.remove('quick-boot');
      systemLoadBusy=false;
    };
    if(reduceMotion)finish();
    else setTimeout(finish,450);
  },reduceMotion?0:1100);
}
function playTaskbarMotion(animationClass){
  taskbar.classList.remove('taskbar-drop','taskbar-rise');
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  void taskbar.offsetWidth;
  taskbar.classList.add(animationClass);
  taskbar.addEventListener('animationend',()=>taskbar.classList.remove(animationClass),{once:true});
}
document.querySelectorAll('.shortcut-control').forEach(control=>{
  control.addEventListener('click',()=>{
    const tile=control.querySelector('.shortcut-tile');
    tile.classList.remove('shortcut-popping');
    void tile.offsetWidth;
    tile.classList.add('shortcut-popping');
    tile.addEventListener('animationend',()=>tile.classList.remove('shortcut-popping'),{once:true});
  });
});
function returnToCover(){
  if(!document.body.classList.contains('os-open'))return;
  playTaskbarMotion('taskbar-rise');
  document.body.classList.remove('os-open');
  coverScreen.setAttribute('aria-hidden','false');
}
document.querySelector('#cover-window').addEventListener('click',()=>enterOS('about'));
document.querySelector('#enter-os').addEventListener('click',event=>{
  event.stopPropagation();
  openSystemWithLoader('about');
});
document.querySelector('[data-resume]').addEventListener('click',()=>{enterOS('about');openResume()});
document.querySelector('.cover-close').addEventListener('click',event=>{
  event.stopPropagation();
  const card=document.querySelector('#cover-window');
  card.classList.remove('window-rattle');
  void card.offsetWidth;
  card.classList.add('window-rattle');
  card.addEventListener('animationend',()=>card.classList.remove('window-rattle'),{once:true});
});
document.querySelectorAll('.shortcut-control[data-open]').forEach(shortcut=>shortcut.addEventListener('click',()=>enterOS(shortcut.dataset.open)));
document.querySelector('.home-control').addEventListener('click',returnToCover);
document.querySelector('.os-close').addEventListener('click',returnToCover);
document.addEventListener('click',e=>{const button=e.target.closest('[data-section]');if(button)showSection(button.dataset.section)});
function clock(){document.querySelector('#clock').textContent=new Intl.DateTimeFormat('en-PH',{timeZone:'Asia/Manila',hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(new Date())}
clock();setInterval(clock,1000);

const themeButton=document.querySelector('#theme-button');
const themeMenu=document.querySelector('#theme-menu');
themeMenu.querySelectorAll('b, [data-theme-choice], hr').forEach(item=>item.remove());
themeButton.addEventListener('click',()=>{const open=themeMenu.hidden;themeMenu.hidden=!open;themeButton.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('[data-theme-choice]').forEach(button=>button.addEventListener('click',()=>{document.body.dataset.palette=button.dataset.themeChoice;document.querySelectorAll('[data-theme-choice] .check').forEach(check=>check.textContent='');button.querySelector('.check').textContent='✓';}));
document.querySelector('#dark-toggle').addEventListener('click',()=>document.body.classList.toggle('dark-mode'));
document.addEventListener('click',event=>{if(!event.target.closest('.theme-wrap')){themeMenu.hidden=true;themeButton.setAttribute('aria-expanded','false')}});
