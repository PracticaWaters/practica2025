import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-cinema-model',
  standalone: false,
  templateUrl: './cinema-model.html',
  styleUrl: './cinema-model.css',
})
export class CinemaModel implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('rendererContainer', { static: true })
  rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  public model!: THREE.Group;
  private mixer!: THREE.AnimationMixer;
  private clock = new THREE.Clock();
  private animationId!: number;

  private animationPath: THREE.Vector3[] = [
    new THREE.Vector3(0, 2, 3), // Start position - inside the cinema
    new THREE.Vector3(-2, 2, 2), // Left side - higher position
    new THREE.Vector3(-3, 2, 0), // Back left - higher position
    new THREE.Vector3(-2, 1.5, -2), // Back - higher position
    new THREE.Vector3(0, 1.5, -3), // Back center - higher position
    new THREE.Vector3(2, 1.5, -2), // Back right - higher position
    new THREE.Vector3(3, 2, 0), // Right side - higher position
    new THREE.Vector3(2, 2, 2), // Front right - higher position
    new THREE.Vector3(0, 2, 3), // Return to start
  ];

  private currentPathIndex = 0;
  private targetPathIndex = 0;
  private animationProgress = 0;
  private scrollProgress = 0;

  ngOnInit(): void {
    this.initThreeJS();
    this.loadModel();
    this.setupScrollAnimation();
  }

  ngAfterViewInit(): void {
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThreeJS(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a1a);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2.5, 2);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.shadowMap.autoUpdate = true;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 2.0;

    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.enableZoom = false; // fara zoom
    this.controls.enablePan = false;
    this.controls.autoRotate = false;
    this.controls.minPolarAngle = Math.PI * 0.1; // fix pe jos
    this.controls.maxPolarAngle = Math.PI * 0.7; // fix pe sus

    this.setupLighting();

    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    this.scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(0, 8, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 4096;
    mainLight.shadow.mapSize.height = 4096;
    mainLight.shadow.camera.near = 0.1;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -15;
    mainLight.shadow.camera.right = 15;
    mainLight.shadow.camera.top = 15;
    mainLight.shadow.camera.bottom = -15;
    mainLight.shadow.bias = -0.0001;
    mainLight.shadow.normalBias = 0.02;
    this.scene.add(mainLight);

    const screenLight = new THREE.SpotLight(
      0xffffff,
      4.0,
      15,
      Math.PI / 6,
      0.5,
      1
    );
    screenLight.position.set(0, 4, -3);
    screenLight.target.position.set(0, 0, -2);
    screenLight.castShadow = true;
    screenLight.shadow.mapSize.width = 2048;
    screenLight.shadow.mapSize.height = 2048;
    this.scene.add(screenLight);
    this.scene.add(screenLight.target);

    const spotLight1 = new THREE.SpotLight(
      0xffffff,
      3.0,
      10,
      Math.PI / 8,
      0.3,
      1
    );
    spotLight1.position.set(-3, 5, 0);
    spotLight1.target.position.set(-2, 0, 0);
    spotLight1.castShadow = true;
    this.scene.add(spotLight1);
    this.scene.add(spotLight1.target);

    const spotLight2 = new THREE.SpotLight(
      0xffffff,
      3.0,
      10,
      Math.PI / 8,
      0.3,
      1
    );
    spotLight2.position.set(3, 5, 0);
    spotLight2.target.position.set(2, 0, 0);
    spotLight2.castShadow = true;
    this.scene.add(spotLight2);
    this.scene.add(spotLight2.target);

    const spotLight3 = new THREE.SpotLight(
      0xffffff,
      3.0,
      10,
      Math.PI / 8,
      0.3,
      1
    );
    spotLight3.position.set(0, 5, 3);
    spotLight3.target.position.set(0, 0, 2);
    spotLight3.castShadow = true;
    this.scene.add(spotLight3);
    this.scene.add(spotLight3.target);

    const aisleLight1 = new THREE.SpotLight(
      0xffffff,
      2.5,
      8,
      Math.PI / 12,
      0.2,
      1
    );
    aisleLight1.position.set(-1.5, 3, 0);
    aisleLight1.target.position.set(-1.5, 0, 0);
    this.scene.add(aisleLight1);
    this.scene.add(aisleLight1.target);

    const aisleLight2 = new THREE.SpotLight(
      0xffffff,
      2.5,
      8,
      Math.PI / 12,
      0.2,
      1
    );
    aisleLight2.position.set(1.5, 3, 0);
    aisleLight2.target.position.set(1.5, 0, 0);
    this.scene.add(aisleLight2);
    this.scene.add(aisleLight2.target);

    const emergencyLight1 = new THREE.PointLight(0xff3333, 1.0, 6);
    emergencyLight1.position.set(-4, 1.5, -4);
    this.scene.add(emergencyLight1);

    const emergencyLight2 = new THREE.PointLight(0xff3333, 1.0, 6);
    emergencyLight2.position.set(4, 1.5, -4);
    this.scene.add(emergencyLight2);

    const accentLight1 = new THREE.PointLight(0xffaa44, 1.5, 6);
    accentLight1.position.set(-2, 2, 2);
    this.scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0xffaa44, 1.5, 6);
    accentLight2.position.set(2, 2, 2);
    this.scene.add(accentLight2);

    const floorLight1 = new THREE.PointLight(0xffffff, 1.0, 4);
    floorLight1.position.set(-2, 0.1, 0);
    this.scene.add(floorLight1);

    const floorLight2 = new THREE.PointLight(0xffffff, 1.0, 4);
    floorLight2.position.set(2, 0.1, 0);
    this.scene.add(floorLight2);

    const reflectionLight = new THREE.PointLight(0xffffff, 1.5, 6);
    reflectionLight.position.set(0, 1, 1);
    this.scene.add(reflectionLight);

    const extraLight1 = new THREE.PointLight(0xffffff, 2.0, 8);
    extraLight1.position.set(0, 4, 0);
    this.scene.add(extraLight1);

    const extraLight2 = new THREE.PointLight(0xffffff, 2.0, 8);
    extraLight2.position.set(-3, 3, 0);
    this.scene.add(extraLight2);

    const extraLight3 = new THREE.PointLight(0xffffff, 2.0, 8);
    extraLight3.position.set(3, 3, 0);
    this.scene.add(extraLight3);
  }

  private loadModel(): void {
    const loader = new GLTFLoader();

    loader.load(
      'assets/home/3d-models/cinema.glb',
      (gltf: any) => {
        this.model = gltf.scene;

        this.model.traverse((child: any) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child.material) {
              child.material.needsUpdate = true;
              if (child.material.map) {
                child.material.map.anisotropy =
                  this.renderer.capabilities.getMaxAnisotropy();
              }
            }
          }
        });

        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 15 / maxDim;
        this.model.scale.setScalar(scale);

        this.model.position.sub(center.multiplyScalar(scale));

        this.scene.add(this.model);

        if (gltf.animations && gltf.animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(this.model);
          gltf.animations.forEach((clip: any) => {
            this.mixer.clipAction(clip).play();
          });
        }
      },
      (progress: any) => {
        console.log(
          'Loading progress:',
          (progress.loaded / progress.total) * 100 + '%'
        );
      },
      (error: any) => {
        console.error('Error loading model:', error);
      }
    );
  }

  private setupScrollAnimation(): void {
    window.addEventListener('scroll', () => {
      const element = this.rendererContainer.nativeElement;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      const visibleHeight = Math.min(elementHeight, windowHeight);
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - elementTop) / (visibleHeight + windowHeight)
        )
      );

      this.scrollProgress = scrollProgress;

      const rotationAngle = scrollProgress * Math.PI * 2;

      if (this.model) {
        const radius = 4;
        const height = 2.5;

        this.camera.position.x = Math.sin(rotationAngle) * radius;
        this.camera.position.z = Math.cos(rotationAngle) * radius;
        this.camera.position.y = height;

        this.camera.lookAt(this.model.position);
      }
    });
  }

  private updateCameraAnimation(): void {
    if (this.currentPathIndex !== this.targetPathIndex) {
      this.animationProgress += 0.015;

      if (this.animationProgress >= 1) {
        this.currentPathIndex = this.targetPathIndex;
        this.animationProgress = 0;
      } else {
        const currentPos = this.animationPath[this.currentPathIndex];
        const nextPos =
          this.animationPath[
            Math.min(this.currentPathIndex + 1, this.animationPath.length - 1)
          ];

        this.camera.position.lerpVectors(
          currentPos,
          nextPos,
          this.animationProgress
        );

        if (this.camera.position.y < 1.0) {
          this.camera.position.y = 1.0;
        }

        if (this.model) {
          const targetLookAt = new THREE.Vector3();
          targetLookAt.copy(this.model.position);

          const scrollOffset = this.scrollProgress * Math.PI * 2;
          targetLookAt.x += Math.sin(scrollOffset) * 0.5;
          targetLookAt.z += Math.cos(scrollOffset) * 0.5;

          this.camera.lookAt(targetLookAt);
        }
      }
    }
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();

    this.controls.update();

    this.updateCameraAnimation();

    if (this.mixer) {
      this.mixer.update(delta);
    }

    this.renderer.render(this.scene, this.camera);
  }
}
