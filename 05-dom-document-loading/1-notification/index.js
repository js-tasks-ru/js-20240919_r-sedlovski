export default class NotificationMessage {
  static lastComponentShow;

  constructor(message, props = {}) {
    const { duration = 0, type = "success" } = props;

    this.duration = duration;
    this.type = type;
    this.message = message;

    this.element = this.createElement();
  }

  createTemplate() {
    return `
        <div class="notification ${this.type}" style="--value:${
      this.duration / 1000
    }s">
          <div class="timer"></div>
          <div class="inner-wrapper">
            <div class="notification-header">${this.type}</div>
            <div class="notification-body">
              ${this.message}
            </div>
          </div>
        </div>
      `;
  }

  createElement() {
    const element = document.createElement("div");
    element.innerHTML = this.createTemplate();
    return element.firstElementChild;
  }

  show(target = document.body) {
    if (NotificationMessage.lastComponentShow) {
      NotificationMessage.lastComponentShow.hide();
    }

    NotificationMessage.lastComponentShow = this;

    this.element = this.createElement(target);

    this.timer = setTimeout(() => {
      this.destroy();
    }, this.duration);

    target.appendChild(this.element);
  }

  hide() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    NotificationMessage.lastComponentShow = null;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}
