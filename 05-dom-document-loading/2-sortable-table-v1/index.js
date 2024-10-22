export default class SortableTable {
  static sortMethods = {
    string: (data, field, order) => {
      const options = { caseFirst: "upper" };

      return [...data].sort((a, b) => {
        return order === "asc"
          ? a[field].localeCompare(b[field], ["ru", "en"], options)
          : b[field].localeCompare(a[field], ["ru", "en"], options);
      });
    },
    number: (data, field, order) => {
      return [...data].sort((a, b) => {
        return order === "asc" ? a[field] - b[field] : b[field] - a[field];
      });
    },
  };

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sortState = {
      field: null,
      order: null,
    };
    this.subElements = {};
    this.element = this.createElement();
  }

  sort(field, order) {
    const { sortable, sortType } = this.headerConfig.find(
      (item) => item.id === field
    );

    if (!sortable) {
      return;
    }

    this.sortState.field = field;
    this.data = SortableTable.sortMethods[sortType](this.data, field, order);

    this.subElements.header.innerHTML = this.createHeaderTemplate();
    this.subElements.body.innerHTML = this.createDataTemplate();
  }

  createElement() {
    const element = document.createElement("div");
    element.innerHTML = this.createTemplate();

    const containerElement = element.firstElementChild;
    const tableElement = containerElement.firstElementChild;

    if (this.data.length) {
      tableElement.classList.remove(
        "sortable-table_loading",
        "sortable-table_empty"
      );
    }

    this.subElements = this.getSubElements(containerElement);
    return containerElement;
  }

  getSubElements(element) {
    const elements = element.querySelectorAll("[data-element]");
    const result = {};

    elements.forEach((subElement) => {
      const name = subElement.dataset.element;
      result[name] = subElement;
    });

    return result;
  }

  createTemplate() {
    return `<div data-element="productsContainer" class="products-list__container">
            <div class="sortable-table sortable-table_loading sortable-table_empty">
                <div data-element="header" class="sortable-table__header sortable-table__row">
                    ${this.createHeaderTemplate()}
                </div>
                <div data-element="body" class="sortable-table__body">
                    ${this.createDataTemplate()}
                </div>
                ${this.createEmptyDataTemplate()}
            </div>
       </div>`;
  }

  createHeaderTemplate() {
    return this.headerConfig
      .map((item) => {
        const { id, title, sortable } = item;
        const isSortField = this.sortState.field === id;
        const dataSort = this.sortState.order
          ? `data-order="${this.sortState.order}"`
          : "";

        return `<div
            class="sortable-table__cell"
            data-id=${id}
            data-sortable=${sortable}
            ${dataSort}
        >
            <span>${title}</span>
            ${isSortField ? this.createSortArrowTemplate() : ""}
        </div>`;
      })
      .join("");
  }

  createSortArrowTemplate() {
    return `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
       </span>`;
  }

  createDataTemplate() {
    return this.data
      .map((item) => this.createRowTemplate(item, this.headerConfig))
      .join("");
  }

  createRowTemplate(item) {
    const cells = this.headerConfig
      .map(({ id, template }) => {
        return template
          ? template(item[id])
          : `<div class="sortable-table__cell">${item[id]}</div>`;
      })
      .join("");

    return `<a href="/products/${item.id}" class="sortable-table__row">
            ${cells}
       </a>`;
  }

  createEmptyDataTemplate() {
    return `<div data-element="loading" class="loading-line sortable-table__loading-line"></div>
       <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
           <div>
              <p>No products satisfies your filter criteria</p>
              <button type="button" class="button-primary-outline">
                 Reset all filters
              </button>
           </div>
       </div>`;
  }

  destroy() {
    this.element.remove();
  }
}
