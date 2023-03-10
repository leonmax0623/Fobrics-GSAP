import '../../node_modules/mouse-follower/src/scss/index.scss';
import '../scss/app.scss';

import gsap from 'gsap';
import Alpine from 'alpinejs';

window.Alpine = Alpine;
Alpine.start();

import barba from '@barba/core';
import preloader from './components/preloader';

import Navbar from './components/navbar';
import { appHeight, wait } from './utils';
import cursor from './components/cursor';
import Header from './animations/header';
import Buttons from './animations/Buttons';
import Concept from './animations/Concept';
import HeightParallax from './animations/HeightParallax';
import Marquee from './animations/Marquee';
import ALine from './animations/ALine';
import Num from './animations/Num';
import Team from './animations/Team';
import Parallax from './animations/Parallax';
import TeamSlide from './components/TeamSlide';
import HistorySlide from './components/HistorySlide';
import Accordion from './components/Accordion';
import ProcessSlide from './components/ProcessSlide';
import ReviewSlide from './components/ReviewSlide';
import Map from './components/Map';
import TextMore from './components/TextMore';
import ProjectMap from './components/ProjectMap';
import ProjectSwiper from './components/ProjectSwiper';
import NewsSlider from './components/NewsSlider';
import Video from './components/Video';
import Footer from './animations/Footer';

window.select = (element, src = document) => src.querySelector(element);
window.selectAll = (elements, src = document) => src.querySelectorAll(elements);
window.getChildIndex = (el, src = document) => Array.from(el.parentNode.children).indexOf(el);
window.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
window.removeClasses = (els, className) => {
  for (let el of els) el.classList.remove(className);
};

const navbar = new Navbar();

window.addEventListener('resize', appHeight);
appHeight();

new preloader(() => {
  runAnimations();

  setTimeout(() => {
    runScrollAnimations();
  }, 1200);
});

barba.hooks.after(() => {
  window.scrollTo(0, 0);
  runAnimations();
  runScrollAnimations();
});

barba.init({
  transitions: [
    {
      name: 'general-transition',
      sync: true,
      once() {},
      async leave(data) {
        const done = this.async();

        if (data.trigger !== 'back' && data.trigger.closest('.navbar')) {
          navbar.close();
          await wait(800);
          done();
        } else {
          const tl = gsap.timeline();

          tl.to('.page-transition', {
            clipPath: 'circle(80% at 50% 50%)',
            duration: 1,
            ease: 'power3.out',
          }).to(
            '.page-transition',
            {
              clipPath: 'circle(80% at 260% 50%)',
              duration: 1,
              ease: 'power3.in',

              onComplete() {
                gsap.set('.page-transition', {
                  clipPath: 'circle(30% at -80% 50%)',
                });
              },
            },
            '-=.2'
          );
          await wait(1200);
          done();
        }
      },
    },
  ],
});

function runAnimations() {
  new Header();
  new Buttons();
  new Concept();
  new HeightParallax();
  new Marquee();
  new TeamSlide();
  new HistorySlide();
  new Accordion();
  new ProcessSlide();
  new ReviewSlide();
  new Map();
  new TextMore();
  new ProjectMap();
  new ProjectSwiper();
  new NewsSlider();
  new Video();
  new Footer();
}

function runScrollAnimations() {
  new ALine();
  new Num();
  new Team();
  new Parallax();
}
