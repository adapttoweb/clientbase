//NOT USED
import { ToastOptions } from 'ng2-toastr/ng2-toastr';

export class CustomOptions extends ToastOptions {
  toastLife: 3000;
  dismiss: 'auto';
  newestOnTop: false;
  showCloseButton: true;
  maxShown: 1;
  positionClass: 'toast-top-full-width';
  messageClass: 'toast-message';
  titleClass: 'toast-title';
  // animate: 'fadeOut';
  enableHTML: true;
  // titleClass = '';
}
