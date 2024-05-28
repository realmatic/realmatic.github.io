$('.filter-link').on('click', (e) => {
  const filter = $(e.target).attr('data-filter');
//  console.log(filter);
        const items = $('.item-content').parent();
  for (item of items) {
    if (filter == '') {

        $(item).addClass('d-inline');
      $(item).parent().addClass('d-inline');
      $(item).removeClass('d-none');
      $(item).parent().removeClass('d-none');


//      console.log('x');
    }else if ($(item).attr('data-category') == filter) {
      $(item).addClass('d-inline');
      $(item).parent().addClass('d-inline');
      $(item).removeClass('d-none');
      $(item).parent().removeClass('d-none');
    } else {
      $(item).addClass('d-none');
      $(item).parent().addClass('d-none');
      $(item).removeClass('d-inline');
      $(item).parent().removeClass('d-inline');
    }
  }
});

