import { MODAL_ID_PREFIX } from "../constants";

const ALMA_COLORS = {
  orange: "#FA5022",
  backdrop: "#6C6C6C",
  white: "#FFFFFF",
};

export const style = `
#${MODAL_ID_PREFIX}-element {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

#${MODAL_ID_PREFIX}-background {
  background: ${ALMA_COLORS.backdrop};
  position: absolute;
  width: 100vw;
  height: 100vh;
  opacity: 0.8;
}

#${MODAL_ID_PREFIX}-body {
  background: ${ALMA_COLORS.white};
  width: 100vw;
  height: 100vh;
  position: absolute;
  bottom: 0px;
  padding: 50px 10px 10px;
  border-radius: 0;
}

#${MODAL_ID_PREFIX}-close {
  position: absolute;
  right: 15px;
  top: 15px;
  cursor: pointer;
}

#${MODAL_ID_PREFIX}-close:hover, #${MODAL_ID_PREFIX}-close:focus-visible {
  box-shadow:
    0 0 0 3px ${ALMA_COLORS.white},
    0 0 0 5px ${ALMA_COLORS.orange};
    border-radius: 50%;
}

#${MODAL_ID_PREFIX}-logo {
  position: absolute;
  left: 15px;
  top: 15px;
}

#${MODAL_ID_PREFIX}-iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

@media (min-width: 768px) {
  #${MODAL_ID_PREFIX}-body {
    position: relative;
    width: 80vw;
    height: 80vh;
    border-radius: 10px;
  }
}`;
