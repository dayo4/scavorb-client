<template>
    <div class="CanvasCont flex j-c-center">
        <canvas ref="Canvas" width="400" height="290"></canvas>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component({})
export default class SCHT extends Vue {
    $refs!: {
        Canvas: HTMLCanvasElement
    }

    mounted () {
        this.createCanvas()
    }

    createCanvas () {
        const Canvas = this.$refs.Canvas
        let width = Canvas.width
        const ctx = Canvas.getContext("2d")

        const values = [ 0.93, 0.94, 0.93, 0.90, 0.92, 0.90, 0.72, 0.68, 0.73, 0.51 ]
        const text = [
            'JAVASCRIPT',
            'CSS',
            'HTML',
            'TYPESCRIPT',
            'VUEJS',
            'NODEJS',
            'PYTHON',
            'UI DESIGN',
            'GRAPHICS',
            'PHP'
        ]

        drawRails()
        function drawRails () {

            for (let i = 0; i < values.length; i++)
            {
                ctx.fillStyle = "#bdbdbd"
                ctx.fillRect(0, i * 30, width, 20)
                ctx.fillStyle = "#ad1457"
                ctx.fillRect(0, i * 30, width * values[ i ], 20)
                ctx.fillStyle = "#c2185b"
                ctx.fillRect(0, i * 30, 72, 20)
                ctx.fillStyle = "white"
                ctx.fillText(text[ i ], 3, i * 30 + 13)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
canvas {
    width: 400px;
    border-left: solid crimson 1px;
    //   color: rgb(126, 174, 190);
}
@media only screen and (max-width: 410px) {
    canvas {
        width: 95%;
    }
}
</style>