var files = [];
var nowpath = "/";
fetch('de.notemsfile')
  .then(response => {
    if (!response.ok) {
      window.dispatchEvent(new ErrorEvent('error', {
        message: 'Unable to load notemsfile'
      }));
    }
    return response.json();
  })
  .then(json => {
    files = json;
  })
  .catch(error => {
    window.dispatchEvent(new ErrorEvent('error', {
      message: 'Unable to load notemsfile'
    }));
  });

function getParentObject(obj, path) {
  let props = path.split('.');
  let parent = obj;
  for (let i = 0; i < props.length - 1; i++) {
    parent = parent[props[i]];
    if (parent === undefined) {
      return undefined; // 如果中间的属性不存在，则返回 undefined
    }
  }
  return parent;
}

function getFiles(path) {
  let gotocd = path.replace(/\\/g,'/');
  let filePath = (gotocd.startsWith("/")?gotocd:nowpath+'/'+gotocd).split("/").filter(path=>{return path!=""});
  let file = files;
  let nop = []
  filePath.forEach((subPath)=>{
    if (subPath == "..") {
      nop.pop();
      file = getParentObject(files, nop.join("."));
    } else if (subPath !== ".") {
      nop.push(subPath);
      file = file[subPath];
    }
    if (typeof file == "undefined") return 'invalid path';
  });
  if (typeof file != "object") return 'Not a directory';
  let back = []
  for (let k in file) {
    if (typeof file[k] == "object") {
      back.push('/' + k);
    } else back.push(k);
  }
  //排版操作，懒得做
  return back.join('\n\r'); //直接分行
}
COMMANDS.cd = {
    run: (args) => {
        if (args[0]) {
           let gotocd = args[0].replace(/\\/g,'/');
           let filePath = (gotocd.startsWith("/")?gotocd:nowpath+'/'+gotocd).split("/").filter(path=>{return path!=""});
           let file = files;
           let nop = []
           filePath.forEach((subPath)=>{
               if (subPath == "..") {
                   nop.pop();
                   file = getParentObject(files, nop.join("."));
               } else if (subPath !== ".") {
                   nop.push(subPath);
                   file = file[subPath];
               }
               if (typeof file == "undefined") return;
           });
           if (typeof file == "object") {
               nowpath = nop.join("/")?nop.join("/"):"/";
               nowpath = nowpath.startsWith("/")?nowpath:'/'+nowpath
           } else pushMessage(`\x1B[91mUnable to go to directory: \x1B[0m\x1B[31mThe path is invalid or not a directory\x1B[0m`)
        } else pushMessage(nowpath)
    },
    help: 'Go to a directory',
    moreHelp: 'Go to a directory with only one parameter, specify a path, separate paths with "/", output the current path without filling in parameters',
    usage: '[path]'
}

COMMANDS.ls = {
    run: (args) => {
        pushMessage(getFiles(args[0]?args[0]:nowpath));
    },
    help: 'List files',
    moreHelp: 'List files, similar to the syntax of Linux\'s ls directory',
    usage: '[path]'
}

COMMANDS.cat = {
    run: (args) => {
        if (args[0]) {
           let gotocd = args[0].replace(/\\/g,'/');
           let filePath = (gotocd.startsWith("/")?gotocd:nowpath+'/'+gotocd).split("/").filter(path=>{return path!=""});
           let file = files;
           let nop = []
           filePath.forEach((subPath)=>{
               if (subPath == "..") {
                   nop.pop();
                   file = getParentObject(files, nop.join("."));
               } else if (subPath !== ".") {
                   nop.push(subPath);
                   file = file[subPath];
               }
               if (typeof file == "undefined") return;
           });
           if (typeof file == "string") {
               pushMessage(file.split("\n").join("\n\r"));
           } else pushMessage(`\x1B[91mUnable to go to directory: \x1B[0m\x1B[31mThe path is invalid or a directory\x1B[0m`)
        } else pushMessage(`\x1B[91mYou haven't set the path\x1B[0m`)
    },
    help: 'Show files content',
    moreHelp: 'Specify a path to display file content',
    usage: '<path>'
}