Welcome to Fractal Tinker

This tool allows users to visualize fractal shapes in the complex plane

Setup:
	Requirements: node v16.13.1
				  npm 8.1.2
	clone this repository and run the following command:
		node app.js
	


Functionality:
	Users can specify three parameters
	Zoom: 
		Specifies the bounds of the region to be rendered.
		Zoom specifies the maximum distance from the origon which will be
		rendered. If zoom = 3 (default) then we render 3 units up, down,
		left and right from the origon

	Function:
		In short, the function determines the shape of the fractal
		which in generated.

	Colorwave: 
		this option specifies the colouring schema for the fractal
		being generated. The 3D display visualizes the shape of the
		colorWave. The colour wave is a function parameterized by the
		variable t. For some particular t, the colorwave returns a 3D
	 	coordinate. The 3 values which make up the coordinate correspond
		to the red, green and blue values needed to specify a color.
		
