Welcome to Fractal Tinker
Fractal Tinker is a tool that allows users to visualize fractal shapes in the complex plane.

Setup
Requirements
Node v16.13.1
NPM 8.1.2
Clone this repository and run the following command:

Copy code
node app.js
Functionality
Users can specify three parameters:

Zoom
Specifies the bounds of the region to be rendered. Zoom specifies the maximum distance from the origin which will be rendered. If zoom = 3 (default) then we render 3 units up, down, left and right from the origin.

Function
In short, the function determines the shape of the fractal which is generated.

Colorwave
This option specifies the colouring schema for the fractal being generated. The 3D display visualizes the shape of the colorWave. The colour wave is a function parameterized by the variable t. For some particular t, the colorwave returns a 3D coordinate. The 3 values which make up the coordinate correspond to the red, green and blue values needed to specify a color.
