/*
options
https://github.com/terwanerik/ScrollTrigger#options
 */
const trigger = new ScrollTrigger.default({
  trigger: {
    once:true,
    toggle: {
      class: {
        in: ['visible', 'is-show'],
        out: ['invisible', 'hide'],
      },
    },
  },
});
trigger.add('[data-trigger]')
