/**
 * Andrew Ryder — Personal Website
 * Minimal, accessible native dialog controller with focus restoration
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectModals();
});

function initProjectModals() {
  const dialogs = document.querySelectorAll('dialog.project-modal');
  let lastFocusedTrigger = null;

  // Delegated click handler for modal openers
  document.addEventListener('click', (e) => {
    // Check if clicked element or parent is a modal trigger or project card
    const trigger = e.target.closest('[data-modal-target]');
    if (!trigger) return;

    // Prevent navigation for modal triggers when JS is active
    e.preventDefault();

    const targetId = trigger.getAttribute('data-modal-target');
    const dialog = document.getElementById(targetId);
    if (!dialog) return;

    // Save focused element for restoration upon close
    lastFocusedTrigger = trigger.matches('a, button') ? trigger : trigger.querySelector('a, button') || trigger;

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();

      // Set focus to the close button for keyboard accessibility
      const closeBtn = dialog.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.focus();
      }
    } else {
      // Fallback for browsers without native showModal support
      dialog.setAttribute('open', '');
    }
  });

  dialogs.forEach(dialog => {
    // Close button click
    const closeButtons = dialog.querySelectorAll('[data-modal-close]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        dialog.close();
      });
    });

    // Close when clicking directly on the backdrop (outside dialog contents)
    dialog.addEventListener('click', (e) => {
      // In native HTML <dialog>, clicks on the backdrop have e.target === dialog
      if (e.target !== dialog) return;

      const rect = dialog.getBoundingClientRect();
      const isInside = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );

      if (!isInside) {
        dialog.close();
      }
    });

    // Restore focus to opener when dialog closes (by button, Escape key, or backdrop click)
    dialog.addEventListener('close', () => {
      if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
        lastFocusedTrigger.focus();
        lastFocusedTrigger = null;
      }

      // If URL hash matches this modal, clear it cleanly
      if (window.location.hash.startsWith('#modal-')) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });
  });

  // Check URL hash on page load for direct modal deep links
  if (window.location.hash && window.location.hash.startsWith('#modal-')) {
    const hashTarget = window.location.hash.replace('#modal-', '');
    if (hashTarget) {
      const matchingDialog = document.getElementById(`modal-${hashTarget}`);
      if (matchingDialog && typeof matchingDialog.showModal === 'function') {
        matchingDialog.showModal();
        const closeBtn = matchingDialog.querySelector('.modal-close-btn');
        if (closeBtn) {
          closeBtn.focus();
        }
      }
    }
  }
}
