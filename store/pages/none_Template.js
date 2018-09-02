{
let fileUpload
S.pages.none_Template = function() {
  D.find('#template').innerHTML = `
  <div style='padding:.5vh; border-radius:.5vh; box-shadow: .1vh .1vh .5vh .25vh #0d53f5; width: 98.5%; margin: 0 auto;'>
  <td >File (html)</td>
  <td>
  File options: <select class='btn' id='fileUploadType' >
    <option value='3'>Upload .html file</option>
    <option value='1'>Copy/paste text</option>
    <option value='2'>Copy/paste html code</option>
  </select>
  <iframe id='fileText1' src='/lib/richText.html' style=' width:100%;min-height:16rem;display: none;'></iframe>
  <textarea id='fileText2' type='text' style='display:none; width:100%;height:5rem;' name='fileText' placeholder="Paste here for raw html code"></textarea>
  <div id='fileText3' style=''>
    <label>
      <input id='fileUpload' type='file'>
    </label>
  </div>
  </td>
  </div>`
  setTimeout(function() {
    if (D.find('#fileText1')) D.find('#fileText1').contentDocument.querySelector('#textBox').innerHTML = ''
  },2000)
  D.find('#fileUploadType').onchange = function() {
    if (this.value === "1") {
      D.find('#fileText1').style.display = 'block'
      D.find('#fileText2').style.display = 'none'
      D.find('#fileText3').style.display = 'none'
    } else if (this.value == "2") {
      D.find('#fileText1').style.display = 'none'
      D.find('#fileText2').style.display = 'block'
      D.find('#fileText3').style.display = 'none'
    } else if (this.value == '3') {
      D.find('#fileText1').style.display = 'none'
      D.find('#fileText2').style.display = 'none'
      D.find('#fileText3').style.display = 'block'
    }
  }
  D.find('#fileUpload').onchange = function() {
    console.log(this.files[0].type) //add error for non-html
    var reader = new FileReader();
    reader.readAsText(this.files[0], "UTF-8");
    reader.onload = function (evt) {
      fileUpload = evt.target.result
    }
  }

}
S.pages.none_Render = function(form) {
  let file =D.find('#fileUploadType').value
  if (file === "1") {
    form.file = LZUTF8.compress(`
      <meta charset="utf-8">
      <style>
        body {
          max-width: 40rem;
          margin: 0 auto;
          padding:.5rem;
          font-size: 1rem;
        }
      </style>` +
      D.find('#fileText1').contentDocument.querySelector('#textBox').innerHTML, {outputEncoding: 'BinaryString'})
  } else if (file ==='2') {
    form.file = LZUTF8.compress(D.find('#fileText2').value, {outputEncoding: 'BinaryString'})
  } else if (file==='3') {
    if (fileUpload) {
      form.file = LZUTF8.compress(fileUpload, {outputEncoding: 'BinaryString'})
    } else {
      form.file = ''
    }
  }
  return file
}
}
