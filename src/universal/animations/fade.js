import {
  fadeEnter,
  fadeEnterActive
} from 'universal/styles/animations.less';

export const transitionNames = {
   enter: fadeEnter,
   enterActive: fadeEnterActive,
   leave: 'leave',
   leaveActive: 'leaveActive',
   appear: fadeEnter,
   appearActive: fadeEnterActive
} ;
