//import { array } from "prop-types";
//import { rotateCubeSpace } from "../components/CubeContainer";

export const toRadians = (angle) => (angle * (Math.PI / 180));
export const toDegrees = (angle) => (angle * (180 / Math.PI));

/**Return is new position based on current position and resultant roation */
export const calcPosition = (position, rotationVector, angleOfRotation) => {
    const cos = (angle) => (Math.cos(toRadians(angle)));
    const sin = (angle) => (Math.sin(toRadians(angle)));
    const ux = rotationVector[0];
    const uy = rotationVector[1];
    const uz = rotationVector[2];
    const angle = angleOfRotation;
    let x = position[0] * (cos(angle) + ux * ux * (1 - cos(angle))) +
        position[1] * (ux * uy * (1 - cos(angle)) - uz * sin(angle)) +
        position[2] * (ux * uz * (1 - cos(angle)) + uy * sin(angle));

    let y = position[0] * (uy * ux * (1 - cos(angle)) + uz * sin(angle)) +
        position[1] * (cos(angle) + uy * uy * (1 - cos(angle))) +
        position[2] * (uy * uz * (1 - cos(angle)) - ux * sin(angle));

    let z = position[0] * (uz * ux * (1 - cos(angle)) - uy * sin(angle)) +
        position[1] * (uz * uy * (1 - cos(angle)) + ux * sin(angle)) +
        position[2] * (cos(angle) + uz * uz * (1 - cos(angle)));

    /*
    console.log([x, y, z]);
    console.log([x / (position[0] * (cos(angle) + ux * ux * (1 - cos(angle))) +
    position[1] * (ux * uy * (1 - cos(angle)) - uz * sin(angle)) +
    position[2] * (ux * uz * (1 - cos(angle)) + uy * sin(angle))), 

    y / (position[0] * (uy * ux * (1 - cos(angle)) + uz * sin(angle)) +
    position[1] * (cos(angle) + uy * uy * (1 - cos(angle))) +
    position[2] * (uy * uz * (1 - cos(angle)) - ux * sin(angle))), 

    z / (position[0] * (uz * ux * (1 - cos(angle)) - uy * sin(angle)) +
    position[1] * (uz * uy * (1 - cos(angle)) + ux * sin(angle)) +
    position[2] * (cos(angle) + uz * uz * (1 - cos(angle))))]);
    */

    return [x, y, z];
};

/**Return is new angle of rotation and rotation vector */
export const calculateResultantAngle = (alpha, rotationVector, currentRotationVector, beta) => {

    const cos = (angle) => (Math.cos(toRadians(angle)));
    const sin = (angle) => (Math.sin(toRadians(angle)));

    const lx = rotationVector[0];
    const ly = rotationVector[1];
    const lz = rotationVector[2];

    const mx = currentRotationVector[0];
    const my = currentRotationVector[1];
    const mz = currentRotationVector[2];

    const gamaInverse=cos(alpha / 2) * cos(beta / 2) - sin(alpha / 2) * sin(beta / 2) * (lx * mx + ly * my + lz * mz);
    const gama = 2 * toDegrees(Math.acos(
            Math.abs(gamaInverse)>1?gamaInverse/Math.abs(gamaInverse):gamaInverse
        ));

    const nx = ((
        sin(alpha / 2) * cos(beta / 2) * lx +
        cos(alpha / 2) * sin(beta / 2) * mx +
        sin(alpha / 2) * sin(beta / 2) * (ly * mz - lz * my)
    ) / sin(gama / 2));

    const ny = ((
        sin(alpha / 2) * cos(beta / 2) * ly +
        cos(alpha / 2) * sin(beta / 2) * my +
        sin(alpha / 2) * sin(beta / 2) * (lz * mx - lx * mz)
    ) / sin(gama / 2))

    const nz = ((
        sin(alpha / 2) * cos(beta / 2) * lz +
        cos(alpha / 2) * sin(beta / 2) * mz +
        sin(alpha / 2) * sin(beta / 2) * (lx * my - ly * mx)
    ) / sin(gama / 2))
    return { gama, rotationVector: [isNaN(nx) || !isFinite(nx)?1:nx, isNaN(ny)||!isFinite(nx)?1:ny, isNaN(nz)||!isFinite(nx)?1:nz] };
};

export const getCubePositionDiffrence=(movedPosition,currentPosition,xMove,yMove)=>{
    const xDiff=(currentPosition[0]+xMove) - movedPosition[0];
    const yDiff=(currentPosition[1]+yMove) - movedPosition[1];
    return Math.sqrt(xDiff*xDiff + yDiff*yDiff);
};

export const getTouchPositions=(eve)=>{
    if(eve.targetTouches){
        return {clientX:eve.targetTouches[0].clientX,clientY:eve.targetTouches[0].clientY};
    }else{
        return {clientX: eve.clientX, clientY: eve.clientY};
    }
};

//return true if cube is solved, false if not solved
/* Ideas
for loop to iterate through all 9 squares on each face to verify same color (props.faceColors perhaps?)
calculate piece positions with cancelling vectors to compare to solvedState
calculate piece positions with combining default solvedState positions with the current angle vectors so they match with same parameters
temp cube set to default rotation 0 degrees to compare to solvedState
check each face color and verify they are facing the same direction


*/

export const isSolved = (cube, solvedCube) => {
    console.log(cube);
    console.log(solvedCube);
    return (cube === solvedCube);
}


//export const isSolved=(cube)=>{
    //solved state to determine if cube is solved
    /*
    const solvedState = {
        positions: [
            [0, 0, 0],
            [-50, 0, 0],
            [50, 0, 0],
            [0, -50, 0],
            [0, 50, 0],
            [-50, -50, 0],
            [-50, 50, 0],
            [50, -50, 0],
            [50, 50, 0],

            [0, 0, -50],
            [-50, 0, -50],
            [50, 0, -50],
            [0, -50, -50],
            [0, 50, -50],
            [-50, -50, -50],
            [-50, 50, -50],
            [50, -50, -50],
            [50, 50, -50],

            [0, 0, 50],
            [-50, 0, 50],
            [50, 0, 50],
            [0, -50, 50],
            [0, 50, 50],
            [-50, -50, 50],
            [-50, 50, 50],
            [50, -50, 50],
            [50, 50, 50]],
            angleOfRotation: Array(27).fill(0), 
            rotationVector: Array(27).fill([1, 0, 0]),
            faceRotationAngle: 0
    };
    */

    /*

    if (cube.state.faceRotationAngle % 90 === 0) {
        //this.setState({ faceRotationAngle: 0, faceRotationIndex: null, autoRotation: undefined });
        return;
    }
    const currentMove =
        Math.abs(this.state.faceRotationAngle % 90) < 80 &&
            Math.abs(this.state.faceRotationAngle % 90) > 10
            ? 3 : 1;

    solvedState.setState({ //finish turn to appropriate face depending on turn angle
        autoRotation: true, currentMove,
        reverseAngle: (!solvedState.state.autoRotation && ((Math.abs(solvedState.state.faceRotationAngle % 90) < 30))) ?
            !solvedState.state.reverseAngle : this.state.reverseAngle
    }, () => {
        solvedState.rotateCube(Math.sqrt(.5), Math.sqrt(.5), null);
        setTimeout(solvedState.reArrangeCubes, .001);
    });*/

    /*
    for (let i = 0; i < positions.length; i++) {
        positions[i].calcPosition(positions, cubePositions.rotationVector, cubePositions.angleOfRotation);
    }*/

    //console.log(solvedState);
    /*
    console.log(cube);
    return (cube === solvedState);*/
//};
