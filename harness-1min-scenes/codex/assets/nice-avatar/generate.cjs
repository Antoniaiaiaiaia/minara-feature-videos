// Actual react-nice-avatar 1.5.0 component, prerendered for the offline GSAP scene.
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const {default: Avatar, genConfig} = require('react-nice-avatar');
const {writeFileSync} = require('node:fs');
const common = {earSize:'small',hatStyle:'none',hatColor:'#262a30',hairColorRandom:false,isGradient:false,eyeBrowStyle:'up',noseStyle:'short',mouthStyle:'smile'};
const agents = {
  rhea:{sex:'woman',faceColor:'#F9C9B6',hairStyle:'womanLong',hairColor:'#34302e',eyeStyle:'smile',glassesStyle:'none',shirtStyle:'polo',shirtColor:'#6d9c88',bgColor:'#cbded3'},
  atlas:{sex:'man',faceColor:'#AC6651',hairStyle:'thick',hairColor:'#25282b',eyeStyle:'oval',glassesStyle:'none',shirtStyle:'hoody',shirtColor:'#758ca9',bgColor:'#c4d3df'},
  noor:{sex:'woman',faceColor:'#F9C9B6',hairStyle:'womanShort',hairColor:'#633f36',eyeStyle:'circle',glassesStyle:'round',shirtStyle:'short',shirtColor:'#bda17b',bgColor:'#e3d8c8'},
  sable:{sex:'man',faceColor:'#F9C9B6',hairStyle:'normal',hairColor:'#c8cbd4',eyeStyle:'oval',glassesStyle:'square',shirtStyle:'polo',shirtColor:'#827b9e',bgColor:'#d3cee2'},
};
const markup=Object.fromEntries(Object.entries(agents).map(([key,config])=>[key,renderToStaticMarkup(React.createElement(Avatar,{...genConfig({...common,...config}),className:'nice-avatar',style:{width:'100%',height:'100%'}}))]));
writeFileSync(__dirname+'/avatars.js','/* react-nice-avatar 1.5.0, MIT; regenerate with node generate.cjs */\nconst niceAvatarMarkup='+JSON.stringify(markup)+';\n');
