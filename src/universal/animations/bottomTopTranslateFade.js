import {
  loadingFadeEnter,
  loadingFadeEnterActive
} from 'universal/styles/animations.less';

export const transitionNames = {
   enter: loadingFadeEnter,
   enterActive: loadingFadeEnterActive,
   leave: 'leave',
   leaveActive: 'leaveActive',
   appear: loadingFadeEnter,
   appearActive: loadingFadeEnterActive
} ;
