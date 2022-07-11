import React, { useEffect, useState } from "react";
import { onLoad } from "../dist/game";

import boardStyle from "../dist/styles/board.module.css";
import getCustomStyle from "./styleManager";

import Settings from "./settings";
import { ChessBoard } from "../dist/chess2";

export default function GameBoard(props) {
  const [customStyle, setCustomStyleSheet] = useState(
    getCustomStyle(props.customStyle)
  );
  const [chessBoard, setChessBoard] = useState(null);
  const [reverseBoard, setReverseBoard] = useState(true);

  useEffect(() => {
    onLoad({ ...boardStyle, ...customStyle }, props.customStyle).then((res) => {
      setChessBoard(res);
    });
  }, []);

  useEffect(() => {
    let newStyles = getCustomStyle(props.customStyle);

    setCustomStyleSheet(newStyles);
    if (chessBoard) {
      chessBoard.styleType = props.customStyle;
      chessBoard.styleSheetReference = { ...boardStyle, ...newStyles };
      chessBoard.updatePieces();
    }
    // onLoad({...boardStyle, ...customStyle});
  }, [props.customStyle]);

  useEffect(() => {
    if (chessBoard) chessBoard.updatePieces();
  }, [reverseBoard]);

  return (
    <React.Fragment>
      <div className="container-fluid d-flex justify-content-around align-items-center">
        <div
          className={`container custom-bg-tertiary mt-3 mb-3 rounded`}
          style={{ margin: 0 }}
        >
          <p id="roomID" className="display-6 text-white">
            Room ID:{" "}
          </p>
        </div>
        <Settings setCustomStyle={props.setCustomStyle}></Settings>
      </div>
      <div className="container">
        <div className="container mt-3 mb-3 rounded">
          <p id="turn" className="display-6 rounded text-center">
            Turn:{" "}
          </p>
        </div>
        <div className="container">
          <div
            className={`container custom-bg-tertiary ${customStyle["timer-container"]}`}
          >
            <p
              className={`h3 text-weight-normal text-white ${customStyle["timer-top"]}`}
              id="timer-top"
            >
              ---
            </p>
          </div>
          <div
            className="container-fluid d-flex justify-content-center align-items-center"
            id="board-container"
          >
            <div className={`${boardStyle["bear-container"]}`} id="z1"></div>
            {!reverseBoard ? (
              <div className={boardStyle["jail-1"]} id="jail-1">
                <div
                  id="x2"
                  className={`${customStyle["chess-jail-box"]} ${customStyle["white-box"]}`}
                >
                  <p>x2</p>
                </div>
                <div
                  id="x1"
                  className={`${customStyle["chess-jail-box"]} ${customStyle["black-box"]}`}
                >
                  <p>x1</p>
                </div>
              </div>
            ) : (
              <div className={`${boardStyle["jail-2"]}`} id="jail-2">
                <div
                  id="y2"
                  className={`${customStyle["chess-jail-box"]} ${customStyle["black-box"]}`}
                >
                  <p>y2</p>
                </div>
                <div
                  id="y1"
                  className={`${customStyle["chess-jail-box"]} ${customStyle["white-box"]}`}
                >
                  <p>y1</p>
                </div>
              </div>
            )}
            <div
              className={` ${boardStyle["chess-board"]} container`}
              id="chess-board"
            >
              {(reverseBoard ? "87654321" : "12345678")
                .split("")
                .map((number, numberIndex) => {
                  return (reverseBoard ? "abcdefgh" : "hgfedcba")
                    .split("")
                    .map((letter, letterIndex) => {
                      const isWhite = !(
                        (numberIndex + letterIndex + (reverseBoard ? 1 : 0)) %
                        2
                      );
                      return (
                        <React.Fragment key={`tile_${letter}${number}`}>
                          <div
                            id={`${letter}${number}`}
                            className={`${customStyle["chess-box"]} ${
                              customStyle[isWhite ? "white-box" : "black-box"]
                            }`}
                          >
                            <p>
                              {letter}
                              {number}
                            </p>
                          </div>
                        </React.Fragment>
                      );
                    });
                })}
            </div>
            {reverseBoard ? (
              <div className={boardStyle["jail-1"]} id="jail-1">
                <div
                  id="x2"
                  className={`${customStyle["chess-jail-box"]} ${customStyle["white-box"]}`}
                >
                  <p>x2</p>
                </div>
                <div
                  id="x1"
                  className={`${customStyle["chess-jail-box"]} ${customStyle["black-box"]}`}
                >
                  <p>x1</p>
                </div>
              </div>
            ) : (
              <div className={`${boardStyle["jail-2"]}`} id="jail-2">
                <div
                  id="y2"
                  className={`${customStyle["chess-jail-box"]} ${customStyle["black-box"]}`}
                >
                  <p>y2</p>
                </div>
                <div
                  id="y1"
                  className={`${customStyle["chess-jail-box"]} ${customStyle["white-box"]}`}
                >
                  <p>y1</p>
                </div>
              </div>
            )}
          </div>
          <div
            className={`container custom-bg-tertiary ${customStyle["timer-container"]}`}
          >
            <p
              className={`h3 text-weight-normal text-white ${customStyle["timer-bottom"]}`}
              id="timer-bottom"
            >
              ---
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setReverseBoard(!reverseBoard);
          }}
        >
          Reverse board
        </button>
      </div>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="modal-heading">
                Modal Heading
              </h4>
            </div>

            <div className="modal-footer">
              <a href="./index.html">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Home
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
