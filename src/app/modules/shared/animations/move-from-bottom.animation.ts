import {
  trigger,
  style,
  transition,
  animate, state,
} from '@angular/animations';

export const moveFromBottomAnimation = trigger('moveFromBottom',
  [
    state('in',
      style({
          opacity: 1,
          transform: 'translate(0, 0)'
      })
    ),
    state('out',
      style({
          opacity: 0,
          transform: 'translate(0, 80px)'
      })
    ),
    transition('in => out', animate('0ms')),
    transition('out => in', animate('{{ time }} ease-in-out'))
  ]

);
