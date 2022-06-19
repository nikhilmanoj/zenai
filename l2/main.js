Vue.component('ti-ripple-button', {
	props: ['text'],
	data: function() {
		return {
			ripples: []
		}
	},
	methods: {
		animateRipple: function(e) {
			let el  = this.$refs.tiBtn;
			let pos = el.getBoundingClientRect();
			
			this.ripples.push({
				x: e.clientX - pos.left,
				y: e.clientY - pos.top,
				show: true
			});
		},
		rippleEnd: function(i) {
			this.ripples[i].show = false;
		}
	},
	template: `
<button class="ti-btn" ref="tiBtn" v-on:click="animateRipple">
	{{text}}
	<transition-group>
		<span
			class="ripple"
			v-bind:ref="'ripple-' + i"
			v-bind:key="'ripple' + i"
			v-for="(val, i) in ripples"
			v-if="val.show === true"
			v-bind:style="{'top': val.y + 'px', 'left': val.x + 'px'}"
			v-on:animationend="rippleEnd(i)">
		</span>
	</transition-group>
</button>
`
});

var app = new Vue({
	el: '#app'
});
