// import * as Three from 'three';

// // @ts-ignore
// import vertexShader from './shaders/vertex.glsl';
// // @ts-ignore
// import fragmentShader from './shaders/fragment.glsl';

// interface IOptions {
//     radius: number;
//     widthSegments: number;
//     heightSegments: number;
//     atmosphereScale?: number | { x: number, y: number, z: number };
//     atmosphereColor?: { x: number, y: number, z: number, w: number };
//     atmosphereIntensity?: number;

//     texture: Three.Texture;
// }

// export default class Moon {
//     public group: Three.Group;
//     public moon: Three.Mesh<Three.SphereGeometry, Three.ShaderMaterial>;

//     constructor(scene: Three.Scene, options: IOptions) {
//         this.moon = new Three.Mesh(
//             new Three.SphereGeometry(options.radius, options.widthSegments, options.heightSegments),
//             new Three.ShaderMaterial({
//                 vertexShader,
//                 fragmentShader,
//                 uniforms: {
//                     globeTexture: {
//                         value: options.texture
//                     }
//                 }
//             })
//         );

//         this.atmosphere = new Three.Mesh(
//             new Three.SphereGeometry(options.radius, options.widthSegments, options.heightSegments),
//             new Three.ShaderMaterial({
//                 vertexShader: atmosphereVertexShader,
//                 fragmentShader: atmosphereFragmentShader,
//                 blending: Three.AdditiveBlending,
//                 side: Three.BackSide,
//                 uniforms: {
//                     globeAtmosphere: {
//                         value: options.atmosphereColor == undefined ? new Three.Vector4(0.3, 0.6, 1.0, 1.0) : new Three.Vector4(options.atmosphereColor.x, options.atmosphereColor.y, options.atmosphereColor.z, options.atmosphereColor.w)
//                     },
//                     atmosphereIntensity: {
//                         value: options.atmosphereIntensity ?? 0.6
//                     }
//                 }
//             })
//         );

//         if (typeof options.atmosphereScale === "number") {
//             this.atmosphere.scale.set(options.atmosphereScale, options.atmosphereScale, options.atmosphereScale)
//         } else {
//             if (options.atmosphereScale == undefined) options.atmosphereScale = { x: 1.1, y: 1.1, z: 1.1 };
//             this.atmosphere.scale.set(options.atmosphereScale.x, options.atmosphereScale.y, options.atmosphereScale.z);
//         }

//         this.group = new Three.Group();
//         this.group.add(this.planet);
//         this.group.add(this.atmosphere);

//         scene.add(this.group);
//     }
// }