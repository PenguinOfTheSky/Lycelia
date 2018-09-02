{
let files
S.pages.book_Template = function(opts = {}) {

  files = {
    list: opts.chapters || [[1, 'Chapter 1']],
    listLength: opts.listLength || 1,
    content: {},
    template: 'book'
  }
  let typeList = {
  }
  let fileUpload = function(n) {
    let m;
    for (let i = 0; i < files.list.length; i++) {
      if (files.list[i][0] == n) {
        m = files.list[i][1]
        break;
      }
    }
    let line = {}
    line.innerHTML =  `<div id='row_${n}' style='width:98.5%;margin-top:.5rem;padding:.5vh;border-radius:.5vh;box-shadow:.1vh .1vh .5vh .25vh #555;margin: 0 auto; margin-bottom: 1vh;'>
    <flex>
    <div >
      <input type='text' class='chapterTitle' data-id='${n}' value="${m || 'Chapter ' + n}"><br>
      <button type='button' class='deleteChapter' id='deleteChapter_${n}' data-id='${n}'>Delete Chapter</button>
    </div>

    <div class ='fileContainer' style='width:100%;'>
    File options: <select class='btn fileType' id ='fileType${n}' data-id='${n}'>
      <option value='3'>Upload .html file</option>
      <option value='1'>Copy/paste text</option>
      <option value='2'>Copy/paste html code</option>
    </select>
    <iframe class='fileText1' id='fileText1_${n}' data-id='${n}' src='/lib/richText.html' style=' width:100%;min-height:16rem;display: none;box-sizing:border-box;'></iframe>
    <textarea class='fileText2' id='fileText2_${n}' data-id='${n}' type='text' style='display:none; width:100%;height:5rem;' name='fileText' placeholder="Paste here for raw html code"></textarea>
    <div class='fileText3' id='fileText3_${n}' data-id='${n}'>
      <label>
        <input data-id='${n}' class='fileUpload' type='file'>
      </label>
    </div>
    </div>
    </flex>
    </div>`
    return line.innerHTML;
  }
  let addChap = `
  <div id='addChapterContainer'>
    <td><button type='button' id='addChapter'>Add Chapter</button></td>
  </div>`
  let chaps = ``;
  let maxID = 1;
  for (let i = 0; i < files.list.length; i++) {
    chaps += fileUpload(files.list[i][0])
    if (files.list[i][0] > maxID) maxID = files.list[i][0]
  }
  setTimeout(function() {
    for (let i = 0; i < files.list.length; i++) {
      if (D.find('#fileText1_' + (i+1))) D.find('#fileText1_' + (i+1)).contentDocument.querySelector('#textBox').innerHTML = ''
    }
  },2500)
  D.find('#template').innerHTML += chaps + addChap
  initButtons = function() {
    D.findAll('.fileType').forEach(function(ele) {
      let n = ele.getAttribute('data-id')
      ele.value = typeList[n] || "3"
      ele.onchange =  function() {
        if (this.value === "1") {
          typeList[n] = '1'
          D.find('#fileText1_' + n).style.display = 'block'
          D.find('#fileText2_' + n).style.display = 'none'
          D.find('#fileText3_' + n).style.display = 'none'
        } else if (this.value == "2") {
          typeList[n] = '2'
          D.find('#fileText1_' + n).style.display = 'none'
          D.find('#fileText2_' + n).style.display = 'block'
          D.find('#fileText3_' + n).style.display = 'none'
        } else if (this.value == '3') {
          typeList[n] = '3'
          D.find('#fileText1_' + n).style.display = 'none'
          D.find('#fileText2_' + n).style.display = 'none'
          D.find('#fileText3_' + n).style.display = 'block'
        }
      }
    })
    D.findAll('.deleteChapter').forEach(function(ele,i) {
      let n = ele.getAttribute('data-id') //string to num convert?
      ele.onclick = function() {
        D.find('#row_'+n).remove()
        for(let x = 0; x < files.list.length; x++) {
          if (files.list[x][0] == n) {
            files.list.splice(x,1)
            break;
          }
        }
      }
    })
    D.findAll('.fileUpload').forEach(function(ele,i) {
      let n = ele.getAttribute('data-id')
      ele.onchange = function() {
        console.log(this.files[0].type) //add error for non-html
        if (this.files[0].type != 'text/html') {
          this.value = ""
          return;
        }
        var reader = new FileReader();
        reader.readAsText(this.files[0], "UTF-8");
        reader.onload = function (evt) {
          files.content[n] = evt.target.result
        }
      }
    })
    D.findAll('.chapterTitle').forEach(function(ele) {
      ele.onchange = function() {
        let id = ele.getAttribute('data-id')
        for (let x = 0; x < files.list.length; x++) {
          if (id == files.list[x][0]) {
            files.list[x][1] = ele.value;
            break;
          }
        }
      }
    })
    D.find("#addChapter").onclick = function() {
      files.list.push([++maxID, 'Chapter ' + (files.list.length + 1)])
      typeList[maxID] = "3"
      let row = D.make('flex', {
        innerHTML: fileUpload(maxID),//fileUpload(files.list.length),
        style: 'margin:1%;margin: 1rem .1rem;'
      })
      D.find('#template').insertBefore(row, D.find('#addChapterContainer'))
      initButtons()
      setTimeout(function(){
        if (D.find('#fileText1_' + (files.list.length))) D.find('#fileText1_' + (files.list.length)).contentDocument.querySelector('#textBox').innerHTML = ''
      },3000)
    }
  }
  initButtons()


}
S.pages.book_Render = function(form) {
  files.text = ``;
  form.file = []
  D.findAll('.fileContainer').forEach(function(ele) {
    let n = ele.querySelector('.fileType').getAttribute('data-id')
    console.log(n)
    /*let chap;
    files.list.forEach(function(ele) {
      if (ele[0] === n) {
        console.log(found + ele[1])
        chap = ele[1]
      }
    })*/
    let type = ele.querySelector('.fileType').value
    //1=fileupload, 2=html, 1=rich text
    if (type === "3") {
      form.file.push([n, LZUTF8.compress(files.content[n] || '', {outputEncoding: 'BinaryString'})])
    } else if (type ==="2") {
      form.file.push([n, LZUTF8.compress(ele.querySelector(".fileText2").value, {outputEncoding: 'BinaryString'})])
    } else if (type === "1") {
      form.file.push([n,LZUTF8.compress(`
        <meta charset="utf-8">
        <style>
          body {
            max-width: 40rem;
            margin: 0 auto;
            padding:.5rem;
            font-size: 1rem;
          }
        </style>` +
        ele.querySelector('.fileText1').contentDocument.querySelector('#textBox').innerHTML, {outputEncoding: 'BinaryString'})])
    } else {
      console.log('err')
    }
  })
  //D.find('#template').innerHTML = 'bawse'
  return (files)
}
}
