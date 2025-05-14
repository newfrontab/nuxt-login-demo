export default function initFireworks() {
  // Type definitions
  interface Position {
    x: number;
    y: number;
  }

  interface Speed {
    x: number;
    y: number;
  }

  interface Radius {
    x: number;
    y: number;
  }

  type Direction = "left" | "right";
  type RadiusYDirection = "up" | "down";

  interface ConfettiConfig {
    confettiesNumber?: number;
    confettiRadius?: number;
    confettiColors?: string[];
    emojies?: string[];
    svgIcon?: string | null;
  }

  interface ConfettiConstructorParams {
    initialPosition: Position;
    direction: Direction;
    radius: number;
    colors: string[];
    emojis: string[];
    svgIcon: string | null;
  }

  // Utility functions grouped into a single object
  const Utils = {
    // Parse pixel values to numeric values
    parsePx: (value: string): number => parseFloat(value.replace(/px/, "")),

    // Generate a random number between two values, optionally with a fixed precision
    getRandomInRange: (
      min: number,
      max: number,
      precision: number = 0,
    ): number => {
      const multiplier = Math.pow(10, precision);
      const randomValue = Math.random() * (max - min) + min;
      return Math.floor(randomValue * multiplier) / multiplier;
    },

    // Pick a random item from an array
    getRandomItem: <T>(array: T[]): T =>
      array[Math.floor(Math.random() * array.length)],

    // Scaling factor based on screen width
    getScaleFactor: (): number => Math.log(window.innerWidth) / Math.log(1920),

    // Debounce function to limit event firing frequency
    debounce: (func: (...args: any[]) => void, delay: number) => {
      let timeout: NodeJS.Timeout | undefined;
      return (...args: any[]): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
      };
    },
  };

  // Precomputed constants
  const DEG_TO_RAD = Math.PI / 180;

  // Centralized configuration for default values
  const defaultConfettiConfig: Required<ConfettiConfig> = {
    confettiesNumber: 250,
    confettiRadius: 6,
    confettiColors: [
      "#fcf403",
      "#62fc03",
      "#f4fc03",
      "#03e7fc",
      "#03fca5",
      "#a503fc",
      "#fc03ad",
      "#fc03c2",
    ],
    emojies: [],
    svgIcon: null, // Example SVG link
  };

  // Confetti class representing individual confetti pieces
  class Confetti {
    speed: Speed;
    finalSpeedX: number;
    rotationSpeed: number;
    dragCoefficient: number;
    radius: Radius;
    initialRadius: number;
    rotationAngle: number;
    emojiRotationAngle: number;
    radiusYDirection: RadiusYDirection;
    absCos: number;
    absSin: number;
    position: Position;
    initialPosition: Position;
    color: string | null;
    emoji: string | null;
    svgIcon: HTMLImageElement | null;
    svgImage?: HTMLImageElement;
    createdAt: number;
    direction: Direction;

    constructor({
      initialPosition,
      direction,
      radius,
      colors,
      emojis,
      svgIcon,
    }: ConfettiConstructorParams) {
      const speedFactor =
        Utils.getRandomInRange(0.9, 1.7, 3) * Utils.getScaleFactor();
      this.speed = { x: speedFactor, y: speedFactor };
      this.finalSpeedX = Utils.getRandomInRange(0.2, 0.6, 3);
      this.rotationSpeed =
        emojis.length || svgIcon
          ? 0.01
          : Utils.getRandomInRange(0.03, 0.07, 3) * Utils.getScaleFactor();
      this.dragCoefficient = Utils.getRandomInRange(0.0005, 0.0009, 6);
      this.radius = { x: radius, y: radius };
      this.initialRadius = radius;
      this.rotationAngle =
        direction === "left"
          ? Utils.getRandomInRange(0, 0.2, 3)
          : Utils.getRandomInRange(-0.2, 0, 3);
      this.emojiRotationAngle = Utils.getRandomInRange(0, 2 * Math.PI);
      this.radiusYDirection = "down";

      const angle =
        direction === "left"
          ? Utils.getRandomInRange(82, 15) * DEG_TO_RAD
          : Utils.getRandomInRange(-15, -82) * DEG_TO_RAD;
      this.absCos = Math.abs(Math.cos(angle));
      this.absSin = Math.abs(Math.sin(angle));

      const offset = Utils.getRandomInRange(-150, 0);
      const position = {
        x:
          initialPosition.x +
          (direction === "left" ? -offset : offset) * this.absCos,
        y: initialPosition.y - offset * this.absSin,
      };

      this.position = { ...position };
      this.initialPosition = { ...position };
      this.color =
        emojis.length || svgIcon ? null : Utils.getRandomItem(colors);
      this.emoji = emojis.length ? Utils.getRandomItem(emojis) : null;
      this.svgIcon = null;

      // Preload SVG if provided
      if (svgIcon) {
        this.svgImage = new Image();
        this.svgImage.src = svgIcon;
        this.svgImage.onload = () => {
          this.svgIcon = this.svgImage!; // Mark as ready once loaded
        };
      }

      this.createdAt = Date.now();
      this.direction = direction;
    }

    draw(context: CanvasRenderingContext2D): void {
      const { x, y } = this.position;
      const { x: radiusX, y: radiusY } = this.radius;
      const scale = window.devicePixelRatio;

      if (this.svgIcon) {
        context.save();
        context.translate(scale * x, scale * y);
        context.rotate(this.emojiRotationAngle);
        context.drawImage(
          this.svgIcon,
          -radiusX,
          -radiusY,
          radiusX * 2,
          radiusY * 2,
        );
        context.restore();
      } else if (this.color) {
        context.fillStyle = this.color;
        context.beginPath();
        context.ellipse(
          x * scale,
          y * scale,
          radiusX * scale,
          radiusY * scale,
          this.rotationAngle,
          0,
          2 * Math.PI,
        );
        context.fill();
      } else if (this.emoji) {
        context.font = `${radiusX * scale}px serif`;
        context.save();
        context.translate(scale * x, scale * y);
        context.rotate(this.emojiRotationAngle);
        context.textAlign = "center";
        context.fillText(this.emoji, 0, radiusY / 2); // Adjust vertical alignment
        context.restore();
      }
    }

    updatePosition(deltaTime: number, currentTime: number): void {
      const elapsed = currentTime - this.createdAt;

      if (this.speed.x > this.finalSpeedX) {
        this.speed.x -= this.dragCoefficient * deltaTime;
      }

      this.position.x +=
        this.speed.x *
        (this.direction === "left" ? -this.absCos : this.absCos) *
        deltaTime;
      this.position.y =
        this.initialPosition.y -
        this.speed.y * this.absSin * elapsed +
        (0.00125 * Math.pow(elapsed, 2)) / 2;

      if (!this.emoji && !this.svgIcon) {
        this.rotationSpeed -= 1e-5 * deltaTime;
        this.rotationSpeed = Math.max(this.rotationSpeed, 0);

        if (this.radiusYDirection === "down") {
          this.radius.y -= deltaTime * this.rotationSpeed;
          if (this.radius.y <= 0) {
            this.radius.y = 0;
            this.radiusYDirection = "up";
          }
        } else {
          this.radius.y += deltaTime * this.rotationSpeed;
          if (this.radius.y >= this.initialRadius) {
            this.radius.y = this.initialRadius;
            this.radiusYDirection = "down";
          }
        }
      }
    }

    isVisible(canvasHeight: number): boolean {
      return this.position.y < canvasHeight + 100;
    }
  }

  class ConfettiManager {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    confetti: Confetti[];
    lastUpdated: number;
    isRunning: boolean;
    resizeHandler: () => void;
    animationId?: number;

    constructor() {
      this.canvas = document.createElement("canvas");
      this.canvas.style.cssText =
        "position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;";
      document.body.appendChild(this.canvas);
      this.context = this.canvas.getContext("2d")!;
      this.confetti = [];
      this.lastUpdated = Date.now();
      this.isRunning = true;
      
      // Store the resize handler so we can remove it later
      this.resizeHandler = Utils.debounce(() => this.resizeCanvas(), 200);
      window.addEventListener("resize", this.resizeHandler);
      
      this.resizeCanvas();
      this.loop();
    }

    resizeCanvas(): void {
      this.canvas.width = window.innerWidth * window.devicePixelRatio;
      this.canvas.height = window.innerHeight * window.devicePixelRatio;
    }

    addConfetti(config: ConfettiConfig = {}): void {
      const {
        confettiesNumber,
        confettiRadius,
        confettiColors,
        emojies,
        svgIcon,
      } = {
        ...defaultConfettiConfig,
        ...config,
      };

      const baseY = (5 * window.innerHeight) / 7;
      for (let i = 0; i < confettiesNumber / 2; i++) {
        this.confetti.push(
          new Confetti({
            initialPosition: { x: 0, y: baseY },
            direction: "right",
            radius: confettiRadius,
            colors: confettiColors,
            emojis: emojies,
            svgIcon,
          }),
        );
        this.confetti.push(
          new Confetti({
            initialPosition: { x: window.innerWidth, y: baseY },
            direction: "left",
            radius: confettiRadius,
            colors: confettiColors,
            emojis: emojies,
            svgIcon,
          }),
        );
      }
    }

    resetAndStart(config: ConfettiConfig = {}): void {
      // Clear existing confetti
      this.confetti = [];
      // Add new confetti
      this.addConfetti(config);
    }

    loop(): void {
      if (!this.isRunning) return;

      const currentTime = Date.now();
      const deltaTime = currentTime - this.lastUpdated;
      this.lastUpdated = currentTime;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.confetti = this.confetti.filter((item) => {
        item.updatePosition(deltaTime, currentTime);
        item.draw(this.context);
        return item.isVisible(this.canvas.height);
      });

      this.animationId = requestAnimationFrame(() => this.loop());
    }

    destroy(): void {
      this.isRunning = false;
      
      // Cancel animation frame
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
      
      // Remove event listeners
      window.removeEventListener("resize", this.resizeHandler);
      
      // Remove canvas from DOM
      if (this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
      
      // Clear confetti array
      this.confetti = [];
    }
  }

  const manager = new ConfettiManager();
  manager.addConfetti();

  // Track the interval so we can clear it
  const confettiInterval = setInterval(() => {
    manager.addConfetti();
  }, 3000);

  // Return cleanup function
  return () => {
    manager.destroy();
    clearInterval(confettiInterval);
  };
}
