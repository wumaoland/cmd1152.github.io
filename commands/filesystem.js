var files = [];
var nowpath = "/";
fetch('de.notemsfile')
  .then(response => {
    if (!response.ok) {
      window.dispatchEvent(new ErrorEvent('error', {
        message: '无法加载notemsfile'
      }));
    }
    return response.json();
  })
  .then(json => {
    files = json;
  })
  .catch(error => {
    window.dispatchEvent(new ErrorEvent('error', {
      message: '无法加载notemsfile'
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
    if (typeof file == "undefined") return '无效路径';
  });
  if (typeof file != "object") return '不是一个目录';
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
           } else pushMessage(`\x1B[91m无法进入目录：\x1B[0m\x1B[31m这个路径无效或者他压根不是个目录\x1B[0m`)
        } else pushMessage(nowpath)
    },
    help: '进入一个目录',
    moreHelp: '进入一个目录，目录路径使用 / 来分隔',
    usage: '[path]'
}

COMMANDS.ls = {
    run: (args) => {
        pushMessage(getFiles(args[0]?args[0]:nowpath));
    },
    help: '列出文件',
    moreHelp: '列出文件，和Linux下的ls语法基本一样',
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
           } else pushMessage(`\x1B[91m无法进入目录：\x1B[0m\x1B[31m这个路径无效或者他压根不是个目录\x1B[0m`)
        } else pushMessage(`\x1B[91m你没有指定路径\x1B[0m`)
    },
    help: '读取一个文件',
    moreHelp: '读取文件内容',
    usage: '<path>'
}