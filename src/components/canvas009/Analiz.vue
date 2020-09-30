<template>
    <div>
        <canvas ref="Canvas" width="200" height="200"></canvas>
    </div>
    <!-- <button
		@click="dropdown = !dropdown"
		:style="pos ? {
			pos: pos.type,
			top: pos.top+'px',
			bottom: pos.bottom+'px',
			left: pos.left+'px',
			right: pos.right+'px',
			}: ''"
		:class="'DropBtnId-'+ownID"
		class="GlobalDropBtn"
	>
		<span>{{ text?' '+text:''}}</span>
		<transition name="slide-down-fade">
			<div
				v-if="dropdown === true"
				class="GlobalDropdown shadow-5 bg-grey--3 font-3 br1 t-white px-3 noselect"
				:style="optPos ? {
					top: optPos.top+'px',
					bottom: optPos.bottom+'px',
					left: optPos.left+'px',
					right: optPos.right+'px',
					}: ''"
			>
				<slot></slot>
			</div>
		</transition>
    </button>-->
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component({})
export default class Dropdown extends Vue {
    $refs!: {
        Canvas: HTMLCanvasElement
    }
    // @Prop({ required: true }) readonly ownID: string
    // @Prop({ required: false }) text: string
    // @Prop({ required: false }) pos: { type?, top?, bottom?, right?, left?} /* type means either relative, fixed or absolute */
    // @Prop({ required: false }) optPos: { top?, bottom?, right?, left?} /* Sets the position of the dropdown options */

    mounted () {
        this.createCanvas()
    }

    createCanvas () {
        const Canvas = this.$refs.Canvas
        const width = Canvas.width
        const height = Canvas.height
        const ctx = Canvas.getContext("2d")
        const W = width / 2
        const H = height / 2
        const radius = 20 % W
        const numSides = 5

        ctx.strokeStyle = "rgb(161, 161, 161)"
        ctx.lineWidth = 0.5
        // console.log(W)
        drawRails()
        function drawRails () {
            // for (let i = 1; i < 11; i++){
            // 	let circum = ( Math.PI * 2) * (i * H)
            // 	console.log(circum)
            // 	let sideLength = circum/5
            // 	ctx.moveTo(i * W, i * H)
            // 	ctx.lineTo(W + sideLength, H + )
            // }

            // //   for (let i = 1; i <= 5; i++) {
            //     ctx.beginPath();
            //     ctx.moveTo(W + radius, H);

            //     // for (let j = 1; j <= numSides; j++) {
            //       ctx.lineTo(
            //         W +  radius * Math.cos((1 * 2 * Math.PI) / numSides),
            //         H + radius * Math.sin((1 * 2 * Math.PI) / numSides)
            //       );
            //       ctx.lineTo(
            //         W +  radius * Math.cos((2 * 2 * Math.PI) / numSides),
            //         H + radius * Math.sin((2 * 2 * Math.PI) / numSides)
            //       );
            //       ctx.lineTo(
            //         W +  radius * Math.cos((3 * 2 * Math.PI) / numSides),
            //         H + radius * Math.sin((3 * 2 * Math.PI) / numSides)
            //       );
            //       ctx.lineTo(
            //         W +  radius * Math.cos((4 * 2 * Math.PI) / numSides),
            //         H + radius * Math.sin((4 * 2 * Math.PI) / numSides)
            //       );
            //       ctx.lineTo(
            //         W +  radius * Math.cos((5 * 2 * Math.PI) / numSides),
            //         H + radius * Math.sin((5 * 2 * Math.PI) / numSides)
            //       );
            //     // }
            //     ctx.stroke();
            // //   }
            for (let i = 1; i <= 5; i++)
            {
                ctx.beginPath()
                ctx.moveTo(W + i * radius * Math.cos(0), H + i * radius * Math.sin(0))

                for (let j = 1; j <= numSides; j++)
                {
                    ctx.lineTo(
                        W + i * radius * Math.cos((j * 2 * Math.PI) / numSides),
                        H + i * radius * Math.sin((j * 2 * Math.PI) / numSides)
                    )
                }
                ctx.stroke()
            }

            ctx.strokeStyle = "rgb(126, 174, 190)"
            ctx.fillStyle = "rgba(173, 216, 230, 0.397)"
            ctx.lineWidth = 1

            const values = [ 35, 43, 44, 60, 55, 35 ]
            ctx.beginPath()
            ctx.moveTo(W + values[ 0 ], H)

            for (let i = 0; i <= numSides; i++)
            {
                ctx.lineTo(
                    W + values[ i ] * Math.cos((i * 2 * Math.PI) / numSides),
                    H + values[ i ] * Math.sin((i * 2 * Math.PI) / numSides)
                )
            }
            ctx.fill()
            ctx.stroke()
        }
    }
}
</script>
<style lang="scss" scoped>
canvas {
    border: solid crimson 1px;
    //   color: rgb(126, 174, 190);
}
</style>