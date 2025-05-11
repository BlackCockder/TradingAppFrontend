import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MyPreset = definePreset(Aura, {
  components: {
    inputtext: {
      colorScheme: {
        light: {
          focus: {
            border: {
              color: '#ffffff'
            }
          }
        },
        dark: {
          focus: {
            border: {
              color: '#ffffff'
            }
          }
        }
      }
    }
  }
});
