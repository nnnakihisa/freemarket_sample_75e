$(document).on('turbolinks:load', ()=> {
  // 画像用のinputを生成する関数
  const buildFileField = (index)=> {
    const html = `<div data-index="${index}" class="js-file_group">
                    <input class="js-file" type="file"
                    name="item[images_attributes][${index}][src]"
                    id="item_images_attributes_${index}_src"><br>
                    <div class="js-remove">削除</div>
                  </div>`;
    return html;
  }

  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];

  $('.sell-form__image__input').on('change', '.js-file', function(e) {
    // fileIndexの先頭の数字を使ってinputを作る
    $('.sell-form__image__input').append(buildFileField(fileIndex[0]));
    fileIndex.shift();
    // 末尾の数に1足した数を追加する
    // fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
  });

  $('.sell-form__image__input').on('click', '.js-remove', function() {
    $(this).parent().remove();
    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $('.sell-form__image__input').append(buildFileField(fileIndex[0]));
  });
});