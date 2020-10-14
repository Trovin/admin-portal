import {
  trigger,
  state,
  style,
  transition,
  animate,
  group
} from '@angular/animations';

export const toggleSlideAnimation = [
  trigger('slideInOut', [

    state('in', style({
      maxHeight: '100px',
      opacity: '1'
    })),

    state('out', style({
      maxHeight: '0px',
      opacity: '0'
    })),

    transition('in => out', [group([
        animate('400ms ease-in-out', style({
          opacity: '0'
        })),
        animate('600ms ease-in-out', style({
          maxHeight: '0px'
        }))
      ]
    )]),

    transition('out => in', [group([
        animate('600ms ease-in-out', style({
          maxHeight: '100px'
        })),
        animate('800ms ease-in-out', style({
          opacity: '1'
        }))
      ]
    )])
  ])

];
