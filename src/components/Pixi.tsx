import { Stage, Sprite, Container, Text } from "@inlet/react-pixi";
import * as PIXI from "pixi.js";
import useWindowSize from "../hooks/useWindowSize";
import ramen from "../image/ramen.png";
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

type Position = {
  x: number;
  y: number;
};

const numberStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fill: ["#ffffff"],
  fontWeight: "bold",
});

export const Pixi = (props: Props) => {
  // const [scale, setScale] = useState(0);
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const windowSize = useWindowSize();
  const canvasWidth = windowSize.width / window.devicePixelRatio || 1;
  const canvasHeight = windowSize.height / window.devicePixelRatio || 1;
  const anchor = 0.5;

  const [originalImageSize, setOriginalImageSize] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log("aaa");
    const img = new Image();
    img.src = "../image/ramen.jpg";

    img.onload = function () {
      const _this = this as unknown as { width: number; height: number };
      setOriginalImageSize({ x: _this.width, y: _this.height });
    };
  }, []);

  return (
    <Stage width={canvasWidth} height={canvasHeight}>
      <Container>
        <Sprite
          texture={PIXI.Texture.from("../image/ramen.jpg")}
          anchor={anchor}
          x={position.x + canvasWidth * anchor}
          y={position.y + canvasHeight * anchor}
          interactive={true}
          pointerdown={(e: PIXI.InteractionEvent) => {
            const imageSize = {
              x: originalImageSize.x,
              y: originalImageSize.y,
            };
            const xRatio =
              (e.data.global.x -
                ((canvasWidth - imageSize.x) / 2 + position.x)) /
              imageSize.x;
            const yRatio =
              (e.data.global.y -
                ((canvasHeight - imageSize.y) / 2 + position.y)) /
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
            (canvasWidth - originalImageSize.x) / 2 +
            position.x;
          const positionY =
            originalImageSize.y * p.yRatio +
            (canvasHeight - originalImageSize.y) / 2 +
            position.y;
          return (
            <React.Fragment key={`${p.xRatio} ${p.yRatio}`}>
              <Sprite
                texture={PIXI.Texture.from("../image/pin.svg")}
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
