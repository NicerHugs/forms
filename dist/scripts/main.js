SelectBox = {
  setSelect: function(e) {
    var $option = $(e.target),
        setVal = e.target.innerHTML,
        $select = $(e.target).siblings(':last'),
        index = $option.index();
    $select.children().each(function(index, option) {
      option.removeAttribute('selected');
    });
    $option.siblings('.selected-option').html(setVal + '<i class="fa fa-sort-desc"></i></li>');
    $select.children()[index].setAttribute('selected', 'selected');
  },
  expandSelect: function($ul) {
    var lis = $ul.children().length-1,
        height = $($ul.children()[0]).outerHeight(true);
    $ul.height(height*lis + 'px');
  },
  collapseSelect: function($li) {
    var height = $li.outerHeight(true);
    $li.parent().height(height + 'px');
  },
  toggleSelect: function (e) {
    var $ul = $(e.target).closest('ul'),
        $li = $(e.target).closest('li');
    if ($ul.hasClass('expanded')) {
      $ul.removeClass('expanded');
      $ul.children('.selected-option').children('i').addClass('fa-sort-desc');
      SelectBox.collapseSelect($li);
    } else {
      $ul.children('.selected-option').children('i').removeClass('fa-sort-desc');
      $ul.addClass('expanded');
      SelectBox.expandSelect($ul);
    }
  },
  initialize: function() {
    $('.select-input').on('click', SelectBox.toggleSelect);
    $('.select-option').on('click', SelectBox.setSelect);
  },
  build: function() {
    $('select').each(function(index, select) {
      $(select).wrap('<ul class="select-input"></ul>');
      $(select).addClass('hide-input');
      $(select).children().each(function(index, option) {
        $(select).before('<li class="select-option">'+ option.innerHTML + '</li>');
      });
      if ($(select).parent().siblings('label').length > 0) {
        var label = $(select).parent().siblings('label')[0];
        $(select).parent().prepend('<li class="selected-option">' + label.innerHTML + '<i class="fa fa-sort-desc"></i></li>');
        $(select).prepend('<option value="" selected>' + label.innerHTML + '</option');
      } else {
        $(select).parent().before('<label style="height: 1.5rem"></label>')
        $(select).parent().prepend('<li class="selected-option">select an option <i class="fa fa-sort-desc"></i></option>');
        $(select).prepend('<option value="" selected></option>');
        $($(select).parent().children()[0]).removeClass('select-option').addClass('selected-option');
      }
    });
  }
};

SelectBox.build();
SelectBox.initialize();
