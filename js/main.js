/**
 * Andrew Ryder — Personal Website
 * Minimal, accessible dialog controller and progressive enhancement
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectModals();
});

function initProjectModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const dialogs = document.querySelectorAll('dialog.project-modal');
  let lastFocusedTrigger = null;

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      const dialog = document.getElementById(targetId);

      if (dialog && typeof dialog.showModal === 'function') {
        lastFocusedTrigger = trigger;
        dialog.showModal();

        // Focus the close button for accessibility
        const closeBtn = dialog.querySelector('.modal-close-btn');
        if (closeBtn) {
          closeBtn.focus();
        }
      } else if (dialog) {
        // Fallback for older browsers without native showModal
        dialog.setAttribute('open', '');
      }
    });
  });

  dialogs.forEach(dialog => {
    // Close button click
    const closeButtons = dialog.querySelectorAll('[data-modal-close]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        dialog.close();
      });
    });

    // Close when clicking outside modal (backdrop click)
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );

      if (!isInDialog) {
        dialog.close();
      }
    });

    // Restore focus to opener when dialog closes
    dialog.addEventListener('close', () => {
      if (lastFocusedTrigger) {
        lastFocusedTrigger.focus();
        lastFocusedTrigger = null;
      }
      // If hash was set, remove it cleanly
      if (window.location.hash.startsWith('#modal-')) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });
  });

  // Check URL hash on page load for direct modal deep links
  if (window.location.hash) {
    const hashTarget = window.location.hash.replace('#modal-', '');
    if (hashTarget) {
      const matchingDialog = document.getElementById(`modal-${hashTarget}`);
      if (matchingDialog && typeof matchingDialog.showModal === 'function') {
        matchingDialog.showModal();
      }
    }
  }
}
