const ACTIVE = 'tool-select';

class Tools {
    constructor(el, options) {
        this.options = options || {};
        this.editorPanelContent = document.getElementById('editor-panel-content');
        this.el = el;
        this.resetSelect();
        const rect = el.getBoundingClientRect();
        const contentRect = this.editorPanelContent.getBoundingClientRect();
        this.tool = this.createElement(`tool-${this.el.id}`);
        this.tool.setAttribute('data-uuid', this.el.id);
        const style = this.getStyle(rect, contentRect);
        this.updateStyle(this.tool, style);
        this.bindEvents(this.tool, style);
    }

    resetSelect() {
        const tools = document.querySelectorAll('.tool');
        tools.forEach(item => {
            item.classList.remove(ACTIVE);
        });
    }

    bindEvents(tool, style) {
        tool.addEventListener('click', (event) => {
            this.resetSelect();
            event.target.classList.add(ACTIVE),
            this.options && this.options.select && this.options.select({
                target: event.target,
                event,
                style
            });
        });
        tool.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            const contentRect = this.editorPanelContent.getBoundingClientRect();
            this.options && this.options.select && this.options.contextmenu({
                target: event.target,
                x: event.clientX - contentRect.left,
                y: event.clientY - contentRect.top
            });
        });
    }

    createElement(id) {
        let tool = document.getElementById(id);
        if (!tool) {
            tool = document.createElement('div');
            tool.id = id;
            tool.className = `tool ${ACTIVE}`;
            this.editorPanelContent.appendChild(tool);
        }
        return tool;
    }

    getStyle(rect, contentRect) {
        const { width, height, top, left } = rect;
        console.log('contentRect', contentRect);
        return {
            position: 'absolute',
            backgroundColor: `rgb(253 0 219 / 20%)`,
            border: '1px solid #FD00DB',
            width: `${width}px`,
            height: `${height}px`,
            top: `${top - contentRect.top}px`,
            left: `${left - contentRect.left}px`
        };
    }

    updateStyle(tool, style) {
        for (let key in style) {
            tool.style[key] = style[key];
        }
    }

    destory() {
        this.tool.removeEventListener('click');
        document.getElementById('tool').remove();
        this.tool = null;
        this.el = null;
        this.editorPanelContent = null;
        this.tools = null;
    }
}

export default Tools;
