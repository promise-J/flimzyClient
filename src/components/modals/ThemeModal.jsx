import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setShowTheme } from "../../redux/appSlice";
import { useSelector } from "react-redux";
import "./modal.css";
import { useState } from "react";
import { setThemeBg } from "../../redux/appSlice";

const ThemeModal = () => {
  const dispatch = useDispatch();
  const { themeBg } = useSelector((state) => state.app);
  const initialState = {
    bg: null,
    color: null,
  };
  const [value, setValue] = useState(initialState);
  useEffect(() => {
    setValue(themeBg);
  }, [themeBg]);

  return (
    <div
      className="themeModal"
      style={{ background: themeBg.bg, color: themeBg.color }}
    >
      <div className="theme1">
        <p>Choose a theme</p>
      </div>
      <div className="theme2">
        <div>
          <input
            onChange={() =>
              setValue({ bg: "rgb(247, 244, 244)", color: "black" })
            }
            value={value}
            checked={value.bg === "rgb(247, 244, 244)"}
            name="theme"
            type="radio"
          />
          <span>Light</span>
        </div>
        <div>
          <input
            onChange={() => setValue({ bg: "black", color: "white" })}
            value={value}
            name="theme"
            type="radio"
          />
          <span>Dark</span>
        </div>
        <div>
          <input
            onChange={() => setValue({ bg: "black", color: "white" })}
            value={value}
            checked={value.bg === "black"}
            name="theme"
            type="radio"
          />
          <span>System Default</span>
        </div>
      </div>
      <div className="theme3">
        <div>
          <button onClick={() => dispatch(setShowTheme(false))}>Cancel</button>
          <button
            onClick={() => {
              dispatch(setShowTheme(false));
              dispatch(setThemeBg(value));
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
