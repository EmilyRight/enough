import { WOW } from './vendor/wow.min';
import detectDevice from './helpers/detectDevice';
import { getCurrentYear } from './helpers/utils';
import GTMEvents from './helpers/gtmEvents';
import { handleFaqOpening } from './helpers/faq';

import {
  chooseRegion, confirmRegion, openPopup, showRegion,
} from './helpers/regions';

const GTM = new GTMEvents();

/// /////// DocReady //////////
document.addEventListener('DOMContentLoaded', () => {
  detectDevice(); // videoTeaser();
  new WOW().init();
  GTM.addEventListeners();
  getCurrentYear();
  goNextSection();
  scrollTeaser(document.querySelector('.section-about'));
  handleFaqOpening();
  showRegion();
  openPopup();
  chooseRegion();
  confirmRegion();
});

function goNextSection() {
  const goNextBtns = document.querySelectorAll('.js-go-next');
  const sectionsList = document.querySelectorAll('section');

  goNextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const btnParentNode = btn.closest('section');
      let sectionToScrollTo;
      sectionsList.forEach((el, index) => {
        if (el === btnParentNode) {
          sectionToScrollTo = sectionsList[index + 1];
          scrollToElement(sectionToScrollTo);
        }
      });
    });
  });
}

function scrollToElement(el) {
  const offs = 0;
  const y = el.getBoundingClientRect().top + window.scrollY + offs;
  window.scrollTo({ top: y, behavior: 'smooth' }); // element.scrollIntoView();
}

// scroll to next if URL contains #about

function scrollTeaser(el) {
  if (window.location.hash === '#about') {
    scrollToElement(el);
  }
}
