/*
Copyright 2013-2020 the original author or authors from the JHipster project.
This file is part of the JHipster project, see https://jhipster.github.io/
for more information.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { Component, Vue } from 'vue-property-decorator';

/**
 * An utility service for data.
 */
@Component
export default class JhiDataUtils extends Vue {
  /**
   * Method to abbreviate the text given
   */
  abbreviate(text, append = '...') {
    if (text.length < 30) {
      return text;
    }
    return text ? text.substring(0, 15) + append + text.slice(-10) : '';
  }

  /**
   * Method to find the byte size of the string provides
   */
  byteSize(base64String) {
    return this.formatAsBytes(this.size(base64String));
  }

  /**
   * Method to open file
   */
  openFile(contentType, data) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // To support IE and Edge
      const byteCharacters = atob(data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: contentType,
      });
      window.navigator.msSaveOrOpenBlob(blob);
    } else {
      // Other browsers
      const fileURL = `data:${contentType};base64,${data}`;
      const win = window.open();
      win.document.write(
        '<iframe src="' +
          fileURL +
          '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
      );
    }
  }

  /**
   * Method to convert the file to base64
   */
  toBase64(file, cb) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e: any) => {
      const base64Data = e.target.result.substr(e.target.result.indexOf('base64,') + 'base64,'.length);
      cb(base64Data);
    };
  }

  /**
   * Method to clear the input
   */
  clearInputImage(entity, elementRef, field, fieldContentType, idInput) {
    if (entity && field && fieldContentType) {
      if (entity.hasOwnProperty(field)) {
        entity[field] = null;
      }
      if (entity.hasOwnProperty(fieldContentType)) {
        entity[fieldContentType] = null;
      }
      if (elementRef && idInput && elementRef.nativeElement.querySelector('#' + idInput)) {
        elementRef.nativeElement.querySelector('#' + idInput).value = null;
      }
    }
  }

  endsWith(suffix, str) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }

  paddingSize(value) {
    if (this.endsWith('==', value)) {
      return 2;
    }
    if (this.endsWith('=', value)) {
      return 1;
    }
    return 0;
  }

  size(value) {
    return (value.length / 4) * 3 - this.paddingSize(value);
  }

  formatAsBytes(size) {
    return size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' bytes';
  }

  setFileData(event, entity, field, isImage) {
    if (event && event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (isImage && !/^image\//.test(file.type)) {
        return;
      }
      this.toBase64(file, base64Data => {
        entity[field] = base64Data;
        entity[`${field}ContentType`] = file.type;
      });
    }
  }

  /**
   * Method to download file
   */
  downloadFile(contentType, data, fileName) {
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {
      type: contentType,
    });
    const tempLink = document.createElement('a');
    tempLink.href = window.URL.createObjectURL(blob);
    tempLink.download = fileName;
    tempLink.target = '_blank';
    tempLink.click();
  }

  /**
   * Method to parse header links
   */
  parseLinks(header) {
    const links = {};

    if (header === null || header.indexOf(',') === -1) {
      return links;
    }
    // Split parts by comma
    const parts = header.split(',');

    // Parse each part into a named link
    parts.forEach(p => {
      if (p.indexOf('>;') === -1) {
        return;
      }
      const section = p.split('>;');
      const url = section[0].replace(/<(.*)/, '$1').trim();
      const queryString = { page: null };
      url.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
        queryString[$1] = $3;
      });
      let page = queryString.page;
      if (typeof page === 'string') {
        page = parseInt(page, 10);
      }
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = page;
    });
    return links;
  }
}
