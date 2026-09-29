
  document.addEventListener('DOMContentLoaded', () => {
    // 1. HERO 5-IMAGE AUTO-CYCLING SLIDESHOW
    const slides = document.querySelectorAll('#hero-slideshow-container .hero-slide');
    if (slides.length > 0) {
      let currentSlide = 0;
      setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
      }, 3800);
    }

    // 2. MODAL CONTROLS & LOGIC
    const modal = document.getElementById('partner-modal');
    const modalBackdrop = document.getElementById('partner-modal-backdrop');
    const modalCloseBtn = document.getElementById('partner-modal-close');
    const openModalBtns = document.querySelectorAll('.btn-open-partner-modal');
    const openMessageModalBtns = document.querySelectorAll('.btn-open-message-modal');

    const tabBtnSchedule = document.getElementById('tab-btn-schedule');
    const tabBtnMessage = document.getElementById('tab-btn-message');
    const tabLineSchedule = document.getElementById('tab-line-schedule');
    const tabLineMessage = document.getElementById('tab-line-message');
    const tabPanelSchedule = document.getElementById('tab-panel-schedule');
    const tabPanelMessage = document.getElementById('tab-panel-message');
    const feedbackToast = document.getElementById('modal-feedback-toast');

    function openModal(defaultTab = 'schedule') {
      if (!modal) return;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
      if (defaultTab === 'message') {
        switchToMessageTab();
      } else {
        switchToScheduleTab();
      }
      if (feedbackToast) feedbackToast.classList.add('hidden');
    }

    function closeModal() {
      if (!modal) return;
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    function switchToScheduleTab() {
      tabPanelSchedule.classList.remove('hidden');
      tabPanelMessage.classList.add('hidden');
      tabBtnSchedule.classList.add('text-stone-900', 'font-semibold');
      tabBtnSchedule.classList.remove('text-stone-500');
      tabBtnMessage.classList.add('text-stone-500');
      tabBtnMessage.classList.remove('text-stone-900', 'font-semibold');
      tabLineSchedule.classList.replace('bg-transparent', 'bg-[#725b24]');
      tabLineMessage.classList.replace('bg-[#725b24]', 'bg-transparent');
    }

    function switchToMessageTab() {
      tabPanelSchedule.classList.add('hidden');
      tabPanelMessage.classList.remove('hidden');
      tabBtnMessage.classList.add('text-stone-900', 'font-semibold');
      tabBtnMessage.classList.remove('text-stone-500');
      tabBtnSchedule.classList.add('text-stone-500');
      tabBtnSchedule.classList.remove('text-stone-900', 'font-semibold');
      tabLineMessage.classList.replace('bg-transparent', 'bg-[#725b24]');
      tabLineSchedule.classList.replace('bg-[#725b24]', 'bg-transparent');
    }

    openModalBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('schedule');
    }));

    openMessageModalBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('message');
    }));

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });

    if (tabBtnSchedule) tabBtnSchedule.addEventListener('click', switchToScheduleTab);
    if (tabBtnMessage) tabBtnMessage.addEventListener('click', switchToMessageTab);

    // Date & Time interactive slot pickers
    const dateButtons = document.querySelectorAll('.date-slot-btn');
    dateButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        dateButtons.forEach(b => {
          b.className = 'date-slot-btn py-2 px-1 rounded-lg border border-stone-200 hover:border-stone-400 bg-white text-stone-800 font-medium text-xs transition-colors';
        });
        btn.className = 'date-slot-btn py-2 px-1 rounded-lg border border-[#725b24] bg-[#725b24]/10 text-stone-900 font-medium text-xs transition-colors';
      });
    });

    const timeButtons = document.querySelectorAll('.time-slot-btn');
    timeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        timeButtons.forEach(b => {
          b.className = 'time-slot-btn py-2.5 rounded-lg border border-stone-200 hover:border-stone-400 bg-white text-stone-700 font-medium text-xs transition-colors flex items-center justify-center gap-1';
        });
        btn.className = 'time-slot-btn py-2.5 rounded-lg border border-[#725b24] bg-[#725b24]/10 text-stone-900 font-medium text-xs transition-colors flex items-center justify-center gap-1';
      });
    });

    // Form feedback handlers
    const scheduleForm = document.getElementById('schedule-call-form');
    if (scheduleForm) {
      scheduleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (feedbackToast) feedbackToast.classList.remove('hidden');
        setTimeout(() => closeModal(), 2200);
      });
    }

    const messageForm = document.getElementById('send-message-form');
    if (messageForm) {
      messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (feedbackToast) feedbackToast.classList.remove('hidden');
        setTimeout(() => closeModal(), 2200);
      });
    }

    // Careers Modal Logic
    const careersModal = document.getElementById('careers-modal');
    const careersBackdrop = document.getElementById('careers-modal-backdrop');
    const careersClose = document.getElementById('careers-modal-close');
    const careersDismiss = document.getElementById('careers-modal-dismiss');
    const careersTriggers = document.querySelectorAll('.btn-open-careers-modal');

    function openCareers() {
      if (!careersModal) return;
      careersModal.classList.remove('hidden');
      careersModal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    function closeCareers() {
      if (!careersModal) return;
      careersModal.classList.add('hidden');
      careersModal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    careersTriggers.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCareers();
    }));

    if (careersClose) careersClose.addEventListener('click', closeCareers);
    if (careersDismiss) careersDismiss.addEventListener('click', closeCareers);
    if (careersBackdrop) careersBackdrop.addEventListener('click', closeCareers);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && careersModal && !careersModal.classList.contains('hidden')) {
        closeCareers();
      }
    });

    // Smooth scroll anchors
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#' || !href || href === '#careers') return;
        const targetId = href.slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  });

