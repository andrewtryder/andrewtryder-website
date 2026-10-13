/**
 * Andrew Ryder — Personal Website
 * Minimal, accessible native dialog controller with focus restoration
 */

document.addEventListener('DOMContentLoaded', () => {
  initProjectModals();
});

function initProjectModals() {
  const dialogs = document.querySelectorAll('dialog.project-modal');
  const openers = document.querySelectorAll('a[data-modal-target]');
  const openersByDialog = new WeakMap();

  openers.forEach((opener) => {
    opener.addEventListener('click', (event) => {
      const targetId = opener.getAttribute('data-modal-target');
      const dialog = targetId ? document.getElementById(targetId) : null;

      // Leave the ordinary link intact when a native dialog is unavailable.
      if (!(dialog instanceof HTMLDialogElement) || typeof dialog.showModal !== 'function') return;

      event.preventDefault();
      openersByDialog.set(dialog, opener);
      if (!dialog.open) dialog.showModal();
      dialog.querySelector('.modal-close-btn')?.focus();
    });
  });

  dialogs.forEach(dialog => {
    // Close button click
    const closeButtons = dialog.querySelectorAll('[data-modal-close]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (dialog.open) dialog.close();
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

      if (!isInside && dialog.open) {
        dialog.close();
      }
    });

    // Restore focus to opener when dialog closes (by button, Escape key, or backdrop click)
    dialog.addEventListener('close', () => {
      const opener = openersByDialog.get(dialog);
      if (opener && opener.isConnected) opener.focus();
      openersByDialog.delete(dialog);
    });
  });

  // Check URL hash on page load for direct modal deep links
  const hashTarget = window.location.hash.match(/^#(modal-[\w-]+)$/)?.[1];
  const matchingDialog = hashTarget ? document.getElementById(hashTarget) : null;
  if (matchingDialog instanceof HTMLDialogElement && typeof matchingDialog.showModal === 'function') {
    matchingDialog.showModal();
    matchingDialog.querySelector('.modal-close-btn')?.focus();
  }
}
