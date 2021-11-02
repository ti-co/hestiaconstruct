const navBar = document.getElementById('navbar');
const closedNavHeight = navBar.offsetHeight; 
const y = window.matchMedia("(max-width: 800px)");
let start; 
let dist;



smoothScroll();
function smoothScroll() {
	var links = document.getElementsByTagName('a');
	for (let i = 0; i < links.length; i++) {
		const link = links[i];
		if ((link.href && link.href.indexOf('#') != -1) && ((link.pathname == location.pathname) || ('/' + link.pathname == location.pathname)) && (link.search == location.search)) {
			link.onclick = scrollAnchors;
		}
	}
}

function scrollAnchors(e, respond = null) {
  let scrollDist; 
  let progress;
  let prevTime = 0; 
  let currentLapse;
  let refactor;e
  
  var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
	const targetAnchor = document.querySelector(targetID);
	if (!targetAnchor) return;
	let distanceToTop = el => {
    if (navBar.classList.contains('sticky-top') && targetAnchor !== navBar) {
      return Math.floor(el.getBoundingClientRect().top - closedNavHeight);
    } else {
      return Math.floor(el.getBoundingClientRect().top); 
      }
  }
	e.preventDefault();
  scrollDist = distanceToTop(targetAnchor); 
  const maxScrollDist = footer.getBoundingClientRect().bottom - window.innerHeight + 35; 
  maxScrollDist < scrollDist ? scrollDist = maxScrollDist : scrollDist = scrollDist;
  window.requestAnimationFrame(() => {
    scrollSmooth()  
  });
  
  function scrollSmooth(timestamp) {
    let atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    let atTop = window.pageYOffset <= 0; 
    let arrived;
    let noMoreScroll;
    prevTime = timestamp;
    timestamp = new Date().getTime();
    if (start === undefined) {start = timestamp};
    if (dist === undefined) {
      scrollDist > 0? dist = scrollDist + closedNavHeight : dist = scrollDist - closedNavHeight;
    };
    if (progress === undefined) {progress = 0};
    const scrollDuration = Math.max(Math.abs(Math.floor(dist/2.4))+200, 300); 
    let elapsed = timestamp - start;
    prevTime? currentLapse = timestamp - prevTime : currentLapse = 15 ; 
    if (Math.abs(progress) < Math.abs(dist)) {
      let factor = dist/scrollDuration*currentLapse; 
      let progression = elapsed/scrollDuration;
      const easing = easeInOut(progression);
      refactor = factor*easing; 
    } else {
      refactor = dist/scrollDuration*15;
    }
       
    dist > 0? f = Math.min(refactor, distanceToTop(targetAnchor)) : f = Math.max(refactor, distanceToTop(targetAnchor)); 
    window.scrollBy({
      top: f,
      left: 0,
    });
    progress += f;
    dist>0? arrived = distanceToTop(targetAnchor) <= 0 : arrived = distanceToTop(targetAnchor) >= 0 ; 
    dist > 0? noMoreScroll = atBottom : noMoreScroll = atTop; 
    if (!arrived && !noMoreScroll) {
      window.requestAnimationFrame (()=>{
        scrollSmooth(timestamp);
      });   
    } else {
        dist = undefined;
        start = undefined;
        window.cancelAnimationFrame(scrollSmooth);
      }   
  }

  function easeInOut(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }
}

const toggleNavButton = () => {
  if (y.matches) {
    const navButton = document.getElementById('navbutton'); 
    navButton.click();
  }  
}

const formControls = document.getElementsByClassName('form-control');
const emptyForm = () => {
  let i = 0;
  setTimeout(() => {
    for (i=0; i<formControls.length-1; i++) {
      formControls[i].value = formControls[i].placeholder;
    }
  }, 1000) 
}

 
