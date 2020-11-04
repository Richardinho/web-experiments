# Parallax Effect
Achieved using a CSS transform, basically scaling it up and translating it back along the z-axis.

Inspired by this article: https://developers.google.com/web/updates/2016/12/performant-parallaxing

## Why you shouldn't use the scroll event
Because scroll events don't occur in a deterministic fashion, thus they don't necessary keep in sync with the user scrolling. (according to Paul Lewis in 2016 anyway. I should check if this is really the case still).

## Why you shouldn't change the Background Position
Because every time this property is changed it needs to be repainted creating a performance bottleneck.

## Calculating the transform values

> Pushing the child element back will cause it to get smaller proportional to the perspective value. You can calculate how much it will need to be scaled up with this equation: (perspective - distance) / perspective. Since we most likely want the parallaxing element to parallax but appear at the size we authored it, it would need to be scaled up in this way, rather than being left as is.



