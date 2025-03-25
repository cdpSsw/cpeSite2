import React from "react";

import Orb from "../components/Orb";
import Particles from "../components/Particles";

const Roadmap = () => {
  return (
    <main className="roadmap-container">
      <Particles
        particleColors={["#2C2C2C", "#2C2C2C"]}
        particleCount={300}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
      />
      <Orb
        hue={250}
        hoverIntensity={0}
        rotateOnHover={false}
        forceHoverState={true}
      />
    </main>
  );
};

export default Roadmap;
