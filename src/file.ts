import { string2domNode } from './html';

// https://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata/5100158
// 将dataURI转成Blob, 然后就可通过formdata来上传
// 另外, 可以由fetch...res.blob() 获取, 更方便, 问题是 ie 和 safari不支持
export function dataURItoBlob(dataURI: string): Blob {
  let byteString: string;
  let mimestring: string;

  if (dataURI.split(',')[0].indexOf('base64') !== -1) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = decodeURI(dataURI.split(',')[1]);
  }

  mimestring = dataURI
    .split(',')[0]
    .split(':')[1]
    .split(';')[0];

  var content = new Array();
  for (var i = 0; i < byteString.length; i++) {
    content[i] = byteString.charCodeAt(i);
  }

  return new Blob([new Uint8Array(content)], { type: mimestring });
}

// function uploadBlobFile() {
//   const dataURL = canvas.toDataURL('image/jpeg', 0.5);
//   const blob = dataURItoBlob(dataURL);
//   const fd = new FormData(document.forms[0]);
//   fd.append('canvasImage', blob);
// }

const imageFileAccept = 'image/jpeg,image/png,image/gif';
export function openFile(accept = imageFileAccept): Promise<File> {
  return new Promise((resolve, reject) => {
    const fi: HTMLInputElement = document.createElement('input');
    fi.setAttribute('type', 'file');
    accept && fi.setAttribute('accept', accept);
    fi.style.position = 'absolute';
    fi.style.left = '-10000px';
    document.body.appendChild(fi);

    function onChange(e: any) {
      if (!fi.files || fi.files.length === 0) reject('未选择文件');
      const file = fi.files![0];
      fi.removeEventListener('change', onChange);
      document.body.removeChild(fi);

      resolve(file);
    }
    fi.addEventListener('change', onChange);
    fi.click();
  });
}

export function file2DataURL(f: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onloadend = e => resolve((e.target! as any).result);
    fr.readAsDataURL(f);
  });
}

/* 用法: 
1. 比如你在富文本里直接使用了 base64 图片
2. 你可以获得这个base64字符串, 并传到这里
3. 将返回一个formData, 你可以继续修改
4. 比如: formData.append('uploadNum', '222')
5. 然后用 fetch 上传, 比如:
      fetch(`${ApiPath}/file/upload/single`, {
        method: 'post',
        body: formData,
        headers: { auth_token: '75df7b8a989a45d8bae38a40fec65f38' },
        mode: 'cors',
      })
        .then(res => res.json())
        .then(console.log.bind(console));
6. 最后, 可以替换富文本中的图片
*/
export function getFormDataWithDataURLField(
  fileFieldName: string,
  fileDataURL: string,
  fileName?: string
) {
  const blob = dataURItoBlob(fileDataURL);
  const s = `<form method="post" enctype="multipart/form-data"></form>`;
  const form = string2domNode(s) as HTMLFormElement;
  const formData = new FormData(form);
  formData.append(fileFieldName, blob, fileName);
  return formData;
}
