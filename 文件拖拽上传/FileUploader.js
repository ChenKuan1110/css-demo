// 文件上传类

const TASK_STATUS = {
  PROCESSING: 1,
  SUCCESS: 2,
  ERROR: 3
}

export class FileUploader {
  constructor({
    element,
    uploadURL
  }) {
    if (!element instanceof HTMLElement) {
      throw new Error(`element should be an HTMLElement`);
    }
    this.element = element; // 上传组件对应的页面元素
    this.uploadURL = uploadURL; // 上传路径

    this.#init();
  }

  // 公共属性
  tasks = []; // 记录上传任务

  #init () {
    // 绑定事件
    this.#listenToEvents();
  }

  #listenToEvents () {
    const dropAreaDOM = this.element.querySelector('.drop-area');
    dropAreaDOM.addEventListener('drop', this.#handleDrop);
    dropAreaDOM.addEventListener('dragover', this.#handleDragover)
  }

  #handleDrop (e) {
    e.preventDefault();
    // console.log('drop', e);

    if (e.dataTransfer.items) {
      // 使用 DataTransferItemsList 接口获取文件
      for (const item of e.dataTransfer.items) {
        if (item.kind === 'file') {
          const file = item.getAsFile();
          console.log('1 file', file);
          this.#upload(file)
        }
      }
    } else {
      // 使用 DataTransfer 接口获取文件
      for (const file of e.dataTransfer.files) {
        console.log('2 file', file);
        this.#upload(file)
      }
    }
  }

  #handleDragover (e) {
    e.preventDefault(); // 阻止浏览器默认打开文件的事件
    // console.log('dragover',e)
  }

  #upload (file) {
    const data = new FormData();
    data.append('file', file);
    const task = {
      id: this.tasks.length,
      name: file.name,
      status: TASK_STATUS.PROCESSING
    }
  }
}