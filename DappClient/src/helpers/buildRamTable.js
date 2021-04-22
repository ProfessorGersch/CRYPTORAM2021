import React from "react";

import ramPrice from "./ramPrice";
import rainbow from "./rainbow";
import ramNames from "./ramNames";

import Ram from "../components/ram";

import { Col, Row } from "react-materialize";

//  Build a set of cards for the current active page

const buildRamTable = (state, activePage, existanceTable) => {

  const ramFileNames = [
    "circuitRam.png",
    "fishRam.png",
    "KrustyClownRam.png",
    "ramClear.png",
    "gerschRam.png",
    "smokeRam1.png",
    "smokeRam2.png",
    "smokeRam3.png",
    "spaceRam.png",
    "watermelon.png",
    "smokeRam2.png",
    "fishRam.png"
  ];

  var rp = new ramPrice(activePage); // seed the random number generator
  const numRows = 4;

  let ramTable = [];

  for (let i = 0; i < numRows; i++) {
    let rowData = [];

    for (let j = 0; j < 4; j++) {
      let index = (activePage - 1) * 16 + i * 4 + j;
      if (index >= state.NUMRAMS) break;
      let color = index < 192 ? rainbow(40, index) : ramFileNames[index - 192];
      let price =
        index < 192 ? rp.nextRange(300, 800) : rp.nextRange(1500, 2400);
      let exists = existanceTable[index % 16];
      rowData.push(
        <div>
          <Col>
            <Ram
              ramID={index}
              ramName={ramNames[index]}
              ramColor={color}
              ramPrice={price}
              ramSellable={!exists}
              state={state}
            />
          </Col>
        </div>
      );
    }
    ramTable.push(<Row>{rowData}</Row>);
  }

  return ramTable;
};

export default buildRamTable;
