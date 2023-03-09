import { MODAL_ID_PREFIX } from "../constants";

const ALMA_COLORS = {
  orange: "#FA5022",
  backdrop: "#6C6C6C",
  white: "#FFFFFF",
};

export const style = `
#${MODAL_ID_PREFIX}-element {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
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
  width: 100%;
  height: 100%;
  position: absolute;
  padding-top: 48px;
  border-radius: 10px;
}

#${MODAL_ID_PREFIX}-close {
  position: absolute;
  right: 24px;
  top: 16px;
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
  left: 24px;
  top: 16px;
}

#${MODAL_ID_PREFIX}-iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

.alma-fixed-body { 
  position: fixed;
  width: 100%;
  overflow: auto;
  height: 100%;
}

@media (min-width: 768px) {
  #${MODAL_ID_PREFIX}-body {
    position: relative;
    max-width: 600px;
    height: 80vh;
    border-radius: 10px;
    padding-bottom: 10px;
  }
}

@media (min-width: 768px) and (max-height: 700px) {
  #${MODAL_ID_PREFIX}-body {
    height: 90vh;
  }
}
`;
