// $(function(){
//   // 画像用のinputを生成する関数
//   const buildFileField = (index)=> {
//     const html = `<div data-index="${index}" class="js-file_group">
//                     <input class="js-file" type="file"
//                     name="item[images_attributes][${index}][src]"
//                     id="item_images_attributes_${index}_src"><br>
//                     <div class="js-remove">削除</div>
//                   </div>`;
//     return html;

//   }

//   // file_fieldのnameに動的なindexをつける為の配列
//   let fileIndex = [1,2,3,4,5,6,7,8,9,10];

//   $('.sell-form__image__input').on('change', '.js-file', function(e) {
//     // fileIndexの先頭の数字を使ってinputを作る
//     $('.sell-form__image__input').append(buildFileField(fileIndex[0]));
//     fileIndex.shift();
//     // 末尾の数に1足した数を追加する
//     // fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
//   });

//   $('.sell-form__image__input').on('click', '.js-remove', function() {
//     $(this).parent().remove();
//     // 画像入力欄が0個にならないようにしておく
//     if ($('.js-file').length == 0) $('.sell-form__image__input').append(buildFileField(fileIndex[0]));
//   });
// });

$(function(){
  // file_fieldをつける
  function appendFileField(index){
    let html = `<div class="js-file__group" data-index="${index}">
                  <input class="sell-form__image__input__box__field js-file" type="file" name="item[images_attributes][${index}][src]" id="item_images_attributes_${index}_src", accept="image/png,image/jpeg">
                </div>
                `
    $('.sell-form__image__input__box').append(html);
  }
  // プレビューをつける
  function appendPreview(url,index){
    let html = `<div class="previews__preview" data-index="${index}">
                  <p class="previews__preview__photo">
                    <img width="100" height="100" src="${url}">
                  </p>
                  <hr>
                  <div class="previews__preview__btn js-remove">削除</div>
                </div>`
    $('.previews').append(html);
  }

  function appendInputBox(num){
    let html = `<label class="sell-form__image__input__box" for=" item_images_attributes_${num}_src">
                  <img alt="画像" width="104" class="sell-form__image__input__box__icon" src="/assets/material/icon/icon_camera-24c5a3dec3f777b383180b053077a49d0416a4137a1c541d7dd3f5ce93194dee.png">
                  <div class="js-file__group" data-index="${num}">
                    <input class="sell-form__image__input__box__field js-file" accept="image/png,image/jpeg" type="file" name="item[images_attributes][${num}][src]" id="item_images_attributes_${num}_src">
                  </div>
                  <p class="sell-form__image__input__box__text">
                   ドラッグアンドドロップ
                   <br>
                   またはクリックしてファイルをアップロード
                   </p>
                </label>`

    $('.sell-form__image__input').append(html);
  }

  // 数えるのに必要
  let file_fieldIndex = [1,2,3,4]
  let previewIndex = [0,1,2,3,4]
  let num = 4
  $('.sell-form__image__input__box').on('change', '.js-file',function(){

    // 新しいfile_fieldを加える
    $('.sell-form__image__input__box__text').remove();
    if (file_fieldIndex.length != 0){
      $('.sell-form__image__input__box').attr("for", `item_images_attributes_${file_fieldIndex[0]}_src`);
      appendFileField(file_fieldIndex[0]);
      file_fieldIndex.shift();
    } else {
      $('.sell-form__image__input__box').attr("for", `item_images_attributes_${previewIndex[0] + 1}_src`);
      appendFileField(previewIndex[0] + 1)
      previewIndex.push(previewIndex[0] + 1);
    }
    
    // ファイルのurlを用いてプレビューを追加
    // fileIndexから先頭の数字を削除
    let file = this.files[0];
    let file_reader = new FileReader
    file_reader.readAsDataURL(file);
    file_reader.onload = function(e){
      appendPreview(file_reader.result, previewIndex[0]);
      num += 1
      previewIndex.shift();
      // 五枚目のプレビューを表示する時だけdisplay none
      if ($('.previews__preview').length == 5){
        $('.sell-form__image__input__box').css('display','none');
      }
    }
  })

  // クリックした時削除
  $('.previews').on('click', '.js-remove', function(){
    let index = $(this).parent().attr("data-index");
    if ($('.previews__preview').length == 5){
      $('.sell-form__image__input__box').css('display','block');
    } 
    $(`.previews__preview[data-index=${index}]`).remove();
    $(`.js-file__group[data-index=${index}]`).remove();
    
    file_fieldIndex.push(num)
    previewIndex.push(num)
    num += 1
  })
});