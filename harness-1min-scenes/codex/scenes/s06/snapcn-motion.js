/* Small browser port of @snapcn/answer-stream and @snapcn/text-swap.
 * Both original registry files are archived under assets/*.reference.json.
 * Frames converted to seconds; Remotion Bezier replaced by GSAP CustomEase.
 */
gsap.registerPlugin(CustomEase);
CustomEase.create('textSwapEnter', '.2,.6,.35,1');
CustomEase.create('textSwapExit', '1,.65,.85,1');
const clamp01=x=>Math.max(0,Math.min(1,x));
function shotBScale(t,start,duration,from,undershoot,recover){
  if(t<=start)return from;
  const bottom=1-undershoot,u=clamp01((t-start)/duration);
  if(u<1)return from+(bottom-from)*gsap.parseEase('power2.inOut')(u);
  return bottom+undershoot*clamp01((t-start-duration-3/30)/recover);
}
function perspectiveScale(travel,maxScale){
  if(maxScale<=1)return 1;
  return 1/(1-(1-1/maxScale)*Math.min(Math.max(travel,0),.9999));
}
window.snapcnMotion={
  shotBScale,perspectiveScale,
  text:{scale:.82,blur:9,duration:16/30,ease:'textSwapEnter'},
  answer:{macroZoom:2.36,macroX:.571,macroY:.591,pullbackFrom:1.364,undershoot:.028,focusY:-.548,cardGap:3.5/30,fillDelay:4/30},
};
