import { closeModal, openModal } from './modal';
import regionsArray from '../constants/regionsData';
import { domen, path } from '../constants/link';

function showRegion() {
  const id = localStorage.getItem('siteId') || 'siteMSK';
  const regionName = regionsArray.find(({ siteId }) => siteId === id)?.name;
  const regionSpan = document.querySelectorAll('.js-regionFullName');
  regionSpan.forEach((it) => {
    it.innerHTML = `${regionName}`;
  });
  changeLink(id);
}

function setRegion(cityCode) {
  const regionName = regionsArray.find(({ siteId }) => siteId === cityCode)?.name;
  const regionSpan = document.querySelectorAll('.selected-region__name');
  regionSpan.forEach((it) => {
    it.innerHTML = `${regionName}`;
  });
  localStorage.setItem('siteId', cityCode);
}

function changeLink(cityCode) {
  const linksToChange = document.querySelectorAll('.js-set-regionLink');
  const formattedCode = cityCode.slice(4).toLowerCase();
  linksToChange.forEach((link) => {
    link.href = `https://${formattedCode}.${domen}/${path}`;
  });
}

function chooseRegion() {
  const regionsList = document.querySelectorAll('.js-set-city');
  regionsList.forEach((region) => {
    region.addEventListener('click', () => {
      const cityCode = region.getAttribute('data-area');
      setRegion(cityCode);
      changeLink(cityCode);
      openPopup();
      hideRegionQuestion();
    });
  });
}

function openPopup() {
  const popupLinksList = document.querySelectorAll('.open-popup-modal');
  const regionsList = document.querySelectorAll('.js-set-city');
  popupLinksList.forEach((link) => {
    const { popup } = link.dataset;

    link.addEventListener('click', () => {
      openModal(`#${popup}`);
    });
  });

  regionsList.forEach((link) => {
    link.addEventListener('click', () => {
      const modal = link.closest('.modal-box');
      const { id } = modal;

      closeModal(`#${id}`);
    });
  });
}

function hideRegionQuestion() {
  const id = localStorage.getItem('siteId');
  const regionModalHeader = document.querySelector('.ask-for-region');
  const regionFullName = document.querySelector('.selected-region');
  const regionBlock = document.querySelector('.header__region');
  const defaultRegion = 'siteMSK';
  if (id) {
    regionModalHeader.style.display = 'none';
    regionFullName.classList.remove('hidden');
  } else {
    localStorage.setItem('siteId', defaultRegion);
    regionModalHeader.style.display = 'none';
    regionFullName.classList.remove('hidden');
  }

  regionBlock.classList.add('chosen');
}

function confirmRegion() {
  const regionConfirmButton = document.querySelector('.js-region-ok');
  regionConfirmButton.addEventListener('click', () => {
    hideRegionQuestion();
  });
}

export {
  showRegion,
  openPopup,
  chooseRegion,
  confirmRegion,
};
