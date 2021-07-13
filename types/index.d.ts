import { App, PluginFunction } from 'vue';

export interface ToastObject {
  // html element of the toast
  el: HTMLElement,
  // change text or html of the toast
  text: (text: string) => any,
  // fadeAway the toast. default delay will be 800ms
  goAway: (delay?: number) => any
}

export type ToastPosition = 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left'
export type ToastType = 'success' | 'info' | 'error' | 'default'
export type ToastTheme = 'primary' | 'outline' | 'bubble'
export type ToastIconPack = 'material' | 'fontawesome' | 'custom-class' | 'callback'

export interface ToastAction {
  /**
   * name of action
   */
  text: string,
  /**
   * url of action
   */
  href?: string,
  /**
   * name of material for action
   */
  icon?: string,
  /**
   * custom css class for the action
   */
  class?: string|string[],
  /**
   * Vue Router push parameters
   */
  push?: any,
  /**
   * onClick Function of action
   *
   * @param e
   * @param {ToastObject} toastObject
   * @returns {any}
   */
  onClick?: (e: any, toastObject: ToastObject) => any
}

export interface ToastOptions {
  /**
   * Position of the toast container (default: 'top-right')
   */
  position?: ToastPosition,
  /**
   * Display time of the toast in millisecond
   */
  duration?: number,
  /**
   * Add single or multiple actions to toast explained here
   */
  action?: ToastAction | ToastAction[],
  /**
   * Enable Full Width
   */
  fullWidth?: boolean,
  /**
   * Fits to Screen on Full Width
   */
  fitToScreen?: boolean,
  /**
   * Custom css class name of the toast
   */
  className?: string | string[],
  /**
   * Custom css classes for toast container
   */
  containerClass?: string | string[],
  /**
   * Material icon name as string
   */
  icon?: ((ToastIcon: HTMLElement) => HTMLElement) | string | { name: string, after: boolean },
  /**
   * Type of the Toast ['success', 'info', 'error']. (default: 'default')
   */
  type?: ToastType|string,
  /**
   * Theme of the toast you prefer (default: 'primary')
   */
  theme?: ToastTheme|string,
  /**
   * Trigger when toast is completed
   */
  onComplete?: () => any,
  /**
   * Closes the toast when the user swipes it (default: true)
   */
  closeOnSwipe?: boolean,
  /**
   * Only allows one toast at a time.
   */
  singleton?: boolean,
  /**
   * Icon pack type to be used
   */
  iconPack?: ToastIconPack|string
}

export interface Toasted {
  /**
   * Show a toast with success style
   *
   * @param message
   * @param options
   */
  show (message: string, options?: ToastOptions): ToastObject

  /**
   * Show a toast with success style
   * @param message
   * @param options
   */
  success (message: string, options?: ToastOptions): ToastObject

  /**
   * Show a toast with info style
   *
   * @param message
   * @param options
   */
  info (message: string, options?: ToastOptions): ToastObject

  /**
   * Show a toast with error style
   *
   * @param message
   * @param options
   */
  error (message: string, options?: ToastOptions): ToastObject

  /**
   * register your own toast with options explained here
   *
   * @param name
   * @param message
   * @param options
   */
  register (name: string, message: string | ((payload: any) => string), options?: ToastOptions): void

  /**
   * Clear all toasts
   */
  clear (): boolean
  
  global: any
}

declare class ToastedPlugin {
  static install: PluginFunction<ToastOptions>
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toasted: Toasted
  }
}

export default ToastedPlugin
