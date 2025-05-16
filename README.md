# TradingAppFrontv2

Resuming the TradingApp project on clean install of Angular 19. Strong typing required here, as well as standardized naming convention and code writing.


## Project fuckup to remember 1: Absolute positioned PrimeNG components on fixed DOM elements

When attempting to append absolutely positioned PrimeNG component to DOM element that is fixed or is inside fixed space, we need to reset `top:` and `left:` styles appended by PrimeNG.
Here is a procedure to solve it without using direct DOM access:
1. In TS, create a variable that will contain the corrected style, for example: 
`protected confirmPopoverStyleCorrection: Partial<CSSStyleDeclaration> = {};`. Its need to be set to empty style by initialization.
2. Set `[style]='confirmPopoverStyleCorrection'` to the PrimeNG component that will render the absolutely positioned element
3. Create methods for setting `top:` and `left:` styles, one that sets it and other that resets it, example:
    <pre> protected onPopoverShow(): void {
      this.socialStyleCorrection = { 
        top: '2.625rem', 
        left: '0px' 
      } 
    }</pre>
    <pre> protected onPopoverHide(): void {
      this.socialStyleCorrection = {} 
    }</pre>
4. Assing them to lifecycle hooks of PrimeNG components: `(onShow) = 'onPopoverShow()'`, `(onHide)='onPopoverHide()'`
5. To handle responsiveness (if needed for some reason), you can simply assign string variables to the styles instead of fixed strings.
