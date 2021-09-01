import { Stage, Sprite, Container, Text } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";
import useWindowSize from "../hooks/useWindowSize";
import ramen from "../image/ramen.jpg";
import pin from "../image/pin.svg";
import { useEffect, useState } from "react";
import React from "react";

type Pin = {
  xRatio: number;
  yRatio: number;
};

type Props = {
  pins: Pin[];
  addPin: (position: { xRatio: number; yRatio: number }) => void;
  // clickPinHandler: (index: number) => void;
};

const numberStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fill: ["#ffffff"],
  fontWeight: "bold",
});

export const Pixi = (props: Props) => {
  // const [scale, setScale] = useState(0);

  const windowSize = useWindowSize();
  const canvasWidth = windowSize.width || 1;
  const canvasHeight = windowSize.height || 1;
  const anchor = 0.5;

  const [originalImageSize, setOriginalImageSize] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = ramen;

    img.onload = function () {
      const _this = this as unknown as { width: number; height: number };
      setOriginalImageSize({ x: _this.width, y: _this.height });
    };
  }, []);

  return (
    <Stage width={canvasWidth} height={canvasHeight}>
      <Container>
        <Sprite
          texture={PIXI.Texture.from(ramen)}
          anchor={anchor}
          x={canvasWidth * anchor}
          y={canvasHeight * anchor}
          interactive={true}
          pointerdown={(e: PIXI.InteractionEvent) => {
            const imageSize = {
              x: originalImageSize.x,
              y: originalImageSize.y,
            };
            console.log("e.data.global.x", e.data.global.x);
            console.log("canvasWidth", canvasWidth);
            console.log("imageSize.x", imageSize.x);
            const xRatio =
              (e.data.global.x - (canvasWidth - imageSize.x) / 2) / imageSize.x;
            const yRatio =
              (e.data.global.y - (canvasHeight - imageSize.y) / 2) /
              imageSize.y;
            props.addPin({
              xRatio,
              yRatio,
            });
          }}
        />
        {props.pins.map((p, i) => {
          const positionX =
            originalImageSize.x * p.xRatio +
            (canvasWidth - originalImageSize.x) / 2;
          const positionY =
            originalImageSize.y * p.yRatio +
            (canvasHeight - originalImageSize.y) / 2;
          return (
            <React.Fragment key={`${p.xRatio} ${p.yRatio}`}>
              <Sprite
                texture={PIXI.Texture.from(pin)}
                anchor={anchor}
                x={positionX}
                y={positionY - 10}
                scale={0.23}
                // click={() => props.clickPinHandler(i)}
                interactive={true}
                cursor="pointer"
              />
              <Text
                text={String(i + 1)}
                x={i < 9 ? positionX - 2 : positionX - 5}
                y={positionY - 18}
                scale={0.3}
                style={numberStyle}
              />
            </React.Fragment>
          );
        })}
      </Container>
    </Stage>
  );
};
