export default class ColumnChart {
  element;
  chartHeight = 50;

  constructor(props = {}) {
    const {
      data = [],
      label = "",
      value = 0,
      link = "",
      formatHeading = (value) => value,
    } = props;
    this.data = data;
    this.label = label;
    this.value = formatHeading(value);
    this.link = link;

    this.element = this.createElement();
  }
  createColumns() {
    const maxValue = Math.max(...this.data);
    return this.data
      .map((value) => {
        const percent = ((value / maxValue) * 100).toFixed(0);
        return `<div style="--value: ${Math.floor(
          (value * this.chartHeight) / maxValue
        )}" data-tooltip="${percent}%"></div>`;
      })
      .join("");
  }

  createLink() {
    return `${
      this.link
        ? `<a class="column-chart__link" href=${this.link}>View all</a>`
        : ""
    }`;
  }

  createTemplate() {
    return `
    <div class="column-chart" style="--chart-height: 50">
      <div class="column-chart__title">
        ${this.label}
        ${this.createLink()}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${
          this.value
        }</div>
        <div data-element="body" class="column-chart__chart">
          ${this.createColumns()}
        </div>
      </div>
    </div>
    `;
  }

  createElement() {
    const element = document.createElement("div");
    element.innerHTML = this.createTemplate();
    element.classList.add("column-chart_loading");
    return element;
  }

  destroy() {
    this.remove();
  }

  update(newData) {
    this.data = newData;
    this.element = this.createElement();
  }

  remove() {
    this.element.remove();
  }
}
