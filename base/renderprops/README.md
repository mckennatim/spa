#renderprops

MouseTrackP(mp) just has a render funtion that renders a mouse component that lists mouse coordinates asn you move the mouse

MouseTrackC(mc) As you can see in line 42, Mouse has a render prop which is a function that sends mouse.x and mouse.y to cat. MouseTrackC renders a div with a Mouse component whose render prop sends its state to Cat. Actually Mouses prop can be named anything as long as it is a function. The code has rendere renamed a dogshit.

so...

MouseTrackC(mc) As you can see in line 42, Mouse has a dogshit prop which is a function returns a Cat component with a mouse prop that has mouse.x and mouse.y. MouseTrackC renders a div with a Mouse component whose dogshit prop sends its state to Cat. Mouse's render function renders a prop called dogshit (which is a function which is given this.state as a parameter)

#render props vs HOC

MouseTrackC uses render props to add Mouse functionality to the Cat component. (its render prop is name dogshit)

withMouse is a HOC that wraps Cat. withMouse uses Mouse and returns it in its render function. 


You can call withMouse with any Compponent and it will get a mouse prop with x and y driven by Mouse listening to onMouse Move

You can put any child under the Mouse component in MouseTrackC with the same results.