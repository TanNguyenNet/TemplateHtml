/**
 * Template Builder
 * Drag and drop page builder with layout selection
 */

'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Check if Sortable is available
  if (typeof Sortable === 'undefined') {
    console.error('Template Builder: Sortable.js is not loaded!');
    return;
  }

  console.log('Template Builder: Starting initialization...');

  // DOM Elements
  const componentPalette = document.getElementById('component-palette');
  const canvasGrid = document.getElementById('canvas-grid');
  const layoutButtons = document.querySelectorAll('.layout-btn');
  const btnClearCanvas = document.getElementById('btn-clear-canvas');
  const btnCopyCode = document.getElementById('btn-copy-code');
  const exportCodeTextarea = document.getElementById('export-code');
  const previewContent = document.getElementById('preview-content');
  const previewModal = document.getElementById('previewModal');
  const exportModal = document.getElementById('exportModal');

  // Current layout state
  let currentColumns = 1;
  let dropzoneSortables = [];

  // Component Templates
  const componentTemplates = {
    heading: `
      <div class="builder-component" data-type="heading">
        <div class="component-controls">
          <i class="ri-drag-move-2-line drag-handle cursor-move"></i>
          <i class="ri-delete-bin-line delete-btn"></i>
        </div>
        <h3 contenteditable="true">Tiêu đề mẫu</h3>
      </div>
    `,
    text: `
      <div class="builder-component" data-type="text">
        <div class="component-controls">
          <i class="ri-drag-move-2-line drag-handle cursor-move"></i>
          <i class="ri-delete-bin-line delete-btn"></i>
        </div>
        <p contenteditable="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    `,
    image: `
      <div class="builder-component" data-type="image">
        <div class="component-controls">
          <i class="ri-drag-move-2-line drag-handle cursor-move"></i>
          <i class="ri-delete-bin-line delete-btn"></i>
        </div>
        <div class="image-placeholder">
          <i class="ri-image-line"></i>
          <span>Image Placeholder</span>
        </div>
      </div>
    `,
    button: `
      <div class="builder-component" data-type="button">
        <div class="component-controls">
          <i class="ri-drag-move-2-line drag-handle cursor-move"></i>
          <i class="ri-delete-bin-line delete-btn"></i>
        </div>
        <button class="btn btn-primary" type="button">Click Me</button>
      </div>
    `,
    card: `
      <div class="builder-component" data-type="card">
        <div class="component-controls">
          <i class="ri-drag-move-2-line drag-handle cursor-move"></i>
          <i class="ri-delete-bin-line delete-btn"></i>
        </div>
        <div class="card shadow-sm mb-0">
          <div class="card-body">
            <h5 class="card-title" contenteditable="true">Card Title</h5>
            <p class="card-text" contenteditable="true">Some quick example text to build on the card title.</p>
            <a href="javascript:void(0)" class="btn btn-sm btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
    `,
    divider: `
      <div class="builder-component" data-type="divider">
        <div class="component-controls">
          <i class="ri-drag-move-2-line drag-handle cursor-move"></i>
          <i class="ri-delete-bin-line delete-btn"></i>
        </div>
        <hr class="builder-divider">
      </div>
    `,
    spacer: `
      <div class="builder-component" data-type="spacer">
        <div class="component-controls">
          <i class="ri-drag-move-2-line drag-handle cursor-move"></i>
          <i class="ri-delete-bin-line delete-btn"></i>
        </div>
        <div class="builder-spacer"></div>
      </div>
    `,
    alert: `
      <div class="builder-component" data-type="alert">
        <div class="component-controls">
          <i class="ri-drag-move-2-line drag-handle cursor-move"></i>
          <i class="ri-delete-bin-line delete-btn"></i>
        </div>
        <div class="alert alert-primary mb-0" role="alert">
          <i class="ri-information-line me-2"></i>
          <span contenteditable="true">This is an alert message!</span>
        </div>
      </div>
    `,
    list: `
      <div class="builder-component" data-type="list">
        <div class="component-controls">
          <i class="ri-drag-move-2-line drag-handle cursor-move"></i>
          <i class="ri-delete-bin-line delete-btn"></i>
        </div>
        <ul class="builder-list">
          <li contenteditable="true">List item 1</li>
          <li contenteditable="true">List item 2</li>
          <li contenteditable="true">List item 3</li>
        </ul>
      </div>
    `,
    quote: `
      <div class="builder-component" data-type="quote">
        <div class="component-controls">
          <i class="ri-drag-move-2-line drag-handle cursor-move"></i>
          <i class="ri-delete-bin-line delete-btn"></i>
        </div>
        <blockquote class="builder-quote mb-0">
          <p contenteditable="true">"The only way to do great work is to love what you do."</p>
          <footer contenteditable="true">— Steve Jobs</footer>
        </blockquote>
      </div>
    `
  };

  // Create component from template
  function createComponent(type) {
    if (!componentTemplates[type]) {
      console.warn('Unknown component type:', type);
      return null;
    }
    
    const wrapper = document.createElement('div');
    wrapper.innerHTML = componentTemplates[type].trim();
    const component = wrapper.firstChild;
    
    // Attach delete handler
    const deleteBtn = component.querySelector('.delete-btn');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        component.remove();
        updatePlaceholders();
      });
    }
    
    return component;
  }

  // Initialize Component Palette
  function initPalette() {
    if (!componentPalette) {
      console.error('Template Builder: component-palette not found!');
      return;
    }

    Sortable.create(componentPalette, {
      group: {
        name: 'builder',
        pull: 'clone',
        put: false
      },
      sort: false,
      animation: 150,
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen'
    });

    console.log('Template Builder: Palette initialized');
  }

  // Initialize a single dropzone
  function initDropzone(dropzone) {
    if (!dropzone) return null;

    const sortable = Sortable.create(dropzone, {
      group: 'builder',
      animation: 150,
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      // No filter - accept all items
      onAdd: function (evt) {
        console.log('Template Builder: onAdd triggered');
        const item = evt.item;
        console.log('Template Builder: Item class =', item.className);
        
        // Check if this is a palette item (li with component-item class)
        if (item.classList.contains('component-item')) {
          const componentType = item.dataset.type;
          console.log('Template Builder: Creating component type:', componentType);
          
          if (componentType && componentTemplates[componentType]) {
            const newComponent = createComponent(componentType);
            if (newComponent) {
              // Replace the li with the actual component div
              item.parentNode.insertBefore(newComponent, item);
              item.remove();
              console.log('Template Builder: Component created and inserted');
            }
          } else {
            // Invalid type, remove the item
            item.remove();
          }
        }
        
        updatePlaceholders();
      },
      onSort: function () {
        updatePlaceholders();
      }
    });

    return sortable;
  }

  // Initialize all dropzones
  function initAllDropzones() {
    // Destroy existing sortables
    dropzoneSortables.forEach(s => {
      if (s && s.destroy) s.destroy();
    });
    dropzoneSortables = [];

    // Create new sortables for each dropzone
    const dropzoneElements = document.querySelectorAll('.canvas-dropzone');
    console.log('Template Builder: Found', dropzoneElements.length, 'dropzones');
    
    dropzoneElements.forEach((dropzone, i) => {
      const sortable = initDropzone(dropzone);
      if (sortable) {
        dropzoneSortables.push(sortable);
      }
    });

    console.log('Template Builder: Dropzones initialized:', dropzoneSortables.length);
  }

  // Update placeholder visibility
  function updatePlaceholders() {
    document.querySelectorAll('.canvas-dropzone').forEach(dropzone => {
      const hasComponents = dropzone.querySelectorAll('.builder-component').length > 0;
      const placeholder = dropzone.querySelector('.dropzone-placeholder');
      if (placeholder) {
        placeholder.style.display = hasComponents ? 'none' : 'block';
      }
    });
  }

  // Set Layout
  function setLayout(columns) {
    currentColumns = columns;
    
    // Collect existing components
    const existingComponents = [];
    document.querySelectorAll('.canvas-dropzone .builder-component').forEach(comp => {
      existingComponents.push(comp.cloneNode(true));
    });

    // Generate new grid
    const colClass = columns === 1 ? 'col-12' : columns === 2 ? 'col-md-6' : 'col-md-4';
    let gridHTML = '';
    
    for (let i = 1; i <= columns; i++) {
      gridHTML += `
        <div class="${colClass}">
          <div class="canvas-column min-vh-50" data-column="${i}">
            <div class="canvas-dropzone" id="dropzone-${i}">
              <div class="dropzone-placeholder text-center text-muted py-6">
                <i class="ri-drag-drop-line display-4"></i>
                <p class="mb-0 mt-2">Drag components here</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    canvasGrid.innerHTML = gridHTML;

    // Restore components to first column
    const firstDropzone = document.getElementById('dropzone-1');
    if (firstDropzone && existingComponents.length > 0) {
      existingComponents.forEach(comp => {
        const deleteBtn = comp.querySelector('.delete-btn');
        if (deleteBtn) {
          deleteBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            comp.remove();
            updatePlaceholders();
          });
        }
        firstDropzone.appendChild(comp);
      });
    }

    // Re-initialize dropzones
    initAllDropzones();
    updatePlaceholders();

    // Update active button
    layoutButtons.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.columns) === columns);
    });
  }

  // Clear Canvas
  function clearCanvas() {
    document.querySelectorAll('.canvas-dropzone .builder-component').forEach(comp => {
      comp.remove();
    });
    updatePlaceholders();
  }

  // Generate Export HTML
  function generateExportHTML() {
    const colClass = currentColumns === 1 ? 'col-12' : currentColumns === 2 ? 'col-md-6' : 'col-md-4';
    let html = '<div class="container">\n  <div class="row g-4">\n';
    
    document.querySelectorAll('.canvas-dropzone').forEach(dropzone => {
      const components = dropzone.querySelectorAll('.builder-component');
      if (components.length > 0) {
        html += `    <div class="${colClass}">\n`;
        components.forEach(comp => {
          const cleanComp = comp.cloneNode(true);
          const controls = cleanComp.querySelector('.component-controls');
          if (controls) controls.remove();
          cleanComp.querySelectorAll('[contenteditable]').forEach(el => {
            el.removeAttribute('contenteditable');
          });
          cleanComp.classList.remove('builder-component');
          cleanComp.removeAttribute('data-type');
          html += `      ${cleanComp.innerHTML.trim()}\n`;
        });
        html += `    </div>\n`;
      }
    });
    
    html += '  </div>\n</div>';
    return html;
  }

  // Generate Preview HTML
  function generatePreviewHTML() {
    const colClass = currentColumns === 1 ? 'col-12' : currentColumns === 2 ? 'col-md-6' : 'col-md-4';
    let html = '<div class="row g-4">';
    
    document.querySelectorAll('.canvas-dropzone').forEach(dropzone => {
      html += `<div class="${colClass}">`;
      dropzone.querySelectorAll('.builder-component').forEach(comp => {
        const cleanComp = comp.cloneNode(true);
        const controls = cleanComp.querySelector('.component-controls');
        if (controls) controls.remove();
        cleanComp.querySelectorAll('[contenteditable]').forEach(el => {
          el.removeAttribute('contenteditable');
        });
        html += cleanComp.outerHTML;
      });
      html += '</div>';
    });
    
    html += '</div>';
    return html;
  }

  // Copy to Clipboard
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = btnCopyCode;
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="ri-check-line me-1"></i> Copied!';
      btn.classList.replace('btn-primary', 'btn-success');
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.replace('btn-success', 'btn-primary');
      }, 2000);
    });
  }

  // Event Listeners
  function initEventListeners() {
    layoutButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        setLayout(parseInt(this.dataset.columns));
      });
    });

    if (btnClearCanvas) {
      btnClearCanvas.addEventListener('click', function () {
        if (confirm('Are you sure you want to clear the canvas?')) {
          clearCanvas();
        }
      });
    }

    if (btnCopyCode) {
      btnCopyCode.addEventListener('click', function () {
        copyToClipboard(exportCodeTextarea.value);
      });
    }

    if (previewModal) {
      previewModal.addEventListener('show.bs.modal', function () {
        previewContent.innerHTML = generatePreviewHTML();
      });
    }

    if (exportModal) {
      exportModal.addEventListener('show.bs.modal', function () {
        exportCodeTextarea.value = generateExportHTML();
      });
    }
  }

  // Initialize everything
  initPalette();
  initAllDropzones();
  initEventListeners();
  updatePlaceholders();

  console.log('Template Builder: Initialization complete!');
});
