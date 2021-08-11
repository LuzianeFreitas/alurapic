import Vue from 'vue';

Vue.directive('meu-transform', {
    bind(el, binding, vnode) {
        let current = 0;
        el.addEventListener('dblclick', function() {
            let incremento = binding.value || 90;
            current+=incremento;
            el.style.transform = `rotate(${current}deg)`;
        });

    }
})