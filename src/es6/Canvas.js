export class Canvas {
    constructor(id, parent, width, height) {
        var canvas = document.createElement('canvas');
        this.id = canvas.id = id;
        this.width = canvas.width = width;
        this.height = canvas.height = height;

        if (parent === 'body') {
            document.body.appendChild(canvas);
        } else {
            document.getElementById(parent).appendChild(canvas);
        }

        this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }

    clear(r, g, b, a) {
        this.gl.viewport(0, 0, this.width, this.height);
        this.gl.clearColor(r, g, b, a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}
