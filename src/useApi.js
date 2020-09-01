import { inject } from 'vue';

export const VueToastedSymbol = Symbol();

export function useToasted() {
  const VueToasted = inject(VueToastedSymbol);
  if (!VueToasted) throw new Error('No VueToasted provided!!!');

  return VueToasted;
}
