var spotlightPopup = document.querySelector(".spotlight-popup");

if (spotlightPopup) {
  document.body.removeChild(spotlightPopup);
}

function TogglePopup({ $target, initialState, onToggle }) {
  const $container = document.createElement("div");
  $container.classList.add("spotlight-popup");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { toggled, removed } = this.state;

    if (removed) {
      $container.style.display = "none";
      return;
    }

    $container.innerHTML = `
      <div class="spotlight-popup-message">
        ${
          toggled
            ? `<span class="spotlight-popup-message-text guide">Shift</span>`
            : `<span class="spotlight-popup-message-text">Spotlight</span>`
        }
      </div>
      <div class="spotlight-popup-remove">
        <span class="spotlight-popup-remove-text">&#x2715;</span>
      </div>
      <label class="toggle-container">
        <input
          class="toggle-input"
          type="checkbox"
          ${toggled && "checked"} />
        <div class="toggle-switch"></div>
      </label>
    `;
  };

  this.render();

  $target.appendChild($container);

  onToggle(this.state.toggled);

  $container.addEventListener("click", (e) => {
    const toggleInput = e.target.closest(".toggle-input");

    if (!toggleInput) {
      return;
    }

    this.setState({
      ...this.state,
      toggled: !this.state.toggled,
    });

    onToggle && onToggle(this.state.toggled);
  });

  $container.addEventListener("click", (e) => {
    const popupRemove = e.target.closest(".spotlight-popup-remove");

    if (!popupRemove) {
      return;
    }

    if (!confirm("spotlight를 종료하시겠습니까?")) {
      return;
    }

    this.setState({
      toggled: false,
      removed: true,
    });

    onToggle && onToggle(this.state.toggled);
  });
}

var togglePopup = new TogglePopup({
  $target: document.body,
  initialState: {
    toggled: true,
    removed: false,
  },
  onToggle: (toggled) => {
    toggled ? activate() : deactivate();
  },
});

var mask = document.createElement("div");
mask.setAttribute("class", "spotlight-mask");

var DEFAULT_SCALE = 150;
var scale = DEFAULT_SCALE;

function beam(event) {
  const coord = `${event.clientX}px ${event.clientY}px`;

  mask.style.backgroundImage = `radial-gradient(circle at ${coord}, transparent ${scale}px, rgba(0, 0, 0, 0.4) 0)`;
}

/**
 * 조명의 필드 앵글(field angle)을 확대합니다.
 *
 * @param {*} event
 */
function zoom(event) {
  const coord = `${event.clientX}px ${event.clientY}px`;

  // Use deltaX due to shift key (shfit+ wheel means scrollX)
  const delta = Math.sign(event.deltaX) * 6;
  scale += delta;

  const max = Math.min(window.innerHeight, window.innerWidth);
  const min = 10;
  scale = Math.min(Math.max(scale, min), max);

  mask.style.backgroundImage = `radial-gradient(circle at ${coord}, transparent ${scale}px, rgba(0, 0, 0, 0.4) 0)`;
}

function activate() {
  console.log("SPOTLIGHT ENABLED");

  window.addEventListener("keydown", startSpotlight);
  window.addEventListener("keyup", stopSpotlight);
}

function deactivate() {
  console.log("SPOTLIGHT DISABLED");

  window.removeEventListener("keydown", startSpotlight);
  window.removeEventListener("keyup", stopSpotlight);
}

function startSpotlight(event) {
  if (event.shiftKey) {
    document.body.appendChild(mask);
    window.addEventListener("mousemove", beam);
    window.addEventListener("wheel", zoom);
  }
}

function stopSpotlight(event) {
  if (event.key === "Shift") {
    try {
      if (document.querySelector(".spotlight-mask")) {
        document.body.removeChild(document.querySelector(".spotlight-mask"));
      }
      window.removeEventListener("mousemove", beam);
      window.removeEventListener("wheel", zoom);
    } catch (e) {
      console.error(e);
    }
  }
}

/**
 * innerHTML을 넣으면 DOM 요소로 만듭니다.
 *
 * @param {*} innerHTML
 * @returns
 */
function fragment(innerHTML) {
  const $template = document.createElement("template");

  $template.innerHTML = innerHTML;

  return $template.content;
}
